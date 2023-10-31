import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../../../App.css';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { example, gifLoading, imgFrontPDF, empty } from '../../../utilities/PNG';
import { GET_THREE_RESOURCE, GET_TOPOTHERS_RESOURCE } from '../../../Redux/Actions';
import { useNavigate, useOutletContext } from 'react-router-dom';


import DisableScrollPlugin from '../../../Components/DisableScrollPDF';
// Import the main component
import { Viewer, Worker } from '@react-pdf-viewer/core'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import Authentication from '../../../Components/Authentication';

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


//This is for Arrow carousel__________________________________________________________
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
                {
                  /*<div className='absolute w-full bottom-0 min-h-[100px] bg-[#1B1B1B] bg-opacity-50 p-6'>
                    <p className='text-white lg:text-[20px] md:text-[20px] text-[17px] lg:w-[70%] md:w-[70%] w-[100%] font-inter font-medium mb-3'>Proposed systemized web-based academic thesis paper directory for s...</p>
                    <button className='w-[159px] h-[41px] lg:text-[15px] md:text-[15px] text-[14px] flex items-center justify-center bg-[#FFF200] py-[11px] px-[20px] rounded-lg cursor-pointer'>Click to view</button>
                  </div>*/
                }
             </div>
            )
          }

      </Carousel>
    </>
  )
}


//This is for DOT carousel Overall Top Three Research__________________________________________________________
export const CarouselsDotTopThree: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { setAccessAlert } = useOutletContext<any>();
    const selectorTopThree = useSelector((state:any) => state.TopThreeeResearch);

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
    

   useEffect(() => {
    dispatch({ type: GET_THREE_RESOURCE });
   }, [])

   const clickDocu = async (_id: string) => {
    const auth = await Authentication();
    if(auth[0]){
      window.scrollTo(0, 0)
  
      setTimeout(() => {
        navigate(`/document/${_id}`);
      }, 500)
    }else{
      setAccessAlert('view');
    }
   }
  
    return (
        <>
          <div>
            {
              selectorTopThree.type === 'done' ?
              selectorTopThree.res.length > 0 ? 

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
                  selectorTopThree.res.map((a: any, i: number) => 
                    <div key={ Math.random() } className='p-3 flex h-[100%]'>
                      <div className='rounded-2xl overflow-hidden flex-1 shadow-lg'>
                        <div className='w-[100%] h-[200px] rounded-l-md bg-white overflow-hidden relative' >
                          { 
                            //<img src={ imgFrontPDF } alt="frontPage" className='w-full h-full absolute z-20' />
                          }
                          <div className='h-[300px]'>
                              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
                                <Viewer
                                    defaultScale={ 0.4 }
                                    fileUrl={ a.documentURI }
                                    plugins={[DisableScrollPlugin()]} 
                                />
                              </Worker>
                          </div>
                        </div>

                        <div className='p-4 bg-[#2A2A2C] h-[100%]'>
                          <p className='md:text-[16px] text-[15px] text-[#FFF200] font-inter font-medium mb-3 line-clamp-3'>{a.title}</p>
                          <p className='text-white text-[15px]'><span className='font-semibold'>Track:</span> {a.course}</p>
                          <p className='text-white text-[15px]'><span className='font-semibold'>Student Member:</span> {parseInt(a.member) > 10 ? a.member:`0${a.member}`}</p>
                  
                          <div className='flex justify-center mt-7 mb-3'>
                            <button onClick={() => clickDocu(selectorTopThree.res[i]._id)}
                            className='w-[60%] h-[41px] text-[15px] text-white bg-[#D85900] py-[11px] rounded-[20px] cursor-pointer'>Click to view</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }

              </Carousel>
              :
              <div className='mt-6'>
                <img src={ empty } className='mx-auto lg:h-[240px] h-[190px]' alt='empty' />
                <p className='text-center text-[16px] mt-3'>It seems the <span className='text-[#D85900] font-bold'>Overall Top Three Research</span> is empty.</p>
              </div>
              :
              <img src={ gifLoading } className='mx-auto max-h-[70px]' alt='gif' />
            }
          </div>


        </>
    )
}


//This is for DOT carousel Other selected research studies__________________________________________________________
export const CarouselsDotTopOther: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAccessAlert } = useOutletContext<any>();
  const selectorTopOther = useSelector((state: any) => state.TopOtherResearch);

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
  

 useEffect(() => {
  dispatch({ type: GET_TOPOTHERS_RESOURCE });
 }, [])

 const clickDocu = async (_id: string) => {
  const auth = await Authentication();
  if(auth[0]){
    window.scrollTo(0, 0)

    setTimeout(() => {
      navigate(`/document/${_id}`);
    }, 500)
  }else{
    setAccessAlert('view');
  }
 }

  return (
      <>
        
        <div>
          {
            selectorTopOther.type === 'done' ?
            selectorTopOther.res.length > 0 ? 

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
                selectorTopOther.res.map((a:any, i: number) => 
                  <div key={ Math.random() } className='p-3 flex h-[100%]'>
                    <div className='rounded-2xl overflow-hidden flex-1 shadow-lg'>
                      <div className='w-[100%] h-[200px] rounded-l-md bg-white overflow-hidden relative' >
                        { 
                          //<img src={ imgFrontPDF } alt="frontPage" className='w-full h-full absolute z-20' />
                        }
                        <div className='h-[300px]'>
                            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
                              <Viewer
                                  defaultScale={ 0.4 }
                                  fileUrl={ a.documentURI }
                                  plugins={[DisableScrollPlugin()]} 
                              />
                            </Worker>
                        </div>
                      </div>

                      <div className='p-4 bg-[#2A2A2C] h-[100%]'>
                        <p className='md:text-[16px] text-[15px] text-[#FFF200] font-inter font-medium mb-3 line-clamp-3'>{a.title}</p>
                        <p className='text-white text-[15px]'><span className='font-semibold'>Track:</span> {a.course}</p>
                        <p className='text-white text-[15px]'><span className='font-semibold'>Student Member:</span> {parseInt(a.member) > 10 ? a.member:`0${a.member}`}</p>
                
                        <div className='flex justify-center mt-7 mb-3'>
                          <button onClick={() => clickDocu(selectorTopOther.res[i]._id)}
                          className='w-[60%] h-[41px] text-[15px] text-white bg-[#D85900] py-[11px] rounded-[20px] cursor-pointer'>Click to view</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }

            </Carousel>
            :
            <div className='mt-6'>
              <img src={ empty } className='mx-auto lg:h-[240px] h-[190px]' alt='empty' />
              <p className='text-center text-[16px] mt-3'>It seems the <span className='text-[#D85900] font-bold'>Other selected research studies</span> is empty.</p>
            </div>
            :
            <img src={ gifLoading } className='mx-auto max-h-[70px]' alt='gif' />
          }
        </div>


      </>
  )
}
