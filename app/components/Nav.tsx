import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav({
  onOpenAuth,
}: {
  onOpenAuth?: (mode?: "login" | "signup") => void;
}) {
  return (
    <nav className="w-full max-w-6xl mx-auto flex items-center justify-between py-6 px-6 sm:px-8">
      <div className="flex items-center gap-6">
        <div className="text-xl font-bold">
          <Image
            src="/logo.png"
            alt="Company Logo"
            width={150}
            height={60}
            priority
            className="brightness-0 invert"
          />
        </div>
        <ul className="hidden md:flex items-center gap-6 text-sm text-gray-700 mt-5">
          <li>
            <Link className="text-white" href="#">
              Home
            </Link>
          </li>
          <li>
            <Link href="#">About Us</Link>
          </li>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => onOpenAuth?.("login")}
          className="hidden sm:inline-block px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 hover:text-black cursor-pointer"
        >
          Login
        </button>
        <button
          onClick={() => onOpenAuth?.("signup")}
          className="inline-block px-4 py-2 rounded-full bg-black text-white hover:bg-gray-100 hover:text-black cursor-pointer"
        >
          Register
        </button>
      </div>
    </nav>
  );
}
