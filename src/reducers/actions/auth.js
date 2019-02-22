import * as constAction from '@constants/action';

/** Action check login vào app */
export const actCheckLogin = ( callback) => {
    return {
        type: constAction.CHECK_LOGIN,
        payload: {
            callback
        }
    }
}

export const actLogin = (data,callback)=>{
    return {
        type:constAction.LOGIN,
        payload:{
            data,callback
        }
    }
}

export const actSignup = (data,callback)=>{
    return {
        type:constAction.SIGNUP,
        payload:{
            data,callback
        }
    }
}

export const actLogout = (callback)=>{
    return {
        type:constAction.LOGOUT,
        payload:{
            callback
        }
    }
}

export const actSetUser = (user)=>{
    return {
        type: constAction.USER_LOGIN,
        payload: {
            user
        }
    }
}