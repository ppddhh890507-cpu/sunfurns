"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-blue-900">
              SUNFURNS
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-900 transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-900 transition-colors">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-900 transition-colors">
              About Us
            </Link>
            <Link href="/faq" className="text-gray-700 hover:text-blue-900 transition-colors">
              FAQ
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-900 transition-colors">
              Contact
            </Link>
          </div>

          {/* Admin Link */}
          <div className="hidden md:block">
            <Link
              href="/Admin"
              className="text-gray-500 hover:text-blue-900 text-sm"
            >
              Admin
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors"
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-900 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-900">Home</Link>
              <Link href="/products" className="text-gray-700 hover:text-blue-900">Products</Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-900">About Us</Link>
              <Link href="/faq" className="text-gray-700 hover:text-blue-900">FAQ</Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-900">Contact</Link>
              <Link href="/contact" className="bg-blue-900 text-white px-4 py-2 rounded-lg text-center">Get Quote</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
