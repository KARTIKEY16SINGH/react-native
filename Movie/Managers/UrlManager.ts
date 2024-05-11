import store from '../myredux/store/store';
import DataManager from './DataManager';

class UrlManager {
  static shared = new UrlManager();
  private baseImageUrl: string;
  private TAG = 'UrlManager';
  private constructor() {
    store.subscribe(() => {
      const imgConfigData = DataManager.shared.getFetchImageUrlData();
      if (!imgConfigData.loading) {
        if (imgConfigData.error === '') {
          this.baseImageUrl = imgConfigData.imageURL;
        }
      }
      // console.log(
      //   this.TAG,
      //   'subscribe',
      //   'imageConfigUrl == ',
      //   this.baseImageUrl,
      // );
    });
  }

  private baseUrl = 'https://api.themoviedb.org/3/movie/';
  private apiKey = 'a7c45dfdb6af135667cb25cb3b4d6141';

  get PopularMovieURL() {
    return this.baseUrl + 'popular?api_key=' + this.apiKey;
  }

  get imageConfigurationURL() {
    return 'https://api.themoviedb.org/3/configuration?api_key=' + this.apiKey;
  }

  getImageUrl(path): string {
    console.log(
      this.TAG,
      'getImageUrl(path) path ==>',
      this.baseImageUrl + 'original' + path,
    );

    return this.baseImageUrl + 'original' + path;
  }
}

export default UrlManager;
