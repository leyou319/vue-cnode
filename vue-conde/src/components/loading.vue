<template>
	<div class="loading">正在加载...</div>
</template>

<style lang="scss">
	@import '../assets/sass/common.scss';
	.loading{
		position: fixed;
		top: 50%;
		left: 50%;
		width: 120px;
		height: 120px;
		margin: -60px 0 0 -60px;
		padding-top: 90px;
		text-align: center;
		color: #fff;
		background: url(../assets/images/loading.gif) no-repeat 50% 40%;
		background-size: 60px auto;
		background-color: rgba(0,0,0,.6);
		border-radius: 8px;
		@extend %borderBox;
	}
</style>