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

function addPostAPI(data) {
  return axios.post("/api/post", data);
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

function* watchAddPost() {
  yield takeLatest("ADD_POST_REQUEST", addPost, 2000);
}

export default function* postSaga() {
  yield all([fork(watchAddPost)]);
}
