"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, Mail, Phone, Building, MessageSquare, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"

// Simple password protection
const ADMIN_PASSWORD = "Ubbh47&0" // Change this to a secure password

export default function AdminBookingsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [bookings, setBookings] = useState<any[]>([])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      loadBookings()
    } else {
      alert("Incorrect password")
    }
  }

  const loadBookings = () => {
    // In a real app, this would fetch from a database
    // For now, we'll show sample data
    const sampleBookings = [
      {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        company: "Tech Corp",
        phone: "+234 123 456 7890",
        service: "ai-consulting",
        date: "2024-02-15",
        time: "10:00",
        message: "Looking to implement AI solutions for our customer service",
        timestamp: "2024-02-10T14:30:00Z",
        status: "pending",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane@startup.com",
        company: "StartupXYZ",
        phone: "+234 987 654 3210",
        service: "software-development",
        date: "2024-02-20",
        time: "14:00",
        message: "Need a custom CRM system for our growing business",
        timestamp: "2024-02-11T09:15:00Z",
        status: "confirmed",
      },
    ]
    setBookings(sampleBookings)
  }

  const getServiceName = (serviceId: string) => {
    const services: Record<string, string> = {
      "ai-consulting": "AI Strategy & Consulting",
      "software-development": "Custom Software Development",
      "cloud-solutions": "Cloud Solutions",
      "digital-marketing": "Digital Marketing",
    }
    return services[serviceId] || serviceId
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="max-w-md w-full mx-auto p-8">
          <div className="text-center mb-8">
            <Image
              src="/images/omar-logo.png"
              alt="Omar Consults"
              width={200}
              height={70}
              className="h-12 w-auto mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold">Admin Access</h1>
            <p className="text-muted-foreground">Enter password to view bookings</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-background"
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Access Dashboard
            </Button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image src="/images/omar-logo.png" alt="Omar Consults" width={160} height={50} className="h-8 w-auto" />
              <h1 className="text-xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Website
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setIsAuthenticated(false)}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Consultation Bookings</h2>
          <p className="text-muted-foreground">Manage and track consultation requests</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
                <p className="text-2xl font-bold">{bookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold">{bookings.filter((b) => b.status === "pending").length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Confirmed</p>
                <p className="text-2xl font-bold">{bookings.filter((b) => b.status === "confirmed").length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">This Week</p>
                <p className="text-2xl font-bold">2</p>
              </div>
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-card p-6 rounded-lg border">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{booking.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Submitted {new Date(booking.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">{booking.email}</span>
                </div>
                {booking.phone && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.phone}</span>
                  </div>
                )}
                {booking.company && (
                  <div className="flex items-center space-x-2">
                    <Building className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{booking.company}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Service</p>
                  <p className="text-sm">{getServiceName(booking.service)}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date</p>
                  <p className="text-sm">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Time</p>
                  <p className="text-sm">{booking.time}</p>
                </div>
              </div>

              {booking.message && (
                <div className="mb-4">
                  <div className="flex items-start space-x-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground mt-1" />
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Message</p>
                      <p className="text-sm mt-1">{booking.message}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex space-x-2">
                <Button size="sm" variant="outline">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Client
                </Button>
                <Button size="sm" variant="outline">
                  <Phone className="w-4 h-4 mr-2" />
                  Call Client
                </Button>
                <Button size="sm">Mark as Confirmed</Button>
              </div>
            </div>
          ))}
        </div>

        {bookings.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
            <p className="text-muted-foreground">New consultation requests will appear here</p>
          </div>
        )}
      </main>
    </div>
  )
}
