import * as types from "./actiontype";
import axios from "axios";

export const getAllStudent = () => (dispatch) => {
  dispatch({ type: types.GET_Student_REQUEST });
  return axios
    .get(`http://localhost:4000/api/v1/student`)
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
      .post(`http://localhost:4000/api/v1/addstudent`, {
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

export const deleteStudent = (_id) => (dispatch) => {
  console.log(_id);
  dispatch({ type: types.DELETE_Student_REQUEST });

  return  axios
  .delete(`http://localhost:4000/api/v1/deletestudent/${_id}`)
  .then((res) => {
    console.log(res.data);
    dispatch({ type: types.DELETE_Student_SUCCESS, payload: res.data });
  })
  .catch((e) => {
    dispatch({ type: types.DELETE_Student_FAILURE, payload: e });
  });
};

export const editStudent1 = (_id , name , date , studentid , major) => (dispatch) => {
console.log(_id )
  
  dispatch({ type: types.EDIT_Student_REQUEST });

  return axios
    .put(`http://localhost:4000/api/v1/editstudent/${_id}`,{
      name:name,
      enrollmentDate:date,
      studentId:studentid,
      major:major

    })
    .then((res) => {
      dispatch({ type: types.EDIT_Student_SUCCESS, payload: res.data });
    })
    .catch((e) => {
      dispatch({ type: types.EDIT_Student_FAILURE, payload: e });
      console.log(e)
    });
};

