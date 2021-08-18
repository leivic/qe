const state = {
  zone: '冲压车间'
}

const mutations = {
  CHANGE_ZONE: (state, zone) => {
    state.zone = zone
  }
}

export default {
  state,
  mutations
}
