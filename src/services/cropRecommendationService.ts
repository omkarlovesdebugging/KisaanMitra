export type Recommendations = Record<string, string[]>;

let _cache: Recommendations | null = null;

async function loadRecommendations(): Promise<Recommendations> {
  if (_cache) return _cache;

  try {
    const res = await fetch('/dataset/state_crop_recommendations.json');
    if (!res.ok) throw new Error(`Failed to fetch recommendations: ${res.status}`);
    const data = (await res.json()) as Recommendations;
    _cache = data;
    return data;
  } catch (err) {
    console.error('Error loading state crop recommendations:', err);
    _cache = {};
    return _cache;
  }
}

/**
 * Returns recommended crops for the provided state name.
 * State matching is case-sensitive by default (pass exact state string as used in JSON).
 * Returns an empty array if no recommendations are found.
 */
export async function getRecommendedCropsByState(state: string): Promise<string[]> {
  if (!state) return [];
  const data = await loadRecommendations();
  return data[state] ? [...data[state]] : [];
}

/**
 * Helper: returns list of available states from the dataset.
 */
export async function getAvailableStates(): Promise<string[]> {
  const data = await loadRecommendations();
  return Object.keys(data);
}

export default {
  getRecommendedCropsByState,
  getAvailableStates,
};
