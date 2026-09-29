"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function JourneyHUD() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".journey-scroll-track",
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(".entrance-copy", {
          autoAlpha: 0,
          y: -22,
          duration: 0.12,
        }, 0.1)
        .to(".entrance-index, .journey-scroll-hint", {
          autoAlpha: 0,
          duration: 0.1,
        }, 0.15)
        .fromTo(
          ".infrastructure-hud",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.18 },
          0.38
        )
        .fromTo(
          ".infrastructure-index",
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.16 },
          0.42
        )
        .fromTo(
          ".infrastructure-card",
          { autoAlpha: 0, y: 18, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.16,
            stagger: 0.05,
          },
          0.46
        )
        .fromTo(
          ".cloud-world-layer",
          { autoAlpha: 0, scale: 0.97 },
          {
            autoAlpha: 1,
            scale: 1,
            duration: 0.12,
            ease: "power2.inOut",
          },
          0.56
        );

      // Hide Infrastructure as Cloud takes over.
      timeline.to(
        ".infrastructure-hud, .infrastructure-index, .infrastructure-card",
        { autoAlpha: 0, duration: 0.07 },
        0.57
      );

      // Cloud content.
      timeline.fromTo(
        ".cloud-hud",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.08 },
        0.59
      );

      timeline.fromTo(
        ".cloud-hud-card",
        { autoAlpha: 0, y: 16 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.07,
          stagger: 0.02,
        },
        0.62
      );

      // Cloud exits as Software enters.
      timeline.to(
        ".cloud-world-layer, .cloud-hud, .cloud-hud-card, .cloud-hud-index",
        {
          autoAlpha: 0,
          duration: 0.07,
          ease: "power2.inOut",
        },
        0.72
      );

      timeline.fromTo(
        ".software-world-layer",
        { autoAlpha: 0, scale: 1.025 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.09,
          ease: "power2.inOut",
        },
        0.72
      );

      timeline.fromTo(
        ".software-hud",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.08 },
        0.76
      );

      timeline.fromTo(
        ".software-index",
        { autoAlpha: 0, y: 12 },
        { autoAlpha: 1, y: 0, duration: 0.06 },
        0.79
      );

      // Software exits as AI enters.
      timeline.to(
        ".software-world-layer, .software-hud, .software-index",
        {
          autoAlpha: 0,
          duration: 0.07,
          ease: "power2.inOut",
        },
        0.88
      );

      timeline.fromTo(
        ".ai-world-layer",
        { autoAlpha: 0, scale: 1.025 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.09,
          ease: "power2.inOut",
        },
        0.88
      );

      // Final transition: AI intelligence expands into a connected world.
      timeline.to(
        ".ai-world-layer",
        { autoAlpha: 0, scale: 0.97, duration: 0.06 },
        0.955
      );

      timeline.fromTo(
        ".connected-world-layer",
        { autoAlpha: 0, scale: 1.035 },
        {
          autoAlpha: 1,
          scale: 1,
          duration: 0.08,
          ease: "power2.out",
        },
        0.96
      );
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => context.revert();
  }, []);

  return (
    <div className="journey-hud-root" ref={root}>
      <section
        className="infrastructure-hud"
        aria-label="Infrastructure scene"
      >
        <div className="hud-eyebrow">
          <span className="hud-dot" />
          DOBIG / 02
        </div>

        <h2>
          The physical
          <br />
          <span>foundation.</span>
        </h2>

        <p className="hud-description">
          Infrastructure, engineered
          <br />
          for what comes next.
        </p>

        <div className="infrastructure-cards">
          <div className="infrastructure-card">
            <span className="hud-shape hud-square" />
            <span>
              <strong>COMPUTE</strong>
              <small>Processing power</small>
            </span>
          </div>

          <div className="infrastructure-card">
            <span className="hud-shape hud-circle" />
            <span>
              <strong>STORAGE</strong>
              <small>Data foundations</small>
            </span>
          </div>

          <div className="infrastructure-card">
            <span className="hud-shape hud-diamond" />
            <span>
              <strong>NETWORK</strong>
              <small>Connected systems</small>
            </span>
          </div>
        </div>
      </section>

      <div className="infrastructure-index">
        <span>02</span>
        <i />
        INFRASTRUCTURE
      </div>

      <section className="cloud-hud" aria-label="Cloud computing scene">
        <div className="hud-eyebrow">
          <span className="hud-dot" />
          DOBIG / 03
        </div>

        <h2>
          Beyond physical.
          <br />
          <span>Into the cloud.</span>
        </h2>

        <p className="hud-description">
          Connected infrastructure.
          <br />
          Built to scale without limits.
        </p>

        <div className="cloud-hud-cards">
          <div className="cloud-hud-card">
            <strong>PRIVATE CLOUD</strong>
            <small>Dedicated environments</small>
          </div>
          <div className="cloud-hud-card">
            <strong>MULTI-CLOUD</strong>
            <small>AWS · Azure · Google Cloud</small>
          </div>
          <div className="cloud-hud-card">
            <strong>CLOUD SECURITY</strong>
            <small>Protected by design</small>
          </div>
          <div className="cloud-hud-card">
            <strong>SCALABILITY</strong>
            <small>Resources that grow with you</small>
          </div>
        </div>

        <div className="cloud-hud-index">03 <span>———</span> CLOUD</div>
      </section>

      <section className="software-hud" aria-label="Software scene">
        <div className="software-eyebrow">
          <span className="software-status-dot" />
          DOBIG / 04 — SOFTWARE
        </div>

        <h2>
          Everything
          <br />
          <span>works together.</span>
        </h2>

        <p className="software-description">
          Connected applications. Intelligent systems.
          <br />
          Software engineered to move business forward.
        </p>

        <div className="software-capabilities">
          <span>APPLICATIONS</span>
          <i />
          <span>INTEGRATION</span>
          <i />
          <span>AUTOMATION</span>
        </div>
      </section>

      <div className="software-index">
        <span>04</span>
        <i />
        SOFTWARE
      </div>
    </div>
  );
}
