/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Provider, ReactReduxContext} from 'react-redux';

import Homepage from './Components/HomePage/Homepage';
import FetchManager from './Managers/FetchManager';
import store from './myredux/store/store';

export const MyContext = React.createContext();

const App = () => {
  // const context = useContext();
  console.log('App render store ==> ', store);
  useEffect(() => {
    FetchManager.shared.fetchImageConfigUrl();
    FetchManager.shared.fetchInitialData();
  }, []);
  return (
    // <Provider context={MyContext} store={store}>
    <View style={styles.backgroundStyle}>
      {/* <Provider store={store}> */}
      <ReactReduxContext.Provider value={{store: store}}>
        <Homepage />
      </ReactReduxContext.Provider>
      {/* </Provider> */}
      <StatusBar barStyle="light-content" />
    </View>
    // </Provider>
  );
};

const styles = StyleSheet.create({
  backgroundStyle: {
    width: '100%',
    height: '100%',
  },
});

export default App;
