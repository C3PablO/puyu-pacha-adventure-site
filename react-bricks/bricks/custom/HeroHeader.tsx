import { Repeater, RichText, Text, Image, types } from 'react-bricks/rsc'
import blockNames from '../react-bricks-ui/blockNames'

//=============================
// Local Types
//=============================
interface HeroHeaderProps {
  backgroundImage: types.IImageSource
  h1Part1: types.TextValue
  h1Part2: types.TextValue
  h2: types.TextValue
  badge: types.RepeaterItems
  buttons: types.RepeaterItems
}

//=============================
// Component to be rendered
//=============================
const HeroHeader: types.Brick<HeroHeaderProps> = ({
  backgroundImage,
  h1Part1,
  h1Part2,
  h2,
  badge,
  buttons,
}) => {
  // Get the image URL from the backgroundImage source
  const bgImageUrl = backgroundImage?.src || backgroundImage?.fallbackSrc || ''

  return (
    <header
      className="hero-header w-full h-screen relative flex flex-col items-center justify-start dark pt-16"
      style={{
        backgroundColor: '#041B3B',
        colorScheme: 'dark',
        backgroundImage: bgImageUrl
          ? `linear-gradient(180deg, #060E1A 0%, #060E1A 20%, rgba(0, 0, 0, 0) 60%), url(${bgImageUrl})`
          : 'linear-gradient(180deg, #060E1A 0%, #060E1A 20%, rgba(0, 0, 0, 0) 60%)',
        backgroundPosition: 'top center, bottom center',
        backgroundRepeat: 'no-repeat, no-repeat', 
        backgroundSize: 'cover, 100% auto',
      }}
    >
      {/* Hidden Image component for admin editing */}
      <div style={{ position: 'absolute', width: 100, height: 100, top: 0, left: 0}}>
        <Image
          propName="backgroundImage"
          source={backgroundImage}
          alt="Background"
          maxWidth={2500}
        />
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 pt-8 flex flex-col items-center">
        <h1 className="text-white text-center p-8">
          <Text
            propName="h1Part1"
            value={h1Part1}
            renderBlock={(props) => (
              <span
                className="line1 block font-bold whitespace-nowrap"
                style={{
                  fontSize: 'clamp(3rem, 10vw, 8rem)',
                  lineHeight: '1',
                }}
              >
                {props.children}
              </span>
            )}
            placeholder="Type first part..."
          />
          <Text
            propName="h1Part2"
            value={h1Part2}
            renderBlock={(props) => (
              <span
                className="line2 block whitespace-nowrap"
                style={{
                  fontSize: 'clamp(1.2rem, 4vw, 3rem)',
                }}
              >
                {props.children}
              </span>
            )}
            placeholder="Type second part..."
          />
        </h1>

        <RichText
          propName="h2"
          value={h2}
          renderBlock={(props) => (
            <p className="text-2xl text-white text-center mb-8">
              {props.children}
            </p>
          )}
          placeholder="Type your subheading..."
          allowedFeatures={[
            types.RichTextFeatures.Bold,
            types.RichTextFeatures.Italic,
          ]}
        />

        <Repeater
          propName="buttons"
          items={buttons}
          renderWrapper={(items) => (
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              {items}
            </div>
          )}
        />
      </div>
    </header>
  )
}

//=============================
// Brick Schema
//=============================
HeroHeader.schema = {
  name: 'hero-header',
  label: 'Hero Header',
  category: 'hero sections',
  tags: ['hero', 'header', 'badge', 'buttons'],
  previewImageUrl: `/bricks-preview-images/hero-header.png`,
  getDefaultProps: () => ({
    backgroundImage: {
      src: '/puyupacha01.png',
      placeholderSrc: '/puyupacha01.png',
      srcSet: '',
      alt: 'Puyu Pacha background',
      seoName: 'puyupacha-background',
    },
    h1Part1: 'PUYU PACHA',
    h1Part2: 'Jungle & Mountain Adventures',
    h2: 'Discover the magic of Peru',
    badge: [
      {
        text: 'NEW',
        badgeColor: {
          color: '#0ea5e9',
          className: 'text-sky-500 dark:text-sky-400',
        },
        textAlign: 'center',
      },
    ],
    buttons: [
      {
        type: 'link',
        text: 'Get Started',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        buttonColor: {
          color: '#0ea5e9',
          classNameSolid: 'bg-sky-500 text-white hover:bg-sky-600',
          classNameOutline:
            'border border-sky-600 text-sky-600 dark:border-white dark:text-white',
        },
        variant: 'solid',
        padding: 'normal',
        simpleAnchorLink: false,
      },
      {
        type: 'link',
        text: 'Learn More',
        href: '',
        isTargetBlank: false,
        buttonType: 'submit',
        buttonColor: {
          color: '#0ea5e9',
          classNameSolid: 'bg-sky-500 text-white hover:bg-sky-600',
          classNameOutline:
            'border border-sky-600 text-sky-600 dark:border-white dark:text-white',
        },
        variant: 'outline',
        padding: 'normal',
        simpleAnchorLink: false,
      },
    ],
  }),
  repeaterItems: [
    {
      name: 'badge',
      itemType: blockNames.Badge,
      itemLabel: 'Badge',
      min: 0,
      max: 1,
    },
    {
      name: 'buttons',
      itemType: blockNames.Button,
      itemLabel: 'Button',
      min: 0,
      max: 2,
    },
  ],
  sideEditProps: [],
}

export default HeroHeader
