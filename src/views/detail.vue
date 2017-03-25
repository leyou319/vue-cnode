<template>
	<div class="detail-wrapper">
	    <div class="detail-article">
	    	<div class="detail-head">
                <div class="user-avatar">
                	<img :src="topic.author.avatar_url" alt="">
                </div>
                <div class="user-info">
                	<p class="name">
                		{{topic.author.loginname}}<span class="type">{{topic.tab}}</span>
                	</p>
                	<p class="time">
                		{{topic.create_at | formatDate}}•<span>{{topic.visit_count}}次浏览</span>
                	</p>
            	</div>
            	<a href="javascript:;" class="btn-keep" v-if="topic.is_collect === false" @click="keepTopic(topic.id)">收藏</a>
            	<a href="javascript:;" class="btn-keep on" v-else @click="cancelTopic(topic.id)">取消收藏</a>
            </div>
            <div class="detail-title">{{topic.title}}</div>
            <div class="detail-content" v-html="topic.content"></div>
	    </div>
	    <div class="detail-comment">
	        <h1 class="title">评论</h1>
	        <div class="comment-wrapper" v-for="(item, index) in topic.replies">
                <div class="comment-avatar">
                	<img :src="item.author.avatar_url" alt="">
                </div>
                <div class="comment-info">
                    <p class="name">{{item.author.loginname}}</p>
                    <p class="time">{{item.create_at | formatDate}}</p>
                    <div class="content" v-html="item.content"></div>
                </div>
                <a href="javascript:;" class="btn-good" :class="{'on': item.is_uped}" @click="goodFor(item.id, index)"><em v-if="item.ups.length > 0">{{item.ups.length}}</em></a>
            </div>
	    </div>
	    <div class="new-comment">
	        <textarea name="" id="" placeholder="请输入您的评论" class="cont" v-model="userReply"></textarea>
	        <input type="button" value="评论" class="btn" @click="postReply(topic.id)">
	    </div>
	    <div class="loading-wrapper" v-if="loading">
	    	<loading></loading>
	    </div>
	    <modal :showModal="showModal" v-on:close="closeMoal"></modal>
	</div>
</template>

