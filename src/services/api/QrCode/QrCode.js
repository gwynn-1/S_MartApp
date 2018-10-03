


import axios from 'axios';
import RootApi from '../index';

export default class QrCodeService extends RootApi{
    static getQrCode(jwt){
        var config = {
            headers: {'Authorization': "Bearer " + jwt}
        };
        return axios.get(this.rootApi + "qrcode/get",config);
    }
}