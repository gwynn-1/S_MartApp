import React, { Component } from 'react';
import { TextInput,View,Text} from 'react-native';
import textBoxStyle from './style';

export default class Login extends Component{
    render(){
        var error=null;
        if(this.props.errorMessage != null){
            error = (
                <Text style={{color:"red",marginBottom:5}}>{this.props.errorMessage}</Text>
            );
        }
        return (
            <View>
                <TextInput style={[textBoxStyle.textBox,this.props.style]}
                            placeholder={this.props.placeholder}
                            secureTextEntry={this.props.secureTextEntry}
                            onChangeText={this.props.onChangeText} ref={this.props.ref}>
                </TextInput>
                {error}
            </View>
        );
        
    }
}