"use client";

import React, { useState, useEffect } from "react";

export default function AuthModal({
  open,
  onClose,
  initialMode = "login",
}: {
  open: boolean;
  onClose: () => void;
  initialMode?: "login" | "signup";
}) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  useEffect(() => {
    if (!open) setMode("login");
    else setMode(initialMode);
  }, [open, initialMode]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-white rounded-xl overflow-hidden grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[640px]">
        <div className="p-8 md:p-10 flex flex-col justify-center h-full overflow-auto">
          <div className="mb-4">
            <h3 className="text-2xl md:text-3xl font-semibold text-black">
              {mode === "login" ? "Login" : "Sign Up"}
            </h3>
            <p className="text-sm text-gray-500">
              {mode === "login"
                ? "Enter your credentials"
                : "Create an account"}
            </p>
          </div>

          {mode === "login" ? (
            <div>
              <label className="block text-black text-sm">Email</label>
              <input
                className="w-full border border-black rounded-md p-2 mb-3 input-black-border"
                value={form.email}
                placeholder="Enter Your mail"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label className="block text-sm text-black">Password</label>
              <input
                type="password"
                className="w-full border rounded-md p-2 mb-3 input-black-border"
                value={form.password}
                placeholder="Enter Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 rounded-md bg-black text-white"
                  onClick={() => {
                    alert("Logged in");
                  }}
                >
                  Login
                </button>
                <button
                  className="text-sm text-gray-500"
                  onClick={() => setMode("signup")}
                >
                  Don&apos;t have an account? Sign Up
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm text-black">Name</label>
              <input
                className="w-full border border-black rounded-md p-2 mb-3 input-black-border"
                value={form.name}
                placeholder="Enter your Name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <label className="block text-sm text-black">Email</label>
              <input
                className="w-full border border-black rounded-md p-2 mb-3 input-black-border"
                value={form.email}
                placeholder="Enter your Email"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <label className="block text-sm text-black">Password</label>
              <input
                type="password"
                className="w-full border rounded-md p-2 mb-3 input-black-border"
                value={form.password}
                placeholder="Enter your Password"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <div className="flex items-center justify-between">
                <button
                  className="px-4 py-2 rounded-md bg-black text-white"
                  onClick={() => {
                    alert("Signed up");
                  }}
                >
                  Create account
                </button>
                <button
                  className="text-sm text-gray-500"
                  onClick={() => setMode("login")}
                >
                  Have an account? Login
                </button>
              </div>
            </div>
          )}
        </div>

        <div
          className="hidden md:block bg-cover bg-no-repeat bg-center relative"
          style={{
            backgroundImage: "url(/auth-side.avif)",
            minHeight: "640px",
          }}
        >
          <div className="absolute inset-0 bg-black/20"></div>
        </div>
      </div>
    </div>
  );
}
