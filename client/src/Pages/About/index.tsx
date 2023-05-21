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
                            <p className='text-[15px] text-[#291943] font-medium text-center mt-4 pC pCI'>Our website is only accepting microsoft accounts for the students of this school.</p>
                        </div>
                    </div>        
                </div>
            </div>
            
            <div className='bg-[#D85900] px-3 py-9'>
                <div className='mx-auto max-w-[1250px] flex omD'>
                    <div className='w-[50%] py-3 womD'>
                        <p className='font-semibold lg:text-[28px] md:text-[28px] text-[23px] text-white mb-5'>Meet the team of the operation:</p>
                        <p className='text-white text-[17px] infoomD'>The aim of our school is to design and develop a website to post the best research, and for all the students who wants to search for the best research that been made by our past researchers in Village Montessori School and Colleges. Included scopes:</p>
                        <div className='m-5'>
                            <li className='text-white text-[17px] mb-4 infoomD'>To design and develop a module that will help the users to discover a specific research they want to know.</li>
                            <li className='text-white text-[17px] mb-4 infoomD'>To design and develop a module that will help the users to post and to express their emotions on those past researcher in the feedback feature of the website.</li>
                            <li className='text-white text-[17px] mb-4 infoomD'>To design and develop a module that will enable the agency manage a website that can help Academic research directory owner gain opportunities to become known.</li>
                        </div>
                    </div>
                    <div className='w-[50%] womD'>

                        <div className='block disPlayP'>
                            <div className='flex justify-center items-center'>
                                <div>
                                    <img src={ member1 } alt="members" className='rounded-lg h-[266px] object-cover'/>
                                </div>
                                <div className='mx-4'>
                                    <img src={ member2 } alt="members" className='rounded-lg mb-4 h-[199px] object-cover'/>
                                    <img src={ member3 } alt="members" className='rounded-lg h-[199px] object-cover'/>
                                </div>
                                <div>
                                    <img src={ member4 } alt="members" className='rounded-lg h-[266px] object-cover'/>
                                </div>
                            </div>
                        </div>

                        <div className='hidden disPlayP2'>
                            <div className='w-[100%] grid gap-2 sm:grid-cols-4 grid-cols-2 items-center'>
                                <img src={ member1 } alt="members" className='w-full max-h-[200px] object-cover rounded-lg'/>
                                <img src={ member2 } alt="members" className='w-full max-h-[200px] object-cover rounded-lg'/>
                                <img src={ member3 } alt="members" className='w-full max-h-[200px] object-cover rounded-lg'/>
                                <img src={ member4 } alt="members" className='w-full max-h-[200px] object-cover rounded-lg'/>
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

