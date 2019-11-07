import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "10923b261ba94d897ac6b81148314a3f",
    language: navigator.language || navigator.userLanguage
  }
});

export const moviesApi = {
  nowPlaying: pages =>
    api.get("movie/now_playing", {
      params: {
        page: `${pages}`
      }
    }),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  movieSimilar: id =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "similar"
      }
    }),
  search: term =>
    api.get("search/movie", {
      params: {
        query: decodeURIComponent(encodeURIComponent(term))
      }
    }),
  collections: id => api.get(`collection/${id}`)
};

export const tvApi = {
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    }),
  showSimilar: id =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "similar"
      }
    }),
  search: term =>
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(encodeURIComponent(term))
      }
    }),
  seasons: (id, season_number) => api.get(`tv/${id}/season/${season_number}`)
};
