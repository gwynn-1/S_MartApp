import axios from 'axios'

const client = axios.create();
client.defaults.timeout = 5500;
client.defaults.baseURL = "https://s-martapp.herokuapp.com/api/";
// client.interceptors.response.use(null,function(error){
//     console.log(error);
// })

export default client;