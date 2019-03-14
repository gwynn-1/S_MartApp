import { StyleSheet, Dimensions } from 'react-native';
import * as constSts from '@constants/style';

export default receiptSts = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: constSts.COLOR_GRAY_SUPER_THIN,
    },
    vHeader: {
        paddingHorizontal: 15,
        paddingBottom: 10,
        paddingTop: 5,
        backgroundColor: constSts.COLOR_WHITE,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
    },
    vHeaderField: {
        flexDirection: 'row',
        marginTop: 10,
    },
    vIcon: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtHeader: {
        fontSize: 15,
        color: constSts.COLOR_MAIN,
        fontWeight: "bold"
    },
    vContent: {
        flex: 1,
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
    vListItem: {
        backgroundColor: constSts.COLOR_WHITE,
        paddingHorizontal: 15,
        marginBottom:10,
    },
    vItemText: {
        maxWidth: "70%"
    },
    txtProduct: {
        marginBottom: 5,
        fontSize: 14,
        color: constSts.COLOR_BLACK,
        fontWeight: "bold"
    },
    txtInfo: {
        fontSize: 12,
        color: constSts.COLOR_GRAY,
    },
    vListContent: {
        flexDirection: "row",
        paddingVertical: 15,
        borderBottomColor: constSts.COLOR_VIOLET_THIN,
        borderBottomWidth: 0.8
    },
    vItemPrice: {
        justifyContent: "center",
        alignItems: "flex-end",
        flex: 1
    },
    txtItemPrice: {
        fontSize: 16,
        color: constSts.COLOR_RED,
        fontWeight: "bold"
    },
    txtStatus: {
        color: constSts.COLOR_WHITE,
        fontSize: 12,
    },
    vStatusField: {
        flexDirection: "row",
        alignItems: "center"
    },
    vStatus: {
        borderRadius: 3,
        paddingHorizontal: 5,
        marginLeft: 5,
    },
    vReceiptDetail: {
        backgroundColor: '#fff',
        paddingHorizontal:15
    },
    vDetailContent:{
        flexDirection:"row",
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
        paddingVertical:15
    },
    imgProduct:{
        width:70,
        height:70,
        borderRadius:5
    },
    vProDetail:{
        marginHorizontal:15,
        flexWrap: 'wrap',
    },
    txtProHeader:{
        fontSize: 15,
        color:constSts.COLOR_BLACK,
        fontWeight:"bold"
    },
    txtProDetail:{
        fontSize: 12,
        color:constSts.COLOR_GRAY,
    },
    txtMerchan:{
        fontSize: 12,
        color:constSts.COLOR_BLUE
    },
    txtSmallPrice:{
        fontSize: 12,
        color:constSts.COLOR_RED
    },
    vLoading:{
        position: 'absolute', 
        backgroundColor: constSts.COLOR_WHITE,
        bottom: 0, 
        width: '100%'
    }
})