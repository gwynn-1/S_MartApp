import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import LoadingScreenReducer from './reducers/LoadingScreenReducer';
import LoginErrorReducer from './reducers/LoginErrorReducer';
import UserReducer from './reducers/UserReducer';
import QrCodeReducer from './reducers/QrCodeReducer';


const reducer =  combineReducers({
    loadingScreen:LoadingScreenReducer,
    loginError:LoginErrorReducer,
    user:UserReducer,
    qrcode:QrCodeReducer
});

export default store =  createStore(reducer,applyMiddleware(thunk));