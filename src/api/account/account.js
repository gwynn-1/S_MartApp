import client from '@api/client';
import {
    API_BASE_URL
} from '@constants/api';

class ApiAccount {
    static GetUser(jwt) {
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        return client.get(API_BASE_URL + "/api/user/get",config);
    }

    static UpdateUser(body,jwt){
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        return client.post(API_BASE_URL + "/api/user/update",body,config);
    }

    static UpdateUserAvater(body,jwt){
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        return client.post(API_BASE_URL + "/api/user/update-avatar",body,config);
    }
}

export default ApiAccount;