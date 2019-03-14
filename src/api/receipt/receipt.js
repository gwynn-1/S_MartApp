import client from '@api/client';
import {
    API_BASE_URL
} from '@constants/api';

class ApiReceipt {
    static GetReceipt(jwt,page,id) {
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        if(id != "" && page ==null){
            return client.get(API_BASE_URL + "/api/receipt/"+id,config);
        }else{
            return client.get(API_BASE_URL + "/api/receipt?page="+page,config);
        }
    }
}

export default ApiReceipt;