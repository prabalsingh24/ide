import { getRef } from "@/utils/firebase";

export default {
  namespaced: true,
  state: {
    isPairing: false,
    ref: null
  },
  mutations: {
    setFirebaseRef (state, val) {
      state.ref = val
    },
    enablePairMode (state) {
      state.isPairing = true
    }
  },
  actions: {
    async startCodeSharing({ commit }, {refKey, keepText = false}) {
      const firebaseRef = await getRef(refKey);
      commit('setFirebaseRef', firebaseRef);
      commit('enablePairMode', {keepText});
    }
  }
}
