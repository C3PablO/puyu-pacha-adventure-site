export default function ThankYouPage() {
  return (
    <div style={{ 
      maxWidth: '600px', 
      margin: '100px auto', 
      padding: '40px',
      textAlign: 'center' 
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px', color: '#10b981' }}>
        Thank You!
      </h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Your message has been received. We'll get back to you soon!
      </p>
      <a 
        href="/" 
        style={{ 
          color: '#0ea5e9',
          textDecoration: 'underline'
        }}
      >
        Return to Home
      </a>
    </div>
  )
}
