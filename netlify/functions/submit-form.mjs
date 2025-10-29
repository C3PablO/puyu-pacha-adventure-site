import { Resend } from 'resend'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const formData = await req.formData()

    // Extract form data
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    console.log('Form submission received:', data)

    // Get Resend API key from environment variable
    const resendApiKey = Netlify.env.get('RESEND_API_KEY')

    if (!resendApiKey) {
      console.error('RESEND_API_KEY not configured')
      return new Response(null, {
        status: 303,
        headers: { 'Location': '/thank-you' }
      })
    }

    // Initialize Resend with API key
    const resend = new Resend(resendApiKey)

    // Send email using Resend SDK
    const { data: emailData, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'pabloromerojaren@gmail.com',
      subject: data.subject || 'New Contact Form Submission',
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${data.firstname}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message}</p>
        <p><strong>Privacy accepted:</strong> ${data.privacy || 'No'}</p>
      `
    })

    if (error) {
      console.error('Resend error:', error)
    } else {
      console.log('Email sent successfully:', emailData)
    }

    // Redirect to thank you page
    return new Response(null, {
      status: 303,
      headers: { 'Location': '/thank-you' }
    })

  } catch (error) {
    console.error('Form submission error:', error)
    // Still redirect to thank you even if email fails
    return new Response(null, {
      status: 303,
      headers: { 'Location': '/thank-you' }
    })
  }
}

export const config = { path: "/api/submit-form" }
