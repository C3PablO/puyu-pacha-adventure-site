import { types } from 'react-bricks/rsc'

import HeroUnit from './custom/MyHeroUnit'
import Pokemon from './custom/Pokemon'
import reactBricksUITheme from './react-bricks-ui'
import Thumbnail from './custom/Thumbnail' // [!code highlight]
import HeroHeader from './custom/HeroHeader'
import WhatsAppButton from './custom/WhatsAppButton'
import SimpleCarousel from './custom/SimpleCarousel'
import SimpleCarouselItem from './custom/SimpleCarouselItem'
import AnchorPoint from './custom/AnchorPoint'

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Default',
    categories: [
      {
        categoryName: 'Custom bricks',
        bricks: [
          HeroUnit,
          Pokemon,
          Thumbnail,
          HeroHeader,
          WhatsAppButton,
          SimpleCarousel,
          SimpleCarouselItem,
          AnchorPoint,
        ], // [!code highlight]
      },
    ],
  },
]

export default bricks
