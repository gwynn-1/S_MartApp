import React, { Component } from 'react';
import { View,ScrollView,Text,Image,TouchableOpacity,Animated,Easing,Platform } from 'react-native';
import {connect} from 'react-redux';

import MainTheme from '../../../components/MainTheme/mainTheme';
import Header from '../../../components/Header/header';
import mainStyle from './mainStyle';
import LoadingScreen from '../../../components/LoadingScreen/loadingScreen';
import {GetQrAction} from '../../../services/redux/actions/GetQr/GetQrAction';
import {checkConnection} from '../../../services/redux/actions/CheckConnection/checkConnection';
import CheckConnection from '../../../components/CheckConnection/CheckConnection';
import ButtonReload from '../components/ButtonReload';

class MainScene extends Component{
    static navigationOptions = {
        title: 'Main',
        header:null,
        headerLeft: null,gesturesEnabled: false,
      };
    constructor(props){
        super(props);
        this.state = {
            timer:"",
            timerError:"",
            textConnection:"",
            positionTextConnection:new Animated.Value(0),
            backgroundTextConnection:"red",
            reloadRotate:new Animated.Value(0),
            isLoading:false
        };
    }

    render(){
        const height = (this.props.loadingScreen==true) ? "100%" : 0;
        const spin = this.state.reloadRotate.interpolate({
            inputRange: [0, 1],
            outputRange: ['0deg', '180deg']
          })

        return (
            <MainTheme style={mainStyle.container}>
                <Header navigation={this.props.navigation} />
                <CheckConnection text={this.state.textConnection} style={{transform: [{translateY: this.state.positionTextConnection}],backgroundColor : this.state.backgroundTextConnection}}/>

                <ScrollView contentContainerStyle={mainStyle.body} alwaysBounceVertical={false}>
                        <View style={mainStyle.bodyText}>
                            <Text style={mainStyle.text}>Xin Chào, {this.props.user.name}</Text>
                        </View>
                        <View style={mainStyle.imgBody}>
                            <Image style={mainStyle.img} source={{uri: this.props.qrcode}}/>
                        </View>
                </ScrollView>
                <ButtonReload isLoading={this.state.isLoading} onPress={()=>{this._onPressReload()}}></ButtonReload>
                <View style={mainStyle.footer}>
                    <TouchableOpacity style={mainStyle.btnFooter} >
                        <Text style={mainStyle.footerText}>Xem vị trí cửa hàng</Text>
                    </TouchableOpacity>
                </View>
                <LoadingScreen style={{height}} animating={this.props.loadingScreen}/> 
            </MainTheme>
        );
    }

    _onPressReload(){
        // this._getQrCode();
        this.setState({isLoading:true});
        this._reloadQr();
    }

    _reloadQr(){
        var that = this;
        this.props.GetQrAction(this.props.user.jwt_string,function(){
            clearInterval(that.state.timer);
            that.setState({textConnection:"Không kết nối được Internet",backgroundTextConnection:"red",isLoading:false});
            that._animCheckConnectionAppear();
            
            that._startCheckConnectionSchedule();
            that._checkInternet();
        },function(){
            that.setState({isLoading:false});
        });
    }

    _animCheckConnectionAppear(){
        Animated.timing(                  // Animate over time
            this.state.positionTextConnection,            // The animated value to drive
            {
              toValue:  Platform.OS === 'ios' ? 90 : 70,
              easing: Easing.linear,                   // Animate to opacity: 1 (opaque)
              duration: 5000,
              useNativeDriver: true              // Make it take a while
            }
          ).start();   
    }

    _animCheckConnectionDisappear(){
        Animated.timing(                  // Animate over time
            this.state.positionTextConnection,            // The animated value to drive
            {
              toValue: 0,  
              easing: Easing.linear,              // Animate to opacity: 1 (opaque)
              duration: 5000,
              delay:300,    
              useNativeDriver: true          // Make it take a while
            }
          ).start();   
    }

    async _checkInternet(){
        var that=this;
        this.props.checkConnection(function(){
            clearInterval(that.state.timerError);
            
            that.setState({textConnection:"Đã kết nối Internet",backgroundTextConnection:"green"});
            that._animCheckConnectionDisappear();
            that._startGetQrSchedule();
            that._getQrCode()
        });
    }

    async _getQrCode(){
        console.log("qr");
        var that = this;
        this.props.GetQrAction(this.props.user.jwt_string,function(){
            clearInterval(that.state.timer);
            that.setState({textConnection:"Không kết nối được Internet",backgroundTextConnection:"red"});
            that._animCheckConnectionAppear();
            
            that._startCheckConnectionSchedule();
            that._checkInternet();
        });
    }

    _startGetQrSchedule(){
        var value = setInterval(async ()=> await this._getQrCode(), 1000 * 60*2);
        this.setState({timer:value});
    }

    _startCheckConnectionSchedule(){
        var value = setInterval(async ()=> await this._checkInternet(), 1000 * 8);
        this.setState({timerError:value});
    }

    componentDidMount(){
        this._startGetQrSchedule();
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
        clearInterval(this.state.timerError);
    }
}

function mapStateToProps(state){
    return {
        user:state.user,
        loadingScreen : state.loadingScreen,
        qrcode:state.qrcode,
        loginError:state.loginError
    };
}

export default connect(mapStateToProps,{
    GetQrAction,checkConnection
})(MainScene);