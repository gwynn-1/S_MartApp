import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';

import MainTheme from '../components/mainTheme';
import Header from '../components/header';
import LoadingScreen from '../../../components/LoadingScreen/loadingScreen';

export default class ReceiptScene extends Component{
    render(){
        return (
            <MainTheme style={mainStyle.container}>
                <Header navigation={this.props.navigation} />

                <ScrollView contentContainerStyle={mainStyle.body} alwaysBounceVertical={false}>
                        
                </ScrollView>
                <LoadingScreen style={{height}} animating={this.props.loadingScreen}/> 
            </MainTheme>
        );
    }
}