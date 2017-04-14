import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  all: []
}

// getters
const getters = {
  allAdvertise: state => state.all
}

// actions
const actions = {
  getAdvertise ({ commit }, cb) {
    shop.getAdvertise(
      advertisements => {commit(types.RECEIVE_ADVERTISE, { advertisements, cb })}
    )
  }
}

// mutations
const mutations = {
  [types.RECEIVE_ADVERTISE] (state, { advertisements, cb }) {
    state.all = advertisements;
    cb();
  }
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
