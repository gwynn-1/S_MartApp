import React, { Component } from 'react';
import { View,ActivityIndicator } from 'react-native';
import loadingStyle from './style';

export default class LoadingScreen extends Component{
    render(){
        return (
            <View style={[loadingStyle.container,this.props.style]}>
                <ActivityIndicator animating={this.props.animating} size="large" color="#6039AF" />
            </View>
        );
    }
}