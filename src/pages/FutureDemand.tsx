import { TrendingUp, CalendarDays, ArrowUpRight, Loader2 } from "lucide-react";
import Layout from "@/components/Layout";
import { crops } from "@/data/mockData";
import { useState, useEffect } from "react";
import { loadAndForecast, loadAndForecastByState, type DemandForecast } from "@/services/demandForecastService";

const FutureDemand = () => {
  const [forecasts, setForecasts] = useState<DemandForecast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userState, setUserState] = useState<string>("");
  const [filterMode, setFilterMode] = useState<'state' | 'all'>('state');

  useEffect(() => {
    // Get user's registered state from localStorage
    const currentUserStr = localStorage.getItem("agriconnect_current_user");
    const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
    const state = currentUser?.state || "";
    setUserState(state);

    // Load forecasts
    const loadForecasts = async () => {
      try {
        setLoading(true);
        let data;
        if (state && filterMode === 'state') {
          // Load forecasts filtered by user's state
          data = await loadAndForecastByState(state);
        } else {
          // Load all forecasts
          data = await loadAndForecast();
        }
        setForecasts(data);
      } catch (err) {
        console.error('Error loading forecasts:', err);
        setError('Failed to load demand forecasts');
      } finally {
        setLoading(false);
      }
    };

    loadForecasts();
  }, [filterMode]);
  if (loading) {
    return (
      <Layout>
        <div className="page-container flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Analyzing 5 years of market data...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="page-container text-center py-20">
          <p className="text-destructive mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:opacity-90"
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container">
        {/* Filter Toggle */}
        {userState && (
          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Filter by:</span>
            <button
              onClick={() => setFilterMode(filterMode === 'state' ? 'all' : 'state')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterMode === 'state'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent/20'
              }`}
            >
              {userState}
            </button>
            <button
              onClick={() => setFilterMode(filterMode === 'all' ? 'state' : 'all')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                filterMode === 'all'
                  ? 'bg-accent text-accent-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-accent/20'
              }`}
            >
              All States
            </button>
          </div>
        )}
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">
              AI-Powered Forecast
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            What to Grow Next?
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Based on 5 years of historical data, these crops are predicted to have the highest demand in 3-6 months. Plan your next harvest for maximum profit.
          </p>
        </div>

        {/* Future demand cards */}
        <div className="space-y-4">
          {forecasts.map((forecast, i) => {
            // Try to match with existing crop images
            const crop = crops.find((c) => 
              c.name.toLowerCase() === forecast.cropName.toLowerCase() ||
              forecast.cropName.toLowerCase().includes(c.name.toLowerCase())
            );

            const trendIcon = forecast.trend === 'increasing' ? '📈' : 
                             forecast.trend === 'decreasing' ? '📉' : '➡️';
            
            const trendColor = forecast.trend === 'increasing' ? 'text-primary' : 
                              forecast.trend === 'decreasing' ? 'text-destructive' : 'text-muted-foreground';

            return (
              <div
                key={forecast.cropName}
                className="card-agri animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Rank + image */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display font-bold text-accent text-lg">
                      {i + 1}
                    </div>
                    {crop?.image && (
                      <img
                        src={crop.image}
                        alt={forecast.cropName}
                        className="h-14 w-14 rounded-xl object-cover shrink-0"
                      />
                    )}
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">
                        {forecast.cropName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {forecast.trend === 'increasing' ? 'Rising demand trend' : 
                         forecast.trend === 'decreasing' ? 'Declining demand' : 'Stable demand'}
                      </p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 sm:ml-auto text-right sm:items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Predicted Demand</p>
                      <p className="text-base font-bold text-foreground">
                        {Math.round(forecast.predictedDemand)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Historical Avg</p>
                      <p className="text-base font-bold text-muted-foreground">
                        {forecast.historicalAverage}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Trend</p>
                      <p className={`text-base font-bold flex items-center justify-end gap-1 ${trendColor}`}>
                        <span>{trendIcon}</span>
                        <span className="capitalize">{forecast.trend}</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Confidence</p>
                      <p className="text-base font-bold text-accent">
                        {forecast.confidence}%
                      </p>
                    </div>
                    {crop?.season && (
                      <div>
                        <p className="text-xs text-muted-foreground">Season</p>
                        <p className="text-sm font-medium text-muted-foreground">{crop.season}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {forecasts.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No forecast data available. Please check the dataset.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FutureDemand;
