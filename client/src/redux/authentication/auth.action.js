import {
  AUTH_LOG_IN_SUCCESS,
  AUTH_LOG_IN_ERROR,
  AUTH_LOG_OUT,
} from "./auth.types";
import axios from "axios";
import Cookies from "js-cookie";

export const loginAPI = (data) => async (dispatch) => {
  try {
    let response = await axios.post("https://img-drive.onrender.com/users/login", data);
    console.log(response);
    if (response.status === 201) {
      Cookies.set("jwttoken", response.data.jwttoken);
      Cookies.set("userid",response.data.userid);
    }
    dispatch({
      type: AUTH_LOG_IN_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: AUTH_LOG_IN_ERROR,
    });
  }
};

export const logoutAPI = () => ({ type: AUTH_LOG_OUT });
