<template>
	<div class="create-form">
	    <input type="text" name="" id="title" placeholder="请输入标题" class="title" v-model="title">
	    <select name="" id="type" class="type" v-model="tab">
	        <option value="good">good</option>
	        <option value="share">share</option>
	        <option value="ask">ask</option>
	        <option value="job">job</option>
	    </select>
	    <textarea name="" id="content" class="content" placeholder="请输入内容" v-model="content"></textarea>
	    <div class="create-btn">
	        <a href="javascript:;" class="btn" @click="sendPost">发布话题</a>
	    </div>
	</div>
</template>

<script>
	import reqwest from 'reqwest';
	import api from '../fetch/api.js';
	var url = api.getTopics();
	var accesstoken = localStorage.getItem('accesstoken');

	export default {
		data () {
			return {
				title: '',
				tab: '分享',
				content: ''
			}
		},
		methods: {
			sendPost () {
				var self = this;
				if (this.title !== '' && this.content !== ''){					
					reqwest({
						url: url,
						method: 'post',
						data: {
							accesstoken: accesstoken,
							title: self.title,
							tab: self.tab,
							content: self.content
						}
					})
					.then(res => {
						console.log(res);
						self.$router.push('/');
					})
					.fail(err => {
						console.log(err);
					});
				}else {
					alert('输入内容不能为空！');
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/sass/common.scss';
	.create-form{
		padding: 10px 12px;
		.title{
			display: block;
			width: 100%;
			height: 44px;
			padding: 10px 12px;
			border: 0;
			background: #d6d6d6;
			@extend %borderBox;
		}
		.type{
			margin: 15px 0;
		}
		.content{
			display: block;
			width: 100%;
			height: 150px;
			padding: 10px;
			border: 0;
			background: #d6d6d6;
			@extend %borderBox;
		}
	}
</style>