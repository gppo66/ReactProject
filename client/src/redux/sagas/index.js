import { all } from 'redux-saga/effects';

// * generator function 여러 값을 반환하는 문법
export default function* rootSaga() {
  yield all([]);
}
