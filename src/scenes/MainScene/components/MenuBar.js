import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity,Alert } from 'react-native';
import {connect} from 'react-redux';

import Menu from './style/MenuStyle';
import {NavigationActions,StackActions} from 'react-navigation';
import {LogoutAction} from '../../../services/redux/actions/Login/LoginAction';

class MenuBar extends Component{
    render(){
        return (
            <ScrollView contentContainerStyle={Menu.container} alwaysBounceVertical={false}>
                <View style={Menu.HeaderMenu}>
                    <Image source={require("../../../assets/images/default-background.png")} style={Menu.HeaderMenuImage}/>
                    <View style={Menu.menuAvatar}>
                        <Image source={require("../../../assets/images/user.png")} style={Menu.userAvatar}/>
                    </View>
                    <View style={Menu.menuUser}>
                        <Text style={Menu.textUser}>{this.props.user.name}</Text>
                    </View>
                </View>
                <View style={Menu.listMenu}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate("Main")}} style={Menu.touchItem}>
                            <View style={Menu.menuItem} >
                                <Image source={require("../../../assets/images/home.png")} style={Menu.icon}/>
                                <Text style={Menu.itemText}>Trang chủ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Menu.touchItem}>
                            <View style={Menu.menuItem}>
                                <Image source={require("../../../assets/images/account.png")} style={Menu.icon}/>
                                <Text style={Menu.itemText}>Tài khoản</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Menu.touchItem}>
                            <View style={Menu.menuItem}>
                                <Image source={require("../../../assets/images/receipt.png")} style={Menu.icon}/>
                                <Text style={Menu.itemText}>Hóa đơn</Text>
                            </View>
                        </TouchableOpacity>
                    <View style={Menu.footer}>
                        <TouchableOpacity style={Menu.touchItem}>
                            <View style={Menu.footerItem}>
                                <Text style={Menu.footerText}>Cài đặt</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Menu.touchItem}>
                            <View style={Menu.footerItem}>
                                <Text style={Menu.footerText}>Trợ giúp</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Menu.touchItem}>
                            <View style={Menu.footerItem}>
                                <Text style={Menu.footerText}>Liên Hệ</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={Menu.touchItem} onPress={()=>{this._PressLogout()}}>
                            <View style={Menu.footerItem}>
                                <Image source={require("../../../assets/images/logout.png")} style={Menu.iconFooter}/>
                                <Text style={[Menu.footerText,{color:"red"}]}>Đăng xuất</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }

    LogoutConfirm(){
        var that = this;
        console.log(this.props.user);
        this.props.LogoutAction(this.props.user.jwt_string,function(){
            that.props.navigation.dispatch(StackActions.reset(
                {
                    index: 0,
                    actions: [
                    NavigationActions.navigate({ routeName: 'Gateway'})
                    ]
                }));
        },function(){
            if(that.props.loginError.error == true){
                that.popupError(that.props.loginError.message);
            }
        });
    }

    _PressLogout(){
        var that =this;
        this.props.navigation.closeDrawer();
        Alert.alert(
            'Đăng xuất',
            'Bạn có muốn đăng xuất ?',
            [
              {text: 'Có', onPress: () => that.LogoutConfirm()},
              {text: 'Không', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            ],
            { cancelable: false }
          )
    }

    popupError(message){
        console.log(message);
        Alert.alert(
            'Lỗi',
            message,
            [
              {text: 'OK'}
            ],
            { cancelable: false }
          )
    }
}

function mapStateToProps(state){
    return {
        user:state.user,
        loginError:state.loginError
    };
}

export default connect(mapStateToProps,{
    LogoutAction
})(MenuBar);