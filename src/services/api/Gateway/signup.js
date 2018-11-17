import axios from 'axios';
import RootApi from '../index';

export default class SignupService extends RootApi{
    static postSignup(data){
        var root = this.rootApi;

        return axios.post(root + "gateway/signup",data,{
            validateStatus: function (status) {
              return status < 400; // Reject only if the status code is greater than or equal to 500
            }
          });
    }
}