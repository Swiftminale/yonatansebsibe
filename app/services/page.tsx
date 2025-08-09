"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Palette,
  Monitor,
  Camera,
  Printer,
  Smartphone,
  Users,
  CheckCircle,
  ArrowRight,
  Star,
  Clock,
  Shield,
  Zap,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function ServicesPage() {
  const services = [
    {
      icon: <Palette className="h-12 w-12" />,
      title: "Brand Identity & Logo Design",
      description: "Create a memorable brand identity that resonates with your audience and stands out in the market.",
      features: [
        "Custom Logo Design",
        "Brand Guidelines",
        "Color Palette Development",
        "Typography Selection",
        "Brand Voice & Messaging",
        "Business Card Design",
      ],
      pricing: "Starting at $2,500",
      timeline: "2-3 weeks",
      image: "/placeholder.svg?height=300&width=400&text=Brand+Identity+Design",
    },
    {
      icon: <Monitor className="h-12 w-12" />,
      title: "Web Design & Development",
      description:
        "Modern, responsive websites that convert visitors into customers and provide exceptional user experiences.",
      features: [
        "Responsive Web Design",
        "UI/UX Design",
        "E-commerce Solutions",
        "CMS Integration",
        "SEO Optimization",
        "Performance Optimization",
      ],
      pricing: "Starting at $4,000",
      timeline: "4-6 weeks",
      image: "/placeholder.svg?height=300&width=400&text=Web+Design",
    },
    {
      icon: <Camera className="h-12 w-12" />,
      title: "Content Creation & Photography",
      description:
        "Engaging visual content that tells your story and connects with your audience across all platforms.",
      features: [
        "Product Photography",
        "Social Media Content",
        "Video Production",
        "Content Strategy",
        "Photo Editing",
        "Brand Photography",
      ],
      pricing: "Starting at $1,500",
      timeline: "1-2 weeks",
      image: "/placeholder.svg?height=300&width=400&text=Content+Creation",
    },
    {
      icon: <Printer className="h-12 w-12" />,
      title: "Print Design & Marketing",
      description:
        "Professional print materials that make a lasting impression and effectively communicate your message.",
      features: [
        "Brochure Design",
        "Poster & Flyer Design",
        "Business Stationery",
        "Packaging Design",
        "Trade Show Materials",
        "Direct Mail Campaigns",
      ],
      pricing: "Starting at $800",
      timeline: "1-2 weeks",
      image: "/placeholder.svg?height=300&width=400&text=Print+Design",
    },
    {
      icon: <Smartphone className="h-12 w-12" />,
      title: "Social Media Design",
      description: "Eye-catching social media graphics that boost engagement and build your online presence.",
      features: [
        "Social Media Templates",
        "Instagram Stories",
        "Facebook Covers",
        "LinkedIn Graphics",
        "Social Media Strategy",
        "Content Calendar",
      ],
      pricing: "Starting at $1,200",
      timeline: "1 week",
      image: "/placeholder.svg?height=300&width=400&text=Social+Media+Design",
    },
    {
      icon: <Users className="h-12 w-12" />,
      title: "Client Management & CRM",
      description: "Streamlined project management and client communication tools for seamless collaboration.",
      features: [
        "Project Tracking",
        "Client Portal Access",
        "File Sharing System",
        "Communication Hub",
        "Progress Reporting",
        "Invoice Management",
      ],
      pricing: "Included with all projects",
      timeline: "Ongoing",
      image: "/placeholder.svg?height=300&width=400&text=CRM+System",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description:
        "We start by understanding your business, goals, and target audience to create a strategic foundation.",
    },
    {
      step: "02",
      title: "Concept Development",
      description: "Our team develops initial concepts and presents creative directions aligned with your vision.",
    },
    {
      step: "03",
      title: "Design & Refinement",
      description: "We create detailed designs and work with you through revisions to perfect every element.",
    },
    {
      step: "04",
      title: "Delivery & Support",
      description: "Final files are delivered with ongoing support and access to our client management system.",
    },
  ]

  const benefits = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Fast Turnaround",
      description: "Quick delivery without compromising on quality",
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Quality Guarantee",
      description: "100% satisfaction guarantee with unlimited revisions",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Dedicated Support",
      description: "Personal project manager for seamless communication",
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Premium Results",
      description: "Award-winning designs that drive real business results",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CreativeStudio
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/portfolio" className="text-gray-700 hover:text-purple-600 transition-colors">
                Portfolio
              </Link>
              <Link href="/services" className="text-purple-600 font-medium">
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

      {/* Header */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-purple-100 text-purple-700 hover:bg-purple-200">
            ✨ Professional Design Services
          </Badge>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive creative solutions designed to elevate your brand and drive business growth. From concept to
            completion, we deliver exceptional results.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="text-purple-600 mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="font-bold mb-2">{benefit.title}</h3>
                <p className="text-gray-600 text-sm">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What We Offer</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Complete creative services with integrated project management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg overflow-hidden"
              >
                <div className="relative">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 text-purple-600 bg-white/90 p-3 rounded-lg">{service.icon}</div>
                </div>
                <CardContent className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-2xl font-bold group-hover:text-purple-600 transition-colors">
                      {service.title}
                    </h3>
                    <Badge className="bg-purple-100 text-purple-700">{service.timeline}</Badge>
                  </div>

                  <p className="text-gray-600 mb-6">{service.description}</p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-2xl font-bold text-purple-600">{service.pricing}</p>
                      <p className="text-sm text-gray-500">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {service.timeline}
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A proven methodology that ensures exceptional results every time
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-600 to-pink-600 transform -translate-x-1/2"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your project and create something amazing together. Get a free consultation today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact">Start Your Project</Link>
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
    </div>
  )
}
