'use client'

export default function TestForm() {
  return (
    <div style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Simple Test Form</h1>
      <p>This is a simple test to verify Netlify forms work</p>
      
      <form
        name="simple-test"
        method="POST"
        data-netlify="true"
        action="/success"
      >
        <input type="hidden" name="form-name" value="simple-test" />
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Name:
            <input
              type="text"
              name="name"
              required
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                marginTop: '5px',
              }}
            />
          </label>
        </div>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email:
            <input
              type="email"
              name="email"
              required
              style={{
                display: 'block',
                width: '100%',
                padding: '8px',
                marginTop: '5px',
              }}
            />
          </label>
        </div>
        
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Submit Test
        </button>
      </form>
    </div>
  )
}
