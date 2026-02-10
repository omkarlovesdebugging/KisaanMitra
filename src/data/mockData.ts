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
  { id: "tomato", name: "Tomato", image: tomatoImg, demandScore: 95, trendPercent: 18, topRegion: "Maharashtra", season: "Rabi" },
  { id: "rice", name: "Rice", image: riceImg, demandScore: 92, trendPercent: 12, topRegion: "West Bengal", season: "Kharif" },
  { id: "wheat", name: "Wheat", image: wheatImg, demandScore: 90, trendPercent: 8, topRegion: "Punjab", season: "Rabi" },
  { id: "onion", name: "Onion", image: onionImg, demandScore: 88, trendPercent: 22, topRegion: "Nashik", season: "Rabi" },
  { id: "potato", name: "Potato", image: potatoImg, demandScore: 85, trendPercent: 10, topRegion: "Uttar Pradesh", season: "Rabi" },
  { id: "cotton", name: "Cotton", image: cottonImg, demandScore: 82, trendPercent: 15, topRegion: "Gujarat", season: "Kharif" },
  { id: "sugarcane", name: "Sugarcane", image: sugarcaneImg, demandScore: 80, trendPercent: 6, topRegion: "Karnataka", season: "Annual" },
  { id: "soybean", name: "Soybean", image: soybeanImg, demandScore: 78, trendPercent: 14, topRegion: "Madhya Pradesh", season: "Kharif" },
  { id: "chili", name: "Chili", image: chiliImg, demandScore: 76, trendPercent: 20, topRegion: "Andhra Pradesh", season: "Kharif" },
  { id: "maize", name: "Maize", image: maizeImg, demandScore: 74, trendPercent: 9, topRegion: "Bihar", season: "Kharif" },
];

