<template>
	<div class="modal-box" v-show="showModal" @click="close">
		<div id="mask"></div>
		<div class="modal-wrapper" id="modal">
		    <div class="modal-head">消息</div>
		    <div class="modal-body">
		        您还没登录CNODE，是否前往认证登录?
		    </div>
		    <div class="modal-foot">
		        <a href="javascript:;" class="btn btn-cancel" @click="close">取消</a>
		        <a href="javascript:;" class="btn btn-sure" @click="toLogin">确定</a>
		    </div>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			showModal: false
		},
		methods: {
			close () {
				this.$emit('close');
			},
			toLogin () {
				this.$router.push({path: '/login'});
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/sass/common.scss';
	#mask{
		z-index: 99;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0,0,0,.5);
	}

	.modal-wrapper{
		z-index: 100;
		position: fixed;
		top: 50%;
		left: 50%;
		width: 280px;
		background: #fff;
		border-radius: 8px;
		overflow: hidden;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		-webkit-transform: translate(-50%,-50%);
		transform: translate(-50%,-50%);
		@at-root .modal-head{
			padding: 15px 0 5px;
			text-align: center;
			font-size: 20px;
		}
		@at-root .modal-body{
			padding: 10px 15px;
			text-align: justify;
			font-size: 16px;
		}
		@at-root .modal-foot{
			height: 40px;
			border-top: 1px solid #ccc;
			@extend %flexBox;
			.btn{
				@extend %flexOne;
				line-height: 40px;
				text-align: center;
				color: #666;
				&:first-child{
					border-right: 1px solid #ccc;
				}
				&.btn-sure{
					color: #80bd01;
				}
			}
		}
	}
</style>