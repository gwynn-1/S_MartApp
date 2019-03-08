import { StyleSheet  } from 'react-native';
import * as constSts from '@constants/style';


export default accountSts = StyleSheet.create({
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
    vAvatar:{
        backgroundColor:constSts.COLOR_WHITE,
        justifyContent:"center",
        alignItems:"center",
        paddingVertical: 10,
        marginTop:10,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
    },
    imgAvatar:{
        width:120,
        height:120,
        borderRadius:60
    },
    imgAvatarContain:{
        flex: 1,
        height: 150,
    },
    closeImg:{
        fontSize:16,
        color:constSts.COLOR_VIOLET_THIN
    },
    btnCloseImg:{
        paddingHorizontal:10,
        paddingVertical:15
    },
    vHeaderImg:{
        width:"100%",
        flex:1,
        flexDirection:"row",
        justifyContent:"space-between",
        borderBottomWidth:1,
        borderBottomColor:constSts.COLOR_GRAY
    },
    btnAvatar:{
        width:140,
        height:140,
        borderRadius:70,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor: constSts.COLOR_GRAY
    },
    vUserInfo:{
        backgroundColor:constSts.COLOR_WHITE,
        marginTop:10,
        borderBottomColor: constSts.COLOR_GRAY_THIN,
        borderBottomWidth: 1,
        paddingVertical:20,
        paddingHorizontal:15
    },
    vLabel:{
        flex:1,
        paddingVertical:5,
    },
    txtLabel:{
        fontSize:13,
        color:constSts.COLOR_VIOLET_THIN
    },
    textBox:{
        borderColor:constSts.COLOR_GRAY,
        borderRadius:8,
        paddingHorizontal:10,
        fontSize:14,
        marginBottom: 15,
    },
    vGender:{
        flexDirection:"row",
        flex:1,
        marginBottom:15
    },
    textLogin:{
        color:constSts.COLOR_WHITE,
        fontSize: 18,
        fontWeight: 'bold',
    },
    btnChange:{
        marginVertical:20,
        marginHorizontal: 15,
    },
    vLocation:{
        flexDirection:"row",
        marginBottom:15
    },
    vProvince:{
        flex:1,
    },
    vDistrict:{
        flex:1,
        marginHorizontal:5,
    },
    vWard:{
        flex:1,
        
    },
    txtSelect:{
        fontSize:14,
        textAlign:"left",
        color:constSts.COLOR_BLACK
    },
    vSelect:{
        paddingHorizontal:5,
        paddingVertical:8,
        borderColor:constSts.COLOR_GRAY,
        borderWidth:1,
        borderRadius:8,
    }
})