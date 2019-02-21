import * as constAction from '@constants/action';

const initState = {
    qr:""
}

export const qr = (state = initState, action)  => {
    switch(action.type) {
        case constAction.LOAD_QR:
            return loadQr(action, state);
        default:
			return state;
    }
};

const loadQr = (action, state) => {
    // console.log(action.payload);
    return Object.assign({}, state, {
        qr: action.payload.qr,
    });
}