import {combineReducers, createStore} from 'redux';
import redux from 'react-redux';
import fetchImageUrlReducer from '../reducers/FetchImageUrlReducer';
import popularMoviesReducer from '../reducers/FetchPopularMoviesReducer';

const rootReducer = combineReducers({
  imageUrl: fetchImageUrlReducer,
  popularMovies: popularMoviesReducer,
});

let store = createStore(rootReducer);

export default store;
