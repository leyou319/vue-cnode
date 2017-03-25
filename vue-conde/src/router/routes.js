import Vue from 'vue';
import VueRouter from 'vue-router';
import topics from '../views/topics.vue';
import login from '../views/login.vue';
import detail from '../views/detail.vue';
import my from '../views/my.vue';
import create from '../views/create.vue';
import nofind from '../views/nofind.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	routes: [
		{
			path: '/',
			name: 'home',
			component: topics
		},
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: detail
		},
		{
			path: '/my/:loginname',
			name: 'my',
			component: my,
			meta: {
				auth: true
			}
		},
		{
			path: '/create',
			name: 'create',
			component: create,
			meta: {
				auth: true
			}
		},
		{
			path: '*',
			name: 'nofind',
			component: nofind
		}
	]
});

router.beforeEach((to, from, next) => {
	var { auth = false } = to.meta;
	var isLogin = Boolean(localStorage.getItem('loginStatus'));

	if (auth && !isLogin && to.path !== '/login') {
		next('/login');
	}

	next();
});

 export default router;
