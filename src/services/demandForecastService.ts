// Service for forecasting crop demand using 5-year historical data

export interface DemandForecast {
  cropName: string;
  predictedDemand: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  historicalAverage: number;
  state?: string; // Optional state field for filtered results
}

export interface WeeklyDemand {
  week: string;
  demand: number;
  cropName: string;
  state?: string; // Optional state field if available in data
}

/**
 * Parse CSV data from 5_years_merged_crop_demand.csv
 */
export function parseDemandCSV(csvText: string): WeeklyDemand[] {
  const lines = csvText.trim().split('\n');
  const data: WeeklyDemand[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const [week, demand, cropName] = lines[i].split(',');
    if (week && demand && cropName) {
      data.push({
        week: week.trim(),
        demand: parseFloat(demand.trim()),
        cropName: cropName.trim()
      });
    }
  }
  
  return data;
}

/**
 * Calculate moving average for trend analysis
 */
function calculateMovingAverage(values: number[], windowSize: number): number[] {
  const result: number[] = [];
  for (let i = 0; i < values.length; i++) {
    const start = Math.max(0, i - windowSize + 1);
    const window = values.slice(start, i + 1);
    const avg = window.reduce((sum, val) => sum + val, 0) / window.length;
    result.push(avg);
  }
  return result;
}

/**
 * Simple linear regression for trend prediction
 */
function linearRegression(values: number[]): { slope: number; intercept: number } {
  const n = values.length;
  const x = Array.from({ length: n }, (_, i) => i);
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = values.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * values[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  
  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
  const intercept = (sumY - slope * sumX) / n;
  
  return { slope, intercept };
}

/**
 * Forecast demand for 3-6 months ahead
 */
export function forecastCropDemand(
  historicalData: WeeklyDemand[],
  monthsAhead: number = 4.5, // Average of 3-6 months
  limitToTop10: boolean = true // If false, returns all crops ranked by demand
): DemandForecast[] {
  // Group data by crop
  const cropData = new Map<string, number[]>();
  
  historicalData.forEach(record => {
    if (!cropData.has(record.cropName)) {
      cropData.set(record.cropName, []);
    }
    cropData.get(record.cropName)!.push(record.demand);
  });
  
  const forecasts: DemandForecast[] = [];
  
  cropData.forEach((demands, cropName) => {
    if (demands.length < 4) return; // Skip crops with insufficient data
    
    // Calculate statistics
    const avg = demands.reduce((a, b) => a + b, 0) / demands.length;
    const recentData = demands.slice(-26); // Last 6 months (26 weeks)
    const recentAvg = recentData.reduce((a, b) => a + b, 0) / recentData.length;
    
    // Perform linear regression on recent data
    const { slope } = linearRegression(recentData);
    
    // Predict future demand (weeks ahead = months * 4.33)
    const weeksAhead = Math.round(monthsAhead * 4.33);
    const predictedDemand = recentAvg + (slope * weeksAhead);
    
    // Determine trend
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (slope > 0.5) trend = 'increasing';
    else if (slope < -0.5) trend = 'decreasing';
    
    // Calculate confidence based on data consistency
    const variance = demands.reduce((sum, val) => sum + Math.pow(val - avg, 2), 0) / demands.length;
    const stdDev = Math.sqrt(variance);
    const confidence = Math.max(0, Math.min(100, 100 - (stdDev / avg) * 100));
    
    forecasts.push({
      cropName,
      predictedDemand: Math.max(0, predictedDemand),
      trend,
      confidence: Math.round(confidence),
      historicalAverage: Math.round(avg)
    });
  });
  
  // Sort by predicted demand
  const sorted = forecasts.sort((a, b) => b.predictedDemand - a.predictedDemand);
  
  // Return top 10 or all results based on parameter
  return limitToTop10 ? sorted.slice(0, 10) : sorted;
}

/**
 * Load and forecast from CSV file - returns top 10 crops globally
 * Used for "All States" view
 */
export async function loadAndForecast(csvPath: string = '/dataset/5_years_merged_crop_demand.csv'): Promise<DemandForecast[]> {
  try {
    const response = await fetch(csvPath);
    const csvText = await response.text();
    const data = parseDemandCSV(csvText);
    return forecastCropDemand(data, 4.5, true); // true = limit to top 10
  } catch (error) {
    console.error('Error loading demand data:', error);
    return [];
  }
}

/**
 * Load recommendations for a state and filter forecasts accordingly
 */
async function loadStateRecommendations(state: string): Promise<string[]> {
  try {
    const response = await fetch('/dataset/state_crop_recommendations.json');
    if (!response.ok) throw new Error(`Failed to fetch recommendations: ${response.status}`);
    const recommendations = (await response.json()) as Record<string, string[]>;
    return recommendations[state] || [];
  } catch (error) {
    console.error('Error loading state recommendations:', error);
    return [];
  }
}

/**
 * Forecast crops filtered by state recommendations
 * This uses the state crop recommendations to filter the global forecasts
 * Returns all ranked crops for the specified state (not limited to top 10)
 */
export async function loadAndForecastByState(
  state: string,
  csvPath: string = '/dataset/5_years_merged_crop_demand.csv'
): Promise<DemandForecast[]> {
  try {
    if (!state || state.trim() === '') {
      // If no state provided, return all forecasts (top 10)
      return loadAndForecast(csvPath);
    }

    // Load all forecasts (without top 10 limit)
    const response = await fetch(csvPath);
    const csvText = await response.text();
    const data = parseDemandCSV(csvText);
    const allForecasts = forecastCropDemand(data, 4.5, false); // false = return all crops ranked

    // Load state recommendations
    const recommendedCrops = await loadStateRecommendations(state);

    if (recommendedCrops.length === 0) {
      // If no recommendations found for state, return top forecasts anyway
      console.warn(`No recommendations found for state: ${state}`);
      return forecastCropDemand(data, 4.5, true); // Return top 10 as fallback
    }

    // Filter forecasts to only include recommended crops for the state
    const filtered = allForecasts.filter((forecast) =>
      recommendedCrops.some(
        (crop) => crop.toLowerCase() === forecast.cropName.toLowerCase()
      )
    );

    // Return filtered results ranked by demand (all crops for the state, not limited to top 10)
    return filtered.length > 0 ? filtered : forecastCropDemand(data, 4.5, true);
  } catch (error) {
    console.error('Error loading forecasts by state:', error);
    return [];
  }
}
