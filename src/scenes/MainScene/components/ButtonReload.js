import React, { Component } from 'react';
import { View,TouchableOpacity,Image } from 'react-native';
import { BallIndicator } from 'react-native-indicators';

import btnReload from "./style/btnReloadStyle";

export default class ButtonReload extends Component{
    render(){
        if(this.props.isLoading){
            var show = <BallIndicator color='black' size={25}/>
        }else{
            var show = <TouchableOpacity onPress={this.props.onPress} style={{width:40,height:40,alignItems:"center",justifyContent:"center"}}>
                            <Image source={require("../../../assets/images/reload.png")} style={btnReload.image}/>
                        </TouchableOpacity>
        }
        return (
            <View style={[btnReload.container,this.props.style]}>
                {show}
            </View>
        );
    }
}