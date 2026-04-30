"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";



import { RippleButton } from "@/components/ui/ripple-button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/ui/date-picker";
import MagicCard from "@/components/ui/magic-card";
import { AUTH_CONFIG } from "@/components/auth/auth.constants";

type SignupPayload = {
  email: string;
  password: string;
  name: string;
  dob: string;
  gender: string;
  address: string;
  phone: string;
  dept_name: string;
  regi_no: string;
};

type AuthStep = "signup" | "otp";

export default function SignupPage() {
  const [step, setStep] = useState<AuthStep>("signup");
  const [form, setForm] = useState<SignupPayload>({
    email: "",
    password: "",
    name: "",
    dob: "",
    gender: "male",
    address: "",
    phone: "",
    dept_name: "",
    regi_no: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (field: keyof SignupPayload, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const saveJwtToCookie = (jwt: string) => {
    const maxAge = 60 * 60 * 24 * 7;
    document.cookie = `token=${encodeURIComponent(jwt)}; path=/; max-age=${maxAge}; samesite=lax`;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.message ?? "Signup failed. Please try again.");
        return;
      }

      setSuccess(data?.message ?? "OTP sent successfully");
      setStep("otp");
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!/^\d{4}$/.test(otp)) {
      setError("Please enter the 4-digit OTP.");
      return;
    }

    setIsVerifying(true);

    try {
      const response = await fetch(`${AUTH_CONFIG.API_BASE_URL}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          otp,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(data?.message ?? "OTP verification failed. Please try again.");
        return;
      }

      const jwt = data?.token ?? data?.jwt ?? data?.accessToken;
      if (typeof jwt === "string" && jwt.length > 0) {
        saveJwtToCookie(jwt);
      }

      setSuccess(data?.message ?? "OTP verified successfully.");
    } catch {
      setError("Could not connect to the server. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card
        withShine
        shineColor={["#c58c22", "#afc733", "#54de4a"]}
        className="w-full max-w-xl border-none bg-transparent p-0 shadow-2xl"
      >
        <MagicCard
          withShine
          shineColor={["#22c55e", "#8ba316", "#d9de4a"]}
          gradientColor="#21b910a5"
          gradientSize={420}
          className="rounded-xl p-[1px]"
        >
          <div className="rounded-[inherit] bg-white dark:bg-neutral-950">
            <CardHeader className="p-6">
              <CardTitle className="text-2xl">
                {step === "signup" ? "Create Account" : "Verify OTP"}
              </CardTitle>
              <CardDescription>
                {step === "signup"
                  ? "Fill all details and submit to receive a 4-digit OTP."
                  : `Enter the 4-digit OTP sent to ${form.email}.`}
              </CardDescription>
              {/* step indicator removed per user request */}
            </CardHeader>

            <CardContent className="p-6">
              {step === "signup" ? (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={form.name}
                        onChange={(e) => updateField("name", e.target.value)}
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={form.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="user@gmail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={form.password}
                        onChange={(e) => updateField("password", e.target.value)}
                        placeholder="At least 6 characters"
                        minLength={6}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <DatePicker
                        value={form.dob}
                        onValueChange={(value) => updateField("dob", value)}
                        placeholder="Select your birth date"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Gender</Label>
                      <select
                        id="gender"
                        value={form.gender}
                        onChange={(e) => updateField("gender", e.target.value)}
                        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                        required
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="01700000000"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="dept_name">Department</Label>
                      <Input
                        id="dept_name"
                        type="text"
                        value={form.dept_name}
                        onChange={(e) => updateField("dept_name", e.target.value)}
                        placeholder="CSE"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="regi_no">Registration No</Label>
                      <Input
                        id="regi_no"
                        type="text"
                        value={form.regi_no}
                        onChange={(e) => updateField("regi_no", e.target.value)}
                        placeholder="2026-001"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      type="text"
                      value={form.address}
                      onChange={(e) => updateField("address", e.target.value)}
                      placeholder="Sylhet"
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {success && <p className="text-sm text-emerald-600">{success}</p>}

                  <RippleButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {isSubmitting ? "Sending OTP..." : "Create Account"}
                  </RippleButton>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={handleVerifyOtp}>
                  <div className="grid gap-2">
                    <Label htmlFor="otp">4-digit OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      inputMode="numeric"
                      maxLength={4}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
                      placeholder="1234"
                      required
                    />
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}
                  {success && <p className="text-sm text-emerald-600">{success}</p>}

                  <RippleButton
                    type="submit"
                    disabled={isVerifying}
                    className="w-full bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {isVerifying ? "Verifying OTP..." : "Verify OTP"}
                  </RippleButton>

                  <RippleButton
                    type="button"
                    onClick={() => {
                      setStep("signup");
                      setError("");
                      setSuccess("");
                    }}
                    className="w-full"
                  >
                    Edit Signup Info
                  </RippleButton>
                </form>
              )}

              <p className="mt-4 text-center text-sm text-muted-foreground">
                Got an account?{" "}
                <Link href="/login" className="font-medium text-emerald-600 hover:underline">
                  Login
                </Link>
              </p>
            </CardContent>
          </div>
        </MagicCard>
      </Card>
    </div>
  );
}