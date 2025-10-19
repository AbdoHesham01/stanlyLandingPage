"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function LoadingOverlay() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // keep the loader visible for 5 seconds, then fade out
    const hold = 1000; // ms
    const t = setTimeout(() => {
      if (overlayRef.current) {
        // notify the app that loader fade is starting
        try {
          window.dispatchEvent(new CustomEvent("loader:fade-start"));
        } catch {}

        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            setVisible(false);
            // notify the app that loader finished
            try {
              window.dispatchEvent(new CustomEvent("loader:finished"));
            } catch {
              // ignore
            }
          },
        });
      } else {
        setVisible(false);
        try {
          window.dispatchEvent(new CustomEvent("loader:fade-start"));
          window.dispatchEvent(new CustomEvent("loader:finished"));
        } catch {}
      }
    }, hold);

    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      data-loading-overlay
      className="fixed inset-0 bg-black z-[9999999] flex items-center justify-center"
      aria-hidden={!visible}
    >
      <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex items-center justify-center relative shadow-lg">
        <Image
          src="/loader.gif"
          alt="loading"
          width={1000}
          height={20000}
          style={{ objectFit: "cover", height: "200px" }}
        />
      </div>
    </div>
  );
}
