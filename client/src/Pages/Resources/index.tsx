import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Components/Footer';
import { example, gifLoading, empty, imgFrontPDF } from '../../utilities/PNG';
import { GET_RESOURCES } from '../../Redux/Actions';
import axios from 'axios';
import ResourceOther from '../../Components/ResourceOther';
import { useNavigate, useOutletContext } from 'react-router-dom';

// Import the main component
import { Viewer, Worker } from '@react-pdf-viewer/core'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import DisableScrollPlugin from '../../Components/DisableScrollPDF';

const Resources: React.FC = () => {
    const { setSearch }: any = useOutletContext();
    const navigate = useNavigate();

    const courses: Array<string> = ['STEM', 'ABM', 'HUMSS', 'GAS', 'I.C.T', 'Home Economics'];

    //Red color for Course, year and search if empty________________________________________
    const [firstCome, setFirstCome] = useState(false);
    const [searchs, setSearchs] = useState(false);
    const [coursess, setCourses] = useState(false);
    const [years, setYears] = useState(false);

    //useRef and useState for Course, year and search______________________________________________
    const searchS = useRef<any>('');
    const courseS = useRef<any>('');
    const yearS = useRef<any>('');
    const [searchCache, setSearchCache] = useState(['', '', '']);

    //Cancel axios search bar if have new request_______________________________________
    const [searchState, setSearchState] = useState('new');
    const [stateHandle, setStateHandle] = useState<any>('');
    const cancelToken = axios.CancelToken;
    const source1Search = cancelToken.source();

    //Year array_____________________________________________________
    const yearArray = () => {
        const startYear = 2022;
        const currentYear = new Date().getFullYear();
        
        let Array_year = [['2022','2022-2023']];

        for(let count = 1; count <= (currentYear-startYear);count++){
            let yearC = (2022+count);
            Array_year.push([`${yearC}`, `${yearC}-${yearC+1}`]);
        }

        return Array_year;
    }

    

    //Button Search___________________________________________________
    const btnSearch = async () => {
        setFirstCome(true);
        setSearchs(false);
        setCourses(false);
        setYears(false);
        
        if(searchS.current.value.trim().length === 0 || courseS.current.value === 'Select a Track' || 
            yearS.current.value === 'Select a Year'){
            window.scrollTo(0, 0)
                
            if(searchS.current.value.trim().length === 0){
                setSearchs(true);
            }else{
                setSearchs(false);
            }

            if(courseS.current.value === 'Select a Track'){
                setCourses(true);
            }else{
                setCourses(false);
            }

            if(yearS.current.value === 'Select a Year'){
                setYears(true);
            }else{
                setYears(false);
            }
            
        }else{
            const documentSearch = document.querySelector('.documentSearch');
            documentSearch?.scrollIntoView({ behavior: 'smooth', block: 'start' });

            setSearchCache([courseS.current.value, searchS.current.value, yearS.current.value]);
            setSearchState('loading');
            source1Search.cancel('Request canceled by the user.');

            try{
                let obj = {
                    method: 'GET',
                    url: 'http://localhost:4000/get_resources',
                    params: { course: courseS.current.value, search: searchS.current.value, 
                        year: yearS.current.value, skip: 0 },
                    data: { /*this is for req.body*/ },
                    headers: {
                        'Content-Type': 'application/json'
                    },
                } as any;
            
                const res = await axios(obj, {
                    cancelToken: source1Search.token
                });
                
                setStateHandle(res.data);
            }catch(error){
                setStateHandle([]);
            }

            setSearchState('done');
        }
    }


    const clickDocu = (_id: string) => {
        window.scrollTo(0, 0)
    
        setTimeout(() => {
          navigate(`/document/${_id}`);
        }, 500)
    }


    //Fagination ___________________________________________________________

    //This is for title and course________________________
    const [rightLeArr, setRightLeArr] = useState(40);

    //This is for search________________________
    const [arrowLeftRightSearch, setArrowLeftRightSearch] = useState<Array<number>>([0, 40]);
    const [rightLeArrSearch, setRightLeArrSearch] = useState(40);
    const [indexCountSearch, setIndexCountSearch] = useState(4);

    /*useEffect(() => {
        console.log(arrowLeftRight);
        console.log(arrowLeftRight);
    }, [arrowLeftRight, indexCount])*/

    //Fagination count title and course__________________________
    const faginationCountSearch = (counts: any, minMaxCount: any) => {
        let arr = [];

        let cs = counts/10;
        let final = Number.isInteger(cs) ? cs:(cs+1);

        for(let count = 1;count <= Math.abs(indexCountSearch-final-4);count++){
            if(count <= 4){
                let index = Math.floor((indexCountSearch-4)+count);
                arr.push([0 /*this is limit (max) */, Math.floor(((count*10)+minMaxCount[0])-10) /*this is skip (min) */, index]);
            }
        }

        return arr;
    }

    //Fagination left and right arrow_______________________________________________
    const leftRightArrow = (condition: boolean, counts: any) => {
        if(condition){
            if(rightLeArr < counts) {
                setArrowLeftRightSearch([arrowLeftRightSearch[0]+40, arrowLeftRightSearch[1]+40]);
                setRightLeArrSearch(rightLeArrSearch+40);
                setIndexCountSearch(indexCountSearch+4);
            }   
        }else{
            if(rightLeArr > 40){
                setArrowLeftRightSearch([arrowLeftRightSearch[0]-40, arrowLeftRightSearch[1]-40]);
                setRightLeArrSearch(rightLeArrSearch-40);
                setIndexCountSearch(indexCountSearch-4);
            }
        }
    }

    //Fagination btn click number_______________________________________________________
    const clickFagi = async (data: any) => {

        const documentSearch = document.querySelector('.documentSearch');
        documentSearch?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setSearchState('loading');
        source1Search.cancel('Request canceled by the user.');
        try{
            let obj = {
                method: 'GET',
                url: 'http://localhost:4000/get_resources',
                params: { course: searchCache[0], search: searchCache[1], year: searchCache[2], skip: data },
                data: { /*this is for req.body*/ },
                headers: {
                    'Content-Type': 'application/json'
                },
            } as any;
        
            const res = await axios(obj, {
                cancelToken: source1Search.token
            });
            
            setStateHandle(res.data);
        }catch(error){
            setStateHandle([]);
        }
        setSearchState('done');
    }

    return (
        <>
        <div onClick={() => setSearch(false)}>

        {/*___Header___*/}
        <div className='bg-[#D85900] px-4'>
                <div className='mx-auto max-w-[1250px] pt-[115px] pb-[50px]'>
                    <p className='lg:text-[30px] md:text-[30px] text-[26px] font-bold text-center text-white'>Find Study Resources by Course</p>
                    <div className='flex justify-center mt-3 mb-8'>
                        <p className='lg:w-[65%] md:w-[65%] w-[90%] lg:text-[15px] md:text-[15px] text-[14px] text-white text-center'>Find the study resources you need for your research. Resources page will provide a available study documents by courses that will help you to study there research.</p>
                    </div>

                   {/*__Search bar__*/}
                    <div className='flex justify-center'>
                        <div className={'lg:w-[60%] md:w-[60%] w-[100%] h-[55px] bg-white rounded-md '+
                        (firstCome ? searchs ? 'border-2 border-[red]':'':'')}>
                            {/*__Input text__*/}
                            <div className='w-full p-4'>
                                <input ref={ searchS } type='text' placeholder='Search for your research' 
                                className='w-[100%] lg:text-[16px] md:text-[16px] text-[15px] text-black outline-none '/>
                            </div>
                        </div>
                    </div>

                    {/*__Year and Course__*/}
                    <div className='flex justify-center mt-3'>
                        <div className='lg:w-[60%] md:w-[60%] w-[100%] grid grid-cols-2'>

                            {/*___Course___*/}
                            <select ref={ courseS } className={'w-[99%] text-[15px] p-3 cursor-pointer rounded-md bg-white text-[#767373] '+
                            (firstCome ? coursess ? 'border-2 border-[red]':'':'')}>
                                <option selected>Select a Track</option>
                                { courses.map(a => <option value={a}>{a}</option>) }
                            </select>

                            {/*___Year___*/}
                            <select ref={ yearS } className={'w-[99%] ml-1 text-[15px] p-3 cursor-pointer rounded-md bg-white text-[#767373] '+
                            (firstCome ? years ? 'border-2 border-[red]':'':'')}>
                                <option selected>Select a Year</option>
                                { yearArray().map(a => <option value={a[0]}>{a[1]}</option>) }
                            </select>

                        </div>
                    </div>

                    {/*__Button search__*/}
                    <div className='flex justify-center documentSearch'>
                        <button onClick={ () => btnSearch() }
                        className='lg:w-[60%] md:w-[60%] w-[100%] lg:text-[16px] md:text-[16px] text-[15px] rounded-[20px] py-[11px] px-[20px] mt-4 bg-[#FFF200]'>Search</button>
                    </div>
                </div>
            </div>


            <div className='bg-[#F3F3F3] py-11'>

                {/*___Documents Search___*/}
                <div className='mx-3'>

                    <div className={(searchState !== 'new' ? 'mx-auto max-w-[1250px] mb-10 rounded-md p-5 bg-white':'')}>
                    {
                        searchState !== 'new' ?
                        searchState !== 'loading' ? 
                        stateHandle.data.length > 0 ? 
                        <div>
                            <p className='font-bold text-xl'>Found <span className='text-[#D85900]'>Documents</span>: 
                            { stateHandle.countAll > 9 ? ' '+stateHandle.countAll:' 0'+stateHandle.countAll }</p>
                            <div className='mt-5'>

                                {/*___Fagination search____*/}
                                <div className='mb-5 mt-3 flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <div onClick={ () => leftRightArrow(false, stateHandle.countAll) } 
                                        className='px-3 py-1 rounded-md bg-[gold] cursor-pointer'>{'<'}</div>
                                        {
                                            faginationCountSearch(stateHandle.countAll, arrowLeftRightSearch).map((a:any) => 
                                            <div key={Math.random()} onClick={ () => clickFagi(a) }
                                            className='px-3 py-1 text-[14px] underline cursor-pointer'>{a[2]}</div>)
                                        }
                                        {
                                            rightLeArrSearch < stateHandle.countAll ? <p className='px-3'> ... </p>:''
                                        }
                                        <div onClick={ () => leftRightArrow(true, stateHandle.countAll) } 
                                        className='px-3 py-1 rounded-md bg-[gold] cursor-pointer'>{'>'}</div>
                                    </div>
                                    <div className='font-bold text-[15px]'>
                                        { stateHandle.data.length > 9 ? stateHandle.countAll:'0'+stateHandle.data.length }-10 of 
                                        { stateHandle.countAll > 9 ? ' '+stateHandle.countAll:' 0'+stateHandle.countAll }
                                    </div>
                                </div>

                                {/*___Document searched____*/}
                                <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pl-3'>
                                    {
                                        stateHandle.data.map((a:any) => 
                                        <div className='pr-3 mb-3 flex'>
                                            <div key={Math.random()} onClick={() => clickDocu(a._id)}
                                             className='w-full flex-1 rounded-md overflow-hidden bg-[#2A2A2C] cursor-pointer pb-5'>
                                                
                                                <div className='w-[100%] h-[200px] mb-3 bg-white overflow-hidden relative' >
                                                  <img src={ imgFrontPDF } alt="frontPage" className='w-full h-full absolute z-20' />
                                                  <div className='blur-sm h-[300px]'>
                                                      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.7.107/build/pdf.worker.min.js">
                                                        <Viewer
                                                            defaultScale={ 0.4 }
                                                            fileUrl={ a.documentURI }
                                                            plugins={[DisableScrollPlugin()]} 
                                                        />
                                                      </Worker>
                                                  </div>
                                                </div>

                                                <p className='lg:text-[17px] md:text-[17px] text-[15px] text-[#FFF200] px-3'>{ a.course }</p>
                                                <p className='text-[14px] text-white mb-1 px-3'>{ a.year }</p>

                                                <p className='text-[14px] text-white my-4 px-3'>Member: 0{ a.member }</p>
                                                <p className='text-[15px] text-white px-3 mt-3 line-clamp-3 overflow-hidden'>{ a.title }</p>
                                            </div> 
                                        </div>)
                                    }
                                </div>
                            </div>
                        </div>
                        :
                        <div className='flex justify-center px-3 my-4'>
                            <div>
                                <div className='flex justify-center'>
                                    <img src={ empty } alt="empty" className='max-h-[290px]' />
                                </div>
                                <p className='text-center font-bold lg:text-[26px] text-[24px] mt-4'>Can't find Documents</p>
                                <div className='flex justify-center'>
                                    <p className='lg:w-[80%] md:w-[80%] w-[100%] text-center text-[14px]'>If you see this maybe the resources you want to find is not exist or no record yet.</p>
                                </div>
                            </div>
                        </div>
                        :
                        <div>
                            <div className='flex justify-center'>
                                <img src={ gifLoading } alt="loading" className='w-[90px]' />
                            </div>
                            <div className='flex justify-center'>
                                <p className='w-[80%] text-center text-md'>Please wait we're trying to find the documents</p>
                            </div>
                        </div>
                        :
                        '' 
                    }
                    </div>
                </div>


                <ResourceOther />
            </div>

            <Footer />
        </div>
        </>
    )
}


export default Resources;