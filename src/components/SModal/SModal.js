import React, { Component } from 'react';
import { View,Text } from 'react-native';
import Modal from 'react-native-modalbox';
import Button from '../Button/Button';
import SecondaryButton from '../Button/SecondaryButton';
import modalStyle from './style';

export default class SModal extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <Modal backdropPressToClose={false} coverScreen={true} style={[modalStyle.modal, this.props.style]} swipeToClose={false} position={"center"} ref="smodal" isOpen={this.props.isOpen}>
                <View style={modalStyle.titleSec}>
                    <Text style={modalStyle.title}>{this.props.title}</Text>
                </View>
                <View style={modalStyle.messageSec}>
                    <Text style={modalStyle.message}>{this.props.message}</Text>
                </View>
                <View style={modalStyle.buttonSec}> 
                    <Button onPress={this.props.onPrimaryPress} style={modalStyle.primary}>
                        <Text style={{color:"#ffffff",
                                        fontSize: 20,
                                        fontWeight: 'bold'}}>
                            {this.props.PrimaryText}
                        </Text>
                    </Button>
                    {this.props.haveSecondary ? (
                    <SecondaryButton onPress={this.props.onSecondaryPress} style={modalStyle.secondary}>
                        <Text style={{fontSize: 16}}>
                            {this.props.SecondaryText}
                        </Text>
                    </SecondaryButton>
                    ) :null}
                </View>
            </Modal>
        );
    }
}