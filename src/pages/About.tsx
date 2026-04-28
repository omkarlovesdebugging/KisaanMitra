import { Sprout, Target, TrendingUp, Truck, Users, BarChart3 } from "lucide-react";
import Layout from "@/components/Layout";

const features = [
  {
    icon: Target,
    title: "Find the Best Markets",
    description: "Select the crop you've grown and instantly see the top markets across India where your crop has the highest demand and best prices.",
  },
  {
    icon: BarChart3,
    title: "Net Profit Calculator",
    description: "We calculate transport costs based on distance from your location, then show your estimated net profit per kg for every market — so you pick the most profitable one.",
  },
  {
    icon: Users,
    title: "Verified Buyers",
    description: "Access verified wholesalers, exporters, and food processors in each market with direct contact information and ratings.",
  },
  {
    icon: Truck,
    title: "Transport Cost Estimates",
    description: "Get estimated transportation costs between any two states, helping you plan logistics before selling your produce.",
  },
  {
    icon: TrendingUp,
    title: "Future Demand Forecast",
    description: "See which crops are predicted to have high demand in coming months, helping you plan your next harvest for maximum profitability.",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="page-container">
        {/* Hero */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary">
              <Sprout className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            About Kisaan Mitra
          </h1>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Kisaan Mitra is a marketplace tool built for Indian farmers. Our goal is simple:{" "}
            <strong className="text-foreground">help you earn more from every harvest</strong> by
            connecting you to the best markets, buyers, and demand insights — all in one place.
          </p>
        </div>

        {/* How it works */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2 text-center">
            How It Works
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-md mx-auto">
            Three simple steps to find the most profitable market for your crop.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { step: "1", title: "Select Your Crop", desc: "Choose the crop you have harvested and are ready to sell." },
              { step: "2", title: "Compare Markets", desc: "See top markets with prices, distance, transport cost, and net profit." },
              { step: "3", title: "Contact Buyers", desc: "Find verified wholesalers and exporters with direct contact details." },
            ].map((item) => (
              <div key={item.step} className="card-agri p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground font-display font-bold text-xl mx-auto mb-3">
                  {item.step}
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <div key={i} className="card-agri p-6 animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display font-bold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mission */}
        <div className="card-agri p-8 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-2xl font-bold text-foreground mb-3">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Every farmer deserves fair prices and easy access to markets. Kisaan Mitra uses demand
            data and market insights to empower farmers with the information they need — so they
            can sell smarter, earn more, and plan their next crop with confidence.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
