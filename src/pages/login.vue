<template>
	<div id="login">
		<div class="top">
			<div class="title">
				<img class="titleImg" src="~assets/images/index/logo.png" />
				<span class="titleWord">欢迎使用恒润MES平台</span>
			</div>
			<el-button class="changeLogin" icon="d-arrow-right" type="primary" size="small" @click="workstation">切换工作站系统</el-button>
		</div>
		<div class="banner">
			<div class="image">
				<img src="~assets/images/index/image.png" />
			</div>
			<div class="login">
				<div class="loginBox">
					<div class="wel">
						欢迎登录系统
					</div>
					<div class="pls">
						请登录
					</div>
					<div class="loginForm">
						<el-form :model="form" :rules="rules" ref="form">
							<el-form-item prop="username">
								<el-input type="text" name="username" v-model="form.username" placeholder="请输入用户名" />
							</el-form-item>
							<el-form-item prop="password">
								<el-input type="password" class="passwordInput" name="password" v-model="form.password" placeholder="请输入密码"  @keyup.enter.native="login"/>
							</el-form-item>
							<div class="remember">
								<span class="icon-check-empty checkbox"></span>
								<span>记住密码</span>
							</div>
							<el-button type="button" class="btn btn-primary" @click="login">Sign in</el-button>
						</el-form>
					</div>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="footer">
				<img src="~assets/images/index/hr.png" />
				<span>版权所有 北京经纬恒润科技有限公司</span>
			</div>
		</div>
	</div>
</template>

<script>
	import { checkPsw } from './service'
	export default {
		data() {
			const password = (rule, value, callback) => {
				if(value) {
					checkPsw(this.form).then((res) => {
						if(res.content.length < 0) {
							callback(new Error('账号或密码错误'));
						} else {
							callback()
						}
					})

				}
			};
			return {
				form: {
					username: '',
					password: ''
				},
				rules: {
					username: [{
						required: true,
						message: "账号必填",
						trigger: 'change'
					}],
					password: [{
						required: true,
						message: "密码必填",
						trigger: 'change'
					}, {
//						validator: _.debounce(password, 1000),
//						trigger: 'change'
					}]
				},
				loading: false,
				wrong: false
			}
		},
		methods: {
			login() {
				this.loading = true;
				this.$refs.form.validate(valid => {
					this.loading = false;
					if(valid) {
						this.$store.dispatch('login', this.form).then(() => {
							this.$router.addRoutes(this.$store.getters.routes)
							this.$router.push({
								path: '/home'
							});
						});
					}
				});
			},
			workstation(){
				this.$router.push({
					path: '/wsLogin'
				});
			}
		}
	}
</script>

<style>
	#login {
		height: 100%;
		width: 100%;
		background-color: #FFF;
	}

	#login>.banner {
		height: 75%;
		width: 100%;
		background-image: url("~assets/images/index/bg.png");
		background-size: 100% 100%;
		position: absolute;
		top: 15%
	}

	#login>.banner>div {
		height: 100%;
		width: 50%;
		float: left;
		position: relative;
	}

	#login>.banner>.image {
		padding-right: 50px;
	}

	#login>.banner>.image img {
		position: absolute;
		top: calc(50% - 261px);
		left: calc(50% - 373px);
	}
	#login>.banner>.login .loginBox {
		position: absolute;
		top: calc(50% - 200px);
		left: calc(50% - 180px);
		height: 400px;
		width: 360px;
		background: #FFF;
		padding: 25px
	}

	#login>.banner>.login .loginBox>.wel {
		text-align: center;
		padding: 10px;
		color: rgb(51, 138, 241);
		font-size: 22px;
		font-weight: bolder;
		letter-spacing: 2px;
	}

	#login>.banner>.login .loginBox>.pls {
		text-align: center;
		padding: 10px;
		color: #666;
	}

	#login>.top {
		position: absolute;
		top: 0;
		height: 15%;
		width: 100%;
	}

	#login>.top .changeLogin {
		position: absolute;
		top: calc(50% - 14px);
		right: calc(25% - 180px);
	}
	#login>.top .title {
		position: absolute;
		top: calc(50% - 35px);
		left: 10%;
	}
	
	#login>.top .title .titleWord {
		font-size: 22px;
		letter-spacing: 2px;
		line-height: 70px;
		float: left;
	}
	
	#login>.top .title .titleImg {
		float: left;
		margin-right: 20px;
	}

	#login>.bottom {
		position: absolute;
		bottom: 0;
		height: 10%;
		width: 100%;
		text-align: center;
	}

	#login>.bottom .footer {
		position: absolute;
		top: calc(50% - 11px);
		left: calc(50% - 180px);
		height: 23px;
		width: 360px;
	}
	
	#login>.bottom .footer span {
		border-left: 1px solid #ccc;
		margin-left: 20px;
		padding-left: 20px;
		line-height: 23px;
		float: left;
	}
	
	#login>.bottom .footer img {
		float: left;
	}

	#login .loginForm {
		float: left;
		width: 100%;
		padding-top: 20px;
	}
	#login .loginForm .el-input__inner {
		display: inline-block;
		height: 50px;
	}

	#login .loginForm .passwordInput {
		margin-top: 20px;
	}

	#login .loginForm .el-form-item {
		margin-bottom: 0;
	}

	#login .loginForm button {
		width: 100%;
		height: 50px;
		background-color: rgb(86, 136, 250);
		margin-top: 10px;
		color: #fff;
	}

	#login .loginForm .remember {
		color: rgb(180, 180, 180);
		margin-top: 20px;
	}

	#login .loginForm .remember .checkbox {
		font-size: 18px;
		position: relative;
		top: 2px;
		display: inline-block;
		width: 18px;
	}
</style>
