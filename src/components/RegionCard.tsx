import { MapPin, TrendingUp, ShoppingBag } from "lucide-react";
import type { Region } from "@/data/mockData";

interface RegionCardProps {
  region: Region;
  index: number;
  onClick: () => void;
}

const RegionCard = ({ region, index, onClick }: RegionCardProps) => {
  return (
    <div
      onClick={onClick}
      className="card-agri animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="p-5">
        <div className="mb-3 flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <span className="badge-demand">
            <TrendingUp className="h-3 w-3" />
            {region.demandScore}
          </span>
        </div>

        <h3 className="font-display text-base font-bold text-foreground mb-1">{region.name}</h3>
        <p className="text-sm text-muted-foreground mb-3">{region.state}</p>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Avg. Price</p>
            <p className="text-base font-bold text-accent">{region.avgPrice}</p>
          </div>
          <span className="badge-buyer">
            <ShoppingBag className="h-3 w-3" />
            {region.buyerType}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RegionCard;
