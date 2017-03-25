import Vue from 'vue';
import App from './App.vue';
import router from './router/routes.js';
import filters from './util/filters.js';

Vue.config.debug = true; //开启错误提示

Vue.filter('formatDate', function(val){ //注册过滤器
	return filters.getDateDiff(val);
});

new Vue({
	el: '#app',
	router,
	render: h => h(App)
});