import { useNavigate } from "react-router-dom";
import { Sprout, Search, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
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
            <Sprout className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              Sell Your Crop
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
            What Did You Grow?
          </h1>
          <p className="text-muted-foreground max-w-lg">
            Select the crop you have cultivated. We'll show you the best markets to sell it for maximum profit.
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search your crop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-input bg-card pl-10 pr-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((crop, i) => (
            <div
              key={crop.id}
              onClick={() => navigate(`/crop/${crop.id}`)}
              className="card-agri animate-fade-up group"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-3 flex items-center justify-between">
                <span className="font-display font-bold text-foreground text-sm">
                  {crop.name}
                </span>
                <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </div>
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
