import React, { Component } from 'react';
import { View,StatusBar } from 'react-native';

export default class MainTheme extends Component{
    
    render(){
        return (
            <View style={this.props.style}>
                <StatusBar backgroundColor="#6039AF"
                        barStyle="light-content"
                        />
                {this.props.children}
            </View>
        );
    }
}