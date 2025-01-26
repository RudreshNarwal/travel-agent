import React, { useState } from 'react';
import { destinations } from '../data/destinations';
import DestinationCard from '../components/DestinationCard';
import SearchBar from '../components/SearchBar';
import { ArrowRight, Globe2, Calendar, Compass, MapPin, Plane, Shield, CreditCard, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

function Home() {
  const [showAllDestinations, setShowAllDestinations] = useState(false);
  
  const sortedDestinations = [...destinations].sort((a, b) => b.popularity - a.popularity);
  const topDestinations = sortedDestinations.slice(0, 10);
  const displayDestinations = showAllDestinations ? sortedDestinations : topDestinations;

  const travelTips = [
    {
      title: "Best Time to Travel",
      description: "October to March is ideal for most destinations with pleasant weather and fewer crowds",
      icon: Calendar
    },
    {
      title: "Visa Processing",
      description: "Apply at least 2 months before travel date for smooth visa processing",
      icon: Shield
    },
    {
      title: "Budget Planning",
      description: "Consider local transportation and food costs beyond accommodation",
      icon: CreditCard
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      destination: "Switzerland",
      text: "DesiHopper made planning my Europe trip so easy. Their visa guidance was invaluable!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
    },
    {
      name: "Rahul Mehta",
      destination: "Japan",
      text: "The detailed itineraries helped me make the most of my Tokyo adventure.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
    },
    {
      name: "Anita Patel",
      destination: "Thailand",
      text: "Perfect recommendations for my family vacation. Will definitely use again!",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-[600px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80"
            alt="Travel Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        
        <div className="relative pt-48 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-white mb-6">
              Discover Your Next Adventure
            </h1>
            <p className="text-xl text-white mb-8">
              Explore the world's most beautiful destinations
            </p>
            <SearchBar />
          </div>
        </div>
      </div>

      {/* Popular Destinations */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Most Popular Among Indians</h2>
          {!showAllDestinations && (
            <button
              onClick={() => setShowAllDestinations(true)}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              See All Destinations
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>

        {/* Why Choose Us Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Choose DesiHopper</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Globe2, title: "Global Coverage", desc: "Access to 100+ destinations worldwide" },
              { icon: Compass, title: "Expert Guidance", desc: "Personalized travel recommendations" },
              { icon: MapPin, title: "Local Insights", desc: "Authentic experiences and hidden gems" },
              { icon: Plane, title: "Visa Support", desc: "End-to-end visa assistance" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Tips Section */}
        <div className="mt-24 bg-blue-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Essential Travel Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {travelTips.map((tip, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <tip.icon className="h-8 w-8 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{tip.title}</h3>
                <p className="text-gray-600">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">What Our Travelers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">Visited {testimonial.destination}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-24 bg-gray-900 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get Travel Updates</h2>
          <p className="text-gray-300 mb-8">Subscribe to receive exclusive deals and travel tips</p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        {/* Travel Stats */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "100+", label: "Destinations" },
            { number: "50k+", label: "Happy Travelers" },
            { number: "95%", label: "Success Rate" },
            { number: "24/7", label: "Support" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {showAllDestinations && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Explore by Region</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/region/asia" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-gray-900">Asia</h4>
                <p className="text-sm text-gray-600">15 destinations</p>
              </Link>
              <Link to="/region/europe" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-gray-900">Europe</h4>
                <p className="text-sm text-gray-600">12 destinations</p>
              </Link>
              <Link to="/region/middle-east" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-gray-900">Middle East</h4>
                <p className="text-sm text-gray-600">8 destinations</p>
              </Link>
              <Link to="/region/oceania" className="p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                <h4 className="font-semibold text-gray-900">Oceania</h4>
                <p className="text-sm text-gray-600">6 destinations</p>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;