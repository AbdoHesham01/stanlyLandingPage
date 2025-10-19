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
    <div className="w-full max-w-[320px] sm:max-w-[380px] lg:max-w-[400px] bg-white rounded-2xl shadow-xl p-4 sm:p-5 lg:p-6 mx-auto">
      <label className="block text-xs text-gray-500 mb-1">From</label>
      <select
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full border border-gray-200 rounded-md px-3 py-2 mb-3 text-sm input-black-border"
        aria-label="From location"
      >
        <option>Cairo</option>
        <option>Alex</option>
        <option>Istanbul</option>
        <option>Dubai</option>
      </select>

      <label className="block text-xs text-gray-500 mb-1">To</label>
      <select
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full border border-gray-200 rounded-md px-3 py-2 mb-3 text-sm input-black-border"
        aria-label="To location"
      >
        <option>Alex</option>
        <option>Cairo</option>
        <option>Istanbul</option>
        <option>Dubai</option>
      </select>

      <div className="mb-3">
        <label className="block text-xs text-gray-500 mb-1">Date</label>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm input-black-border"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="flex-1 border border-gray-200 rounded-md px-3 py-2 text-sm input-black-border"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 mb-4">
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">Infants</label>
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 rounded-full border border-black text-black hover:bg-gray-100 transition-colors"
              onClick={() => setInfants(Math.max(0, infants - 1))}
            >
              -
            </button>
            <div className="w-8 text-center border-black text-black font-medium">
              {infants}
            </div>
            <button
              className="w-8 h-8 rounded-full border border-black text-black hover:bg-gray-100 transition-colors"
              onClick={() => setInfants(infants + 1)}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={() => onSearch({ from, to, startDate, endDate, infants })}
          className="w-full sm:w-auto bg-black text-white rounded-full px-6 py-3 hover:bg-gray-800 transition-colors font-medium"
        >
          Explore
        </button>
      </div>
    </div>
  );
}
