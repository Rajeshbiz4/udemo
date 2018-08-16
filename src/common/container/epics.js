import { combineEpics } from 'redux-observable'
import { geneEpic } from '../../Dashboard/logic'
import { orgEpic } from '../../organizations/logic'
import { repoEpic } from '../../repositories/logic'
import { profileEpic } from '../../profile/logic'

const rootEpic = combineEpics(
  geneEpic,
  orgEpic,
  repoEpic,
  profileEpic
)

export default rootEpic
