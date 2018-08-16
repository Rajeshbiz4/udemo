import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall } from '../common/utils'
import { ERROR } from '../common/container/Status/logic'

// Constants
const ORGN = 'ORGN'
export const ORGN_SUCCESS = 'ORGN_SUCCESS'
const ORGN_FAILURE = 'ORGN_FAILURE'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

// geneAction action
export const orgAction = payload => ({
  type: ORGN,
  payload
})
// gene Success action
const orgSuccess = payload => ({
  type: ORGN_SUCCESS,
  payload
})

// geneEpic
const url = 'https://api.github.com/users/'
export const orgEpic = action$ => action$
  .ofType(ORGN)
  .mergeMap(action => staticAjax(apiCall(`${url}${action.payload}/orgs`, 'GET'))
    .map(response => orgSuccess(response))
    .catch(error => Observable.of({
      type: ORGN_FAILURE,
      payload: error
    }, {
      type: ERROR,
      payload: error
    })))

// gene reducer updates both login and logout
export function orgReducer (state = INITIAL_STATE, action) {
  // console.log(action)
  switch (action.type) {
    case ORGN: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case ORGN_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false
      }
    }
    case ORGN_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: true
      }
    }
    default:
      return state
  }
}

