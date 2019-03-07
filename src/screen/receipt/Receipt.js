import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';

import receiptSts from '@assets/styles/receipt.js';
import Header from '@screen/partial/Header';
import MainTheme from '@screen/partial/MainTheme';

export default class Receipt extends Component{
    static navigationOptions = {
        header: null,
        headerLeft: null, gesturesEnabled: false,
    };
    render(){
        return (
            <MainTheme style={receiptSts.container}>
                <Header navigation={this.props.navigation} isBack/>

                <ScrollView contentContainerStyle={receiptSts.body} alwaysBounceVertical={false}>
                    
                </ScrollView>
            </MainTheme>
        );
    }
}