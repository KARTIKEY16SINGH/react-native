import {MovieListModel} from '../Models/MovieDataModel';

class DataManager {
  static readonly shared = new DataManager();
  private constructor() {}
  private TAG = 'DataManager';
  private _popularMoviesList: MovieListModel;

  get popularMoviesList() {
    return this._popularMoviesList;
  }

  set popularMoviesList(newValue: MovieListModel) {
    console.log(
      this.TAG,
      'popularMoviewList()',
      'oldValue ==> ',
      this._popularMoviesList,
    );
    console.log(this.TAG, 'popularMoviewList()', 'newValue ==> ', newValue);
    this._popularMoviesList = newValue;
  }
}

export default DataManager;
