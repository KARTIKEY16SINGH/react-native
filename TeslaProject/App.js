/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import CarsList from './components/CarsList';
import Header from './components/Header';

const App = () => {
  return (
    <View style={styles.container} >
      <Header />
      <CarsList />
    </View>
  );
};

const styles = StyleSheet.create(
  {
    container: {
      flex:1,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
);

export default App;