import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import ServicesPage from "./pages/Services";
import OngoingProjectsPage from "./pages/OngoingProjectsPage";
import CompletedProjectsPage from "./pages/CompletedProjectsPage";
import AboutPage from "./pages/About";
import ContactPage from "./pages/Contact";
import NotFound from "./pages/NotFound";
// import PackagesPage from "./pages/Packages";
// import Packages from "./components/Packages";
// import PortfolioPackages from "./pages/packages/PortfolioPackages";
// import EcommercePackages from "./pages/packages/EcommercePackages";
// import BlogPackages from "./pages/packages/BlogPackages";
// import CustomPackages from "./pages/packages/CustomPackages";
// import PackageCheckout from "./components/PackageCheckout";
// import { PackageProvider } from "./context/PackageContext";
// import { AuthProvider } from "@/context/AuthContext";
// import Login from "./components/Login";
// import Signup from "./components/Signup";
// import VerifyEmail from "./pages/VerifyEmail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatePresence mode="wait">
          {/* <AuthProvider>
            <PackageProvider> */}
          <Routes>
            {/* Main Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ongoing-projects" element={<OngoingProjectsPage />} />
            <Route
              path="/completed-projects"
              element={<CompletedProjectsPage />}
            />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Auth Routes */}
            {/* <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} /> */}
            {/* <Route path="/verify-email/:token" element={<VerifyEmail />} /> */}

            {/* Packages Nested Routes */}
            {/* <Route path="/packages" element={<PackagesPage />}>
                  <Route index element={<Packages />} />
                  <Route path="portfolio" element={<PortfolioPackages />} />
                  <Route path="ecommerce" element={<EcommercePackages />} />
                  <Route path="blog" element={<BlogPackages />} />
                  <Route path="custom" element={<CustomPackages />} />
                  <Route path=":type/checkout" element={<PackageCheckout />} />
                </Route> */}

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          {/* </PackageProvider> */}
          {/* </AuthProvider> */}
        </AnimatePresence>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);
export default App;
