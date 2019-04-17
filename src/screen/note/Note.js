import React, { Component } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Platform, RefreshControl } from 'react-native';
import { connect } from 'react-redux';
import FeaIcon from 'react-native-vector-icons/Feather';

import MainTheme from '@screen/partial/MainTheme';
import Header from '@screen/partial/Header';
import noteSts from '@assets/styles/note.js';
import * as constSts from '@constants/style';
import { Button } from '@screen/partial/Component';

export default class Note extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = {
        header: null,
        headerLeft: null, gesturesEnabled: false,
    };

    render() {
        return (
            <MainTheme style={noteSts.container}>
                <Header navigation={this.props.navigation} isBack/>
                <ScrollView style={noteSts.container} contentContainerStyle={{
                    justifyContent: "space-between", flexGrow: 1
                }} alwaysBounceVertical={false}>
                    <View style={noteSts.vHeader}>
                        <View style={noteSts.vHeaderField}>
                            <Text style={noteSts.txtHeader}>SMart Reminder</Text>
                        </View>
                    </View>
                    <View style={noteSts.vContent}>
                        <View style={noteSts.vPersonal}>
                            <Text style={noteSts.txtPersonal}>Danh sách ghi chú</Text>
                        </View>
                        <View style={noteSts.vBody}>
                            
                        </View>
                    </View>
                    <TouchableOpacity style={noteSts.btnAdd} onPress={()=>{this._goToAddNote()}}>
                        <FeaIcon name={"plus"} size={25} color={constSts.COLOR_WHITE}/>
                    </TouchableOpacity>
                </ScrollView>
            </MainTheme>
        );
    }

    _goToAddNote(){
        this.props.navigation.navigate("AddNote");
    }
}