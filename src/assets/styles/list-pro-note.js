import { StyleSheet, Dimensions } from 'react-native';
import * as constSts from '@constants/style';
var screenWidth=Dimensions.get("window").width;

export default lsProNoteSts = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:constSts.COLOR_GRAY_SUPER_THIN,
    },
    vHeader:{
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 5,
        backgroundColor:constSts.COLOR_WHITE,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
    },
    vHeaderField:{
        flexDirection: 'row',
        marginTop: 10,
    },
    txtHeader:{
        fontSize: 15,
        color:constSts.COLOR_MAIN,
        fontWeight:"bold"
    },
    vContent:{
        flex:1,
    },
    vBody:{
        flex:1
    },
    vPersonal: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: constSts.COLOR_MAIN,
        width: 180
    },
    txtPersonal: {
        fontSize: 14,
        color: constSts.COLOR_BLACK,
        fontWeight: "bold"
    },
    vSearchBar:{
        backgroundColor:constSts.COLOR_WHITE,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
        paddingVertical:20,
        paddingHorizontal:15,
        flexDirection:"row",
        justifyContent: 'space-between',
    },
    textBox:{
        borderColor:constSts.COLOR_GRAY,
        borderRadius:8,
        paddingHorizontal:10,
        fontSize:14,
        // flex:1,
        width:screenWidth-80,
        marginRight: 5,
    },
    btnSearch:{
        width:40,
        marginLeft: 5,
        backgroundColor:constSts.COLOR_MAIN,
        borderRadius:5,
        alignItems: 'center',
        paddingVertical:5
    },
    vProductList:{
        flex:1
    },
    txtProType:{
        fontSize: 14,
        color: constSts.COLOR_BLACK,
        fontWeight: "bold"
    },
    vProType:{

    },
    vPro:{
        backgroundColor:constSts.COLOR_WHITE
    },
    vProItem:{
        backgroundColor:constSts.COLOR_WHITE,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
        paddingVertical:20,
        paddingHorizontal:15,
        flexDirection:"row",
    }
})