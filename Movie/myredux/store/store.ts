import {combineReducers, createStore} from 'redux';
import redux from 'react-redux';
import fetchImageUrlReducer from '../reducers/FetchImageUrlReducer';

const rootReducer = combineReducers({imageUrl: fetchImageUrlReducer});

const store = createStore(rootReducer);

export default store;
