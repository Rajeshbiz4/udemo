import { Observable } from 'rxjs/Observable'
import { ajax as staticAjax } from 'rxjs/observable/dom/ajax'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/observable/of'
import { apiCall } from '../common/utils'
import { ERROR } from '../common/container/Status/logic'

const GENE_SUMMERY = 'GENE_SUMMERY'
export const GENE_SUMMERY_SUCCESS = 'GENE_SUMMERY_SUCCESS'
const GENE_SUMMERY_FAILURE = 'GENE_SUMMERY_FAILURE'

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: false
}

export const geneAction = payload => ({
  type: GENE_SUMMERY,
  payload
})

const geneSuccess = payload => ({
  type: GENE_SUMMERY_SUCCESS,
  payload
})


const url = 'https://api.github.com/users/'
export const geneEpic = action$ => action$
  .ofType(GENE_SUMMERY)
  .mergeMap(action => staticAjax(apiCall(`${url}${action.payload}`, 'GET'))
    .map(response => geneSuccess(response))
    .catch(error => Observable.of({
      type: GENE_SUMMERY_FAILURE,
      payload: error
    }, {
        type: ERROR,
        payload: error
      })))

export function geneReducer(state = INITIAL_STATE, action) {
  console.log(action.payload)
  switch (action.type) {
    case GENE_SUMMERY: {
      return {
        ...state,
        data: [],
        loading: true,
        error: false
      }
    }
    case GENE_SUMMERY_SUCCESS: {
      return {
        ...state,
        data: action.payload.response,
        loading: false,
        error: false
      }
    }
    case GENE_SUMMERY_FAILURE: {
      return {
        ...state,
        data: [],
        loading: false,
        error: false
      }
    }
    default:
      return state
  }
}

