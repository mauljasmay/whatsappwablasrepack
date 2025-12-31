'use client'

import { Button } from '@/components/ui/button'
import { Check, ArrowRight, Star, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <MessageSquare className="h-8 w-8 text-green-600 dark:text-green-500" />
                <span className="text-xl font-bold">WhatsApp Agent</span>
              </Link>
            </div>

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
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Choose the perfect plan for your business needs. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {/* Lite Plan */}
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Lite Plan</CardTitle>
                <CardDescription>Perfect for small businesses</CardDescription>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">$9</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span>1,000 messages/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span>1 connected device</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span>Basic messaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span>Email support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                    <span>Message history</span>
                  </li>
                </ul>
                <Link href="/app?plan=lite" className="block">
                  <Button variant="outline" className="w-full">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="flex flex-col border-2 border-blue-500">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-2xl">Pro Plan</CardTitle>
                  <span className="bg-blue-600 text-white text-xs font-medium px-3 py-1 rounded-full">POPULAR</span>
                </div>
                <CardDescription>Most popular for growing businesses</CardDescription>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>10,000 messages/month</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>3 connected devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Unlimited messaging*</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Webhook integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>Bulk messaging</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>API access</span>
                  </li>
                </ul>
                <Link href="/app?plan=pro" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl">Enterprise Plan</CardTitle>
                <CardDescription>For large-scale operations</CardDescription>
                <div className="flex items-baseline gap-1 mt-4">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ul className="space-y-3 mb-6 flex-1">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>Unlimited messages</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>Unlimited devices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>24/7 phone support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>Dedicated server</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>Custom integration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>Priority processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                    <span>SLA guarantee</span>
                  </li>
                </ul>
                <Link href="/app?plan=enterprise" className="block">
                  <Button variant="outline" className="w-full">
                    Contact Sales
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">*Fair usage policy applies to unlimited plans</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 sm:py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Can I change plans later?</h3>
              <p className="text-muted-foreground">Yes, you can upgrade or downgrade your plan at any time.</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-muted-foreground">We accept credit cards, bank transfers, and e-wallets via Xendit.</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Is there a free trial?</h3>
              <p className="text-muted-foreground">Yes, we offer a 7-day free trial on all plans.</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-muted-foreground">Yes, we offer a 30-day money-back guarantee on all plans.</p>
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/app">
              <Button size="lg" className="bg-white text-green-600 hover:bg-white/90">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/app/api">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                View API Docs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">What Our Customers Say</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-4">
                "WhatsApp Agent has transformed how we communicate with customers. The bulk messaging feature alone has saved us hours every day."
              </p>
              <p className="font-semibold">- Sarah Johnson, CEO</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-4">
                "The API integration was seamless. We were able to connect our CRM and automate all WhatsApp communications."
              </p>
              <p className="font-semibold">- Michael Chen, CTO</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <p className="text-muted-foreground italic mb-4">
                "Outstanding support team. They helped us set up everything and have been responsive to all our questions."
              </p>
              <p className="font-semibold">- David Park, Marketing Manager</p>
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
