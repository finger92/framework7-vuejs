import shop from '../../api/shop'
import * as types from '../mutation-types'

// initial state
const state = {
  all: [],
  curProduct: {}
}

// getters
const getters = {
  allProducts: state => state.all,
  getCurProduct: state => state.curProduct
}

// actions
const actions = {
  getProducts ({ commit }, {page, from, cb}) {
    shop.getProducts(page,
                     cb,
      products => {commit(types.RECEIVE_PRODUCTS, { products, from })}
    )
  },
  getProductById ({ commit }, {id, cb, errorCb}) {
    shop.getProductById(
      id,
      cb,
      errorCb,
      product => {commit(types.RECEIVE_PRODUCT_BY_ID, { product })}
    )
  },
}

// mutations
const mutations = {
  [types.RECEIVE_PRODUCTS] (state, { products, from }) {
    if(from=='refresh'){
      state.all = products
    }
    if(from=='scroll'){
      state.all.push(...products)
    }
  },
  
  [types.RECEIVE_PRODUCT_BY_ID] (state, { product }) {
    state.curProduct = product
  },

  [types.ADD_TO_CART] (state, { id }) {
    state.all.find(p => p.id === id).inventory--
  },
  
}

export default {
  state,
  getters,
  actions,
  mutations
}
