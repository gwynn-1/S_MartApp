import * as typeAction from '../actions/typeAction';

var initError = {
    error:false,
    message:""
};

export default LoginErrorReducer= (state = initError,action)=>{
    switch(action.type){
        case typeAction.ERROR_CONNECTION:
            return {
                error:true,
                message:"Không thể kết nối mạng. Xin hãy thử lại"
            };
        case typeAction.LOGIN_WRONG_PASSWORD:
            return {
                error:true,
                message:"Bạn đã nhập sai mật khẩu. Xin hãy thử lại"
            };
        case typeAction.LOGIN_USER_NOT_EXIST:
            return {
                error:true,
                message:"Tài khoản không tồn tại. Xin hãy thử lại"
            };
            case typeAction.LOGIN_USER_EXISTED:
            return {
                error:true,
                message:"Thông tin tài khoản đã tồn tại."
            };
        default: return state;
    }
    return state;
}