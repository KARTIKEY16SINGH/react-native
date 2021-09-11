/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Homepage from './Components/HomePage/Homepage';
import FetchManager from './Managers/FetchManager';

const App = () => {
  useEffect(() => {
    FetchManager.shared.fetchImageConfigUrl();
  }, []);
  FetchManager.shared.fetchPopularMovie();
  return (
    <View style={styles.backgroundStyle}>
      <Homepage />
      <StatusBar barStyle="light-content" />
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    width: '100%',
    height: '100%',
  },
});

export default App;
