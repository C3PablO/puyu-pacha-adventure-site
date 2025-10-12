'use client'

import { useState, useEffect } from 'react'
import Slider from 'react-slick'
import { Repeater, types } from 'react-bricks/rsc'
import { FaPause, FaPlay } from 'react-icons/fa'
import { MdOutlineKeyboardArrowRight, MdOutlineKeyboardArrowLeft } from "react-icons/md";
import Container from '../react-bricks-ui/shared/components/Container'
import CarouselStyles from '../react-bricks-ui/heroSections/ImageCarousel/CarouselStyles'

export interface SimpleCarouselProps {
  autoplaySpeed: number
  images: types.RepeaterItems,
  backgroundColor: types.IColor & { className: string }
}

const PrevArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all duration-300 group hidden md:flex"
      aria-label="Previous slide"
    >
      <MdOutlineKeyboardArrowLeft className="text-4xl text-white" />
    </button>
  )
}

const NextArrow = (props: any) => {
  const { onClick } = props
  return (
    <button
      onClick={onClick}
      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full  bg-white/20 hover:bg-white/40 flex items-center justify-center transition-all duration-300 group hidden  md:flex"
      aria-label="Next slide"
    >
      <MdOutlineKeyboardArrowRight className="text-4xl text-white" />
    </button>
  )
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
    pauseOnHover: false,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
        {/* Play/Pause Button */}
        <div className="flex justify-end">
          <button
            onClick={togglePlayPause}
            className="z-20 text-current p-2 duration-300"
            aria-label={isPlaying ? 'Pause carousel' : 'Play carousel'}
          >
            {isPlaying ? (
              <FaPause className="text-sm" />
            ) : (
              <FaPlay className="text-sm" />
            )}
          </button>
        </div>
      <CarouselStyles />
      {/* Custom Carousel Styles */}
      <style>{`
        .simple-carousel .slick-dots {
          position: static;
        }
        .simple-carousel .slick-dots li {
          margin: 0 4px;
        }
        .simple-carousel .slick-dots li button {
          width: 12px;
          height: 12px;
          padding: 0;
        }
        .simple-carousel .slick-dots li button:before {
          content: '';
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.5);
          opacity: 1;
          transition: all 0.3s;
        }
        .simple-carousel .slick-dots li.slick-active button:before {
          background-color: rgba(0, 0, 0, 1);
          transform: scale(1.2);
        }
        .simple-carousel .slick-dots li button:hover:before {
          background-color: rgba(0, 0, 0, 0.75);
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
    </Container>
    </div>
  )
}

export default SimpleCarouselClient
