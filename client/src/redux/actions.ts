import axios from 'axios';
import { API_URL } from '../constants';
import { Dispatch } from 'redux';

export const getVideogames = () => {
  return async (dispatch: Dispatch) => {
    let json = await axios.get(`${API_URL}/videogames`);
    return dispatch({
      type: 'GET_VIDEOGAMES',
      payload: json.data,
    });
  };
};

export const getGenres = () => {
  return async (dispatch: Dispatch) => {
    let json = await axios.get(`${API_URL}/genres`);
    return dispatch({
      type: 'GET_GENRES',
      payload: json.data,
    });
  };
};

export const filterByGenre = (payload: string) => {
  return {
    type: 'FILTER_BY_GENRE',
    payload,
  };
};

export const filterByRating = (payload: string) => {
  return {
    type: 'FILTER_BY_RATING',
    payload,
  };
};

export const sortByName = (payload: string) => {
  return {
    type: 'SORT_BY_NAME',
    payload,
  };
};

export const getByName = (name: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const json = await axios.get(`${API_URL}/videogames?name=${name}`);
      return dispatch({
        type: 'GET_BY_NAME',
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterNew = (payload: string) => {
  return {
    type: 'FILTER_NEW',
    payload,
  };
};

export const getById = (id: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const json = await axios.get(`${API_URL}/videogames/${id}`);
      console.log(json.data);
      return dispatch({
        type: 'GET_BY_ID',
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const filterApiDb = (payload: string) => {
  return {
    type: 'FILTER_API_DB',
    payload,
  };
};

export const postVideogame = (payload: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const json = await axios.post(`${API_URL}/videogames`, payload);
      return dispatch({
        type: 'POST_VIDEOGAME',
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const getPlatforms = () => {
  return async (dispatch: Dispatch) => {
    let json = await axios.get(`${API_URL}/platforms`);
    return dispatch({
      type: 'GET_PLATFORMS',
      payload: json.data,
    });
  };
};
