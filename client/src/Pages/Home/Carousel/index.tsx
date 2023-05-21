import React from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { example } from '../../../utilities/PNG';
import '../../../App.css';



const responsiveArrow = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,

  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,

  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  
  }
};

const responsiveDot = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1223, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  }
};



export const CarouselArrow: React.FC = () => {
  return (
    <>
      <Carousel
        responsive={responsiveArrow} 
      >
        {
            '.'.repeat(4).split('').map(a => 
              <div key={Math.random()} className='relative rounded-2xl overflow-hidden'>
                <img src={ example } alt="topThesis" className='w-full lg:h-[530px] md:h-[530px] h-[430px] object-cover'/>
                <div className='absolute w-full bottom-0 min-h-[100px] bg-[#1B1B1B] bg-opacity-50 p-6'>
                  <p className='text-white lg:text-[20px] md:text-[20px] text-[17px] lg:w-[70%] md:w-[70%] w-[100%] font-inter font-medium mb-3'>Proposed systemized web-based academic thesis paper directory for s...</p>
                  <button className='w-[159px] h-[41px] lg:text-[15px] md:text-[15px] text-[14px] flex items-center justify-center bg-[#FFF200] py-[11px] px-[20px] rounded-lg cursor-pointer'>Click to view</button>
                </div>
             </div>
            )
          }

      </Carousel>
    </>
  )
}

export const CarouselsDot: React.FC = () => {

    const CustomDot = ({ onClick, active }:any) => (
      <button
        style={{
          backgroundColor: active ? '#000' : '#E1E1E1',
          border: 'none',
          borderRadius: '50%',
          padding: '7px',
          width: 10,
          height: 10,
          margin: 5,
          cursor: 'pointer',
          position: 'relative',
          top: '30px'
        }}
        onClick={() => onClick()}
      />
    );
    

    return (
        <>
        <Carousel 
            responsive={responsiveDot} 
            arrows={false}
            autoPlaySpeed={1000}
            itemClass=""
            renderDotsOutside={true}
            showDots={true}
            swipeable={true}
            customDot={<CustomDot />}>       
          {
            '.'.repeat(4).split('').map(a => 
              <div className='p-3'>
                <div key={Math.random()} className='rounded-2xl overflow-hidden shadow-lg'>
                  <img src={ example } alt="topThesis" className='w-full h-[200px] object-cover'/>
                  <div className='p-4'>
                    <p className='lg:text-[18px] md:text-[18px] text-[16px] font-inter font-medium mb-3'>Proposed systemized web-based academic thesis paper directory for s...</p>
                    <p><span className='font-semibold'>Course:</span> BSIT</p>
                    <p><span className='font-semibold'>Student Member:</span> 04</p>

                    <div className='flex justify-center mt-7 mb-3'>
                      <button className='w-[60%] h-[41px] text-[15px] text-white bg-[#D85900] py-[11px] rounded-[20px] cursor-pointer'>Click to view</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }

        </Carousel>
        </>
    )
}