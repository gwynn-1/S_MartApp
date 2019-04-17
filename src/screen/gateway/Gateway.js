import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView, StatusBar, Animated, Easing, Platform, Image } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import gatewaySts from '@assets/styles/gateway.js';
import LoadingScreen from '@screen/partial/LoadingScreen';
import { Button, SecondaryButton, TextBox } from '@screen/partial/Component';
import SModal from '@screen/partial/SModal';
import * as constSts from '@constants/style';

import loginRule from '@validators/loginRule';
import signupRule from '@validators/signupRule';
import validateForm from '@validators';
import { actError } from '@reducers/actions/error';
import { actLogin,actSignup } from '@reducers/actions/auth';
import { actGetQr } from '@reducers/actions/qr';


import images from '@assets/images';

class Gateway extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            forgetTextColor: constSts.COLOR_BLUE_LIGHT,
            username: "",
            password: "",
            repassword: "",
            Name: "",
            Email: "",
            Phone: "",
            startSignup: new Animated.Value(0),
            switchForm: "login",
            errorUsername: null,
            errorPassword: null,
            errorRepassword: null,
            errorName: null,
            errorEmail: null,
            errorPhone: null,
            modalMessage: "",
            modalTitle: "",
            modalError: false
        }
    }

    render() {
        // console.log(this.props.error);
        return (
            <ScrollView contentContainerStyle={gatewaySts.scrView} alwaysBounceVertical={false}>
                <View style={gatewaySts.mainTheme}>
                    <StatusBar backgroundColor={constSts.COLOR_MAIN}
                        barStyle="light-content"
                    />
                    <View style={{ height: "100%" }}>
                        <View style={gatewaySts.imageContainer}>
                            <Image style={gatewaySts.userImage} source={images.logo} />
                        </View>
                        <Animated.View style={[gatewaySts.container, { transform: [{ translateY: this.state.startSignup }] }]}>
                            {this._formGateway()}
                            <SModal message={this.props.error.message} title="LỖI" PrimaryText="OK" isOpen={this.props.error.error} haveSecondary={false}
                                onPrimaryPress={() => this.closeErrorModal()}></SModal>
                            <SModal message={this.state.modalMessage} title={this.state.modalTitle} PrimaryText="OK" isOpen={this.state.modalError} haveSecondary={false}
                                onPrimaryPress={()=>this.setState({modalError:false})}></SModal>
                        </Animated.View>
                    </View>
                    {(this.props.loadingScreen) ? (
                        <LoadingScreen style={{ height: "100%" }} animating={this.props.loadingScreen} />
                    ) : null}
                </View>
            </ScrollView>
        );
    }

    _formGateway() {
        if (this.state.switchForm == "login") {
            return (<View style={gatewaySts.formLogin}>
                <TextBox placeholder="Tên đăng nhập" errorMessage={this.state.errorUsername} style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("username", value) }}></TextBox>
                <TextBox secureTextEntry={true} errorMessage={this.state.errorPassword} placeholder="Mật khẩu" style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("password", value) }}></TextBox>

                <Button style={gatewaySts.buttonLogin} onPress={() => this._PressLogin()}>
                    <Text style={gatewaySts.textLogin}>
                        Đăng nhập
                    </Text>
                </Button>
                <SecondaryButton style={gatewaySts.buttonSignup} onPress={() => this._ShowFormSignup()}>
                    <Text style={gatewaySts.textSignup}>
                        Đăng kí
                    </Text>
                </SecondaryButton>
                <TouchableWithoutFeedback onPressIn={() => { this.forgetTextPressIn() }} onPressOut={() => { this.forgetTextPressOut() }}>
                    <Text style={[gatewaySts.textForget, { color: this.state.forgetTextColor }]} >Quên mật khẩu</Text>
                </TouchableWithoutFeedback>
            </View>);
        } else if (this.state.switchForm == "signup") {
            return (
                <View style={gatewaySts.formSignup}>

                    <View style={gatewaySts.SignupHeader}>
                        <Button style={gatewaySts.buttonBackToLogin} onPress={() => { this._ShowFormLogin() }}>
                            <Image source={images.back} style={gatewaySts.imageBack} />
                        </Button>
                        <Text style={gatewaySts.textRegister}>Đăng ký</Text>
                    </View>
                    <KeyboardAwareScrollView resetScrollToCoords={{ x: 0, y: 0 }}
                        enableOnAndroid={true}
                        extraScrollHeight={190}
                        scrollEnabled={true}>
                        <TextBox placeholder="Họ và tên" errorMessage={this.state.errorName} style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("Name", value) }}></TextBox>

                        <TextBox placeholder="Tên đăng nhập" errorMessage={this.state.errorUsername} style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("username", value) }}></TextBox>

                        <TextBox placeholder="Email" keyboardType="email-address" errorMessage={this.state.errorEmail} style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("Email", value) }}></TextBox>

                        <TextBox placeholder="Số điện thoại" keyboardType="numeric" errorMessage={this.state.errorPhone} style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("Phone", value) }}></TextBox>

                        <TextBox secureTextEntry={true} placeholder="Mật khẩu" errorMessage={this.state.errorPassword} style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("password", value) }}></TextBox>

                        <TextBox secureTextEntry={true} placeholder="Nhập lại Mật khẩu" errorMessage={this.state.errorRepassword} style={gatewaySts.textBox} onChangeText={(value) => { this._ChangeText("repassword", value) }}></TextBox>

                        <Button style={{ marginTop: 20 }} onPress={() => { this._PressSignup() }}>
                            <Text style={gatewaySts.textLogin}>
                                Đăng kí
                                    </Text>
                        </Button>
                    </KeyboardAwareScrollView>

                </View>
            );
        }
    }

    _ChangeText(inputtype, value) {
        this.setState({ [inputtype]: value });
    }

    forgetTextPressIn() {
        this.setState({ forgetTextColor: constSts.COLOR_GRAY });
    }
    forgetTextPressOut() {
        this.setState({ forgetTextColor: constSts.COLOR_BLUE_LIGHT });
    }
    _ShowFormSignup() {
        this.clearError();
        this.reset();
        Animated.timing(                  // Animate over time
            this.state.startSignup,            // The animated value to drive
            {
                toValue: Platform.OS === 'ios' ? -90 : -110,
                easing: Easing.linear,                   // Animate to opacity: 1 (opaque)
                duration: 200,
                useNativeDriver: true              // Make it take a while
            }
        ).start();
        this.setState({ switchForm: "signup" })
    }

    _ShowFormLogin() {
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
        this.setState({ switchForm: "login" })
    }

    _PressLogin() {
        var data = {
            user_name: this.state.username,
            password: this.state.password
        };
        var that = this;
        var validate = validateForm(data, loginRule);
        if (!validate) {
            this.clearError();

            this.props._login(data, function (status) {
                if (status == 1) {
                    that.props._getQr();
                    that.props.navigation.dispatch(StackActions.reset(
                        {
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Main' })
                            ]
                        })
                    );
                }
            });
        } else {
            this.setState({
                errorUsername: ('user_name' in validate) ? validate.user_name[0] : null,
                errorPassword: ('password' in validate) ? validate.password[0] : null
            })
        }
    }

    _PressSignup() {
        var data = {
            user_name: this.state.username,
            password: this.state.password,
            repassword: this.state.repassword,
            Name: this.state.Name,
            Email: this.state.Email,
            Phone: this.state.Phone
        }

        var that = this;
        var validate = validateForm(data, signupRule);
        if (!validate) {
            this.clearError();

            this.props._signup(data,function(status){
                that._ShowFormLogin();

                that.setState({
                    modalMessage:"Hãy kiểm tra email và kích hoạt tài khoản trước khi đăng nhập nhé",
                    modalTitle:'Đăng kí thành công',
                    modalError:true
                })
            });
        } else {
            this.setState({
                errorUsername: ('user_name' in validate) ? validate.user_name[0] : null,
                errorPassword: ('password' in validate) ? validate.password[0] : null,
                errorRepassword: ('repassword' in validate) ? validate.repassword[0] : null,
                errorName: ('Name' in validate) ? validate.Name[0] : null,
                errorEmail: ('Email' in validate) ? validate.Email[0] : null,
                errorPhone: ('Phone' in validate) ? validate.Phone[0] : null
            })
        }
    }

    clearError() {
        this.setState({
            errorUsername: null,
            errorPassword: null,
            errorRepassword: null,
            errorName: null,
            errorEmail: null,
            errorPhone: null
        })
    }

    reset() {
        this.setState({
            username: "",
            password: "",
            repassword: "",
            Name: "",
            Email: "",
            Phone: ""
        })
    }

    closeErrorModal() {

        this.props._errorAction();
    }
}

function mapStateToProps(state) {
    return {
        error: state.error,
        loadingScreen: state.global.loadingScreen
    };
}

function mapDispatchToProps(dispatch) {
    return {
        _errorAction: function (type = null) {
            return dispatch(actError(type));
        },
        _login: function (data, callback) {
            return dispatch(actLogin(data, callback));
        },
        _signup:function(data, callback){
            return dispatch(actSignup(data, callback))
        },
        _getQr: function (callback = null) {
            return dispatch(actGetQr(callback));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Gateway);