export const regions: Region[] = [
  // Tomato regions
  { id: "mh-tom", cropId: "tomato", name: "Nashik Mandi", state: "Maharashtra", avgPrice: "₹25/kg", demandScore: 95, buyerType: "Export Market" },
  { id: "ka-tom", cropId: "tomato", name: "Bangalore Market", state: "Karnataka", avgPrice: "₹30/kg", demandScore: 90, buyerType: "Food Processing" },
  { id: "ap-tom", cropId: "tomato", name: "Kurnool Market", state: "Andhra Pradesh", avgPrice: "₹22/kg", demandScore: 88, buyerType: "Mandi" },
  { id: "tn-tom", cropId: "tomato", name: "Madurai Mandi", state: "Tamil Nadu", avgPrice: "₹28/kg", demandScore: 85, buyerType: "Retail" },
  { id: "gj-tom", cropId: "tomato", name: "Ahmedabad APMC", state: "Gujarat", avgPrice: "₹20/kg", demandScore: 82, buyerType: "Mandi" },
  { id: "rj-tom", cropId: "tomato", name: "Jaipur Market", state: "Rajasthan", avgPrice: "₹24/kg", demandScore: 80, buyerType: "Food Processing" },
  { id: "mp-tom", cropId: "tomato", name: "Indore Mandi", state: "Madhya Pradesh", avgPrice: "₹21/kg", demandScore: 78, buyerType: "Mandi" },
  { id: "wb-tom", cropId: "tomato", name: "Kolkata Market", state: "West Bengal", avgPrice: "₹26/kg", demandScore: 75, buyerType: "Retail" },
  { id: "dl-tom", cropId: "tomato", name: "Azadpur Mandi", state: "Delhi", avgPrice: "₹32/kg", demandScore: 92, buyerType: "Retail" },
  { id: "up-tom", cropId: "tomato", name: "Lucknow Market", state: "Uttar Pradesh", avgPrice: "₹23/kg", demandScore: 77, buyerType: "Mandi" },
  // Rice regions
  { id: "wb-rice", cropId: "rice", name: "Kolkata Rice Market", state: "West Bengal", avgPrice: "₹35/kg", demandScore: 92, buyerType: "Export Market" },
  { id: "pn-rice", cropId: "rice", name: "Amritsar Mandi", state: "Punjab", avgPrice: "₹32/kg", demandScore: 90, buyerType: "Food Processing" },
  { id: "ap-rice", cropId: "rice", name: "Guntur Market", state: "Andhra Pradesh", avgPrice: "₹30/kg", demandScore: 87, buyerType: "Export Market" },
  { id: "tn-rice", cropId: "rice", name: "Thanjavur Market", state: "Tamil Nadu", avgPrice: "₹33/kg", demandScore: 85, buyerType: "Mandi" },
  { id: "hr-rice", cropId: "rice", name: "Karnal Rice Hub", state: "Haryana", avgPrice: "₹31/kg", demandScore: 83, buyerType: "Food Processing" },
  { id: "up-rice", cropId: "rice", name: "Varanasi Mandi", state: "Uttar Pradesh", avgPrice: "₹28/kg", demandScore: 80, buyerType: "Retail" },
  { id: "bh-rice", cropId: "rice", name: "Patna Market", state: "Bihar", avgPrice: "₹27/kg", demandScore: 78, buyerType: "Mandi" },
  { id: "od-rice", cropId: "rice", name: "Cuttack Market", state: "Odisha", avgPrice: "₹26/kg", demandScore: 76, buyerType: "Mandi" },
  { id: "ka-rice", cropId: "rice", name: "Mandya Rice Hub", state: "Karnataka", avgPrice: "₹34/kg", demandScore: 82, buyerType: "Export Market" },
  { id: "as-rice", cropId: "rice", name: "Guwahati Market", state: "Assam", avgPrice: "₹29/kg", demandScore: 74, buyerType: "Retail" },
  // Generic fallback regions for other crops
  { id: "gen-1", cropId: "wheat", name: "Ludhiana Mandi", state: "Punjab", avgPrice: "₹28/kg", demandScore: 90, buyerType: "Export Market" },
  { id: "gen-2", cropId: "wheat", name: "Indore Market", state: "Madhya Pradesh", avgPrice: "₹26/kg", demandScore: 87, buyerType: "Food Processing" },
  { id: "gen-3", cropId: "wheat", name: "Hapur Mandi", state: "Uttar Pradesh", avgPrice: "₹25/kg", demandScore: 84, buyerType: "Mandi" },
  { id: "gen-4", cropId: "wheat", name: "Jaipur Grain Market", state: "Rajasthan", avgPrice: "₹27/kg", demandScore: 82, buyerType: "Retail" },
  { id: "gen-5", cropId: "wheat", name: "Hisar Mandi", state: "Haryana", avgPrice: "₹24/kg", demandScore: 80, buyerType: "Food Processing" },
  { id: "gen-6", cropId: "onion", name: "Lasalgaon Mandi", state: "Maharashtra", avgPrice: "₹18/kg", demandScore: 95, buyerType: "Export Market" },
  { id: "gen-7", cropId: "onion", name: "Azadpur Mandi", state: "Delhi", avgPrice: "₹22/kg", demandScore: 90, buyerType: "Retail" },
  { id: "gen-8", cropId: "onion", name: "Rajkot Market", state: "Gujarat", avgPrice: "₹16/kg", demandScore: 85, buyerType: "Mandi" },
  { id: "gen-9", cropId: "potato", name: "Agra Mandi", state: "Uttar Pradesh", avgPrice: "₹15/kg", demandScore: 88, buyerType: "Mandi" },
  { id: "gen-10", cropId: "potato", name: "Hooghly Market", state: "West Bengal", avgPrice: "₹14/kg", demandScore: 85, buyerType: "Retail" },
  { id: "gen-11", cropId: "cotton", name: "Rajkot Cotton Market", state: "Gujarat", avgPrice: "₹55/kg", demandScore: 90, buyerType: "Export Market" },
  { id: "gen-12", cropId: "cotton", name: "Nagpur Market", state: "Maharashtra", avgPrice: "₹52/kg", demandScore: 86, buyerType: "Food Processing" },
  { id: "gen-13", cropId: "sugarcane", name: "Belgaum Market", state: "Karnataka", avgPrice: "₹3.5/kg", demandScore: 88, buyerType: "Food Processing" },
  { id: "gen-14", cropId: "sugarcane", name: "Meerut Mandi", state: "Uttar Pradesh", avgPrice: "₹3.2/kg", demandScore: 85, buyerType: "Food Processing" },
  { id: "gen-15", cropId: "soybean", name: "Ujjain Market", state: "Madhya Pradesh", avgPrice: "₹45/kg", demandScore: 86, buyerType: "Export Market" },
  { id: "gen-16", cropId: "soybean", name: "Latur Market", state: "Maharashtra", avgPrice: "₹42/kg", demandScore: 83, buyerType: "Mandi" },
  { id: "gen-17", cropId: "chili", name: "Guntur Chili Market", state: "Andhra Pradesh", avgPrice: "₹120/kg", demandScore: 92, buyerType: "Export Market" },
  { id: "gen-18", cropId: "chili", name: "Khammam Market", state: "Telangana", avgPrice: "₹110/kg", demandScore: 88, buyerType: "Food Processing" },
  { id: "gen-19", cropId: "maize", name: "Patna Mandi", state: "Bihar", avgPrice: "₹18/kg", demandScore: 84, buyerType: "Food Processing" },
  { id: "gen-20", cropId: "maize", name: "Davangere Market", state: "Karnataka", avgPrice: "₹20/kg", demandScore: 80, buyerType: "Mandi" },
];