<script>
	import loading from '../components/loading.vue';
	import modal from '../components/modal.vue';
	import reqwest from 'reqwest';
	import api from '../fetch/api.js';
	var collect_url = api.getCollect();
	var del_collect_url = api.getDelCollect();
	var accesstoken = localStorage.getItem('accesstoken');
	var userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
	var userID = userInfo.id;
	var userName = userInfo.loginname;
	var userHead = userInfo.avatar_url;

	export default {
		data () {
			return {
				showModal: false,
				loading: false,
				topic: {
					author: {},
					replies: [
						{
							author: {
								avatar_url: '',
								loginname: ''
							},
							ups: [],
							id: '',
							create_at: '',
							content: ''
						}
					]
				},
				userReply: ''
			}
		},
		components: {
			loading,
			modal
		},
		created () {
			this.getData();
		},
		methods: {
			getData () {
				let self = this;
				let id = this.$route.params.id;
				let url = api.getTopicById(id);
				this.loading = true;
				reqwest({
					url: url,
					method: 'get',
					data: {
						accesstoken: accesstoken
					}
				})
				.then(function(res){
					console.log(res);
					let data = res.data;
					self.topic = data;
					self.loading = false;
				})
				.fail(function(err){
					console.log(err);
				});
			},
			keepTopic (id) {
				let self = this;
				let flag = this.getUserLog();
				if (flag) {
					reqwest({
						url: collect_url,
						method: 'post',
						data: {
							accesstoken: accesstoken,
							topic_id: id
						}
					})
					.then(res => {
						console.log(res);
						self.topic.is_collect = true;
					})
					.fail(err => {
						console.log(err);
					});
				}else {
					this.showModal = true;
				}
			},
			cancelTopic (id) {
				let self = this;
				reqwest({
					url: del_collect_url,
					method: 'post',
					data: {
						accesstoken: accesstoken,
						topic_id: id
					}
				})
				.then(res => {
					console.log(res);
					self.topic.is_collect = false;
				})
				.fail(err => {
					console.log(err);
				});
			},
			goodFor (id, index) {
				let self = this;
				let reply = this.topic.replies[index];
				let ups = this.topic.replies[index].ups;
				let url = api.getUp(id);
				let flag = this.getUserLog();
				if (flag) {
					reqwest({
						url: url,
						method: 'post',
						data: {
							accesstoken: accesstoken
						}
					})
					.then(res => {
						console.log(res);
						if(res.action == 'up'){
							ups.push(userID);
							reply.is_uped = true;
						}else {
							ups.pop(userID);
							reply.is_uped = false;
						}						
					})
					.fail(err => {
						console.log(err);
					});
				}else {
					this.showModal = true;
				}
			},
			getUserLog () {
				let flag = Boolean(localStorage.getItem('loginStatus'));
				return flag;
			},
			closeMoal () {
				this.showModal = false;
			},
			postReply (id) {
				let self = this;
				let flag = this.getUserLog();
				let url = api.getReply(id);
				let replyContent = this.userReply;
				if (flag) {
					if (replyContent !== ''){
						reqwest({
							url: url,
							method: 'post',
							data: {
								accesstoken: accesstoken,
								content: replyContent
							}
						})
						.then(res => {
							console.log(res);
							let _id = res.reply_id;
							let obj = {
								id: _id,
								author: {
									avatar_url: userHead,
									loginname: userName
								},
								create_at: new Date().getTime(),
								content: replyContent,
								ups: []
							};
							self.topic.replies.push(obj);
							self.userReply = '';
						})
						.fail(err => {
							console.log(err);
						})
					}else {
						alert('评论内容不能为空！');
					}
				}else {
					this.showModal = true;
				}
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/sass/common.scss';
	.detail-article{
		background: #fff;
	}
	.detail-head{
		padding: 10px 12px;
		border-bottom: 1px solid #ccc;
		background: #fff;
		@extend %flexBox;
		.user-avatar{
			width: 50px;
			height: 50px;
			background: url("../assets/images/avatar.png") no-repeat;
			background-size: 100% auto;
			border-radius: 50%;
			overflow: hidden;
			img{
				display: block;
				width: 50px;
				height: 50px;
			}
		}
		.user-info{
			padding: 0 10px;
			@extend %flexOne;
			.name{
				margin: 5px 0 0;
				.type{
					display: inline-block;
					padding: 0 5px;
					margin-left: 5px;
					font-size: 12px;
					color: #80bd01;
					border: 1px solid #80bd01;
					border-radius: 5px;
				}
			}
			.time{
				margin: 5px 0 0;
				font-size: 12px;
				color: #666;
				span{
					color: #999;
				}
			}
		}
		.btn-keep{
			display: block;
			height: 30px;
			line-height: 30px;
			text-align: center;
			margin: 10px 0;
			padding: 0 10px;
			font-size: 16px;
			color: #fff;
			background: #80bd01;
			border-radius: 5px;
			@extend %borderBox;
			&.on{
				color: #fff;
				background: #e1e1e1;
			}
		}
	}

	.detail-title{
		position: relative;
		padding: 10px 12px;
		font-size: 18px;
		font-weight: 500;
		&:after{
			content: '';
			position: absolute;
			bottom: 0;
			left: 12px;
			right: 12px;
			border-bottom: 1px dashed #ccc;
		}
	}

	.detail-content{
		padding: 0 12px 5px;
		color: #000;
		line-height: 1.6;
		img{
			max-width: 100%;
		}
	}

	.detail-comment{
		padding: 10px 0 0;
		background: #f1f1f1;
		h1.title{
			margin: 0;
			font-weight: normal;
			padding: 8px 12px;
			font-size: 18px;
			border-bottom: 1px solid #ccc;
			background: #fff;
		}
	}

	.comment-wrapper{
		position: relative;
		padding: 10px 12px;
		background: #fff;
		&:after{
			content: '';
			position: absolute;
			bottom: 0;
			left: 12px;
			right: 0;
			height: 1px;
			background: #ccc;
		}
		@extend %flexBox;
		img{
			max-width: 100%;
		}
		@at-root .comment-avatar{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			background: url("../assets/images/avatar.png") no-repeat;
			background-size: 40px auto;
			overflow: hidden;
			img{
				display: block;
				width: 40px;
				height: 40px;
			}
		}
		@at-root .comment-info{
			padding: 0 0 0 10px;
			@extend %flexOne;
			p{
				margin: 0;
			}
			.name{
				padding: 5px 0 0;
			}
			.time{
				font-size: 12px;
				color: #666;
			}
			.content{
				padding-top: 5px;
			}
		}
		.btn-good{
			position: absolute;
			top: 5px;
			right: 10px;
			height: 40px;
			line-height: 40px;
			text-align: right;
			padding: 0 0 0 20px;
			background: url("../assets/images/icon_like.png") no-repeat left center;
			background-size: 20px auto;
			@extend %borderBox;
			&.on{
				background-image: url("../assets/images/icon_like_on.png");
			}
		}
	}

	.comment-none{
		padding: 15px 0;
		text-align: center;
		font-size: 16px;
		color: #999;
	}

	.markdown-text{
		a{
			color: #80bd01;
		}
		pre{
			white-space: normal;
		}
	}

	.new-comment{
		padding: 10px 12px;
		background: #fff;
		&:after{
			content: '';
			display: block;
			height: 0;
			clear: both;
		}
		.cont{
			display: block;
			width: 100%;
			height: 150px;
			padding: 10px;
			font-size: 16px;
			border: 0;
			background: #efecec;
			@extend %borderBox;
		}
		.btn{
			display: block;
			float: right;
			width: 100px;
			height: 40px;
			margin-top: 10px;
			line-height: 40px;
			text-align: center;
			font-size: 18px;
			color: #fff;
			border-radius: 5px;
			border: 0;
			background: #80bd01;
		}
	}

</style>