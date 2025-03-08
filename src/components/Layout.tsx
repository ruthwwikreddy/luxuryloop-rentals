
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-luxury-black text-white overflow-x-hidden">
      <NavBar />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
