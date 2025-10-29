/**
 * Hidden form for Netlify bot detection
 * This static HTML form allows Netlify to detect and configure the form at build time
 */
export default function NetlifyFormDetector() {
  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      hidden
      aria-hidden="true"
    >
      <input type="hidden" name="form-name" value="contact" />
      <input type="text" name="firstname" />
      <input type="text" name="lastname" />
      <input type="email" name="email" />
      <textarea name="message"></textarea>
      <input type="checkbox" name="privacy" />
    </form>
  )
}
