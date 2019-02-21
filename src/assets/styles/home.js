import { StyleSheet, Dimensions } from 'react-native';
import * as constSts from '@constants/style';

var screenWidth=Dimensions.get("window").width;

export default homeSts = StyleSheet.create({
    body:{
        // flex: 1,
        backgroundColor:"#ffffff",
        paddingBottom: 80,
    },
    container:{
        backgroundColor:"#ffffff",
        height:"100%"
    },
    bodyText:{
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50,
    },
    text:{
        fontSize: 28,
        color:"#000000",
        fontWeight: 'bold',
    },
    imgBody:{
        alignItems: 'center',
        height:screenWidth-100
    },
    img:{
        width: screenWidth-100, height: screenWidth-100, borderWidth: 1, borderColor: '#000000',borderRadius: 10,
    },
    footer:{
        position:"absolute",
        height:25,
        width:"100%",
        bottom:0,
        left:0,
        backgroundColor:"#b3b3b3",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        justifyContent:"center"
    },
    btnFooter:{
        alignItems: 'center',
        justifyContent:"center",
        width:"100%"
    },
    footerText:{
        fontSize:12,
        color:"#212121",
        fontWeight:"bold"
    }
})