'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Phone, ShieldCheck, User, GraduationCap } from 'lucide-react'

export default function AuthPage() {
  const [step, setStep] = useState<'entry' | 'otp' | 'profile'>('entry')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', ''])
  const otpRefs = useRef<Array<HTMLInputElement | null>>([])
  const [sending, setSending] = useState(false)
  const [verifying, setVerifying] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [departmentQuery, setDepartmentQuery] = useState('')
  const [department, setDepartment] = useState('')
  const [regNo, setRegNo] = useState('')
  const [profileSubmitting, setProfileSubmitting] = useState(false)
  const [regError, setRegError] = useState('')
  const departments = ['SWE', 'CSE', 'EEE', 'PHY', 'CEP', 'MAT', 'CHE', 'BBA', 'ENG', 'BIO']

  useEffect(() => {
    if (step === 'otp') {
      otpRefs.current[0]?.focus()
    }
  }, [step])

  function formatPhoneInput(value: string) {
    // keep only digits, allow up to 11
    return value.replace(/\D/g, '').slice(0, 11)
  }

  async function handleSendOtp() {
    if (phone.length < 10) {
      alert('Enter a valid phone number.')
      return
    }
    setSending(true)
    // simulate API call
    await new Promise((r) => setTimeout(r, 800))
    setSending(false)
    setStep('otp')
  }

  function handleOtpChange(i: number, v: string) {
    if (!/^\d?$/.test(v)) return
    const next = [...otp]
    next[i] = v
    setOtp(next)
    if (v && i < 5) {
      otpRefs.current[i + 1]?.focus()
    }
  }

  async function handleVerifyOtp() {
    if (otp.some((d) => d === '')) {
      alert('Enter the 6-digit OTP.')
      return
    }
    setVerifying(true)
    // simulate verification
    await new Promise((r) => setTimeout(r, 800))
    setVerifying(false)
    setStep('profile')
  }

  function filteredDepartments() {
    const q = departmentQuery.trim().toLowerCase()
    return departments.filter((d) => d.toLowerCase().includes(q))
  }

  function validateRegNo(value: string) {
    const digits = value.replace(/\D/g, '')
    setRegNo(digits)
    if (digits.length === 10) {
      // simple SUST-style check: starts with '20' and 10 digits total
      if (!/^20\d{8}$/.test(digits)) {
        setRegError('Registration must be a 10-digit SUST number starting with "20".')
      } else {
        setRegError('')
      }
    } else {
      setRegError('')
    }
  }

  async function handleCompleteProfile(e?: React.FormEvent) {
    e?.preventDefault()
    if (!name || !email || !department || regNo.length !== 10 || !!regError) {
      alert('Please fill all fields correctly.')
      return
    }
    setProfileSubmitting(true)
    // simulate submit
    await new Promise((r) => setTimeout(r, 900))
    setProfileSubmitting(false)
    // here you would redirect or update auth state
    alert('Profile completed — welcome to Kunjo!')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white px-4">
      <div className="w-full max-w-md bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold">
              K
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-800">Kunjo</h1>
              <p className="text-xs text-gray-500">Campus Marketplace — SUST</p>
            </div>
          </div>

          {step === 'entry' && (
            <div className="w-full mt-2">
              <label className="text-sm text-gray-700 flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600" />
                Phone Number
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  aria-label="Phone number"
                  className="flex-1 px-4 py-3 rounded-lg border border-gray-200 placeholder:text-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="01XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneInput(e.target.value))}
                  inputMode="numeric"
                />
                <button
                  onClick={handleSendOtp}
                  disabled={sending}
                  className="px-4 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
                >
                  {sending ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            </div>
          )}

          {step === 'otp' && (
            <div className="w-full mt-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-medium text-gray-700">Enter OTP</h2>
              </div>
              <p className="text-xs text-gray-500 mt-1">A 6-digit code was sent to {phone}</p>

              <div className="mt-4 flex justify-center gap-2">
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => { otpRefs.current[i] = el }}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        otpRefs.current[i - 1]?.focus()
                      }
                    }}
                    className="w-10 h-12 text-center rounded-lg border border-gray-200 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                    inputMode="numeric"
                    maxLength={1}
                    aria-label={`OTP digit ${i + 1}`}
                  />
                ))}
              </div>

              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleVerifyOtp}
                  disabled={verifying}
                  className="w-full py-3 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 disabled:opacity-60"
                >
                  {verifying ? 'Verifying...' : 'Verify'}
                </button>
              </div>

              <div className="mt-3 text-center">
                <button
                  className="text-sm text-emerald-600 underline"
                  onClick={() => setStep('entry')}
                >
                  Edit Phone Number
                </button>
              </div>
            </div>
          )}

          {step === 'profile' && (
            <form className="w-full mt-2" onSubmit={handleCompleteProfile}>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-600" />
                <h2 className="text-sm font-medium text-gray-700">Complete Your Profile</h2>
              </div>

              <div className="mt-3">
                <label className="text-xs text-gray-600">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="Full name"
                />
              </div>

              <div className="mt-3">
                <label className="text-xs text-gray-600">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="you@student.sust.edu"
                  inputMode="email"
                />
              </div>

              <div className="mt-3 relative">
                <label className="text-xs text-gray-600 flex items-center gap-2">
                  <GraduationCap className="w-3.5 h-3.5 text-emerald-600" /> Department
                </label>
                <input
                  value={departmentQuery || department}
                  onChange={(e) => {
                    setDepartmentQuery(e.target.value)
                    setDepartment('')
                  }}
                  onFocus={() => setDepartmentQuery(departmentQuery)}
                  placeholder="Search department (SWE, CSE, EEE...)"
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 text-gray-800 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                />
                {departmentQuery.length > 0 && (
                  <ul className="absolute z-10 w-full mt-1 max-h-40 overflow-auto bg-white border border-gray-100 rounded-md shadow-sm">
                    {filteredDepartments().map((d) => (
                      <li
                        key={d}
                        onClick={() => {
                          setDepartment(d)
                          setDepartmentQuery('')
                        }}
                        className="px-3 py-2 hover:bg-emerald-50 cursor-pointer text-sm"
                      >
                        {d}
                      </li>
                    ))}
                    {filteredDepartments().length === 0 && (
                      <li className="px-3 py-2 text-sm text-gray-400">No results</li>
                    )}
                  </ul>
                )}
                {department && (
                  <div className="mt-2 text-xs text-emerald-700">Selected: {department}</div>
                )}
              </div>

              <div className="mt-3">
                <label className="text-xs text-gray-600">Registration Number</label>
                <input
                  value={regNo}
                  onChange={(e) => validateRegNo(e.target.value)}
                  className="w-full mt-1 px-3 py-2 rounded-lg border border-gray-200 placeholder:text-gray-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                  placeholder="2021331xxx"
                  inputMode="numeric"
                  maxLength={10}
                />
                {regError ? (
                  <p className="text-xs text-red-500 mt-1">{regError}</p>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">Enter your 10-digit SUST registration number</p>
                )}
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  disabled={profileSubmitting}
                  className="w-full py-3 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-60"
                >
                  {profileSubmitting ? 'Submitting...' : 'Complete Profile'}
                </button>
              </div>
            </form>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-gray-400">
          By continuing you agree to Kunjo's terms.
        </div>
      </div>
    </div>
  )
}