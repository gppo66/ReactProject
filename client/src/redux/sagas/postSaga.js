import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import {
  POSTS_LOADING_FAILURE,
  POSTS_LOADING_REQUEST,
  POSTS_LOADING_SUCCESS,
  POST_DELETE_FAILURE,
  POST_DELETE_REQUEST,
  POST_DELETE_SUCCESS,
  POST_DETAIL_LOADING_FAILURE,
  POST_DETAIL_LOADING_REQUEST,
  POST_DETAIL_LOADING_SUCCESS,
  POST_EDIT_LOADING_FAILURE,
  POST_EDIT_LOADING_REQUEST,
  POST_EDIT_LOADING_SUCCESS,
  POST_EDIT_UPLOADING_FAILURE,
  POST_EDIT_UPLOADING_REQUEST,
  POST_EDIT_UPLOADING_SUCCESS,
  POST_UPLOADING_FAILURE,
  POST_UPLOADING_REQUEST,
  POST_UPLOADING_SUCCESS,
} from '../types';

// ALL POSTS LOAD

const loadPostAPI = () => {
  return axios.get('/api/post');
};

function* loadPosts() {
  try {
    const result = yield call(loadPostAPI);
    console.log(result, 'LoadPosts');
    yield put({
      type: POSTS_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POSTS_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchLoadPosts() {
  yield takeEvery(POSTS_LOADING_REQUEST, loadPosts);
}

// POSTS UPLOAD

const uploadPostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  console.log(payload, 'payload');
  return axios.post('/api/post', payload, config);
};

function* uploadPosts(action) {
  try {
    console.log(action.payload, 'uploadPost function');
    const result = yield call(uploadPostAPI, action.payload);
    console.log(result, 'uploadPostAPI, action.payload');
    yield put({
      type: POST_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchuploadPosts() {
  yield takeEvery(POST_UPLOADING_REQUEST, uploadPosts);
}

// POST DETAIL
const loadPostdetailAPI = (payload) => {
  console.log(payload);
  return axios.get(`/api/post/${payload}`);
};

function* loadPostdetail(action) {
  try {
    console.log(action);
    const result = yield call(loadPostdetailAPI, action.payload);
    console.log(result, 'post_detail_saga_data');
    yield put({
      type: POST_DETAIL_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_DETAIL_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchloadPostdetail() {
  yield takeEvery(POST_DETAIL_LOADING_REQUEST, loadPostdetail);
}

//Post Delete
const DeletePostAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.delete(`/api/post/${payload.id}`, config);
};

function* DeletePost(action) {
  try {
    const result = yield call(DeletePostAPI, action.payload);

    yield put({
      type: POST_DELETE_SUCCESS,
      payload: result.data,
    });
    yield put(push('/'));
  } catch (e) {
    yield put({
      type: POST_DELETE_FAILURE,
      payload: e,
    });
  }
}

function* watchDeletePost() {
  yield takeEvery(POST_DELETE_REQUEST, DeletePost);
}

//Post EDIT LOAD
const PostEditLoadAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.get(`/api/post/${payload.id}/edit`, config);
};

function* PostEditLoad(action) {
  try {
    const result = yield call(PostEditLoadAPI, action.payload);

    yield put({
      type: POST_EDIT_LOADING_SUCCESS,
      payload: result.data,
    });
  } catch (e) {
    yield put({
      type: POST_EDIT_LOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchPostEditLoad() {
  yield takeEvery(POST_EDIT_LOADING_REQUEST, PostEditLoad);
}

//Post EDIT UPLOAD
const PostEditUploadAPI = (payload) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const token = payload.token;

  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return axios.post(`/api/post/${payload.id}/edit`, payload, config);
};

function* PostEditUpload(action) {
  try {
    const result = yield call(PostEditUploadAPI, action.payload);

    yield put({
      type: POST_EDIT_UPLOADING_SUCCESS,
      payload: result.data,
    });
    yield put(push(`/post/${result.data._id}`));
  } catch (e) {
    yield put({
      type: POST_EDIT_UPLOADING_FAILURE,
      payload: e,
    });
    yield put(push('/'));
  }
}

function* watchPostEditUpload() {
  yield takeEvery(POST_EDIT_UPLOADING_REQUEST, PostEditUpload);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchuploadPosts),
    fork(watchloadPostdetail),
    fork(watchDeletePost),
    fork(watchPostEditLoad),
    fork(watchPostEditUpload),
  ]);
}
