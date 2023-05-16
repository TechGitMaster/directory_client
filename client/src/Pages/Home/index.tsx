import React from 'react';
import { book } from '../../utilities/PNG';
import '../../App.css';

import { CarouselsDot, CarouselArrow } from './Carousel';
import Footer from '../../Components/Footer';

const Home: React.FC = () => {
    return (
        <>
        <div>
        <div className='lg:h-[670px] md:h-[670px] h-[520px] lg:px-3 md:px-3 px-1 cssBG'>
            <div className='mx-auto max-w-[1250px] h-full flex items-center pt-10'>
                <div>
                    <h1 className='lg:w-[60%] md:w-[70%] w-[100%] font-medium lg:text-[60px] md:text-[60px] text-[40px] lg:text-left md:text-left text-center text-white lg:leading-[70px] md:leading-[70px] leading-[50px]'>Find a study that's suitable in your research</h1>
                    <div className='lg:block md:block flex justify-center'>
                        <p className='lg:w-[48%] md:w-[48%] w-[100%] font-inter font-light text-[17px] lg:text-left md:text-left text-center text-[#EFEFEF] mt-2 mb-6'>Students have unlimited access for research materials that’s free for students.</p>
                    </div>
                    <div className='lg:block md:block flex justify-center'>
                        <div className='w-[185px] flex items-center justify-center bg-[#FFF200] lg:py-[13px] md:py-[13px] py-[11px] lg:px-[20px] md:px-[20px] px-[16px] rounded-lg cursor-pointer'>
                            <p className='lg:text-[17px] md:text-[17px] text-[15px] font-medium'>Explore now</p>
                            <img src={ book } alt="book" className='w-7 h-7 ml-2' />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className='min-h-[300px] bg-white px-3'>
            <div className='mx-auto max-w-[1250px] py-[50px]'>
                <p className='text-center text-[#291943] lg:text-[40px] md:text-[40px] text-[30px] font-inter font-bold'>Year-top Studies</p>
                <p className='text-center lg:text-[20px] md:text-[20px] text-[17px] font-inter mt-[-5px]'>Our top research study documents</p>
                <div className='mt-10'>
                    <p className='text-black lg:text-[23px] md:text-[23px] text-[20px] font-semibold'>Top 3 research studies</p>
                    <div className='py-2 z-3'>
                        <CarouselArrow />
                    </div>
                </div>

                <div className='my-7'>
                    <p className='text-black lg:text-[23px] md:text-[23px] text-[20px] font-semibold'>Other selected research studies</p>
                    <div className='relative py-2'>
                        <CarouselsDot />
                    </div>
                </div>
            </div>
        </div>
        </div>
        
        <Footer />
        </>
    );
}

export default Home; 