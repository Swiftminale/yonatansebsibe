import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface PortfolioItem {
  id: number
  title: string
  category: string
  client: string
  description: string
  tags: string // JSON string in database, parsed to array in frontend
  image: string
  featured: boolean
  year: string
  created_at: string
  updated_at: string
}

export interface Service {
  id: number
  title: string
  description: string
  features: string // JSON string in database, parsed to array in frontend
  pricing: string
  timeline: string
  active: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: number
  name: string
  company: string
  content: string
  rating: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface SiteSettings {
  id?: number
  siteName: string
  tagline: string
  heroDescription: string
  contactEmail: string
  contactPhone: string
  location: string
  businessHours: string
  created_at?: string
  updated_at?: string
}
