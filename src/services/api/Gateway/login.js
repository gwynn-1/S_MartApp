import axios from 'axios';
import RootApi from '../index';

export default class LoginService extends RootApi{
    static postLogin(data){
        var root = this.rootApi;

        return axios.post(root + "gateway/login",data);
    }

    static postCheckLogin(data){
        return axios.post(this.rootApi + "gateway/check-login",data);
    }

    static postLogout(jwt){
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        return axios.post(this.rootApi + "gateway/logout",{},config);
    }
}