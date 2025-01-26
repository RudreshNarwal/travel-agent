import React from 'react';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Destination } from '../data/destinations';

interface Props {
  destination: Destination;
}

const DestinationCard = ({ destination }: Props) => {
  return (
    <Link to={`/destination/${destination.id}`} className="block">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform hover:scale-105">
        <div className="relative h-48">
          <img
            src={destination.image}
            alt={`${destination.city}, ${destination.country}`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold text-gray-900">{destination.city}</h3>
          <p className="text-gray-600 mb-4">{destination.country}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-700">{destination.score.toFixed(1)}</span>
            </div>
            <p className="text-blue-600 font-semibold">
              ${destination.cost.toLocaleString()}/person
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default DestinationCard;