import { destinations } from '../data/destinations';

interface SearchCriteria {
  budget?: 'cheap' | 'moderate' | 'expensive';
  region?: string[];
  weather?: 'warm' | 'cold' | 'moderate';
  timing?: string;
  visaRequirement?: 'visa-free' | 'visa-on-arrival' | 'visa-required';
  nearLocation?: string;
  activities?: string[];
  climate?: string[];
}

interface DestinationMatch {
  destination: typeof destinations[0];
  score: number;
  matchedCriteria: string[];
}

const BUDGET_RANGES = {
  cheap: { max: 2000 },
  moderate: { min: 2000, max: 3000 },
  expensive: { min: 3000 }
};

const REGIONS = {
  european: ['Greece', 'Italy', 'France', 'Spain', 'Germany', 'UK', 'Switzerland', 'Austria'],
  asian: ['Japan', 'Thailand', 'Indonesia', 'Singapore', 'Malaysia', 'Vietnam', 'South Korea'],
  middleEast: ['UAE', 'Qatar', 'Oman', 'Saudi Arabia'],
  oceania: ['Australia', 'New Zealand', 'Fiji']
};

const CLIMATE_KEYWORDS = {
  snowy: ['snow', 'skiing', 'winter sports', 'snowfall'],
  tropical: ['beach', 'sunny', 'warm', 'tropical'],
  mediterranean: ['mild', 'sunny', 'coastal'],
  desert: ['dry', 'hot', 'arid'],
  alpine: ['mountains', 'skiing', 'snow', 'hiking']
};

const NEARBY_LOCATIONS = {
  'singapore': ['Malaysia', 'Indonesia', 'Thailand', 'Vietnam'],
  'dubai': ['Oman', 'Qatar', 'Saudi Arabia'],
  'london': ['France', 'Spain', 'Germany', 'Italy'],
  'tokyo': ['South Korea', 'Taiwan', 'Hong Kong']
};

function calculateDistance(location1: string, location2: string): number {
  // Simple proximity score based on predefined nearby locations
  const nearbyCountries = NEARBY_LOCATIONS[location1.toLowerCase()] || [];
  if (nearbyCountries.includes(location2)) {
    return nearbyCountries.indexOf(location2) + 1;
  }
  return 10; // Default large distance if not in nearby list
}

function extractSearchCriteria(query: string): SearchCriteria {
  const criteria: SearchCriteria = {};
  const lowerQuery = query.toLowerCase();

  // Budget detection
  if (lowerQuery.includes('cheap') || lowerQuery.includes('budget') || lowerQuery.includes('affordable')) {
    criteria.budget = 'cheap';
  } else if (lowerQuery.includes('luxury') || lowerQuery.includes('expensive')) {
    criteria.budget = 'expensive';
  }

  // Region detection
  if (lowerQuery.includes('europe') || lowerQuery.includes('european')) {
    criteria.region = REGIONS.european;
  } else if (lowerQuery.includes('asia') || lowerQuery.includes('asian')) {
    criteria.region = REGIONS.asian;
  } else if (lowerQuery.includes('middle east')) {
    criteria.region = REGIONS.middleEast;
  } else if (lowerQuery.includes('oceania') || lowerQuery.includes('pacific')) {
    criteria.region = REGIONS.oceania;
  }

  // Climate and weather detection
  criteria.climate = [];
  for (const [climate, keywords] of Object.entries(CLIMATE_KEYWORDS)) {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      criteria.climate.push(climate);
    }
  }

  // Weather preference
  if (lowerQuery.includes('warm') || lowerQuery.includes('hot') || lowerQuery.includes('sunny')) {
    criteria.weather = 'warm';
  } else if (lowerQuery.includes('cold') || lowerQuery.includes('cool') || lowerQuery.includes('snowy')) {
    criteria.weather = 'cold';
  }

  // Timing detection
  const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
  for (const month of months) {
    if (lowerQuery.includes(month)) {
      criteria.timing = month;
      break;
    }
  }
  if (lowerQuery.includes('next month')) {
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    criteria.timing = months[nextMonth.getMonth()];
  }

  // Nearby location detection
  for (const location of Object.keys(NEARBY_LOCATIONS)) {
    if (lowerQuery.includes(`near ${location}`)) {
      criteria.nearLocation = location;
      break;
    }
  }

  // Activity detection
  criteria.activities = [];
  const activities = ['skiing', 'beach', 'hiking', 'shopping', 'sightseeing', 'culture', 'food'];
  for (const activity of activities) {
    if (lowerQuery.includes(activity)) {
      criteria.activities.push(activity);
    }
  }

  // Visa requirements
  if (lowerQuery.includes('visa free') || lowerQuery.includes('without visa')) {
    criteria.visaRequirement = 'visa-free';
  } else if (lowerQuery.includes('visa on arrival')) {
    criteria.visaRequirement = 'visa-on-arrival';
  }

  return criteria;
}

