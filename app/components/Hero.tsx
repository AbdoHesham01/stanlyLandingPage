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
        // Responsive slide distance based on screen size
        const slideDistance = window.innerWidth < 768 ? -80 : -120;
        gsap.set(headingRef.current, { x: slideDistance, opacity: 0 });
      }
      if (boxRef.current) {
        // Responsive slide distance based on screen size
        const slideDistance = window.innerWidth < 768 ? 80 : 120;
        gsap.set(boxRef.current, { x: slideDistance, opacity: 0 });
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
    <section className="w-full px-2 sm:px-4 lg:px-6 py-3 sm:py-6">
      <div
        ref={heroRef}
        className="hero-container relative bg-cover bg-center rounded-2xl sm:rounded-3xl lg:rounded-[32px] overflow-hidden max-w-7xl mx-auto"
        style={{
          backgroundImage: "url(/hero.avif)",
          height: "80vh",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Hero Content - Responsive Layout */}
        <div className="hero-content absolute inset-0 flex flex-col lg:flex-row lg:items-center justify-start lg:justify-between p-4 sm:p-6 lg:p-8 overflow-y-auto lg:overflow-hidden">
          <div
            ref={headingRef}
            className="flex-1 max-w-2xl lg:max-w-xl pt-4 sm:pt-8 lg:pt-0"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-white">
              {"Refreshing exploration of Egypt".split(" ").map((w, i) => (
                <span key={i} className="hero-word inline-block mr-2 sm:mr-3">
                  {w}
                </span>
              ))}
            </h1>
            <p className="mt-3 sm:mt-4 lg:mt-6 text-base sm:text-lg lg:text-xl text-white/90 hero-sub">
              Journey beyond the ordinary adventure trip
            </p>
          </div>

          <div
            ref={boxRef}
            className="mt-6 sm:mt-8 lg:mt-0 lg:ml-8 flex-shrink-0 w-full lg:w-auto flex justify-center lg:justify-end pb-4 lg:pb-0"
          >
            <BookingBox onSearch={onSearch} />
          </div>
        </div>

        {/* decorative rounded cut on right */}
      </div>
    </section>
  );
}
