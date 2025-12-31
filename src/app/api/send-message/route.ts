import { NextRequest, NextResponse } from 'next/server'

// POST /api/send-message - Send single message
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader) {
      return NextResponse.json(
        {
          status: false,
          message: 'Missing Authorization header'
        },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { phone, message, isGroup = false } = body

    if (!phone || !message) {
      return NextResponse.json(
        {
          status: false,
          message: 'Missing required fields: phone, message'
        },
        { status: 400 }
      )
    }

    // Mock response - in real implementation, use WhatsApp SDK
    const messageId = `MSG${Date.now()}`
    const timestamp = new Date().toISOString()

    return NextResponse.json({
      status: true,
      message: 'Message sent successfully',
      data: {
        id: messageId,
        phone: phone,
        message: message,
        isGroup: isGroup,
        status: 'sent',
        sentAt: timestamp
      }
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to send message'
      },
      { status: 500 }
    )
  }
}

// GET /api/send-message - Get message status
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const phone = searchParams.get('phone')
    const message = searchParams.get('message')
    const token = searchParams.get('token')
    const isGroup = searchParams.get('isGroup') === 'true'

    if (!phone || !message) {
      return NextResponse.json(
        {
          status: false,
          message: 'Missing required parameters: phone, message'
        },
        { status: 400 }
      )
    }

    // Mock response - in real implementation, use WhatsApp SDK
    const messageId = `MSG${Date.now()}`
    const timestamp = new Date().toISOString()

    return NextResponse.json({
      status: true,
      message: 'Message sent successfully',
      data: {
        id: messageId,
        phone: phone,
        message: message,
        isGroup: isGroup,
        status: 'sent',
        sentAt: timestamp
      }
    })
  } catch (error) {
    console.error('Error sending message:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to send message'
      },
      { status: 500 }
    )
  }
}
