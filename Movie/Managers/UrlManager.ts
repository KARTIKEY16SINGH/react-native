class UrlManager {
  static shared = new UrlManager();

  private constructor() {}

  private baseUrl = 'https://api.themoviedb.org/3/movie/';
  private apiKey = 'a7c45dfdb6af135667cb25cb3b4d6141';

  getPopularMovieURL() {
    return 'https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey;
  }
}

export default UrlManager;
