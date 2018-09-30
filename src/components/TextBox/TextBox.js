import React, { Component } from 'react';
import { TextInput} from 'react-native';
import textBoxStyle from './style';

export default class Login extends Component{
    render(){
        return (
            <TextInput style={[textBoxStyle.textBox,this.props.style]}
                        placeholder={this.props.placeholder}
                        secureTextEntry={this.props.secureTextEntry}>
            </TextInput>
        );
        
    }
}