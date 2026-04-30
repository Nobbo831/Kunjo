"use client";

import React, { useState } from "react";
import { HeroPanel } from "@/components/auth/hero-panel";
import { LoginForm } from "@/components/auth/login-form";
import { SignupForm } from "@/components/auth/signup-form";
import { KunjoLogoIcon } from "@/components/auth/icons";
import { BRAND_NAME } from "@/components/auth/auth.constants";
import { authStyles } from "@/components/auth/auth.styles";

type Tab = "login" | "signup";

export default function LoginSignupPage() {
  const [tab, setTab] = useState<Tab>("login");

  return (
    <>
      <style>{authStyles}</style>

      <div className="lsf-root">
        <div className="lsf-card">
          {/* ── Left: Hero image ── */}
          <HeroPanel tab={tab} />

          {/* ── Right: Forms ── */}
          <div className="lsf-right">
            {/* Tab bar — always visible, never collapses */}
            <div className="lsf-tabbar">
              <div className="lsf-brand">
                <div className="lsf-brand-mark">
                  <KunjoLogoIcon />
                </div>
                {BRAND_NAME}
              </div>
              <div className="lsf-tabs">
                <button
                  type="button"
                  className={`lsf-tab${tab === "login" ? " active" : ""}`}
                  onClick={() => setTab("login")}
                >
                  Log In
                </button>
                <button
                  type="button"
                  className={`lsf-tab${tab === "signup" ? " active" : ""}`}
                  onClick={() => setTab("signup")}
                >
                  Sign Up
                </button>
              </div>
            </div>

            {/* Scrollable form — takes all remaining height */}
            <div className="lsf-scroll">
              {tab === "login" ? (
                <LoginForm onSwitch={() => setTab("signup")} />
              ) : (
                <SignupForm onSwitch={() => setTab("login")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
