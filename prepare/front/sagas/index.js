import {
  all,
  fork,
  call,
  put,
  takeEvery,
  takeLatest,
  throttle,
  delay,
} from "redux-saga/effects";
import axios from "axios";

// 여기서의 매개변수 data는 call의 두 번째 매개변수의 data
function logInAPI(data) {
  return axios.post("/api/login", data);
}

function logOutAPI() {
  return axios.post("/api/logout");
}

function addPostAPI(data) {
  return axios.post("/api/post", data);
}

function* logIn(action) {
  try {
    // const result = yield call(logInAPI, action.data);
    yield delay(1000);
    yield put({
      type: "LOG_IN_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_IN_FAILURE",
      data: err.response.data,
    });
  }
}

function* logOut() {
  try {
    // const result = yield call(logOutAPI);
    yield delay(1000);
    yield put({
      type: "LOG_OUT_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "LOG_OUT_FAILURE",
      data: err.response.data,
    });
  }
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: "ADD_POST_SUCCESS",
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: "ADD_POST_FAILURE",
      data: err.response.data,
    });
  }
}

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogout() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost, 2000);
}

export default function* rootSaga() {
  yield all([fork(watchLogin), fork(watchLogout), fork(watchAddPost)]);
}
