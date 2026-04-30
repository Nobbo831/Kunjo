import React, { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { RippleButton } from "@/components/ui/ripple-button";
import { Field } from "./field";
import { MailIcon, LockIcon, EyeIcon } from "./icons";
import { useLogin } from "@/lib/auth.hooks";

interface LoginFormProps {
  onSwitch: () => void;
}

export function LoginForm({ onSwitch }: LoginFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const { login, loading, error, success, setError, setSuccess } = useLogin();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await login(email, password);
    if (data) {
      setTimeout(() => router.push("/"), 1000);
    }
  };

  return (
    <div className="lsf-panel">
      <div className="lsf-panel-head">
        <h2 className="lsf-panel-title">Sign In</h2>
        <p className="lsf-panel-sub">Sign in with your email and password.</p>
      </div>
      <form className="lsf-form" onSubmit={handleSubmit}>
        <Field
          label="Email"
          id="l-email"
          icon={<MailIcon />}
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="you@student.sust.edu"
          required
        />
        <Field
          label="Password"
          id="l-password"
          icon={<LockIcon />}
          type={showPw ? "text" : "password"}
          value={password}
          onChange={setPassword}
          placeholder="Enter your password"
          required
          trail={
            <button
              type="button"
              className="lsf-eye"
              onClick={() => setShowPw((p) => !p)}
            >
              <EyeIcon off={showPw} />
            </button>
          }
        />
        {error && <p className="lsf-msg lsf-err">{error}</p>}
        {success && <p className="lsf-msg lsf-ok">{success}</p>}
        <RippleButton type="submit" disabled={loading} className="lsf-submit">
          {loading ? (
            <span className="lsf-loading">
              <span className="lsf-spin" />
              Signing in…
            </span>
          ) : (
            "Sign In"
          )}
        </RippleButton>
        <p className="lsf-switch">
          Don&apos;t have an account?{" "}
          <button type="button" className="lsf-switch-link" onClick={onSwitch}>
            Create account
          </button>
        </p>
      </form>
    </div>
  );
}
