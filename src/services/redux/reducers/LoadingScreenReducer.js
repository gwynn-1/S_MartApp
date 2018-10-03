import * as typeAction from '../actions/typeAction';

export default LoadingScreenReducer= (state = false,action)=>{
    if(action.type === typeAction.LOADING_SCREEN){
        return !state;
    }
    return state;
}