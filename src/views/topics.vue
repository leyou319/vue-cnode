<template>
	<div class="topics">		
		<div class="tab-nav">
		    <a v-for="(item, index) in tabItem" href="javascript:;" class="btn" :class="{'active': initIndex === index}" @click="changeTab(index, item.type)">{{ item.title }}</a>
		</div>
		<div class="tab-content">
		    <ul class="topics-list">
		    	<li v-for="item in topics">
					<router-link :to="{name: 'detail', params: {id: item.id}}">
						<div class="topic-man"><img :src="item.author.avatar_url" alt=""></div>
						<div class="topic-desc">
							<p class="name">
								{{item.author.loginname}}<span class="time">{{item.last_reply_at | formatDate}}</span>
							</p>
							<p class="title">
								<span class="type" v-if="item.top === true">置顶</span>{{item.title}}
							</p>
							<p class="summary">
								<span class="type">{{item.tab || 'all'}}</span><span class="comment">{{item.reply_count}}</span><span class="read">{{item.visit_count}}</span>
							</p>
						</div>
					</router-link>
				</li>
		    </ul>
		    <div class="load-result" v-if="noData">已无更多数据</div>
		</div>
		<div class="loading-wrapper" v-show="loading">			
			<loading></loading>
		</div>
		<footer-section></footer-section>
	</div>
</template>

<script>
	import footerSection from '../components/footer.vue';
	import loading from '../components/loading.vue';
	import reqwest from 'reqwest';
	import api from '../fetch/api.js';
	var url = api.getTopics();

	export default {
		data () {
			return {
				initIndex: 0,
				tabItem: [
					{ title: '全部', type: 'all'},
					{ title: '精华', type: 'good'},
					{ title: '分享', type: 'share'},
					{ title: '问答', type: 'ask'},
					{ title: '招聘', type: 'job'}
				],
				topics: [], //文章列表数据
				searchKey: { //文章列表参数
					tab: 'all',
					page: 1,
					limit: 10
				},
				noData: false,
				loading: false
			}
		},
		components: {
			loading,
			footerSection
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				window.addEventListener('scroll', vm.loadMore, false);
			});
		},
		beforeRouteLeave (to, from, next) {
			window.removeEventListener('scroll', this.loadMore, false);
			next();
		},
		created () {
			this.changeTab(0, 'all');			
		},
		methods: {
			changeTab (index, type) {
				let self = this;
				this.loading = true;
				this.initIndex = index;
				this.topics = [];
				this.searchKey.page = 0;
				this.searchKey.tab = type;
				reqwest({
					url: url + `?tab=${this.searchKey.tab}&page=${this.searchKey.page}&limit=${this.searchKey.limit}`,
					method: 'get'
				})
				.then(res => {
					console.log(res);
					let data = res.data;
					self.topics = data;
					self.loading = false;
				})
				.fail(err => {
					console.log(err);
				});
			},
			loadMore () {
				var totalHeight = window.innerHeight + window.scrollY;
				var docHeight = document.body.clientHeight;
				var self = this;
				if (totalHeight == docHeight) {
					console.log('已经到达底部');
					this.loading = true;
					this.searchKey.page++;
					reqwest({
						url: url + `?tab=${this.searchKey.tab}&page=${this.searchKey.page}&limit=${this.searchKey.limit}`,
						method: 'get'
					})
					.then(res => {
						console.log(res);
						let data = res.data;
						let len = data.length;
						if (len == 0) {
							self.noData = true;
							self.loading = false;
						}else {
							self.topics = self.topics.concat(data);
							self.loading = false;
						}
					})
					.fail(err => {
						console.log(err);
					});
				}
			}
		}
	}
</script>

<style lang="scss">
@import '../assets/sass/common.scss';
.tab-nav{
	position: fixed;
	top: 36px;
	left: 0;
	width: 100%;
	background: #333;
	@extend %flexBox;
	a.btn{
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 16px;
		color: #80bd01;
		@extend %flexOne;
		&.active{
			color: #fff;
		}
	}
}

.tab-content{
	padding: 40px 0 49px;
}

.topics-list{
	li{
		a{			
			padding: 12px 10px;
			margin-bottom: 10px;
			background: #fff;
			@extend %flexBox;
			@at-root .topic-man{
				width: 40px;
				height: 40px;
				border-radius: 50%;
				background: url(../assets/images/avatar.png) no-repeat;
				background-size: 40px auto;
				overflow: hidden;
				img{
					display: block;
					width: 40px;
					height: 40px;
				}
			}
			@at-root .topic-desc{
				padding-left: 10px;
				@extend %flexOne;
				.name{
					margin: 0;
					.time{
						float: right;
						font-size: 12px;
						color: #666;
					}
				}
				.title{
					margin: 5px 0 8px;
					font-size: 16px;
					text-align: justify;
					@include mutiLine(2);
					.type{
						display: inline-block;
						padding: 0 5px;
						border-radius: 5px;
						margin-right: 5px;
						font-size: 12px;
						color: #f90;
						border: 1px solid #f90;
						border-radius: 5px;
					}
				}
				.summary{
					margin: 0;
					color: #999;
					.type{
						display: inline-block;
						padding: 0 5px;
						border-radius: 5px;
						font-size: 12px;
						color: #80bd01;
						border: 1px solid #80bd01;
						border-radius: 5px;
					}
					.read, .comment{
						float: right;
						display: block;
						padding-left: 20px;
						background-repeat: no-repeat;
						background-position: left center;
						background-size: 17px auto;
					}
					.read{
						background-image: url(../assets/images/icon_read_34x34.png);
					}
					.comment{
						margin-left: 10px;
						background-image: url(../assets/images/icon_comment_2.png);
					}
				}
			}
		}
	}
}

.load-result{
	display: none;
	padding: 10px 0;
	margin-top: -10px;
	color: #666;
	text-align: center;
}
</style>