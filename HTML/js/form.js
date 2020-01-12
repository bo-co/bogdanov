function clear(elements) {
	"use strict";
	elements.each(function () {
		if ($(this).val()) {
			$(this).val("");
		}
		if ($(this).next("span").hasClass("selected")) {
			$(this).next("span").removeClass("selected");
		}
		if ($(this).hasClass("error")) {
			$(this).removeClass("error");
		}
		if ($(this).hasClass("success")) {
			$(this).removeClass("success");
		}
	});
	return false;
}

function isName(name) {
	"use strict";
	var regex = new RegExp(/^([а-яА-Яa-zA-Z _.-]{2,30})+$/);
	return regex.test(name);
}

function isEmail(email) {
	"use strict";
	var regex = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
	return regex.test(email);
}

function isPhone(phone) {
	"use strict";
	var regex = new RegExp(/^([0-9 )+(-]{18})+$/);
	return regex.test(phone);
}

function isRequire(classname) {
	"use strict";
	if ($('div.form.' + classname + ' input.error').length !== 0) {
		if ($('div.form.' + classname + ' > form button').hasClass('active')) {
			$('div.form.' + classname + ' > form button').removeClass('active');
		}
	} else {
		if ($('div.form.' + classname + ' .required > input').length !== $('div.form.' + classname + ' .required > input.success').length) {
			if ($('div.form.' + classname + ' > form button').hasClass('active')) {
				$('div.form.' + classname + ' > form button').removeClass('active');
			}
		} else {
			if (!$('div.form.' + classname + ' > form button').hasClass('active')) {
				$('div.form.' + classname + ' > form button').addClass('active');
			}
		}
	}
	return false;
}

function isForm(form) {
	"use strict";
	$.ajax({
		type: 'POST',
		data: $('div.form.' + form + ' > form').serialize(),
		url: '/local/templates/deltaclinic_2019/actions/?action=' + form,
		cache: false,
		dataType: 'json'
	}).done(function (result) {
		if (result.status === "success") {
			$('div.form.' + form).html(result.message);
		} else {
			if (result.field) {
				if (!$('div.form.' + form + ' > form input[name=' + result.field + ']').hasClass('error')) {
					$('div.form.' + form + ' > form input[name=' + result.field + ']').addClass('error');
				}
			}
			console.log(result.error);
		}
	}).fail(function () {
		console.log('ошибка отправки формы');
	});
	return false;
}

$(document).ready(function () {
	"use strict";
	$("div.form div.choose > input[readonly]").focus(function () {
		this.blur();
	});
	$('.field').on('propertychange change click keyup input paste', function () {
		var element = this;
		console.log('11');
		setTimeout(function () {
			if (!$(element).val()) {
				if ($(element).next('span').hasClass('selected')) {
					$(element).next('span').removeClass('selected');
				}
				if ($(element).hasClass('error')) {
					$(element).removeClass('error');
				}
				if ($(element).hasClass('success')) {
					$(element).removeClass('success');
				}
				if ($(element).hasClass('selected')) {
					$(element).removeClass('selected');
				}

			} else {
				if (!$(element).next('span').hasClass('selected')) {
					$(element).next('span').addClass('selected');
				}
				var result = null,
					check = null;
				if ($(element).parent().hasClass('required')) {
					if ($(element).attr('name') === 'uname') {
						result = isName($(element).val());
					}
					if ($(element).attr('name') === 'uphone') {
						result = isPhone($(element).val());
					}
					if ($(element).attr('name') === 'uemail') {
						result = isEmail($(element).val());
					}
					if (!result) {
						if ($(element).hasClass('success')) {
							$(element).removeClass('success');
						}
						$(element).addClass('error');
					} else {
						if ($(element).hasClass('error')) {
							$(element).removeClass('error');
						}
						$(element).addClass('success');
					}
				} else {
					if ($(element).attr('name') === 'uname') {
						result = isName($(element).val());
						check = 'Y';
					}
					if ($(element).attr('name') === 'uemail') {
						result = isEmail($(element).val());
						check = 'Y';
					}
					if ($(element).attr('name') === 'uphone') {
						result = isPhone($(element).val());
						check = 'Y';
					}
					if (!result && check === 'Y') {
						if ($(element).hasClass('selected')) {
							$(element).removeClass('selected');
						}
						$(element).addClass('error');
					} else {
						if ($(element).hasClass('error')) {
							$(element).removeClass('error');
						}
						$(element).addClass('selected');
					}
				}
			}
			isRequire($(element).data('form'));
		}, 100);
	});
	$('span.checkbox').on('click', function () {
		if (!$(this).hasClass('checked')) {
			$(this).addClass('checked');
			$(this).prev('input').prop('checked', true);
			$(this).prev('input').addClass('success');
		} else {
			$(this).removeClass('checked');
			$(this).prev('input').prop('checked', false);
			$(this).prev('input').removeClass('success');
		}
		isRequire($(this).data('form'));
	});
	$('div.form > form button').on('click', function () {
		if ($(this).hasClass('active')) {
			/* isForm($(this).data('form')); */
			$('div.form').addClass('success');
		}
	});
	clear($(".field"));
	/* $("input[type=tel]").inputmask("+7 (999) 999-99-99"); */
	return false;
});
