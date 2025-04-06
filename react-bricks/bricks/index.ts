import { types } from 'react-bricks/rsc'

import HeroUnit from './custom/MyHeroUnit'
import Pokemon from './custom/Pokemon'
import reactBricksUITheme from './react-bricks-ui'
import Thumbnail from './custom/Thumbnail' // [!code highlight]

const bricks: types.Theme[] = [
  reactBricksUITheme, // React Bricks UI
  {
    themeName: 'Default',
    categories: [
      {
        categoryName: 'Custom bricks',
        bricks: [HeroUnit, Pokemon, Thumbnail], // [!code highlight]
      },
    ],
  },
]

export default bricks
