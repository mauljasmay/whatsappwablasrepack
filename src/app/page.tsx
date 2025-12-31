'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useTheme } from 'next-themes'
import {
  MessageSquare,
  Smartphone,
  Send,
  Zap,
  Shield,
  Users,
  Globe,
  ArrowRight,
  CheckCircle2,
  Menu,
  X,
  Moon,
  Sun,
  Github,
  Server,
  BarChart3,
  Clock,
  Lock,
  ChevronDown,
  Star,
  TrendingUp
} from 'lucide-react'

export default function LandingPage() {
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-500" />
              <span className="text-xl font-bold">WhatsApp Agent</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection('home')}
                className={activeSection === 'home' ? 'text-foreground' : 'text-muted-foreground'}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection('features')}
                className={activeSection === 'features' ? 'text-foreground' : 'text-muted-foreground'}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection('pricing')}
                className={activeSection === 'pricing' ? 'text-foreground' : 'text-muted-foreground'}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection('docs')}
                className={activeSection === 'docs' ? 'text-foreground' : 'text-muted-foreground'}
              >
                Documentation
              </Button>
              <Button
                asChild
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <a href="/app">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
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
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveSection('home')
                  setMobileMenuOpen(false)
                }}
              >
                Home
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveSection('features')
                  setMobileMenuOpen(false)
                }}
              >
                Features
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveSection('pricing')
                  setMobileMenuOpen(false)
                }}
              >
                Pricing
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => {
                  setActiveSection('docs')
                  setMobileMenuOpen(false)
                }}
              >
                Documentation
              </Button>
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <a href="/app">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      {activeSection === 'home' && (
        <>
          <section className="relative py-16 sm:py-20 lg:py-28 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 sm:space-y-8">
                  <Badge className="inline-flex items-center gap-2 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    <Zap className="h-4 w-4" />
                    New Version 1.0.0
                  </Badge>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                    Professional{' '}
                    <span className="text-green-600 dark:text-green-500">WhatsApp API</span>
                    <br />
                    Gateway Service
                  </h1>
                  <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                    Send and receive WhatsApp messages at scale with our enterprise-grade API gateway.
                    Perfect for businesses of all sizes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-white text-base sm:text-lg flex-1">
                      <a href="/app">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="text-base sm:text-lg flex-1">
                      <a href="#features">
                        Learn More
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </a>
                    </Button>
                  </div>
                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                      <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    </div>
                    <span className="text-sm text-muted-foreground">5.0 from 100+ users</span>
                  </div>
                </div>
                <div className="relative lg:h-[500px] flex items-center justify-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10 dark:from-green-500/20 dark:to-blue-500/20 rounded-full blur-3xl"></div>
                  <div className="relative bg-gradient-to-br from-green-500 to-green-600 p-8 sm:p-12 rounded-3xl shadow-2xl">
                    <div className="grid grid-cols-3 gap-6">
                      <div className="text-center space-y-2">
                        <MessageSquare className="h-12 w-12 mx-auto text-white" />
                        <div className="text-3xl font-bold text-white">10K+</div>
                        <div className="text-sm text-white/80">Messages/Day</div>
                      </div>
                      <div className="text-center space-y-2">
                        <Smartphone className="h-12 w-12 mx-auto text-white" />
                        <div className="text-3xl font-bold text-white">5K+</div>
                        <div className="text-sm text-white/80">Devices</div>
                      </div>
                      <div className="text-center space-y-2">
                        <Users className="h-12 w-12 mx-auto text-white" />
                        <div className="text-3xl font-bold text-white">1K+</div>
                        <div className="text-sm text-white/80">Businesses</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="py-12 sm:py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900">
                    <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">99.9%</div>
                  <div className="text-muted-foreground">Uptime Guarantee</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900">
                    <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">&lt;100ms</div>
                  <div className="text-muted-foreground">Response Time</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900">
                    <Send className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">50M+</div>
                  <div className="text-muted-foreground">Messages Sent</div>
                </div>
                <div className="text-center space-y-2">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 dark:bg-orange-900">
                    <TrendingUp className="h-8 w-8 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold">24/7</div>
                  <div className="text-muted-foreground">Support Available</div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Powerful Features</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Everything you need to manage WhatsApp messages at scale
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <Card className="border-2 hover:border-green-500 transition-colors">
                  <CardContent className="pt-6 space-y-4">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-green-100 dark:bg-green-900">
                      <Smartphone className="h-7 w-7 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-xl font-bold">Device Management</h3>
                    <p className="text-muted-foreground">
                      Connect and manage multiple WhatsApp devices with QR code scanning. Monitor status in real-time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-blue-500 transition-colors">
                  <CardContent className="pt-6 space-y-4">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-blue-100 dark:bg-blue-900">
                      <Send className="h-7 w-7 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-xl font-bold">Bulk Messaging</h3>
                    <p className="text-muted-foreground">
                      Send thousands of messages at once. Support for personalization with variables.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-500 transition-colors">
                  <CardContent className="pt-6 space-y-4">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-purple-100 dark:bg-purple-900">
                      <Users className="h-7 w-7 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="text-xl font-bold">Contact Manager</h3>
                    <p className="text-muted-foreground">
                      Manage contacts with full CRUD operations. Import/export from CSV/Excel.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-orange-500 transition-colors">
                  <CardContent className="pt-6 space-y-4">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-orange-100 dark:bg-orange-900">
                      <Shield className="h-7 w-7 text-orange-600 dark:text-orange-400" />
                    </div>
                    <h3 className="text-xl font-bold">Real-time Updates</h3>
                    <p className="text-muted-foreground">
                      WebSocket-powered live updates. Message status tracking in real-time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-red-500 transition-colors">
                  <CardContent className="pt-6 space-y-4">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-red-100 dark:bg-red-900">
                      <Lock className="h-7 w-7 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold">Admin Dashboard</h3>
                    <p className="text-muted-foreground">
                      Secure admin panel with system controls. GitHub updates integration.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-cyan-500 transition-colors">
                  <CardContent className="pt-6 space-y-4">
                    <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-cyan-100 dark:bg-cyan-900">
                      <BarChart3 className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h3 className="text-xl font-bold">Analytics & Reports</h3>
                    <p className="text-muted-foreground">
                      Detailed analytics and reports. Track message delivery rates and engagement.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 sm:py-20 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Get started in just 3 simple steps
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 sm:gap-12">
                <div className="space-y-4 text-center">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white text-3xl font-bold mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-bold">Sign Up</h3>
                  <p className="text-muted-foreground">
                    Create your account and get your API key instantly. No credit card required.
                  </p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-bold mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-bold">Connect Device</h3>
                  <p className="text-muted-foreground">
                    Scan QR code with WhatsApp. Your device is ready in seconds.
                  </p>
                </div>
                <div className="space-y-4 text-center">
                  <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 text-white text-3xl font-bold mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-bold">Start Sending</h3>
                  <p className="text-muted-foreground">
                    Use our simple API to send messages. Track delivery in real-time.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-16 sm:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12 sm:mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple Pricing</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Choose the plan that fits your business needs
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                {/* Lite Plan */}
                <Card className="relative">
                  <CardContent className="pt-6 space-y-6">
                    <h3 className="text-2xl font-bold">Lite</h3>
                    <div className="text-4xl font-bold">$9</div>
                    <div className="text-muted-foreground">per month</div>
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>1,000 messages/month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>1 device</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Email support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Basic analytics</span>
                      </div>
                    </div>
                    <Button asChild className="w-full" size="lg">
                      <a href="/app">
                        Get Started
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Pro Plan */}
                <Card className="relative border-2 border-green-500">
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-600 text-white">
                    Most Popular
                  </Badge>
                  <CardContent className="pt-6 space-y-6">
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <div className="text-4xl font-bold">$29</div>
                    <div className="text-muted-foreground">per month</div>
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>10,000 messages/month</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>3 devices</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Priority support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Advanced analytics</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Webhook integration</span>
                      </div>
                    </div>
                    <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white" size="lg">
                      <a href="/app">
                        Get Started
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                {/* Enterprise Plan */}
                <Card className="relative">
                  <CardContent className="pt-6 space-y-6">
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <div className="text-4xl font-bold">$99</div>
                    <div className="text-muted-foreground">per month</div>
                    <div className="space-y-3 pt-4 border-t">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Unlimited messages</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Unlimited devices</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>24/7 phone support</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Dedicated server</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <span>Custom integration</span>
                      </div>
                    </div>
                    <Button asChild className="w-full" size="lg">
                      <a href="/app">
                        Contact Sales
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 to-green-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                Join thousands of businesses already using WhatsApp Agent. Start your free trial today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-green-600 hover:bg-white/90 flex-1">
                  <a href="/app">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20 flex-1">
                  <a href="#docs">
                    View Documentation
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Features Section */}
      {activeSection === 'features' && (
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Complete Feature List</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need for professional WhatsApp messaging
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    Device Management
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Connect multiple WhatsApp devices via QR code</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Real-time device status monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Battery level tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Device actions: connect, disconnect, delete</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <Send className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    Messaging System
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Send single or bulk messages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Group messaging support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Message personalization with variables</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Real-time delivery status tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Message history and logs</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    Contact Management
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Full CRUD operations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Personalization fields support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Bulk import from CSV/Excel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Contact search and filter</span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                    </div>
                    Admin & Security
                  </h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>Secure admin authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>GitHub updates integration</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>System status monitoring</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span>API key management</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}
      )}
      {/* Footer */}
      <footer className="border-t py-8 sm:py-12 mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 sm:gap-12">
            <div className="space-y-4">
              <h4 className="font-semibold mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#features" className="hover:text-foreground">Features</a></li>
                <li><a href="#pricing" className="hover:text-foreground">Pricing</a></li>
                <li><a href="#docs" className="hover:text-foreground">Documentation</a></li>
                <li><a href="/app" className="hover:text-foreground">Get Started</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">Help Center</a></li>
                <li><a href="#" className="hover:text-foreground">Documentation</a></li>
                <li><a href="#" className="hover:text-foreground">API Reference</a></li>
                <li><a href="#" className="hover:text-foreground">Status Page</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-foreground">About Us</a></li>
                <li><a href="#" className="hover:text-foreground">Blog</a></li>
                <li><a href="#" className="hover:text-foreground">Careers</a></li>
                <li><a href="#" className="hover:text-foreground">Contact</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold mb-3">Connect</h4>
              <div className="space-y-2">
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <a href="https://github.com/mauljasmay/whatsappwablasrepack" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4 mr-2" />
                    GitHub
                  </a>
                </Button>
                <Button asChild variant="outline" className="w-full justify-start" size="sm">
                  <a href="/app">
                    <Server className="h-4 w-4 mr-2" />
                    Dashboard
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 WhatsApp Agent - Wablas Repack. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Built with Next.js 15, TypeScript, and Tailwind CSS
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
