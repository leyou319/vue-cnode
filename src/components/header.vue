<template>
	<div class="header-wrapper">		
		<div class="header">
			<a href="javascript:history.back()" class="btn-back" v-if="showBack">返回</a>
		    <h1>CNODE 社区</h1>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			showBack: true
		}
	}
</script>
<style lang="scss">
	.header-wrapper{
		z-index: 2;
		position: relative;
		height: 36px;
	}
	.header{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		background: #333;
		&:after{
			content: '';
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 1px;
			background: #666;
		}
		h1{
			margin: 0;
			font-weight: normal;
			height: 36px;
			line-height: 36px;
			text-align: center;
			font-size: 20px;
			color: #fff;
		}
		.btn-back{
			position: absolute;
			top: 0;
			left: 0;
			height: 36px;
			padding-left: 20px;
			line-height: 36px;
			font-size: 14px;
			color: #fff;
			&:before{
				content: '';
				position: absolute;
				top: 14px;
				left: 10px;
				width: 8px;
				height: 8px;
				border: 1px solid #fff;
				border-top-color: #333333;
				border-right-color: #333333;
				-webkit-transform: rotate(45deg);
				transform: rotate(45deg);
			}
		}
	}
</style>