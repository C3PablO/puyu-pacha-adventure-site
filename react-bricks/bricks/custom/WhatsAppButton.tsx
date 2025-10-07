import { types } from 'react-bricks/rsc'
import { FaWhatsapp } from 'react-icons/fa'

//=============================
// Local Types
//=============================
interface WhatsAppButtonProps {
  phoneNumber: string
  message: string
}

//=============================
// Component to be rendered
//=============================
const WhatsAppButton: types.Brick<WhatsAppButtonProps> = ({
  phoneNumber,
  message,
}) => {
  // Clean phone number - remove spaces, dashes, parentheses, and leading +
  const cleanPhone = phoneNumber.replace(/[\s\-\(\)\+]/g, '')

  // Encode message for URL
  const encodedMessage = encodeURIComponent(message || '')

  // Build WhatsApp URL
  const whatsappUrl = `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
      style={{
        backgroundColor: '#25D366',
      }}
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp className="text-white text-3xl" />
    </a>
  )
}

//=============================
// Brick Schema
//=============================
WhatsAppButton.schema = {
  name: 'whatsapp-button',
  label: 'WhatsApp Button',
  category: 'contact',
  tags: ['whatsapp', 'contact', 'floating', 'button'],
  previewImageUrl: `/bricks-preview-images/whatsapp-button.png`,
  getDefaultProps: () => ({
    phoneNumber: '+51 999 999 999',
    message: 'Hello! I would like more information.',
  }),
  sideEditProps: [
    {
      groupName: 'WhatsApp Settings',
      defaultOpen: true,
      props: [
        {
          name: 'phoneNumber',
          label: 'Phone Number',
          type: types.SideEditPropType.Text,
          validate: (value) => {
            if (!value || value.trim() === '') {
              return 'Phone number is required'
            }
            return true
          },
        },
        {
          name: 'message',
          label: 'Default Message (optional)',
          type: types.SideEditPropType.Textarea,
        },
      ],
    },
  ],
}

export default WhatsAppButton
