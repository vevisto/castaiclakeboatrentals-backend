import { useState } from 'react';
import { SvgIcon6, SvgIcon8 } from "@/components/svg";
import Input from "./Input";
import { CardElement } from "@stripe/react-stripe-js";

export default function CustomerForm({ formik }) {
  const [activeTab, setActiveTab] = useState('card');

  if (!formik) return null;

  const TabButton = ({ id, label, icon, isActive, onClick }) => (
    <button
      type="button"
      onClick={() => onClick(id)}
      className={`flex items-center gap-2 px-4 py-3 rounded-t-lg font-medium transition-all duration-200 ${
        isActive
          ? 'bg-white text-[#21252C] border-b-2 border-[#808080] shadow-sm'
          : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
      }`}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {label}
    </button>
  );

  const CardIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
    </svg>
  );



  return (
    <div className="space-y-4 rounded-4xl py-2 text-[#88907B]">
      {/* Customer details */}
      <div className="grid grid-cols-1 mx-3 md:grid-cols-2 gap-4">
        <Input
          label="First Name"
          id="firstName"
          name="firstName"
          placeholder="First Name"
          type="text"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          required
        />
        <Input
          label="Last Name"
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          type="text"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          required
        />
        <Input
          label="Email"
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
        <Input
          label="Phone"
          id="phone"
          name="phone"
          placeholder="Phone"
          type="text"
          value={formik.values.phone}
          onChange={formik.handleChange}
          required
        />
         <Input
          label="Address"
          id="address"
          name="address"
          placeholder="Address"
          type="text"
          value={formik.values.address}
          onChange={formik.handleChange}
          required
        />
        <Input
          label="Address Line 2"
          id="addressLineTo"
          name="addressLineTo"
          placeholder="Address Line 2"
          type="text"
          value={formik.values.addressLineTo}
          onChange={formik.handleChange}
          required
        />
        <Input
          label="City"
          id="city"
          name="city"
          placeholder="City"
          type="text"
          value={formik.values.city}
          onChange={formik.handleChange}
          required
        />
        <Input
          label="State"
          id="state"
          name="state"
          placeholder="State"
          type="text"
          value={formik.values.state}
          onChange={formik.handleChange}
          required
        />
        <Input
          label="Zip Code"
          id="zipCode"
          name="zipCode"
          placeholder="Zip Code"
          type="text"
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          required
        />
      </div>
      <p className='text-[14px] italic'>Please enter your email address and phone number correctly to receive your booking confirmation, ticket details, and exclusive offers.</p>

    

      {/* Payment Method Tabs */}
      <div className="mx-3">
        <label className="block font-medium mb-3 text-[20px] text-[#21252C]">Payment Method</label>
        
        {/* Tab Navigation */}
        <div className="flex  rounded-t-lg overflow-hidden">
          <TabButton
            id="card"
            label="Stripe Card"
            icon={<CardIcon />}
            isActive={activeTab === 'card'}
            onClick={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        <div className="  border-gray-200 rounded-b-lg   md:p-4">
          {activeTab === 'card' && (
            <div className="space-y-7 ">
              <div className="stripe-card-element border py-3 mt-2 border-[#808080] px-2 rounded-4xl">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                        fontSmoothing: "antialiased",
                        "::placeholder": { 
                          color: "#aab7c4" 
                        },
                        iconColor: '#666EE8',
                      },
                      invalid: { 
                        color: "#fa755a",
                        iconColor: '#fa755a'
                      },
                      complete: {
                        color: "#32325d",
                        iconColor: '#666EE8'
                      }
                    },
                    hidePostalCode: false,
                    iconStyle: 'solid',
                  }}
                />
              </div>
              {/* <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Your payment information is secure and encrypted</span>
              </div> */}
            </div>
          )}

          {activeTab === 'bank' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Account Holder Name"
                  id="accountName"
                  name="accountName"
                  placeholder="Full name on account"
                  type="text"
                  value={formik.values.accountName || ''}
                  onChange={formik.handleChange}
                />
                <Input
                  label="Account Number"
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Account number"
                  type="text"
                  value={formik.values.accountNumber || ''}
                  onChange={formik.handleChange}
                />
                <Input
                  label="Routing Number"
                  id="routingNumber"
                  name="routingNumber"
                  placeholder="9-digit routing number"
                  type="text"
                  value={formik.values.routingNumber || ''}
                  onChange={formik.handleChange}
                />
                <Input
                  label="Bank Name"
                  id="bankName"
                  name="bankName"
                  placeholder="Name of your bank"
                  type="text"
                  value={formik.values.bankName || ''}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="text-sm text-blue-700">
                    <p className="font-medium">Bank Transfer Processing</p>
                    <p>Bank transfers typically take 3-5 business days to process. Your booking will be confirmed once payment is received.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Deposit info */}
      <div className="flex gap-3 my-3 bg-[#F2EFE9] p-3 rounded-4xl md:mx-3">
        <span>
          <SvgIcon6 />
        </span>
        <p>
          To secure your booking, a $100 deposit will be charged to your card.
          This deposit is fully refundable upon return of the boat in its original condition.
        </p>
      </div>
    </div>
  );
}
