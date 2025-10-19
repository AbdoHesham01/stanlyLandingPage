"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav({
  onOpenAuth,
}: {
  onOpenAuth?: (mode?: "login" | "signup") => void;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="relative z-50 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-transparent backdrop-blur-sm rounded-b-xl md:bg-transparent md:backdrop-blur-none">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={120}
            height={48}
            className="w-auto h-8 sm:h-10 lg:h-12 brightness-0 invert"
            priority
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center gap-6 text-sm lg:text-base text-gray-700">
            <li>
              <Link
                className="text-white hover:text-gray-600 transition-colors"
                href="#"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-gray-600 transition-colors"
                href="#"
              >
                About Us
              </Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenAuth?.("login")}
              className="px-4 py-2 text-sm lg:text-base rounded-full border border-gray-300 text-white hover:bg-gray-100 hover:text-black cursor-pointer transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => onOpenAuth?.("signup")}
              className="px-4 py-2 text-sm lg:text-base rounded-full bg-black text-white hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Register
            </button>
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-white  hover:bg-white transition-colors shadow-sm"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 bg-white/95 backdrop-blur-sm rounded-lg mx-2 shadow-lg">
          <ul className="flex flex-col space-y-3 mb-4 px-4">
            <li>
              <Link
                className="block text-black hover:text-gray-600 transition-colors py-2"
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                className="block text-black hover:text-gray-600 transition-colors py-2"
                href="#"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
            </li>
          </ul>

          <div className="flex flex-col space-y-3 px-4">
            <button
              onClick={() => {
                onOpenAuth?.("login");
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-center rounded-full border border-gray-300 text-black hover:bg-gray-100 transition-colors"
            >
              Login
            </button>
            <button
              onClick={() => {
                onOpenAuth?.("signup");
                setMobileMenuOpen(false);
              }}
              className="w-full px-4 py-3 text-center rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
            >
              Register
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
