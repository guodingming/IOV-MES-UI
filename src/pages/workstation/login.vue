<template>
	<div id="wsLogin">
		<div class="top">
			<div class="title">
				<img class="titleImg" src="~assets/images/workstation/logo.png" />
				<span class="titleWord">工作站管理系统</span>
			</div>
			<el-button class="changeLogin" icon="d-arrow-right" type="primary" size="small" @click="mes">切换后台系统</el-button>
		</div>
		<div class="banner">
			<div class="image">
				<img src="~assets/images/workstation/icon.png" />
			</div>
			<div class="login">
				<div class="loginBox">
					<div class="person"></div>
					<div class="wel">
						欢迎使用工作站管理系统
					</div>
					<div class="loginForm">
						<el-form :model="form" :rules="rules" ref="form">
							<el-form-item prop="process">
								<mes-cascader class="left" name="process" ref="cascader" :data="workOrder" v-model="form.workOrder" placeholder="请选择工单" @change="getProcess" popper-class="wsLogin">
								</mes-cascader>
								<mes-cascader class="right" name="process" ref="cascader" :data="process" v-model="form.process" placeholder="请选择工序" popper-class="wsLogin">
								</mes-cascader>
							</el-form-item>
							<el-col v-if="mode=='word'">
								<el-form-item prop="username">
									<el-input type="text" name="username" v-model="form.username" placeholder="请输入用户名" />
								</el-form-item>
								<el-form-item prop="password">
									<el-input type="password" class="passwordInput" name="password" v-model="form.password" placeholder="请输入密码" @keyup.enter.native="login" />
								</el-form-item>
								<el-col class="loginButton">
									<el-button type="primary" @click="login">Sign in</el-button>
									<span class="sweepYard" @click="changeMode('scan')">扫码登录</span>
								</el-col>
							</el-col>
							<el-col v-if="mode=='scan'">
								<el-form-item prop="scan">
									<el-input type="text" name="scan" v-model="form.scan" placeholder="请扫码" />
								</el-form-item>
								<el-col class="scan">
									<img src="~assets/images/workstation/scan.png" />
								</el-col>
								<el-col class="loginButton">
									<el-button type="primary" @click="login">Sign in</el-button>
									<span class="sweepYard" @click="changeMode('word')">密码登录</span>
								</el-col>
							</el-col>
						</el-form>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="footer">
				<img src="~assets/images/workstation/hr.png" />
				<span>版权所有 北京经纬恒润科技有限公司</span>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		queryWorkOrder,queryProcess
	} from "./service"

	class Form {
		constructor() {
			this.workOrder = [];
			this.process = [];
			this.username = "";
			this.password = "";
			this.remember = false
		}
	}
	export default {
		created() {
			this.init()
		},
		data() {
			const workOrder = (rule, value, callback) => {
				if(this.form.workOrder.length == 0) {
					callback(new Error('请选择工单'));
				} else {
					callback()
				}
			};
			const process = (rule, value, callback) => {
				if(this.form.workOrder.length == 0) {
					callback(new Error('请选择工序'));
				} else {
					callback()
				}
			};
			return {
				mode: 'word',
				form: new Form(),
				rules: {
					username: [{
						required: true,
						message: "请填写账号",
						trigger: 'change'
					}],
					password: [{
						required: true,
						message: "请填写密码",
						trigger: 'change'
					}],
					scan: [{
						required: true,
						message: "请扫码或输入号码",
						trigger: 'change'
					}],
					workOrder: [{
						validator: workOrder,
						trigger: 'change'
					}],
					process: [{
						validator: process,
						trigger: 'change'
					}]
				},
				loading: false,
				workOrder: [],
				process: []
			}
		},
		methods: {
			init() {
				this.getWorkOrder()
			},
			async getWorkOrder() {
				let res = await queryWorkOrder()
				this.workOrder = this.$.processArray(res.content)
			},
			async getProcess(id) {
				this.process = []
				this.form.process = []
				let res = await queryProcess({
					workOrderId:id
				})
				this.process = this.$.processArray(res.content,{"name":"processName"})
			},
			changeMode(mode){
				this.mode=mode;
				this.$refs.form.resetFields()
			},
			login() {
				this.$refs.form.validate((valid) => {
					if(valid) {
						let data = {
							username: this.form.username,
							password: this.form.password,
							processId: this.form.process[0],
							workOrderId: this.form.workOrder[2]
						}
						this.$store.dispatch('wsLogin',data).then(() => {
							this.$router.push({
								path: '/wsIndex'
							});
						})
					}
				})
			},
			mes(){
				this.$router.push({
					path: '/login'
				});
			}
		}
	}
