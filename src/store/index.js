import Vue from 'vue'
import Vuex from 'vuex'

import { Message } from 'element-ui';
import { request } from "@/network/request.js";
import { getTopList, getRecommendMusic } from '@/network/api.js'

import state from './state';
import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex)

export default new Vuex.Store({
  state,
  getters: {
    currentMusicInfo(state) {
      if (state.currentList[state.currentIndex] != null) {
        return state.currentList[state.currentIndex]
      } else {
        return {}
      }

    }
  },
  mutations,
  actions,
  modules: {
  }
})