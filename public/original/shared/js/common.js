
// JavaScript Document

IS_DEBUG = 0;
IS_DRAWER_DEBUG = 0;
GNAV_DEBUG = 0;

$(function(){
	'use strict';

	zennoh.Init();

	if ($('.js-slider').length > 0) {
		zennoh.slick_start();
	}

	// mdlib.changeHeaderByScroll(400);

	if (IS_DRAWER_DEBUG) {
		$(window).delay(500).queue(function(next) {
			$('#open_menu').trigger('click');
			next();
		});
	}
	if ($('#js-ticker_area').length > 0) {
		zennoh.ticker(mdlib);
	}

	// アンカースムーズスクロール
	mdlib.SmoothAnchor('.js-search_toggl, #open_menu', true, true);

	// 文字サイズ変更
	mdlib.ChangeStyleSheet();

	// アコーディオン
	mdlib.SetAccordion();

	// 右下の Page Top
	mdlib.ScrollToTop('.scroll_to_top');

	// スクロール監視
	mdlib.scrollCheck();

	// mmenu - watchWindowSize() に依存している
	mdlib.mmenu();

	// window サイズによって カスタムイベントを dispatch
	mdlib.watchWindowSize();


	if (GNAV_DEBUG) {
		$('.gnav li:nth-child(1) > a').trigger('mouseover');
	}



	// (function() {
	// 	if ($('.mt-content').length) {
	// 		// h3, h4
	// 		$('.mt-content h3:not(.cancel), .mt-content h4:not(.cancel)').each(function() {
	// 			var $h = $(this);
	// 			// spanで囲まれてないものは囲む
	// 			if ($h.children('span').length === 0) {
	// 				$h.wrapInner('<span>');
	// 			}
	// 		});
	// 	}
	// })();

});

