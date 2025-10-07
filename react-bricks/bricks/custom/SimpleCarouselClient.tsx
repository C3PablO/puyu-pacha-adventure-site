'use client'

import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { Repeater, types } from 'react-bricks/rsc'
import { FaPause, FaPlay } from 'react-icons/fa'
import Container from '../react-bricks-ui/shared/components/Container'
import CarouselStyles from '../react-bricks-ui/heroSections/ImageCarousel/CarouselStyles'

export interface SimpleCarouselProps {
  autoplaySpeed: number
  images: types.RepeaterItems,
  backgroundColor: types.IColor & { className: string }
}

const SimpleCarouselClient: React.FC<SimpleCarouselProps> = ({
  autoplaySpeed,
  images,
  backgroundColor,
}) => {
  const [isPlaying, setIsPlaying] = useState(true)
  const [sliderRef, setSliderRef] = useState<any>(null)
  const [hasMount, setHasMount] = useState(false)

  useEffect(() => {
    setHasMount(true)
  }, [])

  const togglePlayPause = () => {
    if (isPlaying) {
      sliderRef?.slickPause()
    } else {
      sliderRef?.slickPlay()
    }
    setIsPlaying(!isPlaying)
  }

  // @ts-ignore
  const SliderComponent = !!Slider.default ? Slider.default : Slider

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeed * 1000,
    arrows: true,
    fade: true,
    cssEase: 'ease-in-out',
  }

  const repeaterElement = Repeater({
    propName: 'images',
    items: images,
  })

  if (!hasMount) {
    return null
  }

  return (
    <div className={`${backgroundColor?.className}`}>
    <Container
    className={`relative lg:pt-16 pb-12 lg:pb-16`}
      >
      <CarouselStyles />
      {/* Custom Carousel Styles */}
      <style>{`
        .simple-carousel .slick-dots {
          bottom: 20px;
        }
        .simple-carousel .slick-dots li button:before {
          font-size: 12px;
          color: white;
          opacity: 0.5;
        }
        .simple-carousel .slick-dots li.slick-active button:before {
          opacity: 1;
          color: white;
        }
        .simple-carousel .slick-prev,
        .simple-carousel .slick-next {
          z-index: 10;
          width: 40px;
          height: 40px;
        }
        .simple-carousel .slick-prev {
          left: 20px;
        }
        .simple-carousel .slick-next {
          right: 20px;
        }
        .simple-carousel .slick-prev:before,
        .simple-carousel .slick-next:before {
          font-size: 40px;
          opacity: 0.75;
        }
        .simple-carousel .slick-prev:hover:before,
        .simple-carousel .slick-next:hover:before {
          opacity: 1;
        }
      `}</style>

      <div className="simple-carousel">
        <SliderComponent ref={setSliderRef} {...settings}>
          {/*@ts-ignore*/}
          {repeaterElement?.props?.children?.map((child: any, index: number) => {
            return (
              <div key={index} className="w-full">
                {child}
              </div>
            )
          })}
        </SliderComponent>
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={togglePlayPause}
        className="absolute top-20 right-8 z-20 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-3 rounded-full transition-all duration-300"
        aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
      >
        {isPlaying ? (
          <FaPause className="text-xl" />
        ) : (
          <FaPlay className="text-xl" />
        )}
      </button>
    </Container>
    </div>
  )
}

export default SimpleCarouselClient
