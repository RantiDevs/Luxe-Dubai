import { useState, useMemo, useEffect } from "react";
import { Link, useSearch } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { Button } from "@/components/Button";
import { properties } from "@/data/properties";

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

export default function Properties() {
  const queryString = useSearch();
  const [filterType, setFilterType] = useState<string>("All");
  const [filterLocation, setFilterLocation] = useState<string>("All");
  const [filterBeds, setFilterBeds] = useState<string>("All");
  const [searchText, setSearchText] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const params = new URLSearchParams(queryString);
    const type = params.get("type");
    const location = params.get("location");
    const isNew = params.get("isNew");
    if (type) setFilterType(type);
    if (location) setFilterLocation(location);
    setVisibleCount(6);
  }, [queryString]);

  const types = ["All", "Penthouse", "Villa", "Apartment", "Townhouse", "Commercial"];
  const locations = ["All", ...Array.from(new Set(properties.map((p) => p.location)))];

  const filtered = useMemo(() => {
    const params = new URLSearchParams(queryString);
    const isNew = params.get("isNew");
    return properties.filter((p) => {
      const matchType = filterType === "All" || p.type === filterType;
      const matchLoc = filterLocation === "All" || p.location === filterLocation;
      const matchBeds = filterBeds === "All" || p.beds >= parseInt(filterBeds);
      const matchSearch =
        p.title.toLowerCase().includes(searchText.toLowerCase()) ||
        p.location.toLowerCase().includes(searchText.toLowerCase());
      const matchNew = !isNew || p.isNew === true;
      return matchType && matchLoc && matchBeds && matchSearch && matchNew;
    });
  }, [filterType, filterLocation, filterBeds, searchText, queryString]);

  const displayed = filtered.slice(0, visibleCount);

  return (
    <PageTransition className="pt-0 md:pt-24 min-h-screen flex flex-col">
      {/* Header */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-[#0D0D0D] relative">
        <div className="absolute inset-0 bg-[url('/images/prop-3.jpg')] opacity-5 mix-blend-luminosity bg-cover bg-center" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1
            className="font-display mb-4 text-white"
            style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)" }}
          >
            Our Portfolio
          </h1>
          <div className="w-10 h-[2px] bg-[#C9A84C] mx-auto mb-4" />
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">
            An exclusively curated selection of the finest real estate offerings in Dubai.
          </p>
          {filterType !== "All" && (
            <p className="mt-3 text-[#C9A84C] text-sm tracking-widest uppercase">
              Showing: {filterType}
            </p>
          )}
        </div>
      </section>

      {/* Filters */}
      <section className="relative z-40 bg-[#0A0A0A]/95 md:backdrop-blur-md border-b border-[rgba(201,168,76,0.2)] py-4 px-6 md:px-12 md:sticky md:top-[72px]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full bg-[#141414] border border-[rgba(201,168,76,0.2)] py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#C9A84C] transition-colors text-white"
            />
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto justify-center">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-[#141414] border border-[rgba(201,168,76,0.2)] text-white text-sm py-2 px-4 focus:outline-none focus:border-[#C9A84C] appearance-none"
            >
              {types.map((o) => <option key={o} value={o}>{o === "All" ? "All Types" : o}</option>)}
            </select>
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="bg-[#141414] border border-[rgba(201,168,76,0.2)] text-white text-sm py-2 px-4 focus:outline-none focus:border-[#C9A84C] appearance-none"
            >
              {locations.map((o) => <option key={o} value={o}>{o === "All" ? "All Locations" : o}</option>)}
            </select>
            <select
              value={filterBeds}
              onChange={(e) => setFilterBeds(e.target.value)}
              className="bg-[#141414] border border-[rgba(201,168,76,0.2)] text-white text-sm py-2 px-4 focus:outline-none focus:border-[#C9A84C] appearance-none"
            >
              <option value="All">Any Beds</option>
              {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}+ Beds</option>)}
            </select>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12 px-6 md:px-12 flex-1 max-w-7xl mx-auto w-full">
        <div className="mb-6 text-sm text-white/40">
          Showing <span className="text-[#C9A84C]">{displayed.length}</span> of {filtered.length} properties
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayed.map((prop, i) => (
              <motion.div
                key={prop.id}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link href={`/property/${prop.id}`} className="block h-full">
                  <div
                    className="prop-card h-full flex flex-col bg-[#141414] border border-[rgba(201,168,76,0.15)] overflow-hidden"
                    style={{ minHeight: 420, borderRadius: 2 }}
                  >
                    <div className="card-img relative overflow-hidden" style={{ height: "60%" }}>
                      <LazyImg
                        src={prop.image}
                        alt={prop.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 bg-[#C9A84C] text-black text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1">
                        {prop.type}
                      </div>
                      {prop.isNew && (
                        <div className="absolute top-4 right-4 bg-white/90 text-black text-[10px] font-semibold tracking-wider rounded-full px-3 py-1">
                          New Listing
                        </div>
                      )}
                      <div className="absolute bottom-4 left-4">
                        <p className="font-display text-[#C9A84C] text-2xl">
                          {prop.currency} {(prop.price / 1_000_000).toFixed(1)}M
                        </p>
                      </div>
                      <div className="view-btn absolute bottom-0 left-0 right-0 bg-[#C9A84C] text-black text-center py-2 text-xs font-semibold tracking-[0.2em] uppercase">
                        View Details →
                      </div>
                    </div>
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest mb-2">
                        <MapPin size={11} className="text-[#C9A84C]" />
                        {prop.location}
                      </div>
                      <h3 className="text-xl font-display text-white mb-3 line-clamp-2">{prop.title}</h3>
                      <div className="mt-auto">
                        <div className="h-[1px] bg-[rgba(201,168,76,0.2)] mb-3" />
                        <div className="flex justify-between text-sm text-white/40 items-center">
                          {prop.type !== "Commercial" && (
                            <>
                              <span>{prop.beds} Beds</span>
                              <span>{prop.baths} Baths</span>
                            </>
                          )}
                          <span>{prop.sqft.toLocaleString()} SqFt</span>
                          <ArrowRight size={14} className="text-[#C9A84C]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-white/40">No properties match your criteria.</p>
            <Button
              variant="outline"
              className="mt-6"
              onClick={() => {
                setFilterType("All");
                setFilterLocation("All");
                setFilterBeds("All");
                setSearchText("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}

        {visibleCount < filtered.length && (
          <div className="text-center mt-16">
            <Button variant="outline" onClick={() => setVisibleCount((v) => v + 6)}>
              Load More Properties
            </Button>
          </div>
        )}
      </section>
    </PageTransition>
  );
}
