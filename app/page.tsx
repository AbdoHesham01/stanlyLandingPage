"use client";

import React, { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import SeatMapModal from "./components/SeatMapModal";
import AuthModal from "./components/AuthModal";

export default function Home() {
  const [seatOpen, setSeatOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");

  return (
    <div className="min-h-screen overflow-hidden">
      <Nav
        onOpenAuth={(mode) => {
          setAuthMode(mode || "login");
          setAuthOpen(true);
        }}
      />
      <main>
        <Hero onSearch={() => setSeatOpen(true)} />
      </main>

      <SeatMapModal open={seatOpen} onClose={() => setSeatOpen(false)} />
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        initialMode={authMode}
      />
    </div>
  );
}
