import tomatoImg from "@/assets/crops/tomato.jpg";
import riceImg from "@/assets/crops/rice.jpg";
import wheatImg from "@/assets/crops/wheat.jpg";
import onionImg from "@/assets/crops/onion.jpg";
import potatoImg from "@/assets/crops/potato.jpg";
import cottonImg from "@/assets/crops/cotton.jpg";
import sugarcaneImg from "@/assets/crops/sugarcane.jpg";
import soybeanImg from "@/assets/crops/soybean.jpg";
import chiliImg from "@/assets/crops/chili.jpg";
import maizeImg from "@/assets/crops/maize.jpg";

// Placeholder for crops without specific images
const placeholderImg = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%2393c5a8' width='400' height='400'/%3E%3Ctext fill='white' font-family='Arial' font-size='48' x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle'%3E🌾%3C/text%3E%3C/svg%3E";

export interface Crop {
  id: string;
  name: string;
  image: string;
  demandScore: number;
  trendPercent: number;
  topRegion: string;
  season: string;
}

export interface Region {
  id: string;
  cropId: string;
  name: string;
  state: string;
  avgPrice: string;
  demandScore: number;
  buyerType: string;
}

export interface Vendor {
  id: string;
  regionId: string;
  name: string;
  businessType: string;
  contact: string;
  rating: number;
  verified: boolean;
  location: string;
}

