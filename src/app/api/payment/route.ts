import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    status: true,
    message: "Xendit Payment API Documentation",
    data: {
      api_version: "1.0.0",
      provider: "Xendit",
      documentation_url: "https://docs.xendit.co/docs/payments-via-api-overview",
      supported_payment_methods: ["CREDIT_CARD", "VIRTUAL_ACCOUNT", "BANK_TRANSFER", "OVO", "DANA", "QR_CODE", "RETAIL_OUTLET", "ALFAMART"],
      features: {
        instant_payment: true,
        recurring_billing: true,
        installment_plans: [{ months: 3, interest_rate: "0%" }, { months: 6, interest_rate: "0%" }, { months: 12, interest_rate: "0%" }],
        payment_notification: true,
        webhook_callbacks: true,
        disbursement_enabled: true
      },
      pricing_plans: {
        LITE: { id: "lite", name: "Lite Plan", price: 90000, currency: "IDR", messages_per_month: 1000, devices: 1, features: ["Basic messaging", "Email support", "Message history"] },
        PRO: { id: "pro", name: "Pro Plan", price: 290000, currency: "IDR", messages_per_month: 10000, devices: 3, features: ["Unlimited messaging*", "Priority support", "Advanced analytics", "Webhook integration", "Bulk messaging", "API access"], note: "*Fair usage policy applies" },
        ENTERPRISE: { id: "enterprise", name: "Enterprise Plan", price: 990000, currency: "IDR", messages_per_month: "unlimited", devices: "unlimited", features: ["Unlimited everything", "24/7 phone support", "Dedicated server", "Custom integration", "Priority processing", "SLA guarantee"] }
      },
      integration_steps: [
        { step: 1, title: "Get API Credentials", description: "Sign up at Xendit (https://dashboard.xendit.co/register) and obtain your API Key", url: "https://dashboard.xendit.co/register" },
        { step: 2, title: "Create Payment Request", description: "POST to /payment_requests with required fields to initiate payment", code_example: "curl -X POST https://api.xendit.co/v2/payment_requests -H \"Content-Type: application/json\" -H \"for-user-id: YOUR_XENDIT_API_KEY\" -d \"{ \"reference_id\": \"ORDER-\\${Date.now()}\", \"currency\": \"IDR\", \"amount\": 290000, \"payment_method\": \"VIRTUAL_ACCOUNT\", \"customer\": { \"given_names\": \"John\", \"surname\": \"Doe\", \"email\": \"john@example.com\" }, \"items\": [{ \"name\": \"Pro Plan - WhatsApp Agent\", \"quantity\": 1, \"price\": 290000, \"category\": \"WHATSAPP\" }], \"callback_url\": \"https://yourdomain.com/api/payment/callback\", \"description\": \"WhatsApp Agent Pro Plan - 3 months\" }\"" },
        { step: 3, title: "Handle Callback", description: "Implement webhook endpoint to receive payment notifications", code_example: "// Next.js API Route - api/payment/callback/route.ts\nexport async function POST(request: Request) { const body = await request.json()\n  if (body.status === \"COMPLETED\") { await updateUserPlan(body.reference_id, \"pro\")\n  await sendConfirmationEmail(body.customer.email)\n  return NextResponse.json({ status: \"success\" })\n  }\n  return NextResponse.json({ status: \"failed\" })\n}" },
        { step: 4, title: "Redirect User", description: "Redirect user to payment page or show QR code", example: "// After creating payment request, you\"ll receive:\n{\n  \"id\": \"pay_159528483923012_0x159528529826735\",\n  \"payment_url\": \"https://checkout.xendit.co/web/...\",\n  \"amount\": 290000.00,\n  \"status\": \"PENDING\"\n}\n\n// Redirect user to payment_url\nrouter.push(payment_url)" }
      ],
      security: { api_key_protection: "Never expose API keys in client-side code", https_only: "Always use HTTPS for production", webhook_verification: "Verify webhook callbacks by checking X-XENDIT-Signature header", rate_limiting: "Xendit has rate limits. Implement backoff for failed requests", reference_id_uniqueness: "Use unique reference_id (timestamp + order_id)" },
      testing: { sandbox: "https://dashboard.xendit.co/register", test_credentials: "Use Xendit dashboard to generate test API keys", test_payment_url: "https://checkout.xendit.co/payment/demo" },
      support: { documentation: "https://docs.xendit.co", support_email: "help@xendit.co", developer_support: "https://developers.xendit.co", community_forum: "https://community.xendit.co" },
      common_errors: [{ code: "API_KEY_INVALID", message: "Invalid API key", solution: "Check your API key in dashboard" }, { code: "AMOUNT_INVALID", message: "Amount must be greater than minimum", solution: "Check minimum amounts for payment method" }, { code: "PAYMENT_METHOD_NOT_AVAILABLE", message: "Payment method not available for this account", solution: "Contact Xendit to enable payment method" }, { code: "DUPLICATE_REFERENCE_ID", message: "Reference ID already exists", solution: "Use unique reference_id (timestamp + order_id)" }, { code: "WEBHOOK_URL_INVALID", message: "Invalid callback URL format", solution: "Ensure URL starts with https:// and is publicly accessible" }],
      success_examples: [{ scenario: "Successful Payment", webhook_payload: { id: "5ac0aea015295390527923", external_id: "ORDER-123", business_id: "YOUR_BUSINESS_ID", amount: 290000.00, currency: "IDR", status: "COMPLETED", payment_method: "VIRTUAL_ACCOUNT", payment_channel: "OVO", created: "2024-01-20T10:30:00.000Z", paid_at: "2024-01-20T10:35:30.000Z", customer: { given_names: "John", surname: "Doe", email: "john@example.com" } }, response: "Update user plan to PRO and send confirmation email" }]
    }
  })
}
