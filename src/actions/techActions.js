import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from "./types";
import axios from "axios";
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const getTechs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(`https://it-logger-api.herokuapp.com/techs`);
    const data = await res.json();
    dispatch({
      type: GET_TECHS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data,
    });
  }
};
export const deleteTech = (id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(`https://it-logger-api.herokuapp.com/techs/${id}`, {
      method: "DELETE",
    });

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data,
    });
  }
};
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.post(
      "https://it-logger-api.herokuapp.com/techs",
      tech
    );
    const data = await res.data;
    dispatch({
      type: ADD_TECH,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data,
    });
  }
};
