import React, { Component } from 'react';
import {View,StatusBar,ScrollView } from 'react-native';
import backgroundStyles from "./BackgroundStyle";

export default class MainTheme extends Component{
    render(){
        return (
            <ScrollView contentContainerStyle={backgroundStyles.scrView} alwaysBounceVertical={false}>
                <View style={backgroundStyles.mainTheme}>
                    <StatusBar
                        backgroundColor="#6039AF"
                        barStyle="light-content"
                        />
                    
                    {this.props.children}
                    
                </View>
            </ScrollView>
        );
    }
}