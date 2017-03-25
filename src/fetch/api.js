
// api 路径
const HOST = 'https://cnodejs.org/api/v1';

export default {
	getTopics () {
		return HOST + '/topics';
	},
	getTopicById (id) {
		return HOST + '/topic/' + id;
	},
	getLogin () {
		return HOST + '/accesstoken';
	},
	getCollect () {
		return HOST + '/topic_collect/collect';
	},
	getDelCollect () {
		return HOST + '/topic_collect/de_collect';
	},
	getUp (id) {
		return HOST + '/reply/' + id + '/ups';
	},
	getReply (id) {
		return HOST + '/topic/' + id + '/replies';
	},
	getUser (name) {
		return HOST + '/user/' + name;
	}
}