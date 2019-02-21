import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Animated, Easing, Platform } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import MainTheme from '@screen/partial/MainTheme';
import Header from '@screen/partial/Header';
import { ButtonReload, CheckConnection } from '@screen/partial/Component';
import homeSts from '@assets/styles/home.js';

import SModal from '@screen/partial/SModal';
import LoadingScreen from '@screen/partial/LoadingScreen';
import { actGetQr } from '@reducers/actions/qr';
import { actLogout } from '@reducers/actions/auth';
import { actModal } from '@reducers/actions/global';

class Home extends Component {
    static navigationOptions = {
        header: null,
        headerLeft: null, gesturesEnabled: false,
    };
    constructor(props) {
        super(props);
        this.state = {
            timer: "",
            timerError: "",
            textConnection: "",
            positionTextConnection: new Animated.Value(0),
            backgroundTextConnection: "red",
            reloadRotate: new Animated.Value(0),
            isLoading: false,
            modalMessage: "",
            modalTitle: "",
            modalError: false
        };
    }

    render() {
        const user = this.props.user;
        return (
            <MainTheme style={homeSts.container}>
                <Header navigation={this.props.navigation} />
                <CheckConnection text={this.state.textConnection} style={{ transform: [{ translateY: this.state.positionTextConnection }], backgroundColor: this.state.backgroundTextConnection }} />

                <ScrollView contentContainerStyle={homeSts.body} alwaysBounceVertical={false}>
                    <View style={homeSts.bodyText}>
                        <Text style={homeSts.text}>Xin Chào, { (user.name != undefined) ? user.name: ""}</Text>
                    </View>
                    <View style={homeSts.imgBody}>
                        {(this.props.qrcode != undefined && this.props.qrcode !="") ? (
                            <Image style={homeSts.img} source={{ uri: this.props.qrcode }} />
                        ) :null}
                        
                    </View>
                </ScrollView>
                <ButtonReload isLoading={this.state.isLoading} onPress={() => { this._onPressReload() }}></ButtonReload>
                <View style={homeSts.footer}>
                    <TouchableOpacity style={homeSts.btnFooter} >
                        <Text style={homeSts.footerText}>Xem vị trí cửa hàng</Text>
                    </TouchableOpacity>
                </View>
                {(this.props.loadingScreen) ? (
                            <LoadingScreen style={{ height: "100%" }} animating={this.props.loadingScreen} />
                        ) : null}
                <SModal message="Bạn có muốn đăng xuất ?" title="Thoát" PrimaryText="Có" SecondaryText="Không" isOpen={this.props.modalOpen} haveSecondary={true}
                    onPrimaryPress={() => this.LogoutConfirm()} onSecondaryPress={() => this.props._actModal()}></SModal>
                <SModal message={this.props.error.message} title="LỖI" PrimaryText="OK" isOpen={this.props.error.error} haveSecondary={false}
                        onPrimaryPress={() => this.closeErrorModal() }></SModal>
            </MainTheme>
        );
    }

    _onPressReload(){
        // this._getQrCode();
        var that = this;
        this.setState({isLoading:true});
        this.props._getQr(function(){
            that.setState({isLoading:false});
        });
    }

    LogoutConfirm(){
        var that = this;
        this.props._actModal();
        this.props._logout(function(status){
            if(status == 1){
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

    closeErrorModal(){
        
        this.props._errorAction();
    }
}

const mapStateToProps = (state) => ({
    user:state.auth.user,
    qrcode : state.qr.qr,
    modalOpen:state.global.s_modal,
    loadingScreen: state.global.loadingScreen,
    error: state.error,
});

function mapDispatchToProps(dispatch) {
    return {
        _getQr: function (callback) {
            return dispatch(actGetQr(callback));
        },
        _logout: function(callback){
            return dispatch(actLogout(callback));
        },
        _actModal:function(){
            return dispatch(actModal());
        },
        _errorAction: function (type = null) {
            return dispatch(actError(type));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);