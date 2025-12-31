import { createServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'

const PORT = 3002

const httpServer = createServer()
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

// Store connected clients and their subscriptions
const clients = new Map()

// Event handlers
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`)

  // Store client with empty subscriptions
  clients.set(socket.id, {
    deviceId: null,
    subscribedEvents: []
  })

  // Handle device subscription
  socket.on('subscribe-device', (deviceId: string) => {
    const client = clients.get(socket.id)
    if (client) {
      client.deviceId = deviceId
      console.log(`Client ${socket.id} subscribed to device ${deviceId}`)

      // Send current device status
      socket.emit('device-status', {
        device_id: deviceId,
        status: 'connected',
        last_seen: new Date().toISOString(),
        battery_level: 85,
        is_online: true
      })
    }
  })

  // Handle event subscription
  socket.on('subscribe-events', (events: string[]) => {
    const client = clients.get(socket.id)
    if (client) {
      client.subscribedEvents = events
      console.log(`Client ${socket.id} subscribed to events: ${events.join(', ')}`)
    }
  })

  // Handle message send request
  socket.on('send-message', (data) => {
    console.log('Message send request:', data)

    // Simulate sending message
    const messageId = `MSG${Date.now()}`

    // Send acknowledgment
    socket.emit('message-queued', {
      id: messageId,
      phone: data.phone,
      message: data.message,
      status: 'queued',
      timestamp: new Date().toISOString()
    })

    // Simulate message status updates
    setTimeout(() => {
      socket.emit('message-sent', {
        id: messageId,
        status: 'sent',
        timestamp: new Date().toISOString()
      })
    }, 1000)

    setTimeout(() => {
      socket.emit('message-delivered', {
        id: messageId,
        status: 'delivered',
        timestamp: new Date().toISOString()
      })
    }, 3000)
  })

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`)
    clients.delete(socket.id)
  })

  // Send initial welcome message
  socket.emit('connected', {
    message: 'Connected to WhatsApp Socket Service',
    serverTime: new Date().toISOString()
  })
})

// Simulate incoming messages
setInterval(() => {
  if (clients.size > 0) {
    const incomingMessage = {
      id: `IN${Date.now()}`,
      from: '628' + Math.floor(Math.random() * 10000000000),
      message: ['Hello!', 'How are you?', 'Thank you!', 'Price?', 'Available?'][
        Math.floor(Math.random() * 5)
      ],
      timestamp: new Date().toISOString()
    }

    // Broadcast to all connected clients
    io.emit('incoming-message', incomingMessage)
    console.log('Broadcasting incoming message:', incomingMessage)
  }
}, 30000) // Every 30 seconds

// Simulate device status updates
setInterval(() => {
  const devices = ['WA001', 'WA002']
  const randomDevice = devices[Math.floor(Math.random() * devices.length)]

  io.emit('device-status-update', {
    device_id: randomDevice,
    status: Math.random() > 0.9 ? 'disconnected' : 'connected',
    last_seen: new Date().toISOString(),
    battery_level: Math.floor(Math.random() * 20) + 80, // 80-100%
    is_online: Math.random() > 0.1
  })

  console.log(`Device status update for ${randomDevice}`)
}, 60000) // Every 60 seconds

// Start server
httpServer.listen(PORT, () => {
  console.log(`WhatsApp Socket Service running on port ${PORT}`)
  console.log(`WebSocket endpoint: ws://localhost:${PORT}`)
})
