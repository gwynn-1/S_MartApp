/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {createDrawerNavigator} from "react-navigation";

import Gateway from './Gateway/scenes/Gateway';
import MainScene from './MainScene/scenes/MainScene';
import MenuBar from './MainScene/components/MenuBar';

const MainScreen = createDrawerNavigator(
  {
      Main :{
        screen : MainScene
      }
  },
  {
    initialRouteName: 'Main',
    header:null,
      contentComponent: props => <MenuBar {...props} />
  }
);

const Root = createStackNavigator({
  Gateway: {
    screen: Gateway,
  },
  Main :{
    screen : MainScreen
  }
},{
  initialRouteName: 'Gateway',header:null,headerMode: 'none',
});

export default class App extends Component {
    constructor(props){
      super(props);
    }
  render() {
    return (
      <Root>
      </Root>
    );
  }
}
