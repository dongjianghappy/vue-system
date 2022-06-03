import { Commit } from 'vuex'
import api from '../../api/index'
// import { } from '../../router/config'

const actions = {
  generateRoutes: async (context: { commit: Commit; state: any}, params: any = []) => {
    context.commit("setRoutes" , params);
  }
  
}

export default actions;