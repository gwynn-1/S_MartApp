import {LoadingScreenAction,ErrorAction} from '../AppAction';
import * as typeAction from '../typeAction';
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
                            dispatch(LoadingScreenAction());
                            if(error.response){
                                if(error.response.status == 401 && error.response.data.message ==typeAction.LOGIN_USER_EXISTED){
                                    dispatch(ErrorAction(typeAction.LOGIN_USER_EXISTED));
                                }

                                if(typeof errorAction =="function"){
                                    errorAction();
                                }
                            }
                        });
    };
}