import { useState, useCallback } from "react";

const API_BASE_URL = "http://localhost:5000/auth";

export function useAuthJwt() {
  const saveJwtToCookie = useCallback((jwt: string) => {
    const maxAge = 60 * 60 * 24 * 7;
    document.cookie = `token=${encodeURIComponent(jwt)}; path=/; max-age=${maxAge}; samesite=lax`;
  }, []);

  return { saveJwtToCookie };
}

export function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { saveJwtToCookie } = useAuthJwt();

  const login = useCallback(
    async (email: string, password: string) => {
      setError("");
      setSuccess("");

      if (!email || !password) {
        setError("Please enter both email and password.");
        return null;
      }

      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setError(data?.message ?? "Login failed. Check credentials.");
          return null;
        }

        const jwt = data?.token ?? data?.jwt ?? data?.accessToken;
        if (typeof jwt === "string" && jwt.length > 0) {
          saveJwtToCookie(jwt);
        }

        setSuccess(data?.message ?? "Logged in successfully.");
        return data;
      } catch {
        setError("Could not connect to server. Try again later.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [saveJwtToCookie],
  );

  return { login, loading, error, success, setError, setSuccess };
}

export function useSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const signup = useCallback(async (payload: Record<string, string>) => {
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.message ?? "Signup failed. Please try again.");
        return null;
      }

      setSuccess(data?.message ?? "OTP sent successfully");
      return data;
    } catch {
      setError("Could not connect to the server. Please try again.");
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { signup, loading, error, success, setError, setSuccess };
}

export function useOtpVerify() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { saveJwtToCookie } = useAuthJwt();

  const verify = useCallback(
    async (email: string, otp: string) => {
      setError("");
      setSuccess("");

      if (!/^\d{4}$/.test(otp)) {
        setError("Please enter the 4-digit OTP.");
        return null;
      }

      setLoading(true);
      try {
        const res = await fetch(`${API_BASE_URL}/verify`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });

        const data = await res.json().catch(() => null);

        if (!res.ok) {
          setError(
            data?.message ?? "OTP verification failed. Please try again.",
          );
          return null;
        }

        const jwt = data?.token ?? data?.jwt ?? data?.accessToken;
        if (typeof jwt === "string" && jwt.length > 0) {
          saveJwtToCookie(jwt);
        }

        setSuccess(data?.message ?? "OTP verified successfully.");
        return data;
      } catch {
        setError("Could not connect to the server. Please try again.");
        return null;
      } finally {
        setLoading(false);
      }
    },
    [saveJwtToCookie],
  );

  return { verify, loading, error, success, setError, setSuccess };
}
