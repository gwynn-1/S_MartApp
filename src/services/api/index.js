import axios from 'axios';

const rootApi = "https://s-martapp.herokuapp.com/api/";

export default class RootApi {
    static get rootApi() {
        return rootApi;
    }

    static checkConnection(){
        return axios.post(this.rootApi + "check-connection",{});
    }
}