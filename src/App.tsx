import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from 'framer-motion';
import Index from "./pages/Index";
import ServicesPage from './pages/Services';
import PortfolioPage from "./pages/Portfolio";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
import PackagesPage from "./pages/Packages";
import PortfolioPackages from "./pages/packages/PortfolioPackages";
import EcommercePackages from "./pages/packages/EcommercePackages";
import BlogPackages from "./pages/packages/BlogPackages";
import CustomPackages from "./pages/packages/CustomPackages";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Main Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Packages Nested Routes */}
            <Route path="/packages" element={<PackagesPage />}>
              <Route index element={<PackagesPage />} />
              <Route path="portfolio" element={<PortfolioPackages />} />
              <Route path="ecommerce" element={<EcommercePackages />} />
              <Route path="blog" element={<BlogPackages />} />
              <Route path="custom" element={<CustomPackages />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;