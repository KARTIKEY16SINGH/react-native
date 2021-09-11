import {MovieListModel} from '../Models/MovieDataModel';
import store from '../myredux/store/store';

class DataManager {
  static readonly shared = new DataManager();
  private imageConfigUrl;
  private constructor() {}
  private TAG = 'DataManager';
  private _popularMoviesList: MovieListModel;

  get popularMoviesList() {
    return this._popularMoviesList;
  }

  set popularMoviesList(newValue: MovieListModel) {
    // console.log(
    //   this.TAG,
    //   'popularMoviewList()',
    //   'oldValue ==> ',
    //   this._popularMoviesList,
    // );
    // console.log(this.TAG, 'popularMoviewList()', 'newValue ==> ', newValue);
    this._popularMoviesList = newValue;
  }

  getFetchImageUrlData() {
    return store.getState().imageUrl;
  }
}

export default DataManager;
