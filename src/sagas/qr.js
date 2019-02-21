import { all, call, put, takeLatest,select } from 'redux-saga/effects';
import * as constAction from '@constants/action';
import * as constApi from '@constants/api';
import { apiGetQr } from '@api/qr';
import {actLoadQr} from '@reducers/actions/qr';

export function* qrRoot() {
    yield all([
        takeLatest(constAction.GET_QR, getQr),
    ]);
}

export function* getQr(action){
    const callback = action.payload.callback;
    var user = (yield select((state) => state.auth)).user;
    // console.log(user);
    const jwt = user.jwt_string;

    const resp = yield call(apiGetQr,jwt);
    if(resp.qr_image !=undefined){
        yield put(actLoadQr(resp.qr_image));
    }

    if(callback !=null){
        callback();
    }
}