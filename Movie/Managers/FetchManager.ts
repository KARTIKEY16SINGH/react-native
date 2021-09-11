import {
  fetchImageUrlFailure,
  fetchImageUrlRequest,
  fetchImageUrlSuccess,
} from '../myredux/actions/FetchImageUrlAction';
import store from '../myredux/store/store';
import DataManager from './DataManager';
import HTTPManager from './HTTPManager';
import UrlManager from './UrlManager';

class FetchManager {
  static shared = new FetchManager();

  private constructor() {}

  fetchPopularMovie() {
    HTTPManager.getData(UrlManager.shared.PopularMovieURL, null, json => {
      // console.log('FetchManager fetchPopularMovie() data ==> ', json);
      DataManager.shared.popularMoviesList = json;
    });
  }

  fetchImageConfigUrl() {
    store.dispatch(fetchImageUrlRequest());
    HTTPManager.getData(
      UrlManager.shared.imageConfigurationURL,
      null,
      json => {
        store.dispatch(fetchImageUrlSuccess(json));
      },
      error => {
        store.dispatch(fetchImageUrlFailure(error));
      },
    );
  }
}

export default FetchManager;
