import { wsLogin, wsValidate, logout } from './service'

const workstation = {
	state: {
		userInfo: ''
	},

	mutations: {
		SET_USERINFO: (state, userInfo) => {
			state.userInfo = userInfo;
		}
	},

	actions: {
		//登录
		wsLogin({
			commit
		}, userInfo) {
			return new Promise((resolve, reject) => {
				wsLogin(userInfo).then((res) => {
					if(res.status == "success") {
						commit('SET_USERINFO', res.content);
						resolve()
					}
				})
			});
		},

		// 获取用户信息
		wsAutoLogin({
			commit
		}) {
			return new Promise((resolve, reject) => {
				wsValidate().then((res) => {
					if(res.status == "success") {
						commit('SET_USERINFO', res.content);
						resolve()
					} 
					else{
						reject()
					}
				},() => {
					reject()
				})
			})
		},

		//登录
		wsLogout({
			commit
		}) {
			return new Promise((resolve, reject) => {
				logout().then((res) => {
					if(res.status == "success") {
						commit('SET_USERINFO', null);
						resolve()
					}else{
						reject()
					}
				},()=>{
					reject()
				})
			});
		}
	}
};

export default workstation;