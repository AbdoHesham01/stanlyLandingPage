"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import BookingBox from "./BookingBox";

type HeroProps = { onSearch: () => void };

export default function Hero({ onSearch }: HeroProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // set initial state immediately when component mounts
      if (heroRef.current) {
        gsap.set(heroRef.current, { scale: 2 });
      }
      if (headingRef.current) {
        gsap.set(headingRef.current, { x: -120, opacity: 0 });
      }
      if (boxRef.current) {
        gsap.set(boxRef.current, { x: 120, opacity: 0 });
      }

      const runAnimation = () => {
        const tl = gsap.timeline();

        // zoom out to normal size
        if (heroRef.current) {
          tl.to(heroRef.current, {
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          });
        }

        // heading slides in from left (after zoom starts)
        if (headingRef.current) {
          tl.to(
            headingRef.current,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.6"
          );
        }

        // booking box slides in from right (after heading)
        if (boxRef.current) {
          tl.to(
            boxRef.current,
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }
      };

      // run when loader starts fading for smooth transition
      let ran = false;
      const onFadeStart = () => {
        if (ran) return;
        ran = true;
        // start animation immediately when loader begins fading
        runAnimation();
      };

      // Listen for fade start event for smoother transition
      window.addEventListener("loader:fade-start", onFadeStart, { once: true });

      // If event already fired or loader not present, start immediately
      const overlay = document.querySelector("[data-loading-overlay]");
      if (!overlay && !ran) {
        onFadeStart();
      }

      return () => window.removeEventListener("loader:fade-start", onFadeStart);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full px-4 py-6">
      <div
        ref={heroRef}
        className="relative bg-cover bg-center rounded-[32px] overflow-hidden max-w-6xl mx-auto"
        style={{ backgroundImage: "url(/hero.avif)", height: "500px" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div
          ref={headingRef}
          className="absolute left-8 top-24 text-white max-w-xl"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight">
            {"Refreshing exploration of Egypt".split(" ").map((w, i) => (
              <span key={i} className="hero-word inline-block mr-3">
                {w}
              </span>
            ))}
          </h1>
          <p className="mt-4 text-lg text-white/90 hero-sub">
            Journey beyond the ordinary adventure trip
          </p>
        </div>

        <div className="absolute right-8 top-28" ref={boxRef}>
          <BookingBox onSearch={onSearch} />
        </div>

        {/* decorative rounded cut on right */}
      </div>
    </section>
  );
}