export const crops: Crop[] = [
  // Crops with images
  { id: "tomato", name: "Tomato", image: tomatoImg, demandScore: 95, trendPercent: 18, topRegion: "Maharashtra", season: "Rabi" },
  { id: "rice", name: "Rice", image: riceImg, demandScore: 92, trendPercent: 12, topRegion: "West Bengal", season: "Kharif" },
  { id: "wheat", name: "Wheat", image: wheatImg, demandScore: 90, trendPercent: 8, topRegion: "Punjab", season: "Rabi" },
  { id: "onion", name: "Onion", image: onionImg, demandScore: 88, trendPercent: 22, topRegion: "Maharashtra", season: "Rabi" },
  { id: "potato", name: "Potato", image: potatoImg, demandScore: 85, trendPercent: 10, topRegion: "Uttar Pradesh", season: "Rabi" },
  { id: "cotton", name: "Cotton", image: cottonImg, demandScore: 82, trendPercent: 15, topRegion: "Gujarat", season: "Kharif" },
  { id: "sugarcane", name: "Sugarcane", image: sugarcaneImg, demandScore: 80, trendPercent: 6, topRegion: "Karnataka", season: "Annual" },
  { id: "soybean", name: "Soybean", image: soybeanImg, demandScore: 78, trendPercent: 14, topRegion: "Madhya Pradesh", season: "Kharif" },
  { id: "chilli", name: "Chilli", image: chiliImg, demandScore: 76, trendPercent: 20, topRegion: "Andhra Pradesh", season: "Kharif" },
  { id: "maize", name: "Maize", image: maizeImg, demandScore: 74, trendPercent: 9, topRegion: "Bihar", season: "Kharif" },
  
  // Additional crops with placeholder images
  { id: "aloe_vera", name: "Aloe_vera", image: placeholderImg, demandScore: 72, trendPercent: 11, topRegion: "Rajasthan", season: "Annual" },
  { id: "apple", name: "Apple", image: placeholderImg, demandScore: 84, trendPercent: 16, topRegion: "Himachal Pradesh", season: "Rabi" },
  { id: "ashwagandha", name: "Ashwagandha", image: placeholderImg, demandScore: 68, trendPercent: 25, topRegion: "Madhya Pradesh", season: "Rabi" },
  { id: "bajra", name: "Bajra", image: placeholderImg, demandScore: 71, trendPercent: 7, topRegion: "Rajasthan", season: "Kharif" },
  { id: "banana", name: "Banana", image: placeholderImg, demandScore: 86, trendPercent: 13, topRegion: "Tamil Nadu", season: "Annual" },
  { id: "beans", name: "Beans", image: placeholderImg, demandScore: 73, trendPercent: 9, topRegion: "Karnataka", season: "Rabi" },
  { id: "black_pepper", name: "Black_pepper", image: placeholderImg, demandScore: 79, trendPercent: 19, topRegion: "Kerala", season: "Annual" },
  { id: "cabbage", name: "Cabbage", image: placeholderImg, demandScore: 70, trendPercent: 8, topRegion: "Maharashtra", season: "Rabi" },
  { id: "cardamom", name: "Cardamom", image: placeholderImg, demandScore: 81, trendPercent: 22, topRegion: "Kerala", season: "Annual" },
  { id: "chickpea", name: "Chickpea", image: placeholderImg, demandScore: 77, trendPercent: 10, topRegion: "Madhya Pradesh", season: "Rabi" },
  { id: "coconut", name: "Coconut", image: placeholderImg, demandScore: 89, trendPercent: 14, topRegion: "Kerala", season: "Annual" },
  { id: "coffee", name: "Coffee", image: placeholderImg, demandScore: 91, trendPercent: 17, topRegion: "Karnataka", season: "Annual" },
  { id: "lentil", name: "Lentil", image: placeholderImg, demandScore: 75, trendPercent: 11, topRegion: "Uttar Pradesh", season: "Rabi" },
  { id: "mango", name: "Mango", image: placeholderImg, demandScore: 87, trendPercent: 15, topRegion: "Uttar Pradesh", season: "Summer" },
  { id: "marigold", name: "Marigold", image: placeholderImg, demandScore: 66, trendPercent: 12, topRegion: "Karnataka", season: "Rabi" },
  { id: "matar", name: "Matar", image: placeholderImg, demandScore: 74, trendPercent: 9, topRegion: "Uttar Pradesh", season: "Rabi" },
  { id: "moong", name: "Moong", image: placeholderImg, demandScore: 76, trendPercent: 13, topRegion: "Rajasthan", season: "Kharif" },
  { id: "peanut", name: "Peanut", image: placeholderImg, demandScore: 83, trendPercent: 16, topRegion: "Gujarat", season: "Kharif" },
  { id: "pigeon_pea", name: "Pigeon_pea", image: placeholderImg, demandScore: 72, trendPercent: 10, topRegion: "Maharashtra", season: "Kharif" },
  { id: "rose", name: "Rose", image: placeholderImg, demandScore: 69, trendPercent: 14, topRegion: "Karnataka", season: "Annual" },
  { id: "rubber", name: "Rubber", image: placeholderImg, demandScore: 80, trendPercent: 11, topRegion: "Kerala", season: "Annual" },
  { id: "sorghum", name: "Sorghum", image: placeholderImg, demandScore: 73, trendPercent: 8, topRegion: "Maharashtra", season: "Kharif" },
  { id: "sunflower", name: "Sunflower", image: placeholderImg, demandScore: 77, trendPercent: 12, topRegion: "Karnataka", season: "Rabi" },
  { id: "tea", name: "Tea", image: placeholderImg, demandScore: 85, trendPercent: 9, topRegion: "Assam", season: "Annual" },
  { id: "tulsi", name: "Tulsi", image: placeholderImg, demandScore: 67, trendPercent: 18, topRegion: "Uttar Pradesh", season: "Annual" },
  { id: "turmeric", name: "Turmeric", image: placeholderImg, demandScore: 78, trendPercent: 16, topRegion: "Telangana", season: "Kharif" },
  { id: "urad", name: "Urad", image: placeholderImg, demandScore: 74, trendPercent: 11, topRegion: "Madhya Pradesh", season: "Kharif" },
];

