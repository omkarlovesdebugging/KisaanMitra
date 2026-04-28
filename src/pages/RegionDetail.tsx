import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Truck } from "lucide-react";
import Layout from "@/components/Layout";
import VendorCard from "@/components/VendorCard";
import { crops, regions, vendors, calculateTransportCost, indianStates } from "@/data/mockData";
import { getCurrentUser } from "@/services/authService";
import { useState, useEffect } from "react";

const RegionDetail = () => {
  const { cropId, regionId } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const crop = crops.find((c) => c.id === cropId);
  const region = regions.find((r) => r.id === regionId);
  const regionVendors = vendors.filter((v) => v.regionId === regionId);

  const [fromState, setFromState] = useState(currentUser?.state || "");
  const [weight, setWeight] = useState("1");
  const [transportResult, setTransportResult] = useState<{ distance: number; cost: number } | null>(null);

  // Auto-calculate if user state is available
  useEffect(() => {
    if (currentUser?.state && region) {
      const result = calculateTransportCost(currentUser.state, region.state, 1);
      setTransportResult(result);
    }
  }, [currentUser, region]);

  if (!crop || !region) {
    return (
      <Layout>
        <div className="page-container text-center py-20 text-muted-foreground">
          Region not found
        </div>
      </Layout>
    );
  }

  const handleCalcTransport = () => {
    if (!fromState) return;
    const result = calculateTransportCost(fromState, region.state, parseFloat(weight) || 1);
    setTransportResult(result);
  };

  return (
    <Layout>
      <div className="page-container">
        <button
          onClick={() => navigate(`/crop/${cropId}`)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to {crop.name} Markets
        </button>

        {/* Region Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium text-muted-foreground">{region.state}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{region.name}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            <span className="text-lg font-bold text-accent">{region.avgPrice}</span>
            <span className="badge-buyer">{region.buyerType}</span>
            <span className="badge-demand">Demand: {region.demandScore}</span>
          </div>
        </div>

        {/* Transport Calculator */}
        <div className="card-agri mb-8 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Truck className="h-5 w-5 text-primary" />
            <h3 className="font-display text-lg font-bold text-foreground">Transport Cost Estimate</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Your State</label>
              <select
                value={fromState}
                onChange={(e) => setFromState(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Select state</option>
                {indianStates.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-muted-foreground mb-1">Weight (Tons)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCalcTransport}
                className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
              >
                Calculate
              </button>
            </div>
          </div>
          {transportResult && (
            <div className="mt-4 rounded-lg bg-secondary p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Distance</p>
                  <p className="text-lg font-bold text-foreground">{transportResult.distance} km</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Cost</p>
                  <p className="text-lg font-bold text-accent">₹{Math.round(transportResult.cost).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Vendors */}
        <h2 className="font-display text-xl font-bold text-foreground mb-1">Verified Buyers</h2>
        <p className="text-muted-foreground mb-6 text-sm">
          Contact these verified wholesalers and traders in {region.name}.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {regionVendors.map((vendor, i) => (
            <VendorCard key={vendor.id} vendor={vendor} index={i} />
          ))}
        </div>

        {regionVendors.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No verified buyers listed for this market yet.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RegionDetail;
