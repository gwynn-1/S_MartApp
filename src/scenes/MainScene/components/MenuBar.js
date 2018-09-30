import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity } from 'react-native';
import Menu from './style/MenuStyle';

export default class MenuBar extends Component{
    render(){
        return (
            <ScrollView contentContainerStyle={Menu.container}>
                <View style={Menu.HeaderMenu}>
                    <Image source={require("../../../assets/images/default-background.png")} style={Menu.HeaderMenuImage}/>
                    <View style={Menu.menuAvatar}>
                        <Image source={require("../../../assets/images/user.png")} style={Menu.userAvatar}/>
                    </View>
                    <View style={Menu.menuUser}>
                        <Text style={Menu.textUser}>User Name</Text>
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
                        <TouchableOpacity style={Menu.touchItem}>
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
}