import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, TrendingUp, IndianRupee, Truck, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";
import { crops, regions, getDistance, transportRates, indianStates } from "@/data/mockData";
import { useState, useMemo } from "react";

const CropDetail = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();
  const [farmerState, setFarmerState] = useState("");

  const crop = crops.find((c) => c.id === cropId);
  const cropRegions = regions.filter((r) => r.cropId === cropId);

  // Parse price from string like "₹25/kg" to number
  const parsePrice = (priceStr: string): number => {
    const match = priceStr.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  };

  const marketsWithProfit = useMemo(() => {
    return cropRegions.map((region) => {
      const pricePerKg = parsePrice(region.avgPrice);
      const distance = farmerState ? getDistance(farmerState, region.state) : 0;
      // Transport cost per kg (assuming 1 ton = 1000kg)
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

  if (!crop) {
    return (
      <Layout>
        <div className="page-container text-center py-20 text-muted-foreground">
          Crop not found
        </div>
      </Layout>
    );
  }

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
              Where Are You Located?
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Select your state so we can calculate distance and transport cost to each market.
          </p>
          <select
            value={farmerState}
            onChange={(e) => setFarmerState(e.target.value)}
            className="w-full max-w-sm rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select your state</option>
            {indianStates.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
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
            ? "Markets ranked by your estimated net profit per kg after transport costs."
            : "Select your state above to see distance, transport cost, and net profit."}
        </p>

        <div className="space-y-4">
          {marketsWithProfit.map((market, i) => (
            <div
              key={market.id}
              onClick={() => navigate(`/crop/${cropId}/region/${market.id}`)}
              className="card-agri animate-fade-up"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  {/* Left: rank + info */}
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

                  {/* Right: price/profit metrics */}
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
          ))}
        </div>

        {marketsWithProfit.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No market data available for {crop.name} yet.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CropDetail;
