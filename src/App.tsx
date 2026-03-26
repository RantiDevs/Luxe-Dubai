import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

import { CustomCursor } from "@/components/CustomCursor";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [location]);
  return null;
}

function BackToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-28 right-6 z-50 w-12 h-12 rounded-full bg-[#C9A84C] text-black flex items-center justify-center shadow-lg hover:brightness-110 hover:scale-105 transition-all"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      <div className="relative whatsapp-ripple">
        <a
          href="https://wa.me/971501234567"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
          aria-label="Chat with us on WhatsApp"
        >
          <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
            <path d="M16 2.936C8.832 2.936 3.001 8.767 3 15.935c-.001 2.301.6 4.547 1.742 6.524L2.936 29.064l6.787-1.781A13.033 13.033 0 0016 29.064c7.168 0 12.999-5.831 13-13 .001-7.168-5.831-12.999-13-13.128zm6.388 18.387c-.272.766-1.352 1.4-2.213 1.586-.588.126-1.356.226-3.94-.847-3.309-1.358-5.443-4.73-5.608-4.949-.158-.219-1.337-1.779-1.337-3.395 0-1.616.84-2.41 1.139-2.74.298-.329.651-.412.867-.412.217 0 .434.002.624.011.201.01.47-.076.737.562.272.65.925 2.25.006 2.25l-.002.002c.028.038 1.006 1.374.924 1.282.083.092.163.1.293.031.13-.069.541-.222 1.032-.432.491-.21 1.013-.37 1.013-.37s.254-.077.403.073c.149.15.149.425-.092 1.122-.24.697-.697 1.241-.779 1.334-.082.093.036.157.094.18.059.023.793.386 1.867.82 1.073.434 1.819.622 2.082.716.264.094.419.055.533-.069.114-.124.491-.571.622-.767.131-.196.262-.163.442-.098.18.065 1.143.54 1.338.638.196.098.326.147.374.229.048.083.048.476-.224 1.241z" />
          </svg>
        </a>
      </div>
      <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-[#141414] text-white text-xs tracking-wider px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-[rgba(201,168,76,0.2)]">
        Chat with us
      </div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location}>
        <Route path="/" component={Home} />
        <Route path="/properties" component={Properties} />
        <Route path="/property/:id" component={PropertyDetail} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <ScrollToTop />
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
          <CustomCursor />
          <Navbar />
          <main className="min-h-screen">
            <Router />
          </main>
          <Footer />
          <BackToTop />
          <WhatsAppButton />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
