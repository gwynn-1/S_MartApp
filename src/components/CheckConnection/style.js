import {StyleSheet,Dimensions} from 'react-native';


var screenWidth=Dimensions.get("window").width;
export default ccStyle = StyleSheet.create({
    container:{
        width:200,
        height:20,
        position:"absolute",
        left:(screenWidth/2)-100,
        top:0,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent:"center",
        zIndex:5,
    },
    text:{
        color:"#ffffff",
        fontSize: 12,
    }
});