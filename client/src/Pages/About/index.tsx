import React from 'react';
import { bookB, keyB, microB } from '../../utilities/PNG';
import Footer from '../../Components/Footer';
import { member1, member2, member3, member4 } from '../../utilities/PNG';
import './index.css';

const About: React.FC = () => {
    return (
        <>
            
            <div className='mx-auto max-w-[1250px] lg:pt-[115px] md:pt-[115px] pt-[100px] pb-5 px-3 mb-8 howiT'>
                <p className='lg:text-[28px] md:text-[28px] text-[23px] text-[#291943] font-inter font-semibold mb-7'>See how it works:</p>
                <div className='flex justify-center divH'>
                    <div className='w-[33%] m-4 listOH'>
                        <img src={ bookB } alt="about" className='mx-auto h-[55px] imgG' />
                        <div className='pCIT'>
                            <p className='text-[16px] text-[#291943] font-semibold text-center mt-7 pC pCT'>Find documents easily.</p>
                            <p className='text-[15px] text-[#291943] font-medium text-center mt-4 pC pCI'>Find the desire documents easily by just using our search bar engine.</p>
                        </div>
                    </div>  

                    <div className='w-[33%] m-4 listOH'>
                        <img src={ keyB } alt="about" className='mx-auto h-[55px] imgG' />
                        <div className='pCIT'>
                            <p className='text-[16px] text-[#291943] font-semibold text-center mt-7 pC pCT'>Unlimited Access.</p>
                            <p className='text-[15px] text-[#291943] font-medium text-center mt-4 pC pCI'>Unlimited access for all the documents once you sign in using Microsoft account in our website.</p>
                        </div>
                    </div>  

                    <div className='w-[33%] m-4 listOH'>
                        <img src={ microB } alt="about" className='mx-auto h-[55px] imgG' />
                        <div className='pCIT'>
                            <p className='text-[16px] text-[#291943] font-semibold text-center mt-7 pC pCT'>Sign in with Microsoft.</p>
                            <p className='text-[15px] text-[#291943] font-medium text-center mt-4 pC pCI'>Our website is only accepting Microsoft accounts for the student of STI.</p>
                        </div>
                    </div>        
                </div>
            </div>
            
            <div className='bg-[#1790e0] px-3 py-9'>
                <div className='mx-auto max-w-[1250px] flex omD'>
                    <div className='w-[50%] py-3 womD'>
                        <p className='font-semibold lg:text-[28px] md:text-[28px] text-[23px] text-white mb-5'>Meet the team of the operation:</p>
                        <p className='text-white text-[17px] infoomD'>Every answer comes from a verified expert, specifically trained in your area of study. And each one of our 2,600+ tutors undergoes an in-depth onboarding process, including:</p>
                        <div className='m-5'>
                            <li className='text-white text-[17px] mb-4 infoomD'>A subject-specific application to evaluate their expertise.</li>
                            <li className='text-white text-[17px] mb-4 infoomD'>An official credential check to confirm their background.</li>
                            <li className='text-white text-[17px] mb-4 infoomD'>Student-driven feedback to ensure clear, thorough content.</li>
                        </div>
                    </div>
                    <div className='w-[50%] womD'>

                        <div className='block disPlayP'>
                            <div className='flex justify-center items-center'>
                                <div>
                                    <img src={ member1 } alt="members" className='rounded-lg'/>
                                </div>
                                <div className='mx-4'>
                                    <img src={ member2 } alt="members" className='rounded-lg mb-4'/>
                                    <img src={ member3 } alt="members" className='rounded-lg'/>
                                </div>
                                <div>
                                    <img src={ member4 } alt="members" className='rounded-lg'/>
                                </div>
                            </div>
                        </div>

                        <div className='hidden disPlayP2'>
                            <div className='w-[100%] flex flex-wrap justify-center'>
                            <img src={ member1 } alt="members" className='w-[175px] rounded-lg mt-3 mgF'/>
                            <img src={ member2 } alt="members" className='w-[175px] rounded-lg ml-3 mt-3 mgF'/>
                            <img src={ member3 } alt="members" className='w-[175px] rounded-lg ml-3 mt-3 mgF'/>
                            <img src={ member4 } alt="members" className='w-[175px] rounded-lg mx-3 mt-3 mgF'/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default About;

