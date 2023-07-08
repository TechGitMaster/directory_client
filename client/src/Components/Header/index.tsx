import React, { useState, useEffect } from 'react';
import { logo, search, google, burger, docsSource, home, infoA, searchFor, noRecord, gifLoading, 
    thesisaryWord, alertAccess } from '../../utilities/PNG';
import { useNavigate } from 'react-router-dom';
import MiniSearch from 'minisearch'
import './index.css';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google'
import jwtDecode from 'jwt-decode';
import Authentication from '../Authentication';

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
                        <img src={ google } alt="google" className='w-6 h-6 mr-3' />
                        <p className='font-inter font-normal text-white text-[15px]'>Sign in with google</p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}


const Header2: React.FC<any> = ({ searchs, setSearch, accessAlert, setAccessAlert }) => {
    const navigate = useNavigate();
    const [menu, setMenu] = useState<boolean>(false);
    const [innerWidth, setInnerWidth] = useState<any>(0);

    const [searchText, setSearchText] = useState<string>("");
    const [arrSearched, setArrSearched] = useState<Array<any>>([]);
    const [searchType, setSearchType] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState<any>(null);
    const [miniSearch, setMiniSearch] = useState(new MiniSearch({
        fields: ['title'], // fields to index for full-text search
        storeFields: ['id', 'id_document', 'title'], // fields to return with search results,
        searchOptions: {
            prefix: true,
            fuzzy: 0.2,
            boost: { title: 2 } 
        }
    }))

    const [signIns, setSignIns] = useState<boolean>(false);
    const [dataAccount, setDataAccount] = useState<any>();
    const [signinClick, setSigninClick] = useState<boolean>(false);
    const [countDown, setCountDown] = useState(5);

    const navigationFun = (str: string) => {
        navigate(`/${str}`);
        setMenu(false);
    }
    

    //Input field change_____________________________________________________________
    const inputText = (e:any) => {
        setSearchText(e.currentTarget.value)
        setSearchType(false);

        clearTimeout(typingTimeout);

        const timeout = setTimeout(() => {
            setSearchType(true);
            
            setArrSearched(miniSearch.search(searchText));
        }, 1000); 

        setTypingTimeout(timeout);
    }

    let obj = {
        method: "GET",
        url: '',
        params: { /* this is for GET request */ },
        data: { /* this is for POST request */ },
        headers: {
            'Content-type': 'application/json'
        }
    }

    useEffect(() => {
        setInnerWidth(window.innerWidth); 
        window.addEventListener('resize', () => {
            setInnerWidth(window.innerWidth); 
            if(window.innerWidth > 872) setMenu(false); 
        });


        //Auth____________________________________________________________
        const authF = async () => {
            const auth = await Authentication();
            if(auth[0]){
                setSignIns(true);
                setDataAccount(auth[1]);
            }
        }

        //Get all documents title_________________________________________
        const getTitle = async () => {
            try{
                
                obj.method = 'GET';
                obj.url = 'https://directory-client-server.vercel.app/documents_Title';

                let { data } = await axios(obj);

                miniSearch.addAllAsync(data.data.map((a:any, i:any) => {
                    let ab = a;
                    ab['id'] = i;
                    return ab;
                }));
            }catch(e){

            }
        }

        authF();
        getTitle();

    }, []);


    //Alert timeout_________________________________________________
    useEffect(() =>{
        if(accessAlert === 'timeout'){
            setCountDown(5);
            let count = 5;
            let interval = setInterval(() => {
                if(count > 0){
                    count -= 1;
                    setCountDown((a) => a-1);
                }else{
                    clearInterval(interval)
                    window.location.assign('http://localhost:3000/');
                }
            }, 1000)
        }
    }, [accessAlert])


    //Click selected text title_____________________________________
    const clickDocu = (_id: string) => {
        setTimeout(async () => {
            const auth = await Authentication();
            if(auth[0]){
                setSearch(false);
                setSearchText("");
                navigate(`/document/${_id}`);   
            }else{
                setAccessAlert('view')
            }
        }, 100)
    }


    //Sign in_________________________________________________________
    const signIn_Google = async (e: any) => {
        const dataObj = {
            email: e.email,
            fullName: e.name,
            familyName: e.family_name, 
            givenName: e.given_name,
            picture_URI: e.picture
        }

        try{
            obj.method = 'POST';
            obj.url = 'https://directory-client-server.vercel.app/signIn' 
            obj.data = dataObj;

            const { data } = await axios(obj);

            if(data.success){
                localStorage.setItem('_SClrTk', data.token);
                const auth = await Authentication();

                if(auth[0]){
                    window.location.reload();
                }else{
                    alert('Check your Internet connection.');
                }
            }else{
                alert('Check your Internet connection.');
            }
        }catch(e){
            alert('Check your Internet connection.');
        }

    }   

    return (
        <>
        {/*__Header__*/} 
        <div className='w-full fixed top-0 bg-[#2A2A2C] py-4 px-3 header'>
            <div className='mx-auto max-w-[1250px]'>
                <div className='flex justify-between lg:h-[45px] md:h-[45px] h-[35px]'>

                    {/*____left____*/}
                    <div className='flex h-full leftN'>
                        {<img src={ logo } className='lg:w-[50px] md:w-[55px] w-[40px] rounded-md' alt="logo" />}

                        <div onClick={ () => setSearch(true) } className={'lg:w-96 w-full h-full flex justify-between items-center ml-3 rounded-[20px] pl-3 pr-2 bg-[#F3F3F3] relative'}>
                            <input type='text' onChange={ inputText } value={ searchText } placeholder='Search content from resource document' className='w-[87%] bg-[#F3F3F3] text-[15px] text-black outline-none'/>

                            <div className='bg-[#e0e9f6] rounded-[50%] p-1'>
                                <img src={search} alt="search" className='lg:w-7 md:w-7 w-5 lg:h-6 md:h-6 h-5' />
                            </div>

                            {
                                searchs ? 
                                <div className='absolute lg:top-[50px] md:top-[55px] top-[40px] w-[100%] max-h-[500px] overflow-y-auto p-7 left-0 bg-[#F3F3F3] rounded-xl shadow-lg'>
                                    {
                                        searchText.length > 0 ?
                                        searchType ? 
                                        arrSearched.length > 0 ?
                                        <div>
                                            <p className='text-[12px] font-semibold text-[#7E8796] mb-4'>DOCUMENT RESULTS</p>
                                            {
                                                arrSearched.map((a) =>
                                                <div key={ Math.random() } onClick={ () => clickDocu(a.id_document) }
                                                className='p-2 mt-3 hover:bg-[#d5e0f2] rounded-md text-[14px] cursor-pointer'>{a.title}</div>)   
                                            }
                                        </div>
                                        :
                                        //No record box___
                                        <div>
                                            <div className='flex justify-center'>
                                                <img src={ noRecord } alt="searchs" className='lg:w-[65%] w-[40%]' />
                                            </div>
                                            <div className='flex justify-center'>
                                                <div className='w-[80%] lg:mt-4 mt-5 rounded-lg p-2 text-center bg-[#FAD4D4] text-[#D85900] text-[14px]'>
                                                    No Record for your Query
                                                </div>
                                            </div>
                                        </div>
                                        :
                                        //Loading box___
                                        <div className='flex justify-center'>
                                            <div>
                                            <div className='flex justify-center'>
                                                <img src={ gifLoading } alt="loading" className='w-[27%]' />
                                            </div>
                                            <div className='flex justify-center'>
                                                <div className='w-[90%] mt-4 rounded-lg p-2 text-center bg-[#FAD4D4] text-[#D85900] text-[14px]'>
                                                    Searching for your Query
                                                </div>
                                            </div>
                                        </div>
                                        </div>
                                        :

                                        //Search box____
                                        <div>
                                            <div className='flex justify-center'>
                                                <img src={ searchFor } alt="searchs" className='lg:w-[65%] w-[40%]' />
                                            </div>
                                            <div className='flex justify-center'>
                                                <div className='w-[80%] lg:mt-4 mt-5 rounded-lg p-2 text-center bg-[#FAD4D4] text-[#D85900] text-[14px]'>
                                                    Type a word to search box
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>
                                :
                                ''
                            }
                        </div>
                        <div className={'flex items-center navigation'}>
                            <div className='text-[17px] mx-[25px] font-inter  text-white cursor-pointer'
                            onClick={ () => navigationFun('') }>Home</div>
                            <div className='text-[17px] mx-[25px] font-inter text-white cursor-pointer'
                            onClick={ () => navigationFun('resources') }>Resources</div>
                            <div className='text-[17px] mx-[25px] font-inter  text-white cursor-pointer' 
                            onClick={ () => navigationFun('about') }>About</div>
                        </div>
                    </div>

                    {/*____right____*/}
                    {/*____Sign in____*/}
                    {
                        !signIns ?
                        <div onClick={() => setSigninClick(true)}
                            className='flex items-center p-4 bg-white rounded-lg cursor-pointer overflow-hidden rightN select-none relative'>
                            <img src={ google } alt="google" className='w-6 h-6 mr-3' />
                            <p className='font-inter font-normal text-[15px]'>Sign in with google</p>
                        </div>
                        :
                        ''
                    }

                    {/*____Signed account____*/}
                    {
                        signIns ?
                        <div className='flex items-center pl-3 bg-[#D85900] rounded-lg cursor-pointer overflow-hidden rightN select-none relative'>
                            <img src={dataAccount.picture_URI} onError={() => alert()} alt="user" 
                            className='h-7 rounded-[50%] mr-3 my-6' />
                            <div className='text-white my-6 '>
                                <p className='font-normal max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis text-[14px]'>Sign in as {dataAccount.givenName}</p>
                                <p className='-mt-1 font-light max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis text-[12px]'>{dataAccount.email}</p>
                            </div>
                            <div className='bg-white h-[81%] flex items-center p-2 ml-3 mr-1 rounded-r-md'>
                                <img src={ google } alt="google" className='h-5 relative' />
                            </div>
                        </div>
                        :
                        ''
                    }

                    {/*____Burger____*/} 
                    <div className='h-full cursor-pointer burger' onClick={ () => setMenu(true) }>
                        <div className='h-full flex items-center'>
                            <img src={burger} alt="burger" className='w-[33px] h-[32px]'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        {/*____Search div____*/}
        {
            searchs && innerWidth <= 752 ? 
            <div className='fixed top-0 w-full h-[100vh] bg-[#ffffff] p-7 header overflow-y-auto'>
                <p className='text-right'><span onClick={ () => setSearch(false) } className='cursor-pointer font-semibold text-[15px] select-none text-[#D85900] hover:underline hover:text-[#d85a00cd]'>Close</span></p>
                
                <div className='w-full rounded-[25px] p-1 bg-[#F3F3F3] mt-4 mb-7 relative'>
                    <div className='pl-3 pr-3 py-2 rounded-[25px] bg-white'>
                        <input type='text' onChange={ inputText } value={ searchText }  placeholder='Search content from resource document' className='w-[100%] bg-[white] text-[16px] text-[#393333] outline-none'/>
                    </div>
                </div>

                
                {
                    searchText.length > 0 ?
                    searchType ? 
                    arrSearched.length > 0 ?
                    <div>
                        <p className='text-[12px] font-semibold text-[#7E8796] mb-4'>DOCUMENT RESULTS</p>
                        {
                            arrSearched.map((a) =>
                            <div key={ Math.random() } onClick={ () => clickDocu(a.id_document) }
                            className='p-2 mt-3 hover:bg-[#d5e0f2] rounded-md text-[14px] cursor-pointer'>{a.title}</div>)   
                        }
                    </div>
                    :
                    //No record box___
                    <div>
                        <div className='flex justify-center'>
                            <img src={ noRecord } alt="searchs" className='w-[55%]' />
                        </div>
                        <div className='flex justify-center'>
                            <div className='w-[80%] lg:mt-4 mt-5 rounded-lg p-2 text-center bg-[#FAD4D4] text-[#D85900] text-[14px]'>
                                No Record for your Query
                            </div>
                        </div>
                    </div>
                    :
                    //Loading box___
                    <div className='flex justify-center'>
                        <div>
                        <div className='flex justify-center'>
                            <img src={ gifLoading } alt="loading" className='w-[27%]' />
                        </div>
                        <div className='flex justify-center'>
                            <div className='w-[90%] mt-4 rounded-lg p-2 text-center bg-[#FAD4D4] text-[#D85900] text-[14px]'>
                                Searching for your Query
                            </div>
                        </div>
                    </div>
                    </div>
                    :
                    //Search box____
                    <div>
                        <div className='flex justify-center'>
                            <img src={ searchFor } alt="searchs" className='w-[55%]' />
                        </div>
                        <div className='flex justify-center'>
                            <div className='w-[80%] lg:mt-4 mt-5 rounded-lg p-2 text-center bg-[#FAD4D4] text-[#D85900] text-[14px]'>
                                Type a word to search box
                            </div>
                        </div>
                    </div>
                }
            </div>
            :
            ''
        }


        {/*____Sign up with Google Login privacy____*/}
        {
            signinClick ? 
            <div className='fixed w-full h-[100vh] bg-black bg-opacity-20 sm:flex sm:px-5 justify-center items-center signin'>
                <div className='sm:w-[520px] sm:min-h-[200px] w-full min-h-full p-10 rounded-md bg-[#D85900] shadow-lg relative'>
                    <div className='flex justify-end'>
                        <p className='text-white text-[25px] cursor-pointer' onClick={() => setSigninClick(false)}>X</p>
                    </div>
                    <img src={ thesisaryWord } alt="thesisary" className='mx-auto h-[70px]' />
                    <p className='text-[#ECECEC] text-[15px] text-center'>Sign in to access full documentation of the site</p>

                    <div className='mx-auto sm:w-[60%] flex items-center justify-center p-3 my-14 bg-white rounded-lg cursor-pointer overflow-hidden select-none relative'>
                        <img src={ google } alt="google" className='w-6 h-6 mr-3' />
                        <p className='font-inter font-normal text-[15px]'>Continue with google</p>

                        <div className='w-full h-full absolute left-0 top-0 flex justify-center items-center opacity-0'>
                            <GoogleOAuthProvider clientId='932871422101-n947707985vdci1bnqulmqbjc90j306j.apps.googleusercontent.com'>         
                                <GoogleLogin 
                                    width='3000'
                                    onSuccess={(e: any) => signIn_Google(jwtDecode(e.credential)) }
                                    onError={() => console.log('LOGINN ERROR')}
                                />    
                            </GoogleOAuthProvider>
                        </div>
                    </div>

                    <div className='sm:relative absolute bottom-[20px] left-0 sm:top-2 mb-4 px-5 flex justify-center'>
                        <p className='sm:w-[90%] text-[#ECECEC] text-[15px] text-center'>By continuing you agree to Thesisary’s 
                        <a href='https://privacy-policysthesisary.tiiny.site/' className='font-bold underline text-white cursor-pointer'> Privacy policy </a> 
                        and acknowledge you’ve read our privacy policy</p>
                    </div>
                </div>
            </div>
            :
            ''
        }
    

        {/*____Alert access_____*/}
        {
            accessAlert !== '' ?
            <div className='fixed w-full h-[100vh] bg-black bg-opacity-20 sm:flex sm:px-5 justify-center items-center signin'>
                <div className='sm:w-[560px] sm:min-h-[200px] w-full min-h-full p-10 rounded-md bg-[#D85900] shadow-lg relative'>
                    {
                        accessAlert === 'view' ?
                        <div className='flex justify-end'>
                            <p className='text-white text-[25px] cursor-pointer' onClick={() => setAccessAlert('')}>X</p>
                        </div>
                        :
                        ''
                    }

                    <img src={ thesisaryWord } alt="thesisary" className='mx-auto h-[70px]' />

                    {
                        accessAlert === 'view' ?
                        <p className='text-white text-[15px] text-center'>Oops you must to sign in first to view each documents.</p>
                        :
                        <p className='text-white text-[15px] text-center'>Oops you must to sign in first to access this page! The website will automatically refresh in 5s.</p>
                    }

                    <img src={ alertAccess } alt="accessError" className='mx-auto max-h-[170px] my-10' />

                    {
                        accessAlert === 'timeout' ?
                        <div className='mx-auto w-[90px] h-[90px] rounded-[50%] border-2 flex justify-center items-center'>
                            <p className='text-[25px] text-white'>{countDown}</p>
                        </div>
                        :
                        ''
                    }
                </div>
            </div>
            :
            ''
        }



        {/*____Burger div____*/}
        {
            (menu && innerWidth <= 872 ? 
            <div className='w-full h-[100vh] fixed top-0 bg-black bg-opacity-20 header'>
                <div className='w-[60%] h-full float-right bg-[#2A2A2C] menuBurger'>
                    <p className='text-right text-white text-[25px] font-bold my-5 px-4 cursor-pointer' onClick={ () => setMenu(false) }>X</p>
                    <div className='px-6'>
                        <p onClick={ () => navigationFun('') }
                        className='text-white md:text-[18px] text-[14px] flex items-center mb-7 cursor-pointer txtBurger'><img src={ home } alt="menu" className='w-6 h-6 mr-3'/> Home</p>
                        <p onClick={ () => navigationFun('resources') }
                        className='text-white md:text-[18px] text-[14px] flex items-center mb-7 cursor-pointer txtBurger'><img src={ docsSource } alt="menu" className='w-6 h-6 mr-3' /> Resources</p>
                        <p onClick={ () => navigationFun('about') }
                        className='text-white md:text-[18px] text-[14px] flex items-center mb-7 cursor-pointer txtBurger'><img src={ infoA } alt="menu" className='w-6 h-6 mr-3'/> About</p>
                        <div>
                            {/*____Sign in____*/}
                            {
                            !signIns ?
                            <div onClick={() => setSigninClick(true)}
                                className='flex items-center justify-center p-2 bg-white rounded-lg cursor-pointer overflow-hidden select-none relative'>
                                <img src={ google } alt="google" className='w-6 h-6 mr-3' />
                                <p className='font-inter font-normal text-[14px]'>Sign in with google</p>
                            </div>
                            :
                            ''
                            }
                            
                            {/*____Signed account____*/}
                            {
                                signIns ?
                                <div className='flex items-center justify-center pl-3 bg-[#D85900] rounded-lg cursor-pointer overflow-hidden select-none relative'>
                                    <img src={dataAccount.picture_URI} alt="user" 
                                    className='h-7 rounded-[50%] mr-3 my-2' />
                                    <div className='text-white my-2'>
                                        <p className='font-normal max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis text-[14px]'>Sign in as {dataAccount.givenName}</p>
                                        <p className='-mt-1 font-light max-w-[150px] whitespace-nowrap overflow-hidden overflow-ellipsis text-[12px]'>{dataAccount.email}</p>
                                    </div>
                                    <div className='bg-white flex items-center p-2 ml-3 mr-1 rounded-md'>
                                        <img src={ google } alt="google" className='h-5 relative' />
                                    </div>
                                </div>
                                :
                                ''
                            }
                            

                        </div>
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