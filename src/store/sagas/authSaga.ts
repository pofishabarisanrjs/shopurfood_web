// src/store/sagas/authSaga.ts
import { call, put, takeLatest } from 'redux-saga/effects';
import { LOGIN_REQUEST, loginSuccess, loginFailure } from '../actions/authActions';
import { authenticateUser } from '../../services/authService';
function* loginSaga(action: any): Generator<any, void, any> {
  try {
    const response = yield call(authenticateUser, action.payload.email, action.payload.password);
    console.log(response);
    if (response.success) {
      yield put(loginSuccess(response.token));
      localStorage.setItem('authToken', response.token);
    } else {
      yield put(loginFailure(response.message));
    }
  } catch (error) {
    yield put(loginFailure('An error occurred'));
  }
}

export default function* authSaga() {
  yield takeLatest(LOGIN_REQUEST, loginSaga);
}