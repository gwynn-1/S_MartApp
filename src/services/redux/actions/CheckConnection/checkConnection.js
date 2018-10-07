import RootApi from '../../../api/index';
import {ErrorAction} from '../AppAction';

export function checkConnection(success){
    return (dispatch)=>{
        RootApi.checkConnection()
                .then(function(res){
                    if(res.data.status=="success"){
                        dispatch(ErrorAction(""));
                        if(typeof success =="function"){
                            success();
                        }
                    }
                }).catch(function(error){
                    console.log(error);
                    if (!error.status) {
                        // network error
                        dispatch(ErrorAction("error_connection"));
                    }
                });
    };
}