<template>
	<div class="my-wrapper">
	    <div class="user-panel-wrapper">
			<div class="user-panel">
               	<div class="avatar"><img :src="userData.avatar_url" alt=""></div>
               	<div class="name">{{userData.loginname}}</div>
           	</div>
	    </div>
	    <h3 class="user-title">最近创建的话题</h3>
	    <div class="topics-list">
			<div class="user-link" v-for="item in userData.recent_topics" @click="enterDetail(item.id)">
                <div class="avatar"><img :src="item.author.avatar_url" alt=""></div>
                <h3 class="title">{{item.title}}</h3>
                <p class="time">{{item.last_reply_at | formatDate}}</p>
            </div>
	    </div>
	    <h3 class="user-title">最近参与的话题</h3>
	    <div class="replies-list">
			<div class="user-link" v-for="item in userData.recent_replies" @click="enterDetail(item.id)">
                <div class="avatar"><img :src="item.author.avatar_url" alt=""></div>
                <h3 class="title">{{item.title}}</h3>
                <p class="time">{{item.last_reply_at | formatDate}}</p>
            </div>
	    </div>
	    <div class="create-btn">
	        <a href="javascript:;" class="btn" @click="enterCreate">创建话题</a>
	    </div>
	</div>
</template>

<script>
	import reqwest from 'reqwest';
	import api from '../fetch/api';	

	export default {
		data () {
			return {
				userData: {
					avatar_url: '',
					loginname: '',
					recent_replies: [
						{
							author: {
								avatar_url: '',
								loginname: ''
							},
							id: '',
							last_reply_at: '',
							title: ''
						}
					],
					recent_topics: [
						{
							author: {
								avatar_url: '',
								loginname: ''
							},
							id: '',
							last_reply_at: '',
							title: ''
						}
					]
				}
			}
		},
		created () {
			this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				var self = this;
				var name = this.$route.params.loginname;
				var url = api.getUser(name);
				reqwest({
					url: url,
					method: 'get'
				})
				.then(res => {
					console.log(res);
					self.userData = res.data;
				})
				.fail(err => {
					console.log(err);
				})
			},
			enterDetail (id) {
				this.$router.push({name: 'detail', params: {id: id}});
			},
			enterCreate () {
				this.$router.push('/create');
			}
		}
	}
</script>

<style lang="scss">
	@import '../assets/sass/common.scss';
	.user-panel{
		padding: 30px 0;
		background: #333;
		.avatar{
			width: 80px;
			height: 80px;
			margin: 0 auto;
			img{
				display: block;
				width: 80px;
				height: 80px;
				border-radius: 50%;
			}
		}
		.name{
			font-size: 18px;
			color: #fff;
			text-align: center;
			padding-top: 5px;
		}
	}

	.user-title{
		padding: 10px 12px;
		margin: 0;
		font-weight: normal;
		font-size: 16px;
		color: #666;
	}

	.user-link{
		padding: 8px 12px;
		border-bottom: 1px solid #ccc;
		background: #fff;
		@extend %flexBox;
		.avatar{
			width: 30px;
			height: 30px;
			img{
				display: block;
				width: 30px;
				height: 30px;
			}
		}
		.title{
			margin: 0 10px;
			line-height: 30px;
			font-weight: normal;
			@extend %flexOne;
			@extend %oneLine;
		}
		.time{
			margin: 0;
			line-height: 30px;
			font-size: 12px;
			color: #999;
		}
	}

	.new-comment{
		padding: 10px 12px;
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

	.create-btn{
		padding: 20px;
		.btn{
			display: block;
			height: 40px;
			line-height: 40px;
			text-align: center;
			font-size: 18px;
			color: #fff;
			border-radius: 5px;
			background: #80bd01;
		}
	}
</style>