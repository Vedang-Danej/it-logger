import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  SET_LOADING,
  TECHS_ERROR,
} from "./types";
import axios from "axios";
import objectToArray from "../utils/objectToArray";
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

export const getTechs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(
      `https://it-logger-41041-default-rtdb.firebaseio.com/techs.json`
    );
    const response = await res.json();
    const data = objectToArray(response);
    console.log(data);
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
    await fetch(
      `https://it-logger-41041-default-rtdb.firebaseio.com/techs/${
        id + ".json"
      }`,
      {
        method: "DELETE",
      }
    );

    dispatch({
      type: DELETE_TECH,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response,
    });
  }
};
export const addTech = (tech) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.post(
      "https://it-logger-41041-default-rtdb.firebaseio.com/techs.json",
      tech
    );
    tech.key = res.data.name;
    await axios.put(
      `https://it-logger-41041-default-rtdb.firebaseio.com/techs/${
        tech.key + ".json"
      }`,
      tech
    );
    const data = await res.data;
    console.log(data);
    dispatch({
      type: ADD_TECH,
      payload: tech,
    });
  } catch (error) {
    dispatch({
      type: TECHS_ERROR,
      payload: error.response.data,
    });
  }
};
