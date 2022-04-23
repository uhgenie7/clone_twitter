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
import { all } from "redux-saga/effects";
import axios from "axios";

// 여기서의 매개변수 data는 call의 두 번째 매개변수의 data
function logInAPI(data) {
  return axios.post("/api/login", data);
}

function logOutAPI() {
  return axios.post("/api/logout");
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

function* watchLogin() {
  yield takeLatest("LOG_IN_REQUEST", logIn);
}

function* watchLogout() {
  yield takeLatest("LOG_OUT_REQUEST", logOut);
}

export default function* userSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
