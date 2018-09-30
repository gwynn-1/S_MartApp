import React, { Component } from 'react';
import { View,TouchableWithoutFeedback,Image } from 'react-native';
import headerStyle from './style/headerStyle';

export default class Header extends Component{
    render(){
        return (
            <View style={headerStyle.container}>
                <View style={headerStyle.body}>
                    <TouchableWithoutFeedback  onPress={()=>this.props.navigation.openDrawer()} >
                        <View style={headerStyle.button}>
                            <Image style={headerStyle.menuImage} source={require("../../../assets/images/menu.png")}/>
                        </View>
                    </TouchableWithoutFeedback>
                    <View>
                        <Image style={headerStyle.iconImage} source={require("../../../assets/images/logo.png")}/>
                    </View>
                </View>
            </View>
        );
    }
}