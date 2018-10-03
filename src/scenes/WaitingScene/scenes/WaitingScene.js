import React, { Component } from 'react';
import { View, Image,StatusBar,ActivityIndicator,Text, Alert} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions,StackActions} from 'react-navigation';


import waitingStyle from './style';
import { _getUser } from '../../../services/asyncStorage/index';
import {checkLoginAction} from '../../../services/redux/actions/Login/LoginAction';
import {GetQrAction} from '../../../services/redux/actions/GetQr/GetQrAction';

class WaitingScene extends Component{
    render(){
        return (
            <View style={waitingStyle.container}>
                <StatusBar backgroundColor="#6039AF"
                        barStyle="light-content"
                        />
                <Image style={waitingStyle.logoImage} source={require("../../../assets/images/logo.png")} />
                <View style={waitingStyle.loadingSection}>
                    <ActivityIndicator animating={true} size="small" color="#ffffff" />
                    <Text style={waitingStyle.loadingText}>Đang kiểm tra thông tin đăng nhập...</Text>
                </View>
            </View>
        );
    }

    componentDidMount(){
        var that =this;

        _getUser(function(value){
            payload = JSON.parse(value);
            if(payload){
            
                that.props.checkLoginAction({"user_name":payload.username},function(){
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

                    that.props.navigation.dispatch(StackActions.reset(
                        {
                            index: 0,
                            actions: [
                            NavigationActions.navigate({ routeName: 'Gateway'})
                            ]
                        }));
                })
            }else {
                that.props.navigation.dispatch(StackActions.reset(
                    {
                        index: 0,
                        actions: [
                        NavigationActions.navigate({ routeName: 'Gateway'})
                        ]
                    }));
            }
        });
    }

    popupError(message){
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
        user:state.user,
    };
}

export default connect(mapStateToProps,{
    checkLoginAction,GetQrAction
})(WaitingScene);