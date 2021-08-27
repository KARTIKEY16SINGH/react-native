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

const App = () => {
  return (
    <View style={styles.container} >
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