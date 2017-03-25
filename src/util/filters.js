export default {
	getDateDiff (str) {
		if (!str) return '数据出错';

		let minute = 1000 * 60;
	    let hour = minute * 60;
	    let day = hour * 24;
	    let halfamonth = day * 15;
	    let month = day * 30;
	    let year = day * 365;
	    let now = new Date().getTime();
	    let diffValue = now - new Date(str);
	    let yearC = diffValue / year;
	    let monthC = diffValue / month;
	    let weekC = diffValue / (7 * day);
	    let dayC = diffValue / day;
	    let hourC = diffValue / hour;
	    let minC = diffValue / minute;
	    let result = '';

	    if(yearC >= 1){
	        result = parseInt(yearC) + '年以前';
	    }else if(monthC >= 1){
	        result = parseInt(monthC) + '个月前';
	    }else if(weekC >= 1){
	        result = parseInt(weekC) + '星期前';
	    }else if(dayC >= 1){
	        result = parseInt(dayC) + '天前';
	    }else if(hourC >= 1){
	        result = parseInt(hourC) + '小时前';
	    }else if(minC >= 5){
	        result = parseInt(minC) + '分钟前';
	    }else{
	        result = '刚刚发表';
	    }
	    return result;
	}
}