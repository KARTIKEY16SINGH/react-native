/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import Homepage from './Components/HomePage/Homepage';

const App = () => {
  return (
    <View style={styles.backgroundStyle}>
      <Homepage />
      <StatusBar barStyle='light-content' />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    width: '100%',
    height: '100%'
  }
});

export default App;
