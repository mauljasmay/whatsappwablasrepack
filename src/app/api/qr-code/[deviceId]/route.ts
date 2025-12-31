import { NextRequest, NextResponse } from 'next/server'

// GET /api/qr-code/:deviceId - Generate QR code for device connection
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

    // Mock response - in real implementation, generate actual QR code using WhatsApp Web API
    const qrData = {
      device_id: deviceId,
      qr_code: `mock_qr_code_for_${deviceId}`,
      expires_in: 300, // 5 minutes
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    }

    return NextResponse.json({
      status: true,
      message: 'QR code generated successfully',
      data: qrData
    })
  } catch (error) {
    console.error('Error generating QR code:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to generate QR code'
      },
      { status: 500 }
    )
  }
}
