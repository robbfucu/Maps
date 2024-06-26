/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  AppRegistry,
  View,
  Text
} from 'react-native';
import { name as appName } from './app.json'
import { NavigationContainer } from '@react-navigation/native';
import Map from './Screens/Map'
import Place from './Screens/Place'
export default function App () {
  return (
    <NavigationContainer>
      <Map />
    </NavigationContainer>
  )
}

AppRegistry.registerComponent(appName, () => App)
