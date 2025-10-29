export default async (req, context) => {
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
      // For now, just log and redirect - you need to add the API key
      return new Response(null, {
        status: 303,
        headers: { 'Location': '/thank-you' }
      })
    }

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Contact Form puyupacha@gmail.com>', // Change this to your verified domain
        to: 'pabloromerojaern@gmail.com', // Your email
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
    })

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text()
      console.error('Resend API error:', emailResponse.status, errorText)
    } else {
      console.log('Email sent successfully via Resend')
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
