"use strict";

function animations() {
	jQuery('[data-animation]').each(function () {
		var animation = jQuery(this).attr('data-animation'),
			delay = jQuery(this).attr('data-delay');

		var top = jQuery(document).scrollTop() + (jQuery(window).height() * .9);
		var pos_top = jQuery(this).offset().top;
		if (top > pos_top) {
			if (delay) {
				setTimeout(() => {
					jQuery(this).addClass('animated ' + animation);
				}, delay)
			} else {
				jQuery(this).addClass('animated ' + animation);
			}
		}
	});
}

function animationsDelay() {
	let prevOffset = 0,
	prevDelay = 0,
	prevClass = '',
	step = 100
	jQuery('[data-animation]').each(function() {
		if(jQuery(this).attr('data-delay')) return

		let offset = jQuery(this).parent().offset().top

		if(prevOffset == offset && prevClass == jQuery(this).attr('class')) {
			prevDelay += step
			jQuery(this).attr('data-delay', prevDelay)
		} else {
			prevDelay = 0
		}
		
		prevClass = jQuery(this).attr('class')
		prevOffset = offset
	});
}

function parallax() {
	var y = jQuery(window).scrollTop() + jQuery(window).height();

	jQuery('[data-parallax-coef]').each(function () {
		var pos_top = jQuery(this).offset().top;

		if (y > pos_top) {

			var coef = jQuery(this).attr('data-parallax-coef'),
			max = jQuery(this).attr('data-parallax-max');
			
			var ey = (y - (jQuery(window).height()*.5) - jQuery(this).offset().top) * coef;

			if(max) {
				if((max <= 0 && ey <= max) || (max >= 0 && ey <= max)) {
					ey = max
				}
			}

			jQuery(this).css({
				'transform': 'translate3d( 0, ' + (ey) + 'px, 0 )',
			});
		}
	});
}

function fixedHeader() {
	if(jQuery(window).scrollTop() > jQuery(window).height()*.6) {
		jQuery('.site-header').addClass('fixed')
	} else {
		jQuery('.site-header').removeClass('fixed')
	}
}

jQuery('.product-banner').each(function() {
	let $pdEl = jQuery(this),
	slider = new Swiper($pdEl.find('.product-slider').get(0), {
		loop: true,
		loopAdditionalSlides: 10,
		centeredSlides: true,
		spaceBetween: 40,
		navigation: {
			nextEl: $pdEl.find('.next').get(0),
			prevEl: $pdEl.find('.prev').get(0),
		},
		controller: {
			by: 'container'
		},
		on: {
			slideChange: function() {
				$pdEl.attr('data-current-slide', this.realIndex)
			}
		}
	}),
	bgSlider = new Swiper(jQuery(this).find('.bg-images').get(0), {
		loop: true,
		loopAdditionalSlides: 10,
		effect: 'fade'
	}),
	compositionSlider = new Swiper(jQuery('.product-composition').get(0), {
		loop: true,
		loopAdditionalSlides: 10,
		centeredSlides: true,
		spaceBetween: 40,
		controller: {
			by: 'container'
		}
	})

	slider.controller.control = [bgSlider, compositionSlider]
	compositionSlider.controller.control = [bgSlider, slider]
});

jQuery('.mechanism-of-action-section').each(function() {
	let $buttons = jQuery(this).find('.mechanism-row > div'),
	$slider = jQuery(this).find('.mechanism-slider'),
	swiper = new Swiper($slider.get(), {
		loop: true,
		autoplay: {
			delay: 3000,
		},
		spaceBetween: 15,
		on: {
			slideChange: function() {
				$buttons.eq(this.realIndex).addClass('current').siblings().removeClass('current')
			}
		}
	})

	$buttons.on('click', function() {
		if(jQuery(this).hasClass('current')) return

		jQuery(this).addClass('current').siblings().removeClass('current')
		swiper.slideToLoop(jQuery(this).index())
	})
});

jQuery('.advantages-carousel').each(function() {
	new Swiper(jQuery(this).get(0), {
		loop: true,
		slidesPerView: 'auto',
		centeredSlides: true,
		spaceBetween: 38,
		navigation: {
			nextEl: jQuery(this).find('.next').get(0),
			prevEl: jQuery(this).find('.prev').get(0),
		},
		pagination: {
			el: jQuery(this).find('.swiper-pagination').get(0),
			clickable: true,
		},
		breakpoints: {
			0: {
				slidesPerView: 1,
			},
			768: {
				slidesPerView: 'auto',
			}
		}
	})
});

jQuery('.reviews-slider').each(function() {
	new Swiper(jQuery(this).get(0), {
		loop: true,
		centeredSlides: true,
		spaceBetween: 15,
		navigation: {
			nextEl: jQuery(this).find('.next').get(0),
			prevEl: jQuery(this).find('.prev').get(0),
		},
		pagination: {
			el: jQuery(this).next('.reviews-pagination').get(0),
			clickable: true,
		}
	})
});

jQuery(document).on('click', '[href^="#"]:not([href="#"])', function (e) {
	e.preventDefault();

	let $elem = jQuery(jQuery(this).attr('href')),
		top = $elem.offset().top - jQuery('.site-header').outerHeight();

	if(jQuery(e.target).parents('.mobile-navigation').length) {
		jQuery('.nav-butter, .mobile-navigation').toggleClass('active')
	}

	jQuery('body, html').animate({
		scrollTop: top
	}, 1100);
});

jQuery('.accordion-item').on('click', '.top', function () {
	jQuery(this).toggleClass('active').next().slideToggle()
})

jQuery('.popup-block .close-button, .popup-block .overlay').on('click', function () {
	jQuery(this).parents('.popup-block').removeClass('active')
})

jQuery('[data-popup-id]').on('click', function (e) {
	e.preventDefault()

	let $popupEl = jQuery(jQuery(this).attr('data-popup-id'))

	$popupEl.toggleClass('active')

	if(jQuery(this).attr('data-links') || jQuery(this).hasClass('where-to-buy')) {
		
		let links;

		if(jQuery(this).attr('data-links')!='' && jQuery(this).attr('data-links')!=undefined){
			links = JSON.parse(jQuery(this).attr('data-links'))
		}else{
			links = JSON.parse(jQuery('#where-to-buy-popup').attr('data-links'))
		}
		
//		console.log(links);

		jQuery.each(links, (cssClass, value) => {
			if(value!=''){
				$popupEl.find('.link_'+cssClass).attr('href',value)
				$popupEl.find('.link_'+cssClass).parent().show()
			}else{
				$popupEl.find('.link_'+cssClass).parent().hide()
			}
		})

	}

	if(jQuery(this).attr('data-content')) {
		let json = JSON.parse(jQuery(this).attr('data-content'))

		jQuery.each(json, (cssClass, value) => {
			if(cssClass == 'bg') {
				$popupEl.find('.wrap').css('background-image', 'url('+value+')')
			} else {
				$popupEl.find('.'+cssClass).html(value)
			}
		})
	}
})

jQuery('.nav-butter').on('click', function() {
	jQuery(this).toggleClass('active')
	jQuery('.mobile-navigation').toggleClass('active')
});

jQuery(document).on('ready', () => {
	animationsDelay()
})

jQuery(window).on('load scroll', () => {
	animations()
	parallax()
	fixedHeader()
})

jQuery(window).on('mousemove', (e) => {
	let x = e.screenX-jQuery(window).width()/2

	jQuery('[data-mouse-coef]').each(function() {
		gsap.to(jQuery(this), 2, {
			x: x*jQuery(this).attr('data-mouse-coef')
		})
	});
})