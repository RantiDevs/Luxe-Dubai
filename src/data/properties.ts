export interface Property {
  id: string;
  title: string;
  location: string;
  type: 'Penthouse' | 'Villa' | 'Apartment' | 'Townhouse' | 'Commercial';
  price: number;
  currency: string;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  isNew: boolean;
  isFeatured: boolean;
}

export const properties: Property[] = [
  {
    id: "1",
    title: "The Residences at Burj Crown",
    location: "Downtown Dubai",
    type: "Penthouse",
    price: 12500000,
    currency: "AED",
    beds: 4,
    baths: 5,
    sqft: 6200,
    image: "/images/prop-1.jpg",
    gallery: [
      "/images/gallery-1a.jpg",
      "/images/gallery-1b.jpg",
      "/images/gallery-1c.jpg",
      "/images/gallery-2a.jpg",
      "/images/gallery-3a.jpg",
    ],
    description: "An architectural masterpiece in the heart of Downtown Dubai. This exquisite penthouse offers panoramic views of the Burj Khalifa and the Dubai Fountains. Featuring custom Italian marble, smart home integration, and a private infinity pool on the expansive terrace.",
    amenities: ["Private Pool", "Gym", "Concierge", "Valet Parking", "Burj View", "Smart Home", "Private Elevator", "Wine Cellar"],
    isNew: true,
    isFeatured: true
  },
  {
    id: "2",
    title: "Palm Jumeirah Signature Villa",
    location: "Palm Jumeirah",
    type: "Villa",
    price: 35000000,
    currency: "AED",
    beds: 6,
    baths: 8,
    sqft: 12500,
    image: "/images/prop-2.jpg",
    gallery: [
      "/images/gallery-2a.jpg",
      "/images/gallery-2b.jpg",
      "/images/gallery-1a.jpg",
      "/images/gallery-3b.jpg",
    ],
    description: "A breathtaking beachfront villa situated on the exclusive Fronds of Palm Jumeirah. Enjoy direct beach access, a sprawling landscaped garden, and unobstructed views of the Dubai Marina skyline. Unparalleled luxury living.",
    amenities: ["Private Beach", "Infinity Pool", "Cinema Room", "Maids Room", "Sea View", "Gated Security", "Spa", "BBQ Area"],
    isNew: false,
    isFeatured: true
  },
  {
    id: "3",
    title: "Marina Gate Dual-Level Penthouse",
    location: "Dubai Marina",
    type: "Penthouse",
    price: 18200000,
    currency: "AED",
    beds: 5,
    baths: 6,
    sqft: 8400,
    image: "/images/prop-3.jpg",
    gallery: [
      "/images/gallery-3a.jpg",
      "/images/gallery-3b.jpg",
      "/images/gallery-1b.jpg",
      "/images/gallery-4a.jpg",
    ],
    description: "Suspended above the clouds, this dual-level penthouse redefines Marina living. Double-height ceilings, floor-to-ceiling windows, and a wraparound balcony ensure natural light floods every corner while offering 360-degree views.",
    amenities: ["Rooftop Lounge", "Helipad", "Fitness Center", "Sauna", "Marina View", "Chef's Kitchen", "Library"],
    isNew: true,
    isFeatured: true
  },
  {
    id: "4",
    title: "The Opus Executive Suite",
    location: "Business Bay",
    type: "Apartment",
    price: 6800000,
    currency: "AED",
    beds: 2,
    baths: 3,
    sqft: 2200,
    image: "/images/prop-4.jpg",
    gallery: [
      "/images/gallery-4a.jpg",
      "/images/gallery-1c.jpg",
      "/images/gallery-3a.jpg",
    ],
    description: "Designed by Zaha Hadid, this fully furnished executive suite blends futuristic architecture with ultimate comfort. Situated in the vibrant Business Bay district, perfect for the modern professional.",
    amenities: ["Hotel Services", "Pool", "Gym", "Valet", "City View", "Furnished", "Lounge Access"],
    isNew: false,
    isFeatured: true
  },
  {
    id: "5",
    title: "JVC Modern Townhouse",
    location: "JVC",
    type: "Townhouse",
    price: 3200000,
    currency: "AED",
    beds: 3,
    baths: 4,
    sqft: 3100,
    image: "/images/prop-5.jpg",
    gallery: [
      "/images/gallery-6a.jpg",
      "/images/gallery-1a.jpg",
    ],
    description: "A contemporary family home featuring an open-plan layout, private garden, and modern finishes. Located in a quiet, family-friendly neighborhood with easy access to parks and schools.",
    amenities: ["Private Garden", "Covered Parking", "Shared Pool", "Park View", "Pet Friendly", "Balcony"],
    isNew: true,
    isFeatured: false
  },
  {
    id: "6",
    title: "Emaar Beachfront Oasis",
    location: "Dubai Marina",
    type: "Apartment",
    price: 8500000,
    currency: "AED",
    beds: 3,
    baths: 4,
    sqft: 2400,
    image: "/images/prop-6.jpg",
    gallery: [
      "/images/gallery-9a.jpg",
      "/images/gallery-2a.jpg",
      "/images/gallery-3b.jpg",
    ],
    description: "Wake up to the sound of waves. This premium apartment offers direct access to a pristine private beach, world-class dining, and unmatched views of the Arabian Gulf.",
    amenities: ["Private Beach", "Infinity Pool", "Gym", "Sea View", "Concierge", "Balcony"],
    isNew: false,
    isFeatured: true
  },
  {
    id: "7",
    title: "Downtown Corporate Tower Floor",
    location: "Downtown Dubai",
    type: "Commercial",
    price: 28000000,
    currency: "AED",
    beds: 0,
    baths: 4,
    sqft: 15000,
    image: "/images/prop-7.jpg",
    gallery: [
      "/images/gallery-8a.jpg",
      "/images/gallery-4a.jpg",
    ],
    description: "An entire premium commercial floor in one of Dubai's most prestigious business addresses. Fully fitted with executive suites, open plan areas, and a private reception.",
    amenities: ["Conference Rooms", "Pantry", "Covered Parking", "Security", "City View", "Grade A Building"],
    isNew: false,
    isFeatured: false
  },
  {
    id: "8",
    title: "Bulgari Resort Mansion",
    location: "Jumeirah Bay Island",
    type: "Villa",
    price: 95000000,
    currency: "AED",
    beds: 5,
    baths: 7,
    sqft: 14000,
    image: "/images/prop-8.jpg",
    gallery: [
      "/images/gallery-1a.jpg",
      "/images/gallery-2b.jpg",
      "/images/gallery-3a.jpg",
    ],
    description: "The epitome of ultra-luxury. A custom-built mansion on the seahorse-shaped Jumeirah Bay Island. Features a private yacht dock, indoor cinema, and Bulgari hotel services.",
    amenities: ["Yacht Dock", "Hotel Services", "Private Pool", "Spa", "Sea View", "Cinema", "Gym", "Driver Room"],
    isNew: true,
    isFeatured: true
  },
  {
    id: "9",
    title: "District One Contemporary Villa",
    location: "MBR City",
    type: "Villa",
    price: 18500000,
    currency: "AED",
    beds: 5,
    baths: 6,
    sqft: 8500,
    image: "/images/prop-9.jpg",
    gallery: [
      "/images/gallery-9a.jpg",
      "/images/gallery-6a.jpg",
    ],
    description: "Overlooking the world's largest crystal lagoon, this contemporary villa offers a minimalist aesthetic with floor-to-ceiling glass, lush landscaping, and unparalleled privacy.",
    amenities: ["Lagoon View", "Private Pool", "Smart Home", "Maids Room", "Gated Community", "Cycling Track"],
    isNew: false,
    isFeatured: false
  },
  {
    id: "10",
    title: "Bluewaters Island Luxury Flat",
    location: "Bluewaters",
    type: "Apartment",
    price: 7200000,
    currency: "AED",
    beds: 2,
    baths: 3,
    sqft: 1850,
    image: "/images/prop-10.jpg",
    gallery: [
      "/images/gallery-10a.jpg",
      "/images/gallery-3b.jpg",
    ],
    description: "Live steps away from Ain Dubai. This chic apartment boasts modern interiors, wooden flooring, and a large terrace perfect for sunset viewing over the ocean.",
    amenities: ["Shared Pool", "Gym", "Sea View", "Retail Access", "Covered Parking", "Security"],
    isNew: true,
    isFeatured: false
  },
  {
    id: "11",
    title: "Al Barari Mansions",
    location: "Al Barari",
    type: "Villa",
    price: 45000000,
    currency: "AED",
    beds: 7,
    baths: 9,
    sqft: 18000,
    image: "/images/prop-11.jpg",
    gallery: [
      "/images/gallery-1b.jpg",
      "/images/gallery-2a.jpg",
    ],
    description: "Nestled within a verdant botanical haven, this estate offers a tranquil retreat from the city. Featuring cascading water features, a private spa, and massive entertaining spaces.",
    amenities: ["Botanical Garden", "Private Spa", "Multiple Pools", "Driver Room", "Chef Kitchen", "Forest View", "Tennis Court"],
    isNew: false,
    isFeatured: true
  },
  {
    id: "12",
    title: "Golf Place Terraces",
    location: "Dubai Hills Estate",
    type: "Villa",
    price: 22000000,
    currency: "AED",
    beds: 6,
    baths: 7,
    sqft: 9200,
    image: "/images/prop-12.jpg",
    gallery: [
      "/images/gallery-2a.jpg",
      "/images/gallery-3a.jpg",
    ],
    description: "Front-row seats to an 18-hole championship golf course. This sprawling home features an expansive rooftop terrace, modern open-concept living, and a private pool overlooking the greens.",
    amenities: ["Golf Course View", "Private Pool", "Clubhouse Access", "Rooftop Terrace", "Maids Room", "Smart Home"],
    isNew: true,
    isFeatured: false
  }
];
