import axios from 'axios'

const client = axios.create();
client.defaults.timeout = 5500;
client.defaults.baseURL = "http://66.42.56.163:8000";
// client.interceptors.response.use(null,function(error){
//     console.log(error);
// })

export default client;