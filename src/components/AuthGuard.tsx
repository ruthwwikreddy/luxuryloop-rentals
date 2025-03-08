
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
    
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Access denied",
        description: "Please login to access the admin area"
      });
      
      navigate("/admin-login");
    }
  }, [navigate, toast]);
  
  return <>{children}</>;
};

export default AuthGuard;
