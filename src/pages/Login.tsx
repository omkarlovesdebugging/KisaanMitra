import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sprout, Eye, EyeOff } from "lucide-react";
import loginBg from "@/assets/login-bg.jpg";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!phone || !password) {
      toast.error("Please enter phone number and password");
      return;
    }

    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem("agriconnect_users") || "[]");
    const user = users.find((u: any) => u.phone === phone && u.password === password);

    if (user) {
      // Set current user
      localStorage.setItem("agriconnect_current_user", JSON.stringify({
        id: user.id,
        name: user.name,
        phone: user.phone,
        state: user.state,
        district: user.district,
      }));
      
      toast.success(`Welcome back, ${user.name}!`);
      navigate("/home");
    } else {
      toast.error("Invalid phone number or password");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img src={loginBg} alt="Golden fields" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-foreground/40" />
        <div className="relative z-10 flex flex-col justify-end p-12">
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-3">
            Grow Smarter,<br />Sell Better.
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-md">
            Connect directly with high-demand markets. Know what to grow, where to sell, and at the best price.
          </p>
        </div>
      </div>

      {/* Right - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-sm">
          <div className="flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-bold text-foreground">Kisaan Mitra</span>
          </div>

          <h2 className="font-display text-2xl font-bold text-foreground mb-1">Welcome back</h2>
          <p className="text-muted-foreground mb-8">Login to find the best markets for your crops</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full rounded-lg border border-input bg-card px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-input bg-card px-4 py-2.5 pr-10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary px-4 py-2.5 font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
            >
              Login
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            New farmer?{" "}
            <button
              onClick={() => navigate("/register")}
              className="font-medium text-primary hover:underline"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
