import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border pt-20 pb-10 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <Link href="/" className="text-3xl font-display tracking-[0.15em] text-primary mb-6 block">
            LUXE DUBAI
          </Link>
          <p className="text-muted-foreground text-sm mb-6 max-w-sm">
            Curated properties. Unmatched lifestyle. Elevating the standard of luxury real estate in the UAE.
          </p>
          <div className="flex space-x-4">
            {[Twitter, Instagram, Linkedin, Facebook].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-foreground hover:border-primary hover:text-primary hover:-translate-y-1 transition-all duration-300 hover-trigger">
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-6 tracking-wider text-sm uppercase">Company</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/about" className="hover:text-primary transition-colors hover-trigger">About Us</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors hover-trigger">Our Team</Link></li>
            <li><Link href="/contact" className="hover:text-primary transition-colors hover-trigger">Careers</Link></li>
            <li><Link href="/about" className="hover:text-primary transition-colors hover-trigger">Press</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-6 tracking-wider text-sm uppercase">Properties</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li><Link href="/properties?type=Penthouse" className="hover:text-primary transition-colors hover-trigger">Penthouses</Link></li>
            <li><Link href="/properties?type=Villa" className="hover:text-primary transition-colors hover-trigger">Villas</Link></li>
            <li><Link href="/properties?type=Apartment" className="hover:text-primary transition-colors hover-trigger">Apartments</Link></li>
            <li><Link href="/properties?isNew=true" className="hover:text-primary transition-colors hover-trigger">New Projects</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-6 tracking-wider text-sm uppercase">Contact</h4>
          <ul className="space-y-4 text-sm text-muted-foreground">
            <li>Dubai International Financial Centre</li>
            <li>Gate Village 3, Level 4</li>
            <li>Dubai, UAE</li>
            <li className="pt-2"><a href="mailto:info@luxedubai.com" className="text-primary hover-trigger">info@luxedubai.com</a></li>
            <li><a href="tel:+971501234567" className="hover:text-primary hover-trigger">+971 50 123 4567</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center pt-8 border-t border-border/50 text-xs text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Luxe Dubai. All rights reserved.</p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <Link href="/privacy" className="hover:text-primary hover-trigger">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary hover-trigger">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}
