import axios from 'axios'

const client = axios.create();
client.defaults.timeout = 5500;
client.defaults.baseURL = "http://139.59.237.230:8000/api";
// client.interceptors.response.use(null,function(error){
//     console.log(error);
// })

export default client;