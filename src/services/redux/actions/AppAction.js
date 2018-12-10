import * as typeAction from './typeAction';

export function LoadingScreenAction(){
    return {type:typeAction.LOADING_SCREEN};
}

export function ErrorAction(error_type){
    switch(error_type){
        case typeAction.ERROR_CONNECTION : 
            return {type:typeAction.ERROR_CONNECTION};
        case typeAction.LOGIN_WRONG_PASSWORD:
            return {type:typeAction.LOGIN_WRONG_PASSWORD};
        case typeAction.LOGIN_USER_NOT_EXIST:
            return {type:typeAction.LOGIN_USER_NOT_EXIST};
        case typeAction.LOGIN_USER_EXISTED:
            return {type:typeAction.LOGIN_USER_EXISTED};
        case typeAction.INACTIVE_USER:
            return {type:typeAction.INACTIVE_USER};
        default:
            return {type:""};
    }
}

export function UserAction(data){
    return {type:typeAction.PUSH_APP_USER , payload:data};
}

export function QrCodeAction(qrcode){
    return {type : typeAction.GET_QR_CODE,qr:qrcode};
}

export function ModalAction(){
    return {type:typeAction.MODAL_OPEN};
}