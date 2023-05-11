import React, { useState, useEffect } from 'react';
import { logo, search, microsoft, burger, docsSource, home, infoA, } from '../../utilities/PNG';
import { useNavigate } from 'react-router-dom';
import './index.css';

const Header1: React.FC = () => {
    return (
        <>
        {/*__Header__*/} 
        <div className='w-full z-10 fixed top-0 bg-white py-4 px-3'>
            <div className='mx-auto max-w-[1250px]'>
                <div className='flex justify-between h-[45px]'>

                    {/*____left____*/}
                    <div className='flex h-full'>
                        {/*<img src={ logo } className='w-[55px] rounded-md' alt="logo" />*/}

                        <div className='w-[55px] h-full rounded-md bg-[gold]'></div>
                        <div className='lg:w-96 max-w-96 h-full flex justify-between items-center ml-3 rounded-[20px] border-[3px] pl-3 pr-2 border-gray-300'>
                            <input type='text' placeholder='Search for your thesis' className='w-[87%] text-[15px] text-black outline-none'/>
                            <div className='bg-[#EDF0F5] rounded-[50%] p-1 cursor-pointer'>
                                <img src={search} alt="search" className='w-7 h-6' />
                            </div>
                        </div>
                        <div className='flex items-center'>
                            <div className='text-[17px] mx-[25px] font-inter font-bold text-[#291943] cursor-pointer'>Home</div>
                            <div className='text-[17px] mx-[25px] font-inter font-medium text-[#291943] cursor-pointer'>Resources</div>
                            <div className='text-[17px] mx-[25px] font-inter font-medium text-[#291943] cursor-pointer'>About</div>
                        </div>
                    </div>

                    {/*____right____*/}
                    <div className='flex items-center p-4 bg-[#2A2A2C] rounded-lg cursor-pointer'>
                        <img src={ microsoft } alt="microsoft" className='w-6 h-6 mr-3' />
                        <p className='font-inter font-normal text-white text-[15px]'>Sign in with Microsoft</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


const Header2: React.FC = () => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<boolean>(false);
    const [innerWidth, setInnerWidth] = useState<any>(0);

    const navigationFun = (str: string) => {
        navigate(`/${str}`);
        setMenu(false);
    }

    useEffect(() => {
        window.addEventListener('resize', () => {
            setInnerWidth(window.innerWidth);  
            if(window.innerWidth > 872) setMenu(false); 
        });
    }, []);

    return (
        <>
        {/*__Header__*/} 
        <div className='w-full fixed top-0 bg-[#2A2A2C] py-4 px-3 header'>
            <div className='mx-auto max-w-[1250px]'>
                <div className='flex justify-between lg:h-[45px] md:h-[45px] h-[35px]'>

                    {/*____left____*/}
                    <div className='flex h-full leftN'>
                        {/*<img src={ logo } className='lg:w-[55px] md:w-[55px] w-[45px] rounded-md' alt="logo" />*/}
                        
                        <div className='lg:w-[55px] md:w-[55px] w-[45px] h-full rounded-md bg-[gold]'></div>

                        <div className='lg:w-96 w-full h-full flex justify-between items-center ml-3 rounded-[20px] pl-3 pr-2 bg-white'>
                            <input type='text' placeholder='Search for your thesis' className='w-[87%] text-[15px] text-black outline-none'/>
                            <div className='bg-[#EDF0F5] rounded-[50%] p-1 cursor-pointer'>
                                <img src={search} alt="search" className='lg:w-7 md:w-7 w-5 lg:h-6 md:h-6 h-5' />
                            </div>
                        </div>
                        <div className='flex items-center navigation'>
                            <div className='text-[17px] mx-[25px] font-inter  text-white cursor-pointer'
                            onClick={ () => navigationFun('') }>Home</div>
                            <div className='text-[17px] mx-[25px] font-inter text-white cursor-pointer'
                            onClick={ () => navigationFun('resources') }>Resources</div>
                            <div className='text-[17px] mx-[25px] font-inter  text-white cursor-pointer' 
                            onClick={ () => navigationFun('about') }>About</div>
                        </div>
                    </div>

                    {/*____right____*/}
                    <div className='flex items-center p-4 bg-white rounded-lg cursor-pointer rightN'>
                        <img src={ microsoft } alt="microsoft" className='w-6 h-6 mr-3' />
                        <p className='font-inter font-normal text-[15px]'>Sign in with Microsoft</p>
                    </div>

                    {/*____Burger____*/}
                    <div className='h-full cursor-pointer burger' onClick={ () => setMenu(true) }>
                        <div className='h-full flex items-center'>
                            <img src={burger} alt="burger" className='w-[33px] h-[32px]'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/*____Burger div____*/}
        {
            (menu && innerWidth <= 872 ? 
            <div className='w-full h-[100vh] fixed top-0 bg-black bg-opacity-20 header'>
                <div className='w-[60%] h-full float-right bg-[#2A2A2C] menuBurger'>
                    <p className='text-right text-white text-[25px] font-bold my-5 px-4 cursor-pointer' onClick={ () => setMenu(false) }>X</p>
                    <div className='px-6'>
                        <p onClick={ () => navigationFun('') }
                        className='text-white text-[18px] flex items-center mb-7 cursor-pointer txtBurger'><img src={ home } alt="menu" className='w-6 h-6 mr-3'/> Home</p>
                        <p onClick={ () => navigationFun('resources') }
                        className='text-white text-[18px] flex items-center mb-7 cursor-pointer txtBurger'><img src={ docsSource } alt="menu" className='w-6 h-6 mr-3' /> Resources</p>
                        <p onClick={ () => navigationFun('about') }
                        className='text-white text-[18px] flex items-center mb-7 cursor-pointer txtBurger'><img src={ infoA } alt="menu" className='w-6 h-6 mr-3'/> About</p>
                        <p 
                        className='text-white text-[18px] flex items-center mb-7 cursor-pointer txtBurger'><img src={ microsoft  } alt="menu" className='w-6 h-6 mr-3' /> Sign in with microsoft</p>
                    </div>
                </div>
            </div>
            :
            <></>)
        }
        </>
    )
}

export { Header1, Header2 };