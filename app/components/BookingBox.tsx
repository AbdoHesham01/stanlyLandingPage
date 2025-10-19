"use client";

import React, { useState } from "react";

type BookingProps = {
  onSearch: (opts: {
    from: string;
    to: string;
    startDate: string;
    endDate: string;
    infants: number;
  }) => void;
};

function formatInputDate(d: Date) {
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export default function BookingBox({ onSearch }: BookingProps) {
  const [from, setFrom] = useState("New York");
  const [to, setTo] = useState("Komodo Island");
  const today = new Date();
  const defaultEnd = new Date(today);
  defaultEnd.setDate(defaultEnd.getDate() + 3);
  const [startDate, setStartDate] = useState(formatInputDate(today));
  const [endDate, setEndDate] = useState(formatInputDate(defaultEnd));
  const [infants, setInfants] = useState(1);

  return (
    <div className="w-[320px] sm:w-[380px] bg-white rounded-2xl shadow-xl p-5">
      <label className="block text-xs text-gray-500">From</label>
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full border border-gray-200 rounded-md px-3 py-2 mb-3 input-black-border"
        aria-label="From location"
      >
        <option>Cairo</option>
        <option>Alex</option>
        <option>Istanbul</option>
        <option>Dubai</option>
      </select>

      <label className="block text-xs text-gray-500">To</label>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full border border-gray-200 rounded-md px-3 py-2 mb-3 input-black-border"
        aria-label="To location"
      >
        <option>Alex</option>
        <option>Cairo</option>
        <option>Istanbul</option>
        <option>Dubai</option>
      </select>

      <div className="mb-3">
        <label className="block text-xs text-gray-500">Date</label>
        <div className="flex gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-1/2 border border-gray-200 rounded-md px-3 py-2 input-black-border"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-1/2 border border-gray-200 rounded-md px-3 py-2 input-black-border"
          />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <label className="block text-xs text-gray-500">Infants</label>
          <div className="flex items-center gap-2 mt-1">
            <button
              className="w-8 h-8 rounded-full border border-black text-black"
              onClick={() => setInfants(Math.max(0, infants - 1))}
            >
              -
            </button>
            <div className="w-8 text-center border-black text-black">
              {infants}
            </div>
            <button
              className="w-8 h-8 rounded-full border border-black text-black"
              onClick={() => setInfants(infants + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex items-end">
          <button
            onClick={() => onSearch({ from, to, startDate, endDate, infants })}
            className="bg-black text-white rounded-full px-6 py-3"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
