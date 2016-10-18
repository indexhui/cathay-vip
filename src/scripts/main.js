(function init($) {
	$(function() {
		// 生日選擇器
		$('#member-birthday').combodate({
	        value: new Date(),
	        minYear: 1900,
	        maxYear: moment().format('YYYY'),
	        format: 'YYYY-MM-DD',
	        template: 'YYYYMMDD',
	        smartDays: true
	    });

		// 左側的步驟 滑動黏貼
		$('.reward-stepper').scrollToFixed();
	});
}(window.jQuery));
