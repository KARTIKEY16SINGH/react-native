import {
  fetchImageUrlFailure,
  fetchImageUrlRequest,
  fetchImageUrlSuccess,
} from '../myredux/actions/FetchImageUrlAction';
import FetchPopularMoviesActions from '../myredux/actions/FetchPopularMoviesAction';
import store from '../myredux/store/store';
import DataManager from './DataManager';
import HTTPManager from './HTTPManager';
import UrlManager from './UrlManager';

class FetchManager {
  static shared = new FetchManager();

  private constructor() {}

  fetchPopularMovie() {
    // store.dispatch(FetchPopularMoviesActions.fetchRequest());
    HTTPManager.getData(
      UrlManager.shared.PopularMovieURL,
      json => store.dispatch(FetchPopularMoviesActions.fetchSuccess(json)),
      error => store.dispatch(FetchPopularMoviesActions.fetchFailure(error)),
    );
  }

  fetchImageConfigUrl() {
    store.dispatch(fetchImageUrlRequest());
    HTTPManager.getData(
      UrlManager.shared.imageConfigurationURL,
      json => {
        store.dispatch(fetchImageUrlSuccess(json));
      },
      error => {
        store.dispatch(fetchImageUrlFailure(error));
      },
    );
  }

  fetchInitialData() {
    this.fetchPopularMovie();
  }
}

export default FetchManager;
