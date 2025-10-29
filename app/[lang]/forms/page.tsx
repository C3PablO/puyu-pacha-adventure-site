export default function FormsPage() {
  return (
    <div style={{ padding: '40px' }}>
      <h1>Contact Forms</h1>
      <p>This page is used by Netlify to detect forms at build time.</p>
      
      {/* Netlify will parse this form during build */}
      <form name="feedback" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="feedback" />
        <input type="hidden" name="bot-field" />
        <input type="text" name="firstname" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
        <input type="checkbox" name="privacy" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
