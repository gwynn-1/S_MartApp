import {StyleSheet,Dimensions} from 'react-native';

const win = Dimensions.get('window');
export default LoginStyles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        width:win.width -15,
        height:win.height - 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignItems:"center"
    },
    userImage:{
        width: 90,
        height:90,
        borderRadius: 45
    },
    imageContainer:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        
    },
    formLogin:{
        width:'80%',
        // backgroundColor:"yellow",
        marginTop:80,
    },
    textBox:{
        marginBottom: 20,
    },
    buttonLogin:{
        marginTop: 15,
    },
    textLogin:{
        color:"#ffffff",
        fontSize: 20,
        fontWeight: 'bold',
        
    },
    buttonSignup:{
        marginTop: 10,
        backgroundColor:"#a5a5a5"        
    },
    textSignup:{
        fontSize: 16
    },
    textForget:{
        color:"#74C9F1",
        fontSize:12,
        fontWeight: 'bold',
        textAlign:"center",
        marginTop: 10,
    }
  });
  