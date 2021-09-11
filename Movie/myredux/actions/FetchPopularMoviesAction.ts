import actionsTypes from '../constants/actionTypes';

const fetchSuccess = data => {
  return {
    type: actionsTypes.FETCH_POPULAR_MOVIES_SUCCESS,
    payload: data,
  };
};

const fetchFailure = error => {
  return {
    type: actionsTypes.FETCH_POPULAR_MOVIES_FAILURE,
    payload: error,
  };
};

const fetchRequest = () => {
  return {
    type: actionsTypes.FETCH_POPULAR_MOVIES_REQUEST,
  };
};

const FetchPopularMoviesActions = {fetchSuccess, fetchFailure, fetchRequest};

export default FetchPopularMoviesActions;
