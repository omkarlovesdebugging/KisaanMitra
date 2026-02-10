import { useNavigate } from "react-router-dom";
import { TrendingUp, Search } from "lucide-react";
import Layout from "@/components/Layout";
import CropCard from "@/components/CropCard";
import { crops } from "@/data/mockData";
import { useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = crops.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Layout>
      <div className="page-container">
        {/* Hero */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold text-accent uppercase tracking-wide">Live Demand</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Top Crops in Demand
          </h1>
          <p className="text-muted-foreground max-w-lg">
            See which crops are trending right now. Tap a crop to find the best markets and buyers near you.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search crops..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((crop, i) => (
            <CropCard
              key={crop.id}
              crop={crop}
              index={i}
              onClick={() => navigate(`/crop/${crop.id}`)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-muted-foreground">
            No crops found matching "{search}"
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
