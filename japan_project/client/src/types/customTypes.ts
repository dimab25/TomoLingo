export type Imageupload = {
  message: string;
  imgUrl: string;
};

export type User = {
  email: string;
  password: string;
  name: string;
  age: string;
  imageUrl: string;
  about: string;
  native_language: string;
  target_language_level: string;
  target_language: string;
  location: string;
  _id: string;
  posts: Posts[];
};

// MovieComments
export interface UploadComment{
  language_level: number
  comment: string
}

export interface MovieById {
  _id: string
  language_level: number
  movie_id: string
  rating: number
  user_id: UserId
  comment: string
  created_at: string
  updatedAt: string
  __v: number
}

export interface UserId {
  _id: string
  name: string
  imageUrl: string
}

// Posts
export interface Posts {
  _id: string;
  imageUrl: string;
  text: string;
  user_id: string;
  created_at: Date;
  updatedAt: Date;
}

export type Watchlist = {
  _id: string;
  imageUrl: string;
  movie_id: string;
  updatedAt: Date;
  user_id: string;
  created_at: Date;
};

// export interface Root {
//   message: string
//   chatByUser: ChatByUser
// }

export interface ChatByUser {
  _id: string
  users: UserMessageArray[]
  messages: Message[]
  __v: number
}

export interface UserMessageArray {
  _id: string
  name: string
  imageUrl: string
}

export interface Message {
  from_id: string
  to_id: string
  message: string
  from_name: string
  to_name: string
  _id: string
  created_at: string
  updatedAt: string
}


export interface Movies {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Series {
  backdrop_path?: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  adult: boolean;
  original_language: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
}

// SeriesDetails
export interface Series_Details {
  adult: boolean;
  backdrop_path: any;
  created_by: any[];
  episode_run_time: any[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air: any;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: any[];
  production_countries: ProductionCountry[];
  seasons: Season[];
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: any;
}

export interface Network {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: any;
  season_number: number;
  vote_average: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: any[];
}

// MovieDetails
export interface Movie_Details {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: SpokenLanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos: Videos;
}

export interface Genre {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: Result[];
}

export interface Result {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
}
