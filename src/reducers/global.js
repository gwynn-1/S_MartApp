import * as constAction from '@constants/action';

const initState ={
    s_modal:false,
    loadingScreen:false
};

export const global = (state = initState, action)  => {
    
    switch(action.type) {

        case constAction.MODAL_OPEN:
            return Object.assign({}, state, {...state,s_modal: !(state.s_modal)});
        case constAction.LOADING_SCREEN:
            return Object.assign({}, state, {...state,loadingScreen: !(state.loadingScreen)});
        default:
			return state;
    }
};