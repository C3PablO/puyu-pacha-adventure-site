'use client'

import { useContext } from 'react'
// import { useSubmit } from '@formspree/react'

import { FormBuilderContext } from './FormBuilderProvider'

export interface FormBuilderClientProps {
  formspreeFormId: string
  successMessage: string
  children: any
}

const FormBuilderClient: React.FC<FormBuilderClientProps> = ({
  formspreeFormId,
  successMessage,
  children,
}) => {
  const { register, setError, handleSubmit, errors, isSubmitSuccessful } =
    useContext(FormBuilderContext)

  // const onSubmit = useSubmit(formspreeFormId, {
  //   onError(errs) {
  //     const formErrs = errs.getFormErrors()

  //     for (const { code, message } of formErrs) {
  //       setError &&
  //         setError(`root.${code}`, {
  //           type: code,
  //           message,
  //         })
  //     }

  //     const fieldErrs = errs.getAllFieldErrors()
  //     for (const [field, errs] of fieldErrs) {
  //       setError &&
  //         setError(field, {
  //           message: errs.map((e) => e.message).join(', '),
  //         })
  //     }
  //   },
  // })

  // const onSubmit = () => console.log('SUBMITTED - ', formspreeFormId)

  const handleFormSubmit = async (data: Record<string, any>) => {
    try {
      const formData = new FormData()

      // Add form name for Netlify
      formData.append('form-name', 'contact')

      // Convert data object to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, String(value))
        }
      })

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      })

      if (!response.ok) {
        throw new Error(`Form submission failed with status ${response.status}`)
      }

      alert(successMessage || 'Form submitted successfully!')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      alert(`Form submission failed: ${errorMessage}`)
      console.error('Form submission error:', error)
    }
  }

  if (!register || !handleSubmit) {
    return null
  }

  return (
    <>
      {isSubmitSuccessful ? (
        <h2 className="mt-6 text-xl leading-7 font-bold text-lime-600">
          {successMessage}
        </h2>
      ) : (
        <form
          name="feedback"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid grid-cols-2 gap-4 p-6"
        >
          <input type="hidden" name="form-name" value="feedback" />
          {children}

          {errors && errors.root && (
            <div className="block">
              <ul className="error">
                {Object.values(errors.root).map((err) => {
                  if (typeof err !== 'object') {
                    return (
                      <li
                        key={err}
                        className="block mt-1 text-sm text-red-500 font-bold"
                      >
                        {err}
                      </li>
                    )
                  }
                  const { type, message } = err
                  return (
                    <li
                      key={type}
                      className="block mt-1 text-sm text-red-500 font-bold"
                    >
                      {message}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </form>
      )}
    </>
  )
}

export default FormBuilderClient
