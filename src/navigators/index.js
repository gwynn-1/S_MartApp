import React, { Component } from 'react';
import { View } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import configureStore from '@store';

import MenuBar from '@screen/partial/Menu';
import HomeScreen from '@screen/home/Home';
import NoteScreen from '@screen/note/Note';
import AddNoteScreen from '@screen/note/AddNote';
import ListProNoteScreen from '@screen/note/ListProNote';
import ReceiptScreen from '@screen/receipt/Receipt';
import AccountScreen from '@screen/account/Account';
import GatewayScreen from '@screen/gateway/Gateway';
import WaitingScreen from '@screen/waiting/Waiting';

const MainScreen = createDrawerNavigator(
  {
    Home: {
      screen: HomeScreen
    },

  },
  {
    initialRouteName: 'Home',
    header: null,
    contentComponent: props => <MenuBar {...props} />,
  }
);

const Root = createStackNavigator({
  Gateway: {
    screen: GatewayScreen,
  },
  Main: {
    screen: MainScreen
  },
  Waiting: {
    screen: WaitingScreen
  },
  Account: {
    screen: AccountScreen
  },
  Receipt: {
    screen: ReceiptScreen
  },
  Note: {
    screen: NoteScreen
  },
  AddNote: {
    screen: AddNoteScreen
  },
  ListProNote:{
    screen: ListProNoteScreen
  }
}, {
    initialRouteName: 'Waiting', header: null, headerMode: 'none',
  });

const store = configureStore();

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Provider store={store}>
        <Root />
      </Provider>
    );
  }
}


