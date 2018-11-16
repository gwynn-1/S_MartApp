import React, { Component } from 'react';
import {View,Image} from 'react-native';
import {connect} from 'react-redux';

import MainTheme from '../components/mainTheme';
import LoginStyles from './LoginStyle';
import LoadingScreen from '../../../components/LoadingScreen/loadingScreen';
import GatewayForm from './GatewayForm';

class Gateway extends Component{
    static navigationOptions = {
        title: 'Gateway',
        header:null
    };
    constructor(props){
        super(props);
    }

    render(){
        const height = (this.props.loadingScreen==true) ? "100%" : 0;

        return (
            <MainTheme>
                <View style={{height:"100%"}}>
                    <View style={LoginStyles.imageContainer}>
                        <Image style={LoginStyles.userImage} source={require("../../../assets/images/logo.png")} />
                    </View>
                    <GatewayForm navigation={this.props.navigation}/>
                </View>
                <LoadingScreen style={{height}} animating={this.props.loadingScreen}/> 
            </MainTheme>
        );
    }
}

function mapStateToProps(state){
    return { 
        loadingScreen : state.loadingScreen
    };
}

export default connect(mapStateToProps)(Gateway);