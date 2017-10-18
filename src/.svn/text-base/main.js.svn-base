/**
 * Created by yue.hao on 2017/6/21.
 */

//vue全家桶
import Vue from 'vue'
import router from './router'
import store from './store'

//UI组件库
import MesUI from './components'
import errLog from '@/store/errLog';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'assets/fontawesome/css/font-awesome.min.css'

//插件库
import VueCodeMirror from 'vue-codemirror'
//工具库
import _ from "lodash"
import DataProcess from '@/config/dataProcess'

//核心文件
import App from './app'
import './directive'

import 'assets/jquery/jquery.min'
import "assets/bootstrap/bootstrap.min.js"
import "assets/bootstrap/bootstrap.min.css"
import 'assets/ztree/jquery.ztree.core'
import 'assets/ztree/jquery.ztree.excheck'
import 'assets/ztree/jquery.ztree.exedit'
import 'assets/ztree/zTreeStyle.css'
import 'assets/mCustomScrollbar/jquery.mCustomScrollbar.concat.min.js'
import 'assets/mCustomScrollbar/jquery.mCustomScrollbar.min.css'

/**
 * 注册库
 */
Vue.use(ElementUI)
Vue.use(VueCodeMirror)
Vue.prototype.$ = window.$M = DataProcess
window._ = _

//主题
import 'assets/style.css'
import 'assets/theme/blue.css'


router.beforeEach((to, from, next) => {
	let white = ['/login','/wsLogin']
	//通过不验证白名单
	if(white.indexOf(to.path) != -1){
		next()
	}
	//刷新之后(store数据清空)
	else if(!store.getters.userInfo&&!store.getters.wsUserInfo){
		//工作站主页验证
		if(to.path == '/wsIndex'){
			store.dispatch('wsAutoLogin').then(() => {
	         	next({ path: to.path });
	      	},() => {
	      		next({ path: '/wsLogin' });
	      	});
		}
		//后台主页验证
		else{
			store.dispatch('autoLogin').then(() => {
				router.addRoutes(store.getters.routes)
	         	next({ path: to.path });
	      	},() => {
	      		next({ path: '/login' });
	      	});
		}
		
	}
	//正常路由跳转
	else{
		next()
	}
});

//关闭生产模式的提示
Vue.config.productionTip = false
// 生产环境错误日志
//Vue.config.errorHandler = function(err, vm) {
//  errLog.pushLog({
//    err,
//    url: window.location.href,
//    vm
//  })
//};

//实例化Vue(入口)
const vm = new Vue({
  el: '#mes',
  router,
  store,
  template: '<App/>',
  components: { App }
})






export default vm