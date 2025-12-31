'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface MessageUpdate {
  id: string
  status: string
  timestamp: string
}

interface IncomingMessage {
  id: string
  from: string
  message: string
  timestamp: string
}

interface DeviceStatus {
  device_id: string
  status: string
  last_seen: string
  battery_level?: number
  is_online?: boolean
}

export function useWhatsAppSocket(deviceId: string | null = null) {
  const [isConnected, setIsConnected] = useState(false)
  const [incomingMessages, setIncomingMessages] = useState<IncomingMessage[]>([])
  const [deviceStatus, setDeviceStatus] = useState<DeviceStatus | null>(null)
  const socketRef = useRef<Socket | null>(null)

  useEffect(() => {
    // Initialize socket connection
    const socket = io('/?XTransformPort=3002', {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    })

    socketRef.current = socket

    // Connection handlers
    socket.on('connect', () => {
      console.log('Connected to WhatsApp Socket Service')
      setIsConnected(true)

      // Subscribe to device if provided
      if (deviceId) {
        socket.emit('subscribe-device', deviceId)
      }

      // Subscribe to all events
      socket.emit('subscribe-events', [
        'message-queued',
        'message-sent',
        'message-delivered',
        'incoming-message',
        'device-status',
        'device-status-update'
      ])
    })

    socket.on('disconnect', () => {
      console.log('Disconnected from WhatsApp Socket Service')
      setIsConnected(false)
    })

    socket.on('connected', (data) => {
      console.log('Server connected:', data)
    })

    // Message status updates
    socket.on('message-queued', (data: MessageUpdate) => {
      console.log('Message queued:', data)
    })

    socket.on('message-sent', (data: MessageUpdate) => {
      console.log('Message sent:', data)
    })

    socket.on('message-delivered', (data: MessageUpdate) => {
      console.log('Message delivered:', data)
    })

    // Incoming messages
    socket.on('incoming-message', (data: IncomingMessage) => {
      console.log('Incoming message:', data)
      setIncomingMessages(prev => [data, ...prev].slice(0, 100)) // Keep last 100 messages
    })

    // Device status updates
    socket.on('device-status', (status: DeviceStatus) => {
      console.log('Device status:', status)
      setDeviceStatus(status)
    })

    socket.on('device-status-update', (status: DeviceStatus) => {
      console.log('Device status update:', status)
      setDeviceStatus(status)
    })

    // Error handling
    socket.on('connect_error', (error) => {
      console.error('Connection error:', error)
    })

    socket.on('error', (error) => {
      console.error('Socket error:', error)
    })

    // Cleanup on unmount
    return () => {
      socket.disconnect()
    }
  }, [deviceId])

  // Send message function
  const sendMessage = useCallback((data: { phone: string; message: string; isGroup?: boolean }) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('send-message', data)
      return true
    }
    return false
  }, [])

  // Subscribe to device
  const subscribeToDevice = useCallback((newDeviceId: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('subscribe-device', newDeviceId)
    }
  }, [])

  // Clear incoming messages
  const clearMessages = useCallback(() => {
    setIncomingMessages([])
  }, [])

  return {
    isConnected,
    incomingMessages,
    deviceStatus,
    sendMessage,
    subscribeToDevice,
    clearMessages,
    socket: socketRef.current
  }
}
