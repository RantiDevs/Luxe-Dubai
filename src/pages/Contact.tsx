import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, MapPin, Clock, Phone, Mail } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/Button";

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    setTimeout(() => {
      setFormState('success');
      // Reset after 3s
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  const isWorkingHours = () => {
    const now = new Date();
    const dubaiTime = new Date(now.toLocaleString("en-US", {timeZone: "Asia/Dubai"}));
    const hour = dubaiTime.getHours();
    const day = dubaiTime.getDay(); // 0 is Sunday
    if (day === 0) return false;
    if (day === 6 && hour >= 10 && hour < 16) return true;
    if (day >= 1 && day <= 5 && hour >= 9 && hour < 18) return true;
    return false;
  };

  const isOpen = isWorkingHours();

  return (
    <PageTransition className="pt-32 pb-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="text-primary tracking-[0.3em] text-sm uppercase mb-4">Get in Touch</p>
          <h1 className="text-5xl md:text-7xl font-display">Private Consultations</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Form */}
          <div className="bg-card border border-border p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] pointer-events-none" />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input type="text" id="name" required className="w-full bg-transparent border-b border-border/50 py-3 text-foreground focus:outline-none focus:border-primary peer placeholder-transparent" placeholder="Name" />
                  <label htmlFor="name" className="absolute left-0 top-3 text-muted-foreground transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Full Name</label>
                </div>
                <div className="relative group">
                  <input type="email" id="email" required className="w-full bg-transparent border-b border-border/50 py-3 text-foreground focus:outline-none focus:border-primary peer placeholder-transparent" placeholder="Email" />
                  <label htmlFor="email" className="absolute left-0 top-3 text-muted-foreground transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Email Address</label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative group">
                  <input type="tel" id="phone" className="w-full bg-transparent border-b border-border/50 py-3 text-foreground focus:outline-none focus:border-primary peer placeholder-transparent" placeholder="Phone" />
                  <label htmlFor="phone" className="absolute left-0 top-3 text-muted-foreground transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Phone Number</label>
                </div>
                <div className="relative group">
                  <select id="interest" required className="w-full bg-transparent border-b border-border/50 py-3 text-foreground focus:outline-none focus:border-primary appearance-none cursor-pointer">
                    <option value="" disabled selected hidden>Area of Interest</option>
                    <option value="buy" className="bg-card">Buy Property</option>
                    <option value="rent" className="bg-card">Rent Property</option>
                    <option value="invest" className="bg-card">Investment</option>
                    <option value="sell" className="bg-card">List Property</option>
                  </select>
                </div>
              </div>

              <div className="relative group">
                <textarea id="message" required rows={4} className="w-full bg-transparent border-b border-border/50 py-3 text-foreground focus:outline-none focus:border-primary peer placeholder-transparent resize-none" placeholder="Message"></textarea>
                <label htmlFor="message" className="absolute left-0 top-3 text-muted-foreground transition-all duration-300 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-primary peer-valid:-top-4 peer-valid:text-xs">Your Message</label>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full"
                disabled={formState !== 'idle'}
              >
                {formState === 'idle' && "Send Message"}
                {formState === 'loading' && <span className="animate-pulse">Sending...</span>}
                {formState === 'success' && "Message Sent"}
              </Button>
            </form>
          </div>

          {/* Info & Map */}
          <div className="flex flex-col justify-between">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h4 className="flex items-center gap-2 font-display text-xl mb-4 border-b border-border/50 pb-2">
                  <MapPin className="text-primary" size={20} /> Headquarters
                </h4>
                <p className="text-muted-foreground font-light text-sm leading-relaxed">
                  Gate Village 3, Level 4<br/>
                  Dubai International Financial Centre<br/>
                  Dubai, United Arab Emirates
                </p>
              </div>
              
              <div>
                <h4 className="flex items-center gap-2 font-display text-xl mb-4 border-b border-border/50 pb-2">
                  <Clock className="text-primary" size={20} /> Office Hours
                </h4>
                <div className="text-muted-foreground font-light text-sm space-y-1 mb-4">
                  <p className="flex justify-between"><span>Mon - Fri</span> <span>9:00 AM - 6:00 PM</span></p>
                  <p className="flex justify-between"><span>Saturday</span> <span>10:00 AM - 4:00 PM</span></p>
                  <p className="flex justify-between"><span>Sunday</span> <span>Closed</span></p>
                </div>
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest font-semibold">
                  <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                  {isOpen ? <span className="text-green-500">Open Now</span> : <span className="text-red-500">Closed</span>}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <a href="https://wa.me/971501234567" target="_blank" rel="noreferrer" className="flex-1">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-green-500/50 hover:bg-green-500/10 hover:text-green-500 text-foreground group">
                  <MessageCircle size={18} className="text-green-500" /> WhatsApp Us
                </Button>
              </a>
              <a href="tel:+971501234567" className="flex-1">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Phone size={18} className="text-primary" /> Call Direct
                </Button>
              </a>
            </div>

            <div className="h-[300px] bg-secondary/50 border border-border relative overflow-hidden flex items-center justify-center">
               <div className="absolute inset-0 opacity-30 bg-[url('/images/dubai-map-bg.jpg')] bg-cover bg-center grayscale" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                    <MapPin className="text-background" />
                  </div>
                  <p className="font-display text-xl bg-background/80 px-4 py-1 backdrop-blur">DIFC, Dubai</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
