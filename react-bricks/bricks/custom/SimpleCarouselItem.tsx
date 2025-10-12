import { Image, types } from 'react-bricks/rsc'
import { photos } from '../react-bricks-ui/shared/defaultImages'

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
        imageClassName="w-full h-auto object-contain rounded-lg"
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
      src: photos.SEASIDE.src,
      placeholderSrc: photos.SEASIDE.placeholderSrc,
      srcSet: '',
      alt: 'Carousel image',
      seoName: 'carousel-image',
    },
  }),
}

export default SimpleCarouselItem
