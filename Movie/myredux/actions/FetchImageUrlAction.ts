import actionsTypes from '../constants/actionTypes';

const fetchImageUrlSuccess = data => {
  return {
    type: actionsTypes.FETCH_IMAGE_URL_SUCCESS,
    payload: data,
  };
};

const fetchImageUrlFailure = error => {
  return {
    type: actionsTypes.FETCH_IMAGE_URL_FAILURE,
    payload: error,
  };
};

const fetchImageUrlRequest = () => {
  return {
    type: actionsTypes.FETCH_IMAGE_URL_REQUEST,
  };
};

export {fetchImageUrlSuccess, fetchImageUrlRequest, fetchImageUrlFailure};
