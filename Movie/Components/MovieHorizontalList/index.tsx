import React, {Component} from 'react';
import {FlatList} from 'react-native';
import {connect, ReactReduxContext} from 'react-redux';
import {MyContext} from '../../App';
import DataManager from '../../Managers/DataManager';
import store from '../../myredux/store/store';
import MoviewCardView from '../MovieCard/MovieCardView';

export class MovieHorizontalList extends Component {
  state = {
    loading: false,
    moviesData: undefined,
  };
  private TAG = 'MovieHorizontalList';
  constructor(props) {
    super(props);
    store.subscribe(this.onStateChange.bind(this));
  }

  onStateChange() {
    // console.log(this.TAG, 'onStateChange() store ==>', store.getState());

    const data = DataManager.shared.getPopularMoviesData();
    if (data.loading != this.state.loading) {
      let tempState = {...this.state, loading: data.loading};
      if (data.data != this.state.moviesData) {
        tempState = {...tempState, moviesData: data.data};
      }
      this.setState(tempState);
    }
  }

  render() {
    // console.log(this.TAG, 'render props ==> ', this.props);
    console.log(this.TAG, 'render state ==> ', this.state);
    const moviesData =
      this.state.loading === true
        ? [1, 2]
        : this.state.moviesData?.results ?? [];
    return (
      <FlatList
        data={moviesData}
        renderItem={({item}) => (
          <MoviewCardView loading={this.state.loading} data={item} />
        )}
      />
    );
  }
}

const mapStateToProps = state => {
  console.log('MovieHorizontalList MapStateToProps state ==> ', state);
  const {popularMovies} = state;
  return {
    // loading: popularMovies.loading,
    // moviesData: popularMovies.data,
    state: state,
  };
};

const movieConnecctedComponent = connect(mapStateToProps, null, null, {
  context: MyContext,
})(MovieHorizontalList);
export default movieConnecctedComponent;
