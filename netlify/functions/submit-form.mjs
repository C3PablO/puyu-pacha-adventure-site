import { Buffer } from 'node:buffer'

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 })
  }

  try {
    const formData = await req.formData()
    
    // Convert to URL-encoded format for Netlify Forms
    const params = new URLSearchParams()
    for (const [key, value] of formData.entries()) {
      params.append(key, value)
    }

    console.log('Submitting to Netlify Forms:', Object.fromEntries(params))

    // Submit to Netlify Forms by POSTing with the special header
    const response = await fetch('https://puyupacha.netlify.app/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    })

    console.log('Netlify Forms response:', response.status, response.statusText)

    // Redirect to thank you page
    return new Response(null, {
      status: 303,
      headers: {
        'Location': '/thank-you'
      }
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return new Response('Form submission failed: ' + error.message, { status: 500 })
  }
}

export const config = { path: "/api/submit-form" }
