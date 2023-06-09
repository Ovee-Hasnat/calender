import { logOut, loginFailure, loginStart, loginSuccess } from "./userSlice";
import { publicRequest } from "../requestMethod";
import {
  calendarEventFailure,
  calendarEventStart,
  calendarEventSuccess,
  clearEventList,
  createEventStart,
  createEventSuccess,
  deleteStart,
  deleteSuccess,
  eventFetchingFailure,
  eventFetchingStart,
  eventFetchingSuccess,
  updateStart,
  updateSuccess,
} from "./eventSlice";

export const login = async (dispatch) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.get("/auth/auth");
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logout = async (dispatch) => {
  try {
    const res = await publicRequest.delete("/auth/signout");
    console.log(res.data);
    dispatch(logOut());
    dispatch(clearEventList());
  } catch (error) {
    console.log(error.message);
  }
};

export const getEvents = async (dispatch) => {
  dispatch(eventFetchingStart());
  try {
    const res = await publicRequest.get("/events/getcalendarevents");
    dispatch(eventFetchingSuccess(res.data));
  } catch (error) {
    dispatch(eventFetchingFailure());
    console.log(error.message);
  }
};

export const createEvent = async (dispatch, data) => {
  dispatch(createEventStart());
  try {
    const res = await publicRequest.post("/events/", data);
    dispatch(createEventSuccess());
    return res.status;
  } catch (error) {
    alert("Error at the server side!");
    console.log(error.message);
  }
};

export const deleteEvent = async (dispatch, id) => {
  dispatch(deleteStart());
  try {
    const res = await publicRequest.delete(`/events/${id}`);
    dispatch(deleteSuccess());
    return res.status;
  } catch (error) {
    alert("Error at the server side!");
    console.log(error.message);
  }
};

export const updateEvent = async (dispatch, id, rawData) => {
  console.log(id, rawData);
  dispatch(updateStart());
  try {
    const res = await publicRequest.put(`/events/${id}`, rawData);
    dispatch(updateSuccess());
    return res.status;
  } catch (error) {
    alert("Error at the server side!");
    console.log(error.message);
  }
};

export const outlookLogin = async (dispatch) => {
  //dispatch(loginStart());
  try {
    const res = await publicRequest.get("/outlook/login");
    console.log(res);
    //dispatch(loginSuccess(res.data));
  } catch (err) {
    //dispatch(loginFailure());
  }
};
