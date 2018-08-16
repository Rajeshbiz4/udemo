import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall } from '../common/utils'
import { ERROR } from '../common/container/Status/logic'
import { repo } from '../common/utils/data'

const PROFILE = 'PROFILE'
export const PROFILE_SUCCESS = 'PROFILE_SUCCESS'
const PROFILE_FAILURE = 'PROFILE_FAILURE'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  flag: false
}

export const profileAction = payload => ({
  type: PROFILE,
  payload
})

const profileSuccess = payload => ({
  type: PROFILE_SUCCESS,
  payload
})

const url = 'https://api.github.com/users/'
export const profileEpic = action$ => action$
  .ofType(PROFILE)
  .mergeMap(action => staticAjax(apiCall(`${url}${action.payload}`, 'GET'))
    .map(response => profileSuccess(response))
    .catch(error => Observable.of({
      type: PROFILE_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

export function profileReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case PROFILE: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
        flag: false
      }
    }
    case PROFILE_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false,
        flag: true
      }
    }
    case PROFILE_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true,
        flag:false 
      }
    }
    default:
      return state
  }
}

