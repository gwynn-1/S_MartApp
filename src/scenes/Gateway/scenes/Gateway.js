import React, { Component } from 'react';
import {View,Image } from 'react-native';
import MainTheme from '../components/mainTheme';
import LoginStyles from './LoginStyle';
import Login from './Login';

export default class Gateway extends Component{
    static navigationOptions = {
        title: 'Gateway',
        header:null
    };
    constructor(props){
        super(props);
    }

    render(){
        return (
            <MainTheme>
                <View style={{height:"100%"}}>
                    <View style={LoginStyles.imageContainer}>
                        <Image style={LoginStyles.userImage} source={require("../../../assets/images/logo.png")} />
                    </View>
                    <Login navigation={this.props.navigation}/>
                </View>
            </MainTheme>
        );
    }
}