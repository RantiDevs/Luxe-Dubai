import { useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { PageTransition } from "@/components/PageTransition";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const lineRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (lineRef.current) {
      gsap.fromTo(lineRef.current, 
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 50%",
            end: "bottom 80%",
            scrub: 1
          }
        }
      );
    }
  });

  const team = [
    { name: "Alexander Marcus", role: "Founder & CEO", img: "/images/agent.jpg" },
    { name: "Sophia Reynolds", role: "Head of Acquisitions", img: "/images/team-2.jpg" },
    { name: "Omar Al Fayed", role: "Director of International Sales", img: "/images/team-3.jpg" }
  ];

  const milestones = [
    { year: "2010", text: "Founded in Dubai with a vision to redefine luxury real estate." },
    { year: "2015", text: "Reached milestone of 500+ ultra-luxury properties sold." },
    { year: "2019", text: "Expanded operations to Abu Dhabi and international markets." },
    { year: "2022", text: "Achieved record-breaking AED 1B in sales in a single quarter." },
    { year: "2024", text: "Voted #1 Luxury Real Estate Agency in the Middle East." }
  ];

  return (
    <PageTransition className="pt-24 pb-20 overflow-hidden">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20 flex flex-col md:flex-row items-center gap-16">
        <div className="flex-1">
          <p className="text-primary tracking-[0.3em] text-sm uppercase mb-4">Our Heritage</p>
          <h1 className="text-5xl md:text-7xl font-display mb-8 leading-tight">
            Curating the <br/> Extraordinary Since 2010.
          </h1>
          <p className="text-muted-foreground font-light text-lg leading-relaxed">
            Luxe Dubai was born from a singular vision: to elevate the standard of real estate by providing an entirely bespoke, discreet, and unparalleled service to the world's most discerning individuals.
          </p>
        </div>
        <div className="flex-1 relative">
          <div className="absolute inset-0 border border-primary/30 translate-x-4 translate-y-4" />
          <img src="/images/luxury-interior.jpg" alt="Luxury Interior" className="w-full h-[500px] object-cover relative z-10 grayscale mix-blend-luminosity hover:grayscale-0 transition-all duration-700" />
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-secondary/30 relative">
        <div className="max-w-3xl mx-auto px-6 timeline-container relative">
          <h2 className="text-4xl font-display text-center mb-20">The Journey</h2>
          
          <div className="relative pl-8 md:pl-0">
            {/* The animated central line */}
            <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-[1px] bg-border md:-translate-x-1/2" />
            <div 
              ref={lineRef}
              className="absolute top-0 bottom-0 left-8 md:left-1/2 w-[2px] bg-primary md:-translate-x-1/2 origin-top" 
            />

            {milestones.map((m, i) => (
              <div key={i} className={`relative mb-16 md:mb-24 md:w-1/2 ${i % 2 === 0 ? 'md:pr-16 md:ml-0' : 'md:pl-16 md:ml-auto'} ml-8 md:ml-0`}>
                <div className={`absolute top-0 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 -left-10 md:left-auto ${i % 2 === 0 ? 'md:-right-2' : 'md:-left-2'}`} />
                <h3 className="text-3xl font-display text-primary mb-2">{m.year}</h3>
                <p className="text-muted-foreground font-light">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display mb-4">Leadership</h2>
          <p className="text-muted-foreground">The visionaries behind our unmatched service.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map((member, i) => (
            <div key={i} className="group relative cursor-none">
              <div className="aspect-[3/4] overflow-hidden rounded-sm mb-6 relative">
                <img src={member.img} alt={member.name} className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                  <p className="text-primary-foreground font-semibold tracking-widest uppercase text-sm translate-y-4 group-hover:translate-y-0 transition-transform duration-500">Read Bio</p>
                </div>
              </div>
              <h3 className="text-2xl font-display text-white">{member.name}</h3>
              <p className="text-primary text-sm uppercase tracking-widest">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </PageTransition>
  );
}
