import { NextRequest, NextResponse } from 'next/server'

// GET /api/check-phone-number - Check if phone numbers are active
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const phones = searchParams.get('phones')

    if (!phones) {
      return NextResponse.json(
        {
          status: false,
          message: 'Missing required parameter: phones'
        },
        { status: 400 }
      )
    }

    const phoneList = phones.split(',').map(p => p.trim())

    // Mock response - in real implementation, check with WhatsApp API
    const results = phoneList.map(phone => ({
      phone: phone,
      status: Math.random() > 0.3 ? 'online' : 'offline'
    }))

    return NextResponse.json({
      status: 'success',
      data: results,
      message: 'Phone numbers checked successfully'
    })
  } catch (error) {
    console.error('Error checking phone numbers:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to check phone numbers'
      },
      { status: 500 }
    )
  }
}
