import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';

interface SearchResultProps {
  destination: any;
  matchedCriteria: string[];
  onClose: () => void;
}

const SearchResults: React.FC<SearchResultProps> = ({ destination, matchedCriteria, onClose }) => {
  return (
    <Link 
      to={`/destination/${destination.id}`}
      onClick={onClose}
      className="block hover:bg-blue-50 transition-colors p-4 border-b last:border-b-0"
    >
      <div className="flex gap-4">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={destination.image}
            alt={destination.city}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-900">{destination.city}, {destination.country}</h3>
              <p className="text-sm text-gray-600">{destination.bestTimeToVisit}</p>
            </div>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="text-sm text-gray-700 ml-1">{destination.score.toFixed(1)}</span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-blue-600 font-medium">
              ${destination.cost.toLocaleString()}/person
            </p>
            <div className="mt-1 flex flex-wrap gap-2">
              {matchedCriteria.map((criteria, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  {criteria}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResults;
