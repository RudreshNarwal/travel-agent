import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { searchDestinations } from '../utils/searchUtils';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (value.length > 2) {
      const results = searchDestinations(value);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  };

  return (
    <div className="relative max-w-2xl mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Try 'I want to visit a cheap European country with warm weather next month'"
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500 focus:outline-none pr-12"
        />
        <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
      </div>
      
      {showResults && searchResults.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[600px] overflow-y-auto z-50">
          {searchResults.map((result, index) => (
            <SearchResults
              key={index}
              destination={result.destination}
              matchedCriteria={result.matchedCriteria}
              onClose={() => setShowResults(false)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;