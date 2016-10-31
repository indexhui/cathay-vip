(function($) {
	$(function() {
		// 顯示登入區
		$('#show-login').click(function(e) {
			e.preventDefault();
			$('.main-page-content')
				.addClass('animated fadeOutUp');
			setTimeout(function() {
				$('.main-page-content').addClass('hidden');
				$('.login-content')
					.removeClass('hidden')
					.addClass('animated fadeIn');
			}, 500);
		});

		// 生日選擇器
		$('#member-birthday').combodate({
	        value: new Date(),
	        minYear: 1900,
	        maxYear: moment().format('YYYY'),
	        format: 'YYYY-MM-DD',
	        template: 'YYYYMMDD',
	        smartDays: true
	    });

		// 接送時間小日曆
		flatpickr('.flatpickr');

		// 手機驗證碼處理
		var cellValidationOk = function() {
			$('.cell-validation-form').hide();
			$('.cell-validation-ok').removeClass('hidden');
		};
		$('#cell-validation-submit').click(function(e) {
			e.preventDefault();
			var code = $('#cell-validation').val();
			cellValidationOk();
		});

		// 接送加點服務
		var splitNumberAndString = function(string) {
			return string.split(/(\d+)/);
		};
		$('#more-addr').click(function(e) {
			e.preventDefault();
			// 複製地址表單
			var addrFields = $('.addr-fields').last();
			var newAddrFields = addrFields.clone();
			// 取得地址表單各欄位id與name，並增加1
			newAddrFields.find('input, select').each(function() {
				var attr = splitNumberAndString($(this).attr('id'));
				if (attr.length > 1) {
					var newId = ++attr[1];
					$(this).attr('id', attr[0] + newId);
					$(this).attr('name', attr[0] + newId);
				} else {
					$(this).attr('id', attr[0] + 1);
					$(this).attr('name', attr[0] + 1);
				}
				$(this).val('');
			});
			addrFields.after(newAddrFields);
		});

	});
}(window.jQuery));
