import * as typeAction from '../actions/typeAction';

var initUser = {
    jwt_string:"",
    username:"",
    name:""
};

export default UserReducer= (state = initUser,action)=>{
    if(action.type === typeAction.PUSH_APP_USER){
        return action.payload;
    }
    return state;
}