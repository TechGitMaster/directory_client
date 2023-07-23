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
import Authentication from '../../Components/Authentication';

const DocResource = () => {
    const { id } = useParams();
    const { setSearch, setAccessAlert } = useOutletContext<any>();

    const [dataFetch, setDataFetch] = useState('fetching');
    const [yearTop, setYearTop] = useState('new');
    const [data, setData] = useState<any>([]);
    const [rate, setRate] = useState<Array<any>>([ false, 0 ]);
    const [rateCalculated, setRateCalculated] = useState<number>(0);

    const [disableBttn, setDisableBttn] = useState<boolean>(false);

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
        setYearTop('new');

        const fetch = async () => {
            const auth = await Authentication() as any;
            if(auth[0]){
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
                        } as any
          
                        let { data } = await axios(obj)
          
                        if(data.success){
                            
                            obj.method = "GET";
                            obj.url = "https://directory-client-server.vercel.app/getRateDocument";
                            obj.params = { email: auth[1].email, id_document: data.data[0]._id };

                            const rateData = await axios(obj);

                            if(rateData.data.success){
                                setRate([rateData.data.rate === 0 ? false:true, rateData.data.rate]);
                                setDataFetch(data.data.length > 0 ? 'done':'error');
                                setData(data.data);
                                setYearTop(data.data.length > 0 ? data.data[0].selectedTop:'new');

                                

                                //Calculate rate________________________________________
                                if(data.data.length > 0){
                                    let arr = [data.data[0].star1, data.data[0].star2, data.data[0].star3, data.data[0].star4, data.data[0].star5]
                                    let WeightedSum = arr.map((a, i) => (a*(i+1))).reduce((acc, curr) => acc+curr);
                                    
                                    setRateCalculated(Number.isNaN(Number((WeightedSum/data.data[0].allRate).toFixed(2))) ? 0:Number((WeightedSum/data.data[0].allRate).toFixed(2)));
                                }
                            }else{
                                setDataFetch('error');
                            }

                        }else{
                          setDataFetch('error');
                        }
                    }catch(e){
                      setDataFetch('error');
                    }
          
                  }
          
                  funcD();
            }else{
                setAccessAlert('timeout');
            }
        }

        fetch();

    }, [id])



    //Rating button first time______________________________________________________________
    const handleRating = async (rate: number) => {
        const auth = await Authentication() as any;
        if(auth[0]){
            if(!disableBttn){
                setDisableBttn((a) => !a);
                try{

                    let obj = {
                        method: 'POST',
                        url: 'https://directory-client-server.vercel.app/giveRate',
                        params: { /* This is for GET method */ },
                        data: { email: auth[1].email, rate: rate, id_document: data[0]._id },
                        headers: {
                            'Content-type': 'application/json'
                        }
                    }
    
                    await axios(obj);
                    
                    window.location.reload();
                }catch(e){
                    window.location.reload();
                }
            }
        }else{
            setAccessAlert('timeout');
        }
    }

    //Rating button again___________________________________________
    const againHandleRating = async (rates: number) => {

        const auth = await Authentication() as any;
        if(auth[0]){
            if(rates !== rate[1]){
                if(!disableBttn){
                    setDisableBttn((a) => !a);
                    try{

                        let obj = {
                            method: 'POST',
                            url: 'https://directory-client-server.vercel.app/updateRate',
                            params: { /* This is for GET method */ },
                            data: { email: auth[1].email, rate: rates, id_document: data[0]._id },
                            headers: {
                                'Content-type': 'application/json'
                            }
                        }
        
                        await axios(obj);
                        
                        window.location.reload();
                    }catch(e){
                        window.location.reload();
                    }
                }
            }else{
                window.location.reload();
            }
            
        }else{
            setAccessAlert('timeout');
        }
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
                                            <p className='sm:text-[25px] text-[22px] text-[#29292d] font-semibold mt-2'>{ rateCalculated }/5</p>
                                            <div className='flex mb-2'>
                                                <Rating
                                                    SVGstyle={ { 'display':'inline', 'marginTop': '-4px' } }
                                                    size={22}
                                                    readonly={ true }
                                                    allowFraction={ true }
                                                    initialValue={ rateCalculated === 5 ? 5: rateCalculated !==0 ? rateCalculated % 1 === 0 ? rateCalculated:rateCalculated-1: 0 }
                                                    showTooltip={ false }
                                                    tooltipStyle={{ 'fontSize': '13px' }}
                                                />
                                            </div>
                                            <p className='text-[#565454] sm:text-[15px] text-[14px] mb-4'>{ data[0].allRate } ratings</p>

                                            {/*____Board Rating___*/}
                                            <p className='sm:text-[16px] text-[14px] font-semibold mb-2'>Board Rating</p>

                                            {
                                                [data[0].star5, data[0].star4, data[0].star3, data[0].star2, data[0].star1].map((a, i) => 
                                                <div key={ Math.random() } className='my-2 text-[14px] text-[#565454]'>
                                                    <div className='flex justify-between w-[98%] mx-auto'>
                                                        <p>{ Math.floor(5-i) } star</p>
                                                        <p>{Number.isNaN(Math.floor((a * 100) / data[0].allRate)) ? 0:Math.floor((a * 100) / data[0].allRate)}%</p>
                                                    </div>
                                            
                                                    <div className='h-[14px] overflow-hidden rounded-[20px] bg-[#E4E3DB] w-full'>
                                                        <div className={`h-[14px] rounded-[20px] bg-[#FACA51] w-[${Number.isNaN(Math.floor((a * 100) / data[0].allRate)) ? '0%':Math.floor((a * 100) / data[0].allRate)+'%'}]`}></div>
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

                                        {
                                            rate[0] ? 
                                            <div className='mb-5'>
                                                <p className='sm:text-[18px] text-[17px] text-[#29292d] font-semibold mb-1'>Give it a rate again?</p>

                                                <Rating
                                                    onClick={ againHandleRating }
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

                                        <div>
                                            <p className='sm:text-[18px] text-[17px] text-[#29292d] font-semibold'>{!rate[0] ? 'Give it a rate?':'Your rate'}</p>

                                            <Rating
                                                onClick={ handleRating }
                                                SVGstyle={ { 'display':'inline' } }
                                                size={24}
                                                readonly={ rate[0] }
                                                initialValue={ rate[1] }
                                                showTooltip={ true }
                                                tooltipDefaultText={ 'Your rate' }
                                                tooltipStyle={{ 'fontSize': '13px' }}
                                                tooltipArray={ ['01 star', '02 star', '03 star', '04 star', '05 star'] }
                                             />
                                        </div>
                                        
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