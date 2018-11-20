import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import buttonStyle from './style';

export default class SecondaryButton extends Component{
    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[buttonStyle.secondaryButton,this.props.style]}>
                    {this.props.children}
            </TouchableOpacity>
        );
    }
}