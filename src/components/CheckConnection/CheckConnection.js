import React, { Component } from 'react';
import { View,Text,Animated } from 'react-native';
import ccStyle from './style';

export default class CheckConnection extends Component{
    render(){
        return (
            <Animated.View style={[ccStyle.container,this.props.style]}>
                <Text style={ccStyle.text}>{this.props.text}</Text>
            </Animated.View>
        );
    }
}