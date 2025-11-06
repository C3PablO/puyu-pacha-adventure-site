import { Resend } from 'resend'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  const debugInfo = []

  try {
    const formData = await req.formData()

    // Extract form data
    const data = {}
    for (const [key, value] of formData.entries()) {
      data[key] = value
    }

    debugInfo.push('=== FORM DATA RECEIVED ===')
    debugInfo.push(JSON.stringify(data, null, 2))

    // Get Resend API key from environment variable
    const resendApiKey = Netlify.env.get('RESEND_API_KEY')

    debugInfo.push('\n=== RESEND API KEY ===')
    debugInfo.push(resendApiKey ? `Found (${resendApiKey.substring(0, 10)}...)` : '❌ NOT FOUND')

    if (!resendApiKey) {
      debugInfo.push('\n❌ ERROR: RESEND_API_KEY not configured in Netlify')
      debugInfo.push('Go to: Netlify Dashboard → Site Configuration → Environment Variables')
      debugInfo.push('Add variable: RESEND_API_KEY = your_resend_api_key')

      return new Response(debugInfo.join('\n'), {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Initialize Resend with API key
    debugInfo.push('\n=== INITIALIZING RESEND ===')
    const resend = new Resend(resendApiKey)
    debugInfo.push('✅ Resend initialized')

    const { data: emailData, error } = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'puyupacha@gmail.com',
      subject: data.subject || 'Nuevo mensaje de formulario de contacto',
      html: `
        <h2>Nuevo mensaje de formulario de contacto</h2>
        <p><strong>De:</strong> ${data.firstname}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${data.message}</p>
        <p><strong>Privacidad aceptada:</strong> ${data.privacy || 'No'}</p>
      `
    })

    return new Response(debugInfo.join('\n'), {
      status: error ? 500 : 200,
      headers: { 'Content-Type': 'text/plain' }
    })

  } catch (error) {
    debugInfo.push('\n=== EXCEPTION ===')
    debugInfo.push(error.message)
    debugInfo.push(error.stack)

    return new Response(debugInfo.join('\n'), {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}

export const config = { path: "/api/submit-form" }
