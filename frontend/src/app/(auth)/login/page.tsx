"use client"

import React, { FormEvent, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { RippleButton } from "@/components/ui/ripple-button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import MagicCard from "@/components/ui/magic-card"
import { AUTH_CONFIG } from "@/components/auth/auth.constants"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const saveJwtToCookie = (jwt: string) => {
    const maxAge = 60 * 60 * 24 * 7
    document.cookie = `token=${encodeURIComponent(jwt)}; path=/; max-age=${maxAge}; samesite=lax`
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (!email || !password) {
      setError("Please enter both email and password.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch(`${AUTH_CONFIG.API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await res.json().catch(() => null)

      if (!res.ok) {
        setError(data?.message ?? "Login failed. Check credentials.")
        return
      }

      const jwt = data?.token ?? data?.jwt ?? data?.accessToken
      if (typeof jwt === "string" && jwt.length > 0) {
        saveJwtToCookie(jwt)
      }

      setSuccess(data?.message ?? "Logged in successfully.")
      // redirect to home/dashboard
      router.push("/")
    } catch {
      setError("Could not connect to server. Try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card withShine shineColor={["#22c55e", "#8ba316", "#d9de4a"]} className="w-full max-w-xl border-none bg-transparent p-0 shadow-2xl">
        <MagicCard withShine shineColor={["#22c55e", "#8ba316", "#d9de4a"]} gradientColor="#21b910a5" gradientSize={420} className="rounded-xl p-[1px]">
          <div className="rounded-[inherit] bg-white dark:bg-neutral-950">
            <CardHeader className="p-6">
              <CardTitle className="text-2xl">Sign In</CardTitle>
              <CardDescription>Sign in with your email and password.</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form className="w-full mt-2 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-xs text-gray-600">Email</label>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@student.sust.edu"
                    type="email"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-600">Password</label>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    type="password"
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}
                {success && <p className="text-sm text-emerald-600">{success}</p>}

                <div>
                  <RippleButton type="submit" disabled={loading} className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                    {loading ? "Signing in..." : "Sign In"}
                  </RippleButton>
                </div>

                <p className="text-center text-sm text-gray-600">
                  Don&apos;t have an account?{' '}
                  <Link href="/signup" className="text-emerald-600 font-medium">
                    Create account
                  </Link>
                </p>
              </form>
            </CardContent>
          </div>
        </MagicCard>
      </Card>
    </div>
  )
}
