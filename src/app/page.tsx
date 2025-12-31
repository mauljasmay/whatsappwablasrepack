'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { MessageSquare, Menu as MenuIcon, X, Sun, Moon, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-500" />
              <span className="text-xl font-bold">WhatsApp Agent</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/">
                <Button variant="ghost" size="sm">Home</Button>
              </Link>
              <Link href="/app/features">
                <Button variant="ghost" size="sm">Features</Button>
              </Link>
              <Link href="/app/pricing">
                <Button variant="ghost" size="sm">Pricing</Button>
              </Link>
              <Link href="/app/api">
                <Button variant="ghost" size="sm">API Docs</Button>
              </Link>
              <Link href="/app">
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </nav>

            {/* Header Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Link href="/" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Button>
              </Link>
              <Link href="/app/features" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </Button>
              </Link>
              <Link href="/app/pricing" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Pricing
                </Button>
              </Link>
              <Link href="/app/api" className="block">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  API Docs
                </Button>
              </Link>
              <Link href="/app" className="block">
                <Button
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 sm:space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 px-3 py-1 text-sm font-medium">
                Professional WhatsApp API Gateway
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Send and Receive WhatsApp Messages at Scale
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                Enterprise-grade API gateway for businesses of all sizes. 
                Connect multiple devices, send bulk messages, and manage contacts with ease.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/app">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg flex-1">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Card */}
            <div className="relative lg:h-[500px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-green-500/20 dark:to-blue-500/20 rounded-full blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-8 sm:p-12 rounded-3xl shadow-2xl">
                <div className="space-y-6 text-center">
                  <h3 className="text-2xl font-bold text-white">Key Features</h3>
                  <div className="space-y-4 text-white/90">
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-green-300 shrink-0"></div>
                      <p>Connect multiple WhatsApp devices</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-green-300 shrink-0"></div>
                      <p>Send bulk messages at scale</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-green-300 shrink-0"></div>
                      <p>Real-time message tracking</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-green-300 shrink-0"></div>
                      <p>Manage contacts efficiently</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="h-2 w-2 mt-2 rounded-full bg-green-300 shrink-0"></div>
                      <p>API access for integrations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose WhatsApp Agent?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for businesses that need reliable WhatsApp messaging
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Link href="/app/features" className="block">
              <div className="p-6 bg-card rounded-lg border hover:border-green-500 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold mb-2">Multi-Device Support</h3>
                <p className="text-muted-foreground">
                  Connect and manage multiple WhatsApp devices from one dashboard
                </p>
              </div>
            </Link>
            <Link href="/app/features" className="block">
              <div className="p-6 bg-card rounded-lg border hover:border-blue-500 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold mb-2">Bulk Messaging</h3>
                <p className="text-muted-foreground">
                  Send thousands of messages at once with personalization support
                </p>
              </div>
            </Link>
            <Link href="/app/features" className="block">
              <div className="p-6 bg-card rounded-lg border hover:border-purple-500 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold mb-2">Real-Time Tracking</h3>
                <p className="text-muted-foreground">
                  Track message status in real-time with WebSocket updates
                </p>
              </div>
            </Link>
            <Link href="/app/features" className="block">
              <div className="p-6 bg-card rounded-lg border hover:border-orange-500 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold mb-2">Contact Management</h3>
                <p className="text-muted-foreground">
                  Full CRUD operations with import/export from CSV/Excel
                </p>
              </div>
            </Link>
            <Link href="/app/features" className="block">
              <div className="p-6 bg-card rounded-lg border hover:border-red-500 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold mb-2">API Access</h3>
                <p className="text-muted-foreground">
                  Full API documentation for seamless integrations
                </p>
              </div>
            </Link>
            <Link href="/app/features" className="block">
              <div className="p-6 bg-card rounded-lg border hover:border-cyan-500 transition-colors cursor-pointer group">
                <h3 className="text-xl font-bold mb-2">Admin Dashboard</h3>
                <p className="text-muted-foreground">
                  Powerful admin panel with GitHub update integration
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using WhatsApp Agent for their WhatsApp messaging needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button size="lg" className="bg-white text-green-600 hover:bg-white/90 text-base sm:text-lg flex-1">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/app/api">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20 text-base sm:text-lg flex-1">
                View API Docs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 sm:py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-sm text-muted-foreground">
            <div>
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-foreground">Home</Link></li>
                <li><Link href="/app/features" className="hover:text-foreground">Features</Link></li>
                <li><Link href="/app/pricing" className="hover:text-foreground">Pricing</Link></li>
                <li><Link href="/app" className="hover:text-foreground">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2">
                <li><Link href="/app/api" className="hover:text-foreground">API Documentation</Link></li>
                <li><a href="https://docs.xendit.co/docs/payments-via-api-overview" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">Payment Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com/mauljasmay/whatsappwablasrepack" target="_blank" rel="noopener noreferrer" className="hover:text-foreground">GitHub</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold mb-3">WhatsApp Agent</p>
              <p>© 2024 All rights reserved.</p>
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center gap-1">
                  <div className="h-4 w-4 text-yellow-500 fill-yellow-500"></div>
                  <div className="h-4 w-4 text-yellow-500 fill-yellow-500"></div>
                  <div className="h-4 w-4 text-yellow-500 fill-yellow-500"></div>
                  <div className="h-4 w-4 text-yellow-500 fill-yellow-500"></div>
                  <div className="h-4 w-4 text-yellow-500 fill-yellow-500"></div>
                </div>
                <span className="text-xs">5.0 from 100+ reviews</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
