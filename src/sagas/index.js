import { fork, all } from 'redux-saga/effects';
import { authRoot } from '@sagas/auth';
import { qrRoot } from '@sagas/qr';
import { globalRoot } from '@sagas/global';

function* rootSaga() {
    
    yield all([
        yield fork(authRoot),
        yield fork(qrRoot),
        yield fork(globalRoot),
    ]);
}

export default rootSaga;