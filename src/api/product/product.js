import client from '@api/client';
import {
    API_BASE_URL
} from '@constants/api';

class ApiProduct {
    static GetProduct(search = "") {
        
        return client.get(API_BASE_URL + "/api/product/get"+((search!="") ? "?s="+search:""));
    }
}

export default ApiProduct;