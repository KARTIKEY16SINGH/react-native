import DataManager from './DataManager';
import HTTPManager from './HTTPManager';
import UrlManager from './UrlManager';

class FetchManager {
  static shared = new FetchManager();

  private constructor() {}

  fetchPopularMovie() {
    HTTPManager.getData(UrlManager.shared.getPopularMovieURL(), null, json => {
      // console.log('FetchManager fetchPopularMovie() data ==> ', json);
      DataManager.shared.popularMoviesList = json;
    });
  }
}

export default FetchManager;
