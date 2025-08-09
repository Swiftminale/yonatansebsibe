"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Palette, Camera, Users, Star, Play, Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

export default function HomePage() {
  const [portfolioItems, setPortfolioItems] = useState([])
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [siteSettings, setSiteSettings] = useState({
    siteName: "CreativeStudio",
    tagline: "Bringing Your Vision to Life",
    heroDescription:
      "Professional graphic design and content creation services with integrated client management. From concept to completion, we make your brand shine.",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadContent()
  }, [])

  const loadContent = async () => {
    try {
      // Load featured portfolio items
      const { data: portfolioData } = await supabase
        .from("portfolio_items")
        .select("*")
        .eq("featured", true)
        .limit(3)
        .order("created_at", { ascending: false })

      if (portfolioData) {
        const itemsWithParsedTags = portfolioData.map((item) => ({
          ...item,
          tags: JSON.parse(item.tags || "[]"),
        }))
        setPortfolioItems(itemsWithParsedTags)
      }

      // Load active services (limit to 3 for homepage)
      const { data: servicesData } = await supabase
        .from("services")
        .select("*")
        .eq("active", true)
        .limit(3)
        .order("created_at", { ascending: false })

      if (servicesData) {
        const servicesWithParsedFeatures = servicesData.map((service) => ({
          ...service,
          features: JSON.parse(service.features || "[]"),
        }))
        setServices(servicesWithParsedFeatures)
      }

      // Load featured testimonials
      const { data: testimonialsData } = await supabase
        .from("testimonials")
        .select("*")
        .eq("featured", true)
        .limit(3)
        .order("created_at", { ascending: false })

      if (testimonialsData) {
        setTestimonials(testimonialsData)
      }

      // Load site settings
      const { data: settingsData } = await supabase.from("site_settings").select("*").single()

      if (settingsData) {
        setSiteSettings(settingsData)
      }
    } catch (error) {
      console.error("Error loading content:", error)
    } finally {
      setLoading(false)
    }
  }

  // Default services if none loaded from database
  const defaultServices = [
    {
      icon: <Palette className="h-8 w-8" />,
      title: "Graphic Design",
      description: "Logo design, branding, print materials, and digital graphics that make your brand stand out.",
      features: ["Logo Design", "Brand Identity", "Print Design", "Digital Graphics"],
    },
    {
      icon: <Camera className="h-8 w-8" />,
      title: "Content Creation",
      description: "Engaging visual content for social media, websites, and marketing campaigns.",
      features: ["Social Media Content", "Photography", "Video Content", "Marketing Materials"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Client Management",
      description: "Streamlined project management and client communication for seamless collaboration.",
      features: ["Project Tracking", "Client Portal", "File Sharing", "Communication Hub"],
    },
  ]

  const displayServices =
    services.length > 0
      ? services.map((service) => ({
          ...service,
          icon: <Palette className="h-8 w-8" />,
        }))
      : defaultServices

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-16 w-16 animate-spin text-purple-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                {siteSettings.siteName}
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/portfolio" className="text-gray-700 hover:text-purple-600 transition-colors">
                Portfolio
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-purple-600 transition-colors">
                Services
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-purple-600 transition-colors">
                Admin
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-purple-600 transition-colors">
                Contact
              </Link>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
              ✨ Creative Design & Content Solutions
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent">
              {siteSettings.tagline}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{siteSettings.heroDescription}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Link href="/portfolio">
                  View Portfolio <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-purple-200 hover:bg-purple-50 bg-transparent">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Do</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive creative services with powerful client management tools
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {displayServices.map((service, index) => (
              <Card
                key={service.id || index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
              >
                <CardContent className="p-8">
                  <div className="text-purple-600 mb-4 group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  <ul className="space-y-2">
                    {(service.features || []).map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Work</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A glimpse of our recent projects and creative solutions
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {portfolioItems.map((item) => (
              <Card key={item.id} className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 text-white">
                      <Badge className="mb-2 bg-white/20 text-white">{item.category}</Badge>
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.client}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Link href="/portfolio">
                View Full Portfolio <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Clients Say</h2>
            <p className="text-xl text-gray-600">Trusted by businesses worldwide</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's collaborate to bring your creative vision to life with our comprehensive design and content services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Start a Project</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 bg-transparent"
              asChild
            >
              <Link href="/portfolio">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                  <Palette className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold">{siteSettings.siteName}</span>
              </div>
              <p className="text-gray-400">
                Professional design and content creation with integrated client management.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Graphic Design
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Content Creation
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Branding
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    Web Design
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/portfolio" className="hover:text-white transition-colors">
                    Portfolio
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors">
                    Admin Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Behance
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 {siteSettings.siteName}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
