import React, { Component } from 'react';
import {View, Text,TouchableWithoutFeedback,Alert } from 'react-native';
// import MainTheme from '../components/mainTheme';
import {connect} from 'react-redux';
import {NavigationActions,StackActions} from 'react-navigation';

// import LoginService from '../../../services/api/Gateway/login';
import LoginStyles from './LoginStyle';
import TextBox from '../../../components/TextBox/TextBox';
import Button from '../../../components/Button/Button';
import {LoginAction} from '../../../services/redux/actions/Login/LoginAction';
import {GetQrAction} from '../../../services/redux/actions/GetQr/GetQrAction';

class Login extends Component{

    constructor(props){
        super(props);
        this.InitState = this.InitState.bind(this);
        this.InitState();
    }

    render(){
        return (
            <View style={LoginStyles.container}>
                <View style={LoginStyles.formLogin}>
                    <TextBox placeholder="Tên đăng nhập" style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("username",value)}}></TextBox>
                    <TextBox secureTextEntry={true} placeholder="Mật khẩu" style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("password",value)}}></TextBox>
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
        var data ={
            user_name:this.state.username,
            password:this.state.password
        };
        var that = this;

        this.props.LoginAction(data,function(){
            that.props.GetQrAction(that.props.user.jwt_string);

            that.props.navigation.dispatch(StackActions.reset(
                        {
                            index: 0,
                            actions: [
                            NavigationActions.navigate({ routeName: 'Main'})
                            ]
                        }));
        },function(){
            if(that.props.loginError.error == true){
                that.popupError(that.props.loginError.message);
            }
        });

        

        
        // LoginService.postLogin(data,function(res){
        //     console.log(res.data);
        // });
            
        
    }

    _ChangeText(inputtype,value){
        if(inputtype == "username")
            this.setState({username:value})
        if(inputtype == "password")
            this.setState({password:value})
    }

    InitState(){
        this.state = {
            forgetTextColor: '#74C9F1',
            username:"",
            password:""
        }
    }

    forgetTextPressIn(){
        this.setState({forgetTextColor: "#a0a0a0"});
    }

    forgetTextPressOut(){
        this.setState({forgetTextColor: "#74C9F1"});
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
        loginError:state.loginError,
        user:state.user
    };
}

export default connect(mapStateToProps,{
    LoginAction,GetQrAction
})(Login);