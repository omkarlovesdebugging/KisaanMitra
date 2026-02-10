import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Layout from "@/components/Layout";
import RegionCard from "@/components/RegionCard";
import { crops, regions } from "@/data/mockData";

const CropDetail = () => {
  const { cropId } = useParams();
  const navigate = useNavigate();

  const crop = crops.find((c) => c.id === cropId);
  const cropRegions = regions.filter((r) => r.cropId === cropId);

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
        {/* Back + Header */}
        <button
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Crops
        </button>

        <div className="flex items-center gap-4 mb-8">
          <img
            src={crop.image}
            alt={crop.name}
            className="h-16 w-16 rounded-xl object-cover"
          />
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{crop.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="badge-trending">
                <TrendingUp className="h-3 w-3" />
                +{crop.trendPercent}% trending
              </span>
              <span className="text-sm text-muted-foreground">Demand: {crop.demandScore}/100</span>
            </div>
          </div>
        </div>

        <h2 className="font-display text-xl font-bold text-foreground mb-1">Top Markets</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          States & cities where {crop.name.toLowerCase()} is in high demand. Tap to see buyers.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {cropRegions.map((region, i) => (
            <RegionCard
              key={region.id}
              region={region}
              index={i}
              onClick={() => navigate(`/crop/${cropId}/region/${region.id}`)}
            />
          ))}
        </div>

        {cropRegions.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No market data available for {crop.name} yet.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CropDetail;
