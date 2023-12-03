import * as types from "./actiontype";
import axios from "axios";

export const getAllStudent = () => (dispatch) => {
  dispatch({ type: types.GET_Student_REQUEST });
  return axios
    .get(` https://bpk-24ud.onrender.com/api/v1/student`)
    .then((res) => {
      dispatch({ type: types.GET_Student_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.GET_Student_FAILURE, payload: e });
    });
};
export const postStudent =({ name, studentId, major, enrollmentDate }) =>(dispatch) => {
    console.log(name, studentId, major, enrollmentDate);
    dispatch({ type: types.POST_Student_REQUEST });

    return axios
      .post(`https://bpk-24ud.onrender.com/api/v1/addstudent`, {
        name,
        studentId,
        major,
        enrollmentDate,
      })
      .then((res) => {
        dispatch({ type: types.POST_Student_SUCCESS, payload: res.data });
      })
      .catch((e) => {
        console.error("Error response from server:", e.response.data);
        dispatch({
          type: types.POST_Student_FAILURE,
          payload: e.response.data,
          isError: true,
        });
      });
  };

export const deleteStudent = (id) => (dispatch) => {
  console.log(id);
  dispatch({ type: types.DELETE_Student_REQUEST });

  return axios
    .delete(`https://bpk-24ud.onrender.com/api/v1/deletestudent/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({ type: types.DELETE_Student_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.DELETE_Student_FAILURE, payload: e });
    });
};

export const editStudent =(name, studentId, major, enrollmentDate, id) => (dispatch) => {
    console.log(name, studentId, major, enrollmentDate, id);
    dispatch({ type: types.EDIT_Student_REQUEST });

    return axios
      .put(`https://bpk-24ud.onrender.com/api/v1/editstudent`, {
        name: name,
        studentId: studentId,
        major: major,
        enrollmentDate: enrollmentDate,
        id: id,
      })
      .then((res) => {
        dispatch({ type: types.EDIT_Student_SUCCESS, payload: res.data });
      })
      .catch((e) => {
        dispatch({ type: types.EDIT_Student_FAILURE, payload: e });
      });
  };
