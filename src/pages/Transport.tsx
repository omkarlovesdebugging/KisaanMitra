import { useState } from "react";
import { Truck, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { indianStates, calculateTransportCost } from "@/data/mockData";

const Transport = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [weight, setWeight] = useState("1");
  const [result, setResult] = useState<{ distance: number; cost: number } | null>(null);

  const handleCalc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;
    setResult(calculateTransportCost(from, to, parseFloat(weight) || 1));
  };

  return (
    <Layout>
      <div className="page-container">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Truck className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Transport</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Transport Cost Calculator
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Estimate the cost of transporting your crops from your farm to any market in India.
          </p>
        </div>

        <div className="max-w-2xl">
          <form onSubmit={handleCalc} className="card-agri p-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">From (Your State)</label>
                <select
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select state</option>
                  {indianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">To (Market State)</label>
                <select
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select state</option>
                  {indianStates.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Weight (Tons)</label>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full rounded-lg border border-input bg-card px-3 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-3 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              Calculate Cost
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          {result && (
            <div className="mt-6 card-agri p-6 animate-fade-up">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">Estimated Transport Cost</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">From</p>
                  <p className="font-bold text-foreground">{from}</p>
                </div>
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Distance</p>
                  <p className="font-bold text-foreground">{result.distance} km</p>
                </div>
                <div className="rounded-lg bg-secondary p-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">To</p>
                  <p className="font-bold text-foreground">{to}</p>
                </div>
              </div>
              <div className="mt-4 rounded-lg bg-primary/5 border border-primary/20 p-5 text-center">
                <p className="text-sm text-muted-foreground mb-1">Total Cost ({weight} tons)</p>
                <p className="text-3xl font-bold text-primary">₹{Math.round(result.cost).toLocaleString()}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Rate: ₹{(3.5).toFixed(1)}/km/ton + ₹500 base
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Transport;
