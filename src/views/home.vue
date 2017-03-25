<template>
	<div class="page-content">
		<topics :scrollFlag="scrollFlag"></topics>
		<footer-section></footer-section>
	</div>
</template>

<script>
	import topics from '../components/topics.vue';
	import footerSection from '../components/footer.vue';
	
	export default {
		data () {
			return {
				scrollFlag: false
			}
		},
		beforeRouteEnter (to, from, next) {
			next(vm => {
				vm.scrollFlag = true;
			});
		},
		beforeRouteLeave (to, from, next) {
			this.scrollFlag = false;
			next();
		},
		components: {
			topics,
			footerSection
		}
	}
</script>