import { Phone, MapPin, Star, ShieldCheck, Building2 } from "lucide-react";
import type { Vendor } from "@/data/mockData";

interface VendorCardProps {
  vendor: Vendor;
  index: number;
}

const VendorCard = ({ vendor, index }: VendorCardProps) => {
  return (
    <div
      className="card-agri animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="p-5">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-display text-base font-bold text-foreground truncate">{vendor.name}</h3>
              {vendor.verified && (
                <ShieldCheck className="h-4 w-4 flex-shrink-0 text-primary" />
              )}
            </div>
            <span className="badge-buyer text-xs">{vendor.businessType}</span>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4 text-accent" />
            <a href={`tel:${vendor.contact}`} className="font-medium text-foreground hover:text-primary transition-colors">
              {vendor.contact}
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 text-accent" />
            {vendor.location}
          </div>
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(vendor.rating) ? "fill-accent text-accent" : "text-border"}`}
              />
            ))}
            <span className="ml-1 text-sm font-medium text-foreground">{vendor.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
