import {LoadingScreenAction,ErrorAction,UserAction} from '../AppAction';
import SignupService from '../../../api/Gateway/signup';

export function SignupAction(data,success,errorAction){
    return (dispatch)=>{
        dispatch(LoadingScreenAction());
        console.log("start");

        SignupService.postSignup(data)
                        .then(function(res){
                            dispatch(LoadingScreenAction());

                            if(res.status == 200 && res.data.status =="success"){
                                if(typeof success =="function"){
                                    success();
                                }
                            }
                        })
                        .catch(function(error){
                            if(error.response){
                                if(error.response.status == 401 && error.response.data.message == "Thông tin tài khoản đã tồn tại"){
                                    dispatch(ErrorAction("user_existed"));
                                }

                                if(typeof errorAction =="function"){
                                    errorAction();
                                }
                            }
                        });
    };
}