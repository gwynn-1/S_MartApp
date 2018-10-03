import { AsyncStorage } from "react-native"

export async function _storeUser(userinfo){
    try {
      await AsyncStorage.setItem('user', JSON.stringify(userinfo));
    } catch (error) {
      // Error saving data
      console.log(error);
    }
}

export const _removeUser = async ()=>{
    try {
        await AsyncStorage.removeItem('user');
      } catch (error) {
        // Error saving data
        console.log(error);
      }
}

export const _getUser = async (callback)=>{
    try {
        const value = await AsyncStorage.getItem('user').then(function(value){
            if(typeof callback == "function"){
                callback(value);
            }
        });
    } catch (error) {
        // Error retrieving data
        console.log(error);
    }
}