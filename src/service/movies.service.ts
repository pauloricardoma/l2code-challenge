import { API_KEYS } from "../constants/api-keys";
import { BASE_URLS } from "../constants/base-urls";
import { MoviesResponse } from "../types/movie.model";

export class MoviesService {
  static movies_list_url = `${BASE_URLS.TMDB}/discover/movie`;
  static movies_search_url = `${BASE_URLS.TMDB}/search/movie`;

  static async list(page: number, query?: string): Promise<MoviesResponse> {
    try {
      const url = query ? this.movies_search_url : this.movies_list_url;
      const response = await fetch(
        `${url}?page=${page}${query ? `&query=${query}` : ''}`,
        {
          method: 'GET',
          headers: {
            'accept': 'application/json',
            'Authorization': `Bearer ${API_KEYS.TMDB}`,
          },
        }
      );
      const data = await response.json();
      return data as MoviesResponse;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch movies');
    }
  }
}