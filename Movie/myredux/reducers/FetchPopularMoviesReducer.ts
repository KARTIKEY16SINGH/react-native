import actionsTypes from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: undefined,
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
        data: {},
        error: action.payload,
      };
    default:
      return state;
  }
};

export default popularMoviesReducer;
