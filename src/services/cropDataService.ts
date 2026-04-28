// Service for loading crop data from CSV datasets and mock data

import { crops as mockCrops } from "@/data/mockData";

export interface CropInfo {
  id: string;
  name: string;
  image?: string;
  fromDataset: boolean;
}

/**
 * Get crops from mock data (hardcoded with images and market data)
 */
export function getCropsFromMockData(): CropInfo[] {
  return mockCrops.map(crop => ({
    id: crop.id,
    name: crop.name,
    image: crop.image,
    fromDataset: false
  }));
}

/**
 * Get all available crops (uses mock data which now has all 37 crops)
 */
export async function loadAllCrops(): Promise<CropInfo[]> {
  // Use mock data which now includes all 37 crops
  return getCropsFromMockData();
}

/**
 * Cache for loaded crops
 */
let cropsCache: CropInfo[] | null = null;

/**
 * Get crops with caching
 */
export async function getCrops(): Promise<CropInfo[]> {
  if (cropsCache) {
    return cropsCache;
  }
  
  cropsCache = await loadAllCrops();
  return cropsCache;
}

/**
 * Clear cache (useful for refreshing data)
 */
export function clearCropsCache(): void {
  cropsCache = null;
}
