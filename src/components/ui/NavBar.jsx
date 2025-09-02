'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react'; // or use your own SVG

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-16  shadow-sm bg-white w-full z-50 relative">
      <div className="max-w-[1250px] mx-auto px-4 flex items-center justify-between h-full">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/image/loga.png"
            alt="Logo"
            width={120}
            height={40}
            className="object-contain"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
          <Link href="/" className="hover:text-blue-600 transition-colors duration-200">
            Home
          </Link>
          <Link href="/articles" className="hover:text-blue-600 transition-colors duration-200">
            Articles
          </Link>
          <Link href="/about-us" className="hover:text-blue-600 transition-colors duration-200">
            About Us
          </Link>
          <Link href="/contact-us" className="hover:text-blue-600 transition-colors duration-200">
           Contact Us
          </Link>
        </nav>

        {/* Burger Menu Icon */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-white shadow-md py-4 px-6">
          <nav className="flex flex-col gap-4 text-sm font-medium text-gray-700">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              href="/articles"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition-colors duration-200"
            >
              Articles
            </Link>
            <Link
              href="/about-us"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition-colors duration-200"
            >
                    About Us
            </Link>
            <Link
              href="/contact-us"
              onClick={() => setIsOpen(false)}
              className="hover:text-blue-600 transition-colors duration-200"
            >
             Contact Us
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
