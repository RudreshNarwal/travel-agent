import type { Destination } from '../types/destination';

export const destinations: Destination[] = [
  // Europe
  {
    id: 1,
    city: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    cost: 2800,
    score: 4.8,
    popularity: 95,
    bestTimeToVisit: 'April to October, peak in June-August',
    description: 'The City of Light offers iconic landmarks, world-class museums, and exquisite cuisine.',
    visaInfo: {
      type: 'visa-required',
      details: 'Schengen visa required. Processing time: 15-30 days.'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          'Morning: Visit Eiffel Tower (book first slot)',
          'Afternoon: Seine River cruise',
          'Evening: Champs-Élysées walk and Arc de Triomphe'
        ]
      }
    ]
  },
  {
    id: 2,
    city: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff',
    cost: 2200,
    score: 4.7,
    popularity: 88,
    bestTimeToVisit: 'April to October, best in September',
    description: 'Famous for white-washed buildings, stunning sunsets, and volcanic beaches.',
    visaInfo: {
      type: 'visa-required',
      details: 'Schengen visa required. Processing time: 15-30 days.'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          'Morning: Explore Oia village',
          'Afternoon: Wine tasting tour',
          'Evening: Sunset at Oia Castle'
        ]
      }
    ]
  },
  // Continue with more destinations...
  {
    id: 3,
    city: 'Interlaken',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1453791052107-5c843da62d97',
    cost: 3500,
    score: 4.9,
    popularity: 85,
    bestTimeToVisit: 'June to September for hiking, December to March for skiing',
    description: 'Adventure sports paradise with stunning Alpine scenery and lakes.',
    visaInfo: {
      type: 'visa-required',
      details: 'Schengen visa required. Processing time: 15-30 days.'
    },
    itinerary: [
      {
        day: 1,
        activities: [
          'Morning: Cable car to Schilthorn',
          'Afternoon: Visit Trümmelbach Falls',
          'Evening: Lake Brienz cruise'
        ]
      }
    ]
  }
  // Add more destinations following the same pattern...
];