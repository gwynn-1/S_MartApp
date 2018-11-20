import React, { Component } from 'react';
import {View, Text,TouchableWithoutFeedback,Alert,Animated,Easing,Platform,Image } from 'react-native';
// import MainTheme from '../components/mainTheme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {connect} from 'react-redux';
import {NavigationActions,StackActions} from 'react-navigation';

// import LoginService from '../../../services/api/Gateway/login';
import LoginStyles from './LoginStyle';
import TextBox from '../../../components/TextBox/TextBox';
import Button from '../../../components/Button/Button';
import SecondaryButton from '../../../components/Button/SecondaryButton';
import {LoginAction} from '../../../services/redux/actions/Login/LoginAction';
import {SignupAction} from '../../../services/redux/actions/Signup/signupAction';
import {GetQrAction} from '../../../services/redux/actions/GetQr/GetQrAction';
import validateLoginForm from '../../../services/validations/LoginForm/validate';
import validateSignupForm from '../../../services/validations/SignupForm/validate';
import SModal from '../../../components/SModal/SModal';
import {ModalAction} from '../../../services/redux/actions/AppAction';


class GatewayForm extends Component{

    constructor(props){
        super(props);
        this.InitState = this.InitState.bind(this);
        this.InitState();
    }

    render(){
        if(this.state.switchForm == "login"){
            var form = (<View style={LoginStyles.formLogin}>
                <TextBox placeholder="Tên đăng nhập" errorMessage={this.state.errorUsername} style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("username",value)}}></TextBox>
                <TextBox secureTextEntry={true} errorMessage={this.state.errorPassword} placeholder="Mật khẩu" style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("password",value)}}></TextBox>
                
                <Button style={LoginStyles.buttonLogin} onPress={()=>this._PressLogin()}>
                    <Text style={LoginStyles.textLogin}>
                    Đăng nhập
                    </Text>
                </Button>
                <SecondaryButton style={LoginStyles.buttonSignup} onPress={()=>this._ShowFormSignup()}>
                    <Text style={LoginStyles.textSignup}>
                        Đăng kí
                    </Text>
                </SecondaryButton>
                <TouchableWithoutFeedback onPressIn={()=>{this.forgetTextPressIn()}} onPressOut={()=>{this.forgetTextPressOut()}}>
                    <Text style={[LoginStyles.textForget,{color : this.state.forgetTextColor }]} >Quên mật khẩu</Text>
                </TouchableWithoutFeedback>
            </View>);
        }else if(this.state.switchForm == "signup"){
            var form = (
                <View style={LoginStyles.formSignup}>
                    
                        <View style={LoginStyles.SignupHeader}>
                            <Button style={LoginStyles.buttonBackToLogin} onPress={()=>{this._ShowFormLogin()}}>
                                <Image source={require("../../../assets/images/back.png")} style={LoginStyles.imageBack}/>
                            </Button>
                            <Text style={LoginStyles.textRegister}>Đăng ký</Text>
                        </View>
                        <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                                            enableOnAndroid={true}
                                            extraScrollHeight={190}
                                            scrollEnabled={true}>
                                <TextBox placeholder="Họ và tên" errorMessage={this.state.errorName} style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("Name",value)}}></TextBox>
                            
                                <TextBox placeholder="Tên đăng nhập" errorMessage={this.state.errorUsername} style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("username",value)}}></TextBox>
                            
                                <TextBox placeholder="Email" errorMessage={this.state.errorEmail} style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("Email",value)}}></TextBox>
                            
                                <TextBox placeholder="Số điện thoại" errorMessage={this.state.errorPhone} style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("Phone",value)}}></TextBox>
                            
                                <TextBox secureTextEntry={true} placeholder="Mật khẩu" errorMessage={this.state.errorPassword} style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("password",value)}}></TextBox>
                                
                                <TextBox secureTextEntry={true} placeholder="Nhập lại Mật khẩu" errorMessage={this.state.errorRepassword} style={LoginStyles.textBox} onChangeText={(value) => {this._ChangeText("repassword",value)}}></TextBox>
                                
                                <Button style={{marginTop: 20}} onPress={()=>{this._PressSignup()}}>
                                    <Text style={LoginStyles.textLogin}>
                                        Đăng kí
                                    </Text>
                                </Button>
                    </KeyboardAwareScrollView>
                    
                </View>
            );
        }

        return (
            <Animated.View style={[LoginStyles.container,{transform: [{translateY: this.state.startSignup}]}]}>
                {form}
                <SModal message={this.state.modalMessage} title={this.state.modalTitle} PrimaryText="OK" isOpen={this.state.modalError} haveSecondary={false}
                        onPrimaryPress={()=>this.setState({modalError:false})}></SModal>
                <SModal message="Không thể kết nối mạng. Xin hãy thử lại" title="Lỗi" PrimaryText="OK" isOpen={this.props.modalOpen} haveSecondary={false}
                        onPrimaryPress={()=>this.props.ModalAction()}></SModal>
            </Animated.View>
        );
    }

    _PressLogin(){
        var data ={
            user_name:this.state.username,
            password:this.state.password
        };
        var that = this;
        var validate = validateLoginForm(data)

        if( !validate){
            this.clearError();

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
        }else{
            this.setState({errorUsername: ('user_name' in validate) ? validate.user_name[0]:null,
                errorPassword: ('password' in validate) ? validate.password[0]:null})
        }
    }

    _PressSignup(){
        var data = {
            user_name:this.state.username,
            password:this.state.password,
            repassword : this.state.repassword,
            Name:this.state.Name,
            Email:this.state.Email,
            Phone:this.state.Phone
        }

        var that = this;
        var validate = validateSignupForm(data);
        if(!validate){
            this.clearError();

            this.props.SignupAction(data,function(){
                that._ShowFormLogin();

                that.setState({
                    modalMessage:"Hãy kiểm tra email và kích hoạt tài khoản trước khi đăng nhập nhé",
                    modalTitle:'Đăng kí thành công',
                    modalError:true
                })
            },function(){
                if(that.props.loginError.error == true){
                    that.popupError(that.props.loginError.message);
                }
            });
        }else{
            this.setState({
                errorUsername: ('user_name' in validate) ? validate.user_name[0]:null,
                errorPassword: ('password' in validate) ? validate.password[0]:null,
                errorRepassword: ('repassword' in validate) ? validate.repassword[0]:null,
                errorName: ('Name' in validate) ? validate.Name[0]:null,
                errorEmail: ('Email' in validate) ? validate.Email[0]:null,
                errorPhone: ('Phone' in validate) ? validate.Phone[0]:null
            })
        }
    }

    clearError(){
        this.setState({errorUsername:null,
            errorPassword:null,
            errorRepassword:null,
            errorName:null,
            errorEmail:null,
            errorPhone:null})
    }

    reset(){
        this.setState({username:"",
        password:"",
        repassword:"",
        Name:"",
        Email:"",
        Phone:""})
    }

    _ShowFormSignup(){
        this.clearError();
        this.reset();
        Animated.timing(                  // Animate over time
            this.state.startSignup,            // The animated value to drive
            {
              toValue:  Platform.OS === 'ios' ? -90 : -110,
              easing: Easing.linear,                   // Animate to opacity: 1 (opaque)
              duration: 200,
              useNativeDriver: true              // Make it take a while
            }
          ).start();
          this.setState({switchForm:"signup"})
    }

    _ShowFormLogin(){
        this.clearError();
        this.reset();
        Animated.timing(                  // Animate over time
            this.state.startSignup,            // The animated value to drive
            {
              toValue: 0,
              easing: Easing.linear,                   // Animate to opacity: 1 (opaque)
              duration: 200,
              useNativeDriver: true              // Make it take a while
            }
          ).start();
          this.setState({switchForm:"login"})
    }

    _ChangeText(inputtype,value){
        switch(inputtype){
            case "username":
                this.setState({username:value}); break;
            case "password":
                this.setState({password:value}); break;
            case "repassword":
                this.setState({repassword:value}); break;
            case "Name":
                this.setState({Name:value}); break;
            case "Email":
                this.setState({Email:value}); break;
            case "Phone":
                this.setState({Phone:value}); break;
            default:break;
        }
    }

    InitState(){
        this.state = {
            forgetTextColor: '#74C9F1',
            username:"",
            password:"",
            repassword:"",
            Name:"",
            Email:"",
            Phone:"",
            startSignup:new Animated.Value(0),
            switchForm : "login",
            errorUsername:null,
            errorPassword:null,
            errorRepassword:null,
            errorName:null,
            errorEmail:null,
            errorPhone:null,
            modalMessage:"",
            modalTitle:"",
            modalError:false
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
          this.setState({
            modalMessage:message,
            modalTitle:"LỖI",
            modalError:true
        })
    }
}

function mapStateToProps(state){
    return {
        loginError:state.loginError,
        user:state.user,
        modalOpen:state.modalOpen,
    };
}

export default connect(mapStateToProps,{
    LoginAction,GetQrAction,SignupAction,ModalAction
})(GatewayForm);