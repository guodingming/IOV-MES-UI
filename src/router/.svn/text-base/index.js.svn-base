/**
 * Created by yue.hao on 2017/7/10.
 */
import Vue from 'vue'
import Router from 'vue-router'

//注册路由
Vue.use(Router)

const app = {
	login:resolve => require(['@/pages/login'], resolve),
	appIndex:resolve => require(['@/pages/appIndex'], resolve),
	wsLogin:resolve => require(['@/pages/workstation/login'], resolve),
	wsIndex:resolve => require(['@/pages/workstation/appIndex'], resolve),
	err:resolve => require(['@/pages/404'], resolve)
}

//配置路由
export default new Router({
	routes: [{
			path: '/',
			name: '登录',
			redirect: '/login'
		},
		{
			path: '/login',
			name: '登录',
			component: app.login
		},
		{
			path: '/wsLogin',
			name: '工作站登录',
			component: app.wsLogin
		},
		{
			path: '/wsIndex',
			name: '工作站主页',
			component: app.wsIndex
		},
        {
        	path: '*',
        	name: '404',
        	component: app.err 
        }
	]
})
