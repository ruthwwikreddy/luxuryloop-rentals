
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Lock, User } from "lucide-react";
import Layout from "@/components/Layout";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication check
    if (username === "admin" && password === "admin") {
      // Set admin authentication in localStorage
      localStorage.setItem("adminAuthenticated", "true");
      
      toast({
        title: "Login successful",
        description: "Welcome to the admin dashboard"
      });
      
      navigate("/admin");
    } else {
      toast({
        variant: "destructive",
        title: "Authentication failed",
        description: "Invalid username or password"
      });
    }
    
    setIsLoading(false);
  };

  return (
    <Layout>
      <div className="pt-32 pb-20 min-h-screen bg-luxury-black">
        <div className="luxury-container max-w-md mx-auto">
          <div className="glass-card p-8 rounded-lg">
            <h1 className="text-3xl font-playfair text-white text-center mb-8">Admin Login</h1>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-white block">Username</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/70 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Enter username"
                    className="input-luxury pl-10"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-white block">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-luxury-gold/70 h-5 w-5" />
                  <Input
                    type="password"
                    placeholder="Enter password"
                    className="input-luxury pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="btn-luxury w-full"
                disabled={isLoading}
              >
                {isLoading ? "Authenticating..." : "Login"}
              </Button>
              
              <div className="text-white/70 text-center text-sm mt-4">
                <p>Admin credentials:</p>
                <p>Username: admin</p>
                <p>Password: admin</p>
                <p className="italic text-white/50 text-xs mt-1">(For demonstration purposes only)</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminLogin;
