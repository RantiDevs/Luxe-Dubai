import { useRef, useEffect, useState } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckCircle2 } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/Button";
import { properties } from "@/data/properties";

gsap.registerPlugin(ScrollTrigger);

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useGSAP(() => {
    if (isInView && ref.current) {
      gsap.to(ref.current, {
        innerHTML: value,
        duration,
        snap: { innerHTML: 1 },
        ease: "power2.out",
      });
    }
  }, [isInView, value, duration]);
  return <span ref={ref}>0</span>;
}

function LazyImg({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      className={`${className ?? ""} img-blur-in ${loaded ? "loaded" : ""}`}
    />
  );
}

function FadeUp({
  children,
  delay = 0,
  className,
  distance = 60,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  distance?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SlideIn({
  children,
  delay = 0,
  from = "left",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: "left" | "right";
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const x = from === "left" ? -80 : 80;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const wordVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const wordChildVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
  },
};

const statVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const statChildVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.85 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Home() {
  const { scrollYProgress } = useScroll();
  const parallaxSectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress: sectionScroll } = useScroll({
    target: parallaxSectionRef,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(sectionScroll, [0, 1], ["-15%", "15%"]);
  const horizontalScrollRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<(HTMLHeadingElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  const [heroVideoFailed, setHeroVideoFailed] = useState(() => {
    if (typeof navigator === "undefined") return false;
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
  });

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || heroVideoFailed) return;
    vid.muted = true;
    vid.setAttribute("muted", "");
    const playPromise = vid.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setHeroVideoFailed(true));
    }
    const t = setTimeout(() => {
      if (vid.paused) setHeroVideoFailed(true);
    }, 2000);
    return () => clearTimeout(t);
  }, []);

  useGSAP(() => {
    if (window.innerWidth < 768) return;
    if (horizontalScrollRef.current) {
      const cards = horizontalScrollRef.current.querySelectorAll(".feat-card");
      if (cards.length > 0) {
        gsap.to(cards, {
          xPercent: -100 * (cards.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: horizontalScrollRef.current,
            pin: true,
            scrub: 1,
            end: () => "+=" + (horizontalScrollRef.current?.offsetWidth ?? 800) * 2,
          },
        });
      }
    }
  }, { scope: horizontalScrollRef });

  useGSAP(() => {
    if (featuresRef.current) {
      const items = featuresRef.current.querySelectorAll(".bento-item");
      if (items.length > 0) {
        gsap.from(items, {
          scrollTrigger: { trigger: featuresRef.current, start: "top 75%" },
          y: 120,
          opacity: 0,
          scale: 0.92,
          duration: 1,
          stagger: 0.13,
          ease: "power4.out",
        });
      }
    }
  }, { scope: featuresRef });

  useEffect(() => {
    titleRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { clipPath: "inset(0 100% 0 0)", opacity: 0 },
        {
          clipPath: "inset(0 0% 0 0)",
          opacity: 1,
          duration: 1.4,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        }
      );
    });
  }, []);

  const featuredProperties = properties.filter((p) => p.isFeatured).slice(0, 6);
  const headline = ["DUBAI", "REAL", "ESTATE"];

  return (
    <PageTransition>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#C9A84C] z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="hero-section relative h-screen w-full flex items-end md:items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
          {!heroVideoFailed ? (
            <video
              ref={videoRef}
              src="/videos/hero.mp4"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setHeroVideoFailed(true)}
              className="w-full h-full object-cover opacity-70"
            />
          ) : (
            <img
              src="/images/penthouse.jpg"
              alt="Dubai Luxury"
              className="w-full h-full object-cover ken-burns opacity-70"
            />
          )}
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center pb-36 md:pb-0">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0, duration: 0.25 }}
            className="text-[#C9A84C] tracking-[0.35em] text-xs md:text-sm uppercase mb-3 md:mb-6"
          >
            The Future Of
          </motion.p>

          <motion.h1
            variants={wordVariants}
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 0.1 }}
            className="flex flex-wrap justify-center gap-x-4 md:gap-x-6 leading-none font-display italic font-bold text-white mb-4 md:mb-8"
            style={{ fontSize: "clamp(2.8rem, 13vw, 7rem)" }}
          >
            {headline.map((word) => (
              <motion.span key={word} variants={wordChildVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.25 }}
            className="text-sm md:text-xl text-white/70 font-light mb-6 md:mb-10 max-w-md md:max-w-2xl mx-auto leading-relaxed"
          >
            Curated properties. Unmatched lifestyle. Experience the extraordinary with our exclusive portfolio of ultra-luxury residences.
          </motion.p>

          {/* Stat pills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.2 }}
            className="flex flex-row flex-wrap justify-center items-center gap-2 mb-7 md:mb-10"
          >
            {[
              { label: "340+ Properties" },
              { label: "12 Locations" },
              { label: "AED 2.4B+ Sold" },
            ].map((pill, i) => (
              <div key={pill.label} className="flex items-center">
                <div
                  className="px-4 py-1.5 rounded-full text-white text-xs md:text-sm tracking-wider text-center whitespace-nowrap"
                  style={{
                    backdropFilter: "blur(12px)",
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  {pill.label}
                </div>
                {i < 2 && (
                  <span className="w-1 h-1 rounded-full bg-white/40 mx-2" />
                )}
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.2 }}
            className="flex flex-col gap-3 w-full max-w-[280px] md:max-w-none md:flex-row md:w-auto"
          >
            <Link href="/properties" className="w-full md:w-auto">
              <Button variant="primary" size="lg" className="btn-shimmer w-full md:w-auto">
                Explore Properties
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full md:w-auto hover:shadow-[0_0_20px_rgba(201,168,76,0.4)]"
            >
              Watch Story
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] text-[#C9A84C] uppercase tracking-[0.4em]">Scroll To Explore</span>
          <div className="relative w-[1px] h-16 bg-white/20 overflow-hidden scroll-line" />
        </motion.div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────── */}
      <section className="border-y border-[rgba(201,168,76,0.2)] bg-[#141414] relative z-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            ref={statsRef}
            variants={statVariants}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-[rgba(201,168,76,0.15)] text-center"
          >
            {[
              { val: 2, suffix: "B+", prefix: "AED ", label: "Properties Sold" },
              { val: 1200, suffix: "+", prefix: "", label: "Happy Clients" },
              { val: 15, suffix: "+", prefix: "", label: "Years Experience" },
              { val: 98, suffix: "%", prefix: "", label: "Client Satisfaction" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={statChildVariants}>
                <h3 className="text-3xl md:text-5xl font-display text-[#C9A84C] mb-2">
                  {stat.prefix}
                  <AnimatedCounter value={stat.val} />
                  {stat.suffix}
                </h3>
                <p className="text-xs text-white/50 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── HORIZONTAL FEATURED ──────────────────────────── */}
      <section
        ref={horizontalScrollRef}
        className="md:h-screen h-auto w-full bg-[#0A0A0A] md:overflow-hidden flex flex-col justify-center relative py-16 md:py-0"
      >
        <div className="px-6 md:px-12 w-full mb-8 md:mb-0 md:absolute md:top-24 md:left-0">
          <FadeUp>
            <h2
              ref={(el) => { titleRefs.current[0] = el; }}
              className="text-3xl md:text-6xl font-display mb-2"
            >
              Featured Listings
            </h2>
            <div className="w-10 h-[2px] bg-[#C9A84C] mt-3" />
          </FadeUp>
        </div>

        <div
          className="flex pl-6 md:pl-12 gap-5 md:gap-8 md:mt-20 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 scrollbar-none"
          style={{ width: typeof window !== "undefined" && window.innerWidth >= 768 ? `${featuredProperties.length * 450}px` : undefined }}
        >
          {featuredProperties.map((prop) => (
            <Link key={prop.id} href={`/property/${prop.id}`}>
              <div className="feat-card prop-card w-[280px] md:w-[420px] h-[460px] md:h-[560px] shrink-0 snap-start group relative overflow-hidden md:cursor-none cursor-pointer border border-[rgba(201,168,76,0.15)] bg-[#141414] active:scale-[0.98] transition-transform">
                <div className="card-img absolute inset-0">
                  <LazyImg
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                </div>

                <div className="view-btn absolute bottom-0 left-0 right-0 z-30 bg-[#C9A84C] text-black text-center py-3 text-xs font-semibold tracking-[0.2em] uppercase">
                  View Property →
                </div>

                <div className="absolute top-4 left-4 bg-[#C9A84C] text-black text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 z-20">
                  {prop.type}
                </div>
                {prop.isNew && (
                  <div className="absolute top-4 right-4 bg-white/90 text-black text-[10px] font-semibold tracking-wider rounded-full px-3 py-1 z-20">
                    New Listing
                  </div>
                )}

                <div className="absolute bottom-0 left-0 w-full p-8 z-20 pb-14 group-hover:pb-16 transition-all duration-500">
                  <p className="text-[#C9A84C] text-xl font-display mb-1">
                    {prop.currency} {(prop.price / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-white/60 text-xs tracking-widest uppercase mb-1">{prop.location}</p>
                  <h3 className="text-2xl font-display text-white mb-3">{prop.title}</h3>
                  <div className="flex gap-4 text-xs text-white/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span>{prop.beds} Beds</span>
                    <span>{prop.baths} Baths</span>
                    <span>{prop.sqft} SqFt</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── SPLIT PARALLAX ───────────────────────────────── */}
      <section ref={parallaxSectionRef} className="py-24 md:py-32 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          <SlideIn from="left" className="relative h-[420px] md:h-[600px] overflow-hidden rounded-sm group">
            <motion.div
              className="absolute w-full"
              style={{ y: yParallax, top: "-15%", height: "130%" }}
            >
              <LazyImg
                src="/images/luxury-interior.jpg"
                alt="Dubai Architecture"
                className="w-full h-full object-cover md:grayscale md:mix-blend-luminosity md:group-hover:grayscale-0 transition-all duration-1000"
              />
            </motion.div>
            <div className="absolute inset-0 border-2 border-[rgba(201,168,76,0.2)] scale-95 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />
            {/* gold shimmer line on mobile */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-[#C9A84C]"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeInOut", delay: 0.4 }}
            />
          </SlideIn>

          <SlideIn from="right">
            <FadeUp delay={0.1}>
              <p className="text-[#C9A84C] tracking-[0.3em] text-sm uppercase mb-4">Why Dubai</p>
            </FadeUp>
            <h2
              ref={(el) => { titleRefs.current[1] = el; }}
              className="text-4xl md:text-6xl font-display leading-tight mb-8"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
            >
              Where Ambition Meets <br />
              <span className="text-stroke-gold">Architecture</span>
            </h2>
            <FadeUp delay={0.2}>
              <p className="text-white/60 mb-6 text-lg font-light leading-relaxed">
                Dubai has established itself as the global capital of luxury living. With its tax-free environment, world-class infrastructure, and unparalleled safety, it offers an investment opportunity unlike any other.
              </p>
            </FadeUp>
            <ul className="space-y-4 mb-10">
              {["0% Income & Property Tax", "Golden Visa Opportunities", "World-Class Returns on Investment"].map(
                (item, i) => (
                  <FadeUp key={i} delay={0.25 + i * 0.12}>
                    <li className="flex items-center gap-4 text-white/90">
                      <motion.span
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.12, type: "spring" }}
                      >
                        <CheckCircle2 className="text-[#C9A84C]" size={20} />
                      </motion.span>
                      <span>{item}</span>
                    </li>
                  </FadeUp>
                )
              )}
            </ul>
            <FadeUp delay={0.55}>
              <Link href="/about">
                <Button variant="outline">Learn More</Button>
              </Link>
            </FadeUp>
          </SlideIn>
        </div>
      </section>

      {/* ── BENTO GRID ───────────────────────────────────── */}
      <section ref={featuresRef} className="py-24 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <FadeUp>
              <h2
                ref={(el) => { titleRefs.current[2] = el; }}
                className="text-4xl md:text-5xl font-display mb-4"
              >
                Portfolio Collections
              </h2>
              <div className="w-10 h-[2px] bg-[#C9A84C] mx-auto mt-3" />
              <p className="text-white/50 max-w-2xl mx-auto mt-4">
                Discover properties tailored to every aspect of elevated living.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto md:h-[800px]">
            <Link
              href="/properties?type=Penthouse"
              className="bento-item md:col-span-2 md:row-span-2 relative group overflow-hidden bg-[#141414] md:cursor-none cursor-pointer min-h-[260px]"
            >
              <LazyImg src="/images/penthouse.jpg" alt="Penthouses" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105 opacity-60 group-hover:opacity-80 group-active:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <h3 className="text-2xl md:text-3xl font-display text-white mb-2">Penthouses</h3>
                <p className="text-[#C9A84C] tracking-widest text-sm uppercase">View Collection →</p>
              </div>
              <div className="absolute inset-0 border-2 border-[rgba(201,168,76,0)] group-hover:border-[rgba(201,168,76,0.5)] transition-colors duration-500" />
            </Link>

            <Link
              href="/properties?type=Villa"
              className="bento-item md:col-span-1 md:row-span-2 relative group overflow-hidden bg-[#141414] md:cursor-none cursor-pointer min-h-[200px]"
            >
              <LazyImg src="/images/prop-2.jpg" alt="Villas" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105 opacity-60 group-hover:opacity-80 group-active:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                <h3 className="text-2xl font-display text-white mb-2">Villas</h3>
                <p className="text-[#C9A84C] tracking-widest text-sm uppercase">View Collection →</p>
              </div>
            </Link>

            <Link
              href="/properties?type=Apartment"
              className="bento-item md:col-span-1 md:row-span-1 relative group overflow-hidden bg-[#141414] md:cursor-none cursor-pointer min-h-[150px]"
            >
              <LazyImg src="/images/prop-6.jpg" alt="Apartments" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105 opacity-60 group-hover:opacity-80 group-active:opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-5 left-5 md:bottom-6 md:left-6">
                <h3 className="text-xl md:text-2xl font-display text-white mb-1">Apartments</h3>
                <p className="text-[#C9A84C] tracking-widest text-xs uppercase">View Collection →</p>
              </div>
            </Link>

            <Link
              href="/properties?type=Commercial"
              className="bento-item md:col-span-1 md:row-span-1 relative group overflow-hidden bg-[#141414] md:cursor-none cursor-pointer min-h-[150px]"
            >
              <LazyImg src="/images/prop-7.jpg" alt="Commercial" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-active:scale-105 opacity-40 group-hover:opacity-60 group-active:opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-6 left-6">
                <h3 className="text-2xl font-display text-white mb-1">Commercial</h3>
                <p className="text-[#C9A84C] tracking-widest text-xs uppercase">View Collection →</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#C9A84C]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#C9A84C]/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <FadeUp distance={80}>
            <h2
              ref={(el) => { titleRefs.current[3] = el; }}
              className="text-5xl md:text-7xl font-display mb-6"
            >
              Elevate Your Standard
            </h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="w-10 h-[2px] bg-[#C9A84C] mx-auto mb-6" />
            <p className="text-xl text-white/50 mb-10 font-light">
              Join our exclusive clientele and discover properties that define luxury.
            </p>
          </FadeUp>
          <FadeUp delay={0.2}>
            <form
              className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-white/5 border border-[rgba(201,168,76,0.3)] px-6 py-4 focus:outline-none focus:border-[#C9A84C] transition-colors text-white"
              />
              <Button type="submit" variant="primary" className="btn-shimmer">
                Get Started
              </Button>
            </form>
          </FadeUp>
        </div>
      </section>
    </PageTransition>
  );
}
