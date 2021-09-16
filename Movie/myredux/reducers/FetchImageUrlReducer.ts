// import { Action } from "redux";

import {Action} from 'redux';
import actionsTypes from '../constants/actionTypes';

const initialState = {
  loading: false,
  imageURL: '',
  error: '',
};

const fetchImageUrlReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.FETCH_IMAGE_URL_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case actionsTypes.FETCH_IMAGE_URL_SUCCESS:
      return {
        ...state,
        loading: false,
        imageURL: action.payload.images.secure_base_url,
        error: '',
      };
    case actionsTypes.FETCH_IMAGE_URL_FAILURE:
      return {
        ...state,
        loading: false,
        imageURL: '',
        error: action.payload,
      };
    default:
      return state;
  }
};

export default fetchImageUrlReducer;
