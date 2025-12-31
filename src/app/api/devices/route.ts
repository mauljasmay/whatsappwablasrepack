import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/devices - List all devices
export async function GET() {
  try {
    // For now, return mock data. Later will use database
    const devices = [
      {
        id: 'WA001',
        name: 'Business WhatsApp',
        phone: '+6281234567890',
        status: 'connected',
        connectedAt: '2024-01-15T10:30:00',
        lastSeen: '2024-01-20T15:45:00',
        plan: 'pro',
        messagesSent: 1247,
        messagesReceived: 856
      },
      {
        id: 'WA002',
        name: 'Support Line',
        phone: '+6289876543210',
        status: 'disconnected',
        connectedAt: null,
        lastSeen: '2024-01-18T09:20:00',
        plan: 'lite',
        messagesSent: 324,
        messagesReceived: 198
      }
    ]

    return NextResponse.json({
      status: true,
      data: devices,
      message: 'Devices retrieved successfully'
    })
  } catch (error) {
    console.error('Error fetching devices:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to retrieve devices'
      },
      { status: 500 }
    )
  }
}

// POST /api/devices - Create new device
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, phone, bank, periode, product } = body

    if (!name || !phone || !bank || !product) {
      return NextResponse.json(
        {
          status: false,
          message: 'Missing required fields: name, phone, bank, product'
        },
        { status: 400 }
      )
    }

    // Generate device ID
    const deviceId = `WA${Date.now().toString().slice(-6)}`

    // Mock response - in real implementation, save to database
    const device = {
      device_id: deviceId,
      device_name: name,
      device_phone: phone,
      status: 'pending',
      plan: product,
      billing_period: periode || 'monthly',
      created_at: new Date().toISOString()
    }

    return NextResponse.json({
      status: true,
      message: 'Device created successfully',
      data: device
    })
  } catch (error) {
    console.error('Error creating device:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to create device'
      },
      { status: 500 }
    )
  }
}
