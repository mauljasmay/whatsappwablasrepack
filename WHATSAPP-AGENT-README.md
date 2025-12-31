# WhatsApp Agent

A comprehensive WhatsApp API gateway service similar to Jogja.wablas.com, built with Next.js 15, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

### 📱 Device Management
- Connect multiple WhatsApp devices via QR code scanning
- Monitor device status in real-time
- View device statistics (messages sent/received, battery level)
- Support for multiple plans (Lite, Pro, Enterprise)

### 💬 Message Sending
- Send single or bulk messages
- Support for individual and group messages
- Message personalization with variables
- Real-time message status updates (queued, sent, delivered)
- Mention members in group messages using @number

### 👥 Contact Management
- Add and manage contacts
- Support for personalization fields (name, nickname, address, birthday, email, gender)
- Import/export contacts
- Use contacts for personalized messaging

### 📥 Real-time Inbox
- Receive incoming messages in real-time
- WebSocket-based updates
- Message history tracking

### 🔌 API Endpoints

All API endpoints follow RESTful conventions:

#### Device Management
- `GET /api/devices` - List all devices
- `POST /api/devices` - Create new device

#### Messaging
- `GET /api/send-message` - Send message (query params)
- `POST /api/send-message` - Send single message (JSON body)
- `POST /api/v2/send-message` - Send bulk messages

#### Phone Verification
- `GET /api/check-phone-number` - Check if phone number is active on WhatsApp

#### Contacts
- `GET /api/contacts` - List all contacts
- `POST /api/contacts` - Create new contact

#### Device Utilities
- `GET /api/qr-code/:deviceId` - Generate QR code for device connection
- `GET /api/device-status/:deviceId` - Get device connection status

### 📡 Real-time Updates (WebSocket)
The application includes a WebSocket mini-service running on port 3002 that provides:
- Real-time message status updates
- Incoming message notifications
- Device status changes
- Connection status updates

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4 with shadcn/ui components
- **State Management**: React hooks, Socket.io for real-time
- **Real-time Communication**: Socket.io
- **Database**: Prisma ORM with SQLite (ready for integration)

## Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm or bun

### Installation

1. Install dependencies:
```bash
bun install
```

2. Start the development server:
```bash
bun run dev
```

3. Start the WebSocket service (in a separate terminal):
```bash
cd mini-services/whatsapp-socket
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── src/
│   ├── app/
│   │   ├── api/              # API routes
│   │   │   ├── devices/      # Device management
│   │   │   ├── send-message/ # Message sending
│   │   │   ├── v2/           # Bulk messaging
│   │   │   ├── contacts/     # Contact management
│   │   │   └── qr-code/      # QR code generation
│   │   ├── page.tsx          # Main application page
│   │   └── layout.tsx        # Root layout
│   ├── components/
│   │   └── ui/               # shadcn/ui components
│   └── hooks/
│       └── use-whatsapp-socket.ts  # WebSocket hook
├── mini-services/
│   └── whatsapp-socket/      # WebSocket service
├── prisma/
│   └── schema.prisma         # Database schema
└── public/                   # Static assets
```

## Usage

### Sending a Message

**Using API (GET method):**
```bash
GET /api/send-message?phone=6281234567890&message=Hello&token=YOUR_TOKEN
```

**Using API (POST method):**
```bash
POST /api/send-message
Content-Type: application/json
Authorization: YOUR_TOKEN

{
  "phone": "6281234567890",
  "message": "Hello, this is a test message!",
  "isGroup": false
}
```

### Bulk Messages

```bash
POST /api/v2/send-message
Content-Type: application/json
Authorization: YOUR_TOKEN

{
  "data": [
    {
      "phone": "6281234567890",
      "message": "Hello John!",
      "isGroup": false
    },
    {
      "phone": "6289876543210",
      "message": "Hello Jane!",
      "isGroup": false
    }
  ]
}
```

### Personalization

Use variables in your messages to personalize them:

```json
{
  "phone": "6281234567890",
  "message": "Hello {nickname}, your order has been sent to {address}."
}
```

Available variables:
- `{name}` - Full name
- `{nickname}` - Nickname
- `{address}` - Address
- `{birthday}` - Birthday
- `{email}` - Email
- `{gender}` - Gender

### Checking Phone Numbers

```bash
GET /api/check-phone-number?phones=6281234567890,6289876543210
```

## API Documentation

Complete API documentation is available in the **API Docs** tab of the application, including:
- Authentication
- All endpoints with examples
- Request/response formats
- Error handling

## WebSocket Events

### Client to Server
- `subscribe-device` - Subscribe to device updates
- `subscribe-events` - Subscribe to specific events
- `send-message` - Send a message

### Server to Client
- `connected` - Connection established
- `message-queued` - Message queued for sending
- `message-sent` - Message sent successfully
- `message-delivered` - Message delivered to recipient
- `incoming-message` - New incoming message
- `device-status` - Current device status
- `device-status-update` - Device status update

## License

MIT License - feel free to use this project for your own purposes.

## Support

For issues and questions, please refer to the API documentation in the application.
