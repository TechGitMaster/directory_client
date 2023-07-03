import { GET_RESOURCES_SUCC, GET_RESOURCES_ERR, GET_THREE_SUCC, GET_THREE_ERR, GET_TOPOHTERS_SUCC, GET_TOPOTHERS_ERR } from "../Actions";

export const ResourcesTitleCourse = (state = { res:[], countAll: 0, type: 'loading' }, action:any) => {
    switch(action.type){
        case GET_RESOURCES_SUCC:
            return { ...state, res: action.res, countAll: action.countAll, type: 'done' }
        case GET_RESOURCES_ERR:
            return { ...state, res: state.res, countAll: state.countAll, type: 'done' }
        default:
            return { ...state, res: state.res, countAll: state.countAll, type: 'loading' }
    }
}

export const TopThreeeResearch = (state = { res:[], type: 'loading' }, action: any) => {
    switch(action.type){
        case GET_THREE_SUCC:
            return { ...state, res: action.res, type: 'done' }
        case GET_THREE_ERR:
            return { ...state, res: state.res, type: 'done' }
        default:
            return state
    }
}

export const TopOtherResearch = (state = { res: [], type: 'loading' }, action: any) => {
    switch(action.type){
        case GET_TOPOHTERS_SUCC:
            return { ...state, res: action.res, type: 'done' }
        case GET_TOPOTHERS_ERR:
            return { ...state, res: state.res, type: 'done' }
        default:
            return state
    }
}