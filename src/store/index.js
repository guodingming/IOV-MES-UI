import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import workstation from './modules/workstation';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
  	user,
  	workstation
  },
  getters:{
	  userInfo: state => state.user.userInfo,
	  menu: state => state.user.menu,
	  routes: state => state.user.routes,
	  wsUserInfo: state => state.workstation.userInfo
	}
});

export default store
