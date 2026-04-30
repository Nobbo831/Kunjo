export const authStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

  /* ── Page shell ── */
  .lsf-root {
    min-height: 100vh;
    background: #f0fdf4;
    display: flex; align-items: center; justify-content: center;
    padding: 1.5rem;
    font-family: 'Poppins', 'Segoe UI', system-ui, sans-serif;
  }

  /* ── The whole card: FIXED size, never changes ── */
  .lsf-card {
    width: 980px;
    height: 640px;
    display: flex;
    border-radius: 22px;
    overflow: hidden;
    box-shadow:
      0 0 0 1.5px rgba(34,197,94,0.2),
      0 30px 70px rgba(0,0,0,0.1),
      0 10px 28px rgba(34,197,94,0.07);
  }
  @media (max-width: 1040px) { .lsf-card { width: 100%; } }
  @media (max-width: 780px)  { .lsf-card { height: auto; min-height: 640px; } }

  /* ── Hero half ── */
  .lsf-hero {
    position: relative;
    width: 390px; flex-shrink: 0;
    overflow: hidden;
    background: #052e16;
  }
  @media (max-width: 780px) { .lsf-hero { display: none; } }

  .lsf-hero-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; opacity: 0;
    transition: opacity 0.9s ease;
  }
  .lsf-hero-img.active { opacity: 1; }

  .lsf-hero-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(170deg,
      rgba(5,46,22,0.3) 0%,
      rgba(5,46,22,0.55) 45%,
      rgba(2,33,12,0.9) 100%);
  }
  .lsf-hero-body {
    position: relative; z-index: 2;
    padding: 2rem 1.75rem 2rem;
    height: 100%;
    display: flex; flex-direction: column; justify-content: flex-end;
    gap: 0.9rem;
  }
  .lsf-hero-badge {
    display: inline-flex; align-items: center; gap: 0.45rem;
    background: rgba(34,197,94,0.14);
    border: 1px solid rgba(34,197,94,0.28);
    color: #4ade80;
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
    padding: 0.28rem 0.7rem; border-radius: 99px; width: fit-content;
    backdrop-filter: blur(6px);
  }
  .lsf-pulse {
    width: 6px; height: 6px; border-radius: 50%;
    background: #22c55e; box-shadow: 0 0 6px #22c55e;
    animation: lsfPulse 2s infinite;
  }
  @keyframes lsfPulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .lsf-hero-title {
    font-size: 1.65rem; font-weight: 800;
    color: #fff; line-height: 1.15; letter-spacing: -0.025em;
  }
  .lsf-hero-desc {
    font-size: 0.81rem; line-height: 1.7;
    color: rgba(255,255,255,0.62); max-width: 280px;
  }
  .lsf-stats { display: flex; align-items: center; gap: 1.1rem; margin-top: 0.2rem; }
  .lsf-stat { display: flex; flex-direction: column; gap: 0.1rem; }
  .lsf-stat-n { color: #4ade80; font-size: 1.15rem; font-weight: 800; }
  .lsf-stat-l {
    color: rgba(255,255,255,0.48); font-size: 0.65rem;
    text-transform: uppercase; letter-spacing: 0.07em;
  }
  .lsf-stat-sep { width: 1px; height: 1.8rem; background: rgba(255,255,255,0.14); }

  .lsf-dots {
    position: absolute; bottom: 1rem; left: 0; right: 0;
    display: flex; justify-content: center; gap: 0.4rem; z-index: 3;
  }
  .lsf-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: rgba(255,255,255,0.28); border: none; cursor: pointer; padding: 0;
    transition: background 0.3s, transform 0.3s;
  }
  .lsf-dot.active { background: #22c55e; transform: scale(1.35); }

  /* ── Right side ── */
  .lsf-right {
    flex: 1; display: flex; flex-direction: column;
    background: #fff; overflow: hidden;
  }

  /* ── Tab bar ── */
  .lsf-tabbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 1.1rem 1.6rem;
    border-bottom: 1px solid #e9faf0;
    background: #fcfffe;
    flex-shrink: 0;
  }
  .lsf-brand {
    display: flex; align-items: center; gap: 0.5rem;
    font-weight: 800; font-size: 0.88rem; color: #14532d;
  }
  .lsf-brand-mark {
    width: 27px; height: 27px; border-radius: 8px;
    background: linear-gradient(135deg, #22c55e 0%, #15803d 100%);
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 8px rgba(34,197,94,0.38);
    color: #fff;
  }
  .lsf-tabs {
    display: flex;
    background: #f0fdf4;
    border: 1.5px solid #bbf7d0;
    border-radius: 10px;
    padding: 3px; gap: 3px;
  }
  .lsf-tab {
    padding: 0.38rem 1.15rem;
    border-radius: 7px; border: none;
    font-size: 0.82rem; font-weight: 700; font-family: inherit;
    cursor: pointer; transition: all 0.2s;
    background: transparent; color: #6b7280;
  }
  .lsf-tab.active {
    background: #16a34a; color: #fff;
    box-shadow: 0 2px 10px rgba(22,163,74,0.38);
  }
  .lsf-tab:not(.active):hover { color: #14532d; background: #dcfce7; }

  /* ── Scrollable area ── */
  .lsf-scroll {
    flex: 1; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: #bbf7d0 transparent;
  }
  .lsf-scroll::-webkit-scrollbar { width: 4px; }
  .lsf-scroll::-webkit-scrollbar-track { background: transparent; }
  .lsf-scroll::-webkit-scrollbar-thumb { background: #bbf7d0; border-radius: 99px; }

  /* ── Panel content ── */
  .lsf-panel {
    padding: 1.75rem 1.75rem 2rem;
    display: flex; flex-direction: column; gap: 0;
  }
  .lsf-panel-head { margin-bottom: 1.35rem; }
  .lsf-panel-title {
    font-size: 1.45rem; font-weight: 800;
    color: #0a1f0f; letter-spacing: -0.02em; margin-bottom: 0.28rem;
  }
  .lsf-panel-sub { font-size: 0.82rem; color: #6b7280; line-height: 1.55; }

  /* ── Form ── */
  .lsf-form { display: flex; flex-direction: column; gap: 0.8rem; }
  .lsf-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0.7rem; }
  @media (max-width: 500px) { .lsf-row { grid-template-columns: 1fr; } }

  /* ── Field ── */
  .lsf-field { display: flex; flex-direction: column; gap: 0.32rem; }
  .lsf-label {
    font-size: 0.72rem; font-weight: 700; color: #374151;
    letter-spacing: 0.04em; text-transform: uppercase;
  }
  .lsf-input-wrap { position: relative; display: flex; align-items: center; }
  .lsf-icon {
    position: absolute; left: 0.72rem; z-index: 1;
    color: #9ca3af; display: flex; align-items: center; pointer-events: none;
  }
  .lsf-trail {
    position: absolute; right: 0.45rem; z-index: 1;
    display: flex; align-items: center;
  }

  /* Override shadcn Input styles */
  .lsf-input {
    height: 2.5rem !important;
    background: #f9fafb !important;
    border: 1.5px solid #e5e7eb !important;
    border-radius: 9px !important;
    color: #111827 !important;
    font-size: 0.84rem !important;
    font-family: inherit !important;
    transition: border-color 0.18s, box-shadow 0.18s, background 0.18s !important;
  }
  .lsf-input::placeholder { color: #d1d5db !important; }
  .lsf-input:focus {
    border-color: #22c55e !important;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.13) !important;
    background: #fff !important;
    outline: none !important;
  }
  .lsf-input.lsf-pl { padding-left: 2.2rem !important; }
  .lsf-input.lsf-pr { padding-right: 2.3rem !important; }

  /* Select */
  .lsf-select {
    height: 2.5rem;
    background: #f9fafb
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='11' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")
      no-repeat right 0.7rem center;
    border: 1.5px solid #e5e7eb;
    border-radius: 9px;
    color: #111827;
    font-size: 0.84rem; font-family: inherit;
    padding: 0 2.1rem 0 0.8rem;
    width: 100%; appearance: none; cursor: pointer;
    transition: border-color 0.18s, box-shadow 0.18s, background-color 0.18s;
  }
  .lsf-select:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.13);
    outline: none; background-color: #fff;
  }
  .lsf-select option { background: #fff; color: #111827; }

  /* Eye */
  .lsf-eye {
    background: none; border: none; cursor: pointer;
    color: #9ca3af; display: flex; align-items: center;
    padding: 0.18rem; border-radius: 4px; transition: color 0.15s;
  }
  .lsf-eye:hover { color: #374151; }

  /* OTP */
  .lsf-otp {
    height: 3.5rem;
    background: #f9fafb;
    border: 1.5px solid #e5e7eb; border-radius: 12px;
    color: #111827; text-align: center;
    font-size: 1.8rem; font-weight: 800; letter-spacing: 0.6rem;
    width: 100%; font-family: inherit;
    transition: border-color 0.18s, box-shadow 0.18s;
  }
  .lsf-otp::placeholder { color: #d1d5db; letter-spacing: 0.4rem; }
  .lsf-otp:focus {
    border-color: #22c55e;
    box-shadow: 0 0 0 3px rgba(34,197,94,0.13);
    outline: none; background: #fff;
  }

  /* Submit */
  .lsf-submit {
    width: 100% !important;
    background: linear-gradient(135deg, #22c55e, #16a34a) !important;
    color: #fff !important; font-weight: 700 !important;
    font-size: 0.88rem !important; height: 2.65rem !important;
    border-radius: 10px !important; border: none !important;
    box-shadow: 0 4px 14px rgba(22,163,74,0.32) !important;
    transition: opacity 0.2s, transform 0.15s, box-shadow 0.2s !important;
    font-family: inherit !important; margin-top: 0.3rem;
    letter-spacing: 0.01em !important;
  }
  .lsf-submit:hover:not(:disabled) {
    opacity: 0.91 !important; transform: translateY(-1px) !important;
    box-shadow: 0 6px 20px rgba(22,163,74,0.42) !important;
  }
  .lsf-submit:disabled { opacity: 0.6 !important; cursor: not-allowed !important; }
  .lsf-submit-ghost {
    background: transparent !important;
    color: #16a34a !important;
    border: 1.5px solid #22c55e !important;
    box-shadow: none !important;
    margin-top: 0.5rem;
  }
  .lsf-submit-ghost:hover:not(:disabled) { background: #f0fdf4 !important; }

  /* Loading */
  .lsf-loading { display: flex; align-items: center; gap: 0.55rem; justify-content: center; }
  .lsf-spin {
    width: 14px; height: 14px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: lsfSpin 0.7s linear infinite; display: inline-block; flex-shrink: 0;
  }
  @keyframes lsfSpin { to { transform: rotate(360deg); } }

  /* Messages */
  .lsf-msg { font-size: 0.8rem; border-radius: 8px; padding: 0.5rem 0.75rem; }
  .lsf-err { color: #b91c1c; background: #fef2f2; border: 1px solid #fecaca; }
  .lsf-ok  { color: #15803d; background: #f0fdf4; border: 1px solid #bbf7d0; }

  /* Switch */
  .lsf-switch { text-align: center; font-size: 0.8rem; color: #6b7280; margin-top: 0.2rem; }
  .lsf-switch-link {
    background: none; border: none; cursor: pointer;
    color: #16a34a; font-weight: 700; font-family: inherit; font-size: inherit;
    text-decoration: underline; text-underline-offset: 3px; transition: color 0.15s;
  }
  .lsf-switch-link:hover { color: #15803d; }

  /* Back */
  .lsf-back {
    display: inline-flex; align-items: center; gap: 0.38rem;
    background: none; border: none; cursor: pointer;
    color: #6b7280; font-size: 0.78rem; font-family: inherit;
    margin-bottom: 1.1rem; padding: 0; transition: color 0.15s;
  }
  .lsf-back:hover { color: #374151; }
`;
