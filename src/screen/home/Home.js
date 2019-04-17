import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, NetInfo, Animated, Easing, Platform, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import BackgroundTimer from 'react-native-background-timer';
import { FloatingAction } from 'react-native-floating-action';
import Icon from 'react-native-vector-icons/FontAwesome';
import FeaIcon from 'react-native-vector-icons/Feather';

import MainTheme from '@screen/partial/MainTheme';
import Header from '@screen/partial/Header';
import { CheckConnection } from '@screen/partial/Component';
import homeSts from '@assets/styles/home.js';
import images from '@assets/images';
import * as constSts from '@constants/style';

import SModal from '@screen/partial/SModal';
import LoadingScreen from '@screen/partial/LoadingScreen';
import { actGetQr } from '@reducers/actions/qr';
import { actLogout } from '@reducers/actions/auth';
import { actModal } from '@reducers/actions/global';

// import { fcmUpdateQR } from '@firebase/notification';

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
            isDisconnect: false,
            modalMessage: "",
            modalTitle: "",
            modalError: false
        };
    }

    componentDidMount() {
        console.log("mount")
        BackgroundTimer.runBackgroundTimer(() => {
            //code that will be called every 20 seconds 
            // console.log("2222222")
            this._getQrCode();
        }, 1000 * 20);
        // fcmUpdateQR();
    }

    componentWillUnmount() {
        console.log("unmount")
        BackgroundTimer.stopBackgroundTimer();
    }

    _getQrCode() {

        var that = this;
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if (isConnected) {
                if (that.state.isDisconnect) {
                    that.setState({ textConnection: "Đã kết nối Internet", backgroundTextConnection: "green", isDisconnect: false });
                    that._animCheckConnectionDisappear();
                }
                that.props._getQr(null);
            }else{
                that.setState({ textConnection: "Không kết nối được Internet", backgroundTextConnection: "red", isDisconnect: true });
                that._animCheckConnectionAppear();
            }
        });
    }

    _animCheckConnectionDisappear() {
        Animated.timing(                  // Animate over time
            this.state.positionTextConnection,            // The animated value to drive
            {
                toValue: 0,
                easing: Easing.linear,              // Animate to opacity: 1 (opaque)
                duration: 3000,
                delay: 300,
                useNativeDriver: true          // Make it take a while
            }
        ).start();
    }

    _animCheckConnectionAppear() {
        Animated.timing(                  // Animate over time
            this.state.positionTextConnection,            // The animated value to drive
            {
                toValue: Platform.OS === 'ios' ? 90 : 70,
                easing: Easing.linear,                   // Animate to opacity: 1 (opaque)
                duration: 3000,
                useNativeDriver: true              // Make it take a while
            }
        ).start();
    }

    render() {
        const user = this.props.user;
        const flActions = [
            {
                text: 'SMart Reminder',
                icon: (<Icon name={"sticky-note-o"} size={20} color={constSts.COLOR_BLACK}/>),
                name: 'Note',
                color: constSts.COLOR_GRAY_THIN,
                textBackground: constSts.COLOR_GRAY_THIN,
                position: 1
            },
            {
                text: 'SMart Cart',
                icon: (<FeaIcon name={"shopping-cart"} size={20} color={constSts.COLOR_BLACK}/>),
                name: 'Cart',
                color: constSts.COLOR_GRAY_THIN,
                textBackground: constSts.COLOR_GRAY_THIN,
                position: 2
            },
        ];

        return (
            <MainTheme style={homeSts.container}>
                <Header navigation={this.props.navigation} />
                <CheckConnection text={this.state.textConnection} style={{ transform: [{ translateY: this.state.positionTextConnection }], backgroundColor: this.state.backgroundTextConnection }} />

                <ScrollView contentContainerStyle={homeSts.body} alwaysBounceVertical={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isLoading}
                            onRefresh={() => { this._onPressReload() }}
                            title="Loading..."
                        />
                    }>
                    <View style={homeSts.bodyText}>
                        <Text style={homeSts.text}>Xin Chào, {(user.name != undefined) ? user.name : ""}</Text>
                    </View>
                    <View style={homeSts.imgBody}>
                        {(this.props.qrcode != undefined && this.props.qrcode != "") ? (
                            <Image style={homeSts.img} source={{ uri: this.props.qrcode }} />
                        ) : null}

                    </View>
                </ScrollView>
                <FloatingAction
                    color={constSts.COLOR_MAIN}
                    actions={flActions}
                    showBackground={false}
                    onPressItem={
                        (name) => {
                            this.props.navigation.navigate(name);
                        }
                    }
                />
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
                    onPrimaryPress={() => this.closeErrorModal()}></SModal>
            </MainTheme>
        );
    }

    _onPressReload() {
        // this._getQrCode();
        var that = this;
        this.setState({ isLoading: true });
        // this.props._getQr(function (status) {
            
        //     if (status == 0) {
        //         that.setState({ textConnection: "Không kết nối được Internet", backgroundTextConnection: "red", isDisconnect: true });
        //         that._animCheckConnectionAppear();
        //     } else if (status == 1 && that.state.isDisconnect == true) {
        //         that.setState({ textConnection: "Đã kết nối Internet", backgroundTextConnection: "green", isDisconnect: true });
        //         that._animCheckConnectionDisappear();
        //     }
        // });
        NetInfo.isConnected.fetch().then(isConnected => {
            console.log('First, is ' + (isConnected ? 'online' : 'offline'));
            if (isConnected) {
                if (that.state.isDisconnect) {
                    that.setState({ textConnection: "Đã kết nối Internet", backgroundTextConnection: "green", isDisconnect: false });
                    that._animCheckConnectionDisappear();
                }
                that.props._getQr(function(){
                    that.setState({ isLoading: false });
                });
            }else{
                that.setState({ textConnection: "Không kết nối được Internet",isLoading: false, backgroundTextConnection: "red", isDisconnect: true });
                that._animCheckConnectionAppear();
            }
        });
    }

    LogoutConfirm() {
        var that = this;
        this.props._actModal();
        this.props._logout(function (status) {
            if (status == 1) {
                that.props.navigation.dispatch(StackActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({ routeName: 'Gateway' })
                        ]
                    }));
            }
        });
    }

    closeErrorModal() {
        this.props._errorAction();
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    qrcode: state.qr.qr,
    modalOpen: state.global.s_modal,
    loadingScreen: state.global.loadingScreen,
    error: state.error,
});

function mapDispatchToProps(dispatch) {
    return {
        _getQr: function (callback) {
            return dispatch(actGetQr(callback));
        },
        _logout: function (callback) {
            return dispatch(actLogout(callback));
        },
        _actModal: function () {
            return dispatch(actModal());
        },
        _errorAction: function (type = null) {
            return dispatch(actError(type));
        },
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);