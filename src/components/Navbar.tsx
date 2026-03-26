import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button, cn } from "./Button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Properties", path: "/properties" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 3 }} // Delays until loader finishes
        className={cn(
          "relative z-50 transition-all duration-500 py-4 px-6 md:px-12 md:fixed md:top-0 md:left-0 md:right-0",
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : "bg-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-display tracking-[0.15em] text-primary hover-trigger relative z-[60]">
            LUXE DUBAI
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.path} className="group relative text-sm uppercase tracking-widest text-foreground/80 hover:text-foreground transition-colors hover-trigger">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-primary scale-x-0 origin-center group-hover:scale-x-100 transition-transform duration-300 ease-out" />
              </Link>
            ))}
            <Link href="/contact">
              <button
                className="ml-4 px-5 py-2 text-xs font-medium tracking-[0.05em] uppercase text-black hover:brightness-110 hover:scale-[1.02] transition-all duration-200"
                style={{ background: "linear-gradient(135deg, #C9A84C, #D4B668)" }}
              >
                Book a Viewing
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground hover-trigger relative z-[60]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at top right)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at top right)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-50 bg-background flex flex-col items-center justify-center space-y-8"
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-5 right-6 p-2 text-foreground/70 hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              <X size={32} />
            </motion.button>

            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i + 0.2 }}
              >
                <Link
                  href={link.path}
                  className="text-4xl font-display text-foreground hover:text-primary transition-colors hover-trigger"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link href="/contact">
                <button
                  className="px-8 py-3 text-sm font-medium tracking-[0.05em] uppercase text-black"
                  style={{ background: "linear-gradient(135deg, #C9A84C, #D4B668)" }}
                >
                  Book a Viewing
                </button>
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
