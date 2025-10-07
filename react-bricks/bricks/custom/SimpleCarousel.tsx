import { types, wrapClientComponent } from 'react-bricks/rsc'
import { RegisterComponent } from 'react-bricks/rsc/client'
import SimpleCarouselClient, {
  SimpleCarouselProps,
} from './SimpleCarouselClient'
import { backgroundColorsEditProps } from '../react-bricks-ui/LayoutSideProps'
//=============================
// Brick Schema
//=============================
const schema: types.IBlockType<SimpleCarouselProps> = {
  name: 'simple-carousel',
  label: 'Simple Carousel',
  category: 'media',
  tags: ['carousel', 'slider', 'images', 'gallery'],
  previewImageUrl: `/bricks-preview-images/simple-carousel.png`,
  getDefaultProps: () => ({
    backgroundColor: { color: '#ffffff', className: 'bg-white' },
    autoplaySpeed: 3,
    images: [
      {
        image: {
          src: '/puyupacha01.png',
          placeholderSrc: '/puyupacha01.png',
          srcSet: '',
          alt: 'Carousel image 1',
          seoName: 'carousel-1',
        },
      },
      {
        image: {
          src: '/puyupacha01.png',
          placeholderSrc: '/puyupacha01.png',
          srcSet: '',
          alt: 'Carousel image 2',
          seoName: 'carousel-2',
        },
      },
    ],
  }),
  repeaterItems: [
    {
      name: 'images',
      itemType: 'simple-carousel-item',
      itemLabel: 'Image',
      min: 1,
      max: 20,
    },
  ],
  sideEditProps: [
    {
      groupName: 'Layout',
      defaultOpen: true,
      props: [
        {
          name: 'autoplaySpeed',
          label: 'Autoplay Speed',
          type: types.SideEditPropType.Select,
          selectOptions: {
            display: types.OptionsDisplay.Select,
            options: [
              { value: 2, label: '2 seconds' },
              { value: 3, label: '3 seconds' },
              { value: 4, label: '4 seconds' },
              { value: 5, label: '5 seconds' },
              { value: 6, label: '6 seconds' },
              { value: 8, label: '8 seconds' },
              { value: 10, label: '10 seconds' },
            ],
          },
        },
      ],
    },
    backgroundColorsEditProps,
  ],
}

export default wrapClientComponent({
  ClientComponent: SimpleCarouselClient,
  RegisterComponent,
  schema,
})
