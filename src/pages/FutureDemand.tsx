import { TrendingUp, CalendarDays, ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import { crops } from "@/data/mockData";

// Mock future demand predictions
const futureDemandData = [
  { cropId: "tomato", predictedDemand: 97, growthPercent: 24, peakMonth: "March 2026", reason: "Summer demand surge" },
  { cropId: "onion", predictedDemand: 94, growthPercent: 30, peakMonth: "April 2026", reason: "Export season peak" },
  { cropId: "rice", predictedDemand: 93, growthPercent: 15, peakMonth: "May 2026", reason: "Steady staple demand" },
  { cropId: "chili", predictedDemand: 91, growthPercent: 28, peakMonth: "April 2026", reason: "Festival & export season" },
  { cropId: "cotton", predictedDemand: 89, growthPercent: 20, peakMonth: "June 2026", reason: "Textile industry demand" },
  { cropId: "wheat", predictedDemand: 88, growthPercent: 10, peakMonth: "March 2026", reason: "Post-harvest processing" },
  { cropId: "soybean", predictedDemand: 86, growthPercent: 18, peakMonth: "May 2026", reason: "Oil extraction demand" },
  { cropId: "potato", predictedDemand: 84, growthPercent: 12, peakMonth: "April 2026", reason: "Processing unit demand" },
  { cropId: "sugarcane", predictedDemand: 82, growthPercent: 8, peakMonth: "March 2026", reason: "Sugar mill season" },
  { cropId: "maize", predictedDemand: 80, growthPercent: 16, peakMonth: "June 2026", reason: "Animal feed & starch demand" },
];

const FutureDemand = () => {
  return (
    <Layout>
      <div className="page-container">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <CalendarDays className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">
              Crop Planning
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            What to Grow Next?
          </h1>
          <p className="text-muted-foreground max-w-lg">
            These crops are predicted to have the highest demand in the coming months. Plan your next harvest for maximum profit.
          </p>
        </div>

        {/* Future demand cards */}
        <div className="space-y-4">
          {futureDemandData.map((item, i) => {
            const crop = crops.find((c) => c.id === item.cropId);
            if (!crop) return null;

            return (
              <div
                key={item.cropId}
                className="card-agri animate-fade-up"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Rank + image */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-display font-bold text-accent text-lg">
                      {i + 1}
                    </div>
                    <img
                      src={crop.image}
                      alt={crop.name}
                      className="h-14 w-14 rounded-xl object-cover shrink-0"
                    />
                    <div>
                      <h3 className="font-display text-base font-bold text-foreground">{crop.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.reason}</p>
                    </div>
                  </div>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-4 sm:gap-6 sm:ml-auto text-right sm:items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Predicted Demand</p>
                      <p className="text-base font-bold text-foreground">{item.predictedDemand}/100</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Growth</p>
                      <p className="text-base font-bold text-primary flex items-center justify-end gap-0.5">
                        <ArrowUpRight className="h-3.5 w-3.5" />
                        +{item.growthPercent}%
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Peak Month</p>
                      <p className="text-base font-bold text-accent">{item.peakMonth}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Season</p>
                      <p className="text-sm font-medium text-muted-foreground">{crop.season}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default FutureDemand;
