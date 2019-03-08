import client from '@api/client';
import {
    API_BASE_URL
} from '@constants/api';

class ApiAuth {
    static Login(body) {
        return client.post(API_BASE_URL + "/api/gateway/login",body);
    }

    static Register(body) {
        return client.post(API_BASE_URL +"/api/gateway/signup",body);
    }

    static Logout(jwt){
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        return client.post(API_BASE_URL + "/api/gateway/logout",{},config);
    }

    static CheckLogin(body){
        return client.post(API_BASE_URL + "/api/gateway/check-login",body);
    }
}

export default ApiAuth;