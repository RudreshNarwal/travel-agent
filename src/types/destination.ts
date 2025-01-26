export interface Destination {
  id: number;
  city: string;
  country: string;
  image: string;
  cost: number;
  score: number;
  popularity: number;
  bestTimeToVisit: string;
  itinerary: {
    day: number;
    activities: string[];
  }[];
  visaInfo: {
    type: 'visa-free' | 'visa-on-arrival' | 'visa-required';
    details: string;
  };
  description: string;
}