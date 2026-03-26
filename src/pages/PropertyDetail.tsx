import { useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, MapPin, Phone, Mail, Check, X } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/Button";
import { properties } from "@/data/properties";

export default function PropertyDetail() {
  const [, params] = useRoute("/property/:id");
  const property = properties.find(p => p.id === params?.id) || properties[0];
  
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const allImages = [property.image, ...property.gallery];

  return (
    <PageTransition className="pt-0 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-widest mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/properties" className="hover:text-primary transition-colors">Properties</Link>
          <span>/</span>
          <span className="text-primary truncate">{property.title}</span>
        </div>

        {/* Title & Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-display mb-2"
            >
              {property.title}
            </motion.h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={16} className="text-primary" />
              <span>{property.location}</span>
              <span className="px-2 border-l border-border/50 ml-2">{property.type}</span>
            </div>
          </div>
          <div className="text-left md:text-right">
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Asking Price</p>
            <p className="text-3xl md:text-4xl font-display text-primary">
              {property.currency} {property.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 h-[50vh] md:h-[600px]">
          <div className="md:col-span-3 relative h-full group cursor-none hover-trigger" onClick={() => setIsLightboxOpen(true)}>
            <img 
              src={allImages[activeImage]} 
              alt={property.title} 
              className="w-full h-full object-cover rounded-sm"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
              <span className="text-white font-display text-xl tracking-widest bg-black/40 backdrop-blur px-6 py-2 rounded-full">View Gallery</span>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-4 h-full">
            {allImages.slice(1, 4).map((img, idx) => (
              <button 
                key={idx} 
                className={`relative flex-1 overflow-hidden rounded-sm border-2 transition-colors ${activeImage === idx + 1 ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                onClick={() => setActiveImage(idx + 1)}
              >
                <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
              </button>
            ))}
            {allImages.length > 4 && (
              <button 
                className="relative flex-1 bg-secondary flex items-center justify-center group"
                onClick={() => setIsLightboxOpen(true)}
              >
                <img src={allImages[4]} alt="More" className="absolute inset-0 w-full h-full object-cover opacity-30 group-hover:opacity-20 transition-opacity" />
                <span className="relative z-10 text-white font-display text-xl">+{allImages.length - 4} More</span>
              </button>
            )}
          </div>
        </div>

        {/* Content Split */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-display mb-6 border-b border-border/50 pb-4">Property Overview</h3>
            <p className="text-muted-foreground font-light leading-relaxed mb-12 whitespace-pre-line">
              {property.description}
            </p>

            <h3 className="text-2xl font-display mb-6 border-b border-border/50 pb-4">Features & Amenities</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 mb-12">
              {property.amenities.map((amenity, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Check size={16} className="text-primary flex-shrink-0" />
                  <span className="text-sm text-foreground/90">{amenity}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-display mb-6 border-b border-border/50 pb-4">Location</h3>
            <div className="h-[400px] bg-secondary/50 rounded-sm relative border border-border flex items-center justify-center overflow-hidden">
              {/* REPLACE WITH GOOGLE MAPS EMBED */}
              <div className="absolute inset-0 opacity-20 bg-[url('/images/dubai-map-bg.jpg')] bg-cover bg-center grayscale" />
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(201,168,76,0.4)] animate-bounce">
                  <MapPin className="text-background" />
                </div>
                <p className="font-display text-xl">{property.location}</p>
                <p className="text-xs text-muted-foreground tracking-widest mt-2 uppercase">Interactive Map Placeholder</p>
              </div>
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-card border border-border p-8 rounded-sm">
              <div className="grid grid-cols-3 gap-4 border-b border-border/50 pb-6 mb-6 text-center">
                <div>
                  <p className="text-2xl font-display text-white">{property.beds}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Beds</p>
                </div>
                <div className="border-l border-r border-border/50">
                  <p className="text-2xl font-display text-white">{property.baths}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Baths</p>
                </div>
                <div>
                  <p className="text-2xl font-display text-white">{property.sqft}</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">SqFt</p>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <Button variant="primary" className="w-full">Schedule Viewing</Button>
                <Button variant="outline" className="w-full">Download Brochure</Button>
              </div>

              <div className="bg-background border border-border p-4 flex items-center gap-4">
                <img src="/images/agent.jpg" alt="Agent" className="w-16 h-16 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-foreground">Alexander Marcus</p>
                  <p className="text-xs text-primary mb-2">Senior Luxury Broker</p>
                  <div className="flex gap-3">
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Phone size={14} /></a>
                    <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={14} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[999999] bg-background/95 backdrop-blur-xl flex items-center justify-center"
          >
            <button className="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2" onClick={() => setIsLightboxOpen(false)}>
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-6 text-white hover:text-primary transition-colors p-4"
              onClick={() => setActiveImage(prev => prev === 0 ? allImages.length - 1 : prev - 1)}
            >
              <ChevronLeft size={48} />
            </button>

            <img src={allImages[activeImage]} className="max-w-[80vw] max-h-[85vh] object-contain" alt="Gallery Full" />

            <button 
              className="absolute right-6 text-white hover:text-primary transition-colors p-4"
              onClick={() => setActiveImage(prev => prev === allImages.length - 1 ? 0 : prev + 1)}
            >
              <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white font-sans tracking-widest text-sm">
              {activeImage + 1} / {allImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageTransition>
  );
}
