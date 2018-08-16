import { combineReducers } from 'redux'
import { geneReducer } from '../../Dashboard/logic' 
import { orgReducer } from '../../organizations/logic'
import { repoReducer } from '../../repositories/logic'
import { profileReducer } from '../../profile/logic'

const rootReducer = combineReducers({
  gene: geneReducer,
  org: orgReducer,
  repo: repoReducer,
  profile: profileReducer
})

export default rootReducer
