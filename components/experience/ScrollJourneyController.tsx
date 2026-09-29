"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { journeyProgress } from "@/lib/journey-progress";

export default function ScrollJourneyController() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    journeyProgress.value = 0;

    const lenis = new Lenis({
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      wheelMultiplier: 0.8,
    });

    const updateScroll = () => ScrollTrigger.update();

    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", updateScroll);
    gsap.ticker.add(raf);

    const context = gsap.context(() => {
      gsap.to(journeyProgress, {
        value: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".journey-scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            journeyProgress.value = self.progress;
          },
          onLeaveBack: () => {
            journeyProgress.value = 0;
          },
          onLeave: () => {
            journeyProgress.value = 1;
          },
        },
      });
    });

    gsap.ticker.lagSmoothing(0);

    const refresh = () => ScrollTrigger.refresh();
    requestAnimationFrame(refresh);

    return () => {
      context.revert();
      lenis.off("scroll", updateScroll);
      gsap.ticker.remove(raf);
      lenis.destroy();
      journeyProgress.value = 0;
    };
  }, []);

  return null;
}
