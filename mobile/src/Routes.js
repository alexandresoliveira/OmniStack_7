import React from 'react';
import { Image } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Feed from './pages/feed/Feed';
import New from './pages/new/New'

import logo from './assets/logo.png'

export default createAppContainer(
  createStackNavigator({
    Feed,
    New
  }, {
    initialRouteName: 'Feed',
    defaultNavigationOptions: {
      headerTitle: <Image style={{ marginHorizontal: 20 }} source={logo} />,
      headerBackTitle: null,
      headerTintColor: '#000'
    },
    mode: 'modal'
  })
);