import React from 'react';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

function Popular() {
  const popularDestinations = destinations.filter(dest => dest.score >= 4.8);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Most Popular Destinations</h1>
        <p className="text-gray-600 mb-8">Discover the world's highest-rated travel destinations</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Popular;