import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RippleButton } from "@/components/ui/ripple-button";
import { Field } from "./field";
import { ErrorIcon, SuccessIcon, GmailIcon, PasswordIcon, EyeIcon } from "../ui/icons";
import { useLogin } from "@/lib/auth.hooks";
import { ShineBorder } from "@/components/ui/shine-border";

interface LoginFormProps {
  onSwitch: () => void;
}

export function LoginForm({ onSwitch }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login, loading, error, success } = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data) {
      setTimeout(() => router.push("/"), 1000);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)] ring-1 ring-emerald-100">
      <ShineBorder borderWidth={1} duration={14} shineColor={["#22c55e", "#8ba316", "#d9de4a"]} />
      <div className="relative z-10 p-6 sm:p-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-950">Sign In</h2>
            <p className="text-sm leading-6 text-slate-500">Sign in with your email and password.</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Field
              label="Email"
              id="l-email"
              icon={<GmailIcon />}
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@student.sust.edu"
              required
            />
            <Field
              label="Password"
              id="l-password"
              icon={<PasswordIcon />}
              type={showPw ? "text" : "password"}
              value={password}
              onChange={setPassword}
              placeholder="Enter your password"
              required
              trail={
                <button
                  type="button"
                  className="rounded-md p-1 text-slate-400 transition hover:text-slate-800"
                  onClick={() => setShowPw((p) => !p)}
                >
                  <EyeIcon off={showPw} />
                </button>
              }
            />

            {error && (
              <p className="flex items-center gap-2 text-sm text-rose-600">
                <ErrorIcon />
                <span>{error}</span>
              </p>
            )}
            {success && (
              <p className="flex items-center gap-2 text-sm text-emerald-600">
                <SuccessIcon />
                <span>{success}</span>
              </p>
            )}

            <RippleButton
              type="submit"
              disabled={loading}
              className="mx-auto h-10 w-full max-w-[120px] rounded-xl border-0 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              style={{ boxShadow: "0 8px 18px rgba(34,197,94,0.22)" }}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in…
                </span>
              ) : (
                "Sign In"
              )}

            </RippleButton>

            <p className="text-center text-sm text-slate-500">
              Don&apos;t have an account?{" "}
              <button type="button" className="font-semibold text-emerald-600 underline-offset-4 hover:underline" onClick={onSwitch}>
                Create account
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
