import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { destinations } from '../data/destinations';
import { CreditCard } from 'lucide-react';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    passportNumber: string;
    passportExpiry: string;
    nationality: string;
    email: string;
    phone: string;
  };
  travelInfo: {
    purposeOfVisit: string;
    intendedArrivalDate: string;
    durationOfStay: string;
    accommodation: string;
  };
  employmentInfo: {
    occupation: string;
    employerName: string;
    employerAddress: string;
    annualIncome: string;
  };
}

function VisaApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find(d => d.id === Number(id));
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      passportNumber: '',
      passportExpiry: '',
      nationality: '',
      email: '',
      phone: '',
    },
    travelInfo: {
      purposeOfVisit: '',
      intendedArrivalDate: '',
      durationOfStay: '',
      accommodation: '',
    },
    employmentInfo: {
      occupation: '',
      employerName: '',
      employerAddress: '',
      annualIncome: '',
    },
  });

  if (!destination || destination.visaInfo.type !== 'visa-required') {
    return (
      <div className="pt-20 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Invalid Request</h1>
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

  const handleInputChange = (section: keyof FormData, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">First Name</label>
          <input
            type="text"
            value={formData.personalInfo.firstName}
            onChange={(e) => handleInputChange('personalInfo', 'firstName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Last Name</label>
          <input
            type="text"
            value={formData.personalInfo.lastName}
            onChange={(e) => handleInputChange('personalInfo', 'lastName', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
          <input
            type="date"
            value={formData.personalInfo.dateOfBirth}
            onChange={(e) => handleInputChange('personalInfo', 'dateOfBirth', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nationality</label>
          <input
            type="text"
            value={formData.personalInfo.nationality}
            onChange={(e) => handleInputChange('personalInfo', 'nationality', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Passport Number</label>
          <input
            type="text"
            value={formData.personalInfo.passportNumber}
            onChange={(e) => handleInputChange('personalInfo', 'passportNumber', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Passport Expiry Date</label>
          <input
            type="date"
            value={formData.personalInfo.passportExpiry}
            onChange={(e) => handleInputChange('personalInfo', 'passportExpiry', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={formData.personalInfo.email}
            onChange={(e) => handleInputChange('personalInfo', 'email', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            value={formData.personalInfo.phone}
            onChange={(e) => handleInputChange('personalInfo', 'phone', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
    </div>
  );

  const renderTravelInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Purpose of Visit</label>
        <select
          value={formData.travelInfo.purposeOfVisit}
          onChange={(e) => handleInputChange('travelInfo', 'purposeOfVisit', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        >
          <option value="">Select purpose</option>
          <option value="tourism">Tourism</option>
          <option value="business">Business</option>
          <option value="education">Education</option>
          <option value="medical">Medical</option>
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Intended Arrival Date</label>
          <input
            type="date"
            value={formData.travelInfo.intendedArrivalDate}
            onChange={(e) => handleInputChange('travelInfo', 'intendedArrivalDate', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration of Stay (days)</label>
          <input
            type="number"
            value={formData.travelInfo.durationOfStay}
            onChange={(e) => handleInputChange('travelInfo', 'durationOfStay', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Accommodation Details</label>
        <textarea
          value={formData.travelInfo.accommodation}
          onChange={(e) => handleInputChange('travelInfo', 'accommodation', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );

  const renderEmploymentInfo = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Occupation</label>
        <input
          type="text"
          value={formData.employmentInfo.occupation}
          onChange={(e) => handleInputChange('employmentInfo', 'occupation', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Employer Name</label>
        <input
          type="text"
          value={formData.employmentInfo.employerName}
          onChange={(e) => handleInputChange('employmentInfo', 'employerName', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Employer Address</label>
        <textarea
          value={formData.employmentInfo.employerAddress}
          onChange={(e) => handleInputChange('employmentInfo', 'employerAddress', e.target.value)}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Annual Income</label>
        <input
          type="text"
          value={formData.employmentInfo.annualIncome}
          onChange={(e) => handleInputChange('employmentInfo', 'annualIncome', e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          required
        />
      </div>
    </div>
  );

  const renderPayment = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Visa Application Fee</h3>
        <p className="text-gray-600">Application processing fee: $160</p>
        <p className="text-gray-600">Service charge: $40</p>
        <p className="text-lg font-semibold text-gray-900 mt-2">Total: $200</p>
      </div>
      
      <div className="border rounded-lg p-6">
        <div className="flex items-center mb-4">
          <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold">Payment Details</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Card Number</label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
              <input
                type="text"
                placeholder="MM/YY"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Cardholder Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Visa Application - {destination.city}, {destination.country}
            </h1>
            <p className="text-gray-600 mb-8">{destination.visaInfo.details}</p>

            {/* Progress Steps */}
            <div className="flex justify-between mb-8">
              {['Personal Information', 'Travel Details', 'Employment Details', 'Payment'].map((step, index) => (
                <div
                  key={step}
                  className={`flex flex-col items-center w-1/4 ${
                    index + 1 === currentStep ? 'text-blue-600' : 'text-gray-400'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                    index + 1 === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200'
                  }`}>
                    {index + 1}
                  </div>
                  <span className="text-sm text-center">{step}</span>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit}>
              {currentStep === 1 && renderPersonalInfo()}
              {currentStep === 2 && renderTravelInfo()}
              {currentStep === 3 && renderEmploymentInfo()}
              {currentStep === 4 && renderPayment()}

              <div className="mt-8 flex justify-between">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ml-auto"
                >
                  {currentStep === 4 ? 'Submit Application' : 'Next'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VisaApplication;