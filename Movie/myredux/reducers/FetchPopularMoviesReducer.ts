import actionsTypes from '../constants/actionTypes';
import {MovieListModel} from '../../Models/MovieDataModel';

export type FetchMoviesListModel = {
  loading: boolean;
  data: MovieListModel;
  error: string;
};

const initialState: FetchMoviesListModel = {
  loading: false,
  data: {
    page: 0,
    results: [],
    total_results: 0,
    total_pages: 0,
  },
  error: '',
};

const popularMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_POPULAR_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.FETCH_POPULAR_MOVIES_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: '',
      };
    case actionsTypes.FETCH_POPULAR_MOVIES_FAILURE:
      return {
        loading: false,
        data: {
          page: 0,
          results: [],
          total_results: 0,
          total_pages: 0,
        },
        error: action.payload,
      };
    default:
      return state;
  }
};

export default popularMoviesReducer;
