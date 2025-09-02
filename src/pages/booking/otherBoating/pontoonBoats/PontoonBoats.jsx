'use client';
import React, { useState } from 'react';

const PontoonBookingSystem = () => {
  const [currentView, setCurrentView] = useState('booking'); // 'booking', 'checkout', or 'success'

  const handleFindBoat = () => {
    setCurrentView('checkout');
  };

  const handleBack = () => {
    setCurrentView('booking');
  };

  const handlePayment = () => {
    setCurrentView('success');
  };

  const PontoonBookingCard = () => (
    <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6 border">
      {/* Left Content */}
      <div className="flex-1">
        <h2 className="text-xl font-bold mb-1">Pontoon Boats Shuttle (Full Day)</h2>
        <p className="text-sm text-gray-500 mb-4">Pontoon 16–20ft</p>
        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {[
            'Captain', 'Bimini top', 'Comfortable lounge seating',
            'Table', 'Storage compartments', 'Insurance',
            'Sunscreen and sun protection',
          ].map((feature) => (
            <span
              key={feature}
              className="bg-gray-100 text-sm text-gray-700 px-3 py-1 rounded-full"
            >
              {feature}
            </span>
          ))}
        </div>
        {/* Safety Info */}
        <div className="bg-orange-50 text-sm p-3 rounded-md flex gap-2 text-gray-700 border border-orange-200">
          <span className="text-orange-500 text-lg mt-0.5">ⓘ</span>
          <span>
            <strong>Safety Equipments Included:</strong> Life jackets, first aid kits, flares,
            navigation lights, and throwable floatation devices.
          </span>
        </div>
      </div>
      {/* Right Side */}
      <div className="w-full md:w-64 border-l md:pl-6 pt-4 md:pt-0">
        <p className="text-sm text-gray-400 mb-2">Date Shuttle</p>
        <h3 className="font-semibold text-sm mb-6">Sunday, May 10, 2025</h3>
        {/* Prices */}
        <div className="space-y-3 text-sm mb-4">
          <div className="flex justify-between">
            <span>Pontoon Boats <span className="text-gray-400">(4 hour)</span></span>
            <span>
              <span className="line-through text-gray-400 mr-1">$100.00</span>
              $85.00
            </span>
          </div>
          <div className="flex justify-between">
            <span>Fishing Equipment <span className="text-gray-400">(2 pax)</span></span>
            <span>
              <span className="line-through text-gray-400 mr-1">$45.00</span>
              $30.00
            </span>
          </div>
        </div>
        {/* Total */}
        <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4">
          <span>Total</span>
          <span className="text-blue-600">$115.00</span>
        </div>
        {/* Button */}
        <button 
          onClick={handleFindBoat}
          className="w-full bg-yellow-400 hover:bg-yellow-500 transition text-sm font-medium py-2 rounded-full flex items-center justify-center gap-2"
        >
          Find Boat <span className="text-lg">→</span>
        </button>
      </div>
    </div>
  );

  const CheckoutForm = () => (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button 
          onClick={handleBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
        >
          <span className="text-sm">←</span>
          <span className="text-sm">Checkout & Personal Information</span>
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side - Form */}
        <div className="flex-1">
          {/* Personal Information */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Full Name</label>
                <input 
                  type="text" 
                  placeholder="Johnson"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Johnson"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Required</label>
              <input 
                type="email" 
                placeholder="example@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+977-9999999999"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-6">
            <p className="text-xs text-gray-500 mb-2">
              Please read our rental and service terms carefully to ensure your booking.
            </p>
            <div className="flex items-start gap-2">
              <input type="checkbox" id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-xs text-gray-600">
                I have read and agree to the Terms and Conditions and Privacy Policy.
              </label>
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            
            {/* Payment Method Selection */}
            <div className="flex gap-4 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" defaultChecked className="text-blue-600" />
                <span className="text-sm">Card</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" className="text-blue-600" />
                <span className="text-sm">PayPal</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="payment" className="text-blue-600" />
                <span className="text-sm">Apple Pay</span>
              </label>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Card Number</label>
                <input 
                  type="text" 
                  placeholder="4567 8901 2345 6789"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Expiration</label>
                  <input 
                    type="text" 
                    placeholder="MM / YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">CVC</label>
                  <input 
                    type="text" 
                    placeholder="123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Order Summary */}
        <div className="lg:w-80 bg-gray-50 rounded-xl p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-1">Date Shuttle</p>
            <h3 className="font-semibold">Sunday, May 10, 2025</h3>
          </div>

          <div className="space-y-3 text-sm mb-6">
            <div className="flex justify-between">
              <span>Pontoon Boats</span>
              <span>$85.00</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Fishing Equipment</span>
              <span>$30.00</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span className="text-blue-600">$115.00</span>
            </div>
          </div>

          <div className="mb-4">
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>I have read and agree to the Terms and Conditions and Privacy Policy.</span>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            className="w-full bg-yellow-400 hover:bg-yellow-500 transition font-medium py-3 rounded-full"
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );

  const SuccessPage = () => (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8 text-center">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <span className="text-green-500 text-2xl">✓</span>
      </div>

      {/* Success Message */}
      <p className="text-gray-600 mb-8">
        Transaction successful! Find your receipt in your inbox at example@email.com.
      </p>

      {/* Booking Details Card */}
      <div className="bg-gray-50 rounded-xl p-6 mb-6">
        <div className="flex justify-between items-start mb-4">
          <div className="text-left">
            <h3 className="text-lg font-semibold text-gray-800">Pontoon Boats Shuttle (Full Day)</h3>
            <p className="text-gray-500 text-sm">Sunday, May 10, 2025</p>
          </div>
          <button className="bg-yellow-400 hover:bg-yellow-500 transition text-sm font-medium px-4 py-2 rounded-full">
            Download Receipt
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[
            { icon: '⚓', text: 'Captain' },
            { icon: '☂️', text: 'Bimini top' },
            { icon: '🛋️', text: 'Comfortable lounge seating' },
            { icon: '🪑', text: 'Table' },
            { icon: '📦', text: 'Storage compartments' },
            { icon: '🛡️', text: 'Insurance' },
            { icon: '☀️', text: 'Sunscreen and sun protection' }
          ].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
              <span className="text-blue-500">{feature.icon}</span>
              <span className="text-xs">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Safety Equipment */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 flex items-start gap-2 text-sm">
          <span className="text-orange-500 text-lg mt-0.5 flex-shrink-0">ⓘ</span>
          <span className="text-gray-700">
            <strong>Safety Equipments Included:</strong> Life jackets, first aid kits, flares, navigation lights, and throwable floatation devices.
          </span>
        </div>
      </div>


    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      {currentView === 'booking' && <PontoonBookingCard />}
      {currentView === 'checkout' && <CheckoutForm />}
      {currentView === 'success' && <SuccessPage />}
    </div>
  );
};

export default PontoonBookingSystem;