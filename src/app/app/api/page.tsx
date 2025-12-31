'use client'

import { Button } from '@/components/ui/button'
import { Terminal, Globe } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'

export default function ApiDocsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Terminal className="h-8 w-8 text-green-600 dark:text-green-500" />
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

      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 px-3 py-1 text-sm font-medium mb-4">
            <Globe className="h-4 w-4" />
            REST API Documentation
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">WhatsApp Agent API</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Complete API documentation for sending and receiving WhatsApp messages.
            Build powerful integrations with our RESTful API.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://docs.xendit.co/docs/payments-via-api-overview" target="_blank" rel="noopener noreferrer">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base sm:text-lg flex-1">
                View Xendit Docs
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">API Endpoints</h2>

          <div className="space-y-6">
            {/* Send Message */}
            <Card className="border-l-4 border-l-green-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm bg-green-100 dark:bg-green-900 px-2 py-1 rounded">POST</span>
                  <span className="font-mono text-sm text-muted-foreground">/api/send-message</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Send a WhatsApp message to a phone number</p>
              </CardContent>
            </Card>

            {/* Get Devices */}
            <Card className="border-l-4 border-l-blue-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded">GET</span>
                  <span className="font-mono text-sm text-muted-foreground">/api/devices</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Get all connected WhatsApp devices</p>
              </CardContent>
            </Card>

            {/* Create Device */}
            <Card className="border-l-4 border-l-purple-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded">POST</span>
                  <span className="font-mono text-sm text-muted-foreground">/api/devices</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Create a new WhatsApp device</p>
              </CardContent>
            </Card>

            {/* Get Contacts */}
            <Card className="border-l-4 border-l-orange-500">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-mono text-sm bg-orange-100 dark:bg-orange-900 px-2 py-1 rounded">GET</span>
                  <span className="font-mono text-sm text-muted-foreground">/api/contacts</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">Get all contacts</p>
              </CardContent>
            </Card>
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
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
