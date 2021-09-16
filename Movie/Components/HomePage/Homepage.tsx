import React from 'react';
import {View} from 'react-native';
// import {Provider} from 'react-redux';
import {MyContext} from '../../App';
import store from '../../myredux/store/store';
import MoviewCardView from '../MovieCard/MovieCardView';
import Shimmer from '../MovieCard/Shimmer';
import movieConnecctedComponent, {
  MovieHorizontalList,
} from '../MovieHorizontalList';
import styles from './styles';

class Homepage extends React.Component {
  render() {
    return (
      // <Provider context={MyContext} store={store}>
      <View style={styles.container}>
        {/* <MoviewCardView /> */}
        {/* <Shimmer /> */}
        {/* <MovieHorizontalList /> */}
        <MovieHorizontalList />
        {/* <movieConnecctedComponent /> */}
      </View>
      // </Provider>
    );
  }
}

export default Homepage;
