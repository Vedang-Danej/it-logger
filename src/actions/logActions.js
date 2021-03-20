import {
  GET_LOGS,
  SET_LOADING,
  LOGS_ERROR,
  ADD_LOG,
  DELETE_LOG,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_LOG,
  SEARCH_LOGS,
} from "./types";
import axios from "axios";
import objectToArray from "../utils/objectToArray";
export const getLogs = () => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(
      `https://it-logger-41041-default-rtdb.firebaseio.com/logs.json`
    );
    const obj = await res.json();
    const data = objectToArray(obj);
    dispatch({
      type: GET_LOGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};
export const searchLogs = (text) => async (dispatch) => {
  try {
    setLoading();
    const res = await fetch(
      `https://it-logger-41041-default-rtdb.firebaseio.com/logs.json?orderBy="$value"&equalTo=${text}`
    );
    const obj = await res.json();
    console.log(obj);
    const data = objectToArray(obj);
    dispatch({
      type: SEARCH_LOGS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response,
    });
  }
};
export const deleteLog = (key, id) => async (dispatch) => {
  try {
    setLoading();
    await fetch(
      `https://it-logger-41041-default-rtdb.firebaseio.com/logs/${
        key + ".json"
      }`,
      {
        method: "DELETE",
      }
    );

    dispatch({
      type: DELETE_LOG,
      payload: id,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response,
    });
  }
};
export const updateLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.put(
      `https://it-logger-41041-default-rtdb.firebaseio.com/logs/${
        log.key + ".json"
      }`,
      log
    );
    dispatch({
      type: UPDATE_LOG,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.message,
    });
  }
};
export const addLog = (log) => async (dispatch) => {
  try {
    setLoading();
    const res = await axios.post(
      "https://it-logger-41041-default-rtdb.firebaseio.com/logs.json",
      log
    );

    log.key = res.data.name;
    await axios.put(
      `https://it-logger-41041-default-rtdb.firebaseio.com/logs/${
        log.key + ".json"
      }`,
      log
    );
    const data = log;
    dispatch({
      type: ADD_LOG,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOGS_ERROR,
      payload: error.response.data,
    });
  }
};

export const setCurrent = (log) => {
  return {
    type: SET_CURRENT,
    paylaod: log,
  };
};
export const clearCurrent = () => {
  return {
    type: CLEAR_CURRENT,
  };
};

export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
