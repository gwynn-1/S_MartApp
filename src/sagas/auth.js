import { all, call, put, takeLatest,select } from 'redux-saga/effects';
import { AsyncStorage } from "react-native";
import * as constAction from '@constants/action';
import * as constApi from '@constants/api';
import { actSetUser } from '@reducers/actions/auth';
import { actError } from '@reducers/actions/error';
import { actLoadingScreen } from '@reducers/actions/global';
import { apiLogin, apiRegister, apiCheckLogin, apiLogout } from '@api/auth';

export function* authRoot() {
    yield all([
        takeLatest(constAction.CHECK_LOGIN, checkLogin),
        takeLatest(constAction.LOGIN, login),
        takeLatest(constAction.LOGOUT, logout),
    ]);
}

export function* logout(action) {
    const callback = action.payload.callback;
    const user = (yield select((state) => state.auth)).user;

    yield put(actLoadingScreen());
    try {
        const jwt = user.jwt_string;
        const resp = yield call(apiLogout, jwt);

        if (resp.status == constApi.API_SUCCESS) {
            yield put(actSetUser({
                jwt_string: "",
                username: "",
                name: ""
            }));

            yield call(async function () {
                await AsyncStorage.removeItem('user');
            });
        }
        callback(1);
    } catch (error) {
        if (error.response != undefined) {

        } else {
            // console.log(error);
            yield put(actError(constAction.ERROR_CONNECTION));
        }
    } finally {
        yield put(actLoadingScreen());
    }
}

export function* login(action) {
    const data = action.payload.data;
    const callback = action.payload.callback;

    yield put(actLoadingScreen());
    try {
        const resp = yield call(apiLogin, data);

        // console.log(resp);
        if (resp.status == constApi.API_SUCCESS) {
            yield put(actSetUser(resp.data));
            yield call(async function () {
                return await AsyncStorage.setItem('user', JSON.stringify(resp.data));
            });
        }

        callback(1);
    } catch (error) {
        if (error.response != undefined) {
            const data = error.response.data;
            // console.log(data);
            yield put(actError(data.message));
        } else {
            console.log(error);
            yield put(actError(constAction.ERROR_CONNECTION));
        }
    } finally {
        yield put(actLoadingScreen());
    }
}

export function* checkLogin(action) {
    // yield call(async function(){
    //     await AsyncStorage.removeItem('user');
    // });
    const payload = action.payload;
    const callback = payload.callback;
    try {
        const user = yield call(async function () {
            // await AsyncStorage.removeItem('cart');
            var user = await AsyncStorage.getItem('user');
            if (user != null) {
                return JSON.parse(user);
            } else
                return null;
        });

        console.log(user)
        if (user != null) {
            const resp = yield call(apiCheckLogin, { user_name: user.username });

            if (resp.status == constApi.API_SUCCESS) {
                yield put(actSetUser(resp.data));
                yield call(async function () {
                    return await AsyncStorage.setItem('user', JSON.stringify(resp.data));
                });
            }
            callback(1);
        }else{
            callback(0);
        }
        
    } catch (error) {
        // console.log(error);
        if (error.response != undefined) {

        } else {
            yield put(actError(constAction.ERROR_CONNECTION));
        }
        callback(0);
    }
}
