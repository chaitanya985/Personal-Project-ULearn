'use client'
import React, { useState } from 'react'
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs'


interface CarouselProps{
    images: string[];
}



export default function SliderMain({images}: CarouselProps) {
    const [current, setCurrent] = useState(0)
    const currentImage = images[current]

    const prevImage = () => {
        const isFirstImage = current === 0;
        const newIndex = isFirstImage ? images.length - 1 : current - 1;
        setCurrent(newIndex);
    }

    const nextImage = () => {
        const isLastImage = current === images.length - 1;
        const newIndex = isLastImage ? 0 : current + 1;
        setCurrent(newIndex);
    }

  return (
    <div className='relative pb-16'>
        <div>
            <button onClick={prevImage} className='absolute left-0 top-1/2 -translate-y-1/2'>
                <BsArrowLeft/>
            </button>
            <img src={currentImage} alt={`Image ${current+1}`} className='h-[500px] object-cover w-full'/>
            {current == 1 && (
                <div className='absolute top-[25%] left-[7%] bg-white p-6 max-w-[400px] hover:bg-gray-500 hover:text-white transition-all duration-300'>
                    <h1 className='my-4 text-xl font-bold'>Your Learning Partner</h1>
                    <h4 className='text-xl'>Learn what you want, when you want, where you want</h4>
                </div>
            )}

            {current == 0 && (
                <div className='absolute top-[25%] left-[8%] bg-white p-6 max-w-[400px] hover:bg-gray-500 hover:text-white transition-all duration-300'>
                    <h1 className='my-4 text-xl font-bold'>Your Learning Partner</h1>
                    <h4 className='text-xl'>Learn what you want, when you want, where you want</h4>
                </div>
            )}
            <button onClick={nextImage} className='absolute right-0 top-1/2 -translate-y-1/2'>
                <BsArrowRight/>
            </button>
        </div>
    </div>
  )
}