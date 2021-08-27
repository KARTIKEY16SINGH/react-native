/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';

import CarItem from './components/CarItem';

const App = () => {
  return (
    <View style={styles.container} >
      <CarItem 
      name='Model X' 
      tagline='Order Online For' 
      taglineCTA='Touchless Delivery'
      image={require('./assets/images/ModelX.jpeg')} 
      />
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