export const vendors: Vendor[] = [
  { id: "v1", regionId: "mh-tom", name: "Rajesh Agro Traders", businessType: "Wholesaler", contact: "+91 98765 43210", rating: 4.5, verified: true, location: "Nashik, Maharashtra" },
  { id: "v2", regionId: "mh-tom", name: "Fresh Farm Exports", businessType: "Exporter", contact: "+91 87654 32109", rating: 4.8, verified: true, location: "Nashik, Maharashtra" },
  { id: "v3", regionId: "mh-tom", name: "Kisan Direct Supply", businessType: "Wholesaler", contact: "+91 76543 21098", rating: 4.2, verified: false, location: "Nashik, Maharashtra" },
  { id: "v4", regionId: "ka-tom", name: "South Agro Hub", businessType: "Food Processor", contact: "+91 65432 10987", rating: 4.6, verified: true, location: "Bangalore, Karnataka" },
  { id: "v5", regionId: "ka-tom", name: "Green Valley Traders", businessType: "Wholesaler", contact: "+91 54321 09876", rating: 4.3, verified: true, location: "Bangalore, Karnataka" },
  { id: "v6", regionId: "dl-tom", name: "Delhi Fresh Market", businessType: "Retailer", contact: "+91 99887 76655", rating: 4.7, verified: true, location: "Azadpur, Delhi" },
  { id: "v7", regionId: "dl-tom", name: "Capital Veg Traders", businessType: "Wholesaler", contact: "+91 88776 65544", rating: 4.1, verified: true, location: "Azadpur, Delhi" },
  { id: "v8", regionId: "wb-rice", name: "Bengal Rice Mill", businessType: "Food Processor", contact: "+91 77665 54433", rating: 4.9, verified: true, location: "Kolkata, West Bengal" },
  { id: "v9", regionId: "wb-rice", name: "Eastern Agro Exports", businessType: "Exporter", contact: "+91 66554 43322", rating: 4.4, verified: true, location: "Kolkata, West Bengal" },
  { id: "v10", regionId: "pn-rice", name: "Punjab Rice Traders", businessType: "Wholesaler", contact: "+91 55443 32211", rating: 4.6, verified: true, location: "Amritsar, Punjab" },
  { id: "v11", regionId: "gen-1", name: "Wheat King Traders", businessType: "Wholesaler", contact: "+91 44332 21100", rating: 4.3, verified: true, location: "Ludhiana, Punjab" },
  { id: "v12", regionId: "gen-6", name: "Onion Export House", businessType: "Exporter", contact: "+91 33221 10099", rating: 4.7, verified: true, location: "Lasalgaon, Maharashtra" },
  { id: "v13", regionId: "gen-9", name: "Agra Potato Hub", businessType: "Wholesaler", contact: "+91 22110 09988", rating: 4.2, verified: false, location: "Agra, Uttar Pradesh" },
  { id: "v14", regionId: "gen-11", name: "Gujarat Cotton Corp", businessType: "Exporter", contact: "+91 11009 98877", rating: 4.8, verified: true, location: "Rajkot, Gujarat" },
  { id: "v15", regionId: "gen-17", name: "Guntur Spice Traders", businessType: "Wholesaler", contact: "+91 99001 12233", rating: 4.5, verified: true, location: "Guntur, Andhra Pradesh" },
];

export const indianStates = [
  "Andhra Pradesh", "Assam", "Bihar", "Delhi", "Gujarat", "Haryana",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha",
  "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "West Bengal"
];

export const transportRates = {
  perKmPerTon: 3.5,
  baseCharge: 500,
  distances: {
    "Maharashtra-Delhi": 1400,
    "Maharashtra-Karnataka": 650,
    "Maharashtra-Gujarat": 520,
    "Maharashtra-Tamil Nadu": 1200,
    "Maharashtra-Uttar Pradesh": 1300,
    "Punjab-Delhi": 300,
    "Punjab-Uttar Pradesh": 600,
    "Punjab-Maharashtra": 1500,
    "West Bengal-Delhi": 1500,
    "West Bengal-Bihar": 550,
    "Karnataka-Tamil Nadu": 350,
    "Karnataka-Kerala": 600,
    "Gujarat-Rajasthan": 500,
    "Gujarat-Delhi": 950,
    "Andhra Pradesh-Tamil Nadu": 450,
    "Andhra Pradesh-Karnataka": 500,
    "Madhya Pradesh-Delhi": 780,
    "Bihar-Uttar Pradesh": 500,
  } as Record<string, number>,
};

export function getDistance(from: string, to: string): number {
  const key1 = `${from}-${to}`;
  const key2 = `${to}-${from}`;
  return transportRates.distances[key1] || transportRates.distances[key2] || Math.floor(Math.random() * 1000 + 400);
}

export function calculateTransportCost(from: string, to: string, weightTons: number): { distance: number; cost: number } {
  const distance = getDistance(from, to);
  const cost = transportRates.baseCharge + (distance * transportRates.perKmPerTon * weightTons);
  return { distance, cost };
}
