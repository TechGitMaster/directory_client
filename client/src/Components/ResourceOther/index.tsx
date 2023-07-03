import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_RESOURCES } from '../../Redux/Actions';
import { empty, gifLoading, imgFrontPDF } from '../../utilities/PNG';
import { useNavigate } from 'react-router-dom';


// Import the main component
import { Viewer, Worker } from '@react-pdf-viewer/core'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import DisableScrollPlugin from '../../Components/DisableScrollPDF';


const ResourceOther = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selector = useSelector((a:any) => a.ResourcesTitleCourse);

    const [titleCourses, setTitleCourses] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>('ALL');

    const courses: Array<string> = ['STEM', 'ABM', 'HUMSS', 'GAS', 'I.C.T', 'Home Economics'];
    const alphabets: Array<string> = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'X', 'Y', 'Z',];

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


    const clickDocu = (_id: string) => {
        window.scrollTo(0, 0)
    
        setTimeout(() => {
          navigate(`/document/${_id}`);
        }, 500)
    }


    //Fagination ___________________________________________________________

    //This is for title and course________________________
    const [arrowLeftRight, setArrowLeftRight] = useState<Array<number>>([0, 40]);
    const [rightLeArr, setRightLeArr] = useState(40);
    const [indexCount, setIndexCount] = useState(4);


    //Fagination refresh count____________________________________
    const faginationRefresh = () => {
        setArrowLeftRight([0, 40]);
        setRightLeArr(40);
        setIndexCount(4);
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
    const leftRightArrow = (condition: boolean, counts: any) => {
        if(condition){
            if(rightLeArr < counts) {
                setArrowLeftRight([arrowLeftRight[0]+40, arrowLeftRight[1]+40]);
                setRightLeArr(rightLeArr+40);
                setIndexCount(indexCount+4);
            }   
        }else{
            if(rightLeArr > 40){
                setArrowLeftRight([arrowLeftRight[0]-40, arrowLeftRight[1]-40]);
                setRightLeArr(rightLeArr-40);
                setIndexCount(indexCount-4);
            }
        }
    }


    //Selected from title or course________________________________
    const selectedFunc = (str: string) => {
        setSelected(str);
        
        faginationRefresh();

        dispatch({ condition: titleCourses ? 'titleFirstLetter':'course', 
        titleCourse: str === 'ALL' ? '':str, skip: 0, type: GET_RESOURCES });
    } 


    const clickFagi = async (data: any) => {
        const selecteds = titleCourses ? alphabets[0]:courses[0];
        dispatch({ condition: titleCourses ? 'titleFirstLetter':'course', 
        titleCourse: selecteds === 'ALL' ? '':selecteds, skip: data, type: GET_RESOURCES });
    }

    return (
        <>
            {/*___Tilte and Course and Documents___*/}
            <div className='pb-5 pt-8 bg-[#F3F3F3]'>
                <div className='mx-auto max-w-[1250px]'>

                    {/*___Tilte and Course___*/}
                    <div className='flex justify-center cursor-pointer'>
                        <div className='w-[300px] bg-white rounded-md overflow-hidden flex'>
                            <div className={'w-[50%] text-center md:text-[17px] text-[15px] md:p-3 p-2 '+(titleCourses ? 'bg-[#D85900] text-white':'text-[#048BE2]')} 
                            onClick={ () => funcTitleCourse(true) }><span>Title</span></div>
                            <div className={'w-[50%] text-center md:text-[17px] text-[14px] md:p-3 p-2 '+(!titleCourses ? 'bg-[#D85900] text-white':'text-[#048BE2]')} 
                            onClick={ () => funcTitleCourse(false) }><span>Track</span></div>
                        </div>
                    </div>
                    

                    {/*___Alphabets for Title and Courses for course___*/}
                    <div className='mt-8 mb-5 flex flex-wrap justify-center'>
                        {
                            (titleCourses ?
                            //Alphabets_________________
                            alphabets.map(a => <p key={Math.random()} onClick={ () => selectedFunc(a) }
                            className={'md:text-[18px] text-[15px] p-2 rounded-md mx-2 cursor-pointer '+(selected === a ? 'bg-[#D85900] text-white':'text-[#8C8681]')}>{a}</p>)
                            :
                            //Course_________________
                            courses.map(a => <div key={Math.random()} onClick={ () => selectedFunc(a) }
                            className={'text-[#8C8681] md:text-[17px] text-[15px] p-2 rounded-md mx-3 cursor-pointer '+(selected === a ? 'bg-[#D85900] text-white':'text-[#8C8681]')}>{a}</div>))
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

                                            <p className='text-[14px] text-white my-4 px-3'>Number of pax: 0{ a.member }</p>
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
                                <div onClick={ () => leftRightArrow(false, selector.countAll) } 
                                className='px-3 py-1 rounded-md bg-[gold] cursor-pointer'>{'<'}</div>
                                {
                                    faginationCount(selector.countAll, arrowLeftRight).map((a:any) => 
                                    <div key={Math.random()} onClick={ () => clickFagi(a) }
                                    className='px-3 py-1 text-[14px] underline cursor-pointer'>{a[2]}</div>)
                                }
                                {
                                    rightLeArr < selector.countAll ? <p className='px-3'> ... </p>:''
                                }
                                <div onClick={ () => leftRightArrow(true, selector.countAll) } 
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
        </>
    );
}

export default ResourceOther;