import state from './state'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'


const basic = {
  namespaced: true,
	state,
	actions,
	mutations,
	getters,
}

export default basic