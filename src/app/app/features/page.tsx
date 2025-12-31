'use client'

import { Button } from '@/components/ui/button'
import { MessageSquare, Smartphone, Send, Users, Shield, Lock, Zap } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'

export default function FeaturesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-500" />
              <span className="text-xl font-bold">WhatsApp Agent</span>
            </Link>

            <nav className="flex items-center gap-6">
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
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Powerful Features</h1>
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
                  Full control with admin dashboard, update management, and system monitoring.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-cyan-500 transition-colors">
              <CardContent className="pt-6 space-y-4">
                <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-cyan-100 dark:bg-cyan-900">
                  <Zap className="h-7 w-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Optimized for speed with load times under 2 seconds. Lighthouse score 95+.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses using WhatsApp Agent
          </p>
          <Link href="/app">
            <Button size="lg" className="bg-white text-green-600 hover:bg-white/90">
              Start Free Trial
            </Button>
          </Link>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
