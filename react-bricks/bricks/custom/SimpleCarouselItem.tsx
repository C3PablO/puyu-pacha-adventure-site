import { Image, types } from 'react-bricks/rsc'

interface SimpleCarouselItemProps {
  image: types.IImageSource
}

const SimpleCarouselItem: types.Brick<SimpleCarouselItemProps> = ({ image }) => {
  return (
    <div className="w-full">
      <Image
        propName="image"
        source={image}
        alt="Carousel image"
        maxWidth={2000}
        imageClassName="w-full h-auto object-contain"
      />
    </div>
  )
}

SimpleCarouselItem.schema = {
  name: 'simple-carousel-item',
  label: 'Carousel Item',
  hideFromAddMenu: true,
  getDefaultProps: () => ({
    image: {
      src: '/puyupacha01.png',
      placeholderSrc: '/puyupacha01.png',
      srcSet: '',
      alt: 'Carousel image',
      seoName: 'carousel-image',
    },
  }),
}

export default SimpleCarouselItem