var mdlib = new function(){
	'use strict';

	// this.TB_WIDTH = 949;
	this.TB_WIDTH = 999;
	this.SP_WIDTH = 999;

	// アンカースムーズスクロール
	this.SmoothAnchor = function(notClass, is_pc_offset, is_sp_offset){
		// https://sterfield.co.jp/designer/%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AA%E3%83%B3%E3%82%AF%E4%BB%98%E3%81%8D%E3%81%AE%E3%82%A2%E3%83%B3%E3%82%AB%E3%83%BC%E3%83%AA%E3%83%B3%E3%82%AF%E3%81%AB%E5%AF%BE%E5%BF%9C%E3%81%97%E3%81%9Fjquery/
		var $a = $("a[href*='#'], area[href*='#']");
		if (isset(notClass)) {
			$a = $a.not(notClass)
		}
		$a.click(function(e) {
			var speed = 400, // ミリ秒(この値を変えるとスピードが変わる)
				href = $(this).prop("href"), //リンク先を絶対パスとして取得
				hrefPageUrl = href.split("#")[0], //リンク先を絶対パスについて、#より前のURLを取得
				currentUrl = location.href, //現在のページの絶対パスを取得
				currentUrl = currentUrl.split("#")[0]; //現在のページの絶対パスについて、#より前のURLを取得

			//#より前の絶対パスが、リンク先と現在のページで同じだったらスムーススクロールを実行

			if (hrefPageUrl.slice(-1) === '/') {
				hrefPageUrl = hrefPageUrl.slice(0, -1)
			}
			if (currentUrl.slice(-1) === '/') {
				currentUrl = currentUrl.slice(0, -1)
			}

			if(hrefPageUrl == currentUrl){
				//リンク先の#からあとの値を取得
				href = href.split("#");
				href = href.pop();
				href = "#" + href;

				var matches = [];
				if (matches = href.match(/^#click_(.*)$/)) {
					if (matches[1] && $('#' + matches[1]).length) {
						$('#' + matches[1]).trigger('click');
					}
					return false;
				}

				//スムースクロールの実装
				var target = $(href == "#" || href == "" ? 'html' : href);
				var position = 0;
				var body = 'html,body';
				var easing = "easeOutExpo";

				if (target.length) {
					position = target.offset().top;
				} else {
					if (href === '#top') {
						position = 0;
					} else {
						return false;
					}
				}

				var offset = 60;
				if (mdlib._is_small_window()) {
					offset = $('.header').outerHeight(true);
				}
				$(body).animate({scrollTop: position - offset}, speed, easing);
				return false;
			}
		});

		// ハッシュある場合のスクロール
		if (window.location.hash && window.location.hash.match(/^#\w/))
		{
			if ($(window.location.hash)[0] && $(window.location.hash).length)
			{
				var offset = offset = $('.header').outerHeight(true);
				// if (mdlib._is_small_window()) {
					// offset = $('.header').outerHeight(true);
				// }
				// var offset = (mdlib._is_small_window() === false) ? 0 : offset;
				if (Math.round($(window.location.hash).offset().top - offset) !== $(window).scrollTop()) {
					$('html,body').stop().delay(100).queue(function(next) {
						if (window.location.hash.search(/^open_tab_/)) {
							$(window.location.hash).trigger('click');
						}
						// console.log($(window.location.hash).offset().top);
						$(this).animate({
							scrollTop: $(window.location.hash).offset().top - offset
						}, 500 ,"easeOutExpo").dequeue();
					});
				}
			}
		}
	};

	// 文字サイズを変更する
	this.ChangeStyleSheet = function(){

		this.cookieName = "fontsize";// クッキーの名前

		$("a[data-csstitle]").off("click").on("click", function(e) {
			this.setActiveStyleSheet($(e.currentTarget).data("csstitle"));
			return false;
		}.bind(this));

		$(window).on('beforeunload',function(){
			var activeCSS = null;
			$("link[rel*='stylesheet'][title]").each(function(){
				if (!this.disabled)
				{
					activeCSS = $(this).attr("title");
				}
			});
			document.cookie = this.cookieName + "=" + activeCSS + "; path=/";
		}.bind(this));


		this.setActiveStyleSheet = function(title) {
			$("link[rel*='stylesheet'][title]").each(function(){
				// 謎の記述（chromeのバグ対策）
				this.disabled = false;
				this.disabled = true;
				this.disabled = ($(this).attr("title") !== title);
			});
			$("html").trigger('changeFontSize');
			$("html").trigger('changeFontSize' + '_' + title);
		};

		var title = "";
		var nameEQ = this.cookieName + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length; i++) {
			while (ca[i].charAt(0) === ' ')
			{
				ca[i] = ca[i].substring(1, ca[i].length);
			}
			if (ca[i].indexOf(nameEQ) === 0)
			{
				title = ca[i].substring(nameEQ.length, ca[i].length);
			}
		}

		if (!title)
		{
			$("link[rel^='stylesheet'][title]").each(function(){
				title = $(this).attr("title");
			});
		}

		this.setActiveStyleSheet(title);
	};

	// .accordion .accordion__toggle がクリックされた時、 .accordion .accordion__content に .opened クラス名をつける
	// .accordion .accordion__toggle[data-for="{値}"]があった時、 data-name={値} に .opened クラス名をつける
	this.SetAccordion = function() {
		var $cb = $('.accordion_container .accordion_cb');

		if ($cb.length)
		{
			$cb.each(function(i) {
				var $container = $(this).closest('.accordion_container');
				var $content = $container.find('.accordion_content');

				$(this).on('change', function(e) {
					execute(this, $content);
				});
				execute(this, $content, true);
			});

			function execute(_this, $content, is_init) {
				var status = $(_this).prop('checked');
				var slide_option = {
						duration: 800,
						easing: 'easeOutQuint',
					};
				if (status) {
					if (is_init) {
						$content.show();
					} else {
						$content.slideDown(slide_option);
					}
				} else {
					if (is_init) {
						$content.hide();
					} else {
						$content.slideUp(slide_option);
					}
				}
			}
		}
	}

	// useragent
	this.useragent = window.navigator.userAgent.toLowerCase();

	// IE かどうかを判定
	this.isIE = (this.useragent.indexOf('msie') >= 0 || this.useragent.indexOf('trident') >= 0);

	// スマホかタブレットかをuaに格納
	this.ua = (function(u){
		return {
			Tablet:(u.indexOf("windows") !== -1 && u.indexOf("touch") !== -1 && u.indexOf("tablet pc") === -1)
			|| u.indexOf("ipad") !== -1
			|| (u.indexOf("android") !== -1 && u.indexOf("mobile") === -1)
			|| (u.indexOf("firefox") !== -1 && u.indexOf("tablet") !== -1)
			|| u.indexOf("kindle") !== -1
			|| u.indexOf("silk") !== -1
			|| u.indexOf("playbook") !== -1,
			Mobile:(u.indexOf("windows") !== -1 && u.indexOf("phone") !== -1)
			|| u.indexOf("iphone") !== -1
			|| u.indexOf("ipod") !== -1
			|| (u.indexOf("android") !== -1 && u.indexOf("mobile") !== -1)
			|| (u.indexOf("firefox") !== -1 && u.indexOf("mobile") !== -1)
			|| u.indexOf("blackberry") !== -1
		};
	})(window.navigator.userAgent.toLowerCase());

	this._is_small_window = function() {
		if (this.SP_WIDTH >= window.innerWidth) {
			return true;
		} else {
			return false;
		}
	};
	this._is_tb_window = function() {
		if (this.TB_WIDTH >= window.innerWidth) {
			return true;
		} else {
			return false;
		}
	};
	this._is_sp_window = function() {
		if (this.SP_WIDTH >= window.innerWidth) {
			return true;
		} else {
			return false;
		}
	};

	this._mode = ''
	this.watchWindowSize = function() {
		var _this = this;
		var watch = function() {
			if (_this._is_sp_window()) {
				if (_this._mode === '') {
					$(window).trigger('start_sp');
					// console.log('start_sp');
					_this._mode = 'sp';
				} else if (_this._mode === 'pc' || _this._mode === 'tb') {
					$(window).trigger('change_to_sp');
					// console.log('change_to_sp');
					_this._mode = 'sp';
				}
			} else if (_this._is_tb_window()) {
				if (_this._mode === '') {
					$(window).trigger('start_tb');
					// console.log('start_tb');
					_this._mode = 'tb';
				} else if (_this._mode === 'pc' || _this._mode === 'sp') {
					$(window).trigger('change_to_tb');
					// console.log('change_to_tb');
					_this._mode = 'tb';
				}
			} else {
				if (_this._mode === '') {
					$(window).trigger('start_pc');
					// console.log('start_pc');
					_this._mode = 'pc';
				} else if (_this._mode === 'tb' || _this._mode === 'sp') {
					$(window).trigger('change_to_pc');
					// console.log('change_to_pc');
					_this._mode = 'pc';
				}
			}
		};
		$(window).on('resize', watch);
		watch();
	}

	this.scrollCheck = function() {
		var _this = this;
		var global_header_height_toggle = false;
		var global_header_height = $('.global-header').height();
		var header_height_toggle = false;
		var header_height = parseInt($('.root').css('padding-top'), 10);

		$(window).on('scroll', function() {
			var loadingClass = 'init';
			var loadedClass = 'inited';
			var margin = 200;

			if (_this._is_sp_window()) {
				margin = 50;
			}
			var currentPos = $(window).scrollTop() + window.innerHeight;
			$('.' + loadingClass).each(function(i, el) {
				if (currentPos > $(el).offset().top + margin) {
					$(el).removeClass(loadingClass).delay(1000).queue(function(next) {
						$(el).addClass(loadedClass);
						next();
					});
				}
			});

			if ($(window).scrollTop() < global_header_height) {
				if (global_header_height_toggle !== false) {
					global_header_height_toggle = false;
					$('.header').removeClass('_sticky');
					$('body').removeClass('_sticky');
				}
			} else {
				if (global_header_height_toggle !== true) {
					global_header_height_toggle = true;
					$('.header').addClass('_sticky');
					$('body').addClass('_sticky');
				}
			}

			if ($(window).scrollTop() < header_height) {
				if (header_height_toggle !== false) {
					header_height_toggle = false;
					$('.header').removeClass('_sm');
				}
			} else {
				if (header_height_toggle !== true) {
					header_height_toggle = true;
					$('.header').addClass('_sm');
				}
			}
		});
		$(window).trigger('scroll');
	};

	this.mmenu = function() {
		var mdlib = this;
		var mmenu_exist = false;
		var mmenu_ready = false;
		var use_fixed_element = true;
		var option2 = {};

		$("#drawer a[href='" + location.pathname + "']").closest('li').addClass('mm-selected');

		if (use_fixed_element) {
			option2 = {
				classNames: {
					fixedElements: {
						fixed: "MM-FIXED"
					}
				}
			};
		}

		var make_mmenu = function() {
			// console.log('make_mmenu');
			var $drawer = $('#drawer');
			$drawer.ready(function() {
				$drawer.mmenu( {
					offCanvas: {
						position: "right",
						// blockUI: true,
						moveBackground: false
					},
					// ドラッグジェスチャーでの開閉を許可
					dragOpen: true,

					// サブメニューをスライド
					slidingSubmenus: true,


					// navbars: [{
					// 	content: '<li class="drawer__head"><span class="drawer__hero"></span></li>',
					// 	height: 2,
					// 	position: 'top'
					// }],

					extensions: [
						'fullscreen',
						// 'border-offset',
						"border-full",
						"effect-menu-fade",
						// "effect-listitems-fade"
						"effect-listitems-slide",
					],
				}, option2 );

			});
			$('#drawer').addClass('drawer-show');
		}
		var reinit_mmenu = function() {
			if (use_fixed_element) {
				// $('.contents').prependTo('.mm-page');
				$('#header').appendTo('body');
				$('#drawer').addClass('mm-menu');
				$('#drawer').addClass('drawer-show');
				// console.log('reinit_mmenu');
			}
			mmenu_ready = true;
		}
		var destroy_mmenu = function() {
			if (use_fixed_element) {
				// $('.contents').prependTo('body');
				$('#header').prependTo('#header_container');
				// $('.header_clone').prependTo('.header_default_wrapper');
				$('#drawer').removeClass('mm-menu');
				$('#drawer').removeClass('drawer-show');
				// console.log('destroy_mmenu');
			}
			mmenu_ready = false;
		}

		$('#close_menu').on('click', function() {
			var api = $('#drawer').data('mmenu');
			api.close();
		});

		$('#open_menu').on('click', function(e) {
			if ($('html').hasClass('mm-opened')) {
				var api = $('#drawer').data('mmenu');
				api.close();
				e.preventDefault;
				return;
			}
		});

		$(window).on('change_to_sp start_sp change_to_tb start_tb', function() {
			if (mmenu_exist === false) {
				make_mmenu();
				mmenu_exist = true;
				mmenu_ready = true;
			} else {
				if (mmenu_ready === false) {
					reinit_mmenu();
					mmenu_ready = true;
				}
			}
		});
		$(window).on('change_to_pc start_pc', function() {
			if (mmenu_exist === true) {
				destroy_mmenu();
				mmenu_ready = false;
			}
		});
	};

	// UA検査によるモバイル判定
	this.mobilecheck = function() {
		var check = false;
		(function(a){if (/(android|ipad|playbook|silk|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
		return check;
	};

	this.ScrollToTop = function(selector){
		if(!isset(selector)) {
			selector = '#scroll_to_top';
		}
		this.fixedHeader = false;
		this.headerThreshold = 300;
		this.totopThreshold = 50;
		this.totopBtnVisible = false;
		this.pc_default_bottom = 25;
		this.sp_default_bottom = 10;

		var is_stop = false;
		$(window).scroll(function() {
			var ftop = 0;
			var wtop = $(window).scrollTop();
			var wheight = window.innerHeight;
			var offset = 0;

			if (! mdlib._is_small_window()) {
				ftop = $('.footer-2').offset().top - 25 + 23;
				offset = 0;
			} else {
				ftop = $('.footer-2').offset().top - 25 + 12;
				offset = 0;
			}

			if (wtop + wheight > ftop + offset) {
				$('.footer').addClass('footer-scroll_to_top_stop');
				// $(selector).stop(true, true).css({bottom: ''});
				is_stop = true;
			} else {
				if (is_stop === true) {
					$('.footer').removeClass('footer-scroll_to_top_stop');
					is_stop = false;
					if (! mdlib._is_small_window()) {
						$(selector).css({bottom: this.pc_default_bottom});
					} else {
						$(selector).css({bottom: this.sp_default_bottom});
					}
				}
				// console.log('here');
				if (($(window).scrollTop() < this.totopThreshold) && this.totopBtnVisible) {
					this.totopBtnVisible = false;
					if (! mdlib._is_small_window()) {
						$(selector).animate({bottom: -200}, 600, 'easeOutQuint');
					} else {
						$(selector).animate({bottom: -100}, 400, 'easeOutQuint');
					}
				} else if (($(window).scrollTop() > this.totopThreshold) && !this.totopBtnVisible) {
					this.totopBtnVisible = true;
					if (! mdlib._is_small_window()) {
						$(selector).animate({bottom: this.pc_default_bottom}, 600, 'easeOutQuint');
					} else {
						$(selector).animate({bottom: this.sp_default_bottom}, 400, 'easeOutQuint');
					}
				}
			}
		}.bind(this));
		this.totopBtnVisible = false;
		if (! mdlib._is_small_window()) {
			$(selector).animate({bottom: -200}, 400, 'linear');
		} else {
			$(selector).css({bottom: -100});
		}
	};

	this.changeHeaderByScroll = function(point, class_active, class_start, class_end, duration) {
		if (!isset(point)) {
			point = $('#header').outerHeight(true);
		}
		if (!isset(class_active)) {
			class_active = 'header-fixed';
		}
		// var class_return = 'header-fixed-return';
		var class_index = 'header-index';
		var is_index = false;

		if ($('#header').hasClass(class_index)) {
			is_index = true;
		}


		$(window).on('scroll resize', function(e) {
			scroll(e);
		});

		var is_active = false;
		var scroll = function(e) {
			var scroll = $(window).scrollTop();

			if (point < scroll) {
				if (!is_active) {
					// $('#header').removeClass(class_return);

					if (is_index) {
						$('#header').addClass(class_active);
						$('#header').removeClass(class_index);
					}

					$('#header').trigger('header_fixed');
					is_active = true;
				}
			} else {
				if (is_active) {
					// $('#header').addClass(class_return).stop(true, true).delay(200).queue(function(next) {
						// $('#header').removeClass(class_return);
						if (is_index) {
							$('#header').removeClass(class_active);
							$('#header').addClass(class_index);
						}
						// next();
					// });

					$('#header').trigger('header_fixed_remove');
					is_active = false;
				}
			}
		};
		scroll();
	};
}();

var zennoh = new function(){
	'use strict';

	this.Init = function() {
		// fontsize
		$('html').on('changeFontSize_medium', function() {
			$('.fontsize').addClass('fontsize-medium');
			$('.fontsize').removeClass('fontsize-large');
		});
		$('html').on('changeFontSize_large', function() {
			$('.fontsize').removeClass('fontsize-medium');
			$('.fontsize').addClass('fontsize-large');
		});

		$('.js-search_toggl').on('click', function(e) {
			e.preventDefault();
			$('.header').toggleClass('_search');
		});
	};

	this.ticker = function() {
		$('#js-ticker_area').marquee({
			easing: 'easeOutQuart',
			pauseOnHover: false,
			pauseSpeed: 6000
		});
	}

	this.slick_start = function() {

		if ($('.js-slider-fbanner').length) {
			var $sfbanner = $('.js-slider-fbanner');
			if ($sfbanner.children().length < 5) {
				while ($sfbanner.children().length < 5) {
					$sfbanner.children().each(function(i, el) {
						$(el).clone().appendTo($sfbanner);
					});
				}
			}
		}

		var option = {
			autoplay: true,
			pauseOnFocus: false,
			pauseOnHover: false,
			pauseOnDotsHover: false,
			centerPadding: 0,
			autoplaySpeed: 1000,
			arrows: false,
			dots: false,
			cssEase: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
			// easing: 'easeOutQuart',
			speed: 1300,
			// waitForAnimate: false,
		};
		$('.js-slider').each(function(i, _slider) {
			var $slider = $(_slider);
			if($slider.hasClass('js-slider-hero')) {
				$slider.imagesLoaded(function() {
					// console.log('here');
					$slider.on('init', function(slick) {
						$slider.closest('.hero_area').removeClass('hero_area-init').delay(5000).queue(function(next) {
							$slider.closest('.hero_area').addClass('hero_area-inited');

							$('.imain_content').addClass('imain_content-inited');
							next();
						})
						$('#hero_arrows_area').height($slider.height());
					});

					$slider.on('setPosition', function(slick) {
						$('#hero_arrows_area').height($slider.height());
					});
					$slider.slick($.extend({}, option, {
						autoplay: true,
						initialSlide: 0,
						slidesToShow: 1,
						autoplaySpeed: 3 * 1000,
						speed: 1.5 * 1000,
						infinite: true,
						centerMode: true,
						variableWidth: true,

						dots: false,
						// appendDots: '#hero_dots',
						// fade: false,

						arrows: true,
						appendArrows: '#hero_arrows',

						pauseOnFocus: false,
						pauseOnHover: false,
						// pauseOnDotsHover: true,

						responsive: [
							{
								breakpoint: 1229,
								settings: {
									variableWidth: false,
									// centerMode: true,
									speed: 1200,
								}
							},
							{
								breakpoint: 700,
								settings: {
									variableWidth: false,
									// centerMode: true,
									speed: 1000,
								}
							},
							{
								breakpoint: 500,
								settings: {
									variableWidth: false,
									// centerMode: true,
									speed: 800,
								}
							}
						],
					}));
				})
			} else if ($slider.hasClass('js-slider-gnav')) {

				var timeout_duration = 200;

				var timeout_id = null;
				var $current_gnav = null;
				$('.js-open_gnav_sub').on('mouseenter', function(e) {
					clear_hide_timer();
					clear_current_gnav();

					var data_sub = parseInt($(this).attr('data-gnav-sub'));
					if ($('#gnav_sub' + data_sub).length) {
						var gnav_sub = $('#gnav_sub' + data_sub);
						var parent = gnav_sub.parent();
						var index = $(gnav_sub).index();
						set_current_gnav(this);
						gnav_sub_show();
						$slider.slick('slickGoTo', index);
					} else {
						set_hide_timer()
					}
				});
				$('.js-open_gnav_sub').on('mouseleave', function(e) {
					set_hide_timer();
				});
				$('#js-gnav_sub_area').on('mouseenter', function() {
					clear_hide_timer();
				});
				$('#js-gnav_sub_area').on('mouseleave', function() {
					set_hide_timer();
				});

				function set_hide_timer() {
					timeout_id = setTimeout(function() {
						gnav_sub_hide();
					}, timeout_duration);
					// console.log('set_hide_timer');
				}

				function clear_hide_timer() {
					if (timeout_id) {
						clearTimeout(timeout_id);
						$('#js-gnav_sub_area').stop();
					}
					// console.log('clear_hide_timer');
				}

				function gnav_sub_show() {
					$('#js-gnav_sub_area').stop(true, true).addClass('_show');
					$('#header').addClass('_show_sub_menu');
					// console.log('gnav_sub_show');
				}
				function gnav_sub_hide() {
					if (! GNAV_DEBUG) {
						$('#js-gnav_sub_area').stop(true, true).removeClass('_show');
						$('#header').removeClass('_show_sub_menu');
						clear_current_gnav();
						// console.log('gnav_sub_hide');
					}
				}

				function set_current_gnav(gnav) {
					$current_gnav = $(gnav);
					$current_gnav.addClass('_hover')
				}
				function clear_current_gnav() {
					if ($current_gnav !== null) {
						$current_gnav.removeClass('_hover')
						$current_gnav = null;
					}
				}

				// $slider.on('init', function(slick) {
				// 	$(window).delay(100).queue(function(next) {
				// 		$(window).resize();
				// 		console.log('here');
				// 		next();
				// 	});
				// });

				$slider.slick($.extend({}, option, {
					autoplay: false,
					speed: 300,
					infinite: false,
					initialSlide: 0,
					adaptiveHeight: true,
					cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)', // easeInOutSine
					fade: true,
					waitForAnimate: false,
					responsive: [
						{
							breakpoint: 767,
							settings: {
								speed: 200,
							}
						}
					],
				}));
			} else if ($slider.hasClass('js-slider-news')) {
				$('.js-tab_click').on('click', function(e) {
					e.preventDefault();
					var index = parseInt($(this).attr('href').match(/(\d+)/)[1], 10) - 1;
					$slider.slick('slickGoTo', index);
					$('.js-tab_click').removeClass('_selected');
					$(this).addClass('_selected');
				});
				$slider.on('afterChange', function(slick, currentSlide, nextSlide) {
					$('.js-tab_click').removeClass('_selected');
					// console.log(nextSlide);
					$('.js-tab_click').eq(nextSlide).addClass('_selected');
				});
				$slider.slick($.extend({}, option, {
					autoplay: false,
					speed: 600,
					infinite: false,
					initialSlide: 0,
					// adaptiveHeight: true,
					cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)', // easeInOutSine
					responsive: [
						{
							breakpoint: 767,
							settings: {
								speed: 500,
								adaptiveHeight: true,
							}
						}
					],
				}));
			} else if ($slider.hasClass('js-slider-pickup')) {
				$slider.slick($.extend({}, option, {
					autoplay: false,
					autoplaySpeed: 3 * 1000,
					infinite: true,
					// centerMode: true,
					initialSlide: 0,
					slidesToShow: 4,
					slidesToScroll: 1,
					speed: 500,
					cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)', // easeInOutSine
					// variableWidth: true,

					dots: false,

					arrows: true,
					appendArrows: '#pickup_arrows',

					pauseOnFocus: true,
					pauseOnHover: true,
					pauseOnDotsHover: true,

					centerPadding: '0px',


					responsive: [
						{
							breakpoint: 1259,
							settings: {
								// centerMode: true,
								slidesToShow: 3,
							}
						},
						{
							breakpoint: 860,
							settings: {
								slidesToShow: 2,
							}
						},
						{
							breakpoint: 550,
							settings: {
								slidesToShow: 1,
							}
						}
					],
				}));
			} else if ($slider.hasClass('js-slider-product')) {
				$slider.slick($.extend({}, option, {
					autoplay: false,
					autoplaySpeed: 3 * 1000,
					infinite: true,
					// centerMode: true,
					initialSlide: 0,
					slidesToShow: 3,
					slidesToScroll: 1,
					speed: 500,
					cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)', // easeInOutSine
					// variableWidth: true,

					dots: false,

					arrows: true,
					appendArrows: '#product_arrows',

					pauseOnFocus: true,
					pauseOnHover: true,
					pauseOnDotsHover: true,

					centerPadding: '0px',


					responsive: [
						{
							breakpoint: 1200,
							settings: {
								// centerMode: true,
								slidesToShow: 2,
								// variableWidth: true,
							}
						},
						{
							breakpoint: 740,
							settings: {
								speed: 400,
								slidesToShow: 1,
								centerMode: true,
								// variableWidth: true,
							}
						}
					],
				}));
			} else if ($slider.hasClass('js-slider-fbanner')) {
				$slider.slick($.extend({}, option, {
					autoplay: true,
					autoplaySpeed: 3 * 1000,
					infinite: true,
					// centerMode: true,
					initialSlide: 0,
					slidesToShow: 4,
					slidesToScroll: 1,
					speed: 900,
					cssEase: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)', // easeInOutSine
					variableWidth: true,

					dots: false,

					arrows: true,
					appendArrows: '#fbanner_arrows',

					pauseOnFocus: true,
					pauseOnHover: true,
					pauseOnDotsHover: true,

					centerPadding: '0px',


					responsive: [
						{
							breakpoint: 767,
							settings: {
								centerMode: true,
							}
						},
						{
							breakpoint: 580,
							settings: {
								speed: 700,
								centerMode: true,
							}
						},
						{
							breakpoint: 420,
							settings: {
								speed: 800,
								centerMode: true,
							}
						}
					],
				}));
			} else {
				$slider.slick(option);
			}
		});
	};
}();

function isset(data){
	return ( typeof( data ) != 'undefined' );
}

/*
* ファイルサイズ取得
* 対象兼ラッパー：a[data-cmnjs-getsize][href=対象ファイルURL]
* サイズ出力要素：a[data-cmnjs-getsize][href=対象ファイルURL] [data-cmnjs-getsize]
*/
$(function(){
	var DATAPREF = '-cmnjs';
	var targetAttr = 'data'+DATAPREF+'-getsize';
	var outputAttr = 'data'+DATAPREF+'-getsize-size';
	$('a['+targetAttr+']').each(function(){
		var $this = $(this);
		var $output = $this.find('['+outputAttr+']');
		if(!$output.length){return;}
		var xhr = $.ajax({
			type: 'head',
			url: this.href,
		}).done(function(){
			var b = xhr.getResponseHeader('Content-Length');
			var kb = Math.round(b/1024);//小数点以下四捨五入したキロバイト数
			if(kb<1){//表記が0キロバイトになる場合はバイト数で出力
				$output.text(b+'B');
			}else if(kb>=1024){//表記が1024キロバイトを超過する場合は少数第二位を四捨五入したメガバイト表示
				$output.text(Math.round(10*b/1024/1024)/10+'MB');
			}else{
				$output.text(kb+'KB');
			}
		});
	});
});

