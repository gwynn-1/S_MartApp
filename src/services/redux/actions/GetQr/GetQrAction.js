import QrCodeService from '../../../api/QrCode/QrCode';
import { QrCodeAction } from '../AppAction';


export function GetQrAction(jwt){
    return (dispatch)=>{
        QrCodeService.getQrCode(jwt)
                    .then(function(res){
                        dispatch(QrCodeAction(res.data.qr_image));
                    }).catch(function(error){
                        console.log(error);
                        if (!error.status) {
                            // network error
                            dispatch(ErrorAction("error_connection"));
                        }
                    });
    };
}