import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, TrendingUp, IndianRupee, Truck, BarChart3, Loader2, RefreshCw } from "lucide-react";
import Layout from "@/components/Layout";
import { crops, regions, getDistance, transportRates, indianStates } from "@/data/mockData";
import { useState, useMemo, useEffect } from "react";
import { loadMarketData, getMarketRecommendations, type MarketRecommendation, type FarmerLocation } from "@/services/marketRecommendationService";

const CropDetailEnhanced = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const [farmerState, setFarmerState] = useState("");
  const [farmerQuantity, setFarmerQuantity] = useState("1");
  const [useRealData, setUseRealData] = useState(false);
  const [realMarkets, setRealMarkets] = useState<MarketRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const crop = crops.find((c) => c.id === cropId);
  const cropRegions = regions.filter((r) => r.cropId === cropId);

  // Parse price from string like "₹25/kg" to number
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  // Mock data calculations (existing logic)
  const marketsWithProfit = useMemo(() => {
    return cropRegions.map((region) => {
      const pricePerKg = parsePrice(region.avgPrice);
      const distance = farmerState ? getDistance(farmerState, region.state) : 0;
      const transportCostPerTon = farmerState
        ? transportRates.baseCharge + distance * transportRates.perKmPerTon
        : 0;
      const transportCostPerKg = farmerState ? transportCostPerTon / 1000 : 0;
      const netProfitPerKg = pricePerKg - transportCostPerKg;

      return {
        ...region,
        pricePerKg,
        distance,
        transportCostPerKg,
        netProfitPerKg,
      };
    }).sort((a, b) => {
      if (farmerState) return b.netProfitPerKg - a.netProfitPerKg;
      return b.demandScore - a.demandScore;
    });
  }, [cropRegions, farmerState]);

  // Load real market data
  const loadRealMarkets = async () => {
    if (!crop || !farmerState) return;

    setLoading(true);
    setError(null);

    try {
      const marketData = await loadMarketData();
      
      // Get farmer location (using state coordinates)
      const stateCoords: Record<string, FarmerLocation> = {
        'Maharashtra': { latitude: 19.7515, longitude: 75.7139 },
        'Karnataka': { latitude: 15.3173, longitude: 75.7139 },
        'Tamil Nadu': { latitude: 11.1271, longitude: 78.6569 },
        'Gujarat': { latitude: 22.2587, longitude: 71.1924 },
        'Punjab': { latitude: 31.1471, longitude: 75.3412 },
        'Haryana': { latitude: 29.0588, longitude: 76.0856 },
        'Uttar Pradesh': { latitude: 26.8467, longitude: 80.9462 },
        'West Bengal': { latitude: 22.9868, longitude: 87.8550 },
        'Bihar': { latitude: 25.0961, longitude: 85.3131 },
        'Rajasthan': { latitude: 27.0238, longitude: 74.2179 },
        'Madhya Pradesh': { latitude: 22.9734, longitude: 78.6569 },
        'Andhra Pradesh': { latitude: 15.9129, longitude: 79.7400 },
        'Telangana': { latitude: 18.1124, longitude: 79.0193 },
        'Kerala': { latitude: 10.8505, longitude: 76.2711 },
        'Odisha': { latitude: 20.9517, longitude: 85.0985 },
        'Assam': { latitude: 26.2006, longitude: 92.9376 },
        'Delhi': { latitude: 28.7041, longitude: 77.1025 },
      };

      const farmerLocation = stateCoords[farmerState] || { latitude: 20, longitude: 77 };
      const quantity = parseFloat(farmerQuantity) || 1;

      const recommendations = getMarketRecommendations(
        marketData,
        crop.name,
        farmerLocation,
        quantity
      );

      setRealMarkets(recommendations);
      setUseRealData(true);
    } catch (err) {
      console.error('Error loading real market data:', err);
      setError('Failed to load market data. Using mock data instead.');
      setUseRealData(false);
    } finally {
      setLoading(false);
    }
  };

  if (!crop) {
    return (
      <Layout>
        <div className="page-container text-center py-20 text-muted-foreground">
          Crop not found
        </div>
      </Layout>
    );
  }

  const displayMarkets = useRealData ? realMarkets : marketsWithProfit;

  return (
    <Layout>
      <div className="page-container">
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Crop Selection
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <img src={crop.image} alt={crop.name} className="h-16 w-16 rounded-xl object-cover" />
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">
              Best Markets for {crop.name}
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Find where to sell your {crop.name.toLowerCase()} for the highest net profit.
            </p>
          </div>
        </div>

        {/* State Selector */}
        <div className="card-agri p-5 mb-8">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">
              Your Location & Quantity
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Select your state and quantity to calculate distance, transport cost, and net profit.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <select
              value={farmerState}
              onChange={(e) => setFarmerState(e.target.value)}
              className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="">Select your state</option>
              {indianStates.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={farmerQuantity}
              onChange={(e) => setFarmerQuantity(e.target.value)}
              placeholder="Quantity (tonnes)"
              className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={loadRealMarkets}
              disabled={!farmerState || loading}
              className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-2.5 font-semibold text-accent-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Load Real Data
                </>
              )}
            </button>
          </div>
          {error && (
            <p className="text-sm text-destructive mt-2">{error}</p>
          )}
          {useRealData && (
            <p className="text-sm text-primary mt-2 flex items-center gap-1">
              <BarChart3 className="h-4 w-4" />
              Showing real market data from CSV
            </p>
          )}
        </div>

        {/* Market Results */}
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-5 w-5 text-accent" />
          <h2 className="font-display text-xl font-bold text-foreground">
            Top Markets {farmerState ? "(Sorted by Net Profit)" : "(Select state for profit view)"}
          </h2>
        </div>
        <p className="text-muted-foreground mb-6 text-sm">
          {farmerState
            ? useRealData 
              ? "Markets ranked by your estimated net profit based on real market data."
              : "Markets ranked by your estimated net profit per kg after transport costs."
            : "Select your state above to see distance, transport cost, and net profit."}
        </p>

        <div className="space-y-4">
          {useRealData ? (
            // Real data display
            realMarkets.map((market, i) => (
              <div
                key={`${market.stateName}-${market.marketName}`}
                className="card-agri animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-display font-bold text-primary text-lg">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">{market.marketName}</h3>
                        <p className="text-sm text-muted-foreground">{market.districtName}, {market.stateName}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="badge-demand">
                            <TrendingUp className="h-3 w-3" />
                            Demand: {market.demandScore}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Arrivals: {market.arrivalQuantity}T
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 sm:gap-6 text-right sm:items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Market Price</p>
                        <p className="text-base font-bold text-foreground flex items-center justify-end gap-0.5">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {market.marketPrice}/Q
                        </p>
                        <p className="text-xs text-muted-foreground">
                          ₹{market.priceRange.min}-{market.priceRange.max}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Distance</p>
                        <p className="text-base font-bold text-foreground">{market.distance} km</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Transport</p>
                        <p className="text-base font-bold text-muted-foreground flex items-center justify-end gap-0.5">
                          <Truck className="h-3.5 w-3.5" />
                          ₹{market.transportationCost.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Net Profit</p>
                        <p className={`text-lg font-bold flex items-center justify-end gap-0.5 ${
                          market.netProfit > 0 ? "text-primary" : "text-destructive"
                        }`}>
                          <IndianRupee className="h-4 w-4" />
                          {market.netProfit.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Mock data display (existing)
            marketsWithProfit.map((market, i) => (
              <div
                key={market.id}
                onClick={() => navigate(`/crop/${cropId}/region/${market.id}`)}
                className="card-agri animate-fade-up cursor-pointer"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 font-display font-bold text-primary text-lg">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-foreground">{market.name}</h3>
                        <p className="text-sm text-muted-foreground">{market.state}</p>
                        <div className="flex flex-wrap items-center gap-2 mt-2">
                          <span className="badge-buyer">{market.buyerType}</span>
                          <span className="badge-demand">
                            <TrendingUp className="h-3 w-3" />
                            Demand: {market.demandScore}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 sm:gap-6 text-right sm:items-center">
                      <div>
                        <p className="text-xs text-muted-foreground">Market Price</p>
                        <p className="text-base font-bold text-foreground flex items-center justify-end gap-0.5">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {market.pricePerKg}/kg
                        </p>
                      </div>
                      {farmerState && (
                        <>
                          <div>
                            <p className="text-xs text-muted-foreground">Distance</p>
                            <p className="text-base font-bold text-foreground">{market.distance} km</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Transport</p>
                            <p className="text-base font-bold text-muted-foreground flex items-center justify-end gap-0.5">
                              <Truck className="h-3.5 w-3.5" />
                              ₹{market.transportCostPerKg.toFixed(2)}/kg
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Net Profit</p>
                            <p className={`text-lg font-bold flex items-center justify-end gap-0.5 ${
                              market.netProfitPerKg > 0 ? "text-primary" : "text-destructive"
                            }`}>
                              <IndianRupee className="h-4 w-4" />
                              {market.netProfitPerKg.toFixed(2)}/kg
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {displayMarkets.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            {useRealData 
              ? `No market data available for ${crop.name} in the CSV dataset.`
              : `No market data available for ${crop.name} yet.`
            }
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CropDetailEnhanced;
