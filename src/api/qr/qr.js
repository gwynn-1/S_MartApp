import client from '@api/client';
import {
    API_BASE_URL
} from '@constants/api';

class ApiQr {
    static getQr(jwt) {
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        return client.get(API_BASE_URL + "/api/qrcode/get",config);
    }

}

export default ApiQr;