import React from 'react';
import { google } from '../../utilities/PNG';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const navigationFun = (str: string) => {
        navigate(`/${str}`);
    }

    return (
        <>  
        {/*__Footer__*/}
        <div className='bg-[#EFEFEF] pt-10'>
            <div className='flex justify-center'>
                <div className='flex items-center p-4 bg-[#2A2A2C] rounded-lg'>
                    <img src={ google } alt="google" className='w-5 h-5 mr-3' />
                    <p className='font-inter text-white font-normal text-[15px]'>Powered by google</p>
                </div>
            </div>

            <div className='flex flex-wrap justify-center mt-5 pb-7'>
                <p className='font-inter font-medium mr-5 cursor-pointer lg:text-[17px] md:text-[17px] text-[15px]'
                onClick={ () => navigationFun('') }>Home</p>
                <p className='font-inter font-medium mr-5 cursor-pointer lg:text-[17px] md:text-[17px] text-[15px]'
                onClick={ () => navigationFun('resources') }>Resources</p>
                <p className='font-inter font-medium cursor-pointer lg:text-[17px] md:text-[17px] text-[15px]'
                onClick={ () => navigationFun('about') }>About</p>
            </div>

            <div className='bg-[#ADD8E6] p-2'>
                <div className='mx-auto max-w-[1250px] flex justify-between items-center'>
                    <p className='lg:text-[14px] md:text-[14px] text-[12px] text-[#1A2B3C]'>© 2023-2024  All rights reserved.</p>
                    <p className='lg:text-[14px] md:text-[14px] text-[12px] text-[#1A2B3C]'>Village Montessori School and Colleges.</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Footer;