import { StyleSheet, Dimensions } from 'react-native';
import * as constSts from '@constants/style';

export default noteSts = StyleSheet.create({
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
    btnAdd:{
        position:"absolute",
        right:20,
        bottom:20,
        width:60,
        height:60,
        borderRadius: 30,
        backgroundColor:constSts.COLOR_MAIN,
        justifyContent: 'center',
        alignItems: 'center',
    }
})