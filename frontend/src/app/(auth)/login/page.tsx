"use client"

import { useRouter } from "next/navigation"
import { FlickeringGrid } from "@/components/ui/flickering-grid"
import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-50 p-6">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.82),rgba(241,245,249,0.55)_45%,rgba(248,250,252,0.95))]" />
      <div className="absolute inset-0">
        <FlickeringGrid
          className="h-full w-full opacity-40"
          squareSize={7}
          gridGap={14}
          flickerChance={0.4}
          color="rgba(16, 185, 129, 0.58)"
          maxOpacity={0.28}
          style={{ mixBlendMode: "multiply" }}
        />
      </div>
      <div className="relative z-10 flex min-h-[calc(100vh-3rem)] items-center justify-center">
        <div className="w-full max-w-[720px]">
          <LoginForm onSwitch={() => router.push("/signup")} />
        </div>
      </div>
    </div>
  )
}
