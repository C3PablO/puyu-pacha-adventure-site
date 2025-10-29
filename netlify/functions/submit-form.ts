import type { Handler, HandlerEvent } from "@netlify/functions"

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" }
  }

  try {
    // Parse form data
    const params = new URLSearchParams(event.body || "")
    const formData: Record<string, string> = {}
    
    for (const [key, value] of params.entries()) {
      formData[key] = value
    }

    // Submit to Netlify Forms
    const response = await fetch(`https://api.netlify.com/api/v1/forms/${process.env.NETLIFY_SITE_ID}/submissions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.NETLIFY_AUTH_TOKEN}`,
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`Netlify Forms API error: ${response.statusText}`)
    }

    // Redirect to thank you page
    return {
      statusCode: 303,
      headers: {
        "Location": "/thank-you",
      },
      body: "",
    }
  } catch (error) {
    console.error("Form submission error:", error)
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Form submission failed" }),
    }
  }
}

export { handler }
