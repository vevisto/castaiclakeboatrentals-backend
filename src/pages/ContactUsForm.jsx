'use client';

import { BACKEND_URL } from '@/constant/constant';
import React, { useRef, useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AsYouType } from 'libphonenumber-js';
import toast from 'react-hot-toast';

export default function ContactUsForm() {
  const recaptchaRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const CAPTCHA_SITE_KEY = "6LesSbkrAAAAAOwamNdsSssFTXCEMZ5FG_DjntQ4";

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
      recaptcha: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First name is required'),
      lastName: Yup.string().required('Last name is required'),
      email: Yup.string().email('Invalid email').required('Email is required'),
      phone: Yup.string().required('Phone is required'),
      subject: Yup.string().required('Subject is required'),
      message: Yup.string().required('Message is required'),
      recaptcha: Yup.string().required('Please complete the reCAPTCHA'),
    }),
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);
      try {
        const response = await fetch(`${BACKEND_URL}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success('Message sent successfully!');
          resetForm();
          recaptchaRef.current.reset();
        } else {
          toast.error('Failed to send message. Please try again.');
        }
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  const handleCaptchaChange = (value) => {
    formik.setFieldValue("recaptcha", value);
  };

  return (
    <div className="min-h-screen max-w-[800px] mx-auto  flex items-center justify-center p-4">
      <div className="rounded-2xl md:p-8 w-full">
        <div className="text-center mb-8">
          <p className="text-[#808080]  text-[16px] md:text-[20px] mb-2">Anything to Say?</p>
          <h1 className="md:text-[56px] text-nowrap font-semibold text-[#88907B]">
            We'd Love to <span className="text-[#21252C]">Hear from You!</span>
          </h1>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="flex  flex-col md:flex-row gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#808080] mb-1.5">First Name*</label>
              <input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              {formik.touched.firstName && formik.errors.firstName && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.firstName}</p>
              )}
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-[#808080] mb-1.5">Last Name*</label>
              <input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              {formik.touched.lastName && formik.errors.lastName && (
                <p className="text-sm text-red-500 mt-1">{formik.errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#808080] mb-1.5">Email*</label>
            <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder=""
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#808080] mb-1.5">Phone Number*</label>
            <PhoneInput
              country={'us'}
              enableAreaCodes={true}
              onlyCountries={['us']}
              value={formik.values.phone}
              onChange={(value) => {
                const formatted = new AsYouType('US').input('+' + value);
                formik.setFieldValue('phone', formatted);
              }}
              inputProps={{
                name: 'phone',
                required: true,
                onBlur: formik.handleBlur,
                className:
                  'w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all',
              }}
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.phone}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#808080] mb-1.5">Subject*</label>
            <input
              type="text"
              name="subject"
              value={formik.values.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
            {formik.touched.subject && formik.errors.subject && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.subject}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-[#808080] mb-1.5">Message*</label>
            <textarea
              name="message"
              rows={4}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Write your message for us"
              className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
            />
            {formik.touched.message && formik.errors.message && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.message}</p>
            )}
          </div>

          <div>
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={CAPTCHA_SITE_KEY}
              onChange={handleCaptchaChange}
              size="normal"
            />
            {formik.touched.recaptcha && formik.errors.recaptcha && (
              <p className="text-sm text-red-500 mt-1">{formik.errors.recaptcha}</p>
            )}
          </div>

          <div className="w-full flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#88907B] w-fit  text-[white] font-medium py-3 px-4 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
