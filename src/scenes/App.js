/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import {createDrawerNavigator} from "react-navigation";
import {Provider} from 'react-redux';

import Gateway from './Gateway/scenes/Gateway';
import MainScene from './MainScene/scenes/MainScene';
import WaitingScene from './WaitingScene/scenes/WaitingScene';

import MenuBar from './MainScene/components/MenuBar';
import store from '../services/redux/store'

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
  },
  Waiting:{
    screen : WaitingScene
  }
},{
  initialRouteName: 'Waiting',header:null,headerMode: 'none',
});

export default class App extends Component {
    constructor(props){
      super(props);
    }
  render() {
    return (
      <Provider store = {store}>
        <Root/>
      </Provider>
    );
  }
}
