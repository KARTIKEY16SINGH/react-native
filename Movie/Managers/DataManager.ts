import {MovieListModel} from '../Models/MovieDataModel';
import store from '../myredux/store/store';

class DataManager {
  static readonly shared = new DataManager();
  private imageConfigUrl;
  private constructor() {
    store.subscribe(() => {
      // console.log(this.TAG, 'states ==> ', store.getState());
      const {popularMovies} = store.getState();
      if (popularMovies.loading == false && popularMovies.error === '') {
        this._popularMoviesList = popularMovies.data;
      }
    });
  }
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

  getPopularMoviesData() {
    return store.getState().popularMovies;
  }
}

export default DataManager;
