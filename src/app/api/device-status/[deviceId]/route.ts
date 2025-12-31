import { NextRequest, NextResponse } from 'next/server'

// GET /api/device-status/:deviceId - Get device connection status
export async function GET(
  request: NextRequest,
  { params }: { params: { deviceId: string } }
) {
  try {
    const { deviceId } = params

    if (!deviceId) {
      return NextResponse.json(
        {
          status: false,
          message: 'Missing device ID'
        },
        { status: 400 }
      )
    }

    // Mock response - in real implementation, check actual device status from database
    const status = {
      device_id: deviceId,
      status: 'connected', // or 'disconnected', 'pending', 'expired'
      connected_at: '2024-01-15T10:30:00',
      last_seen: new Date().toISOString(),
      phone: '+6281234567890',
      battery_level: 85,
      is_online: true
    }

    return NextResponse.json({
      status: true,
      message: 'Device status retrieved successfully',
      data: status
    })
  } catch (error) {
    console.error('Error getting device status:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to get device status'
      },
      { status: 500 }
    )
  }
}
