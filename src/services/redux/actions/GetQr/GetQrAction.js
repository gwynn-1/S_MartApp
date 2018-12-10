import QrCodeService from '../../../api/QrCode/QrCode';
import { QrCodeAction,ErrorAction } from '../AppAction';


export function GetQrAction(jwt,errorAction,success=null){
    return (dispatch)=>{
        QrCodeService.getQrCode(jwt)
                    .then(function(res){
                        dispatch(QrCodeAction(res.data.qr_image));
                        if(success != null && typeof success == "function"){
                            success();
                        }
                    }).catch(function(error){
                        console.log(error);
                        if (!error.status) {
                            // network error
                            dispatch(ErrorAction(typeAction.ERROR_CONNECTION));
                            if(typeof errorAction == "function"){
                                errorAction();
                            }
                        }
                    });
    };
}