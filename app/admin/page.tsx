"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Save,
  Eye,
  Palette,
  ImageIcon,
  Users,
  Star,
  Lock,
  Unlock,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [activeTab, setActiveTab] = useState("portfolio")
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Data states
  const [portfolioItems, setPortfolioItems] = useState([])
  const [services, setServices] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [siteSettings, setSiteSettings] = useState({
    siteName: "CreativeStudio",
    tagline: "Bringing Your Vision to Life",
    heroDescription: "Professional graphic design and content creation services with integrated client management.",
    contactEmail: "hello@creativestudio.com",
    contactPhone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    businessHours: "Mon - Fri: 9AM - 6PM PST",
  })

  const [editingItem, setEditingItem] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

  // Load data from Supabase
  const loadData = async () => {
    setLoading(true)
    try {
      // Load portfolio items
      const { data: portfolioData, error: portfolioError } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false })

      if (portfolioError) throw portfolioError
      setPortfolioItems(portfolioData || [])

      // Load services
      const { data: servicesData, error: servicesError } = await supabase
        .from("services")
        .select("*")
        .order("created_at", { ascending: false })

      if (servicesError) throw servicesError
      setServices(servicesData || [])

      // Load testimonials
      const { data: testimonialsData, error: testimonialsError } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false })

      if (testimonialsError) throw testimonialsError
      setTestimonials(testimonialsData || [])

      // Load site settings
      const { data: settingsData, error: settingsError } = await supabase.from("site_settings").select("*").single()

      if (settingsError && settingsError.code !== "PGRST116") {
        throw settingsError
      }

      if (settingsData) {
        setSiteSettings(settingsData)
      }
    } catch (error) {
      console.error("Error loading data:", error)
      alert("Error loading data: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      loadData()
    }
  }, [isAuthenticated])

  const handleLogin = () => {
    // Simple password check - in production, use proper authentication
    if (password === "admin123") {
      setIsAuthenticated(true)
      setPassword("")
    } else {
      alert("Invalid password")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  // Portfolio CRUD operations
  const addPortfolioItem = async (newItem) => {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .insert([
          {
            ...newItem,
            tags: JSON.stringify(newItem.tags),
          },
        ])
        .select()
        .single()

      if (error) throw error

      const itemWithParsedTags = {
        ...data,
        tags: JSON.parse(data.tags || "[]"),
      }

      setPortfolioItems([itemWithParsedTags, ...portfolioItems])
      setIsAddDialogOpen(false)
      alert("Portfolio item added successfully!")
    } catch (error) {
      console.error("Error adding portfolio item:", error)
      alert("Error adding portfolio item: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const updatePortfolioItem = async (id, updatedItem) => {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("portfolio_items")
        .update({
          ...updatedItem,
          tags: JSON.stringify(updatedItem.tags),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      const itemWithParsedTags = {
        ...data,
        tags: JSON.parse(data.tags || "[]"),
      }

      setPortfolioItems(portfolioItems.map((item) => (item.id === id ? itemWithParsedTags : item)))
      setEditingItem(null)
      alert("Portfolio item updated successfully!")
    } catch (error) {
      console.error("Error updating portfolio item:", error)
      alert("Error updating portfolio item: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const deletePortfolioItem = async (id) => {
    if (!confirm("Are you sure you want to delete this portfolio item?")) return

    setSaving(true)
    try {
      const { error } = await supabase.from("portfolio_items").delete().eq("id", id)

      if (error) throw error

      setPortfolioItems(portfolioItems.filter((item) => item.id !== id))
      alert("Portfolio item deleted successfully!")
    } catch (error) {
      console.error("Error deleting portfolio item:", error)
      alert("Error deleting portfolio item: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  // Services CRUD operations
  const addService = async (newService) => {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("services")
        .insert([
          {
            ...newService,
            features: JSON.stringify(newService.features),
          },
        ])
        .select()
        .single()

      if (error) throw error

      const serviceWithParsedFeatures = {
        ...data,
        features: JSON.parse(data.features || "[]"),
      }

      setServices([serviceWithParsedFeatures, ...services])
      alert("Service added successfully!")
    } catch (error) {
      console.error("Error adding service:", error)
      alert("Error adding service: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const updateService = async (id, updatedService) => {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("services")
        .update({
          ...updatedService,
          features: JSON.stringify(updatedService.features),
        })
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      const serviceWithParsedFeatures = {
        ...data,
        features: JSON.parse(data.features || "[]"),
      }

      setServices(services.map((service) => (service.id === id ? serviceWithParsedFeatures : service)))
      alert("Service updated successfully!")
    } catch (error) {
      console.error("Error updating service:", error)
      alert("Error updating service: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteService = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return

    setSaving(true)
    try {
      const { error } = await supabase.from("services").delete().eq("id", id)

      if (error) throw error

      setServices(services.filter((service) => service.id !== id))
      alert("Service deleted successfully!")
    } catch (error) {
      console.error("Error deleting service:", error)
      alert("Error deleting service: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  // Testimonials CRUD operations
  const addTestimonial = async (newTestimonial) => {
    setSaving(true)
    try {
      const { data, error } = await supabase.from("testimonials").insert([newTestimonial]).select().single()

      if (error) throw error

      setTestimonials([data, ...testimonials])
      alert("Testimonial added successfully!")
    } catch (error) {
      console.error("Error adding testimonial:", error)
      alert("Error adding testimonial: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const updateTestimonial = async (id, updatedTestimonial) => {
    setSaving(true)
    try {
      const { data, error } = await supabase
        .from("testimonials")
        .update(updatedTestimonial)
        .eq("id", id)
        .select()
        .single()

      if (error) throw error

      setTestimonials(testimonials.map((testimonial) => (testimonial.id === id ? data : testimonial)))
      alert("Testimonial updated successfully!")
    } catch (error) {
      console.error("Error updating testimonial:", error)
      alert("Error updating testimonial: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  const deleteTestimonial = async (id) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return

    setSaving(true)
    try {
      const { error } = await supabase.from("testimonials").delete().eq("id", id)

      if (error) throw error

      setTestimonials(testimonials.filter((testimonial) => testimonial.id !== id))
      alert("Testimonial deleted successfully!")
    } catch (error) {
      console.error("Error deleting testimonial:", error)
      alert("Error deleting testimonial: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  // Site settings operations
  const saveSiteSettings = async () => {
    setSaving(true)
    try {
      const { error } = await supabase.from("site_settings").upsert(siteSettings, { onConflict: "id" })

      if (error) throw error

      alert("Site settings saved successfully!")
    } catch (error) {
      console.error("Error saving site settings:", error)
      alert("Error saving site settings: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Admin Portal</CardTitle>
            <p className="text-gray-600">Enter your password to access the content management system</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Unlock className="h-4 w-4 mr-2" />
              Login
            </Button>
            <p className="text-sm text-gray-500 text-center">Demo password: admin123</p>
          </CardContent>
        </Card>
      </div>
    )
  }

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
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Palette className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                CreativeStudio Admin
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="outline" asChild>
                <Link href="/" target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Site
                </Link>
              </Button>
              <Button variant="outline" onClick={handleLogout}>
                <Lock className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Content Management System
          </h1>
          <p className="text-gray-600">Manage your website content, portfolio, and settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Portfolio Items</p>
                  <p className="text-3xl font-bold text-purple-600">{portfolioItems.length}</p>
                </div>
                <ImageIcon className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Services</p>
                  <p className="text-3xl font-bold text-blue-600">{services.filter((s) => s.active).length}</p>
                </div>
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Testimonials</p>
                  <p className="text-3xl font-bold text-green-600">{testimonials.length}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Featured Items</p>
                  <p className="text-3xl font-bold text-orange-600">
                    {portfolioItems.filter((item) => item.featured).length}
                  </p>
                </div>
                <Star className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Portfolio Management */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Portfolio Management</h2>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={saving}
                  >
                    {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                    Add Portfolio Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Portfolio Item</DialogTitle>
                  </DialogHeader>
                  <PortfolioForm
                    onSubmit={addPortfolioItem}
                    onCancel={() => setIsAddDialogOpen(false)}
                    saving={saving}
                  />
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolioItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={400}
                      height={250}
                      className="w-full h-48 object-cover"
                    />
                    {item.featured && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">Featured</Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <Badge>{item.category}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.client}</p>
                    <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{item.year}</span>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingItem(item)} disabled={saving}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => deletePortfolioItem(item.id)}
                          disabled={saving}
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {editingItem && (
              <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Edit Portfolio Item</DialogTitle>
                  </DialogHeader>
                  <PortfolioForm
                    initialData={editingItem}
                    onSubmit={(data) => updatePortfolioItem(editingItem.id, data)}
                    onCancel={() => setEditingItem(null)}
                    saving={saving}
                  />
                </DialogContent>
              </Dialog>
            )}
          </TabsContent>

          {/* Services Management */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Services Management</h2>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                Add Service
              </Button>
            </div>

            <div className="grid gap-6">
              {services.map((service) => (
                <Card key={service.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold">{service.title}</h3>
                          <Badge
                            className={service.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}
                          >
                            {service.active ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium mb-2">Features:</p>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {(service.features || []).map((feature, idx) => (
                                <li key={idx}>• {feature}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-medium">Pricing: {service.pricing}</p>
                            <p className="font-medium">Timeline: {service.timeline}</p>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" disabled={saving}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => deleteService(service.id)}
                          disabled={saving}
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Testimonials Management */}
          <TabsContent value="testimonials" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Testimonials Management</h2>
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                disabled={saving}
              >
                {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                Add Testimonial
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-bold">{testimonial.name}</h3>
                          {testimonial.featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{testimonial.company}</p>
                        <div className="flex mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <p className="text-gray-700 italic">"{testimonial.content}"</p>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" disabled={saving}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => deleteTestimonial(testimonial.id)}
                          disabled={saving}
                        >
                          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <h2 className="text-2xl font-bold">Site Settings</h2>
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={siteSettings.siteName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, siteName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={siteSettings.tagline}
                      onChange={(e) => setSiteSettings({ ...siteSettings, tagline: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="heroDescription">Hero Description</Label>
                  <Textarea
                    id="heroDescription"
                    value={siteSettings.heroDescription}
                    onChange={(e) => setSiteSettings({ ...siteSettings, heroDescription: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={siteSettings.contactEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={siteSettings.contactPhone}
                      onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={siteSettings.location}
                      onChange={(e) => setSiteSettings({ ...siteSettings, location: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessHours">Business Hours</Label>
                    <Input
                      id="businessHours"
                      value={siteSettings.businessHours}
                      onChange={(e) => setSiteSettings({ ...siteSettings, businessHours: e.target.value })}
                    />
                  </div>
                </div>
                <Button
                  onClick={saveSiteSettings}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  disabled={saving}
                >
                  {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Portfolio Form Component
function PortfolioForm({ initialData = {}, onSubmit, onCancel, saving = false }) {
  const [formData, setFormData] = useState({
    title: initialData.title || "",
    category: initialData.category || "",
    client: initialData.client || "",
    description: initialData.description || "",
    tags: Array.isArray(initialData.tags) ? initialData.tags.join(", ") : initialData.tags || "",
    image: initialData.image || "",
    featured: initialData.featured || false,
    year: initialData.year || new Date().getFullYear().toString(),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      tags: formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Branding">Branding</SelectItem>
              <SelectItem value="Web Design">Web Design</SelectItem>
              <SelectItem value="Content">Content</SelectItem>
              <SelectItem value="Print">Print</SelectItem>
              <SelectItem value="Photography">Photography</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label htmlFor="client">Client</Label>
        <Input
          id="client"
          value={formData.client}
          onChange={(e) => setFormData({ ...formData, client: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          rows={3}
          required
        />
      </div>
      <div>
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
          placeholder="Logo Design, Brand Identity, Style Guide"
        />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={formData.image}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="/placeholder.svg?height=400&width=600&text=Project+Image"
        />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="year">Year</Label>
          <Input
            id="year"
            value={formData.year}
            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
            placeholder="2024"
          />
        </div>
        <div className="flex items-center space-x-2 pt-6">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="rounded"
          />
          <Label htmlFor="featured">Featured on homepage</Label>
        </div>
      </div>
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          disabled={saving}
        >
          {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
          Save
        </Button>
      </div>
    </form>
  )
}
