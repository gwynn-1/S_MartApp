import React, { Component } from 'react';
import {View, Text,Image,TouchableWithoutFeedback } from 'react-native';
// import MainTheme from '../components/mainTheme';
import LoginStyles from './LoginStyle';
import TextBox from '../../../components/TextBox/TextBox';
import Button from '../../../components/Button/Button';
import { NavigationActions,StackActions } from 'react-navigation';


export default class Login extends Component{

    constructor(props){
        super(props);
        this.InitState = this.InitState.bind(this);
        this.InitState();
    }

    render(){
        return (
            <View style={LoginStyles.container}>
                <View style={LoginStyles.formLogin}>
                    <TextBox placeholder="Tên đăng nhập" style={LoginStyles.textBox}></TextBox>
                    <TextBox secureTextEntry={true} placeholder="Mật khẩu" style={LoginStyles.textBox}></TextBox>
                    <Button style={LoginStyles.buttonLogin} onPress={()=>this._PressLogin()}>
                        <Text style={LoginStyles.textLogin}>
                        Đăng nhập
                        </Text>
                    </Button>
                    <Button style={LoginStyles.buttonSignup} >
                        <Text style={LoginStyles.textSignup}>
                            Đăng kí
                        </Text>
                    </Button>
                    <TouchableWithoutFeedback onPressIn={()=>{this.forgetTextPressIn()}} onPressOut={()=>{this.forgetTextPressOut()}}>
                        <Text style={[LoginStyles.textForget,{color : this.state.forgetTextColor }]} >Quên mật khẩu</Text>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }

    _PressLogin(){
        this.props
               .navigation
               .dispatch(StackActions.reset(
                 {
                    index: 0,
                    actions: [
                      NavigationActions.navigate({ routeName: 'Main'})
                    ]
                  }));
    }

    InitState(){
        this.state = {
            forgetTextColor: '#74C9F1'
        }
    }

    forgetTextPressIn(){
        this.setState({forgetTextColor: "#a0a0a0"});
    }

    forgetTextPressOut(){
        this.setState({forgetTextColor: "#74C9F1"});
    }
}