export interface MovieDataModel {
  poster_path?: string;
  adult: boolean;
  id: number;
  title: string;
  backdrop_path?: string;
  vote_average: number;
}

export interface MovieListModel {
  page: number;
  results: MovieDataModel[];
  total_results: number;
  total_pages: number;
}
