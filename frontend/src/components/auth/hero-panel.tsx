import React, { useEffect, useState } from "react";
import { HERO_IMAGES, HERO_STATS } from "./auth.constants";

type Tab = "login" | "signup";

interface HeroPanelProps {
  tab: Tab;
}

export function HeroPanel({ tab }: HeroPanelProps) {
  const [imgIdx, setImgIdx] = useState(0);

  useEffect(() => {
    if (HERO_IMAGES.length <= 1) return;
    const timer = setInterval(
      () => setImgIdx((i) => (i + 1) % HERO_IMAGES.length),
      5000,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="lsf-hero">
      {HERO_IMAGES.map((src, i) => (
        <img
          key={src}
          src={src}
          alt=""
          className={`lsf-hero-img${i === imgIdx ? " active" : ""}`}
        />
      ))}
      <div className="lsf-hero-overlay" />
      <div className="lsf-hero-body">
        <div className="lsf-hero-badge">
          <span className="lsf-pulse" />
          {tab === "login" ? "Welcome" : "Join us today"}
        </div>
        <h1 className="lsf-hero-title">
          {tab === "login" ? (
            <span>
              Welcome
            </span>
          ) : (
            <span>
              The First Step
            </span>
          )}
        </h1>
        <p className="lsf-hero-desc">
          {tab === "login"
            ? "Your personalized campus dashboard is waiting for you."
            : "Your essentials, your community, and your progress ,all exactly where you left them."}
        </p>
        <div className="lsf-stats">
          {HERO_STATS.map(({ number, label }, i, arr) => (
            <React.Fragment key={label}>
              <div className="lsf-stat">
                <span className="lsf-stat-n">{number}</span>
                <span className="lsf-stat-l">{label}</span>
              </div>
              {i < arr.length - 1 && <div className="lsf-stat-sep" />}
            </React.Fragment>
          ))}
        </div>
      </div>
      {HERO_IMAGES.length > 1 && (
        <div className="lsf-dots">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`lsf-dot${i === imgIdx ? " active" : ""}`}
              onClick={() => setImgIdx(i)}
              aria-label={`Image ${i + 1}`}
              type="button"
            />
          ))}
        </div>
      )}
    </div>
  );
}
