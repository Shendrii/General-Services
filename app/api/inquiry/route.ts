import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const INQUIRY_RECIPIENT = 'onestopbusinesssolutions.ph@gmail.com'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: 'Email service is not configured. Add RESEND_API_KEY to your environment.' },
      { status: 500 }
    )
  }

  const resend = new Resend(apiKey)

  try {
    const body = await request.json()
    const { fullName, email, phone, companyName, serviceInterested, message } = body

    if (!fullName || !email) {
      return NextResponse.json(
        { error: 'Full name and email are required' },
        { status: 400 }
      )
    }

    const { data, error } = await resend.emails.send({
      from: 'General Services <onboarding@resend.dev>',
      to: INQUIRY_RECIPIENT,
      replyTo: email,
      subject: `Service Inquiry from ${fullName} - ${serviceInterested || 'General'}`,
      html: `
        <h2>New Service Inquiry</h2>
        <p><strong>From:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        <p><strong>Company:</strong> ${companyName || 'Not provided'}</p>
        <p><strong>Service Interested In:</strong> ${serviceInterested || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message || 'No additional message'}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, id: data?.id })
  } catch (err) {
    console.error('Inquiry API error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Failed to send inquiry' },
      { status: 500 }
    )
  }
}
