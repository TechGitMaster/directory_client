import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Footer from '../../Components/Footer';
import { example, gifLoading, empty } from '../../utilities/PNG';
import { GET_RESOURCES } from '../../Redux/Actions';
import axios from 'axios';

const Resources: React.FC = () => {
    const dispatch = useDispatch();
    const selector = useSelector((a:any) => a.ResourcesTitleCourse);


    const [titleCourses, setTitleCourses] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>('ALL');
    const courses: Array<string> = ['BSCS', 'BSIT', 'BSCpE', 'BSBA', 'BSAIS', 'BSA', 'BSRTCS', 'BACOMM', 'BSTM', 'ACT', 'ART'];
    const alphabets: Array<string> = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'X', 'Y', 'Z',];

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
        
        if(searchS.current.value.trim().length === 0 || courseS.current.value === 'Select a Course' || 
            yearS.current.value === 'Select a Year'){
            window.scrollTo(0, 0)
                
            if(searchS.current.value.trim().length === 0){
                setSearchs(true);
            }else{
                setSearchs(false);
            }

            if(courseS.current.value === 'Select a Course'){
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


    
    //Get documents by title___________________________________________________________
    useEffect(() => {
        dispatch({ condition: titleCourses ? 'titleFirstLetter':'course', 
        titleCourse: selected === 'ALL' ? '':selected, skip: 0, type: GET_RESOURCES });
    }, []);

    //Button of title and course______________________________________
    const funcTitleCourse = (condition: boolean) => {
        setTitleCourses(condition);
        setSelected(condition ? alphabets[0]:courses[0]);

        faginationRefresh();

        const selecteds = condition ? alphabets[0]:courses[0];
        dispatch({ condition: condition ? 'titleFirstLetter':'course', 
        titleCourse: selecteds === 'ALL' ? '':selecteds, skip: 0, type: GET_RESOURCES });
    }

    //Selected from title or course________________________________
    const selectedFunc = (str: string) => {
        setSelected(str);
        
        faginationRefresh();

        dispatch({ condition: titleCourses ? 'titleFirstLetter':'course', 
        titleCourse: str === 'ALL' ? '':str, skip: 0, type: GET_RESOURCES });
    } 


    //Fagination ___________________________________________________________

    //This is for title and course________________________
    const [arrowLeftRight, setArrowLeftRight] = useState<Array<number>>([0, 40]);
    const [rightLeArr, setRightLeArr] = useState(40);
    const [indexCount, setIndexCount] = useState(4);

    //This is for search________________________
    const [arrowLeftRightSearch, setArrowLeftRightSearch] = useState<Array<number>>([0, 40]);
    const [rightLeArrSearch, setRightLeArrSearch] = useState(40);
    const [indexCountSearch, setIndexCountSearch] = useState(4);

    /*useEffect(() => {
        console.log(arrowLeftRight);
        console.log(arrowLeftRight);
    }, [arrowLeftRight, indexCount])*/

    //Fagination refresh count____________________________________
    const faginationRefresh = () => {
        setArrowLeftRight([0, 40]);
        setRightLeArr(40);
        setIndexCount(4);
    }

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

    //Fagination count title and course__________________________
    const faginationCount = (counts: any, minMaxCount: any) => {
        let arr = [];

        let cs = counts/10;
        let final = Number.isInteger(cs) ? cs:(cs+1);

        for(let count = 1;count <= Math.abs(indexCount-final-4);count++){
            if(count <= 4){
                let index = Math.floor((indexCount-4)+count);
                arr.push([0 /*this is limit (max) */, Math.floor(((count*10)+minMaxCount[0])-10) /*this is skip (min) */, index]);
            }
        }

        return arr;
    }

    //Fagination left and right arrow_______________________________________________
    const leftRightArrow = (condition: boolean, counts: any, searchNot: boolean) => {
        if(condition){
            if(rightLeArr < counts) {
                if(!searchNot){
                    setArrowLeftRight([arrowLeftRight[0]+40, arrowLeftRight[1]+40]);
                    setRightLeArr(rightLeArr+40);
                    setIndexCount(indexCount+4);
                }else{
                    setArrowLeftRightSearch([arrowLeftRightSearch[0]+40, arrowLeftRightSearch[1]+40]);
                    setRightLeArrSearch(rightLeArrSearch+40);
                    setIndexCountSearch(indexCountSearch+4);
                }
            }   
        }else{
            if(rightLeArr > 40){
                if(!searchNot){
                    setArrowLeftRight([arrowLeftRight[0]-40, arrowLeftRight[1]-40]);
                    setRightLeArr(rightLeArr-40);
                    setIndexCount(indexCount-4);
                }else{
                    setArrowLeftRightSearch([arrowLeftRightSearch[0]-40, arrowLeftRightSearch[1]-40]);
                    setRightLeArrSearch(rightLeArrSearch-40);
                    setIndexCountSearch(indexCountSearch-4);
                }
            }
        }

    }

    //Fagination btn click number_______________________________________________________
    const clickFagi = async (data: any, searchNot: boolean) => {
        if(!searchNot){
            const selecteds = titleCourses ? alphabets[0]:courses[0];
            dispatch({ condition: titleCourses ? 'titleFirstLetter':'course', 
            titleCourse: selecteds === 'ALL' ? '':selecteds, skip: data, type: GET_RESOURCES });
            
            return;
        }

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
            {/*___Header___*/}
            <div className='bg-[#1790E0] px-4'>
                <div className='mx-auto max-w-[1250px] pt-[115px] pb-[50px]'>
                    <p className='lg:text-[30px] md:text-[30px] text-[26px] font-bold text-center text-white'>Find Study Resources by Course</p>
                    <div className='flex justify-center mt-3 mb-8'>
                        <p className='lg:w-[65%] md:w-[65%] w-[90%] lg:text-[15px] md:text-[15px] text-[14px] text-white text-center'>Find the study resources you need for your thesis. Resources page will provide a available study documents by courses that will help you to study there thesis.</p>
                    </div>

                   {/*__Search bar__*/}
                    <div className='flex justify-center'>
                        <div className={'lg:w-[60%] md:w-[60%] w-[100%] h-[55px] bg-white rounded-md '+
                        (firstCome ? searchs ? 'border-2 border-[red]':'':'')}>
                            {/*__Input text__*/}
                            <div className='w-full p-4'>
                                <input ref={ searchS } type='text' placeholder='Search for your thesis' 
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
                                <option selected>Select a Course</option>
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
                            <p className='font-bold text-xl'>Found <span className='text-[#1790E0]'>Documents</span>: 
                            { stateHandle.countAll > 9 ? ' '+stateHandle.countAll:' 0'+stateHandle.countAll }</p>
                            <div className='mt-5'>

                                {/*___Fagination search____*/}
                                <div className='mb-5 mt-3 flex justify-between items-center'>
                                <div className='flex items-center'>
                                    <div onClick={ () => leftRightArrow(false, stateHandle.countAll, true) } 
                                        className='px-3 py-1 rounded-md bg-[gold] cursor-pointer'>{'<'}</div>
                                        {
                                            faginationCountSearch(stateHandle.countAll, arrowLeftRightSearch).map((a:any) => 
                                            <div key={Math.random()} onClick={ () => clickFagi(a, true) }
                                            className='px-3 py-1 text-[14px] underline cursor-pointer'>{a[2]}</div>)
                                        }
                                        {
                                            rightLeArrSearch < stateHandle.countAll ? <p className='px-3'> ... </p>:''
                                        }
                                        <div onClick={ () => leftRightArrow(true, stateHandle.countAll, true) } 
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
                                            <div key={Math.random()} className='w-full flex-1 rounded-md overflow-hidden bg-[#2A2A2C] cursor-pointer pb-5'>
                                                <img src={example} alt="resources" className='h-[200px] mb-3 object-cover' />
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


                {/*___Tilte and Course and Documents___*/}
                <div className='mx-auto max-w-[1250px]'>

                    {/*___Tilte and Course___*/}
                    <div className='flex justify-center cursor-pointer'>
                        <div className='w-[300px] bg-white rounded-md overflow-hidden flex'>
                            <div className={'w-[50%] text-center lg:text-[17px] md:text-[17px] text-[16px] p-3 '+(titleCourses ? 'bg-[#048BE2] text-white':'text-[#048BE2]')} 
                            onClick={ () => funcTitleCourse(true) }><span>Title</span></div>
                            <div className={'w-[50%] text-center lg:text-[17px] md:text-[17px] text-[16px] p-3 '+(!titleCourses ? 'bg-[#048BE2] text-white':'text-[#048BE2]')} 
                            onClick={ () => funcTitleCourse(false) }><span>Course</span></div>
                        </div>
                    </div>
                    

                    {/*___Alphabets for Title and Courses for course___*/}
                    <div className='mt-8 mb-5 flex flex-wrap justify-center'>
                        {
                            (titleCourses ?
                            //Alphabets_________________
                            alphabets.map(a => <p key={Math.random()} onClick={ () => selectedFunc(a) }
                            className={'lg:text-[18px] md:text-[18px] text-[16px] p-2 rounded-md mx-2 cursor-pointer '+(selected === a ? 'bg-[#048BE2] text-white':'text-[#8C8681]')}>{a}</p>)
                            :
                            //Course_________________
                            courses.map(a => <div key={Math.random()} onClick={ () => selectedFunc(a) }
                            className={'text-[#8C8681] lg:text-[17px] md:text-[17px] text-[15px] p-2 rounded-md mx-3 cursor-pointer '+(selected === a ? 'bg-[#048BE2] text-white':'text-[#8C8681]')}>{a}</div>))
                        }
                    </div>
                    

                    {/*___Resources___*/}
                    {
                        selector.type === 'done' ? 
                        <div>
                        {
                            selector.res.length > 0 ?
                            <div className='grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 pl-3'>
                                {
                                    selector.res.map((a:any) => 
                                    <div className='pr-3 mb-3 flex'>
                                        <div key={Math.random()} className='w-full flex-1 rounded-md overflow-hidden bg-[#2A2A2C] cursor-pointer pb-5'>
                                            <img src={example} alt="resources" className='h-[200px] mb-3 object-cover' />
                                            <p className='lg:text-[17px] md:text-[17px] text-[15px] text-[#FFF200] px-3'>{ a.course }</p>
                                            <p className='text-[14px] text-white mb-1 px-3'>{ a.year }</p>

                                            <p className='text-[14px] text-white my-4 px-3'>Member: 0{ a.member }</p>
                                            <p className='text-[15px] text-white px-3 mt-3 line-clamp-3 overflow-hidden'>{ a.title }</p>
                                        </div> 
                                    </div>)
                                }
                            </div>
                            :
                            <div className='flex justify-center px-3'>
                                <div>
                                    <div className='flex justify-center'>
                                        <img src={ empty } alt="empty" className='max-h-[290px] mt-4' />
                                    </div>
                                    <p className='text-center font-bold lg:text-[26px] text-[24px] mt-4'>Empty table</p>
                                    <div className='flex justify-center'>
                                        <p className='lg:w-[80%] md:w-[80%] w-[100%] text-center text-[14px]'>If you see this maybe the resources you want to find is not exist or no record yet.</p>
                                    </div>
                                </div>
                            </div>
                        }
                        </div>
                        :
                        <div className='flex justify-center'>
                            <img src={ gifLoading } alt="loading" className='w-[90px]' />
                        </div>
                    }


                    {/*__Document Fagination__*/}
                    {
                        (selector.res.length > 0 && selector.type === 'done' ? 
                        <div className='mb-5 mt-3 flex justify-between items-center'>
                            <div className='flex items-center'>
                                <div onClick={ () => leftRightArrow(false, selector.countAll, false) } 
                                className='px-3 py-1 rounded-md bg-[gold] cursor-pointer'>{'<'}</div>
                                {
                                    faginationCount(selector.countAll, arrowLeftRight).map((a:any) => 
                                    <div key={Math.random()} onClick={ () => clickFagi(a, false) }
                                    className='px-3 py-1 text-[14px] underline cursor-pointer'>{a[2]}</div>)
                                }
                                {
                                    rightLeArr < selector.countAll ? <p className='px-3'> ... </p>:''
                                }
                                <div onClick={ () => leftRightArrow(true, selector.countAll, false) } 
                                className='px-3 py-1 rounded-md bg-[gold] cursor-pointer'>{'>'}</div>
                            </div>
                            <div className='font-bold text-[15px]'>
                                { selector.res.length > 9 ? selector.countAll:'0'+selector.res.length }-10 of 
                                { selector.countAll > 9 ? ' '+selector.countAll:' 0'+selector.countAll }</div>
                        </div>
                        :
                        '')
                    }
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Resources;