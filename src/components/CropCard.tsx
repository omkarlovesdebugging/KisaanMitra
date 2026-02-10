import { TrendingUp, MapPin } from "lucide-react";
import type { Crop } from "@/data/mockData";

interface CropCardProps {
  crop: Crop;
  index: number;
  onClick: () => void;
}

const CropCard = ({ crop, index, onClick }: CropCardProps) => {
  return (
    <div
      onClick={onClick}
      className="card-agri group animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <img
          src={crop.image}
          alt={crop.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
        <div className="absolute top-3 right-3">
          <span className="badge-trending">
            <TrendingUp className="h-3 w-3" />
            +{crop.trendPercent}%
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="font-display text-lg font-bold text-primary-foreground">{crop.name}</h3>
          <div className="flex items-center gap-1 text-xs text-primary-foreground/80">
            <MapPin className="h-3 w-3" />
            {crop.topRegion}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between p-3">
        <div>
          <p className="text-xs text-muted-foreground">Demand Score</p>
          <p className="text-lg font-bold text-foreground">{crop.demandScore}/100</p>
        </div>
        <span className="badge-demand">{crop.season}</span>
      </div>
    </div>
  );
};

export default CropCard;
