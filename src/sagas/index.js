import { fork, all } from 'redux-saga/effects';
import { authRoot } from '@sagas/auth';
import { qrRoot } from '@sagas/qr';

function* rootSaga() {
    
    yield all([
        yield fork(authRoot),
        yield fork(qrRoot),
    ]);
}

export default rootSaga;