import * as typeAction from '../actions/typeAction';

export default ModalReducer= (state = false,action)=>{
    if(action.type === typeAction.MODAL_OPEN){
        return !state;
    }
    return state;
}