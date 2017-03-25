<template>
	<div class="footer">
	    <a href="javascript:;" class="link on">首页</a>
	    <a href="javascript:;" class="link" @click="enterUser">我</a>
	</div>
</template>

<script>
	var userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
	var name = userInfo.loginname;

	export default {
		methods: {
			enterUser () {
				if (!name) {
					this.$router.push('/login');
				}else {
					this.$router.push({name: 'my', params: {loginname: name}});
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/sass/common.scss';
	.footer{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 48px;
		border-top: 1px solid #ccc;
		background: #fff;
		@extend %flexBox;
		a.link{
			line-height: 48px;
			text-align: center;
			font-size: 20px;
			@extend %flexOne;
			&:first-child{
				border-right: 1px solid #ccc;
			}
			&.on{
				color: #80bd01;
			}
		}
	}
</style>