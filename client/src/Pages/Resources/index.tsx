import React, { useState } from 'react';
import Footer from '../../Components/Footer';
import { example } from '../../utilities/PNG';


const Resources: React.FC = () => {
    const [titleCourses, setTitleCourses] = useState<boolean>(true);
    const [selected, setSelected] = useState<string>('ALL');
    const courses: Array<string> = ['BSCS', 'BSIT', 'BSCpE', 'BSBA', 'BSAIS', 'BSA', 'BSRTCS', 'BACOMM', 'BSTM', 'ACT', 'ART'];
    const alphabets: Array<string> = ['ALL', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'O', 'P', 'Q', 'R', 'S', 'T',
    'U', 'V', 'X', 'Y', 'Z',];


    const funcTitleCourse = (condition: boolean) => {
        setTitleCourses(condition);
        setSelected(condition ? alphabets[0]:courses[0]);
    }


    const selectedFunc = (str: string) => {
        setSelected(str);
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
                        <div className='lg:w-[60%] md:w-[60%] w-[100%] h-[55px] flex justify-between bg-white rounded-md'>
                            {/*__Input text__*/}
                            <div className='w-[85%] p-4'>
                                <input type='text' placeholder='Search for your thesis' className='w-[100%] lg:text-[16px] md:text-[16px] text-[15px] text-black outline-none'/>
                            </div>

                            {/*__Selection Courses__*/}
                            <div className=' flex items-center'>
                                <select className="lg:text-[16px] md:text-[16px] text-[15px] w-full p-2.5 mr-2 cursor-pointer border-l-2 border-solid border-[#767373] bg-white text-[#767373] outline-none">
                                  <option selected>Courses</option>
                                  { courses.map(a => <option value={a}>{a}</option>) }
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <button className='lg:w-[60%] md:w-[60%] w-[100%] lg:text-[16px] md:text-[16px] text-[15px] rounded-[20px] py-[11px] px-[20px] mt-5 bg-[#FFF200]'>Search</button>
                    </div>
                </div>
            </div>


            <div className='bg-[#F3F3F3] py-11'>
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
                    <div className='flex flex-wrap justify-center pl-3'>
                        {
                            '.'.repeat(5).split('').map(a => 
                                <div key={Math.random()} className='lg:w-[230px] md:w-[230px] w-[170px] min-h-[288px] mr-3 mb-3 rounded-md overflow-hidden bg-[#2A2A2C] cursor-pointer'>
                                    <img src={example} alt="resources" className='h-[200px] mb-3 object-cover' />
                                    <span className='lg:text-[17px] md:text-[17px] text-[15px] text-[#FFF200] mb-1 p-3'>BSIT</span>
                                    <p className='lg:text-[17px] md:text-[17px] text-[15px] text-white p-3'>Proposed systemized wr directory for eb-bas pape s...</p>
                                </div>)
                        }
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Resources;