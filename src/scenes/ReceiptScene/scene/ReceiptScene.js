import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';

import MainTheme from '../../../components/MainTheme/mainTheme';
import Header from '../../../components/Header/header';
import LoadingScreen from '../../../components/LoadingScreen/loadingScreen';

export default class ReceiptScene extends Component{
    render(){
        return (
            <MainTheme style={mainStyle.container}>
                <Header navigation={this.props.navigation} />

                <ScrollView contentContainerStyle={mainStyle.body} alwaysBounceVertical={false}>
                    
                </ScrollView>
            </MainTheme>
        );
    }
}