// Generate regions for all crops (random 5-12 markets per crop)
function generateRegions(): Region[] {
  const regions: Region[] = [];
  const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Gujarat", "Punjab", "Haryana", "Uttar Pradesh", "West Bengal", "Bihar", "Rajasthan", "Madhya Pradesh", "Andhra Pradesh", "Telangana", "Kerala", "Odisha", "Assam", "Delhi"];
  const buyerTypes = ["Export Market", "Food Processing", "Mandi", "Retail"];
  
  crops.forEach((crop, cropIndex) => {
    // Random number of markets between 5 and 12
    const marketCount = Math.floor(Math.random() * 8) + 5; // 5 to 12
    
    for (let i = 0; i < marketCount; i++) {
      const state = states[i % states.length];
      const buyerType = buyerTypes[i % buyerTypes.length];
      const basePrice = 15 + (cropIndex * 5) + (i * 2);
      const demandScore = 95 - (i * 2);
      
      regions.push({
        id: `${crop.id}-${i}`,
        cropId: crop.id,
        name: `${state} ${crop.name} Market`,
        state: state,
        avgPrice: `₹${basePrice}/kg`,
        demandScore: demandScore,
        buyerType: buyerType
      });
    }
  });
  
  return regions;
}

export const regions: Region[] = generateRegions();

// Generate vendors for all regions (3 vendors per region)
function generateVendors(): Vendor[] {
  const vendors: Vendor[] = [];
  const businessTypes = ["Wholesaler", "Exporter", "Food Processor", "Retailer"];
  const vendorNames = [
    "Agro Traders", "Farm Exports", "Kisan Supply", "Fresh Market", "Green Valley",
    "Organic Hub", "Direct Supply", "Premium Traders", "Quality Exports", "Harvest Hub"
  ];
  
  regions.forEach((region, regionIndex) => {
    for (let i = 0; i < 3; i++) {
      const vendorName = vendorNames[i % vendorNames.length];
      const businessType = businessTypes[i % businessTypes.length];
      const rating = 4.0 + (Math.random() * 1.0);
      const verified = i < 2; // First 2 vendors are verified
      
      vendors.push({
        id: `v-${region.id}-${i}`,
        regionId: region.id,
        name: `${region.state} ${vendorName}`,
        businessType: businessType,
        contact: `+91 ${90000 + regionIndex}${10000 + i}`,
        rating: Math.round(rating * 10) / 10,
        verified: verified,
        location: `${region.name}, ${region.state}`
      });
    }
  });
  
  return vendors;
}

export const vendors: Vendor[] = generateVendors();

