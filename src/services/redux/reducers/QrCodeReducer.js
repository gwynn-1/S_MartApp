import * as typeAction from '../actions/typeAction';

export default QrCodeReducer= (state = '',action)=>{
    if(action.type === typeAction.GET_QR_CODE){
        return action.qr;
    }
    return state;
}