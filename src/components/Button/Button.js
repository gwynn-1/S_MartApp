import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import buttonStyle from './style';

export default class Button extends Component{
    render(){
        return (
            <TouchableOpacity onPress={this.props.onPress} style={[buttonStyle.button,this.props.style]}>
                    {this.props.children}
            </TouchableOpacity>
        );
    }
}