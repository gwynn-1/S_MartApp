import {createStore,combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import LoadingScreenReducer from './reducers/LoadingScreenReducer';
import LoginErrorReducer from './reducers/LoginErrorReducer';
import UserReducer from './reducers/UserReducer';
import QrCodeReducer from './reducers/QrCodeReducer';
import ModalReducer from './reducers/ModalReducer';



const reducer =  combineReducers({
    loadingScreen:LoadingScreenReducer,
    modalOpen:ModalReducer,
    loginError:LoginErrorReducer,
    user:UserReducer,
    qrcode:QrCodeReducer
});

export default store =  createStore(reducer,applyMiddleware(thunk));