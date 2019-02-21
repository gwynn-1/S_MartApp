import * as constAction from '@constants/action';

/** Action check login vào app */
export const actGetQr = (callback=null) => {
    return {
        type: constAction.GET_QR,
        payload: {
            callback
        }
    }
}

export const actLoadQr = (qr) => {
    return {
        type: constAction.LOAD_QR,
        payload: {
            qr
        }
    }
}