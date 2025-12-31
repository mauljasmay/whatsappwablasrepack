import { NextRequest, NextResponse } from 'next/server'

// GET /api/contacts - List all contacts
export async function GET() {
  try {
    // Mock data - in real implementation, fetch from database
    const contacts = [
      {
        id: 'C001',
        name: 'John Doe',
        nickname: 'Johnny',
        phone: '6281234567890',
        email: 'john@example.com',
        address: 'Jakarta, Indonesia',
        birthday: '1990-05-15',
        gender: 'male'
      },
      {
        id: 'C002',
        name: 'Jane Smith',
        nickname: 'Jane',
        phone: '6289876543210',
        email: 'jane@example.com',
        address: 'Surabaya, Indonesia',
        birthday: '1992-08-20',
        gender: 'female'
      }
    ]

    return NextResponse.json({
      status: true,
      data: contacts,
      message: 'Contacts retrieved successfully'
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to retrieve contacts'
      },
      { status: 500 }
    )
  }
}

// POST /api/contacts - Create new contact
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, nickname, phone, email, address, birthday, gender } = body

    if (!name || !phone) {
      return NextResponse.json(
        {
          status: false,
          message: 'Missing required fields: name, phone'
        },
        { status: 400 }
      )
    }

    // Generate contact ID
    const contactId = `C${Date.now().toString().slice(-6)}`

    // Mock response - in real implementation, save to database
    const contact = {
      id: contactId,
      name,
      nickname,
      phone,
      email,
      address,
      birthday,
      gender,
      created_at: new Date().toISOString()
    }

    return NextResponse.json({
      status: true,
      message: 'Contact created successfully',
      data: contact
    })
  } catch (error) {
    console.error('Error creating contact:', error)
    return NextResponse.json(
      {
        status: false,
        message: 'Failed to create contact'
      },
      { status: 500 }
    )
  }
}
