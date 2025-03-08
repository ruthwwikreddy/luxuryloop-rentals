
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import FleetPage from "./pages/FleetPage";
import CarDetailsPage from "./pages/CarDetailsPage";
import RentersPage from "./pages/RentersPage";
import AdminPage from "./pages/AdminPage";
import AdminLogin from "./pages/AdminLogin";
import AboutPage from "./pages/AboutPage";
import TermsPage from "./pages/TermsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fleet" element={<FleetPage />} />
          <Route path="/car/:id" element={<CarDetailsPage />} />
          <Route path="/renters" element={<RentersPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/terms" element={<TermsPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