function matchDestination(destination: typeof destinations[0], criteria: SearchCriteria): DestinationMatch {
  let score = 0;
  const matchedCriteria: string[] = [];

  // Budget matching
  if (criteria.budget) {
    const range = BUDGET_RANGES[criteria.budget];
    if (
      (range.max && destination.cost <= range.max) ||
      (range.min && destination.cost >= range.min)
    ) {
      score += 2;
      matchedCriteria.push(`Matches ${criteria.budget} budget range`);
    }
  }

  // Region matching
  if (criteria.region && criteria.region.includes(destination.country)) {
    score += 2;
    matchedCriteria.push(`Located in desired region`);
  }

  // Climate matching
  if (criteria.climate && criteria.climate.length > 0) {
    const destinationDescription = destination.description.toLowerCase();
    const bestTimeToVisit = destination.bestTimeToVisit.toLowerCase();
    
    for (const climate of criteria.climate) {
      const keywords = CLIMATE_KEYWORDS[climate];
      if (keywords.some(keyword => 
        destinationDescription.includes(keyword) || 
        bestTimeToVisit.includes(keyword)
      )) {
        score += 3;
        matchedCriteria.push(`Matches ${climate} climate preference`);
      }
    }
  }

  // Weather matching based on best time to visit
  if (criteria.weather) {
    const bestTime = destination.bestTimeToVisit.toLowerCase();
    if (
      (criteria.weather === 'warm' && (bestTime.includes('summer') || bestTime.includes('spring'))) ||
      (criteria.weather === 'cold' && (bestTime.includes('winter') || bestTime.includes('fall')))
    ) {
      score += 2;
      matchedCriteria.push(`Weather matches preference`);
    }
  }

  // Timing matching
  if (criteria.timing && destination.bestTimeToVisit.toLowerCase().includes(criteria.timing)) {
    score += 2;
    matchedCriteria.push(`Good time to visit`);
  }

  // Nearby location matching
  if (criteria.nearLocation) {
    const distance = calculateDistance(criteria.nearLocation, destination.country);
    if (distance < 5) {
      score += (5 - distance) * 2;
      matchedCriteria.push(`Near ${criteria.nearLocation}`);
    }
  }

  // Activity matching
  if (criteria.activities && criteria.activities.length > 0) {
    const destinationText = `${destination.description} ${destination.bestTimeToVisit}`.toLowerCase();
    for (const activity of criteria.activities) {
      if (destinationText.includes(activity)) {
        score += 1;
        matchedCriteria.push(`Offers ${activity}`);
      }
    }
  }

  // Visa requirement matching
  if (criteria.visaRequirement && destination.visaInfo.type === criteria.visaRequirement) {
    score += 2;
    matchedCriteria.push(`Matches visa requirements`);
  }

  return {
    destination,
    score,
    matchedCriteria
  };
}

export function searchDestinations(query: string): DestinationMatch[] {
  const criteria = extractSearchCriteria(query);
  
  return destinations
    .map(destination => matchDestination(destination, criteria))
    .filter(match => match.score > 0)
    .sort((a, b) => b.score - a.score);
}