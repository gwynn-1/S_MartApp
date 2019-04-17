import { StyleSheet, Dimensions } from 'react-native';
import * as constSts from '@constants/style';

export default addNoteSts = StyleSheet.create({
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
    vBody:{
        flex:1
    },
    textBox:{
        borderColor:constSts.COLOR_GRAY,
        borderRadius:8,
        paddingHorizontal:10,
        fontSize:14,
        marginBottom: 15,
    },
    vLabel:{
        flex:1,
        paddingVertical:5,
    },
    txtLabel:{
        fontSize:13,
        color:constSts.COLOR_VIOLET_THIN
    },
    vReminder:{
        backgroundColor:constSts.COLOR_WHITE,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
        paddingVertical:20,
        paddingHorizontal:15
    },
    btnReminder:{
        borderColor:constSts.COLOR_GRAY,
        borderWidth:1,
        borderRadius:8,
        paddingHorizontal:10,
        paddingVertical:5,
        marginBottom: 15,
        flexDirection:"row",
        alignItems: 'center',
    },
    vDateTime:{
        flexDirection:"row"
    },
    vDay:{
        flex:1,
        marginRight: 5,
    },
    vHour:{
        flex:1,
        marginLeft: 5,
    },
    txtReminderTime:{
        fontSize:14,
        color:constSts.COLOR_BLACK,
        marginLeft:5
    },
    vProPick:{
        paddingVertical:20,
        paddingHorizontal:15,
        alignItems: 'flex-end',
    },
    btnProPick:{
        flexDirection:"row",
        paddingHorizontal:10,
        width:180,
        justifyContent:"center"
    },
    txtProPick:{
        color:constSts.COLOR_WHITE,
        fontSize:14,
        marginLeft:5
    },
    vProList:{
        backgroundColor:constSts.COLOR_WHITE,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
        paddingVertical:20,
        paddingHorizontal:15
    },
    vNoPro:{
        alignItems:"center",
        justifyContent:"center",
        paddingVertical:15
    },
    txtNoPro:{
        color:constSts.COLOR_GRAY,
        fontSize:14,
    }
})