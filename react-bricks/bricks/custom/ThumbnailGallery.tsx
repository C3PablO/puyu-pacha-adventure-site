import React from 'react'
import { types, Repeater } from 'react-bricks/rsc'

import { ThumbnailProps } from './Thumbnail'

interface GalleryProps {
  thumbnails: types.RepeaterItems<ThumbnailProps>
}

const Gallery: types.Brick<GalleryProps> = ({ thumbnails }) => {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center">Gallery</h1>
      <div className="sm:grid grid-cols-3 gap-5">
        <Repeater propName="thumbnails" items={thumbnails} /> // [!code
        highlight]
      </div>
    </div>
  )
}

Gallery.schema = {
  name: 'gallery',
  label: 'Gallery',
  repeaterItems: [
    // [!code highlight:8]
    {
      name: 'thumbnails',
      itemType: 'thumbnail',
      itemLabel: 'Thumbnail',
      max: 3,
    },
  ],
}

export default Gallery
