var aside = $("div.container > div.workspace > div.aside"),
	asideWidth = null,
	vhCSS = null,
	menuHeight = null,
	baron__aside = null,
	baron__article = null,
	baron__choose = null,
	baron__scroller = "div.baron > div.baron__scroller",
	baron__bar = "div.baron > div.baron__track > div.baron__bar",
	el = null;

function loadCSS(source, type) {
	"use strict";
	var s = document.getElementsByTagName('head')[0],
		sc = document.createElement('link');
	sc.rel = type;
	sc.href = source;
	s.appendChild(sc);
}

function clearChoose() {
	"use strict";
	$("div.container > div.lists").css({
		"display": "none",
		"left": 0,
		"top": 0,
		"width": 0
	});
}

function resize() {
	"use strict";
	if (window.innerWidth > 960) {
		asideWidth = Math.round(aside.parent().innerWidth() * 0.3);
	} else {
		asideWidth = "100%";
	}
	if (!vhCSS) {
		loadCSS("css/vh.css?" + $.now(), "stylesheet");
		vhCSS = true;
	}
	setTimeout(function () {
		let vh = window.innerHeight * 0.01;
		document.documentElement.style.setProperty('--vh', `${vh}px`);
		baron__aside.update();
		baron__article.update();
		baron__choose.update();
	}, 50);
	if (aside.hasClass("max")) {
		aside.width(asideWidth);
	}
	if ($("div.container > div.lists").is(":visible")) {
		clearChoose();
	}
}

$(document).ready(function () {
	"use strict";
	if (aside.outerWidth() >= 270) {
		if (!aside.hasClass("max")) {
			aside.removeClass("min").addClass("max");
		}
	} else {
		if (!aside.hasClass("min")) {
			aside.removeClass("max").addClass("min");
		}
	}
	if (aside.find("div.ui-resizable-handle").lenght !== 0) {
		aside.find("div.ui-resizable-handle").append('<ul><li></li></ul>');
	}
	aside.find("div.ui-resizable-handle > ul > li:first-child").on("touchstart mousedown", function (e) {
		e.preventDefault();
		if (!aside.hasClass("min") && aside.hasClass("max")) {
			aside.removeClass("max").addClass("min");
			aside.animate({
				width: "2.5em"
			}, 250, function () {
				baron__aside.update();
				baron__article.update();
			});
		} else {
			aside.removeClass("min").addClass("max");
			aside.animate({
				width: asideWidth
			}, 250, function () {
				baron__aside.update();
				baron__article.update();
			});
		}
	});
	$("ul.burger").on("click", function () {
		if ($("div.container").hasClass("opened")) {
			$("div.container").removeClass("opened").addClass("closed");
			$("div.container > nav").animate({
				right: Math.round(0 - $("div.container > nav").innerWidth() + 50)
			}, 250);
		} else {
			$("div.container").removeClass("closed").addClass("opened");
			$("div.container > nav").animate({
				right: 50
			}, 250);
		}
	});
	$("aside > ul > li > span").on("click", function () {
		if ($(this).parent("li.more").hasClass("selected")) {
			$(this).parent("li.more").find("ul").animate({
				height: 0
			}, 250);
			$(this).parent("li.more").removeClass("selected");
		} else {
			menuHeight = 0;
			$(this).parent("li.more").find("ul").find("li").each(function () {
				menuHeight = Math.round(menuHeight + $(this).outerHeight());
			});
			$(this).parent("li.more").find("ul").animate({
				height: menuHeight
			}, 250);
			$(this).parent("li.more").addClass("selected");
		}
	});
	$("input.lists").on("click", function () {
		var offset = $(this).offset();
		$("div.lists." + $(this).data("list")).css({
			"display": "block",
			"width": $(this).outerWidth(),
			"left": offset.left + "px",
			"top": +(offset.top + $(this).outerHeight() + 5) + "px"
		});
	});
	$("div.container > div.lists > div > div > ul > li").on("click", function () {
		el = "div.form." + $(this).data("form") + " form div.choose." + $(this).data("field") + " > input.field";
		$(el).val($(this).find("span").text());
		if (!$(el).next("span").hasClass("selected")) {
			$(el).next("span").addClass("selected");
		}
		$("div.form." + $(this).data("form") + " form .hide." + $(this).data("field")).each(function () {
			$(this).removeClass("hide");
		});
		$("div.container > div.lists." + $(this).data("field")).css({
			"display": "none"
		});
	});
	baron__aside = baron({
		root: "div.baron__aside",
		scroller: baron__scroller,
		bar: baron__bar
	}).autoUpdate();
	baron__article = baron({
		root: "div.baron__article",
		scroller: baron__scroller,
		bar: baron__bar
	}).autoUpdate();
	baron__choose = baron({
		root: "div.baron__choose",
		scroller: baron__scroller,
		bar: baron__bar
	}).autoUpdate();
	$("div.baron__scroller").on("scroll", $.debounce(250, true, function () {
		$(this).next("div.baron__track").find("div.baron__bar").css({
			"opacity": "1"
		});
	}));
	$("div.baron__scroller").on("scroll", $.debounce(1000, function () {
		$(this).next("div.baron__track").find("div.baron__bar").css({
			"opacity": "0"
		});
	}));
	$("div.baron__article > div.baron__scroller").on("scroll", function () {
		if ($("div.container > div.lists").is(":visible")) {
			clearChoose();
		}
	});
	resize();
	return false;
});

$(document).mouseup(function (e) {
	"use strict";
	if (!$("div.container > div.lists").is(e.target) && $("div.container > div.lists").has(e.target).length === 0 && $("div.container > div.lists").is(":visible")) {
		clearChoose();
	}
	e.preventDefault();
	return false;
});
