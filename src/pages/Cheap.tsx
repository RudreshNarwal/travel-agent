import React from 'react';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';

function Cheap() {
  const cheapDestinations = destinations
    .sort((a, b) => a.cost - b.cost)
    .slice(0, 4);

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Budget-Friendly Destinations</h1>
        <p className="text-gray-600 mb-8">Explore amazing places without breaking the bank</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cheapDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cheap;