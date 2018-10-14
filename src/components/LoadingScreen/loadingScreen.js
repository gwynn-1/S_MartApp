import React, { Component } from 'react';
import { View,ActivityIndicator } from 'react-native';
import {SkypeIndicator} from 'react-native-indicators';
import loadingStyle from './style';

export default class LoadingScreen extends Component{
    render(){
        if(this.props.animating){
            var show = <SkypeIndicator color='#6039AF' size={65}/>
        }else{
            var show = <View></View>
        }
        return (
            <View style={[loadingStyle.container,this.props.style]}>

                {/* <ActivityIndicator animating={this.props.animating} size="large" color="#6039AF" /> */}
                {show}
            </View>
        );
    }
}