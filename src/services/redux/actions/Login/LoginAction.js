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
                        }else if(res.data.status=="error"){
                            console.log("error");
                            if(res.data.message == "User không tồn tại"){
                                dispatch(ErrorAction("user_not_exist"));
                            }else if(res.data.message == "Sai mật khẩu"){
                                dispatch(ErrorAction("wrong_password"));
                            }

                            if(typeof errorAction == "function"){
                                errorAction();
                            }
                        }
                    }).catch(function (error) {
                        // handle error
                        // console.log(error);
                        dispatch(LoadingScreenAction());
                        if (!error.status) {
                            // network error
                            dispatch(ErrorAction("error_connection"));
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
            }else if(res.data.status=="error"){
                if(res.data.message == "User chưa đăng nhập"){
                    if(typeof errorAction == "function"){
                        errorAction();
                    }
                }
            }
        }).catch(function(error){
            console.log(error);
            if (!error.status) {
                // network error
                dispatch(ErrorAction("error_connection"));
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
                        }else if(res.data.status=="error"){

                            if(typeof errorAction == "function"){
                                errorAction();
                            }
                        }
                    }).catch(function(error){
                        console.log(error)
                        dispatch(LoadingScreenAction());
                        if (!error.status) {
                            // network error
                            dispatch(ErrorAction("error_connection"));
                        }
                        if(typeof errorAction == "function"){
                            errorAction();
                        }
                    });
    };
}