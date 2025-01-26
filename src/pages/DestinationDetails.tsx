import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { Calendar, DollarSign, Plane, MapPin } from 'lucide-react';

function DestinationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === Number(id));

  if (!destination) {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destination not found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:text-blue-800"
          >
            Return to home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[400px]">
        <img
          src={destination.image}
          alt={`${destination.city}, ${destination.country}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-2">{destination.city}</h1>
            <p className="text-xl text-white">{destination.country}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <Calendar className="h-6 w-6 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold text-gray-900">Best Time to Visit</h3>
              <p className="text-gray-600">{destination.bestTimeToVisit}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <DollarSign className="h-6 w-6 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold text-gray-900">Estimated Cost</h3>
              <p className="text-gray-600">${destination.cost}/person</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
            <Plane className="h-6 w-6 text-blue-600 mr-4" />
            <div>
              <h3 className="font-semibold text-gray-900">Visa Status</h3>
              <p className="text-gray-600">{destination.visaInfo.type.replace(/-/g, ' ')}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About {destination.city}</h2>
          <p className="text-gray-600">{destination.description}</p>
        </div>

        {/* Itinerary */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Suggested Itinerary</h2>
          <div className="space-y-8">
            {destination.itinerary.map((day) => (
              <div key={day.day} className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-xl text-gray-900 mb-3">Day {day.day}</h3>
                <ul className="space-y-2">
                  {day.activities.map((activity, index) => (
                    <li key={index} className="flex items-start">
                      <MapPin className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Visa Information */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Visa Information</h2>
          <p className="text-gray-600 mb-6">{destination.visaInfo.details}</p>
          <div className="flex gap-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Plan Your Trip
            </button>
            {destination.visaInfo.type === 'visa-required' && (
              <button
                onClick={() => navigate(`/visa-application/${destination.id}`)}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Apply for Visa
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;