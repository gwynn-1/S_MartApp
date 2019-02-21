import { combineReducers } from 'redux';
import { global } from '@reducers/global';
import { auth } from '@reducers/auth';
import { qr } from '@reducers/qr';
import { error } from '@reducers/error';

const rootReducer = combineReducers({
    global,
    auth,
    qr,
    error
});

export default rootReducer;