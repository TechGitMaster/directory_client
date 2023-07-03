import React, { useState, useEffect } from 'react';
import Footer from '../../Components/Footer';
import ResourceOther from '../../Components/ResourceOther';
import { checkMark, goldStar, whiteStar, gifLoading, empty } from '../../utilities/PNG';
import { Rating } from 'react-simple-star-rating';
import { useParams, useOutletContext } from 'react-router-dom';
import axios from 'axios';


import { Viewer, Worker, PdfJs } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

const DocResource = () => {
    const { id } = useParams();
    const { setSearch } = useOutletContext<any>();

    const [dataFetch, setDataFetch] = useState('fetching');
    const [yearTop, setYearTop] = useState('new');
    const [data, setData] = useState<any>([]);

    //Toolbar_____________________________________________
    const toolbarPluginInstance = toolbarPlugin();
    const { renderDefaultToolbar, Toolbar } = toolbarPluginInstance;
    const transform = (slot:any) => ({
        ...slot,
        // These slots will be empty________
        SwitchTheme: () => <></>,
        Open: () => <></>,
        Print: () => <></>,
        Download: () => <></>,
    });


    //Get data_______________________________________
    useEffect(() => {
        setDataFetch('fetching');

        let funcD = async () => {

          try{

              let obj = {
                  method: 'POST',
                  url: 'https://directory-client-server.vercel.app/getSelected',
                  params: {/* This is for GET method */},
                  data: { id: id },
                  headers: {
                      'Content-type': 'application/json'
                  }
              }

              let { data } = await axios(obj)

              if(data.success){
                setDataFetch(data.data.length > 0 ? 'done':'error');
                setData(data.data);
                setYearTop(data.data.length > 0 ? data.data[0].selectedTop:'new');
              }else{
                setDataFetch('error');
              }
          }catch(e){
            setDataFetch('error');
            console.log(e);
          }

        }

        funcD();

    }, [id])



    //Rating button______________________________________________________________
    const handleRating = (rate: number) => {
        //alert(rate);
    }

    return (
        <>
            <div onClick={() => setSearch(false)}>
                {/*____Document and Rate Page____*/}
                <div className='relative'>
                    <div className='bg-[#3E3D43] py-[120px]'></div>
                    <div className='bg-[#D85900] py-5 px-3'>
                        <div className='mx-auto max-w-[1250px] md:-mt-[150px] -mt-[170px] md:flex justify-between'>

                            {/*____Ratings_____*/}
                            <div className='md:w-[27%] w-[100%]'>

                                {
                                    yearTop !== 'new' ?
                                    yearTop === 'top3' ?
                                    <div className='flex justify-center items-center bg-[#FCF3D7] p-4 rounded-lg mb-2 shadow-lg'>
                                        <p className='text-[#FF7A00] font-semibold sm:text-[15px] text-[14px]'>Selected overall year top research</p>
                                        <img src={ checkMark } alt="checkMark" className='h-[18px] ml-2' />
                                    </div>
                                    :
                                    <div className='flex justify-center items-center bg-[#E2E9F3] p-4 rounded-lg mb-2 shadow-lg'>
                                        <p className='text-[#0632E5] mt-1 font-semibold sm:text-[15px] text-[14px]'>Selected research study</p>
                                        <img src={ checkMark } alt="checkMark" className='h-[18px] ml-2 mt-1' />
                                    </div>
                                    :
                                    ''
                                }

                                {/*___Count of rating and board rating__*/}
                                <div className='rounded-lg bg-white p-4 mb-2 shadow-lg'>
                                    {
                                        dataFetch === 'done' ?
                                        <div>
                                            <p className='sm:text-[18px] text-[17px] text-[#29292d] font-semibold'>Ratings of Viewer</p>
                                            <p className='sm:text-[25px] text-[22px] text-[#29292d] font-semibold mt-2'>4.8/5</p>
                                            <div className='flex mb-2'>
                                                <img src={ goldStar } alt="star" className='h-[20px]' />
                                                <img src={ goldStar } alt="star" className='h-[20px]' />
                                                <img src={ goldStar } alt="star" className='h-[20px]' />
                                                <img src={ goldStar } alt="star" className='h-[20px]' />
                                                <img src={ whiteStar } alt="star" className='h-[20px]' />
                                            </div>
                                            <p className='text-[#565454] sm:text-[15px] text-[14px] mb-4'>415 reviews</p>

                                            {/*____Board Rating___*/}
                                            <p className='sm:text-[16px] text-[14px] font-semibold mb-2'>Board Rating</p>

                                            {
                                                '.'.repeat(5).split('').map((a, i) => 
                                                <div key={ Math.random() } className='my-2 text-[14px] text-[#565454]'>
                                                    <div className='flex justify-between w-[98%] mx-auto'>
                                                        <p>{ Math.floor(5-i) } star</p>
                                                        <p>70%</p>
                                                    </div>
                                            
                                                    <div className='h-[14px] overflow-hidden rounded-[20px] bg-[#E4E3DB] w-full'>
                                                        <div className='w-[50%] h-[14px] rounded-[20px] bg-[#FACA51]'></div>
                                                    </div>
                                                </div>
                                                )
                                            }
                                        </div>
                                        :
                                        dataFetch === 'error' ?
                                        <div>
                                            <img src={ empty } alt="loading" className='mx-auto max-h-[200px]' />
                                            <p className='text-center font-bold text-[17px] mt-4'>Can't find Documents</p>
                                            <div className='flex justify-center'>
                                                <p className='lg:w-[80%] md:w-[80%] w-[100%] text-center text-[13px]'>If you see this maybe the resources you want to find is not exist.</p>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <img src={ gifLoading } alt="loading" className='mx-auto h-[50px]' />
                                        </div>
                                    }
                                </div>

                                {/*___Give it a rate?___*/}
                                {
                                    dataFetch === 'done' ?
                                    <div className='rounded-lg p-4 bg-white mb-2'>
                                        <p className='sm:text-[18px] text-[17px] text-[#29292d] font-semibold'>Give it a rate?</p>

                                        <Rating
                                            onClick={handleRating}
                                            SVGstyle={ { 'display':'inline' } }
                                            size={24}
                                            showTooltip={ true }
                                            tooltipDefaultText={ 'Your rate' }
                                            tooltipStyle={{ 'fontSize': '13px' }}
                                            tooltipArray={ ['01 star', '02 star', '03 star', '04 star', '05 star'] }
                                         />
                                    </div>
                                    :
                                    ''
                                }
                            </div>



                            {/*____Document_____*/}
                            <div className='md:w-[72%] w-[100%] bg-white md:p-8 p-5 rounded-lg shadow-lg overflow-hidden'>
                                {
                                    dataFetch === 'done' ?
                                    <div>
                                        <p className='sm:text-[21px] text-[19px] text-[#29292d] font-semibold'>Document</p>
                                        <p className='sm:text-[16px] text-[14px] mt-4 mb-3'>{data[0].title}</p>
                                        <p className='sm:text-[15px] text-[14px] mb-4'>
                                            <p><span className='font-bold'>• Number of pax: </span>{data[0].member.padStart(2, '0')}</p>
                                            <p><span className='font-bold'>• Tract: </span>{data[0].course}</p>
                                            <p><span className='font-bold'>• Year: </span>{data[0].year}</p>
                                        </p>  

                                        <div className='h-[700px] pb-8'>
                                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
                                              <div style={{ background: '#EFEFEF' }}>
                                                <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>
                                              </div>

                                              <Viewer 
                                                  enableSmoothScroll={true} 
                                                  fileUrl={data[0].documentURI}
                                                  plugins={[toolbarPluginInstance]} 
                                              />
                                            </Worker>
                                        </div>
                                    </div>
                                    :
                                    dataFetch === 'error' ?
                                    <div>
                                        <img src={ empty } alt="loading" className='mx-auto max-h-[200px]' />
                                        <p className='text-center font-bold text-[17px] mt-4'>Can't find Documents</p>
                                        <div className='flex justify-center'>
                                            <p className='lg:w-[80%] md:w-[80%] w-[100%] text-center text-[13px]'>If you see this maybe the resources you want to find is not exist.</p>
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <img src={ gifLoading } alt="loading" className='mx-auto h-[75px]' />
                                    </div>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>    
                
                <ResourceOther />
                <Footer />
            </div>
        </>
    )
}

export default DocResource;