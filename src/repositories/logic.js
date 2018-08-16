import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall } from '../common/utils'
import { ERROR } from '../common/container/Status/logic'
import { repo } from '../common/utils/data'

const REPO = 'REPO'
export const REPO_SUCCESS = 'REPO_SUCCESS'
const REPO_FAILURE = 'REPO_FAILURE'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false,
  flag: false
}

export const repoAction = payload => ({
  type: REPO,
  payload
})

const repoSuccess = payload => ({
  type: REPO_SUCCESS,
  payload
})

const url = 'https://api.github.com/users/'
export const repoEpic = action$ => action$
  .ofType(REPO)
  .mergeMap(action => staticAjax(apiCall(`${url}${action.payload}/repos`, 'GET'))
    .map(response => repoSuccess(response))
    .catch(error => Observable.of({
      type: REPO_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

export function repoReducer (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REPO: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false,
        flag: false
      }
    }
    case REPO_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        // data: repo,
        loading: false,
        error: false,
        flag: true
      }
    }
    case REPO_FAILURE: {
      return {
        ...state,
        data: repo,
        loading: false,
        error: false,
        flag: true
      }
    }
    default:
      return state
  }
}

