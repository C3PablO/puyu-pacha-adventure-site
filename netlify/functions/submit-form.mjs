export default async (req, context) => {
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

    // Get Netlify site info from context
    debugInfo.push('\n=== NETLIFY CONTEXT ===')
    debugInfo.push(`Site ID: ${context.site?.id || 'NOT FOUND'}`)
    debugInfo.push(`Deploy ID: ${context.deploy?.id || 'NOT FOUND'}`)

    const siteId = context.site?.id
    const formName = data['form-name'] || 'feedback'

    if (!siteId) {
      debugInfo.push('\n❌ ERROR: No site ID available')
      return new Response(debugInfo.join('\n'), {
        status: 500,
        headers: { 'Content-Type': 'text/plain' }
      })
    }

    // Try to submit using Netlify's internal submission endpoint
    const submissionUrl = `https://api.netlify.com/api/v1/submissions`

    const submissionData = {
      site_id: siteId,
      form_name: formName,
      body: JSON.stringify(data)
    }

    debugInfo.push('\n=== ATTEMPTING API SUBMISSION ===')
    debugInfo.push(`URL: ${submissionUrl}`)
    debugInfo.push(`Payload: ${JSON.stringify(submissionData, null, 2)}`)

    const response = await fetch(submissionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData)
    })

    debugInfo.push('\n=== API RESPONSE ===')
    debugInfo.push(`Status: ${response.status} ${response.statusText}`)

    const responseText = await response.text()
    debugInfo.push(`Body: ${responseText}`)

    if (response.ok) {
      debugInfo.push('\n✅ SUCCESS! Check Netlify Dashboard for submission')
    } else {
      debugInfo.push('\n❌ FAILED - See response above')
    }

    return new Response(debugInfo.join('\n'), {
      status: 200,
      headers: { 'Content-Type': 'text/plain' }
    })

  } catch (error) {
    debugInfo.push('\n=== ERROR ===')
    debugInfo.push(error.message)
    debugInfo.push(error.stack)

    return new Response(debugInfo.join('\n'), {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}

export const config = { path: "/api/submit-form" }