</script>

<style>
	#wsLogin {
		height: 100%;
		width: 100%;
		background-color: #FFF;
	}
	
	#wsLogin>.banner {
		height: 75%;
		width: 100%;
		background: rgb(54, 144, 235) url("~assets/images/workstation/map.png") 50% 100% no-repeat;
		background-size: auto 100%;
		position: absolute;
		top: 15%;
		border-bottom: 15px solid rgb(33, 101, 164);
	}
	
	#wsLogin>.banner>div {
		height: 100%;
		width: 50%;
		float: left;
		position: relative;
	}
	
	#wsLogin>.banner>.image img {
		position: absolute;
		top: calc(50% - 175px);
		left: calc(50% - 240px);
	}
	
	#wsLogin>.banner>.login .loginBox {
		position: absolute;
		top: calc(50% - 180px);
		left: calc(50% - 180px);
		height: 360px;
		width: 360px;
		padding: 35px 60px 25px;
		border-top: 20px solid rgb(33, 101, 164);
		background: #FFF url("~assets/images/workstation/formbg.png");
	}
	
	#wsLogin>.banner>.login .loginBox>.wel {
		text-align: center;
		color: rgb(93, 102, 112);
		font-size: 18px;
		font-weight: bolder;
		letter-spacing: 1px;
	}
	#wsLogin>.banner>.login .loginBox>.person {
		position: absolute;
		top:-50px;
		left:calc(50% - 33px);
		height:66px;
		width:66px;
		background: url("~assets/images/workstation/person.png");
	}
	
	#wsLogin>.top {
		position: absolute;
		top: 0;
		height: 15%;
		width: 100%;
	}
	
	#wsLogin>.top .changeLogin {
		position: absolute;
		top: calc(50% - 14px);
		right: calc(25% - 180px);
	}
	#wsLogin>.top .title {
		position: absolute;
		top: calc(50% - 35px);
		left: 10%;
	}
	
	#wsLogin>.top .title .titleWord {
		font-size: 22px;
		letter-spacing: 2px;
		line-height: 70px;
		float: left;
	}
	
	#wsLogin>.top .title .titleImg {
		float: left;
		margin-right: 20px;
	}
	
	#wsLogin>.bottom {
		position: absolute;
		bottom: 0;
		height: 10%;
		width: 100%;
		text-align: center;
	}
	
	#wsLogin>.bottom .footer {
		position: absolute;
		top: calc(50% - 11px);
		left: calc(50% - 180px);
		height: 23px;
		width: 360px;
	}
	
	#wsLogin>.bottom .footer span {
		border-left: 1px solid #ccc;
		margin-left: 20px;
		padding-left: 20px;
		line-height: 23px;
		float: left;
	}
	
	#wsLogin>.bottom .footer img {
		float: left;
	}
	
	#wsLogin .loginForm {
		float: left;
		width: 100%;
		height: 225px;
		padding: 35px 0 0px 0;
	}
	#wsLogin .loginForm .cascader{
		width:50%;
		float: left;
	}
	#wsLogin .loginForm .cascader.left .el-input__inner{
		border-radius: 4px 0 0 4px;
		border-right:none;
	}
	#wsLogin .loginForm .cascader.right .el-input__inner{
		border-radius: 0 4px 4px 0;
	}
	.wsLogin .el-cascader-menu__item{
		height:auto;
		line-height: auto;
		padding:5px 30px 5px 10px
	}
	#wsLogin .loginForm .el-input__inner{
		height:33px
	}
	#wsLogin .loginForm .el-form-item{
		margin-bottom:18px
	}
	#wsLogin .loginForm .scan {
		padding: 16px 0
	}
	
	#wsLogin .loginForm .loginButton {
		position: absolute;
		bottom: 25px;
		left: 60px;
		right: 60px;
		width: auto
	}
	
	#wsLogin .loginForm .loginButton button {
		padding: 6px 34px;
	}
	
	#wsLogin .loginForm .loginButton .sweepYard {
		float: right;
		color: rgb(93, 120, 151);
		line-height: 28px;
		cursor: pointer;
	}
</style>