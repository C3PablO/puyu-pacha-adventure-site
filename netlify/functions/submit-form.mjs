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

    console.log('Received form submission:', data)

    // Get Netlify site info from context
    const siteId = context.site?.id || Netlify.env.get('SITE_ID')
    const formName = data['form-name'] || 'feedback'

    console.log('Site ID:', siteId)
    console.log('Form name:', formName)

    // Try to submit using Netlify's internal submission endpoint
    // This bypasses the website entirely
    const submissionUrl = `https://api.netlify.com/api/v1/submissions`

    const submissionData = {
      site_id: siteId,
      form_name: formName,
      body: JSON.stringify(data)
    }

    console.log('Submitting to Netlify API:', submissionUrl)

    const response = await fetch(submissionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })

    console.log('Netlify API response:', response.status, response.statusText)
    const responseText = await response.text()
    console.log('Response body:', responseText)

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
