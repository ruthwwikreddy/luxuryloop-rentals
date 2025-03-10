
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isChecking, setIsChecking] = useState(true);
  
  useEffect(() => {
    const checkAuth = () => {
      const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
      
      if (!isAuthenticated) {
        toast({
          variant: "destructive",
          title: "Access denied",
          description: "Please login to access the admin area"
        });
        
        navigate("/admin-login");
      }
      
      setIsChecking(false);
    };
    
    // Small timeout to prevent flash of unauthorized content
    setTimeout(checkAuth, 100);
  }, [navigate, toast]);
  
  if (isChecking) {
    return <div className="min-h-screen flex items-center justify-center">Checking authorization...</div>;
  }
  
  return <>{children}</>;
};

export default AuthGuard;
