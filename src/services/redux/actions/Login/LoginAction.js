import * as typeAction from '../typeAction';
import {LoadingScreenAction,ErrorAction,UserAction} from '../AppAction';
import LoginService from '../../../api/Gateway/login';
import {_storeUser,_getUser,_removeUser} from '../../../asyncStorage/index';

export function LoginAction(data,success,errorAction){
    return (dispatch)=>{
        dispatch(LoadingScreenAction());
        console.log("start")
        LoginService.postLogin(data)
                    .then(function(res){
                        dispatch(LoadingScreenAction());
                        if(res.data.status=="success"){
                            console.log("success");
                            dispatch(UserAction(res.data.data));
                            _storeUser(res.data.data);
                            if(typeof success =="function"){
                                success();
                            }
                        }
                    }).catch(function (error) {
                        // handle error
                        // console.log(error);
                        dispatch(LoadingScreenAction());
                        if (!error.response) {
                            // network error
                            dispatch(ErrorAction(typeAction.ERROR_CONNECTION));
                        }else{
                            if(error.response.status == 401){
                                switch(error.response.data.message){
                                    case typeAction.INACTIVE_USER : 
                                        dispatch(ErrorAction(typeAction.INACTIVE_USER));
                                        break;
                                    case typeAction.LOGIN_USER_NOT_EXIST:
                                        dispatch(ErrorAction(typeAction.LOGIN_USER_NOT_EXIST));
                                        break;
                                    case typeAction.LOGIN_WRONG_PASSWORD:
                                        dispatch(ErrorAction(typeAction.LOGIN_WRONG_PASSWORD));
                                        break;
                                    default:break;
                                }
                            }
                        }

                        if(typeof errorAction == "function"){
                            errorAction();
                        }
                    });
    };
}

export function checkLoginAction(data,success,errorAction){
    return (dispatch)=>{
        LoginService.postCheckLogin(data)
        .then(function(res){
            if(res.data.status=="success"){
                console.log("success");
                dispatch(UserAction(res.data.data));
                _storeUser(res.data.data);
                if(typeof success =="function"){
                    success();
                }
            }
        }).catch(function(error){
            console.log(error);
            if (!error.response) {
                // network error
                dispatch(ErrorAction(typeAction.ERROR_CONNECTION));
            }

            if(typeof errorAction == "function"){
                errorAction();
            }
        });
    };
}

export function LogoutAction(jwt,success,errorAction){
    return (dispatch)=>{
        dispatch(LoadingScreenAction());
        console.log(jwt);
        LoginService.postLogout(jwt)
                    .then(function(res){
                        dispatch(LoadingScreenAction());
                        if(res.data.status=="success"){
                            console.log("success");
                            dispatch(UserAction({
                                jwt_string:"",
                                username:"",
                                name:""
                            }));
                            _removeUser();
                            if(typeof success =="function"){
                                success();
                            }
                        }
                    }).catch(function(error){
                        console.log(error)
                        dispatch(LoadingScreenAction());
                        if (!error.status) {
                            // network error
                            dispatch(ErrorAction(typeAction.ERROR_CONNECTION));
                        }
                        if(typeof errorAction == "function"){
                            errorAction();
                        }
                    });
    };
}