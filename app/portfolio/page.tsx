"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Palette, Search, Filter, Eye, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function PortfolioPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchTerm, setSearchTerm] = useState("")

  const categories = ["All", "Branding", "Web Design", "Content", "Print", "Photography"]

  const portfolioItems = [
    {
      id: 1,
      title: "Modern Tech Startup Branding",
      category: "Branding",
      client: "TechFlow Inc.",
      image: "/placeholder.svg?height=400&width=600&text=Tech+Startup+Branding",
      description: "Complete brand identity including logo, color palette, and brand guidelines.",
      tags: ["Logo Design", "Brand Identity", "Style Guide"],
      year: "2024",
    },
    {
      id: 2,
      title: "E-commerce Website Design",
      category: "Web Design",
      client: "Fashion Forward",
      image: "/placeholder.svg?height=400&width=600&text=E-commerce+Website",
      description: "Responsive e-commerce platform with modern UI/UX design.",
      tags: ["UI/UX", "Responsive", "E-commerce"],
      year: "2024",
    },
    {
      id: 3,
      title: "Social Media Campaign",
      category: "Content",
      client: "Lifestyle Brand",
      image: "/placeholder.svg?height=400&width=600&text=Social+Media+Campaign",
      description: "Engaging social media content for Instagram and Facebook campaigns.",
      tags: ["Social Media", "Content Creation", "Photography"],
      year: "2024",
    },
    {
      id: 4,
      title: "Restaurant Menu Design",
      category: "Print",
      client: "Bella Vista Restaurant",
      image: "/placeholder.svg?height=400&width=600&text=Restaurant+Menu",
      description: "Elegant menu design with custom illustrations and typography.",
      tags: ["Print Design", "Typography", "Illustration"],
      year: "2023",
    },
    {
      id: 5,
      title: "Corporate Photography",
      category: "Photography",
      client: "Business Solutions Ltd.",
      image: "/placeholder.svg?height=400&width=600&text=Corporate+Photography",
      description: "Professional headshots and office environment photography.",
      tags: ["Portrait", "Corporate", "Professional"],
      year: "2024",
    },
    {
      id: 6,
      title: "Mobile App Interface",
      category: "Web Design",
      client: "HealthTech Startup",
      image: "/placeholder.svg?height=400&width=600&text=Mobile+App+Interface",
      description: "Clean and intuitive mobile app design for healthcare platform.",
      tags: ["Mobile UI", "Healthcare", "User Experience"],
      year: "2024",
    },
    {
      id: 7,
      title: "Luxury Brand Identity",
      category: "Branding",
      client: "Prestige Jewelry",
      image: "/placeholder.svg?height=400&width=600&text=Luxury+Brand+Identity",
      description: "Sophisticated branding for high-end jewelry boutique.",
      tags: ["Luxury", "Jewelry", "Premium Design"],
      year: "2023",
    },
    {
      id: 8,
      title: "Event Marketing Materials",
      category: "Print",
      client: "Music Festival",
      image: "/placeholder.svg?height=400&width=600&text=Event+Marketing",
      description: "Vibrant poster and promotional material design for music festival.",
      tags: ["Event Design", "Poster", "Marketing"],
      year: "2024",
    },
    {
      id: 9,
      title: "Product Photography",
      category: "Photography",
      client: "Artisan Crafts",
      image: "/placeholder.svg?height=400&width=600&text=Product+Photography",
      description: "High-quality product photography for handmade crafts e-commerce.",
      tags: ["Product", "E-commerce", "Crafts"],
      year: "2024",
    },
  ]

  const filteredItems = portfolioItems.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesCategory && matchesSearch
  })

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
              <Link href="/portfolio" className="text-purple-600 font-medium">
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

      {/* Header */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Portfolio
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our creative work across various industries and design disciplines
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={
                    selectedCategory === category
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                      : "hover:bg-purple-50"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 shadow-lg"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.title}
                    width={600}
                    height={400}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex gap-2 mb-2">
                        <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="secondary" className="bg-white/20 text-white hover:bg-white/30">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Badge className="absolute top-4 left-4 bg-white/90 text-gray-800">{item.category}</Badge>
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold group-hover:text-purple-600 transition-colors">{item.title}</h3>
                    <span className="text-sm text-gray-500">{item.year}</span>
                  </div>
                  <p className="text-gray-600 mb-2">{item.client}</p>
                  <p className="text-sm text-gray-700 mb-4">{item.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-16">
              <Filter className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No projects found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Like What You See?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch to discuss your next project.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Start Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
