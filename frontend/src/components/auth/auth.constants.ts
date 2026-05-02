
//BAAD 

export const AUTH_CONFIG = {
  API_BASE_URL: process.env.NEXT_PUBLIC_AUTH_BASE ?? "http://localhost:5000/auth",
} as const;

export const HERO_IMAGES = [
  "/assets/img1.jpg",
  "/assets/img2.jpg",
  "/assets/img3.jpg",  
] as const;

export const HERO_STATS = [
  { number: "12k+", label: "Students" },
  
  { number: "50+", label: "Departments" },
] as const;

export const BRAND_NAME = "KUNJO";
