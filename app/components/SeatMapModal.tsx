"use client";

import React, { useState } from "react";
import AuthModal from "./AuthModal";

export default function SeatMapModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  const [authOpen, setAuthOpen] = useState(false);

  const rows = 6;
  const cols = 4;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-3xl bg-white rounded-xl p-6">
        <div className="text-lg font-semibold mb-4 text-black">
          {selectedSeat ? `Selected: ${selectedSeat}` : "Select your seat"}
        </div>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: rows }).map((_, r) => (
            <React.Fragment key={r}>
              {Array.from({ length: cols }).map((_, c) => {
                const seatId = `${String.fromCharCode(65 + r)}${c + 1}`;
                return (
                  <button
                    key={seatId}
                    onClick={() => {
                      setSelectedSeat(seatId);
                      setAuthOpen(true);
                    }}
                    className="h-12 rounded-md bg-green-50 border border-green-200 text-gray-500"
                  >
                    {seatId}
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-black text-black cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
