import { StyleSheet, Dimensions } from 'react-native';
import * as constSts from '@constants/style';

export default receiptSts = StyleSheet.create({
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
    vIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtHeader:{
        fontSize: 15,
        color:constSts.COLOR_MAIN,
        fontWeight:"bold"
    },
    vContent:{
        flex:1,
    },
})