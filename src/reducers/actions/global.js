import * as constAction from '@constants/action';

export const actModal = ()=>{
    return {
        type:constAction.MODAL_OPEN
    };
}

export const actLoadingScreen = ()=>{
    return {
        type:constAction.LOADING_SCREEN
    };
}