export const indianStates = [
  "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Gujarat", "Haryana",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

export const transportRates = {
  perKmPerTon: 3.5,
  baseCharge: 500,
  // Comprehensive distance matrix between Indian states (in km)
  distances: {
    // Maharashtra connections
    "Maharashtra-Delhi": 1400,
    "Maharashtra-Karnataka": 850,
    "Maharashtra-Gujarat": 520,
    "Maharashtra-Tamil Nadu": 1200,
    "Maharashtra-Uttar Pradesh": 1300,
    "Maharashtra-Punjab": 1650,
    "Maharashtra-Haryana": 1450,
    "Maharashtra-West Bengal": 1900,
    "Maharashtra-Bihar": 1700,
    "Maharashtra-Rajasthan": 1100,
    "Maharashtra-Madhya Pradesh": 650,
    "Maharashtra-Andhra Pradesh": 750,
    "Maharashtra-Telangana": 650,
    "Maharashtra-Kerala": 1100,
    "Maharashtra-Odisha": 1600,
    "Maharashtra-Assam": 2400,
    
    // Karnataka connections
    "Karnataka-Tamil Nadu": 350,
    "Karnataka-Kerala": 600,
    "Karnataka-Andhra Pradesh": 450,
    "Karnataka-Telangana": 550,
    "Karnataka-Delhi": 2100,
    "Karnataka-Gujarat": 1200,
    "Karnataka-Madhya Pradesh": 1100,
    "Karnataka-Rajasthan": 1500,
    "Karnataka-Uttar Pradesh": 1900,
    "Karnataka-West Bengal": 2200,
    "Karnataka-Punjab": 2400,
    
    // Delhi connections
    "Delhi-Punjab": 450,
    "Delhi-Haryana": 150,
    "Delhi-Uttar Pradesh": 550,
    "Delhi-Rajasthan": 550,
    "Delhi-Madhya Pradesh": 780,
    "Delhi-Gujarat": 950,
    "Delhi-West Bengal": 1500,
    "Delhi-Bihar": 1100,
    "Delhi-Assam": 1900,
    "Delhi-Odisha": 1700,
    
    // Punjab connections
    "Punjab-Haryana": 300,
    "Punjab-Uttar Pradesh": 600,
    "Punjab-Rajasthan": 650,
    "Punjab-Madhya Pradesh": 1100,
    "Punjab-Gujarat": 1200,
    
    // West Bengal connections
    "West Bengal-Bihar": 550,
    "West Bengal-Odisha": 450,
    "West Bengal-Assam": 800,
    "West Bengal-Uttar Pradesh": 1000,
    
    // Gujarat connections
    "Gujarat-Rajasthan": 500,
    "Gujarat-Madhya Pradesh": 600,
    
    // Andhra Pradesh connections
    "Andhra Pradesh-Tamil Nadu": 450,
    "Andhra Pradesh-Telangana": 200,
    "Andhra Pradesh-Odisha": 800,
    
    // Tamil Nadu connections
    "Tamil Nadu-Kerala": 350,
    "Tamil Nadu-Telangana": 650,
    
    // Uttar Pradesh connections
    "Uttar Pradesh-Bihar": 500,
    "Uttar Pradesh-Madhya Pradesh": 600,
    "Uttar Pradesh-Haryana": 500,
    
    // Madhya Pradesh connections
    "Madhya Pradesh-Rajasthan": 550,
    "Madhya Pradesh-Telangana": 750,
    
    // Telangana connections
    "Telangana-Odisha": 900,
  } as Record<string, number>,
};

export function getDistance(from: string, to: string): number {
  // Return 0 if same state
  if (from === to) return 0;
  
  const key1 = `${from}-${to}`;
  const key2 = `${to}-${from}`;
  
  // Check if we have the exact distance
  const exactDistance = transportRates.distances[key1] || transportRates.distances[key2];
  if (exactDistance) return exactDistance;
  
  // For states not in our matrix, calculate approximate distance based on geographical zones
  const zones: Record<string, string[]> = {
    north: ["Delhi", "Punjab", "Haryana", "Uttar Pradesh", "Himachal Pradesh"],
    west: ["Gujarat", "Rajasthan", "Maharashtra"],
    south: ["Karnataka", "Tamil Nadu", "Kerala", "Andhra Pradesh", "Telangana"],
    east: ["West Bengal", "Bihar", "Odisha", "Assam"],
    central: ["Madhya Pradesh"]
  };
  
  const getZone = (state: string): string => {
    for (const [zone, states] of Object.entries(zones)) {
      if (states.includes(state)) return zone;
    }
    return "unknown";
  };
  
  const fromZone = getZone(from);
  const toZone = getZone(to);
  
  // Approximate distances between zones
  const zoneDistances: Record<string, number> = {
    "north-north": 400,
    "north-west": 800,
    "north-south": 2000,
    "north-east": 1500,
    "north-central": 700,
    "west-west": 600,
    "west-south": 1200,
    "west-east": 1800,
    "west-central": 600,
    "south-south": 500,
    "south-east": 1800,
    "south-central": 900,
    "east-east": 600,
    "east-central": 1000,
    "central-central": 400,
  };
  
  const zoneKey1 = `${fromZone}-${toZone}`;
  const zoneKey2 = `${toZone}-${fromZone}`;
  
  return zoneDistances[zoneKey1] || zoneDistances[zoneKey2] || 1200;
}

export function calculateTransportCost(from: string, to: string, weightTons: number): { distance: number; cost: number } {
  const distance = getDistance(from, to);
  const cost = transportRates.baseCharge + (distance * transportRates.perKmPerTon * weightTons);
  return { distance, cost };
}

