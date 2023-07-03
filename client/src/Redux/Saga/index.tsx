import { takeEvery, call, put, all} from 'redux-saga/effects';
import { GET_RESOURCES, GET_RESOURCES_SUCC, GET_RESOURCES_ERR, GET_THREE_RESOURCE, GET_THREE_ERR, GET_THREE_SUCC, GET_TOPOTHERS_RESOURCE, GET_TOPOTHERS_ERR, GET_TOPOHTERS_SUCC } from "../Actions";
import axios from 'axios';


function* ResourcesTitleCourses({ condition, titleCourse, skip }: any){
    try{
        let obj = {
            method: 'GET',
            url: 'https://directory-client-server.vercel.app/getBy_CourseTitle',
            params: { condition: condition, titleCourse: titleCourse, skip: skip /* use this when your method is GET */},
            data: { /* use this when your method is POST */ },
            headers: {
                'Content-Type': 'application/json'
            },
        } as any;

    
        const { data } = yield call(axios, obj, { withCredentials: true });
        
        if(data.success){
            yield all([put({ res: data.data, countAll: data.countAll, type: GET_RESOURCES_SUCC })])
        }else{
            yield put({ res: 'error', type: GET_RESOURCES_ERR }); 
        }
    }catch(error){
        yield put({ res: 'error', type: GET_RESOURCES_ERR });
    }
}


function* TopThreeeResearchs({ type }: any){
    try{
        let obj = {
            method: 'GET',
            url: 'https://directory-client-server.vercel.app/getTopTreeResources',
            params: { /* This is for GET request */ },
            data: { /* this is for POST request */ },
            headers: {
                'Content-type': 'application/json'
            }
        } as any;

        const { data } = yield call(axios, obj, { withCredentials: true });

        if(data.success){
            yield put({ res: data.data, type: GET_THREE_SUCC });
        }else{
            yield put({ type: GET_THREE_ERR });
        }

    }catch(error){
        yield put({ type: GET_THREE_ERR });
    }
}


function* TopOtherResearchs({ type }: any){
    try{
        let obj = {
            method: 'GET',
            url: 'https://directory-client-server.vercel.app/getTopOthersResources',
            params: { /* This is for GET request */ },
            data: { /* this is for POST request */ },
            headers: {
                'Content-type': 'application/json'
            }
        } as any;

        const { data } = yield call(axios, obj, { withCredentials: true });

        if(data.success){
            yield put({ res:data.data, type: GET_TOPOHTERS_SUCC });
        }else{
            yield put({ type: GET_TOPOTHERS_ERR });
        }

    }catch(error){
        yield put({ type: GET_TOPOTHERS_ERR });
    }
}



export function* saga1(){
    yield takeEvery(GET_RESOURCES, ResourcesTitleCourses);

    yield takeEvery(GET_THREE_RESOURCE, TopThreeeResearchs);
    yield takeEvery(GET_TOPOTHERS_RESOURCE, TopOtherResearchs);
}