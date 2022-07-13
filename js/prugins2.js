!function (a) {
    var b = {
    },
    c = {
      mode: 'horizontal',
      slideSelector: '',
      infiniteLoop: !0,
      hideControlOnEnd: !1,
      speed: 500,
      easing: null,
      slideMargin: 0,
      startSlide: 0,
      randomStart: !1,
      captions: !1,
      ticker: !1,
      tickerHover: !1,
      adaptiveHeight: !1,
      adaptiveHeightSpeed: 500,
      video: !1,
      useCSS: !0,
      preloadImages: 'visible',
      responsive: !0,
      slideZIndex: 50,
      wrapperClass: 'bx-wrapper',
      touchEnabled: !0,
      swipeThreshold: 50,
      oneToOneTouch: !0,
      preventDefaultSwipeX: !0,
      preventDefaultSwipeY: !1,
      pager: !0,
      pagerType: 'full',
      pagerShortSeparator: ' / ',
      pagerSelector: null,
      buildPager: null,
      pagerCustom: null,
      controls: !0,
      nextText: 'Next',
      prevText: 'Prev',
      nextSelector: null,
      prevSelector: null,
      autoControls: !1,
      startText: 'Start',
      stopText: 'Stop',
      autoControlsCombine: !1,
      autoControlsSelector: null,
      auto: !1,
      pause: 4000,
      autoStart: !0,
      autoDirection: 'next',
      autoHover: !1,
      autoDelay: 0,
      autoSlideForOnePage: !1,
      minSlides: 1,
      maxSlides: 1,
      moveSlides: 0,
      slideWidth: 0,
      onSliderLoad: function () {
      },
      onSlideBefore: function () {
      },
      onSlideAfter: function () {
      },
      onSlideNext: function () {
      },
      onSlidePrev: function () {
      },
      onSliderResize: function () {
      }
    };
    a.fn.bxSlider = function (d) {
      if (0 == this.length) return this;
      if (this.length > 1) return this.each(function () {
        a(this).bxSlider(d)
      }),
      this;
      var e = {
      },
      f = this;
      b.el = this;
      var g = a(window).width(),
      h = a(window).height(),
      j = function () {
        e.settings = a.extend({
        }, c, d),
        e.settings.slideWidth = parseInt(e.settings.slideWidth),
        e.children = f.children(e.settings.slideSelector),
        e.children.length < e.settings.minSlides && (e.settings.minSlides = e.children.length),
        e.children.length < e.settings.maxSlides && (e.settings.maxSlides = e.children.length),
        e.settings.randomStart && (e.settings.startSlide = Math.floor(Math.random() * e.children.length)),
        e.active = {
          index: e.settings.startSlide
        },
        e.carousel = e.settings.minSlides > 1 || e.settings.maxSlides > 1,
        e.carousel && (e.settings.preloadImages = 'all'),
        e.minThreshold = e.settings.minSlides * e.settings.slideWidth + (e.settings.minSlides - 1) * e.settings.slideMargin,
        e.maxThreshold = e.settings.maxSlides * e.settings.slideWidth + (e.settings.maxSlides - 1) * e.settings.slideMargin,
        e.working = !1,
        e.controls = {
        },
        e.interval = null,
        e.animProp = 'vertical' == e.settings.mode ? 'top' : 'left',
        e.usingCSS = e.settings.useCSS && 'fade' != e.settings.mode && function () {
          var a = document.createElement('div'),
          b = [
            'WebkitPerspective',
            'MozPerspective',
            'OPerspective',
            'msPerspective'
          ];
          for (var c in b) if (void 0 !== a.style[b[c]]) return e.cssPrefix = b[c].replace('Perspective', '').toLowerCase(),
          e.animProp = '-' + e.cssPrefix + '-transform',
          !0;
          return !1
        }(),
        'vertical' == e.settings.mode && (e.settings.maxSlides = e.settings.minSlides),
        f.data('origStyle', f.attr('style')),
        f.children(e.settings.slideSelector).each(function () {
          a(this).data('origStyle', a(this).attr('style'))
        }),
        k()
      },
      k = function () {
        f.wrap('<div class="' + e.settings.wrapperClass + '"><div class="bx-viewport"></div></div>'),
        e.viewport = f.parent(),
        e.loader = a('<div class="bx-loading" />'),
        e.viewport.prepend(e.loader),
        f.css({
          width: 'horizontal' == e.settings.mode ? 100 * e.children.length + 215 + '%' : 'auto',
          position: 'relative'
        }),
        e.usingCSS && e.settings.easing ? f.css('-' + e.cssPrefix + '-transition-timing-function', e.settings.easing) : e.settings.easing || (e.settings.easing = 'swing');
        q();
        e.viewport.css({
          width: '100%',
          overflow: 'hidden',
          position: 'relative'
        }),
        e.viewport.parent().css({
          maxWidth: o()
        }),
        e.settings.pager || e.viewport.parent().css({
          margin: '0 auto 0px'
        }),
        e.children.css({
          float: 'horizontal' == e.settings.mode ? 'left' : 'none',
          listStyle: 'none',
          position: 'relative'
        }),
        e.children.css('width', p()),
        'horizontal' == e.settings.mode && e.settings.slideMargin > 0 && e.children.css('marginRight', e.settings.slideMargin),
        'vertical' == e.settings.mode && e.settings.slideMargin > 0 && e.children.css('marginBottom', e.settings.slideMargin),
        'fade' == e.settings.mode && (e.children.css({
          position: 'absolute',
          zIndex: 0,
          display: 'none'
        }), e.children.eq(e.settings.startSlide).css({
          zIndex: e.settings.slideZIndex,
          display: 'block'
        })),
        e.controls.el = a('<div class="bx-controls" />'),
        e.settings.captions && z(),
        e.active.last = e.settings.startSlide == r() - 1,
        e.settings.video && f.fitVids();
        var b = e.children.eq(e.settings.startSlide);
        'all' == e.settings.preloadImages && (b = e.children),
        e.settings.ticker ? e.settings.pager = !1 : (e.settings.pager && w(), e.settings.controls && x(), e.settings.auto && e.settings.autoControls && y(), (e.settings.controls || e.settings.autoControls || e.settings.pager) && e.viewport.after(e.controls.el)),
        l(b, m)
      },
      l = function (b, c) {
        var d = b.find('img, iframe').length;
        if (0 == d) return void c();
        var e = 0;
        b.find('img, iframe').each(function () {
          a(this).one('load', function () {
            ++e == d && c()
          }).each(function () {
            this.complete && a(this).load()
          })
        })
      },
      m = function () {
        if (e.settings.infiniteLoop && 'fade' != e.settings.mode && !e.settings.ticker) {
          var b = 'vertical' == e.settings.mode ? e.settings.minSlides : e.settings.maxSlides,
          c = e.children.slice(0, b).clone().addClass('bx-clone'),
          d = e.children.slice( - b).clone().addClass('bx-clone');
          f.append(c).prepend(d)
        }
        e.loader.remove(),
        t(),
        'vertical' == e.settings.mode && (e.settings.adaptiveHeight = !0),
        e.viewport.height(n()),
        f.redrawSlider(),
        e.settings.onSliderLoad(e.active.index),
        e.initialized = !0,
        e.settings.responsive && a(window).bind('resize', Q),
        e.settings.auto && e.settings.autoStart && (r() > 1 || e.settings.autoSlideForOnePage) && J(),
        e.settings.ticker && K(),
        e.settings.pager && F(e.settings.startSlide),
        e.settings.controls && I(),
        e.settings.touchEnabled && !e.settings.ticker && M()
      },
      n = function () {
        var b = 0,
        c = a();
        if ('vertical' == e.settings.mode || e.settings.adaptiveHeight) if (e.carousel) {
          var d = 1 == e.settings.moveSlides ? e.active.index : e.active.index * s();
          for (c = e.children.eq(d), i = 1; i <= e.settings.maxSlides - 1; i++) c = d + i >= e.children.length ? c.add(e.children.eq(i - 1)) : c.add(e.children.eq(d + i))
        } else c = e.children.eq(e.active.index);
         else c = e.children;
        return 'vertical' == e.settings.mode ? (c.each(function (c) {
          b += a(this).outerHeight()
        }), e.settings.slideMargin > 0 && (b += e.settings.slideMargin * (e.settings.minSlides - 1))) : b = Math.max.apply(Math, c.map(function () {
          return a(this).outerHeight(!1)
        }).get()),
        'border-box' == e.viewport.css('box-sizing') ? b += parseFloat(e.viewport.css('padding-top')) + parseFloat(e.viewport.css('padding-bottom')) + parseFloat(e.viewport.css('border-top-width')) + parseFloat(e.viewport.css('border-bottom-width')) : 'padding-box' == e.viewport.css('box-sizing') && (b += parseFloat(e.viewport.css('padding-top')) + parseFloat(e.viewport.css('padding-bottom'))),
        b
      },
      o = function () {
        var a = '100%';
        return e.settings.slideWidth > 0 && (a = 'horizontal' == e.settings.mode ? e.settings.maxSlides * e.settings.slideWidth + (e.settings.maxSlides - 1) * e.settings.slideMargin : e.settings.slideWidth),
        a
      },
      p = function () {
        var a = e.settings.slideWidth,
        b = e.viewport.width();
        return 0 == e.settings.slideWidth || e.settings.slideWidth > b && !e.carousel || 'vertical' == e.settings.mode ? a = b : e.settings.maxSlides > 1 && 'horizontal' == e.settings.mode && (b > e.maxThreshold || b < e.minThreshold && (a = (b - e.settings.slideMargin * (e.settings.minSlides - 1)) / e.settings.minSlides)),
        a
      },
      q = function () {
        var a = 1;
        if ('horizontal' == e.settings.mode && e.settings.slideWidth > 0) if (e.viewport.width() < e.minThreshold) a = e.settings.minSlides;
         else if (e.viewport.width() > e.maxThreshold) a = e.settings.maxSlides;
         else {
          var b = e.children.first().width() + e.settings.slideMargin;
          a = Math.floor((e.viewport.width() + e.settings.slideMargin) / b)
        } else 'vertical' == e.settings.mode && (a = e.settings.minSlides);
        return a
      },
      r = function () {
        var a = 0;
        if (e.settings.moveSlides > 0) if (e.settings.infiniteLoop) a = Math.ceil(e.children.length / s());
         else for (var b = 0, c = 0; b < e.children.length; ) ++a,
        b = c + q(),
        c += e.settings.moveSlides <= q() ? e.settings.moveSlides : q();
         else a = Math.ceil(e.children.length / q());
        return a
      },
      s = function () {
        return e.settings.moveSlides > 0 && e.settings.moveSlides <= q() ? e.settings.moveSlides : q()
      },
      t = function () {
        if (e.children.length > e.settings.maxSlides && e.active.last && !e.settings.infiniteLoop) {
          if ('horizontal' == e.settings.mode) {
            var a = e.children.last(),
            b = a.position();
            u( - (b.left - (e.viewport.width() - a.outerWidth())), 'reset', 0)
          } else if ('vertical' == e.settings.mode) {
            var c = e.children.length - e.settings.minSlides,
            b = e.children.eq(c).position();
            u( - b.top, 'reset', 0)
          }
        } else {
          var b = e.children.eq(e.active.index * s()).position();
          e.active.index == r() - 1 && (e.active.last = !0),
          void 0 != b && ('horizontal' == e.settings.mode ? u( - b.left, 'reset', 0) : 'vertical' == e.settings.mode && u( - b.top, 'reset', 0))
        }
      },
      u = function (a, b, c, d) {
        if (e.usingCSS) {
          var g = 'vertical' == e.settings.mode ? 'translate3d(0, ' + a + 'px, 0)' : 'translate3d(' + a + 'px, 0, 0)';
          f.css('-' + e.cssPrefix + '-transition-duration', c / 1000 + 's'),
          'slide' == b ? (f.css(e.animProp, g), f.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
            f.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'),
            G()
          })) : 'reset' == b ? f.css(e.animProp, g) : 'ticker' == b && (f.css('-' + e.cssPrefix + '-transition-timing-function', 'linear'), f.css(e.animProp, g), f.bind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd', function () {
            f.unbind('transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd'),
            u(d.resetValue, 'reset', 0),
            L()
          }))
        } else {
          var h = {
          };
          h[e.animProp] = a,
          'slide' == b ? f.animate(h, c, e.settings.easing, function () {
            G()
          }) : 'reset' == b ? f.css(e.animProp, a) : 'ticker' == b && f.animate(h, speed, 'linear', function () {
            u(d.resetValue, 'reset', 0),
            L()
          })
        }
      },
      v = function () {
        for (var b = '', c = r(), d = 0; d < c; d++) {
          var f = '';
          e.settings.buildPager && a.isFunction(e.settings.buildPager) ? (f = e.settings.buildPager(d), e.pagerEl.addClass('bx-custom-pager')) : (f = d + 1, e.pagerEl.addClass('bx-default-pager')),
          b += '<div class="bx-pager-item"><a href="" data-slide-index="' + d + '" class="bx-pager-link">' + f + '</a></div>'
        }
        e.pagerEl.html(b)
      },
      w = function () {
        e.settings.pagerCustom ? e.pagerEl = a(e.settings.pagerCustom) : (e.pagerEl = a('<div class="bx-pager" />'), e.settings.pagerSelector ? a(e.settings.pagerSelector).html(e.pagerEl) : e.controls.el.addClass('bx-has-pager').append(e.pagerEl), v()),
        e.pagerEl.on('click', 'a', E)
      },
      x = function () {
        e.controls.next = a('<a class="bx-next" href="">' + e.settings.nextText + '</a>'),
        e.controls.prev = a('<a class="bx-prev" href="">' + e.settings.prevText + '</a>'),
        e.controls.next.bind('click', A),
        e.controls.prev.bind('click', B),
        e.settings.nextSelector && a(e.settings.nextSelector).append(e.controls.next),
        e.settings.prevSelector && a(e.settings.prevSelector).append(e.controls.prev),
        e.settings.nextSelector || e.settings.prevSelector || (e.controls.directionEl = a('<div class="bx-controls-direction" />'), e.controls.directionEl.append(e.controls.prev).append(e.controls.next), e.controls.el.addClass('bx-has-controls-direction').append(e.controls.directionEl))
      },
      y = function () {
        e.controls.start = a('<div class="bx-controls-auto-item"><a class="bx-start" href="">' + e.settings.startText + '</a></div>'),
        e.controls.stop = a('<div class="bx-controls-auto-item"><a class="bx-stop" href="">' + e.settings.stopText + '</a></div>'),
        e.controls.autoEl = a('<div class="bx-controls-auto" />'),
        e.controls.autoEl.on('click', '.bx-start', C),
        e.controls.autoEl.on('click', '.bx-stop', D),
        e.settings.autoControlsCombine ? e.controls.autoEl.append(e.controls.start) : e.controls.autoEl.append(e.controls.start).append(e.controls.stop),
        e.settings.autoControlsSelector ? a(e.settings.autoControlsSelector).html(e.controls.autoEl) : e.controls.el.addClass('bx-has-controls-auto').append(e.controls.autoEl),
        H(e.settings.autoStart ? 'stop' : 'start')
      },
      z = function () {
        e.children.each(function (b) {
          var c = a(this).find('img:first').attr('title');
          void 0 != c && ('' + c).length && a(this).append('<div class="bx-caption"><span>' + c + '</span></div>')
        })
      },
      A = function (a) {
        e.settings.auto && f.stopAuto(),
        f.goToNextSlide(),
        a.preventDefault()
      },
      B = function (a) {
        e.settings.auto && f.stopAuto(),
        f.goToPrevSlide(),
        a.preventDefault()
      },
      C = function (a) {
        f.startAuto(),
        a.preventDefault()
      },
      D = function (a) {
        f.stopAuto(),
        a.preventDefault()
      },
      E = function (b) {
        e.settings.auto && f.stopAuto();
        var c = a(b.currentTarget);
        if (void 0 !== c.attr('data-slide-index')) {
          var d = parseInt(c.attr('data-slide-index'));
          d != e.active.index && f.goToSlide(d),
          b.preventDefault()
        }
      },
      F = function (b) {
        var c = e.children.length;
        if ('short' == e.settings.pagerType) return e.settings.maxSlides > 1 && (c = Math.ceil(e.children.length / e.settings.maxSlides)),
        void e.pagerEl.html(b + 1 + e.settings.pagerShortSeparator + c);
        e.pagerEl.find('a').removeClass('active'),
        e.pagerEl.each(function (c, d) {
          a(d).find('a').eq(b).addClass('active')
        })
      },
      G = function () {
        if (e.settings.infiniteLoop) {
          var a = '';
          0 == e.active.index ? a = e.children.eq(0).position() : e.active.index == r() - 1 && e.carousel ? a = e.children.eq((r() - 1) * s()).position() : e.active.index == e.children.length - 1 && (a = e.children.eq(e.children.length - 1).position()),
          a && ('horizontal' == e.settings.mode ? u( - a.left, 'reset', 0) : 'vertical' == e.settings.mode && u( - a.top, 'reset', 0))
        }
        e.working = !1,
        e.settings.onSlideAfter(e.children.eq(e.active.index), e.oldIndex, e.active.index)
      },
      H = function (a) {
        e.settings.autoControlsCombine ? e.controls.autoEl.html(e.controls[a]) : (e.controls.autoEl.find('a').removeClass('active'), e.controls.autoEl.find('a:not(.bx-' + a + ')').addClass('active'))
      },
      I = function () {
        1 == r() ? (e.controls.prev.addClass('disabled'), e.controls.next.addClass('disabled')) : !e.settings.infiniteLoop && e.settings.hideControlOnEnd && (0 == e.active.index ? (e.controls.prev.addClass('disabled'), e.controls.next.removeClass('disabled')) : e.active.index == r() - 1 ? (e.controls.next.addClass('disabled'), e.controls.prev.removeClass('disabled')) : (e.controls.prev.removeClass('disabled'), e.controls.next.removeClass('disabled')))
      },
      J = function () {
        if (e.settings.autoDelay > 0) {
          setTimeout(f.startAuto, e.settings.autoDelay)
        } else f.startAuto();
        e.settings.autoHover && f.hover(function () {
          e.interval && (f.stopAuto(!0), e.autoPaused = !0)
        }, function () {
          e.autoPaused && (f.startAuto(!0), e.autoPaused = null)
        })
      },
      K = function () {
        var b = 0;
        if ('next' == e.settings.autoDirection) f.append(e.children.clone().addClass('bx-clone'));
         else {
          f.prepend(e.children.clone().addClass('bx-clone'));
          var c = e.children.first().position();
          b = 'horizontal' == e.settings.mode ? - c.left : - c.top
        }
        u(b, 'reset', 0),
        e.settings.pager = !1,
        e.settings.controls = !1,
        e.settings.autoControls = !1,
        e.settings.tickerHover && !e.usingCSS && e.viewport.hover(function () {
          f.stop()
        }, function () {
          var b = 0;
          e.children.each(function (c) {
            b += 'horizontal' == e.settings.mode ? a(this).outerWidth(!0) : a(this).outerHeight(!0)
          });
          var c = e.settings.speed / b,
          d = 'horizontal' == e.settings.mode ? 'left' : 'top',
          g = c * (b - Math.abs(parseInt(f.css(d))));
          L(g)
        }),
        L()
      },
      L = function (a) {
        speed = a || e.settings.speed;
        var b = {
          left: 0,
          top: 0
        },
        c = {
          left: 0,
          top: 0
        };
        'next' == e.settings.autoDirection ? b = f.find('.bx-clone').first().position() : c = e.children.first().position();
        var d = 'horizontal' == e.settings.mode ? - b.left : - b.top,
        g = 'horizontal' == e.settings.mode ? - c.left : - c.top,
        h = {
          resetValue: g
        };
        u(d, 'ticker', speed, h)
      },
      M = function () {
        e.touch = {
          start: {
            x: 0,
            y: 0
          },
          end: {
            x: 0,
            y: 0
          }
        },
        e.viewport.bind('touchstart', N)
      },
      N = function (a) {
        if (e.working) a.preventDefault();
         else {
          e.touch.originalPos = f.position();
          var b = a.originalEvent;
          e.touch.start.x = b.changedTouches[0].pageX,
          e.touch.start.y = b.changedTouches[0].pageY,
          e.viewport.bind('touchmove', O),
          e.viewport.bind('touchend', P)
        }
      },
      O = function (a) {
        var b = a.originalEvent,
        c = Math.abs(b.changedTouches[0].pageX - e.touch.start.x),
        d = Math.abs(b.changedTouches[0].pageY - e.touch.start.y);
        if (3 * c > d && e.settings.preventDefaultSwipeX ? a.preventDefault() : 3 * d > c && e.settings.preventDefaultSwipeY && a.preventDefault(), 'fade' != e.settings.mode && e.settings.oneToOneTouch) {
          var f = 0;
          if ('horizontal' == e.settings.mode) {
            var g = b.changedTouches[0].pageX - e.touch.start.x;
            f = e.touch.originalPos.left + g
          } else {
            var g = b.changedTouches[0].pageY - e.touch.start.y;
            f = e.touch.originalPos.top + g
          }
          u(f, 'reset', 0)
        }
      },
      P = function (a) {
        e.viewport.unbind('touchmove', O);
        var b = a.originalEvent,
        c = 0;
        if (e.touch.end.x = b.changedTouches[0].pageX, e.touch.end.y = b.changedTouches[0].pageY, 'fade' == e.settings.mode) {
          var d = Math.abs(e.touch.start.x - e.touch.end.x);
          d >= e.settings.swipeThreshold && (e.touch.start.x > e.touch.end.x ? f.goToNextSlide() : f.goToPrevSlide(), f.stopAuto())
        } else {
          var d = 0;
          'horizontal' == e.settings.mode ? (d = e.touch.end.x - e.touch.start.x, c = e.touch.originalPos.left) : (d = e.touch.end.y - e.touch.start.y, c = e.touch.originalPos.top),
          !e.settings.infiniteLoop && (0 == e.active.index && d > 0 || e.active.last && d < 0) ? u(c, 'reset', 200) : Math.abs(d) >= e.settings.swipeThreshold ? (d < 0 ? f.goToNextSlide() : f.goToPrevSlide(), f.stopAuto()) : u(c, 'reset', 200)
        }
        e.viewport.unbind('touchend', P)
      },
      Q = function (b) {
        if (e.initialized) {
          var c = a(window).width(),
          d = a(window).height();
          g == c && h == d || (g = c, h = d, f.redrawSlider(), e.settings.onSliderResize.call(f, e.active.index))
        }
      };
      return f.goToSlide = function (b, c) {
        if (!e.working && e.active.index != b) if (e.working = !0, e.oldIndex = e.active.index, b < 0 ? e.active.index = r() - 1 : b >= r() ? e.active.index = 0 : e.active.index = b, e.settings.onSlideBefore(e.children.eq(e.active.index), e.oldIndex, e.active.index), 'next' == c ? e.settings.onSlideNext(e.children.eq(e.active.index), e.oldIndex, e.active.index) : 'prev' == c && e.settings.onSlidePrev(e.children.eq(e.active.index), e.oldIndex, e.active.index), e.active.last = e.active.index >= r() - 1, e.settings.pager && F(e.active.index), e.settings.controls && I(), 'fade' == e.settings.mode) e.settings.adaptiveHeight && e.viewport.height() != n() && e.viewport.animate({
          height: n()
        }, e.settings.adaptiveHeightSpeed),
        e.children.filter(':visible').fadeOut(e.settings.speed).css({
          zIndex: 0
        }),
        e.children.eq(e.active.index).css('zIndex', e.settings.slideZIndex + 1).fadeIn(e.settings.speed, function () {
          a(this).css('zIndex', e.settings.slideZIndex),
          G()
        });
         else {
          e.settings.adaptiveHeight && e.viewport.height() != n() && e.viewport.animate({
            height: n()
          }, e.settings.adaptiveHeightSpeed);
          var d = 0,
          g = {
            left: 0,
            top: 0
          };
          if (!e.settings.infiniteLoop && e.carousel && e.active.last) if ('horizontal' == e.settings.mode) {
            var h = e.children.eq(e.children.length - 1);
            g = h.position(),
            d = e.viewport.width() - h.outerWidth()
          } else {
            var i = e.children.length - e.settings.minSlides;
            g = e.children.eq(i).position()
          } else if (e.carousel && e.active.last && 'prev' == c) {
            var j = 1 == e.settings.moveSlides ? e.settings.maxSlides - s() : (r() - 1) * s() - (e.children.length - e.settings.maxSlides),
            h = f.children('.bx-clone').eq(j);
            g = h.position()
          } else if ('next' == c && 0 == e.active.index) g = f.find('> .bx-clone').eq(e.settings.maxSlides).position(),
          e.active.last = !1;
           else if (b >= 0) {
            var k = b * s();
            g = e.children.eq(k).position()
          }
          if (void 0 !== g) {
            var l = 'horizontal' == e.settings.mode ? - (g.left - d) : - g.top;
            u(l, 'slide', e.settings.speed)
          }
        }
      },
      f.goToNextSlide = function () {
        if (e.settings.infiniteLoop || !e.active.last) {
          var a = parseInt(e.active.index) + 1;
          f.goToSlide(a, 'next')
        }
      },
      f.goToPrevSlide = function () {
        if (e.settings.infiniteLoop || 0 != e.active.index) {
          var a = parseInt(e.active.index) - 1;
          f.goToSlide(a, 'prev')
        }
      },
      f.startAuto = function (a) {
        e.interval || (e.interval = setInterval(function () {
          'next' == e.settings.autoDirection ? f.goToNextSlide() : f.goToPrevSlide()
        }, e.settings.pause), e.settings.autoControls && 1 != a && H('stop'))
      },
      f.stopAuto = function (a) {
        e.interval && (clearInterval(e.interval), e.interval = null, e.settings.autoControls && 1 != a && H('start'))
      },
      f.getCurrentSlide = function () {
        return e.active.index
      },
      f.getCurrentSlideElement = function () {
        return e.children.eq(e.active.index)
      },
      f.getSlideCount = function () {
        return e.children.length
      },
      f.redrawSlider = function () {
        e.children.add(f.find('.bx-clone')).width(p()),
        e.viewport.css('height', n()),
        e.settings.ticker || t(),
        e.active.last && (e.active.index = r() - 1),
        e.active.index >= r() && (e.active.last = !0),
        e.settings.pager && !e.settings.pagerCustom && (v(), F(e.active.index))
      },
      f.destroySlider = function () {
        e.initialized && (e.initialized = !1, a('.bx-clone', this).remove(), e.children.each(function () {
          void 0 != a(this).data('origStyle') ? a(this).attr('style', a(this).data('origStyle')) : a(this).removeAttr('style')
        }), void 0 != a(this).data('origStyle') ? this.attr('style', a(this).data('origStyle')) : a(this).removeAttr('style'), a(this).unwrap().unwrap(), e.controls.el && e.controls.el.remove(), e.controls.next && e.controls.next.remove(), e.controls.prev && e.controls.prev.remove(), e.pagerEl && e.settings.controls && e.pagerEl.remove(), a('.bx-caption', this).remove(), e.controls.autoEl && e.controls.autoEl.remove(), clearInterval(e.interval), e.settings.responsive && a(window).unbind('resize', Q))
      },
      f.reloadSlider = function (a) {
        void 0 != a && (d = a),
        f.destroySlider(),
        j()
      },
      j(),
      this
    }
  }(jQuery),
  function (a, b, c, d, e) {
    'use strict';
    a.fn.fullpage = function (f) {
      function g(a) {
        a.find('.fp-slides').after('<div class="fp-controlArrow fp-prev"></div><div class="fp-controlArrow fp-next"></div>'),
        '#fff' != f.controlArrowColor && (a.find('.fp-controlArrow.fp-next').css('border-color', 'transparent transparent transparent ' + f.controlArrowColor), a.find('.fp-controlArrow.fp-prev').css('border-color', 'transparent ' + f.controlArrowColor + ' transparent transparent')),
        f.loopHorizontal || a.find('.fp-controlArrow.fp-prev').hide()
      }
      function h() {
        a('body').append('<div id="fp-nav"><ul></ul></div>'),
        sa = a('#fp-nav'),
        sa.addClass(f.navigationPosition);
        for (var b = 0; b < a('.fp-section').length; b++) {
          var c = '';
          f.anchors.length && (c = f.anchors[b]);
          var d = '<li><a href="#' + c + '"><span></span></a>',
          e = f.navigationTooltips[b];
          void 0 !== e && '' !== e && (d += '<div class="fp-tooltip ' + f.navigationPosition + '">' + e + '</div>'),
          d += '</li>',
          sa.find('ul').append(d)
        }
      }
      function i() {
        a('.fp-section').each(function () {
          var b = a(this).find('.fp-slide');
          b.length ? b.each(function () {
            R(a(this))
          }) : R(a(this))
        }),
        a.isFunction(f.afterRender) && f.afterRender.call(this)
      }
      function j() {
        var e;
        if (!f.autoScrolling || f.scrollBar) {
          for (var g = a(b).scrollTop(), h = 0, i = d.abs(g - c.getElementsByClassName('fp-section') [0].offsetTop), j = c.getElementsByClassName('fp-section'), k = 0; k < j.length; ++k) {
            var l = j[k],
            m = d.abs(g - l.offsetTop);
            m < i && (h = k, i = m)
          }
          e = a(j).eq(h)
        }
        if (!f.autoScrolling || f.scrollBar) {
          if (!e.hasClass('active')) {
            Ga = !0;
            var n = a('.fp-section.active'),
            o = n.index('.fp-section') + 1,
            p = P(e),
            q = e.data('anchor'),
            r = e.index('.fp-section') + 1,
            s = e.find('.fp-slide.active');
            if (s.length) var t = s.data('anchor'),
            v = s.index();
            za && (e.addClass('active').siblings().removeClass('active'), a.isFunction(f.onLeave) && f.onLeave.call(n, o, r, p), a.isFunction(f.afterLoad) && f.afterLoad.call(e, q, r), N(q, r - 1), f.anchors.length && (qa = q, Z(v, t, q, r))),
            clearTimeout(Ea),
            Ea = setTimeout(function () {
              Ga = !1
            }, 100)
          }
          f.fitToSection && (clearTimeout(Fa), Fa = setTimeout(function () {
            za && (a('.fp-section.active').is(e) && (ya = !0), u(e), ya = !1)
          }, 1000))
        }
      }
      function k(a) {
        return a.find('.fp-slides').length ? a.find('.fp-slide.active').find('.fp-scrollable') : a.find('.fp-scrollable')
      }
      function l(a, b) {
        if (Ca[a]) {
          var c,
          d;
          if ('down' == a ? (c = 'bottom', d = pa.moveSectionDown) : (c = 'top', d = pa.moveSectionUp), b.length > 0) {
            if (!O(c, b)) return !0;
            d()
          } else d()
        }
      }
      function m(c) {
        var e = c.originalEvent;
        if (!n(c.target) && o(e)) {
          f.autoScrolling && c.preventDefault();
          var g = a('.fp-section.active'),
          h = k(g);
          if (za && !ta) {
            var i = ga(e);
            Ja = i.y,
            Ka = i.x,
            g.find('.fp-slides').length && d.abs(Ia - Ka) > d.abs(Ha - Ja) ? d.abs(Ia - Ka) > a(b).width() / 100 * f.touchSensitivity && (Ia > Ka ? Ca.right && pa.moveSlideRight() : Ca.left && pa.moveSlideLeft()) : f.autoScrolling && d.abs(Ha - Ja) > a(b).height() / 100 * f.touchSensitivity && (Ha > Ja ? l('down', h) : Ja > Ha && l('up', h))
          }
        }
      }
      function n(b, c) {
        c = c || 0;
        var d = a(b).parent();
        return !!(c < f.normalScrollElementTouchThreshold && d.is(f.normalScrollElements)) || c != f.normalScrollElementTouchThreshold && n(d, ++c)
      }
      function o(a) {
        return void 0 === a.pointerType || 'mouse' != a.pointerType
      }
      function p(b) {
        var c = b.originalEvent;
        if (f.fitToSection && a('html,body').stop(), o(c)) {
          var d = ga(c);
          Ha = d.y,
          Ia = d.x
        }
      }
      function q(a, b) {
        for (var c = 0, e = a.slice(d.max(a.length - b, 1)), f = 0; f < e.length; f++) c += e[f];
        return d.ceil(c / b)
      }
      function r(c) {
        if (f.autoScrolling) {
          c = b.event || c;
          var e = c.wheelDelta || - c.deltaY || - c.detail,
          g = d.max( - 1, d.min(1, e));
          Aa.length > 149 && Aa.shift(),
          Aa.push(d.abs(e)),
          f.scrollBar && (c.preventDefault ? c.preventDefault() : c.returnValue = !1);
          var h = a('.fp-section.active'),
          i = k(h);
          if (za) {
            q(Aa, 10) >= q(Aa, 70) && (g < 0 ? l('down', i) : l('up', i))
          }
          return !1
        }
        f.fitToSection && a('html,body').stop()
      }
      function s(b) {
        var c = a('.fp-section.active'),
        d = c.find('.fp-slides');
        if (d.length && !ta) {
          var e = d.find('.fp-slide.active'),
          g = null;
          if (g = 'prev' === b ? e.prev('.fp-slide') : e.next('.fp-slide'), !g.length) {
            if (!f.loopHorizontal) return;
            g = 'prev' === b ? e.siblings(':last') : e.siblings(':first')
          }
          ta = !0,
          F(d, g)
        }
      }
      function t() {
        a('.fp-slide.active').each(function () {
          ha(a(this))
        })
      }
      function u(c, d, e) {
        var g = c.position();
        if (void 0 !== g) {
          var h = {
            element: c,
            callback: d,
            isMovementUp: e,
            dest: g,
            dtop: g.top,
            yMovement: P(c),
            anchorLink: c.data('anchor'),
            sectionIndex: c.index('.fp-section'),
            activeSlide: c.find('.fp-slide.active'),
            activeSection: a('.fp-section.active'),
            leavingSection: a('.fp-section.active').index('.fp-section') + 1,
            localIsResizing: ya
          };
          if (!(h.activeSection.is(c) && !ya || f.scrollBar && a(b).scrollTop() === h.dtop)) {
            if (h.activeSlide.length) var i = h.activeSlide.data('anchor'),
            j = h.activeSlide.index();
            f.autoScrolling && f.continuousVertical && void 0 !== h.isMovementUp && (!h.isMovementUp && 'up' == h.yMovement || h.isMovementUp && 'down' == h.yMovement) && (h = x(h)),
            c.addClass('active').siblings().removeClass('active'),
            za = !1,
            Z(j, i, h.anchorLink, h.sectionIndex),
            a.isFunction(f.onLeave) && !h.localIsResizing && f.onLeave.call(h.activeSection, h.leavingSection, h.sectionIndex + 1, h.yMovement),
            v(h),
            qa = h.anchorLink,
            N(h.anchorLink, h.sectionIndex)
          }
        }
      }
      function v(b) {
        if (f.css3 && f.autoScrolling && !f.scrollBar) {
          V('translate3d(0px, -' + b.dtop + 'px, 0px)', !0),
          setTimeout(function () {
            z(b)
          }, f.scrollingSpeed)
        } else {
          var c = w(b);
          a(c.element).animate(c.options, f.scrollingSpeed, f.easing).promise().done(function () {
            z(b)
          })
        }
      }
      function w(a) {
        var b = {
        };
        return f.autoScrolling && !f.scrollBar ? (b.options = {
          top: - a.dtop
        }, b.element = '.' + Ba) : (b.options = {
          scrollTop: a.dtop
        }, b.element = 'html, body'),
        b
      }
      function x(b) {
        return b.isMovementUp ? a('.fp-section.active').before(b.activeSection.nextAll('.fp-section')) : a('.fp-section.active').after(b.activeSection.prevAll('.fp-section').get().reverse()),
        ia(a('.fp-section.active').position().top),
        t(),
        b.wrapAroundElements = b.activeSection,
        b.dest = b.element.position(),
        b.dtop = b.dest.top,
        b.yMovement = P(b.element),
        b
      }
      function y(b) {
        b.wrapAroundElements && b.wrapAroundElements.length && (b.isMovementUp ? a('.fp-section:first').before(b.wrapAroundElements) : a('.fp-section:last').after(b.wrapAroundElements), ia(a('.fp-section.active').position().top), t())
      }
      function z(b) {
        y(b),
        a.isFunction(f.afterLoad) && !b.localIsResizing && f.afterLoad.call(b.element, b.anchorLink, b.sectionIndex + 1),
        za = !0,
        setTimeout(function () {
          a.isFunction(b.callback) && b.callback.call(this)
        }, 600)
      }
      function A() {
        var a = b.location.hash.replace('#', '').split('/'),
        c = a[0],
        d = a[1];
        c && W(c, d)
      }
      function B() {
        if (!Ga) {
          var a = b.location.hash.replace('#', '').split('/'),
          c = a[0],
          d = a[1];
          if (c.length) {
            var e = void 0 === qa,
            f = void 0 === qa && void 0 === d && !ta;
            (c && c !== qa && !e || f || !ta && ra != d) && W(c, d)
          }
        }
      }
      function C(b) {
        clearTimeout(La);
        var d = a(c.activeElement);
        if (!d.is('textarea') && !d.is('input') && !d.is('select') && f.keyboardScrolling && f.autoScrolling) {
          [
            40,
            38,
            32,
            33,
            34
          ].indexOf(b.which) > - 1 && b.preventDefault(),
          La = setTimeout(function () {
            D(b)
          }, 150)
        }
      }
      function D(b) {
        var c = b.shiftKey;
        switch (b.which) {
          case 38:
          case 33:
            pa.moveSectionUp();
            break;
          case 32:
            if (c) {
              pa.moveSectionUp();
              break
            }
          case 40:
          case 34:
            pa.moveSectionDown();
            break;
          case 36:
            pa.moveTo(1);
            break;
          case 35:
            pa.moveTo(a('.fp-section').length);
            break;
          case 37:
            pa.moveSlideLeft();
            break;
          case 39:
            pa.moveSlideRight();
            break;
          default:
            return
        }
      }
      function E(a) {
        za && (a.pageY < Ma ? pa.moveSectionUp() : a.pageY > Ma && pa.moveSectionDown()),
        Ma = a.pageY
      }
      function F(b, c) {
        var d = c.position(),
        e = b.find('.fp-slidesContainer').parent(),
        g = c.index(),
        h = b.closest('.fp-section'),
        i = h.index('.fp-section'),
        j = h.data('anchor'),
        k = h.find('.fp-slidesNav'),
        l = c.data('anchor'),
        m = ya;
        if (f.onSlideLeave) {
          var n = h.find('.fp-slide.active'),
          o = n.index(),
          p = Q(o, g);
          m || 'none' === p || a.isFunction(f.onSlideLeave) && f.onSlideLeave.call(n, j, i + 1, o, p)
        }
        c.addClass('active').siblings().removeClass('active'),
        void 0 === l && (l = g),
        !f.loopHorizontal && f.controlArrows && (h.find('.fp-controlArrow.fp-prev').toggle(0 !== g), h.find('.fp-controlArrow.fp-next').toggle(!c.is(':last-child'))),
        h.hasClass('active') && Z(g, l, j, i);
        var q = function () {
          m || a.isFunction(f.afterSlideLoad) && f.afterSlideLoad.call(c, j, i + 1, l, g),
          ta = !1
        };
        if (f.css3) {
          var r = 'translate3d(-' + d.left + 'px, 0px, 0px)';
          I(b.find('.fp-slidesContainer'), f.scrollingSpeed > 0).css(ja(r)),
          setTimeout(function () {
            q()
          }, f.scrollingSpeed, f.easing)
        } else e.animate({
          scrollLeft: d.left
        }, f.scrollingSpeed, f.easing, function () {
          q()
        });
        k.find('.active').removeClass('active'),
        k.find('li').eq(g).find('a').addClass('active')
      }
      function G() {
        if (H(), ua) {
          var e = a(c.activeElement);
          if (!e.is('textarea') && !e.is('input') && !e.is('select')) {
            var f = a(b).height();
            d.abs(f - Oa) > 20 * d.max(Oa, f) / 100 && (pa.reBuild(!0), Oa = f)
          }
        } else clearTimeout(Na),
        Na = setTimeout(function () {
          pa.reBuild(!0)
        }, 500)
      }
      function H() {
        if (f.responsive) {
          var c = wa.hasClass('fp-responsive');
          a(b).width() < f.responsive ? c || (pa.setAutoScrolling(!1, 'internal'), pa.setFitToSection(!1, 'internal'), a('#fp-nav').hide(), wa.addClass('fp-responsive')) : c && (pa.setAutoScrolling(Da.autoScrolling, 'internal'), pa.setFitToSection(Da.autoScrolling, 'internal'), a('#fp-nav').show(), wa.removeClass('fp-responsive'))
        }
      }
      function I(a) {
        var b = 'all ' + f.scrollingSpeed + 'ms ' + f.easingcss3;
        return a.removeClass('fp-notransition'),
        a.css({
          '-webkit-transition': b,
          transition: b
        })
      }
      function J(a) {
        return a.addClass('fp-notransition')
      }
      function K(b, c) {
        var e = 825,
        f = 900;
        if (b < e || c < f) {
          var g = 100 * b / e,
          h = 100 * c / f,
          i = d.min(g, h),
          j = i.toFixed(2);
          a('body').css('font-size', j + '%')
        } else a('body').css('font-size', '100%')
      }
      function L(b, c) {
        f.navigation && (a('#fp-nav').find('.active').removeClass('active'), b ? a('#fp-nav').find('a[href="#' + b + '"]').addClass('active') : a('#fp-nav').find('li').eq(c).find('a').addClass('active'))
      }
      function M(b) {
        f.menu && (a(f.menu).find('.active').removeClass('active'), a(f.menu).find('[data-menuanchor="' + b + '"]').addClass('active'))
      }
      function N(a, b) {
        M(a),
        L(a, b)
      }
      function O(a, b) {
        return 'top' === a ? !b.scrollTop() : 'bottom' === a ? b.scrollTop() + 1 + b.innerHeight() >= b[0].scrollHeight : void 0
      }
      function P(b) {
        var c = a('.fp-section.active').index('.fp-section'),
        d = b.index('.fp-section');
        return c == d ? 'none' : c > d ? 'up' : 'down'
      }
      function Q(a, b) {
        return a == b ? 'none' : a > b ? 'left' : 'right'
      }
      function R(a) {
        a.css('overflow', 'hidden');
        var b,
        c = a.closest('.fp-section'),
        d = a.find('.fp-scrollable');
        d.length ? b = d.get(0).scrollHeight : (b = a.get(0).scrollHeight, f.verticalCentered && (b = a.find('.fp-tableCell').get(0).scrollHeight));
        var e = xa - parseInt(c.css('padding-bottom')) - parseInt(c.css('padding-top'));
        b > e ? d.length ? d.css('height', e + 'px').parent().css('height', e + 'px') : (f.verticalCentered ? a.find('.fp-tableCell').wrapInner('<div class="fp-scrollable" />') : a.wrapInner('<div class="fp-scrollable" />'), a.find('.fp-scrollable').slimScroll({
          allowPageScroll: !0,
          height: e + 'px',
          size: '10px',
          alwaysVisible: !0
        })) : S(a),
        a.css('overflow', '')
      }
      function S(a) {
        a.find('.fp-scrollable').children().first().unwrap().unwrap(),
        a.find('.slimScrollBar').remove(),
        a.find('.slimScrollRail').remove()
      }
      function T(a) {
        a.addClass('fp-table').wrapInner('<div class="fp-tableCell" style="height:' + U(a) + 'px;" />')
      }
      function U(a) {
        var b = xa;
        if (f.paddingTop || f.paddingBottom) {
          var c = a;
          c.hasClass('fp-section') || (c = a.closest('.fp-section'));
          var d = parseInt(c.css('padding-top')) + parseInt(c.css('padding-bottom'));
          b = xa - d
        }
        return b
      }
      function V(a, b) {
        b ? I(wa) : J(wa),
        wa.css(ja(a)),
        setTimeout(function () {
          wa.removeClass('fp-notransition')
        }, 10)
      }
      function W(b, c) {
        var d;
        void 0 === c && (c = 0),
        d = isNaN(b) ? a('[data-anchor="' + b + '"]') : a('.fp-section').eq(b - 1),
        b === qa || d.hasClass('active') ? X(d, c) : u(d, function () {
          X(d, c)
        })
      }
      function X(a, b) {
        if (void 0 !== b) {
          var c = a.find('.fp-slides'),
          d = c.find('[data-anchor="' + b + '"]');
          d.length || (d = c.find('.fp-slide').eq(b)),
          d.length && F(c, d)
        }
      }
      function Y(a, b) {
        a.append('<div class="fp-slidesNav"><ul></ul></div>');
        var c = a.find('.fp-slidesNav');
        c.addClass(f.slidesNavPosition);
        for (var d = 0; d < b; d++) c.find('ul').append('<li><a href="#"><span></span></a></li>');
        c.css('margin-left', '-' + c.width() / 2 + 'px'),
        c.find('li').first().find('a').addClass('active')
      }
      function Z(a, b, c, d) {
        var e = '';
        f.anchors.length ? (a ? (void 0 !== c && (e = c), void 0 === b && (b = a), ra = b, $(e + '/' + b)) : void 0 !== a ? (ra = b, $(c)) : $(c), _(location.hash)) : _(void 0 !== a ? d + '-' + a : String(d))
      }
      function $(a) {
        if (f.recordHistory) location.hash = a;
         else if (ua || va) history.replaceState(e, e, '#' + a);
         else {
          var c = b.location.href.split('#') [0];
          b.location.replace(c + '#' + a)
        }
      }
      function _(b) {
        b = b.replace('/', '-').replace('#', ''),
        a('body') [0].className = a('body') [0].className.replace(/\b\s?fp-viewing-[^\s]+\b/g, ''),
        a('body').addClass('fp-viewing-' + b)
      }
      function aa() {
        var a,
        d = c.createElement('p'),
        f = {
          webkitTransform: '-webkit-transform',
          OTransform: '-o-transform',
          msTransform: '-ms-transform',
          MozTransform: '-moz-transform',
          transform: 'transform'
        };
        c.body.insertBefore(d, null);
        for (var g in f) d.style[g] !== e && (d.style[g] = 'translate3d(1px,1px,1px)', a = b.getComputedStyle(d).getPropertyValue(f[g]))
        ;
        return c.body.removeChild(d),
        a !== e && a.length > 0 && 'none' !== a
      }
      function ba() {
        c.addEventListener ? (c.removeEventListener('mousewheel', r, !1), c.removeEventListener('wheel', r, !1)) : c.detachEvent('onmousewheel', r)
      }
      function ca() {
        c.addEventListener ? (c.addEventListener('mousewheel', r, !1), c.addEventListener('wheel', r, !1)) : c.attachEvent('onmousewheel', r)
      }
      function da() {
        if (ua || va) {
          var b = fa();
          a(c).off('touchstart ' + b.down).on('touchstart ' + b.down, p),
          a(c).off('touchmove ' + b.move).on('touchmove ' + b.move, m)
        }
      }
      function ea() {
        if (ua || va) {
          var b = fa();
          a(c).off('touchstart ' + b.down),
          a(c).off('touchmove ' + b.move)
        }
      }
      function fa() {
        return b.PointerEvent ? {
          down: 'pointerdown',
          move: 'pointermove'
        }
         : {
          down: 'MSPointerDown',
          move: 'MSPointerMove'
        }
      }
      function ga(a) {
        var b = [
        ];
        return b.y = void 0 !== a.pageY && (a.pageY || a.pageX) ? a.pageY : a.touches[0].pageY,
        b.x = void 0 !== a.pageX && (a.pageY || a.pageX) ? a.pageX : a.touches[0].pageX,
        b
      }
      function ha(a) {
        pa.setScrollingSpeed(0, 'internal'),
        F(a.closest('.fp-slides'), a),
        pa.setScrollingSpeed(Da.scrollingSpeed, 'internal')
      }
      function ia(a) {
        if (f.scrollBar) wa.scrollTop(a);
         else if (f.css3) {
          var b = 'translate3d(0px, -' + a + 'px, 0px)';
          V(b, !1)
        } else wa.css('top', - a)
      }
      function ja(a) {
        return {
          '-webkit-transform': a,
          '-moz-transform': a,
          '-ms-transform': a,
          transform: a
        }
      }
      function ka(a, b) {
        switch (b) {
          case 'up':
            Ca.up = a;
            break;
          case 'down':
            Ca.down = a;
            break;
          case 'left':
            Ca.left = a;
            break;
          case 'right':
            Ca.right = a;
            break;
          case 'all':
            pa.setAllowScrolling(a)
        }
      }
      function la() {
        ia(0),
        a('#fp-nav, .fp-slidesNav, .fp-controlArrow').remove(),
        a('.fp-section').css({
          height: '',
          'background-color': '',
          padding: ''
        }),
        a('.fp-slide').css({
          width: ''
        }),
        wa.css({
          height: '',
          position: '',
          '-ms-touch-action': '',
          'touch-action': ''
        }),
        a('.fp-section, .fp-slide').each(function () {
          S(a(this)),
          a(this).removeClass('fp-table active')
        }),
        J(wa),
        J(wa.find('.fp-easing')),
        wa.find('.fp-tableCell, .fp-slidesContainer, .fp-slides').each(function () {
          a(this).replaceWith(this.childNodes)
        }),
        a('html, body').scrollTop(0)
      }
      function ma(a, b, c) {
        f[a] = b,
        'internal' !== c && (Da[a] = b)
      }
      function na() {
        f.continuousVertical && (f.loopTop || f.loopBottom) && (f.continuousVertical = !1, oa('warn', 'Option `loopTop/loopBottom` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled')),
        f.continuousVertical && f.scrollBar && (f.continuousVertical = !1, oa('warn', 'Option `scrollBar` is mutually exclusive with `continuousVertical`; `continuousVertical` disabled')),
        a.each(f.anchors, function (b, c) {
          (a('#' + c).length || a('[name="' + c + '"]').length) && oa('error', 'data-anchor tags can not have the same value as any `id` element on the site (or `name` element for IE).')
        })
      }
      function oa(a, b) {
        console && console[a] && console[a]('fullPage: ' + b)
      }
      var pa = a.fn.fullpage;
      f = a.extend({
        menu: !1,
        anchors: [
        ],
        navigation: !1,
        navigationPosition: 'right',
        navigationTooltips: [
        ],
        slidesNavigation: !1,
        slidesNavPosition: 'bottom',
        scrollBar: !1,
        css3: !0,
        scrollingSpeed: 700,
        autoScrolling: !0,
        fitToSection: !0,
        easing: 'easeInOutCubic',
        easingcss3: 'ease',
        loopBottom: !1,
        loopTop: !1,
        loopHorizontal: !0,
        continuousVertical: !1,
        normalScrollElements: null,
        scrollOverflow: !1,
        touchSensitivity: 5,
        normalScrollElementTouchThreshold: 5,
        keyboardScrolling: !0,
        animateAnchor: !0,
        recordHistory: !0,
        controlArrows: !0,
        controlArrowColor: '#fff',
        verticalCentered: !0,
        resize: !1,
        sectionsColor: [
        ],
        paddingTop: 0,
        paddingBottom: 0,
        fixedElements: null,
        responsive: 0,
        sectionSelector: '.section',
        slideSelector: '.slide',
        afterLoad: null,
        onLeave: null,
        afterRender: null,
        afterResize: null,
        afterReBuild: null,
        afterSlideLoad: null,
        onSlideLeave: null
      }, f),
      na(),
      a.extend(a.easing, {
        easeInOutCubic: function (a, b, c, d, e) {
          return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c
        }
      }),
      a.extend(a.easing, {
        easeInQuart: function (a, b, c, d, e) {
          return d * (b /= e) * b * b * b + c
        }
      }),
      pa.setAutoScrolling = function (b, c) {
        ma('autoScrolling', b, c);
        var d = a('.fp-section.active');
        f.autoScrolling && !f.scrollBar ? (a('html, body').css({
          overflow: 'hidden',
          height: '100%'
        }), pa.setRecordHistory(f.recordHistory, 'internal'), wa.css({
          '-ms-touch-action': 'none',
          'touch-action': 'none'
        }), d.length && ia(d.position().top)) : (a('html, body').css({
          overflow: 'visible',
          height: 'initial'
        }), pa.setRecordHistory(!1, 'internal'), wa.css({
          '-ms-touch-action': '',
          'touch-action': ''
        }), ia(0), d.length && a('html, body').scrollTop(d.position().top))
      },
      pa.setRecordHistory = function (a, b) {
        ma('recordHistory', a, b)
      },
      pa.setScrollingSpeed = function (a, b) {
        ma('scrollingSpeed', a, b)
      },
      pa.setFitToSection = function (a, b) {
        ma('fitToSection', a, b)
      },
      pa.setMouseWheelScrolling = function (a) {
        a ? ca() : ba()
      },
      pa.setAllowScrolling = function (b, c) {
        void 0 !== c ? (c = c.replace(' ', '').split(','), a.each(c, function (a, c) {
          ka(b, c)
        })) : b ? (pa.setMouseWheelScrolling(!0), da()) : (pa.setMouseWheelScrolling(!1), ea())
      },
      pa.setKeyboardScrolling = function (a) {
        f.keyboardScrolling = a
      },
      pa.moveSectionUp = function () {
        var b = a('.fp-section.active').prev('.fp-section');
        b.length || !f.loopTop && !f.continuousVertical || (b = a('.fp-section').last()),
        b.length && u(b, null, !0)
      },
      pa.moveSectionDown = function () {
        var b = a('.fp-section.active').next('.fp-section');
        b.length || !f.loopBottom && !f.continuousVertical || (b = a('.fp-section').first()),
        b.length && u(b, null, !1)
      },
      pa.moveTo = function (b, c) {
        var d = '';
        d = isNaN(b) ? a('[data-anchor="' + b + '"]') : a('.fp-section').eq(b - 1),
        void 0 !== c ? W(b, c) : d.length > 0 && u(d)
      },
      pa.moveSlideRight = function () {
        s('next')
      },
      pa.moveSlideLeft = function () {
        s('prev')
      },
      pa.reBuild = function (c) {
        if (!wa.hasClass('fp-destroyed')) {
          ya = !0;
          var d = a(b).width();
          xa = a(b).height(),
          f.resize && K(xa, d),
          a('.fp-section').each(function () {
            var b = a(this).find('.fp-slides'),
            c = a(this).find('.fp-slide');
            f.verticalCentered && a(this).find('.fp-tableCell').css('height', U(a(this)) + 'px'),
            a(this).css('height', xa + 'px'),
            f.scrollOverflow && (c.length ? c.each(function () {
              R(a(this))
            }) : R(a(this))),
            c.length && F(b, b.find('.fp-slide.active'))
          });
          var e = a('.fp-section.active');
          e.index('.fp-section') && u(e),
          ya = !1,
          a.isFunction(f.afterResize) && c && f.afterResize.call(wa),
          a.isFunction(f.afterReBuild) && !c && f.afterReBuild.call(wa)
        }
      };
      var qa,
      ra,
      sa,
      ta = !1,
      ua = navigator.userAgent.match(/(iPhone|iPod|iPad|Android|playbook|silk|BlackBerry|BB10|Windows Phone|Tizen|Bada|webOS|IEMobile|Opera Mini)/),
      va = 'ontouchstart' in b || navigator.msMaxTouchPoints > 0 || navigator.maxTouchPoints,
      wa = a(this),
      xa = a(b).height(),
      ya = !1,
      za = !0,
      Aa = [
      ],
      Ba = 'fullpage-wrapper',
      Ca = {
        up: !0,
        down: !0,
        left: !0,
        right: !0
      },
      Da = a.extend(!0, {
      }, f);
      pa.setAllowScrolling(!0),
      wa.removeClass('fp-destroyed'),
      f.css3 && (f.css3 = aa()),
      a(this).length ? (wa.css({
        height: '100%',
        position: 'relative'
      }), wa.addClass(Ba)) : oa('error', 'Error! Fullpage.js needs to be initialized with a selector. For example: $(\'#myContainer\').fullpage();'),
      a(f.sectionSelector).each(function () {
        a(this).addClass('fp-section')
      }),
      a(f.slideSelector).each(function () {
        a(this).addClass('fp-slide')
      }),
      f.navigation && h(),
      a('.fp-section').each(function (b) {
        var c = a(this),
        d = a(this).find('.fp-slide'),
        e = d.length;
        if (b || 0 !== a('.fp-section.active').length || a(this).addClass('active'), a(this).css('height', xa + 'px'), (f.paddingTop || f.paddingBottom) && a(this).css('padding', f.paddingTop + ' 0 ' + f.paddingBottom + ' 0'), void 0 !== f.sectionsColor[b] && a(this).css('background-color', f.sectionsColor[b]), void 0 !== f.anchors[b] && (a(this).attr('data-anchor', f.anchors[b]), a(this).hasClass('active') && N(f.anchors[b], b)), e > 1) {
          var h = 100 * e,
          i = 100 / e;
          d.wrapAll('<div class="fp-slidesContainer" />'),
          d.parent().wrap('<div class="fp-slides" />'),
          a(this).find('.fp-slidesContainer').css('width', h + '%'),
          f.controlArrows && g(a(this)),
          f.slidesNavigation && Y(a(this), e),
          d.each(function (b) {
            a(this).css('width', i + '%'),
            f.verticalCentered && T(a(this))
          });
          var j = c.find('.fp-slide.active');
          j.length ? ha(j) : d.eq(0).addClass('active')
        } else f.verticalCentered && T(a(this))
      }).promise().done(function () {
        pa.setAutoScrolling(f.autoScrolling, 'internal');
        var d = a('.fp-section.active').find('.fp-slide.active');
        d.length && (0 !== a('.fp-section.active').index('.fp-section') || 0 === a('.fp-section.active').index('.fp-section') && 0 !== d.index()) && ha(d),
        f.fixedElements && f.css3 && a(f.fixedElements).appendTo('body'),
        f.navigation && (sa.css('margin-top', '-' + sa.height() / 2 + 'px'), sa.find('li').eq(a('.fp-section.active').index('.fp-section')).find('a').addClass('active')),
        f.menu && f.css3 && a(f.menu).closest('.fullpage-wrapper').length && a(f.menu).appendTo('body'),
        f.scrollOverflow ? ('complete' === c.readyState && i(), a(b).on('load', i)) : a.isFunction(f.afterRender) && f.afterRender.call(wa),
        H();
        var e = b.location.hash.replace('#', '').split('/'),
        g = e[0];
        if (g.length) {
          var h = a('[data-anchor="' + g + '"]');
          !f.animateAnchor && h.length && (f.autoScrolling ? ia(h.position().top) : (ia(0), _(g), a('html, body').scrollTop(h.position().top)), N(g, null), a.isFunction(f.afterLoad) && f.afterLoad.call(h, g, h.index('.fp-section') + 1), h.addClass('active').siblings().removeClass('active'))
        }
        a(b).on('load', function () {
          A()
        })
      });
      var Ea,
      Fa,
      Ga = !1;
      a(b).on('scroll', j);
      var Ha = 0,
      Ia = 0,
      Ja = 0,
      Ka = 0;
      a(b).on('hashchange', B),
      a(b).keydown(C);
      var La;
      wa.mousedown(function (a) {
        2 == a.which && (Ma = a.pageY, wa.on('mousemove', E))
      }),
      wa.mouseup(function (a) {
        2 == a.which && wa.off('mousemove')
      });
      var Ma = 0;
      a(c).on('click touchstart', '#fp-nav a', function (b) {
        b.preventDefault();
        var c = a(this).parent().index();
        u(a('.fp-section').eq(c))
      }),
      a(c).on('click touchstart', '.fp-slidesNav a', function (b) {
        b.preventDefault();
        var c = a(this).closest('.fp-section').find('.fp-slides');
        F(c, c.find('.fp-slide').eq(a(this).closest('li').index()))
      }),
      f.normalScrollElements && (a(c).on('mouseenter', f.normalScrollElements, function () {
        pa.setMouseWheelScrolling(!1)
      }), a(c).on('mouseleave', f.normalScrollElements, function () {
        pa.setMouseWheelScrolling(!0)
      })),
      a('.fp-section').on('click touchstart', '.fp-controlArrow', function () {
        a(this).hasClass('fp-prev') ? pa.moveSlideLeft() : pa.moveSlideRight()
      }),
      a(b).resize(G);
      var Na,
      Oa = xa;
      pa.destroy = function (d) {
        pa.setAutoScrolling(!1, 'internal'),
        pa.setAllowScrolling(!1),
        pa.setKeyboardScrolling(!1),
        wa.addClass('fp-destroyed'),
        a(b).off('scroll', j).off('hashchange', B).off('resize', G),
        a(c).off('click', '#fp-nav a').off('mouseenter', '#fp-nav li').off('mouseleave', '#fp-nav li').off('click', '.fp-slidesNav a').off('mouseover', f.normalScrollElements).off('mouseout', f.normalScrollElements),
        a('.fp-section').off('click', '.fp-controlArrow'),
        d && la()
      }
    }
  }(jQuery, window, document, Math),
  function (a, b) {
    'function' == typeof define && define.amd ? define(b) : a.Dragdealer = b()
  }(this, function () {
    function a(a) {
      var b = 'Webkit Moz ms O'.split(' '),
      c = document.documentElement.style;
      if (void 0 !== c[a]) return a;
      a = a.charAt(0).toUpperCase() + a.substr(1);
      for (var d = 0; d < b.length; d++) if (void 0 !== c[b[d] + a]) return b[d] + a
    }
    function b(a) {
      k.backfaceVisibility && k.perspective && (a.style[k.perspective] = '1000px', a.style[k.backfaceVisibility] = 'hidden')
    }
    var c = function (a, b) {
      this.options = this.applyDefaults(b || {
      }),
      this.bindMethods(),
      this.wrapper = this.getWrapperElement(a),
      this.wrapper && (this.handle = this.getHandleElement(this.wrapper, this.options.handleClass), this.handle && (this.init(), this.bindEventListeners()))
    };
    c.prototype = {
      defaults: {
        disabled: !1,
        horizontal: !0,
        vertical: !1,
        slide: !0,
        steps: 0,
        snap: !1,
        loose: !1,
        speed: 0.1,
        xPrecision: 0,
        yPrecision: 0,
        handleClass: 'handle',
        css3: !0,
        activeClass: 'active',
        tapping: !0
      },
      init: function () {
        this.options.css3 && b(this.handle),
        this.value = {
          prev: [
            - 1,
            - 1
          ],
          current: [
            this.options.x || 0,
            this.options.y || 0
          ],
          target: [
            this.options.x || 0,
            this.options.y || 0
          ]
        },
        this.offset = {
          wrapper: [
            0,
            0
          ],
          mouse: [
            0,
            0
          ],
          prev: [
            - 999999,
            - 999999
          ],
          current: [
            0,
            0
          ],
          target: [
            0,
            0
          ]
        },
        this.change = [
          0,
          0
        ],
        this.stepRatios = this.calculateStepRatios(),
        this.activity = !1,
        this.dragging = !1,
        this.tapping = !1,
        this.reflow(),
        this.options.disabled && this.disable()
      },
      applyDefaults: function (a) {
        for (var b in this.defaults) a.hasOwnProperty(b) || (a[b] = this.defaults[b]);
        return a
      },
      getWrapperElement: function (a) {
        return 'string' == typeof a ? document.getElementById(a) : a
      },
      getHandleElement: function (a, b) {
        var c,
        d,
        e;
        if (a.getElementsByClassName) {
          if (c = a.getElementsByClassName(b), c.length > 0) return c[0]
        } else for (d = new RegExp('(^|\\s)' + b + '(\\s|$)'), c = a.getElementsByTagName('*'), e = 0; e < c.length; e++) if (d.test(c[e].className)) return c[e]
      },
      calculateStepRatios: function () {
        var a = [
        ];
        if (this.options.steps >= 1) for (var b = 0; b <= this.options.steps - 1; b++) this.options.steps > 1 ? a[b] = b / (this.options.steps - 1) : a[b] = 0;
        return a
      },
      setWrapperOffset: function () {
        this.offset.wrapper = j.get(this.wrapper)
      },
      calculateBounds: function () {
        var a = {
          top: this.options.top || 0,
          bottom: - (this.options.bottom || 0) + this.wrapper.offsetHeight,
          left: this.options.left || 0,
          right: - (this.options.right || 0) + this.wrapper.offsetWidth
        };
        return a.availWidth = a.right - a.left - this.handle.offsetWidth,
        a.availHeight = a.bottom - a.top - this.handle.offsetHeight,
        a
      },
      calculateValuePrecision: function () {
        var a = this.options.xPrecision || Math.abs(this.bounds.availWidth),
        b = this.options.yPrecision || Math.abs(this.bounds.availHeight);
        return [a ? 1 / a : 0,
        b ? 1 / b : 0]
      },
      bindMethods: function () {
        'function' == typeof this.options.customRequestAnimationFrame ? this.requestAnimationFrame = d(this.options.customRequestAnimationFrame, window) : this.requestAnimationFrame = d(m, window),
        'function' == typeof this.options.customCancelAnimationFrame ? this.cancelAnimationFrame = d(this.options.customCancelAnimationFrame, window) : this.cancelAnimationFrame = d(n, window),
        this.animateWithRequestAnimationFrame = d(this.animateWithRequestAnimationFrame, this),
        this.animate = d(this.animate, this),
        this.onHandleMouseDown = d(this.onHandleMouseDown, this),
        this.onHandleTouchStart = d(this.onHandleTouchStart, this),
        this.onDocumentMouseMove = d(this.onDocumentMouseMove, this),
        this.onWrapperTouchMove = d(this.onWrapperTouchMove, this),
        this.onWrapperMouseDown = d(this.onWrapperMouseDown, this),
        this.onWrapperTouchStart = d(this.onWrapperTouchStart, this),
        this.onDocumentMouseUp = d(this.onDocumentMouseUp, this),
        this.onDocumentTouchEnd = d(this.onDocumentTouchEnd, this),
        this.onHandleClick = d(this.onHandleClick, this),
        this.onWindowResize = d(this.onWindowResize, this)
      },
      bindEventListeners: function () {
        e(this.handle, 'mousedown', this.onHandleMouseDown),
        e(this.handle, 'touchstart', this.onHandleTouchStart),
        e(document, 'mousemove', this.onDocumentMouseMove),
        e(this.wrapper, 'touchmove', this.onWrapperTouchMove),
        e(this.wrapper, 'mousedown', this.onWrapperMouseDown),
        e(this.wrapper, 'touchstart', this.onWrapperTouchStart),
        e(document, 'mouseup', this.onDocumentMouseUp),
        e(document, 'touchend', this.onDocumentTouchEnd),
        e(this.handle, 'click', this.onHandleClick),
        e(window, 'resize', this.onWindowResize),
        this.animate(!1, !0),
        this.interval = this.requestAnimationFrame(this.animateWithRequestAnimationFrame)
      },
      unbindEventListeners: function () {
        f(this.handle, 'mousedown', this.onHandleMouseDown),
        f(this.handle, 'touchstart', this.onHandleTouchStart),
        f(document, 'mousemove', this.onDocumentMouseMove),
        f(this.wrapper, 'touchmove', this.onWrapperTouchMove),
        f(this.wrapper, 'mousedown', this.onWrapperMouseDown),
        f(this.wrapper, 'touchstart', this.onWrapperTouchStart),
        f(document, 'mouseup', this.onDocumentMouseUp),
        f(document, 'touchend', this.onDocumentTouchEnd),
        f(this.handle, 'click', this.onHandleClick),
        f(window, 'resize', this.onWindowResize),
        this.cancelAnimationFrame(this.interval)
      },
      onHandleMouseDown: function (a) {
        i.refresh(a),
        g(a),
        h(a),
        this.activity = !1,
        this.startDrag()
      },
      onHandleTouchStart: function (a) {
        i.refresh(a),
        h(a),
        this.activity = !1,
        this.startDrag()
      },
      onDocumentMouseMove: function (a) {
        i.refresh(a),
        this.dragging && (this.activity = !0, g(a))
      },
      onWrapperTouchMove: function (a) {
        if (i.refresh(a), !this.activity && this.draggingOnDisabledAxis()) return void (this.dragging && this.stopDrag());
        g(a),
        this.activity = !0
      },
      onWrapperMouseDown: function (a) {
        i.refresh(a),
        g(a),
        this.startTap()
      },
      onWrapperTouchStart: function (a) {
        i.refresh(a),
        g(a),
        this.startTap()
      },
      onDocumentMouseUp: function (a) {
        this.stopDrag(),
        this.stopTap()
      },
      onDocumentTouchEnd: function (a) {
        this.stopDrag(),
        this.stopTap()
      },
      onHandleClick: function (a) {
        this.activity && (g(a), h(a))
      },
      onWindowResize: function (a) {
        this.reflow()
      },
      enable: function () {
        this.disabled = !1,
        this.handle.className = this.handle.className.replace(/\s?disabled/g, '')
      },
      disable: function () {
        this.disabled = !0,
        this.handle.className += ' disabled'
      },
      reflow: function () {
        this.setWrapperOffset(),
        this.bounds = this.calculateBounds(),
        this.valuePrecision = this.calculateValuePrecision(),
        this.updateOffsetFromValue()
      },
      getStep: function () {
        return [this.getStepNumber(this.value.target[0]),
        this.getStepNumber(this.value.target[1])]
      },
      getValue: function () {
        return this.value.target
      },
      setStep: function (a, b, c) {
        this.setValue(this.options.steps && a > 1 ? (a - 1) / (this.options.steps - 1) : 0, this.options.steps && b > 1 ? (b - 1) / (this.options.steps - 1) : 0, c)
      },
      setValue: function (a, b, c) {
        this.setTargetValue([a,
        b || 0]),
        c && (this.groupCopy(this.value.current, this.value.target), this.updateOffsetFromValue(), this.callAnimationCallback())
      },
      startTap: function () {
        !this.disabled && this.options.tapping && (this.tapping = !0, this.setWrapperOffset(), this.setTargetValueByOffset([i.x - this.offset.wrapper[0] - this.handle.offsetWidth / 2,
        i.y - this.offset.wrapper[1] - this.handle.offsetHeight / 2]))
      },
      stopTap: function () {
        !this.disabled && this.tapping && (this.tapping = !1, this.setTargetValue(this.value.current))
      },
      startDrag: function () {
        this.disabled || (this.dragging = !0, this.setWrapperOffset(), this.offset.mouse = [
          i.x - j.get(this.handle) [0],
          i.y - j.get(this.handle) [1]
        ], this.wrapper.className.match(this.options.activeClass) || (this.wrapper.className += ' ' + this.options.activeClass), this.callDragStartCallback())
      },
      stopDrag: function () {
        if (!this.disabled && this.dragging) {
          this.dragging = !1;
          var a = this.groupClone(this.value.current);
          if (this.options.slide) {
            var b = this.change;
            a[0] += 4 * b[0],
            a[1] += 4 * b[1]
          }
          this.setTargetValue(a),
          this.wrapper.className = this.wrapper.className.replace(' ' + this.options.activeClass, ''),
          this.callDragStopCallback()
        }
      },
      callAnimationCallback: function () {
        var a = this.value.current;
        this.options.snap && this.options.steps > 1 && (a = this.getClosestSteps(a)),
        this.groupCompare(a, this.value.prev) || ('function' == typeof this.options.animationCallback && this.options.animationCallback.call(this, a[0], a[1], this.offset.current[1]), this.groupCopy(this.value.prev, a))
      },
      callTargetCallback: function () {
        'function' == typeof this.options.callback && this.options.callback.call(this, this.value.target[0], this.value.target[1])
      },
      callDragStartCallback: function () {
        'function' == typeof this.options.dragStartCallback && this.options.dragStartCallback.call(this, this.value.target[0], this.value.target[1])
      },
      callDragStopCallback: function () {
        'function' == typeof this.options.dragStopCallback && this.options.dragStopCallback.call(this, this.value.target[0], this.value.target[1])
      },
      animateWithRequestAnimationFrame: function (a) {
        a ? (this.timeOffset = this.timeStamp ? a - this.timeStamp : 0, this.timeStamp = a) : this.timeOffset = 25,
        this.animate(),
        this.interval = this.requestAnimationFrame(this.animateWithRequestAnimationFrame)
      },
      animate: function (a, b) {
        if (!a || this.dragging) {
          if (this.dragging) {
            var c = this.groupClone(this.value.target),
            d = [
              i.x - this.offset.wrapper[0] - this.offset.mouse[0],
              i.y - this.offset.wrapper[1] - this.offset.mouse[1]
            ];
            this.setTargetValueByOffset(d, this.options.loose),
            this.change = [
              this.value.target[0] - c[0],
              this.value.target[1] - c[1]
            ]
          }(this.dragging || b) && this.groupCopy(this.value.current, this.value.target),
          (this.dragging || this.glide() || b) && (this.updateOffsetFromValue(), this.callAnimationCallback())
        }
      },
      glide: function () {
        var a = [
          this.value.target[0] - this.value.current[0],
          this.value.target[1] - this.value.current[1]
        ];
        return !(!a[0] && !a[1]) && (Math.abs(a[0]) > this.valuePrecision[0] || Math.abs(a[1]) > this.valuePrecision[1] ? (this.value.current[0] += a[0] * Math.min(this.options.speed * this.timeOffset / 25, 1), this.value.current[1] += a[1] * Math.min(this.options.speed * this.timeOffset / 25, 1)) : this.groupCopy(this.value.current, this.value.target), !0)
      },
      updateOffsetFromValue: function () {
        this.options.snap ? this.offset.current = this.getOffsetsByRatios(this.getClosestSteps(this.value.current)) : this.offset.current = this.getOffsetsByRatios(this.value.current),
        this.groupCompare(this.offset.current, this.offset.prev) || (this.renderHandlePosition(), this.groupCopy(this.offset.prev, this.offset.current))
      },
      renderHandlePosition: function () {
        var a = '';
        if (this.options.css3 && k.transform) return this.options.horizontal && (a += 'translateX(' + this.offset.current[0] + 'px)'),
        this.options.vertical && (a += ' translateY(' + this.offset.current[1] + 'px)'),
        void (this.handle.style[k.transform] = a);
        this.options.horizontal && (this.handle.style.left = this.offset.current[0] + 'px'),
        this.options.vertical && (this.handle.style.top = this.offset.current[1] + 'px')
      },
      setTargetValue: function (a, b) {
        var c = b ? this.getLooseValue(a) : this.getProperValue(a);
        this.groupCopy(this.value.target, c),
        this.offset.target = this.getOffsetsByRatios(c),
        this.callTargetCallback()
      },
      setTargetValueByOffset: function (a, b) {
        var c = this.getRatiosByOffsets(a),
        d = b ? this.getLooseValue(c) : this.getProperValue(c);
        this.groupCopy(this.value.target, d),
        this.offset.target = this.getOffsetsByRatios(d)
      },
      getLooseValue: function (a) {
        var b = this.getProperValue(a);
        return [b[0] + (a[0] - b[0]) / 4,
        b[1] + (a[1] - b[1]) / 4]
      },
      getProperValue: function (a) {
        var b = this.groupClone(a);
        return b[0] = Math.max(b[0], 0),
        b[1] = Math.max(b[1], 0),
        b[0] = Math.min(b[0], 1),
        b[1] = Math.min(b[1], 1),
        (!this.dragging && !this.tapping || this.options.snap) && this.options.steps > 1 && (b = this.getClosestSteps(b)),
        b
      },
      getRatiosByOffsets: function (a) {
        return [this.getRatioByOffset(a[0], this.bounds.availWidth, this.bounds.left),
        this.getRatioByOffset(a[1], this.bounds.availHeight, this.bounds.top)]
      },
      getRatioByOffset: function (a, b, c) {
        return b ? (a - c) / b : 0
      },
      getOffsetsByRatios: function (a) {
        return [this.getOffsetByRatio(a[0], this.bounds.availWidth, this.bounds.left),
        this.getOffsetByRatio(a[1], this.bounds.availHeight, this.bounds.top)]
      },
      getOffsetByRatio: function (a, b, c) {
        return Math.round(a * b) + c
      },
      getStepNumber: function (a) {
        return this.getClosestStep(a) * (this.options.steps - 1) + 1
      },
      getClosestSteps: function (a) {
        return [this.getClosestStep(a[0]),
        this.getClosestStep(a[1])]
      },
      getClosestStep: function (a) {
        for (var b = 0, c = 1, d = 0; d <= this.options.steps - 1; d++) Math.abs(this.stepRatios[d] - a) < c && (c = Math.abs(this.stepRatios[d] - a), b = d);
        return this.stepRatios[b]
      },
      groupCompare: function (a, b) {
        return a[0] == b[0] && a[1] == b[1]
      },
      groupCopy: function (a, b) {
        a[0] = b[0],
        a[1] = b[1]
      },
      groupClone: function (a) {
        return [a[0],
        a[1]]
      },
      draggingOnDisabledAxis: function () {
        return !this.options.horizontal && i.xDiff > i.yDiff || !this.options.vertical && i.yDiff > i.xDiff
      }
    };
    for (var d = function (a, b) {
      return function () {
        return a.apply(b, arguments)
      }
    }, e = function (a, b, c) {
      a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent('on' + b, c)
    }, f = function (a, b, c) {
      a.removeEventListener ? a.removeEventListener(b, c, !1) : a.detachEvent && a.detachEvent('on' + b, c)
    }, g = function (a) {
      a || (a = window.event),
      a.preventDefault && a.preventDefault(),
      a.returnValue = !1
    }, h = function (a) {
      a || (a = window.event),
      a.stopPropagation && a.stopPropagation(),
      a.cancelBubble = !0
    }, i = {
      x: 0,
      y: 0,
      xDiff: 0,
      yDiff: 0,
      refresh: function (a) {
        a || (a = window.event),
        'mousemove' == a.type ? this.set(a) : a.touches && this.set(a.touches[0])
      },
      set: function (a) {
        var b = this.x,
        c = this.y;
        a.clientX || a.clientY ? (this.x = a.clientX, this.y = a.clientY) : (a.pageX || a.pageY) && (this.x = a.pageX - document.body.scrollLeft - document.documentElement.scrollLeft, this.y = a.pageY - document.body.scrollTop - document.documentElement.scrollTop),
        this.xDiff = Math.abs(this.x - b),
        this.yDiff = Math.abs(this.y - c)
      }
    }, j = {
      get: function (a) {
        var b = {
          left: 0,
          top: 0
        };
        return void 0 !== a.getBoundingClientRect && (b = a.getBoundingClientRect()),
        [
          b.left,
          b.top
        ]
      }
    }, k = {
      transform: a('transform'),
      perspective: a('perspective'),
      backfaceVisibility: a('backfaceVisibility')
    }, l = [
      'webkit',
      'moz'
    ], m = window.requestAnimationFrame, n = window.cancelAnimationFrame, o = 0; o < l.length && !m; ++o) m = window[l[o] + 'RequestAnimationFrame'],
    n = window[l[o] + 'CancelAnimationFrame'] || window[l[o] + 'CancelRequestAnimationFrame'];
    return m || (m = function (a) {
      return setTimeout(a, 25)
    }, n = clearTimeout),
    c
  }),
  'object' != typeof JSON && (JSON = {
  }),
  function () {
    'use strict';
    function f(a) {
      return a < 10 ? '0' + a : a
    }
    function quote(a) {
      return escapable.lastIndex = 0,
      escapable.test(a) ? '"' + a.replace(escapable, function (a) {
        var b = meta[a];
        return 'string' == typeof b ? b : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice( - 4)
      }) + '"' : '"' + a + '"'
    }
    function str(a, b) {
      var c,
      d,
      e,
      f,
      g,
      h = gap,
      i = b[a];
      switch (i && 'object' == typeof i && 'function' == typeof i.toJSON && (i = i.toJSON(a)), 'function' == typeof rep && (i = rep.call(b, a, i)), typeof i) {
        case 'string':
          return quote(i);
        case 'number':
          return isFinite(i) ? String(i) : 'null';
        case 'boolean':
        case 'null':
          return String(i);
        case 'object':
          if (!i) return 'null';
          if (gap += indent, g = [
          ], '[object Array]' === Object.prototype.toString.apply(i)) {
            for (f = i.length, c = 0; c < f; c += 1) g[c] = str(c, i) || 'null';
            return e = 0 === g.length ? '[]' : gap ? '[\n' + gap + g.join(',\n' + gap) + '\n' + h + ']' : '[' + g.join(',') + ']',
            gap = h,
            e
          }
          if (rep && 'object' == typeof rep) for (f = rep.length, c = 0; c < f; c += 1) 'string' == typeof rep[c] && (d = rep[c], (e = str(d, i)) && g.push(quote(d) + (gap ? ': ' : ':') + e));
           else for (d in i) Object.prototype.hasOwnProperty.call(i, d) && (e = str(d, i)) && g.push(quote(d) + (gap ? ': ' : ':') + e);
          return e = 0 === g.length ? '{}' : gap ? '{\n' + gap + g.join(',\n' + gap) + '\n' + h + '}' : '{' + g.join(',') + '}',
          gap = h,
          e
      }
    }
    'function' != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function (a) {
      return isFinite(this.valueOf()) ? this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z' : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (a) {
      return this.valueOf()
    });
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,
    gap,
    indent,
    meta = {
      '': '\\b',
      '\t': '\\t',
      '\n': '\\n',
      '\f': '\\f',
      '\r': '\\r',
      '"': '\\"',
      '\\': '\\\\'
    },
    rep;
    'function' != typeof JSON.stringify && (JSON.stringify = function (a, b, c) {
      var d;
      if (gap = '', indent = '', 'number' == typeof c) for (d = 0; d < c; d += 1) indent += ' ';
       else 'string' == typeof c && (indent = c);
      if (rep = b, !b || 'function' == typeof b || 'object' == typeof b && 'number' == typeof b.length) return str('', {
        '': a
      });
      throw new Error('JSON.stringify')
    }),
    'function' != typeof JSON.parse && (JSON.parse = function (text, reviver) {
      function walk(a, b) {
        var c,
        d,
        e = a[b];
        if (e && 'object' == typeof e) for (c in e) Object.prototype.hasOwnProperty.call(e, c) && (d = walk(e, c), void 0 !== d ? e[c] = d : delete e[c]);
        return reviver.call(a, b, e)
      }
      var j;
      if (text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function (a) {
        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice( - 4)
      })), /^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) return j = eval('(' + text + ')'),
      'function' == typeof reviver ? walk({
        '': j
      }, '') : j;
      throw new SyntaxError('JSON.parse')
    })
  }(),
  function (a, b) {
    'use strict';
    var c = a.History = a.History || {
    };
    if (void 0 !== c.Adapter) throw new Error('History.js Adapter has already been loaded...');
    c.Adapter = {
      handlers: {
      },
      _uid: 1,
      uid: function (a) {
        return a._uid || (a._uid = c.Adapter._uid++)
      },
      bind: function (a, b, d) {
        var e = c.Adapter.uid(a);
        c.Adapter.handlers[e] = c.Adapter.handlers[e] || {
        },
        c.Adapter.handlers[e][b] = c.Adapter.handlers[e][b] || [
        ],
        c.Adapter.handlers[e][b].push(d),
        a['on' + b] = function (a, b) {
          return function (d) {
            c.Adapter.trigger(a, b, d)
          }
        }(a, b)
      },
      trigger: function (a, b, d) {
        d = d || {
        };
        var e,
        f,
        g = c.Adapter.uid(a);
        for (c.Adapter.handlers[g] = c.Adapter.handlers[g] || {
        }, c.Adapter.handlers[g][b] = c.Adapter.handlers[g][b] || [
        ], e = 0, f = c.Adapter.handlers[g][b].length; e < f; ++e) c.Adapter.handlers[g][b][e].apply(this, [
          d
        ])
      },
      extractEventData: function (a, c) {
        return c && c[a] || b
      },
      onDomLoad: function (b) {
        var c = a.setTimeout(function () {
          b()
        }, 2000);
        a.onload = function () {
          clearTimeout(c),
          b()
        }
      }
    },
    void 0 !== c.init && c.init()
  }(window),
  function (a, b) {
    'use strict';
    var c = a.document,
    d = a.setTimeout || d,
    e = a.clearTimeout || e,
    f = a.setInterval || f,
    g = a.History = a.History || {
    };
    if (void 0 !== g.initHtml4) throw new Error('History.js HTML4 Support has already been loaded...');
    g.initHtml4 = function () {
      if (void 0 !== g.initHtml4.initialized) return !1;
      g.initHtml4.initialized = !0,
      g.enabled = !0,
      g.savedHashes = [
      ],
      g.isLastHash = function (a) {
        var b = g.getHashByIndex();
        return a === b
      },
      g.isHashEqual = function (a, b) {
        return a = encodeURIComponent(a).replace(/%25/g, '%'),
        b = encodeURIComponent(b).replace(/%25/g, '%'),
        a === b
      },
      g.saveHash = function (a) {
        return !g.isLastHash(a) && (g.savedHashes.push(a), !0)
      },
      g.getHashByIndex = function (a) {
        return void 0 === a ? g.savedHashes[g.savedHashes.length - 1] : a < 0 ? g.savedHashes[g.savedHashes.length + a] : g.savedHashes[a]
      },
      g.discardedHashes = {
      },
      g.discardedStates = {
      },
      g.discardState = function (a, b, c) {
        var d,
        e = g.getHashByState(a);
        return d = {
          discardedState: a,
          backState: c,
          forwardState: b
        },
        g.discardedStates[e] = d,
        !0
      },
      g.discardHash = function (a, b, c) {
        var d = {
          discardedHash: a,
          backState: c,
          forwardState: b
        };
        return g.discardedHashes[a] = d,
        !0
      },
      g.discardedState = function (a) {
        var b = g.getHashByState(a);
        return g.discardedStates[b] || !1
      },
      g.discardedHash = function (a) {
        return g.discardedHashes[a] || !1
      },
      g.recycleState = function (a) {
        var b = g.getHashByState(a);
        return g.discardedState(a) && delete g.discardedStates[b],
        !0
      },
      g.emulated.hashChange && (g.hashChangeInit = function () {
        g.checkerFunction = null;
        var b,
        d,
        e,
        h,
        i = '',
        j = Boolean(g.getHash());
        return g.isInternetExplorer() ? (b = 'historyjs-iframe', d = c.createElement('iframe'), d.setAttribute('id', b), d.setAttribute('src', '#'), d.style.display = 'none', c.body.appendChild(d), d.contentWindow.document.open(), d.contentWindow.document.close(), e = '', h = !1, g.checkerFunction = function () {
          if (h) return !1;
          h = !0;
          var b = g.getHash(),
          c = g.getHash(d.contentWindow.document);
          return b !== i ? (i = b, c !== b && (e = c = b, d.contentWindow.document.open(), d.contentWindow.document.close(), d.contentWindow.document.location.hash = g.escapeHash(b)), g.Adapter.trigger(a, 'hashchange')) : c !== e && (e = c, j && '' === c ? g.back() : g.setHash(c, !1)),
          h = !1,
          !0
        }) : g.checkerFunction = function () {
          var b = g.getHash() || '';
          return b !== i && (i = b, g.Adapter.trigger(a, 'hashchange')),
          !0
        },
        g.intervalList.push(f(g.checkerFunction, g.options.hashChangeInterval)),
        !0
      }, g.Adapter.onDomLoad(g.hashChangeInit)),
      g.emulated.pushState && (g.onHashChange = function (b) {
        var c,
        d = b && b.newURL || g.getLocationHref(),
        e = g.getHashByUrl(d),
        f = null;
        return g.isLastHash(e) ? (g.busy(!1), !1) : (g.doubleCheckComplete(), g.saveHash(e), e && g.isTraditionalAnchor(e) ? (g.Adapter.trigger(a, 'anchorchange'), g.busy(!1), !1) : (f = g.extractState(g.getFullUrl(e || g.getLocationHref()), !0), g.isLastSavedState(f) ? (g.busy(!1), !1) : (g.getHashByState(f), c = g.discardedState(f), c ? (g.getHashByIndex( - 2) === g.getHashByState(c.forwardState) ? g.back(!1) : g.forward(!1), !1) : (g.pushState(f.data, f.title, encodeURI(f.url), !1), !0))))
      }, g.Adapter.bind(a, 'hashchange', g.onHashChange), g.pushState = function (b, c, d, e) {
        if (d = encodeURI(d).replace(/%25/g, '%'), g.getHashByUrl(d)) throw new Error('History.js does not support states with fragment-identifiers (hashes/anchors).');
        if (!1 !== e && g.busy()) return g.pushQueue({
          scope: g,
          callback: g.pushState,
          args: arguments,
          queue: e
        }),
        !1;
        g.busy(!0);
        var f = g.createStateObject(b, c, d),
        h = g.getHashByState(f),
        i = g.getState(!1),
        j = g.getHashByState(i),
        k = g.getHash(),
        l = g.expectedStateId == f.id;
        return g.storeState(f),
        g.expectedStateId = f.id,
        g.recycleState(f),
        g.setTitle(f),
        h === j ? (g.busy(!1), !1) : (g.saveState(f), l || g.Adapter.trigger(a, 'statechange'), !g.isHashEqual(h, k) && !g.isHashEqual(h, g.getShortUrl(g.getLocationHref())) && g.setHash(h, !1), g.busy(!1), !0)
      }, g.replaceState = function (b, c, d, e) {
        if (d = encodeURI(d).replace(/%25/g, '%'), g.getHashByUrl(d)) throw new Error('History.js does not support states with fragment-identifiers (hashes/anchors).');
        if (!1 !== e && g.busy()) return g.pushQueue({
          scope: g,
          callback: g.replaceState,
          args: arguments,
          queue: e
        }),
        !1;
        g.busy(!0);
        var f = g.createStateObject(b, c, d),
        h = g.getHashByState(f),
        i = g.getState(!1),
        j = g.getHashByState(i),
        k = g.getStateByIndex( - 2);
        return g.discardState(i, f, k),
        h === j ? (g.storeState(f), g.expectedStateId = f.id, g.recycleState(f), g.setTitle(f), g.saveState(f), g.Adapter.trigger(a, 'statechange'), g.busy(!1)) : g.pushState(f.data, f.title, f.url, !1),
        !0
      }),
      g.emulated.pushState && g.getHash() && !g.emulated.hashChange && g.Adapter.onDomLoad(function () {
        g.Adapter.trigger(a, 'hashchange')
      })
    },
    void 0 !== g.init && g.init()
  }(window),
  function (a, b) {
    'use strict';
    var c = a.console || b,
    d = a.document,
    e = a.navigator,
    f = !1,
    g = a.setTimeout,
    h = a.clearTimeout,
    i = a.setInterval,
    j = a.clearInterval,
    k = a.JSON,
    l = a.alert,
    m = a.History = a.History || {
    },
    n = a.history;
    try {
      f = a.sessionStorage,
      f.setItem('TEST', '1'),
      f.removeItem('TEST')
    } catch (o) {
      f = !1
    }
    if (k.stringify = k.stringify || k.encode, k.parse = k.parse || k.decode, void 0 !== m.init) throw new Error('History.js Core has already been loaded...');
    m.init = function (a) {
      return void 0 !== m.Adapter && (void 0 !== m.initCore && m.initCore(), void 0 !== m.initHtml4 && m.initHtml4(), !0)
    },
    m.initCore = function (o) {
      if (void 0 !== m.initCore.initialized) return !1;
      if (m.initCore.initialized = !0, m.options = m.options || {
      }, m.options.hashChangeInterval = m.options.hashChangeInterval || 100, m.options.safariPollInterval = m.options.safariPollInterval || 500, m.options.doubleCheckInterval = m.options.doubleCheckInterval || 500, m.options.disableSuid = m.options.disableSuid || !1, m.options.storeInterval = m.options.storeInterval || 1000, m.options.busyDelay = m.options.busyDelay || 250, m.options.debug = m.options.debug || !1, m.options.initialTitle = m.options.initialTitle || d.title, m.options.html4Mode = m.options.html4Mode || !1, m.options.delayInit = m.options.delayInit || !1, m.intervalList = [
      ], m.clearAllIntervals = function () {
        var a,
        b = m.intervalList;
        if (void 0 !== b && null !== b) {
          for (a = 0; a < b.length; a++) j(b[a]);
          m.intervalList = null
        }
      }, m.debug = function () {
        (m.options.debug || !1) && m.log.apply(m, arguments)
      }, m.log = function () {
        var a,
        b,
        e,
        f,
        g,
        h = void 0 !== c && void 0 !== c.log && void 0 !== c.log.apply,
        i = d.getElementById('log');
        for (h ? (f = Array.prototype.slice.call(arguments), a = f.shift(), void 0 !== c.debug ? c.debug.apply(c, [
          a,
          f
        ]) : c.log.apply(c, [
          a,
          f
        ])) : a = '\n' + arguments[0] + '\n', b = 1, e = arguments.length; b < e; ++b) {
          if ('object' == typeof (g = arguments[b]) && void 0 !== k) try {
            g = k.stringify(g)
          } catch (j) {
          }
          a += '\n' + g + '\n'
        }
        return i ? (i.value += a + '\n-----\n', i.scrollTop = i.scrollHeight - i.clientHeight) : h || l(a),
        !0
      }, m.getInternetExplorerMajorVersion = function () {
        return m.getInternetExplorerMajorVersion.cached = void 0 !== m.getInternetExplorerMajorVersion.cached ? m.getInternetExplorerMajorVersion.cached : function () {
          for (var a = 3, b = d.createElement('div'), c = b.getElementsByTagName('i'); (b.innerHTML = '<!--[if gt IE ' + ++a + ']><i></i><![endif]-->') && c[0]; );
          return a > 4 && a
        }()
      }, m.isInternetExplorer = function () {
        return m.isInternetExplorer.cached = void 0 !== m.isInternetExplorer.cached ? m.isInternetExplorer.cached : Boolean(m.getInternetExplorerMajorVersion())
      }, m.options.html4Mode ? m.emulated = {
        pushState: !0,
        hashChange: !0
      }
       : m.emulated = {
        pushState: !Boolean(a.history && a.history.pushState && a.history.replaceState && !/ Mobile\/([1-7][a-z]|(8([abcde]|f(1[0-8]))))/i.test(e.userAgent) && !/AppleWebKit\/5([0-2]|3[0-2])/i.test(e.userAgent)),
        hashChange: Boolean(!('onhashchange' in a || 'onhashchange' in d) || m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8)
      }, m.enabled = !m.emulated.pushState, m.bugs = {
        setHash: Boolean(!m.emulated.pushState && 'Apple Computer, Inc.' === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
        safariPoll: Boolean(!m.emulated.pushState && 'Apple Computer, Inc.' === e.vendor && /AppleWebKit\/5([0-2]|3[0-3])/.test(e.userAgent)),
        ieDoubleCheck: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 8),
        hashEscape: Boolean(m.isInternetExplorer() && m.getInternetExplorerMajorVersion() < 7)
      }, m.isEmptyObject = function (a) {
        for (var b in a) if (a.hasOwnProperty(b)) return !1;
        return !0
      }, m.cloneObject = function (a) {
        var b,
        c;
        return a ? (b = k.stringify(a), c = k.parse(b)) : c = {
        },
        c
      }, m.getRootUrl = function () {
        var a = d.location.protocol + '//' + (d.location.hostname || d.location.host);
        return d.location.port && (a += ':' + d.location.port),
        a += '/'
      }, m.getBaseHref = function () {
        var a = d.getElementsByTagName('base'),
        b = null,
        c = '';
        return 1 === a.length && (b = a[0], c = b.href.replace(/[^\/]+$/, '')),
        c = c.replace(/\/+$/, ''),
        c && (c += '/'),
        c
      }, m.getBaseUrl = function () {
        return m.getBaseHref() || m.getBasePageUrl() || m.getRootUrl()
      }, m.getPageUrl = function () {
        var a = m.getState(!1, !1),
        b = (a || {
        }).url || m.getLocationHref();
        return b.replace(/\/+$/, '').replace(/[^\/]+$/, function (a, b, c) {
          return /\./.test(a) ? a : a + '/'
        })
      }, m.getBasePageUrl = function () {
        return m.getLocationHref().replace(/[#\?].*/, '').replace(/[^\/]+$/, function (a, b, c) {
          return /[^\/]$/.test(a) ? '' : a
        }).replace(/\/+$/, '') + '/'
      }, m.getFullUrl = function (a, b) {
        var c = a,
        d = a.substring(0, 1);
        return b = void 0 === b || b,
        /[a-z]+\:\/\//.test(a) || (c = '/' === d ? m.getRootUrl() + a.replace(/^\/+/, '') : '#' === d ? m.getPageUrl().replace(/#.*/, '') + a : '?' === d ? m.getPageUrl().replace(/[\?#].*/, '') + a : b ? m.getBaseUrl() + a.replace(/^(\.\/)+/, '') : m.getBasePageUrl() + a.replace(/^(\.\/)+/, '')),
        c.replace(/\#$/, '')
      }, m.getShortUrl = function (a) {
        var b = a,
        c = m.getBaseUrl(),
        d = m.getRootUrl();
        return m.emulated.pushState && (b = b.replace(c, '')),
        b = b.replace(d, '/'),
        m.isTraditionalAnchor(b) && (b = './' + b),
        b = b.replace(/^(\.\/)+/g, './').replace(/\#$/, '')
      }, m.getLocationHref = function (a) {
        return a = a || d,
        a.URL === a.location.href ? a.location.href : a.location.href === decodeURIComponent(a.URL) ? a.URL : a.location.hash && decodeURIComponent(a.location.href.replace(/^[^#]+/, '')) === a.location.hash ? a.location.href : - 1 == a.URL.indexOf('#') && - 1 != a.location.href.indexOf('#') ? a.location.href : a.URL || a.location.href
      }, m.store = {
      }, m.idToState = m.idToState || {
      }, m.stateToId = m.stateToId || {
      }, m.urlToId = m.urlToId || {
      }, m.storedStates = m.storedStates || [
      ], m.savedStates = m.savedStates || [
      ], m.normalizeStore = function () {
        m.store.idToState = m.store.idToState || {
        },
        m.store.urlToId = m.store.urlToId || {
        },
        m.store.stateToId = m.store.stateToId || {
        }
      }, m.getState = function (a, b) {
        void 0 === a && (a = !0),
        void 0 === b && (b = !0);
        var c = m.getLastSavedState();
        return !c && b && (c = m.createStateObject()),
        a && (c = m.cloneObject(c), c.url = c.cleanUrl || c.url),
        c
      }, m.getIdByState = function (a) {
        var b,
        c = m.extractId(a.url);
        if (!c) if (b = m.getStateString(a), void 0 !== m.stateToId[b]) c = m.stateToId[b];
         else if (void 0 !== m.store.stateToId[b]) c = m.store.stateToId[b];
         else {
          for (; c = (new Date).getTime() + String(Math.random()).replace(/\D/g, ''), void 0 !== m.idToState[c] || void 0 !== m.store.idToState[c]; );
          m.stateToId[b] = c,
          m.idToState[c] = a
        }
        return c
      }, m.normalizeState = function (a) {
        var b,
        c;
        return a && 'object' == typeof a || (a = {
        }),
        void 0 !== a.normalized ? a : (a.data && 'object' == typeof a.data || (a.data = {
        }), b = {
        }, b.normalized = !0, b.title = a.title || '', b.url = m.getFullUrl(a.url ? a.url : m.getLocationHref()), b.hash = m.getShortUrl(b.url), b.data = m.cloneObject(a.data), b.id = m.getIdByState(b), b.cleanUrl = b.url.replace(/\??\&_suid.*/, ''), b.url = b.cleanUrl, c = !m.isEmptyObject(b.data), (b.title || c) && !0 !== m.options.disableSuid && (b.hash = m.getShortUrl(b.url).replace(/\??\&_suid.*/, ''), /\?/.test(b.hash) || (b.hash += '?'), b.hash += '&_suid=' + b.id), b.hashedUrl = m.getFullUrl(b.hash), (m.emulated.pushState || m.bugs.safariPoll) && m.hasUrlDuplicate(b) && (b.url = b.hashedUrl), b)
      }, m.createStateObject = function (a, b, c) {
        var d = {
          data: a,
          title: b,
          url: c
        };
        return d = m.normalizeState(d)
      }, m.getStateById = function (a) {
        return a = String(a),
        m.idToState[a] || m.store.idToState[a] || b
      }, m.getStateString = function (a) {
        var b,
        c;
        return b = m.normalizeState(a),
        c = {
          data: b.data,
          title: a.title,
          url: a.url
        },
        k.stringify(c)
      }, m.getStateId = function (a) {
        var b;
        return b = m.normalizeState(a),
        b.id
      }, m.getHashByState = function (a) {
        var b;
        return b = m.normalizeState(a),
        b.hash
      }, m.extractId = function (a) {
        var b,
        c;
        return c = - 1 != a.indexOf('#') ? a.split('#') [0] : a,
        b = /(.*)\&_suid=([0-9]+)$/.exec(c),
        b ? b[1] || a : a,
        (b ? String(b[2] || '') : '') || !1
      }, m.isTraditionalAnchor = function (a) {
        return !/[\/\?\.]/.test(a)
      }, m.extractState = function (a, b) {
        var c,
        d,
        e = null;
        return b = b || !1,
        c = m.extractId(a),
        c && (e = m.getStateById(c)),
        e || (d = m.getFullUrl(a), c = m.getIdByUrl(d) || !1, c && (e = m.getStateById(c)), !e && b && !m.isTraditionalAnchor(a) && (e = m.createStateObject(null, null, d))),
        e
      }, m.getIdByUrl = function (a) {
        return m.urlToId[a] || m.store.urlToId[a] || b
      }, m.getLastSavedState = function () {
        return m.savedStates[m.savedStates.length - 1] || b
      }, m.getLastStoredState = function () {
        return m.storedStates[m.storedStates.length - 1] || b
      }, m.hasUrlDuplicate = function (a) {
        var b;
        return b = m.extractState(a.url),
        b && b.id !== a.id
      }, m.storeState = function (a) {
        return m.urlToId[a.url] = a.id,
        m.storedStates.push(m.cloneObject(a)),
        a
      }, m.isLastSavedState = function (a) {
        var b,
        c,
        d,
        e = !1;
        return m.savedStates.length && (b = a.id, c = m.getLastSavedState(), d = c.id, e = b === d),
        e
      }, m.saveState = function (a) {
        return !m.isLastSavedState(a) && (m.savedStates.push(m.cloneObject(a)), !0)
      }, m.getStateByIndex = function (a) {
        return void 0 === a ? m.savedStates[m.savedStates.length - 1] : a < 0 ? m.savedStates[m.savedStates.length + a] : m.savedStates[a]
      }, m.getCurrentIndex = function () {
        return m.savedStates.length < 1 ? 0 : m.savedStates.length - 1
      }, m.getHash = function (a) {
        var b = m.getLocationHref(a);
        return m.getHashByUrl(b)
      }, m.unescapeHash = function (a) {
        var b = m.normalizeHash(a);
        return b = decodeURIComponent(b)
      }, m.normalizeHash = function (a) {
        return a.replace(/[^#]*#/, '').replace(/#.*/, '')
      }, m.setHash = function (a, b) {
        var c,
        e;
        return !1 !== b && m.busy() ? (m.pushQueue({
          scope: m,
          callback: m.setHash,
          args: arguments,
          queue: b
        }), !1) : (m.busy(!0), c = m.extractState(a, !0), c && !m.emulated.pushState ? m.pushState(c.data, c.title, c.url, !1) : m.getHash() !== a && (m.bugs.setHash ? (e = m.getPageUrl(), m.pushState(null, null, e + '#' + a, !1)) : d.location.hash = a), m)
      }, m.escapeHash = function (b) {
        var c = m.normalizeHash(b);
        return c = a.encodeURIComponent(c),
        m.bugs.hashEscape || (c = c.replace(/\%21/g, '!').replace(/\%26/g, '&').replace(/\%3D/g, '=').replace(/\%3F/g, '?')),
        c
      }, m.getHashByUrl = function (a) {
        var b = String(a).replace(/([^#]*)#?([^#]*)#?(.*)/, '$2');
        return b = m.unescapeHash(b)
      }, m.setTitle = function (a) {
        var b,
        c = a.title;
        c || (b = m.getStateByIndex(0)) && b.url === a.url && (c = b.title || m.options.initialTitle);
        try {
          d.getElementsByTagName('title') [0].innerHTML = c.replace('<', '&lt;').replace('>', '&gt;').replace(' & ', ' &amp; ')
        } catch (e) {
        }
        return d.title = c,
        m
      }, m.queues = [
      ], m.busy = function (a) {
        if (void 0 !== a ? m.busy.flag = a : void 0 === m.busy.flag && (m.busy.flag = !1), !m.busy.flag) {
          h(m.busy.timeout);
          var b = function () {
            var a,
            c,
            d;
            if (!m.busy.flag) for (a = m.queues.length - 1; a >= 0; --a) c = m.queues[a],
            0 !== c.length && (d = c.shift(), m.fireQueueItem(d), m.busy.timeout = g(b, m.options.busyDelay))
          };
          m.busy.timeout = g(b, m.options.busyDelay)
        }
        return m.busy.flag
      }, m.busy.flag = !1, m.fireQueueItem = function (a) {
        return a.callback.apply(a.scope || m, a.args || [
        ])
      }, m.pushQueue = function (a) {
        return m.queues[a.queue || 0] = m.queues[a.queue || 0] || [
        ],
        m.queues[a.queue || 0].push(a),
        m
      }, m.queue = function (a, b) {
        return 'function' == typeof a && (a = {
          callback: a
        }),
        void 0 !== b && (a.queue = b),
        m.busy() ? m.pushQueue(a) : m.fireQueueItem(a),
        m
      }, m.clearQueue = function () {
        return m.busy.flag = !1,
        m.queues = [
        ],
        m
      }, m.stateChanged = !1, m.doubleChecker = !1, m.doubleCheckComplete = function () {
        return m.stateChanged = !0,
        m.doubleCheckClear(),
        m
      }, m.doubleCheckClear = function () {
        return m.doubleChecker && (h(m.doubleChecker), m.doubleChecker = !1),
        m
      }, m.doubleCheck = function (a) {
        return m.stateChanged = !1,
        m.doubleCheckClear(),
        m.bugs.ieDoubleCheck && (m.doubleChecker = g(function () {
          return m.doubleCheckClear(),
          m.stateChanged || a(),
          !0
        }, m.options.doubleCheckInterval)),
        m
      }, m.safariStatePoll = function () {
        var b,
        c = m.extractState(m.getLocationHref());
        if (!m.isLastSavedState(c)) return b = c,
        b || (b = m.createStateObject()),
        m.Adapter.trigger(a, 'popstate'),
        m
      }, m.back = function (a) {
        return !1 !== a && m.busy() ? (m.pushQueue({
          scope: m,
          callback: m.back,
          args: arguments,
          queue: a
        }), !1) : (m.busy(!0), m.doubleCheck(function () {
          m.back(!1)
        }), n.go( - 1), !0)
      }, m.forward = function (a) {
        return !1 !== a && m.busy() ? (m.pushQueue({
          scope: m,
          callback: m.forward,
          args: arguments,
          queue: a
        }), !1) : (m.busy(!0), m.doubleCheck(function () {
          m.forward(!1)
        }), n.go(1), !0)
      }, m.go = function (a, b) {
        var c;
        if (a > 0) for (c = 1; c <= a; ++c) m.forward(b);
         else {
          if (!(a < 0)) throw new Error('History.go: History.go requires a positive or negative integer passed.');
          for (c = - 1; c >= a; --c) m.back(b)
        }
        return m
      }, m.emulated.pushState) {
        var p = function () {
        };
        m.pushState = m.pushState || p,
        m.replaceState = m.replaceState || p
      } else m.onPopState = function (b, c) {
        var d,
        e,
        f = !1,
        g = !1;
        return m.doubleCheckComplete(),
        d = m.getHash(),
        d ? (e = m.extractState(d || m.getLocationHref(), !0), e ? m.replaceState(e.data, e.title, e.url, !1) : (m.Adapter.trigger(a, 'anchorchange'), m.busy(!1)), m.expectedStateId = !1, !1) : (f = m.Adapter.extractEventData('state', b, c) || !1, g = f ? m.getStateById(f) : m.expectedStateId ? m.getStateById(m.expectedStateId) : m.extractState(m.getLocationHref()), g || (g = m.createStateObject(null, null, m.getLocationHref())), m.expectedStateId = !1, m.isLastSavedState(g) ? (m.busy(!1), !1) : (m.storeState(g), m.saveState(g), m.setTitle(g), m.Adapter.trigger(a, 'statechange'), m.busy(!1), !0))
      },
      m.Adapter.bind(a, 'popstate', m.onPopState),
      m.pushState = function (b, c, d, e) {
        if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
        if (!1 !== e && m.busy()) return m.pushQueue({
          scope: m,
          callback: m.pushState,
          args: arguments,
          queue: e
        }),
        !1;
        m.busy(!0);
        var f = m.createStateObject(b, c, d);
        return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.pushState(f.id, f.title, f.url), m.Adapter.trigger(a, 'popstate')),
        !0
      },
      m.replaceState = function (b, c, d, e) {
        if (m.getHashByUrl(d) && m.emulated.pushState) throw new Error('History.js does not support states with fragement-identifiers (hashes/anchors).');
        if (!1 !== e && m.busy()) return m.pushQueue({
          scope: m,
          callback: m.replaceState,
          args: arguments,
          queue: e
        }),
        !1;
        m.busy(!0);
        var f = m.createStateObject(b, c, d);
        return m.isLastSavedState(f) ? m.busy(!1) : (m.storeState(f), m.expectedStateId = f.id, n.replaceState(f.id, f.title, f.url), m.Adapter.trigger(a, 'popstate')),
        !0
      };
      if (f) {
        try {
          m.store = k.parse(f.getItem('History.store')) || {
          }
        } catch (q) {
          m.store = {
          }
        }
        m.normalizeStore()
      } else m.store = {
      },
      m.normalizeStore();
      m.Adapter.bind(a, 'unload', m.clearAllIntervals),
      m.saveState(m.storeState(m.extractState(m.getLocationHref(), !0))),
      f && (m.onUnload = function () {
        var a,
        b,
        c;
        try {
          a = k.parse(f.getItem('History.store')) || {
          }
        } catch (d) {
          a = {
          }
        }
        a.idToState = a.idToState || {
        },
        a.urlToId = a.urlToId || {
        },
        a.stateToId = a.stateToId || {
        };
        for (b in m.idToState) m.idToState.hasOwnProperty(b) && (a.idToState[b] = m.idToState[b]);
        for (b in m.urlToId) m.urlToId.hasOwnProperty(b) && (a.urlToId[b] = m.urlToId[b]);
        for (b in m.stateToId) m.stateToId.hasOwnProperty(b) && (a.stateToId[b] = m.stateToId[b]);
        m.store = a,
        m.normalizeStore(),
        c = k.stringify(a);
        try {
          f.setItem('History.store', c)
        } catch (e) {
          if (e.code !== DOMException.QUOTA_EXCEEDED_ERR) throw e;
          f.length && (f.removeItem('History.store'), f.setItem('History.store', c))
        }
      }, m.intervalList.push(i(m.onUnload, m.options.storeInterval)), m.Adapter.bind(a, 'beforeunload', m.onUnload), m.Adapter.bind(a, 'unload', m.onUnload)),
      m.emulated.pushState || (m.bugs.safariPoll && m.intervalList.push(i(m.safariStatePoll, m.options.safariPollInterval)), 'Apple Computer, Inc.' !== e.vendor && 'Mozilla' !== (e.appCodeName || '') || (m.Adapter.bind(a, 'hashchange', function () {
        m.Adapter.trigger(a, 'popstate')
      }), m.getHash() && m.Adapter.onDomLoad(function () {
        m.Adapter.trigger(a, 'hashchange')
      })))
    },
    (!m.options || !m.options.delayInit) && m.init()
  }(window),
  function (a) {
    function b() {
    }
    function c(a) {
      function c(b) {
        b.prototype.option || (b.prototype.option = function (b) {
          a.isPlainObject(b) && (this.options = a.extend(!0, this.options, b))
        })
      }
      function e(b, c) {
        a.fn[b] = function (e) {
          if ('string' == typeof e) {
            for (var g = d.call(arguments, 1), h = 0, i = this.length; i > h; h++) {
              var j = this[h],
              k = a.data(j, b);
              if (k) if (a.isFunction(k[e]) && '_' !== e.charAt(0)) {
                var l = k[e].apply(k, g);
                if (void 0 !== l) return l
              } else f('no such method \'' + e + '\' for ' + b + ' instance');
               else f('cannot call methods on ' + b + ' prior to initialization; attempted to call \'' + e + '\'')
            }
            return this
          }
          return this.each(function () {
            var d = a.data(this, b);
            d ? (d.option(e), d._init()) : (d = new c(this, e), a.data(this, b, d))
          })
        }
      }
      if (a) {
        var f = 'undefined' == typeof console ? b : function (a) {
          console.error(a)
        };
        return a.bridget = function (a, b) {
          c(b),
          e(a, b)
        },
        a.bridget
      }
    }
    var d = Array.prototype.slice;
    'function' == typeof define && define.amd ? define('jquery-bridget/jquery.bridget', [
      'jquery'
    ], c) : c('object' == typeof exports ? require('jquery') : a.jQuery)
  }(window),
  function (a) {
    function b(b) {
      var c = a.event;
      return c.target = c.target || c.srcElement || b,
      c
    }
    var c = document.documentElement,
    d = function () {
    };
    c.addEventListener ? d = function (a, b, c) {
      a.addEventListener(b, c, !1)
    }
     : c.attachEvent && (d = function (a, c, d) {
      a[c + d] = d.handleEvent ? function () {
        var c = b(a);
        d.handleEvent.call(d, c)
      }
       : function () {
        var c = b(a);
        d.call(a, c)
      },
      a.attachEvent('on' + c, a[c + d])
    });
    var e = function () {
    };
    c.removeEventListener ? e = function (a, b, c) {
      a.removeEventListener(b, c, !1)
    }
     : c.detachEvent && (e = function (a, b, c) {
      a.detachEvent('on' + b, a[b + c]);
      try {
        delete a[b + c]
      } catch (d) {
        a[b + c] = void 0
      }
    });
    var f = {
      bind: d,
      unbind: e
    };
    'function' == typeof define && define.amd ? define('eventie/eventie', f) : 'object' == typeof exports ? module.exports = f : a.eventie = f
  }(window),
  function () {
    'use strict';
    function a() {
    }
    function b(a, b) {
      for (var c = a.length; c--; ) if (a[c].listener === b) return c;
      return - 1
    }
    function c(a) {
      return function () {
        return this[a].apply(this, arguments)
      }
    }
    var d = a.prototype,
    e = this,
    f = e.EventEmitter;
    d.getListeners = function (a) {
      var b,
      c,
      d = this._getEvents();
      if (a instanceof RegExp) {
        b = {
        };
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
      } else b = d[a] || (d[a] = [
      ]);
      return b
    },
    d.flattenListeners = function (a) {
      var b,
      c = [
      ];
      for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
      return c
    },
    d.getListenersAsObject = function (a) {
      var b,
      c = this.getListeners(a);
      return c instanceof Array && (b = {
      }, b[a] = c),
      b || c
    },
    d.addListener = function (a, c) {
      var d,
      e = this.getListenersAsObject(a),
      f = 'object' == typeof c;
      for (d in e) e.hasOwnProperty(d) && - 1 === b(e[d], c) && e[d].push(f ? c : {
        listener: c,
        once: !1
      });
      return this
    },
    d.on = c('addListener'),
    d.addOnceListener = function (a, b) {
      return this.addListener(a, {
        listener: b,
        once: !0
      })
    },
    d.once = c('addOnceListener'),
    d.defineEvent = function (a) {
      return this.getListeners(a),
      this
    },
    d.defineEvents = function (a) {
      for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
      return this
    },
    d.removeListener = function (a, c) {
      var d,
      e,
      f = this.getListenersAsObject(a);
      for (e in f) f.hasOwnProperty(e) && - 1 !== (d = b(f[e], c)) && f[e].splice(d, 1);
      return this
    },
    d.off = c('removeListener'),
    d.addListeners = function (a, b) {
      return this.manipulateListeners(!1, a, b)
    },
    d.removeListeners = function (a, b) {
      return this.manipulateListeners(!0, a, b)
    },
    d.manipulateListeners = function (a, b, c) {
      var d,
      e,
      f = a ? this.removeListener : this.addListener,
      g = a ? this.removeListeners : this.addListeners;
      if ('object' != typeof b || b instanceof RegExp) for (d = c.length; d--; ) f.call(this, b, c[d]);
       else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ('function' == typeof e ? f.call(this, d, e) : g.call(this, d, e));
      return this
    },
    d.removeEvent = function (a) {
      var b,
      c = typeof a,
      d = this._getEvents();
      if ('string' === c) delete d[a];
       else if (a instanceof RegExp) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
       else delete this._events;
      return this
    },
    d.removeAllListeners = c('removeEvent'),
    d.emitEvent = function (a, b) {
      var c,
      d,
      e,
      f = this.getListenersAsObject(a);
      for (e in f) if (f.hasOwnProperty(e)) for (d = f[e].length; d--; ) c = f[e][d],
      !0 === c.once && this.removeListener(a, c.listener),
      c.listener.apply(this, b || [
      ]) === this._getOnceReturnValue() && this.removeListener(a, c.listener);
      return this
    },
    d.trigger = c('emitEvent'),
    d.emit = function (a) {
      var b = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(a, b)
    },
    d.setOnceReturnValue = function (a) {
      return this._onceReturnValue = a,
      this
    },
    d._getOnceReturnValue = function () {
      return !this.hasOwnProperty('_onceReturnValue') || this._onceReturnValue
    },
    d._getEvents = function () {
      return this._events || (this._events = {
      })
    },
    a.noConflict = function () {
      return e.EventEmitter = f,
      a
    },
    'function' == typeof define && define.amd ? define('eventEmitter/EventEmitter', [
    ], function () {
      return a
    }) : 'object' == typeof module && module.exports ? module.exports = a : e.EventEmitter = a
  }.call(this),
  function (a) {
    function b(a) {
      if (a) {
        if ('string' == typeof d[a]) return a;
        a = a.charAt(0).toUpperCase() + a.slice(1);
        for (var b, e = 0, f = c.length; f > e; e++) if (b = c[e] + a, 'string' == typeof d[b]) return b
      }
    }
    var c = 'Webkit Moz ms Ms O'.split(' '),
    d = document.documentElement.style;
    'function' == typeof define && define.amd ? define('get-style-property/get-style-property', [
    ], function () {
      return b
    }) : 'object' == typeof exports ? module.exports = b : a.getStyleProperty = b
  }(window),
  function (a, b) {
    function c(a) {
      var b = parseFloat(a);
      return - 1 === a.indexOf('%') && !isNaN(b) && b
    }
    function d() {
    }
    function e() {
      for (var a = {
        width: 0,
        height: 0,
        innerWidth: 0,
        innerHeight: 0,
        outerWidth: 0,
        outerHeight: 0
      }, b = 0, c = h.length; c > b; b++) {
        a[h[b]] = 0
      }
      return a
    }
    function f(b) {
      function d() {
        if (!m) {
          m = !0;
          var d = a.getComputedStyle;
          if (j = function () {
            var a = d ? function (a) {
              return d(a, null)
            }
             : function (a) {
              return a.currentStyle
            };
            return function (b) {
              var c = a(b);
              return c || g('Style returned ' + c + '. Are you running this code in a hidden iframe on Firefox? See http://bit.ly/getsizebug1'),
              c
            }
          }(), k = b('boxSizing')) {
            var e = document.createElement('div');
            e.style.width = '200px',
            e.style.padding = '1px 2px 3px 4px',
            e.style.borderStyle = 'solid',
            e.style.borderWidth = '1px 2px 3px 4px',
            e.style[k] = 'border-box';
            var f = document.body || document.documentElement;
            f.appendChild(e);
            var h = j(e);
            l = 200 === c(h.width),
            f.removeChild(e)
          }
        }
      }
      function f(a) {
        if (d(), 'string' == typeof a && (a = document.querySelector(a)), a && 'object' == typeof a && a.nodeType) {
          var b = j(a);
          if ('none' === b.display) return e();
          var f = {
          };
          f.width = a.offsetWidth,
          f.height = a.offsetHeight;
          for (var g = f.isBorderBox = !(!k || !b[k] || 'border-box' !== b[k]), m = 0, n = h.length; n > m; m++) {
            var o = h[m],
            p = b[o];
            p = i(a, p);
            var q = parseFloat(p);
            f[o] = isNaN(q) ? 0 : q
          }
          var r = f.paddingLeft + f.paddingRight,
          s = f.paddingTop + f.paddingBottom,
          t = f.marginLeft + f.marginRight,
          u = f.marginTop + f.marginBottom,
          v = f.borderLeftWidth + f.borderRightWidth,
          w = f.borderTopWidth + f.borderBottomWidth,
          x = g && l,
          y = c(b.width);
          !1 !== y && (f.width = y + (x ? 0 : r + v));
          var z = c(b.height);
          return !1 !== z && (f.height = z + (x ? 0 : s + w)),
          f.innerWidth = f.width - (r + v),
          f.innerHeight = f.height - (s + w),
          f.outerWidth = f.width + t,
          f.outerHeight = f.height + u,
          f
        }
      }
      function i(b, c) {
        if (a.getComputedStyle || - 1 === c.indexOf('%')) return c;
        var d = b.style,
        e = d.left,
        f = b.runtimeStyle,
        g = f && f.left;
        return g && (f.left = b.currentStyle.left),
        d.left = c,
        c = d.pixelLeft,
        d.left = e,
        g && (f.left = g),
        c
      }
      var j,
      k,
      l,
      m = !1;
      return f
    }
    var g = 'undefined' == typeof console ? d : function (a) {
      console.error(a)
    },
    h = [
      'paddingLeft',
      'paddingRight',
      'paddingTop',
      'paddingBottom',
      'marginLeft',
      'marginRight',
      'marginTop',
      'marginBottom',
      'borderLeftWidth',
      'borderRightWidth',
      'borderTopWidth',
      'borderBottomWidth'
    ];
    'function' == typeof define && define.amd ? define('get-size/get-size', [
      'get-style-property/get-style-property'
    ], f) : 'object' == typeof exports ? module.exports = f(require('desandro-get-style-property')) : a.getSize = f(a.getStyleProperty)
  }(window),
  function (a) {
    function b(a) {
      'function' == typeof a && (b.isReady ? a() : g.push(a))
    }
    function c(a) {
      var c = 'readystatechange' === a.type && 'complete' !== f.readyState;
      b.isReady || c || d()
    }
    function d() {
      b.isReady = !0;
      for (var a = 0, c = g.length; c > a; a++) {
        (0, g[a]) ()
      }
    }
    function e(e) {
      return 'complete' === f.readyState ? d() : (e.bind(f, 'DOMContentLoaded', c), e.bind(f, 'readystatechange', c), e.bind(a, 'load', c)),
      b
    }
    var f = a.document,
    g = [
    ];
    b.isReady = !1,
    'function' == typeof define && define.amd ? define('doc-ready/doc-ready', [
      'eventie/eventie'
    ], e) : 'object' == typeof exports ? module.exports = e(require('eventie')) : a.docReady = e(a.eventie)
  }(window),
  function (a) {
    'use strict';
    function b(a, b) {
      return a[g](b)
    }
    function c(a) {
      if (!a.parentNode) {
        document.createDocumentFragment().appendChild(a)
      }
    }
    function d(a, b) {
      c(a);
      for (var d = a.parentNode.querySelectorAll(b), e = 0, f = d.length; f > e; e++) if (d[e] === a) return !0;
      return !1
    }
    function e(a, d) {
      return c(a),
      b(a, d)
    }
    var f,
    g = function () {
      if (a.matches) return 'matches';
      if (a.matchesSelector) return 'matchesSelector';
      for (var b = [
        'webkit',
        'moz',
        'ms',
        'o'
      ], c = 0, d = b.length; d > c; c++) {
        var e = b[c],
        f = e + 'MatchesSelector';
        if (a[f]) return f
      }
    }();
    if (g) {
      var h = document.createElement('div'),
      i = b(h, 'div');
      f = i ? b : e
    } else f = d;
    'function' == typeof define && define.amd ? define('matches-selector/matches-selector', [
    ], function () {
      return f
    }) : 'object' == typeof exports ? module.exports = f : window.matchesSelector = f
  }(Element.prototype),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('fizzy-ui-utils/utils', [
      'doc-ready/doc-ready',
      'matches-selector/matches-selector'
    ], function (c, d) {
      return b(a, c, d)
    }) : 'object' == typeof exports ? module.exports = b(a, require('doc-ready'), require('desandro-matches-selector')) : a.fizzyUIUtils = b(a, a.docReady, a.matchesSelector)
  }(window, function (a, b, c) {
    var d = {
    };
    d.extend = function (a, b) {
      for (var c in b) a[c] = b[c];
      return a
    },
    d.modulo = function (a, b) {
      return (a % b + b) % b
    };
    var e = Object.prototype.toString;
    d.isArray = function (a) {
      return '[object Array]' == e.call(a)
    },
    d.makeArray = function (a) {
      var b = [
      ];
      if (d.isArray(a)) b = a;
       else if (a && 'number' == typeof a.length) for (var c = 0, e = a.length; e > c; c++) b.push(a[c]);
       else b.push(a);
      return b
    },
    d.indexOf = Array.prototype.indexOf ? function (a, b) {
      return a.indexOf(b)
    }
     : function (a, b) {
      for (var c = 0, d = a.length; d > c; c++) if (a[c] === b) return c;
      return - 1
    },
    d.removeFrom = function (a, b) {
      var c = d.indexOf(a, b);
      - 1 != c && a.splice(c, 1)
    },
    d.isElement = 'function' == typeof HTMLElement || 'object' == typeof HTMLElement ? function (a) {
      return a instanceof HTMLElement
    }
     : function (a) {
      return a && 'object' == typeof a && 1 == a.nodeType && 'string' == typeof a.nodeName
    },
    d.setText = function () {
      function a(a, c) {
        b = b || (void 0 !== document.documentElement.textContent ? 'textContent' : 'innerText'),
        a[b] = c
      }
      var b;
      return a
    }(),
    d.getParent = function (a, b) {
      for (; a != document.body; ) if (a = a.parentNode, c(a, b)) return a
    },
    d.getQueryElement = function (a) {
      return 'string' == typeof a ? document.querySelector(a) : a
    },
    d.handleEvent = function (a) {
      var b = 'on' + a.type;
      this[b] && this[b](a)
    },
    d.filterFindElements = function (a, b) {
      a = d.makeArray(a);
      for (var e = [
      ], f = 0, g = a.length; g > f; f++) {
        var h = a[f];
        if (d.isElement(h)) if (b) {
          c(h, b) && e.push(h);
          for (var i = h.querySelectorAll(b), j = 0, k = i.length; k > j; j++) e.push(i[j])
        } else e.push(h)
      }
      return e
    },
    d.debounceMethod = function (a, b, c) {
      var d = a.prototype[b],
      e = b + 'Timeout';
      a.prototype[b] = function () {
        var a = this[e];
        a && clearTimeout(a);
        var b = arguments,
        f = this;
        this[e] = setTimeout(function () {
          d.apply(f, b),
          delete f[e]
        }, c || 100)
      }
    },
    d.toDashed = function (a) {
      return a.replace(/(.)([A-Z])/g, function (a, b, c) {
        return b + '-' + c
      }).toLowerCase()
    };
    var f = a.console;
    return d.htmlInit = function (c, e) {
      b(function () {
        for (var b = d.toDashed(e), g = document.querySelectorAll('.js-' + b), h = 'data-' + b + '-options', i = 0, j = g.length; j > i; i++) {
          var k,
          l = g[i],
          m = l.getAttribute(h);
          try {
            k = m && JSON.parse(m)
          } catch (p) {
            f && f.error('Error parsing ' + h + ' on ' + l.nodeName.toLowerCase() + (l.id ? '#' + l.id : '') + ': ' + p);
            continue
          }
          var n = new c(l, k),
          o = a.jQuery;
          o && o.data(l, e, n)
        }
      })
    },
    d
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('outlayer/item', [
      'eventEmitter/EventEmitter',
      'get-size/get-size',
      'get-style-property/get-style-property',
      'fizzy-ui-utils/utils'
    ], function (c, d, e, f) {
      return b(a, c, d, e, f)
    }) : 'object' == typeof exports ? module.exports = b(a, require('wolfy87-eventemitter'), require('get-size'), require('desandro-get-style-property'), require('fizzy-ui-utils')) : (a.Outlayer = {
    }, a.Outlayer.Item = b(a, a.EventEmitter, a.getSize, a.getStyleProperty, a.fizzyUIUtils))
  }(window, function (a, b, c, d, e) {
    'use strict';
    function f(a) {
      for (var b in a) return !1;
      return null,
      !0
    }
    function g(a, b) {
      a && (this.element = a, this.layout = b, this.position = {
        x: 0,
        y: 0
      }, this._create())
    }
    function h(a) {
      return a.replace(/([A-Z])/g, function (a) {
        return '-' + a.toLowerCase()
      })
    }
    var i = a.getComputedStyle,
    j = i ? function (a) {
      return i(a, null)
    }
     : function (a) {
      return a.currentStyle
    },
    k = d('transition'),
    l = d('transform'),
    m = k && l,
    n = !!d('perspective'),
    o = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'otransitionend',
      transition: 'transitionend'
    }
    [
      k
    ],
    p = [
      'transform',
      'transition',
      'transitionDuration',
      'transitionProperty'
    ],
    q = function () {
      for (var a = {
      }, b = 0, c = p.length; c > b; b++) {
        var e = p[b],
        f = d(e);
        f && f !== e && (a[e] = f)
      }
      return a
    }();
    e.extend(g.prototype, b.prototype),
    g.prototype._create = function () {
      this._transn = {
        ingProperties: {
        },
        clean: {
        },
        onEnd: {
        }
      },
      this.css({
        position: 'absolute'
      })
    },
    g.prototype.handleEvent = function (a) {
      var b = 'on' + a.type;
      this[b] && this[b](a)
    },
    g.prototype.getSize = function () {
      this.size = c(this.element)
    },
    g.prototype.css = function (a) {
      var b = this.element.style;
      for (var c in a) {
        b[q[c] || c] = a[c]
      }
    },
    g.prototype.getPosition = function () {
      var a = j(this.element),
      b = this.layout.options,
      c = b.isOriginLeft,
      d = b.isOriginTop,
      e = a[c ? 'left' : 'right'],
      f = a[d ? 'top' : 'bottom'],
      g = this.layout.size,
      h = - 1 != e.indexOf('%') ? parseFloat(e) / 100 * g.width : parseInt(e, 10),
      i = - 1 != f.indexOf('%') ? parseFloat(f) / 100 * g.height : parseInt(f, 10);
      h = isNaN(h) ? 0 : h,
      i = isNaN(i) ? 0 : i,
      h -= c ? g.paddingLeft : g.paddingRight,
      i -= d ? g.paddingTop : g.paddingBottom,
      this.position.x = h,
      this.position.y = i
    },
    g.prototype.layoutPosition = function () {
      var a = this.layout.size,
      b = this.layout.options,
      c = {
      },
      d = b.isOriginLeft ? 'paddingLeft' : 'paddingRight',
      e = b.isOriginLeft ? 'left' : 'right',
      f = b.isOriginLeft ? 'right' : 'left',
      g = this.position.x + a[d];
      c[e] = this.getXValue(g),
      c[f] = '';
      var h = b.isOriginTop ? 'paddingTop' : 'paddingBottom',
      i = b.isOriginTop ? 'top' : 'bottom',
      j = b.isOriginTop ? 'bottom' : 'top',
      k = this.position.y + a[h];
      c[i] = this.getYValue(k),
      c[j] = '',
      this.css(c),
      this.emitEvent('layout', [
        this
      ])
    },
    g.prototype.getXValue = function (a) {
      var b = this.layout.options;
      return b.percentPosition && !b.isHorizontal ? a / this.layout.size.width * 100 + '%' : a + 'px'
    },
    g.prototype.getYValue = function (a) {
      var b = this.layout.options;
      return b.percentPosition && b.isHorizontal ? a / this.layout.size.height * 100 + '%' : a + 'px'
    },
    g.prototype._transitionTo = function (a, b) {
      this.getPosition();
      var c = this.position.x,
      d = this.position.y,
      e = parseInt(a, 10),
      f = parseInt(b, 10),
      g = e === this.position.x && f === this.position.y;
      if (this.setPosition(a, b), g && !this.isTransitioning) return void this.layoutPosition();
      var h = a - c,
      i = b - d,
      j = {
      };
      j.transform = this.getTranslate(h, i),
      this.transition({
        to: j,
        onTransitionEnd: {
          transform: this.layoutPosition
        },
        isCleaning: !0
      })
    },
    g.prototype.getTranslate = function (a, b) {
      var c = this.layout.options;
      return a = c.isOriginLeft ? a : - a,
      b = c.isOriginTop ? b : - b,
      n ? 'translate3d(' + a + 'px, ' + b + 'px, 0)' : 'translate(' + a + 'px, ' + b + 'px)'
    },
    g.prototype.goTo = function (a, b) {
      this.setPosition(a, b),
      this.layoutPosition()
    },
    g.prototype.moveTo = m ? g.prototype._transitionTo : g.prototype.goTo,
    g.prototype.setPosition = function (a, b) {
      this.position.x = parseInt(a, 10),
      this.position.y = parseInt(b, 10)
    },
    g.prototype._nonTransition = function (a) {
      this.css(a.to),
      a.isCleaning && this._removeStyles(a.to);
      for (var b in a.onTransitionEnd) a.onTransitionEnd[b].call(this)
    },
    g.prototype._transition = function (a) {
      if (!parseFloat(this.layout.options.transitionDuration)) return void this._nonTransition(a);
      var b = this._transn;
      for (var c in a.onTransitionEnd) b.onEnd[c] = a.onTransitionEnd[c];
      for (c in a.to) b.ingProperties[c] = !0,
      a.isCleaning && (b.clean[c] = !0);
      if (a.from) {
        this.css(a.from);
        this.element.offsetHeight;
        null
      }
      this.enableTransition(a.to),
      this.css(a.to),
      this.isTransitioning = !0
    };
    var r = 'opacity,' + h(q.transform || 'transform');
    g.prototype.enableTransition = function () {
      this.isTransitioning || (this.css({
        transitionProperty: r,
        transitionDuration: this.layout.options.transitionDuration
      }), this.element.addEventListener(o, this, !1))
    },
    g.prototype.transition = g.prototype[k ? '_transition' : '_nonTransition'],
    g.prototype.onwebkitTransitionEnd = function (a) {
      this.ontransitionend(a)
    },
    g.prototype.onotransitionend = function (a) {
      this.ontransitionend(a)
    };
    var s = {
      '-webkit-transform': 'transform',
      '-moz-transform': 'transform',
      '-o-transform': 'transform'
    };
    g.prototype.ontransitionend = function (a) {
      if (a.target === this.element) {
        var b = this._transn,
        c = s[a.propertyName] || a.propertyName;
        if (delete b.ingProperties[c], f(b.ingProperties) && this.disableTransition(), c in b.clean && (this.element.style[a.propertyName] = '', delete b.clean[c]), c in b.onEnd) {
          b.onEnd[c].call(this),
          delete b.onEnd[c]
        }
        this.emitEvent('transitionEnd', [
          this
        ])
      }
    },
    g.prototype.disableTransition = function () {
      this.removeTransitionStyles(),
      this.element.removeEventListener(o, this, !1),
      this.isTransitioning = !1
    },
    g.prototype._removeStyles = function (a) {
      var b = {
      };
      for (var c in a) b[c] = '';
      this.css(b)
    };
    var t = {
      transitionProperty: '',
      transitionDuration: ''
    };
    return g.prototype.removeTransitionStyles = function () {
      this.css(t)
    },
    g.prototype.removeElem = function () {
      this.element.parentNode.removeChild(this.element),
      this.css({
        display: ''
      }),
      this.emitEvent('remove', [
        this
      ])
    },
    g.prototype.remove = function () {
      if (!k || !parseFloat(this.layout.options.transitionDuration)) return void this.removeElem();
      var a = this;
      this.once('transitionEnd', function () {
        a.removeElem()
      }),
      this.hide()
    },
    g.prototype.reveal = function () {
      delete this.isHidden,
      this.css({
        display: ''
      });
      var a = this.layout.options,
      b = {
      };
      b[this.getHideRevealTransitionEndProperty('visibleStyle')] = this.onRevealTransitionEnd,
      this.transition({
        from: a.hiddenStyle,
        to: a.visibleStyle,
        isCleaning: !0,
        onTransitionEnd: b
      })
    },
    g.prototype.onRevealTransitionEnd = function () {
      this.isHidden || this.emitEvent('reveal')
    },
    g.prototype.getHideRevealTransitionEndProperty = function (a) {
      var b = this.layout.options[a];
      if (b.opacity) return 'opacity';
      for (var c in b) return c
    },
    g.prototype.hide = function () {
      this.isHidden = !0,
      this.css({
        display: ''
      });
      var a = this.layout.options,
      b = {
      };
      b[this.getHideRevealTransitionEndProperty('hiddenStyle')] = this.onHideTransitionEnd,
      this.transition({
        from: a.visibleStyle,
        to: a.hiddenStyle,
        isCleaning: !0,
        onTransitionEnd: b
      })
    },
    g.prototype.onHideTransitionEnd = function () {
      this.isHidden && (this.css({
        display: 'none'
      }), this.emitEvent('hide'))
    },
    g.prototype.destroy = function () {
      this.css({
        position: '',
        left: '',
        right: '',
        top: '',
        bottom: '',
        transition: '',
        transform: ''
      })
    },
    g
  }),
  function (a, b) {
    'use strict'
    ;
    'function' == typeof define && define.amd ? define('outlayer/outlayer', [
      'eventie/eventie',
      'eventEmitter/EventEmitter',
      'get-size/get-size',
      'fizzy-ui-utils/utils',
      './item'
    ], function (c, d, e, f, g) {
      return b(a, c, d, e, f, g)
    }) : 'object' == typeof exports ? module.exports = b(a, require('eventie'), require('wolfy87-eventemitter'), require('get-size'), require('fizzy-ui-utils'), require('./item')) : a.Outlayer = b(a, a.eventie, a.EventEmitter, a.getSize, a.fizzyUIUtils, a.Outlayer.Item)
  }(window, function (a, b, c, d, e, f) {
    'use strict';
    function g(a, b) {
      var c = e.getQueryElement(a);
      if (!c) return void (h && h.error('Bad element for ' + this.constructor.namespace + ': ' + (c || a)));
      this.element = c,
      i && (this.$element = i(this.element)),
      this.options = e.extend({
      }, this.constructor.defaults),
      this.option(b);
      var d = ++k;
      this.element.outlayerGUID = d,
      l[d] = this,
      this._create(),
      this.options.isInitLayout && this.layout()
    }
    var h = a.console,
    i = a.jQuery,
    j = function () {
    },
    k = 0,
    l = {
    };
    return g.namespace = 'outlayer',
    g.Item = f,
    g.defaults = {
      containerStyle: {
        position: 'relative'
      },
      isInitLayout: !0,
      isOriginLeft: !0,
      isOriginTop: !0,
      isResizeBound: !0,
      isResizingContainer: !0,
      transitionDuration: '0.4s',
      hiddenStyle: {
        opacity: 0,
        transform: 'scale(0.001)'
      },
      visibleStyle: {
        opacity: 1,
        transform: 'scale(1)'
      }
    },
    e.extend(g.prototype, c.prototype),
    g.prototype.option = function (a) {
      e.extend(this.options, a)
    },
    g.prototype._create = function () {
      this.reloadItems(),
      this.stamps = [
      ],
      this.stamp(this.options.stamp),
      e.extend(this.element.style, this.options.containerStyle),
      this.options.isResizeBound && this.bindResize()
    },
    g.prototype.reloadItems = function () {
      this.items = this._itemize(this.element.children)
    },
    g.prototype._itemize = function (a) {
      for (var b = this._filterFindItemElements(a), c = this.constructor.Item, d = [
      ], e = 0, f = b.length; f > e; e++) {
        var g = b[e],
        h = new c(g, this);
        d.push(h)
      }
      return d
    },
    g.prototype._filterFindItemElements = function (a) {
      return e.filterFindElements(a, this.options.itemSelector)
    },
    g.prototype.getItemElements = function () {
      for (var a = [
      ], b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].element);
      return a
    },
    g.prototype.layout = function () {
      this._resetLayout(),
      this._manageStamps();
      var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      this.layoutItems(this.items, a),
      this._isLayoutInited = !0
    },
    g.prototype._init = g.prototype.layout,
    g.prototype._resetLayout = function () {
      this.getSize()
    },
    g.prototype.getSize = function () {
      this.size = d(this.element)
    },
    g.prototype._getMeasurement = function (a, b) {
      var c,
      f = this.options[a];
      f ? ('string' == typeof f ? c = this.element.querySelector(f) : e.isElement(f) && (c = f), this[a] = c ? d(c) [b] : f) : this[a] = 0
    },
    g.prototype.layoutItems = function (a, b) {
      a = this._getItemsForLayout(a),
      this._layoutItems(a, b),
      this._postLayout()
    },
    g.prototype._getItemsForLayout = function (a) {
      for (var b = [
      ], c = 0, d = a.length; d > c; c++) {
        var e = a[c];
        e.isIgnored || b.push(e)
      }
      return b
    },
    g.prototype._layoutItems = function (a, b) {
      if (this._emitCompleteOnItems('layout', a), a && a.length) {
        for (var c = [
        ], d = 0, e = a.length; e > d; d++) {
          var f = a[d],
          g = this._getItemLayoutPosition(f);
          g.item = f,
          g.isInstant = b || f.isLayoutInstant,
          c.push(g)
        }
        this._processLayoutQueue(c)
      }
    },
    g.prototype._getItemLayoutPosition = function () {
      return {
        x: 0,
        y: 0
      }
    },
    g.prototype._processLayoutQueue = function (a) {
      for (var b = 0, c = a.length; c > b; b++) {
        var d = a[b];
        this._positionItem(d.item, d.x, d.y, d.isInstant)
      }
    },
    g.prototype._positionItem = function (a, b, c, d) {
      d ? a.goTo(b, c) : a.moveTo(b, c)
    },
    g.prototype._postLayout = function () {
      this.resizeContainer()
    },
    g.prototype.resizeContainer = function () {
      if (this.options.isResizingContainer) {
        var a = this._getContainerSize();
        a && (this._setContainerMeasure(a.width, !0), this._setContainerMeasure(a.height, !1))
      }
    },
    g.prototype._getContainerSize = j,
    g.prototype._setContainerMeasure = function (a, b) {
      if (void 0 !== a) {
        var c = this.size;
        c.isBorderBox && (a += b ? c.paddingLeft + c.paddingRight + c.borderLeftWidth + c.borderRightWidth : c.paddingBottom + c.paddingTop + c.borderTopWidth + c.borderBottomWidth),
        a = Math.max(a, 0),
        this.element.style[b ? 'width' : 'height'] = a + 'px'
      }
    },
    g.prototype._emitCompleteOnItems = function (a, b) {
      function c() {
        e.dispatchEvent(a + 'Complete', null, [
          b
        ])
      }
      function d() {
        ++g === f && c()
      }
      var e = this,
      f = b.length;
      if (!b || !f) return void c();
      for (var g = 0, h = 0, i = b.length; i > h; h++) {
        b[h].once(a, d)
      }
    },
    g.prototype.dispatchEvent = function (a, b, c) {
      var d = b ? [
        b
      ].concat(c) : c;
      if (this.emitEvent(a, d), i) if (this.$element = this.$element || i(this.element), b) {
        var e = i.Event(b);
        e.type = a,
        this.$element.trigger(e, c)
      } else this.$element.trigger(a, c)
    },
    g.prototype.ignore = function (a) {
      var b = this.getItem(a);
      b && (b.isIgnored = !0)
    },
    g.prototype.unignore = function (a) {
      var b = this.getItem(a);
      b && delete b.isIgnored
    },
    g.prototype.stamp = function (a) {
      if (a = this._find(a)) {
        this.stamps = this.stamps.concat(a);
        for (var b = 0, c = a.length; c > b; b++) {
          var d = a[b];
          this.ignore(d)
        }
      }
    },
    g.prototype.unstamp = function (a) {
      if (a = this._find(a)) for (var b = 0, c = a.length; c > b; b++) {
        var d = a[b];
        e.removeFrom(this.stamps, d),
        this.unignore(d)
      }
    },
    g.prototype._find = function (a) {
      return a ? ('string' == typeof a && (a = this.element.querySelectorAll(a)), a = e.makeArray(a)) : void 0
    },
    g.prototype._manageStamps = function () {
      if (this.stamps && this.stamps.length) {
        this._getBoundingRect();
        for (var a = 0, b = this.stamps.length; b > a; a++) {
          var c = this.stamps[a];
          this._manageStamp(c)
        }
      }
    },
    g.prototype._getBoundingRect = function () {
      var a = this.element.getBoundingClientRect(),
      b = this.size;
      this._boundingRect = {
        left: a.left + b.paddingLeft + b.borderLeftWidth,
        top: a.top + b.paddingTop + b.borderTopWidth,
        right: a.right - (b.paddingRight + b.borderRightWidth),
        bottom: a.bottom - (b.paddingBottom + b.borderBottomWidth)
      }
    },
    g.prototype._manageStamp = j,
    g.prototype._getElementOffset = function (a) {
      var b = a.getBoundingClientRect(),
      c = this._boundingRect,
      e = d(a);
      return {
        left: b.left - c.left - e.marginLeft,
        top: b.top - c.top - e.marginTop,
        right: c.right - b.right - e.marginRight,
        bottom: c.bottom - b.bottom - e.marginBottom
      }
    },
    g.prototype.handleEvent = function (a) {
      var b = 'on' + a.type;
      this[b] && this[b](a)
    },
    g.prototype.bindResize = function () {
      this.isResizeBound || (b.bind(a, 'resize', this), this.isResizeBound = !0)
    },
    g.prototype.unbindResize = function () {
      this.isResizeBound && b.unbind(a, 'resize', this),
      this.isResizeBound = !1
    },
    g.prototype.onresize = function () {
      function a() {
        b.resize(),
        delete b.resizeTimeout
      }
      this.resizeTimeout && clearTimeout(this.resizeTimeout);
      var b = this;
      this.resizeTimeout = setTimeout(a, 100)
    },
    g.prototype.resize = function () {
      this.isResizeBound && this.needsResizeLayout() && this.layout()
    },
    g.prototype.needsResizeLayout = function () {
      var a = d(this.element);
      return this.size && a && a.innerWidth !== this.size.innerWidth
    },
    g.prototype.addItems = function (a) {
      var b = this._itemize(a);
      return b.length && (this.items = this.items.concat(b)),
      b
    },
    g.prototype.appended = function (a) {
      var b = this.addItems(a);
      b.length && (this.layoutItems(b, !0), this.reveal(b))
    },
    g.prototype.prepended = function (a) {
      var b = this._itemize(a);
      if (b.length) {
        var c = this.items.slice(0);
        this.items = b.concat(c),
        this._resetLayout(),
        this._manageStamps(),
        this.layoutItems(b, !0),
        this.reveal(b),
        this.layoutItems(c)
      }
    },
    g.prototype.reveal = function (a) {
      this._emitCompleteOnItems('reveal', a);
      for (var b = a && a.length, c = 0; b && b > c; c++) {
        a[c].reveal()
      }
    },
    g.prototype.hide = function (a) {
      this._emitCompleteOnItems('hide', a);
      for (var b = a && a.length, c = 0; b && b > c; c++) {
        a[c].hide()
      }
    },
    g.prototype.revealItemElements = function (a) {
      var b = this.getItems(a);
      this.reveal(b)
    },
    g.prototype.hideItemElements = function (a) {
      var b = this.getItems(a);
      this.hide(b)
    },
    g.prototype.getItem = function (a) {
      for (var b = 0, c = this.items.length; c > b; b++) {
        var d = this.items[b];
        if (d.element === a) return d
      }
    },
    g.prototype.getItems = function (a) {
      a = e.makeArray(a);
      for (var b = [
      ], c = 0, d = a.length; d > c; c++) {
        var f = a[c],
        g = this.getItem(f);
        g && b.push(g)
      }
      return b
    },
    g.prototype.remove = function (a) {
      var b = this.getItems(a);
      if (this._emitCompleteOnItems('remove', b), b && b.length) for (var c = 0, d = b.length; d > c; c++) {
        var f = b[c];
        f.remove(),
        e.removeFrom(this.items, f)
      }
    },
    g.prototype.destroy = function () {
      var a = this.element.style;
      a.height = '',
      a.position = '',
      a.width = '';
      for (var b = 0, c = this.items.length; c > b; b++) {
        this.items[b].destroy()
      }
      this.unbindResize();
      var d = this.element.outlayerGUID;
      delete l[d],
      delete this.element.outlayerGUID,
      i && i.removeData(this.element, this.constructor.namespace)
    },
    g.data = function (a) {
      a = e.getQueryElement(a);
      var b = a && a.outlayerGUID;
      return b && l[b]
    },
    g.create = function (a, b) {
      function c() {
        g.apply(this, arguments)
      }
      return Object.create ? c.prototype = Object.create(g.prototype) : e.extend(c.prototype, g.prototype),
      c.prototype.constructor = c,
      c.defaults = e.extend({
      }, g.defaults),
      e.extend(c.defaults, b),
      c.prototype.settings = {
      },
      c.namespace = a,
      c.data = g.data,
      c.Item = function () {
        f.apply(this, arguments)
      },
      c.Item.prototype = new f,
      e.htmlInit(c, a),
      i && i.bridget && i.bridget(a, c),
      c
    },
    g.Item = f,
    g
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('isotope/js/item', [
      'outlayer/outlayer'
    ], b) : 'object' == typeof exports ? module.exports = b(require('outlayer')) : (a.Isotope = a.Isotope || {
    }, a.Isotope.Item = b(a.Outlayer))
  }(window, function (a) {
    'use strict';
    function b() {
      a.Item.apply(this, arguments)
    }
    b.prototype = new a.Item,
    b.prototype._create = function () {
      this.id = this.layout.itemGUID++,
      a.Item.prototype._create.call(this),
      this.sortData = {
      }
    },
    b.prototype.updateSortData = function () {
      if (!this.isIgnored) {
        this.sortData.id = this.id,
        this.sortData['original-order'] = this.id,
        this.sortData.random = Math.random();
        var a = this.layout.options.getSortData,
        b = this.layout._sorters;
        for (var c in a) {
          var d = b[c];
          this.sortData[c] = d(this.element, this)
        }
      }
    };
    var c = b.prototype.destroy;
    return b.prototype.destroy = function () {
      c.apply(this, arguments),
      this.css({
        display: ''
      })
    },
    b
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('isotope/js/layout-mode', [
      'get-size/get-size',
      'outlayer/outlayer'
    ], b) : 'object' == typeof exports ? module.exports = b(require('get-size'), require('outlayer')) : (a.Isotope = a.Isotope || {
    }, a.Isotope.LayoutMode = b(a.getSize, a.Outlayer))
  }(window, function (a, b) {
    'use strict';
    function c(a) {
      this.isotope = a,
      a && (this.options = a.options[this.namespace], this.element = a.element, this.items = a.filteredItems, this.size = a.size)
    }
    return function () {
      function a(a) {
        return function () {
          return b.prototype[a].apply(this.isotope, arguments)
        }
      }
      for (var d = [
        '_resetLayout',
        '_getItemLayoutPosition',
        '_manageStamp',
        '_getContainerSize',
        '_getElementOffset',
        'needsResizeLayout'
      ], e = 0, f = d.length; f > e; e++) {
        var g = d[e];
        c.prototype[g] = a(g)
      }
    }(),
    c.prototype.needsVerticalResizeLayout = function () {
      var b = a(this.isotope.element);
      return this.isotope.size && b && b.innerHeight != this.isotope.size.innerHeight
    },
    c.prototype._getMeasurement = function () {
      this.isotope._getMeasurement.apply(this, arguments)
    },
    c.prototype.getColumnWidth = function () {
      this.getSegmentSize('column', 'Width')
    },
    c.prototype.getRowHeight = function () {
      this.getSegmentSize('row', 'Height')
    },
    c.prototype.getSegmentSize = function (a, b) {
      var c = a + b,
      d = 'outer' + b;
      if (this._getMeasurement(c, d), !this[c]) {
        var e = this.getFirstItemSize();
        this[c] = e && e[d] || this.isotope.size['inner' + b]
      }
    },
    c.prototype.getFirstItemSize = function () {
      var b = this.isotope.filteredItems[0];
      return b && b.element && a(b.element)
    },
    c.prototype.layout = function () {
      this.isotope.layout.apply(this.isotope, arguments)
    },
    c.prototype.getSize = function () {
      this.isotope.getSize(),
      this.size = this.isotope.size
    },
    c.modes = {
    },
    c.create = function (a, b) {
      function d() {
        c.apply(this, arguments)
      }
      return d.prototype = new c,
      b && (d.options = b),
      d.prototype.namespace = a,
      c.modes[a] = d,
      d
    },
    c
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('masonry/masonry', [
      'outlayer/outlayer',
      'get-size/get-size',
      'fizzy-ui-utils/utils'
    ], b) : 'object' == typeof exports ? module.exports = b(require('outlayer'), require('get-size'), require('fizzy-ui-utils')) : a.Masonry = b(a.Outlayer, a.getSize, a.fizzyUIUtils)
  }(window, function (a, b, c) {
    var d = a.create('masonry');
    return d.prototype._resetLayout = function () {
      this.getSize(),
      this._getMeasurement('columnWidth', 'outerWidth'),
      this._getMeasurement('gutter', 'outerWidth'),
      this.measureColumns();
      var a = this.cols;
      for (this.colYs = [
      ]; a--; ) this.colYs.push(0);
      this.maxY = 0
    },
    d.prototype.measureColumns = function () {
      if (this.getContainerWidth(), !this.columnWidth) {
        var a = this.items[0],
        c = a && a.element;
        this.columnWidth = c && b(c).outerWidth || this.containerWidth
      }
      var d = this.columnWidth += this.gutter,
      e = this.containerWidth + this.gutter,
      f = e / d,
      g = d - e % d,
      h = g && 1 > g ? 'round' : 'floor';
      f = Math[h](f),
      this.cols = Math.max(f, 1)
    },
    d.prototype.getContainerWidth = function () {
      var a = this.options.isFitWidth ? this.element.parentNode : this.element,
      c = b(a);
      this.containerWidth = c && c.innerWidth
    },
    d.prototype._getItemLayoutPosition = function (a) {
      a.getSize();
      var b = a.size.outerWidth % this.columnWidth,
      d = b && 1 > b ? 'round' : 'ceil',
      e = Math[d](a.size.outerWidth / this.columnWidth);
      e = Math.min(e, this.cols);
      for (var f = this._getColGroup(e), g = Math.min.apply(Math, f), h = c.indexOf(f, g), i = {
        x: this.columnWidth * h,
        y: g
      }, j = g + a.size.outerHeight, k = this.cols + 1 - f.length, l = 0; k > l; l++) this.colYs[h + l] = j;
      return i
    },
    d.prototype._getColGroup = function (a) {
      if (2 > a) return this.colYs;
      for (var b = [
      ], c = this.cols + 1 - a, d = 0; c > d; d++) {
        var e = this.colYs.slice(d, d + a);
        b[d] = Math.max.apply(Math, e)
      }
      return b
    },
    d.prototype._manageStamp = function (a) {
      var c = b(a),
      d = this._getElementOffset(a),
      e = this.options.isOriginLeft ? d.left : d.right,
      f = e + c.outerWidth,
      g = Math.floor(e / this.columnWidth);
      g = Math.max(0, g);
      var h = Math.floor(f / this.columnWidth);
      h -= f % this.columnWidth ? 0 : 1,
      h = Math.min(this.cols - 1, h);
      for (var i = (this.options.isOriginTop ? d.top : d.bottom) + c.outerHeight, j = g; h >= j; j++) this.colYs[j] = Math.max(i, this.colYs[j])
    },
    d.prototype._getContainerSize = function () {
      this.maxY = Math.max.apply(Math, this.colYs);
      var a = {
        height: this.maxY
      };
      return this.options.isFitWidth && (a.width = this._getContainerFitWidth()),
      a
    },
    d.prototype._getContainerFitWidth = function () {
      for (var a = 0, b = this.cols; --b && 0 === this.colYs[b]; ) a++;
      return (this.cols - a) * this.columnWidth - this.gutter
    },
    d.prototype.needsResizeLayout = function () {
      var a = this.containerWidth;
      return this.getContainerWidth(),
      a !== this.containerWidth
    },
    d
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('isotope/js/layout-modes/masonry', [
      '../layout-mode',
      'masonry/masonry'
    ], b) : 'object' == typeof exports ? module.exports = b(require('../layout-mode'), require('masonry-layout')) : b(a.Isotope.LayoutMode, a.Masonry)
  }(window, function (a, b) {
    'use strict';
    function c(a, b) {
      for (var c in b) a[c] = b[c];
      return a
    }
    var d = a.create('masonry'),
    e = d.prototype._getElementOffset,
    f = d.prototype.layout,
    g = d.prototype._getMeasurement;
    c(d.prototype, b.prototype),
    d.prototype._getElementOffset = e,
    d.prototype.layout = f,
    d.prototype._getMeasurement = g;
    var h = d.prototype.measureColumns;
    d.prototype.measureColumns = function () {
      this.items = this.isotope.filteredItems,
      h.call(this)
    };
    var i = d.prototype._manageStamp;
    return d.prototype._manageStamp = function () {
      this.options.isOriginLeft = this.isotope.options.isOriginLeft,
      this.options.isOriginTop = this.isotope.options.isOriginTop,
      i.apply(this, arguments)
    },
    d
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('isotope/js/layout-modes/fit-rows', [
      '../layout-mode'
    ], b) : 'object' == typeof exports ? module.exports = b(require('../layout-mode')) : b(a.Isotope.LayoutMode)
  }(window, function (a) {
    'use strict';
    var b = a.create('fitRows');
    return b.prototype._resetLayout = function () {
      this.x = 0,
      this.y = 0,
      this.maxY = 0,
      this._getMeasurement('gutter', 'outerWidth')
    },
    b.prototype._getItemLayoutPosition = function (a) {
      a.getSize();
      var b = a.size.outerWidth + this.gutter,
      c = this.isotope.size.innerWidth + this.gutter;
      0 !== this.x && b + this.x > c && (this.x = 0, this.y = this.maxY);
      var d = {
        x: this.x,
        y: this.y
      };
      return this.maxY = Math.max(this.maxY, this.y + a.size.outerHeight),
      this.x += b,
      d
    },
    b.prototype._getContainerSize = function () {
      return {
        height: this.maxY
      }
    },
    b
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define('isotope/js/layout-modes/vertical', [
      '../layout-mode'
    ], b) : 'object' == typeof exports ? module.exports = b(require('../layout-mode')) : b(a.Isotope.LayoutMode)
  }(window, function (a) {
    'use strict';
    var b = a.create('vertical', {
      horizontalAlignment: 0
    });
    return b.prototype._resetLayout = function () {
      this.y = 0
    },
    b.prototype._getItemLayoutPosition = function (a) {
      a.getSize();
      var b = (this.isotope.size.innerWidth - a.size.outerWidth) * this.options.horizontalAlignment,
      c = this.y;
      return this.y += a.size.outerHeight,
      {
        x: b,
        y: c
      }
    },
    b.prototype._getContainerSize = function () {
      return {
        height: this.y
      }
    },
    b
  }),
  function (a, b) {
    'use strict';
    'function' == typeof define && define.amd ? define(['outlayer/outlayer',
    'get-size/get-size',
    'matches-selector/matches-selector',
    'fizzy-ui-utils/utils',
    'isotope/js/item',
    'isotope/js/layout-mode',
    'isotope/js/layout-modes/masonry',
    'isotope/js/layout-modes/fit-rows',
    'isotope/js/layout-modes/vertical'], function (c, d, e, f, g, h) {
      return b(a, c, d, e, f, g, h)
    }) : 'object' == typeof exports ? module.exports = b(a, require('outlayer'), require('get-size'), require('desandro-matches-selector'), require('fizzy-ui-utils'), require('./item'), require('./layout-mode'), require('./layout-modes/masonry'), require('./layout-modes/fit-rows'), require('./layout-modes/vertical')) : a.Isotope = b(a, a.Outlayer, a.getSize, a.matchesSelector, a.fizzyUIUtils, a.Isotope.Item, a.Isotope.LayoutMode)
  }(window, function (a, b, c, d, e, f, g) {
    function h(a, b) {
      return function (c, d) {
        for (var e = 0, f = a.length; f > e; e++) {
          var g = a[e],
          h = c.sortData[g],
          i = d.sortData[g];
          if (h > i || i > h) {
            var j = void 0 !== b[g] ? b[g] : b,
            k = j ? 1 : - 1;
            return (h > i ? 1 : - 1) * k
          }
        }
        return 0
      }
    }
    var i = a.jQuery,
    j = String.prototype.trim ? function (a) {
      return a.trim()
    }
     : function (a) {
      return a.replace(/^\s+|\s+$/g, '')
    },
    k = document.documentElement,
    l = k.textContent ? function (a) {
      return a.textContent
    }
     : function (a) {
      return a.innerText
    },
    m = b.create('isotope', {
      layoutMode: 'masonry',
      isJQueryFiltering: !0,
      sortAscending: !0
    });
    m.Item = f,
    m.LayoutMode = g,
    m.prototype._create = function () {
      this.itemGUID = 0,
      this._sorters = {
      },
      this._getSorters(),
      b.prototype._create.call(this),
      this.modes = {
      },
      this.filteredItems = this.items,
      this.sortHistory = [
        'original-order'
      ];
      for (var a in g.modes) this._initLayoutMode(a)
    },
    m.prototype.reloadItems = function () {
      this.itemGUID = 0,
      b.prototype.reloadItems.call(this)
    },
    m.prototype._itemize = function () {
      for (var a = b.prototype._itemize.apply(this, arguments), c = 0, d = a.length; d > c; c++) {
        a[c].id = this.itemGUID++
      }
      return this._updateItemsSortData(a),
      a
    },
    m.prototype._initLayoutMode = function (a) {
      var b = g.modes[a],
      c = this.options[a] || {
      };
      this.options[a] = b.options ? e.extend(b.options, c) : c,
      this.modes[a] = new b(this)
    },
    m.prototype.layout = function () {
      return !this._isLayoutInited && this.options.isInitLayout ? void this.arrange() : void this._layout()
    },
    m.prototype._layout = function () {
      var a = this._getIsInstant();
      this._resetLayout(),
      this._manageStamps(),
      this.layoutItems(this.filteredItems, a),
      this._isLayoutInited = !0
    },
    m.prototype.arrange = function (a) {
      function b() {
        d.reveal(c.needReveal),
        d.hide(c.needHide)
      }
      this.option(a),
      this._getIsInstant();
      var c = this._filter(this.items);
      this.filteredItems = c.matches;
      var d = this;
      this._bindArrangeComplete(),
      this._isInstant ? this._noTransition(b) : b(),
      this._sort(),
      this._layout()
    },
    m.prototype._init = m.prototype.arrange,
    m.prototype._getIsInstant = function () {
      var a = void 0 !== this.options.isLayoutInstant ? this.options.isLayoutInstant : !this._isLayoutInited;
      return this._isInstant = a,
      a
    },
    m.prototype._bindArrangeComplete = function () {
      function a() {
        b && c && d && e.dispatchEvent('arrangeComplete', null, [
          e.filteredItems
        ])
      }
      var b,
      c,
      d,
      e = this;
      this.once('layoutComplete', function () {
        b = !0,
        a()
      }),
      this.once('hideComplete', function () {
        c = !0,
        a()
      }),
      this.once('revealComplete', function () {
        d = !0,
        a()
      })
    },
    m.prototype._filter = function (a) {
      var b = this.options.filter;
      b = b || '*';
      for (var c = [
      ], d = [
      ], e = [
      ], f = this._getFilterTest(b), g = 0, h = a.length; h > g; g++) {
        var i = a[g];
        if (!i.isIgnored) {
          var j = f(i);
          j && c.push(i),
          j && i.isHidden ? d.push(i) : j || i.isHidden || e.push(i)
        }
      }
      return {
        matches: c,
        needReveal: d,
        needHide: e
      }
    },
    m.prototype._getFilterTest = function (a) {
      return i && this.options.isJQueryFiltering ? function (b) {
        return i(b.element).is(a)
      }
       : 'function' == typeof a ? function (b) {
        return a(b.element)
      }
       : function (b) {
        return d(b.element, a)
      }
    },
    m.prototype.updateSortData = function (a) {
      var b;
      a ? (a = e.makeArray(a), b = this.getItems(a)) : b = this.items,
      this._getSorters(),
      this._updateItemsSortData(b)
    },
    m.prototype._getSorters = function () {
      var a = this.options.getSortData;
      for (var b in a) {
        var c = a[b];
        this._sorters[b] = n(c)
      }
    },
    m.prototype._updateItemsSortData = function (a) {
      for (var b = a && a.length, c = 0; b && b > c; c++) {
        a[c].updateSortData()
      }
    };
    var n = function () {
      function a(a) {
        if ('string' != typeof a) return a;
        var c = j(a).split(' '),
        d = c[0],
        e = d.match(/^\[(.+)\]$/),
        f = e && e[1],
        g = b(f, d),
        h = m.sortDataParsers[c[1]];
        return a = h ? function (a) {
          return a && h(g(a))
        }
         : function (a) {
          return a && g(a)
        }
      }
      function b(a, b) {
        return a ? function (b) {
          return b.getAttribute(a)
        }
         : function (a) {
          var c = a.querySelector(b);
          return c && l(c)
        }
      }
      return a
    }();
    m.sortDataParsers = {
      parseInt: function (a) {
        return parseInt(a, 10)
      },
      parseFloat: function (a) {
        return parseFloat(a)
      }
    },
    m.prototype._sort = function () {
      var a = this.options.sortBy;
      if (a) {
        var b = [
        ].concat.apply(a, this.sortHistory),
        c = h(b, this.options.sortAscending);
        this.filteredItems.sort(c),
        a != this.sortHistory[0] && this.sortHistory.unshift(a)
      }
    },
    m.prototype._mode = function () {
      var a = this.options.layoutMode,
      b = this.modes[a];
      if (!b) throw new Error('No layout mode: ' + a);
      return b.options = this.options[a],
      b
    },
    m.prototype._resetLayout = function () {
      b.prototype._resetLayout.call(this),
      this._mode()._resetLayout()
    },
    m.prototype._getItemLayoutPosition = function (a) {
      return this._mode()._getItemLayoutPosition(a)
    },
    m.prototype._manageStamp = function (a) {
      this._mode()._manageStamp(a)
    },
    m.prototype._getContainerSize = function () {
      return this._mode()._getContainerSize()
    },
    m.prototype.needsResizeLayout = function () {
      return this._mode().needsResizeLayout()
    },
    m.prototype.appended = function (a) {
      var b = this.addItems(a);
      if (b.length) {
        var c = this._filterRevealAdded(b);
        this.filteredItems = this.filteredItems.concat(c)
      }
    },
    m.prototype.prepended = function (a) {
      var b = this._itemize(a);
      if (b.length) {
        this._resetLayout(),
        this._manageStamps();
        var c = this._filterRevealAdded(b);
        this.layoutItems(this.filteredItems),
        this.filteredItems = c.concat(this.filteredItems),
        this.items = b.concat(this.items)
      }
    },
    m.prototype._filterRevealAdded = function (a) {
      var b = this._filter(a);
      return this.hide(b.needHide),
      this.reveal(b.matches),
      this.layoutItems(b.matches, !0),
      b.matches
    },
    m.prototype.insert = function (a) {
      var b = this.addItems(a);
      if (b.length) {
        var c,
        d,
        e = b.length;
        for (c = 0; e > c; c++) d = b[c],
        this.element.appendChild(d.element);
        var f = this._filter(b).matches;
        for (c = 0; e > c; c++) b[c].isLayoutInstant = !0;
        for (this.arrange(), c = 0; e > c; c++) delete b[c].isLayoutInstant;
        this.reveal(f)
      }
    };
    var o = m.prototype.remove;
    return m.prototype.remove = function (a) {
      a = e.makeArray(a);
      var b = this.getItems(a);
      o.call(this, a);
      var c = b && b.length;
      if (c) for (var d = 0; c > d; d++) {
        var f = b[d];
        e.removeFrom(this.filteredItems, f)
      }
    },
    m.prototype.shuffle = function () {
      for (var a = 0, b = this.items.length; b > a; a++) {
        this.items[a].sortData.random = Math.random()
      }
      this.options.sortBy = 'random',
      this._sort(),
      this._layout()
    },
    m.prototype._noTransition = function (a) {
      var b = this.options.transitionDuration;
      this.options.transitionDuration = 0;
      var c = a.call(this);
      return this.options.transitionDuration = b,
      c
    },
    m.prototype.getFilteredItemElements = function () {
      for (var a = [
      ], b = 0, c = this.filteredItems.length; c > b; b++) a.push(this.filteredItems[b].element);
      return a
    },
    m
  }),
  function () {
    var a,
    b,
    c,
    d,
    e,
    f = function (a, b) {
      return function () {
        return a.apply(b, arguments)
      }
    },
    g = [
    ].indexOf || function (a) {
      for (var b = 0, c = this.length; c > b; b++) if (b in this && this[b] === a) return b;
      return - 1
    };
    b = function () {
      function a() {
      }
      return a.prototype.extend = function (a, b) {
        var c,
        d;
        for (c in b) d = b[c],
        null == a[c] && (a[c] = d);
        return a
      },
      a.prototype.isMobile = function (a) {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(a)
      },
      a.prototype.createEvent = function (a, b, c, d) {
        var e;
        return null == b && (b = !1),
        null == c && (c = !1),
        null == d && (d = null),
        null != document.createEvent ? (e = document.createEvent('CustomEvent'), e.initCustomEvent(a, b, c, d)) : null != document.createEventObject ? (e = document.createEventObject(), e.eventType = a) : e.eventName = a,
        e
      },
      a.prototype.emitEvent = function (a, b) {
        return null != a.dispatchEvent ? a.dispatchEvent(b) : b in (null != a) ? a[b]() : 'on' + b in (null != a) ? a['on' + b]() : void 0
      },
      a.prototype.addEvent = function (a, b, c) {
        return null != a.addEventListener ? a.addEventListener(b, c, !1) : null != a.attachEvent ? a.attachEvent('on' + b, c) : a[b] = c
      },
      a.prototype.removeEvent = function (a, b, c) {
        return null != a.removeEventListener ? a.removeEventListener(b, c, !1) : null != a.detachEvent ? a.detachEvent('on' + b, c) : delete a[b]
      },
      a.prototype.innerHeight = function () {
        return 'innerHeight' in window ? window.innerHeight : document.documentElement.clientHeight
      },
      a
    }(),
    c = this.WeakMap || this.MozWeakMap || (c = function () {
      function a() {
        this.keys = [
        ],
        this.values = [
        ]
      }
      return a.prototype.get = function (a) {
        var b,
        c,
        d,
        e;
        for (e = this.keys, b = c = 0, d = e.length; d > c; b = ++c) if (e[b] === a) return this.values[b]
      },
      a.prototype.set = function (a, b) {
        var c,
        d,
        e,
        f;
        for (f = this.keys, c = d = 0, e = f.length; e > d; c = ++d) if (f[c] === a) return void (this.values[c] = b);
        return this.keys.push(a),
        this.values.push(b)
      },
      a
    }()),
    a = this.MutationObserver || this.WebkitMutationObserver || this.MozMutationObserver || (a = function () {
      function a() {
        'undefined' != typeof console && null !== console && console.warn('MutationObserver is not supported by your browser.'),
        'undefined' != typeof console && null !== console && console.warn('WOW.js cannot detect dom mutations, please call .sync() after loading new content.')
      }
      return a.notSupported = !0,
      a.prototype.observe = function () {
      },
      a
    }()),
    d = this.getComputedStyle || function (a) {
      return this.getPropertyValue = function (b) {
        var c;
        return 'float' === b && (b = 'styleFloat'),
        e.test(b) && b.replace(e, function (a, b) {
          return b.toUpperCase()
        }),
        (null != (c = a.currentStyle) ? c[b] : void 0) || null
      },
      this
    },
    e = /(\-([a-z]){1})/g,
    this.WOW = function () {
      function e(a) {
        null == a && (a = {
        }),
        this.scrollCallback = f(this.scrollCallback, this),
        this.scrollHandler = f(this.scrollHandler, this),
        this.resetAnimation = f(this.resetAnimation, this),
        this.start = f(this.start, this),
        this.scrolled = !0,
        this.config = this.util().extend(a, this.defaults),
        null != a.scrollContainer && (this.config.scrollContainer = document.querySelector(a.scrollContainer)),
        this.animationNameCache = new c,
        this.wowEvent = this.util().createEvent(this.config.boxClass)
      }
      return e.prototype.defaults = {
        boxClass: 'wow',
        animateClass: 'animated',
        offset: 0,
        mobile: !0,
        live: !0,
        callback: null,
        scrollContainer: null
      },
      e.prototype.init = function () {
        var a;
        return this.element = window.document.documentElement,
        'interactive' === (a = document.readyState) || 'complete' === a ? this.start() : this.util().addEvent(document, 'DOMContentLoaded', this.start),
        this.finished = [
        ]
      },
      e.prototype.start = function () {
        var b,
        c,
        d,
        e;
        if (this.stopped = !1, this.boxes = function () {
          var a,
          c,
          d,
          e;
          for (d = this.element.querySelectorAll('.' + this.config.boxClass), e = [
          ], a = 0, c = d.length; c > a; a++) b = d[a],
          e.push(b);
          return e
        }.call(this), this.all = function () {
          var a,
          c,
          d,
          e;
          for (d = this.boxes, e = [
          ], a = 0, c = d.length; c > a; a++) b = d[a],
          e.push(b);
          return e
        }.call(this), this.boxes.length) if (this.disabled()) this.resetStyle();
         else for (e = this.boxes, c = 0, d = e.length; d > c; c++) b = e[c],
        this.applyStyle(b, !0);
        return this.disabled() || (this.util().addEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler), this.util().addEvent(window, 'resize', this.scrollHandler), this.interval = setInterval(this.scrollCallback, 50)),
        this.config.live ? new a(function (a) {
          return function (b) {
            var c,
            d,
            e,
            f,
            g;
            for (g = [
            ], c = 0, d = b.length; d > c; c++) f = b[c],
            g.push(function () {
              var a,
              b,
              c,
              d;
              for (c = f.addedNodes || [
              ], d = [
              ], a = 0, b = c.length; b > a; a++) e = c[a],
              d.push(this.doSync(e));
              return d
            }.call(a));
            return g
          }
        }(this)).observe(document.body, {
          childList: !0,
          subtree: !0
        }) : void 0
      },
      e.prototype.stop = function () {
        return this.stopped = !0,
        this.util().removeEvent(this.config.scrollContainer || window, 'scroll', this.scrollHandler),
        this.util().removeEvent(window, 'resize', this.scrollHandler),
        null != this.interval ? clearInterval(this.interval) : void 0
      },
      e.prototype.sync = function () {
        return a.notSupported ? this.doSync(this.element) : void 0
      },
      e.prototype.doSync = function (a) {
        var b,
        c,
        d,
        e,
        f;
        if (null == a && (a = this.element), 1 === a.nodeType) {
          for (a = a.parentNode || a, e = a.querySelectorAll('.' + this.config.boxClass), f = [
          ], c = 0, d = e.length; d > c; c++) b = e[c],
          g.call(this.all, b) < 0 ? (this.boxes.push(b), this.all.push(b), this.stopped || this.disabled() ? this.resetStyle() : this.applyStyle(b, !0), f.push(this.scrolled = !0)) : f.push(void 0);
          return f
        }
      },
      e.prototype.show = function (a) {
        return this.applyStyle(a),
        a.className = a.className + ' ' + this.config.animateClass,
        null != this.config.callback && this.config.callback(a),
        this.util().emitEvent(a, this.wowEvent),
        this.util().addEvent(a, 'animationend', this.resetAnimation),
        this.util().addEvent(a, 'oanimationend', this.resetAnimation),
        this.util().addEvent(a, 'webkitAnimationEnd', this.resetAnimation),
        this.util().addEvent(a, 'MSAnimationEnd', this.resetAnimation),
        a
      },
      e.prototype.applyStyle = function (a, b) {
        var c,
        d,
        e;
        return d = a.getAttribute('data-wow-duration'),
        c = a.getAttribute('data-wow-delay'),
        e = a.getAttribute('data-wow-iteration'),
        this.animate(function (f) {
          return function () {
            return f.customStyle(a, b, d, c, e)
          }
        }(this))
      },
      e.prototype.animate = function () {
        return 'requestAnimationFrame' in window ? function (a) {
          return window.requestAnimationFrame(a)
        }
         : function (a) {
          return a()
        }
      }(),
      e.prototype.resetStyle = function () {
        var a,
        b,
        c,
        d,
        e;
        for (d = this.boxes, e = [
        ], b = 0, c = d.length; c > b; b++) a = d[b],
        e.push(a.style.visibility = 'visible');
        return e
      },
      e.prototype.resetAnimation = function (a) {
        var b;
        return a.type.toLowerCase().indexOf('animationend') >= 0 ? (b = a.target || a.srcElement, b.className = b.className.replace(this.config.animateClass, '').trim()) : void 0
      },
      e.prototype.customStyle = function (a, b, c, d, e) {
        return b && this.cacheAnimationName(a),
        a.style.visibility = b ? 'hidden' : 'visible',
        c && this.vendorSet(a.style, {
          animationDuration: c
        }),
        d && this.vendorSet(a.style, {
          animationDelay: d
        }),
        e && this.vendorSet(a.style, {
          animationIterationCount: e
        }),
        this.vendorSet(a.style, {
          animationName: b ? 'none' : this.cachedAnimationName(a)
        }),
        a
      },
      e.prototype.vendors = [
        'moz',
        'webkit'
      ],
      e.prototype.vendorSet = function (a, b) {
        var c,
        d,
        e,
        f;
        d = [
        ];
        for (c in b) e = b[c],
        a['' + c] = e,
        d.push(function () {
          var b,
          d,
          g,
          h;
          for (g = this.vendors, h = [
          ], b = 0, d = g.length; d > b; b++) f = g[b],
          h.push(a['' + f + c.charAt(0).toUpperCase() + c.substr(1)] = e);
          return h
        }.call(this));
        return d
      },
      e.prototype.vendorCSS = function (a, b) {
        var c,
        e,
        f,
        g,
        h,
        i;
        for (h = d(a), g = h.getPropertyCSSValue(b), f = this.vendors, c = 0, e = f.length; e > c; c++) i = f[c],
        g = g || h.getPropertyCSSValue('-' + i + '-' + b);
        return g
      },
      e.prototype.animationName = function (a) {
        var b;
        try {
          b = this.vendorCSS(a, 'animation-name').cssText
        } catch (c) {
          b = d(a).getPropertyValue('animation-name')
        }
        return 'none' === b ? '' : b
      },
      e.prototype.cacheAnimationName = function (a) {
        return this.animationNameCache.set(a, this.animationName(a))
      },
      e.prototype.cachedAnimationName = function (a) {
        return this.animationNameCache.get(a)
      },
      e.prototype.scrollHandler = function () {
        return this.scrolled = !0
      },
      e.prototype.scrollCallback = function () {
        var a;
        return !this.scrolled || (this.scrolled = !1, this.boxes = function () {
          var b,
          c,
          d,
          e;
          for (d = this.boxes, e = [
          ], b = 0, c = d.length; c > b; b++) (a = d[b]) && (this.isVisible(a) ? this.show(a) : e.push(a));
          return e
        }.call(this), this.boxes.length || this.config.live) ? void 0 : this.stop()
      },
      e.prototype.offsetTop = function (a) {
        for (var b; void 0 === a.offsetTop; ) a = a.parentNode;
        for (b = a.offsetTop; a = a.offsetParent; ) b += a.offsetTop;
        return b
      },
      e.prototype.isVisible = function (a) {
        var b,
        c,
        d,
        e,
        f;
        return c = a.getAttribute('data-wow-offset') || this.config.offset,
        f = this.config.scrollContainer && this.config.scrollContainer.scrollTop || window.pageYOffset,
        e = f + Math.min(this.element.clientHeight, this.util().innerHeight()) - c,
        d = this.offsetTop(a),
        b = d + a.clientHeight,
        e >= d && b >= f
      },
      e.prototype.util = function () {
        return null != this._util ? this._util : this._util = new b
      },
      e.prototype.disabled = function () {
        return !this.config.mobile && this.util().isMobile(navigator.userAgent)
      },
      e
    }()
  }.call(this),
  function (a) {
    var b = function (a) {
      function b() {
        for (var a in g) c(g[a])
      }
      function c(b) {
        for (var c = 0; c < b.length; c++) {
          for (var e = !0, f = 0; f < b[c].test.length; f++) if (b[c].test[f] instanceof RegExp) {
            if (!b[c].test[f].test(a)) {
              e = !1;
              break
            }
          } else if ( - 1 == a.indexOf(b[c].test[f])) {
            e = !1;
            break
          }
          if (e) {
            d(b[c]);
            break
          }
        }
      }
      function d(a) {
        for (var b in g) if (g.hasOwnProperty(b) && a[b]) {
          if (a[b].$version) {
            var c = e(a[b].$version.search);
            if (c) {
              var d = c.split('.'),
              h = a[b].$version.names,
              i = a[b].$version.altNames;
              if (a[b].version = c, d[0] && (a[b].majorVersion = parseInt(d[0])), d[1] && (a[b].minorVersion = parseInt(d[1])), d[2] && (a[b].patchVersion = parseInt(d[2])), h) for (var j, k = [
              ], l = 0; l < d.length; l++) k.push(d[l]),
              j = k.join('.'),
              h[j] && (a[b].versionName = h[j]),
              i && i[j] && (a[b].versionAltNames = i[j])
            }
          }
          for (var m in a[b]) a[b].hasOwnProperty(m) && '$' !== m[0] && (f[b][m] = a[b][m])
        }
      }
      function e(b) {
        var c;
        if (b instanceof RegExp) {
          if (!(c = (a.match(b) || [
          ]) [0])) return
        } else c = b;
        var d,
        e = a.indexOf(c);
        if ( - 1 != e && (d = a.substring(e + c.length), regexpResult = /^(\d+(\.|_)){0,2}\d+/.exec(d))) return regexpResult[0].replace(/_/g, '.')
      }
      var f = {
        browser: {
          fullName: '',
          name: '',
          version: '',
          majorVersion: null,
          minorVersion: null,
          patchVersion: null,
          engine: ''
        },
        os: {
          fullName: '',
          name: '',
          version: '',
          versionName: '',
          versionAltNames: [
          ],
          majorVersion: null,
          minorVersion: null,
          patchVersion: null
        },
        features: {
          bw: !1,
          mobile: !1,
          tv: !1,
          proxy: !1
        }
      },
      g = {
        browser: [
          {
            test: [
              'SailfishBrowser'
            ],
            browser: {
              fullName: 'Sailfish Browser',
              name: 'sailfishbrowser',
              engine: 'gecko',
              $version: {
                search: 'SailfishBrowser/'
              }
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Edge/'
            ],
            browser: {
              fullName: 'Edge',
              name: 'edge',
              engine: 'edgehtml',
              $version: {
                search: 'Edge/'
              }
            }
          },
          {
            test: [
              'MSIE'
            ],
            browser: {
              fullName: 'Internet Explorer',
              name: 'ie',
              engine: 'trident',
              $version: {
                search: 'MSIE '
              }
            }
          },
          {
            test: [
              'Trident'
            ],
            browser: {
              fullName: 'Internet Explorer',
              name: 'ie',
              engine: 'trident',
              $version: {
                search: 'rv:'
              }
            }
          },
          {
            test: [
              'OPR/'
            ],
            browser: {
              fullName: 'Opera',
              name: 'opera',
              engine: 'webkit',
              $version: {
                search: 'OPR/'
              }
            }
          },
          {
            test: [
              'Chrome'
            ],
            browser: {
              fullName: 'Chrome',
              name: 'chrome',
              engine: 'webkit',
              $version: {
                search: 'Chrome/'
              }
            }
          },
          {
            test: [
              'Firefox'
            ],
            browser: {
              fullName: 'Firefox',
              name: 'firefox',
              engine: 'gecko',
              $version: {
                search: 'Firefox/'
              }
            }
          },
          {
            test: [
              'NokiaBrowser'
            ],
            browser: {
              fullName: 'Nokia Browser',
              name: 'nokiabrowser',
              engine: 'webkit',
              $version: {
                search: 'NokiaBrowser/'
              }
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Opera Mini',
              'Presto'
            ],
            browser: {
              fullName: 'Opera Mini',
              name: 'operamini',
              engine: 'presto',
              $version: {
                search: 'Version/'
              }
            },
            features: {
              mobile: !0,
              proxy: !0
            }
          },
          {
            test: [
              'Opera Mini',
              'WebKit'
            ],
            browser: {
              fullName: 'Opera Mini',
              name: 'operamini',
              engine: 'webkit'
            },
            features: {
              mobile: !0,
              proxy: !0
            }
          },
          {
            test: [
              'Opera'
            ],
            browser: {
              fullName: 'Opera',
              name: 'opera',
              engine: 'presto',
              $version: {
                search: 'Version/'
              }
            }
          },
          {
            test: [
              'OviBrowser'
            ],
            browser: {
              fullName: 'Ovi Browser',
              name: 'ovi',
              engine: 'gecko',
              $version: {
                search: 'OviBrowser/'
              }
            },
            features: {
              mobile: !0,
              proxy: !0
            }
          },
          {
            test: [
              'CriOS/'
            ],
            browser: {
              fullName: 'Chrome',
              name: 'chrome',
              engine: 'webkit',
              $version: {
                search: 'CriOS/'
              }
            }
          },
          {
            test: [
              'Coast/'
            ],
            browser: {
              fullName: 'Opera Coast',
              name: 'coast',
              engine: 'webkit',
              $version: {
                search: 'Coast/'
              }
            }
          },
          {
            test: [
              'Safari',
              'Version/',
              /(iPhone|iPod|iPad|Macintosh|Windows)/
            ],
            browser: {
              fullName: 'Safari',
              name: 'safari',
              engine: 'webkit',
              $version: {
                search: 'Version/'
              }
            }
          },
          {
            test: [
              'WebKit'
            ],
            browser: {
              engine: 'webkit'
            }
          },
          {
            test: [
              'Gecko/'
            ],
            browser: {
              engine: 'gecko'
            }
          }
        ],
        os: [
          {
            test: [
              'Sailfish'
            ],
            os: {
              fullName: 'Sailfish OS',
              name: 'sailfish'
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Windows Phone'
            ],
            os: {
              fullName: 'Windows Phone',
              name: 'winphone',
              $version: {
                search: 'Windows Phone '
              }
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Windows'
            ],
            os: {
              fullName: 'Windows',
              name: 'win',
              $version: {
                search: 'Windows NT ',
                names: {
                  '10.0': '10',
                  6.3: '8.1',
                  6.2: '8',
                  6.1: '7',
                  '6.0': 'Vista',
                  5.2: 'XP',
                  5.1: 'XP',
                  5.01: '2000',
                  '5.0': '2000'
                },
                altNames: {
                  5.2: [
                    'Server 2003'
                  ]
                }
              }
            }
          },
          {
            test: [
              'Macintosh',
              'OS X 10'
            ],
            os: {
              fullName: 'Mac OS X',
              name: 'osx',
              $version: {
                search: /OS X 10(_|\.)/,
                prop: 'majorVersion',
                names: {
                  6: 'Snow Leopard',
                  7: 'Lion',
                  8: 'Mountain Lion',
                  9: 'Mavericks',
                  10: 'Yosemite'
                }
              }
            }
          },
          {
            test: [
              'Ubuntu'
            ],
            os: {
              fullName: 'Ubuntu',
              name: 'ubuntu'
            }
          },
          {
            test: [
              'Fedora'
            ],
            os: {
              fullName: 'Fedora',
              name: 'fedora',
              $version: {
                search: 'Fedora/',
                prop: 'majorVersion',
                names: {
                  20: 'Heisenbug',
                  19: 'Schrödinger\'s Cat',
                  18: 'Spherical Cow',
                  17: 'Beefy Miracle',
                  16: 'Verne',
                  15: 'Lovelock',
                  14: 'Laughlin',
                  13: 'Goddard',
                  12: 'Constantine',
                  11: 'Leonidas',
                  10: 'Cambridge',
                  9: 'Sulphur',
                  8: 'Werewolf',
                  7: 'Moonshine'
                }
              }
            }
          },
          {
            test: [
              'Kindle'
            ],
            os: {
              fullName: 'Kindle',
              name: 'kindle',
              $version: {
                search: 'Kindle/'
              }
            },
            features: {
              bw: !0,
              mobile: !0
            }
          },
          {
            test: [
              /(BlackBerry|BB\d+)/
            ],
            os: {
              fullName: 'BlackBerry',
              name: 'blackberry',
              $version: {
                search: 'Version/'
              }
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Symbian'
            ],
            os: {
              fullName: 'Symbian',
              name: 'symbian'
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Series40'
            ],
            os: {
              fullName: 'Symbian',
              name: 'symbian'
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'PlayStation Vita'
            ],
            os: {
              fullName: 'PlayStation Vita',
              name: 'psvita'
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Nintendo DSi'
            ],
            os: {
              fullName: 'Nintendo DSi',
              name: 'dsi'
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'New Nintendo 3DS'
            ],
            os: {
              fullName: 'New Nintendo 3DS',
              name: 'n3ds'
            },
            browser: {
              engine: 'webkit'
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Nintendo 3DS'
            ],
            os: {
              fullName: 'Nintendo 3DS',
              name: '3ds'
            },
            browser: {
              engine: 'webkit'
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              'Viera'
            ],
            os: {
              fullName: 'Viera',
              name: 'viera'
            },
            browser: {
              engine: 'webkit'
            },
            features: {
              tv: !0
            }
          },
          {
            test: [
              'SonyDTV'
            ],
            features: {
              tv: !0
            }
          },
          {
            test: [
              'Android'
            ],
            os: {
              fullName: 'Android',
              name: 'android',
              $version: {
                search: 'Android '
              }
            },
            features: {
              mobile: !0
            }
          },
          {
            test: [
              /iPhone|iPod|iPad/
            ],
            os: {
              fullName: 'iOS',
              name: 'ios',
              $version: {
                search: 'OS '
              }
            },
            features: {
              mobile: !0
            }
          }
        ],
        features: [
          {
            test: [
              /mobile/i
            ],
            features: {
              mobile: !0
            }
          },
          {
            test: [
              /smart-{0,1}tv/i
            ],
            features: {
              tv: !0
            }
          }
        ]
      };
      return a ? (b(), f) : f
    },
    c = b(navigator.userAgent),
    d = document.getElementsByTagName('html') [0],
    e = [
      d.className
    ];
    c.browser.name && e.push(c.browser.name),
    c.browser.engine && e.push(c.browser.engine),
    c.os.name && e.push(c.os.name);
    for (var f in c.features) c.features[f] && e.push(f);
    d.className = e.join(' '),
    'undefined' != typeof module && module.exports ? module.exports = c : a.Sniff = c
  }(this),
  function () {
    function a() {
    }
    function b(a, b) {
      for (var c = a.length; c--; ) if (a[c].listener === b) return c;
      return - 1
    }
    function c(a) {
      return function () {
        return this[a].apply(this, arguments)
      }
    }
    var d = a.prototype,
    e = this,
    f = e.EventEmitter;
    d.getListeners = function (a) {
      var b,
      c,
      d = this._getEvents();
      if ('object' == typeof a) {
        b = {
        };
        for (c in d) d.hasOwnProperty(c) && a.test(c) && (b[c] = d[c])
      } else b = d[a] || (d[a] = [
      ]);
      return b
    },
    d.flattenListeners = function (a) {
      var b,
      c = [
      ];
      for (b = 0; b < a.length; b += 1) c.push(a[b].listener);
      return c
    },
    d.getListenersAsObject = function (a) {
      var b,
      c = this.getListeners(a);
      return c instanceof Array && (b = {
      }, b[a] = c),
      b || c
    },
    d.addListener = function (a, c) {
      var d,
      e = this.getListenersAsObject(a),
      f = 'object' == typeof c;
      for (d in e) e.hasOwnProperty(d) && - 1 === b(e[d], c) && e[d].push(f ? c : {
        listener: c,
        once: !1
      });
      return this
    },
    d.on = c('addListener'),
    d.addOnceListener = function (a, b) {
      return this.addListener(a, {
        listener: b,
        once: !0
      })
    },
    d.once = c('addOnceListener'),
    d.defineEvent = function (a) {
      return this.getListeners(a),
      this
    },
    d.defineEvents = function (a) {
      for (var b = 0; b < a.length; b += 1) this.defineEvent(a[b]);
      return this
    },
    d.removeListener = function (a, c) {
      var d,
      e,
      f = this.getListenersAsObject(a);
      for (e in f) f.hasOwnProperty(e) && - 1 !== (d = b(f[e], c)) && f[e].splice(d, 1);
      return this
    },
    d.off = c('removeListener'),
    d.addListeners = function (a, b) {
      return this.manipulateListeners(!1, a, b)
    },
    d.removeListeners = function (a, b) {
      return this.manipulateListeners(!0, a, b)
    },
    d.manipulateListeners = function (a, b, c) {
      var d,
      e,
      f = a ? this.removeListener : this.addListener,
      g = a ? this.removeListeners : this.addListeners;
      if ('object' != typeof b || b instanceof RegExp) for (d = c.length; d--; ) f.call(this, b, c[d]);
       else for (d in b) b.hasOwnProperty(d) && (e = b[d]) && ('function' == typeof e ? f.call(this, d, e) : g.call(this, d, e));
      return this
    },
    d.removeEvent = function (a) {
      var b,
      c = typeof a,
      d = this._getEvents();
      if ('string' === c) delete d[a];
       else if ('object' === c) for (b in d) d.hasOwnProperty(b) && a.test(b) && delete d[b];
       else delete this._events;
      return this
    },
    d.removeAllListeners = c('removeEvent'),
    d.emitEvent = function (a, b) {
      var c,
      d,
      e,
      f = this.getListenersAsObject(a);
      for (e in f) if (f.hasOwnProperty(e)) for (d = f[e].length; d--; ) c = f[e][d],
      !0 === c.once && this.removeListener(a, c.listener),
      c.listener.apply(this, b || [
      ]) === this._getOnceReturnValue() && this.removeListener(a, c.listener);
      return this
    },
    d.trigger = c('emitEvent'),
    d.emit = function (a) {
      var b = Array.prototype.slice.call(arguments, 1);
      return this.emitEvent(a, b)
    },
    d.setOnceReturnValue = function (a) {
      return this._onceReturnValue = a,
      this
    },
    d._getOnceReturnValue = function () {
      return !this.hasOwnProperty('_onceReturnValue') || this._onceReturnValue
    },
    d._getEvents = function () {
      return this._events || (this._events = {
      })
    },
    a.noConflict = function () {
      return e.EventEmitter = f,
      a
    },
    'function' == typeof define && define.amd ? define('eventEmitter/EventEmitter', [
    ], function () {
      return a
    }) : 'object' == typeof module && module.exports ? module.exports = a : this.EventEmitter = a
  }.call(this),
  function (a) {
    function b(b) {
      var c = a.event;
      return c.target = c.target || c.srcElement || b,
      c
    }
    var c = document.documentElement,
    d = function () {
    };
    c.addEventListener ? d = function (a, b, c) {
      a.addEventListener(b, c, !1)
    }
     : c.attachEvent && (d = function (a, c, d) {
      a[c + d] = d.handleEvent ? function () {
        var c = b(a);
        d.handleEvent.call(d, c)
      }
       : function () {
        var c = b(a);
        d.call(a, c)
      },
      a.attachEvent('on' + c, a[c + d])
    });
    var e = function () {
    };
    c.removeEventListener ? e = function (a, b, c) {
      a.removeEventListener(b, c, !1)
    }
     : c.detachEvent && (e = function (a, b, c) {
      a.detachEvent('on' + b, a[b + c]);
      try {
        delete a[b + c]
      } catch (d) {
        a[b + c] = void 0
      }
    });
    var f = {
      bind: d,
      unbind: e
    };
    'function' == typeof define && define.amd ? define('eventie/eventie', f) : a.eventie = f
  }(this),
  function (a, b) {
    'function' == typeof define && define.amd ? define(['eventEmitter/EventEmitter',
    'eventie/eventie'], function (c, d) {
      return b(a, c, d)
    }) : 'object' == typeof exports ? module.exports = b(a, require('wolfy87-eventemitter'), require('eventie')) : a.imagesLoaded = b(a, a.EventEmitter, a.eventie)
  }(window, function (a, b, c) {
    function d(a, b) {
      for (var c in b) a[c] = b[c];
      return a
    }
    function e(a) {
      return '[object Array]' === m.call(a)
    }
    function f(a) {
      var b = [
      ];
      if (e(a)) b = a;
       else if ('number' == typeof a.length) for (var c = 0, d = a.length; c < d; c++) b.push(a[c]);
       else b.push(a);
      return b
    }
    function g(a, b, c) {
      if (!(this instanceof g)) return new g(a, b);
      'string' == typeof a && (a = document.querySelectorAll(a)),
      this.elements = f(a),
      this.options = d({
      }, this.options),
      'function' == typeof b ? c = b : d(this.options, b),
      c && this.on('always', c),
      this.getImages(),
      j && (this.jqDeferred = new j.Deferred);
      var e = this;
      setTimeout(function () {
        e.check()
      })
    }
    function h(a) {
      this.img = a
    }
    function i(a) {
      this.src = a,
      n[a] = this
    }
    var j = a.jQuery,
    k = a.console,
    l = void 0 !== k,
    m = Object.prototype.toString;
    g.prototype = new b,
    g.prototype.options = {
    },
    g.prototype.getImages = function () {
      this.images = [
      ];
      for (var a = 0, b = this.elements.length; a < b; a++) {
        var c = this.elements[a];
        'IMG' === c.nodeName && this.addImage(c);
        var d = c.nodeType;
        if (d && (1 === d || 9 === d || 11 === d)) for (var e = c.querySelectorAll('img'), f = 0, g = e.length; f < g; f++) {
          var h = e[f];
          this.addImage(h)
        }
      }
    },
    g.prototype.addImage = function (a) {
      var b = new h(a);
      this.images.push(b)
    },
    g.prototype.check = function () {
      function a(a, e) {
        return b.options.debug && l && k.log('confirm', a, e),
        b.progress(a),
        c++,
        c === d && b.complete(),
        !0
      }
      var b = this,
      c = 0,
      d = this.images.length;
      if (this.hasAnyBroken = !1, !d) return void this.complete();
      for (var e = 0; e < d; e++) {
        var f = this.images[e];
        f.on('confirm', a),
        f.check()
      }
    },
    g.prototype.progress = function (a) {
      this.hasAnyBroken = this.hasAnyBroken || !a.isLoaded;
      var b = this;
      setTimeout(function () {
        b.emit('progress', b, a),
        b.jqDeferred && b.jqDeferred.notify && b.jqDeferred.notify(b, a)
      })
    },
    g.prototype.complete = function () {
      var a = this.hasAnyBroken ? 'fail' : 'done';
      this.isComplete = !0;
      var b = this;
      setTimeout(function () {
        if (b.emit(a, b), b.emit('always', b), b.jqDeferred) {
          var c = b.hasAnyBroken ? 'reject' : 'resolve';
          b.jqDeferred[c](b)
        }
      })
    },
    j && (j.fn.imagesLoaded = function (a, b) {
      return new g(this, a, b).jqDeferred.promise(j(this))
    }),
    h.prototype = new b,
    h.prototype.check = function () {
      var a = n[this.img.src] || new i(this.img.src);
      if (a.isConfirmed) return void this.confirm(a.isLoaded, 'cached was confirmed');
      if (this.img.complete && void 0 !== this.img.naturalWidth) return void this.confirm(0 !== this.img.naturalWidth, 'naturalWidth');
      var b = this;
      a.on('confirm', function (a, c) {
        return b.confirm(a.isLoaded, c),
        !0
      }),
      a.check()
    },
    h.prototype.confirm = function (a, b) {
      this.isLoaded = a,
      this.emit('confirm', this, b)
    };
    var n = {
    };
    return i.prototype = new b,
    i.prototype.check = function () {
      if (!this.isChecked) {
        var a = new Image;
        c.bind(a, 'load', this),
        c.bind(a, 'error', this),
        a.src = this.src,
        this.isChecked = !0
      }
    },
    i.prototype.handleEvent = function (a) {
      var b = 'on' + a.type;
      this[b] && this[b](a)
    },
    i.prototype.onload = function (a) {
      this.confirm(!0, 'onload'),
      this.unbindProxyEvents(a)
    },
    i.prototype.onerror = function (a) {
      this.confirm(!1, 'onerror'),
      this.unbindProxyEvents(a)
    },
    i.prototype.confirm = function (a, b) {
      this.isConfirmed = !0,
      this.isLoaded = a,
      this.emit('confirm', this, b)
    },
    i.prototype.unbindProxyEvents = function (a) {
      c.unbind(a.target, 'load', this),
      c.unbind(a.target, 'error', this)
    },
    g
  }),
  !function () {
    'use strict';
    function a(a) {
      a.fn.swiper = function (b) {
        var d;
        return a(this).each(function () {
          var a = new c(this, b);
          d || (d = a)
        }),
        d
      }
    }
    var b,
    c = function (a, e) {
      function f(a) {
        return Math.floor(a)
      }
      function g() {
        u.autoplayTimeoutId = setTimeout(function () {
          u.params.loop ? (u.fixLoop(), u._slideNext(), u.emit('onAutoplay', u)) : u.isEnd ? e.autoplayStopOnLast ? u.stopAutoplay() : (u._slideTo(0), u.emit('onAutoplay', u)) : (u._slideNext(), u.emit('onAutoplay', u))
        }, u.params.autoplay)
      }
      function h(a, c) {
        var d = b(a.target);
        if (!d.is(c)) if ('string' == typeof c) d = d.parents(c);
         else if (c.nodeType) {
          var e;
          return d.parents().each(function (a, b) {
            b === c && (e = c)
          }),
          e ? c : void 0
        }
        if (0 !== d.length) return d[0]
      }
      function i(a, b) {
        b = b || {
        };
        var c = window.MutationObserver || window.WebkitMutationObserver,
        d = new c(function (a) {
          a.forEach(function (a) {
            u.onResize(!0),
            u.emit('onObserverUpdate', u, a)
          })
        });
        d.observe(a, {
          attributes: void 0 === b.attributes || b.attributes,
          childList: void 0 === b.childList || b.childList,
          characterData: void 0 === b.characterData || b.characterData
        }),
        u.observers.push(d)
      }
      function j(a) {
        a.originalEvent && (a = a.originalEvent);
        var b = a.keyCode || a.charCode;
        if (!u.params.allowSwipeToNext && (u.isHorizontal() && 39 === b || !u.isHorizontal() && 40 === b)) return !1;
        if (!u.params.allowSwipeToPrev && (u.isHorizontal() && 37 === b || !u.isHorizontal() && 38 === b)) return !1;
        if (!(a.shiftKey || a.altKey || a.ctrlKey || a.metaKey || document.activeElement && document.activeElement.nodeName && ('input' === document.activeElement.nodeName.toLowerCase() || 'textarea' === document.activeElement.nodeName.toLowerCase()))) {
          if (37 === b || 39 === b || 38 === b || 40 === b) {
            var c = !1;
            if (u.container.parents('.swiper-slide').length > 0 && 0 === u.container.parents('.swiper-slide-active').length) return;
            var d = {
              left: window.pageXOffset,
              top: window.pageYOffset
            },
            e = window.innerWidth,
            f = window.innerHeight,
            g = u.container.offset();
            u.rtl && (g.left = g.left - u.container[0].scrollLeft);
            for (var h = [
              [g.left,
              g.top],
              [
                g.left + u.width,
                g.top
              ],
              [
                g.left,
                g.top + u.height
              ],
              [
                g.left + u.width,
                g.top + u.height
              ]
            ], i = 0; i < h.length; i++) {
              var j = h[i];
              j[0] >= d.left && j[0] <= d.left + e && j[1] >= d.top && j[1] <= d.top + f && (c = !0)
            }
            if (!c) return
          }
          u.isHorizontal() ? ((37 === b || 39 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), (39 === b && !u.rtl || 37 === b && u.rtl) && u.slideNext(), (37 === b && !u.rtl || 39 === b && u.rtl) && u.slidePrev()) : ((38 === b || 40 === b) && (a.preventDefault ? a.preventDefault() : a.returnValue = !1), 40 === b && u.slideNext(), 38 === b && u.slidePrev())
        }
      }
      function k(a) {
        a.originalEvent && (a = a.originalEvent);
        var b = u.mousewheel.event,
        c = 0,
        d = u.rtl ? - 1 : 1;
        if ('mousewheel' === b) if (u.params.mousewheelForceToAxis) if (u.isHorizontal()) {
          if (!(Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY))) return;
          c = a.wheelDeltaX * d
        } else {
          if (!(Math.abs(a.wheelDeltaY) > Math.abs(a.wheelDeltaX))) return;
          c = a.wheelDeltaY
        } else c = Math.abs(a.wheelDeltaX) > Math.abs(a.wheelDeltaY) ? - a.wheelDeltaX * d : - a.wheelDeltaY;
         else if ('DOMMouseScroll' === b) c = - a.detail;
         else if ('wheel' === b) if (u.params.mousewheelForceToAxis) if (u.isHorizontal()) {
          if (!(Math.abs(a.deltaX) > Math.abs(a.deltaY))) return;
          c = - a.deltaX * d
        } else {
          if (!(Math.abs(a.deltaY) > Math.abs(a.deltaX))) return;
          c = - a.deltaY
        } else c = Math.abs(a.deltaX) > Math.abs(a.deltaY) ? - a.deltaX * d : - a.deltaY;
        if (0 !== c) {
          if (u.params.mousewheelInvert && (c = - c), u.params.freeMode) {
            var e = u.getWrapperTranslate() + c * u.params.mousewheelSensitivity,
            f = u.isBeginning,
            g = u.isEnd;
            if (e >= u.minTranslate() && (e = u.minTranslate()), e <= u.maxTranslate() && (e = u.maxTranslate()), u.setWrapperTransition(0), u.setWrapperTranslate(e), u.updateProgress(), u.updateActiveIndex(), (!f && u.isBeginning || !g && u.isEnd) && u.updateClasses(), u.params.freeModeSticky ? (clearTimeout(u.mousewheel.timeout), u.mousewheel.timeout = setTimeout(function () {
              u.slideReset()
            }, 300)) : u.params.lazyLoading && u.lazy && u.lazy.load(), 0 === e || e === u.maxTranslate()) return
          } else {
            if ((new window.Date).getTime() - u.mousewheel.lastScrollTime > 60) if (0 > c) if (u.isEnd && !u.params.loop || u.animating) {
              if (u.params.mousewheelReleaseOnEdges) return !0
            } else u.slideNext();
             else if (u.isBeginning && !u.params.loop || u.animating) {
              if (u.params.mousewheelReleaseOnEdges) return !0
            } else u.slidePrev();
            u.mousewheel.lastScrollTime = (new window.Date).getTime()
          }
          return u.params.autoplay && u.stopAutoplay(),
          a.preventDefault ? a.preventDefault() : a.returnValue = !1,
          !1
        }
      }
      function l(a, c) {
        a = b(a);
        var d,
        e,
        f,
        g = u.rtl ? - 1 : 1;
        d = a.attr('data-swiper-parallax') || '0',
        e = a.attr('data-swiper-parallax-x'),
        f = a.attr('data-swiper-parallax-y'),
        e || f ? (e = e || '0', f = f || '0') : u.isHorizontal() ? (e = d, f = '0') : (f = d, e = '0'),
        e = e.indexOf('%') >= 0 ? parseInt(e, 10) * c * g + '%' : e * c * g + 'px',
        f = f.indexOf('%') >= 0 ? parseInt(f, 10) * c + '%' : f * c + 'px',
        a.transform('translate3d(' + e + ', ' + f + ',0px)')
      }
      function m(a) {
        return 0 !== a.indexOf('on') && (a = a[0] !== a[0].toUpperCase() ? 'on' + a[0].toUpperCase() + a.substring(1) : 'on' + a),
        a
      }
      if (!(this instanceof c)) return new c(a, e);
      var n = {
        direction: 'horizontal',
        touchEventsTarget: 'container',
        initialSlide: 0,
        speed: 300,
        autoplay: !1,
        autoplayDisableOnInteraction: !0,
        autoplayStopOnLast: !1,
        iOSEdgeSwipeDetection: !1,
        iOSEdgeSwipeThreshold: 20,
        freeMode: !1,
        freeModeMomentum: !0,
        freeModeMomentumRatio: 1,
        freeModeMomentumBounce: !0,
        freeModeMomentumBounceRatio: 1,
        freeModeSticky: !1,
        freeModeMinimumVelocity: 0.02,
        autoHeight: !1,
        setWrapperSize: !1,
        virtualTranslate: !1,
        effect: 'slide',
        coverflow: {
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: !0
        },
        flip: {
          slideShadows: !0,
          limitRotation: !0
        },
        cube: {
          slideShadows: !0,
          shadow: !0,
          shadowOffset: 20,
          shadowScale: 0.94
        },
        fade: {
          crossFade: !1
        },
        parallax: !1,
        scrollbar: null,
        scrollbarHide: !0,
        scrollbarDraggable: !1,
        scrollbarSnapOnRelease: !1,
        keyboardControl: !1,
        mousewheelControl: !1,
        mousewheelReleaseOnEdges: !1,
        mousewheelInvert: !1,
        mousewheelForceToAxis: !1,
        mousewheelSensitivity: 1,
        hashnav: !1,
        breakpoints: void 0,
        spaceBetween: 0,
        slidesPerView: 1,
        slidesPerColumn: 1,
        slidesPerColumnFill: 'column',
        slidesPerGroup: 1,
        centeredSlides: !1,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
        roundLengths: !1,
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: !0,
        shortSwipes: !0,
        longSwipes: !0,
        longSwipesRatio: 0.5,
        longSwipesMs: 300,
        followFinger: !0,
        onlyExternal: !1,
        threshold: 0,
        touchMoveStopPropagation: !0,
        uniqueNavElements: !0,
        pagination: null,
        paginationElement: 'span',
        paginationClickable: !1,
        paginationHide: !1,
        paginationBulletRender: null,
        paginationProgressRender: null,
        paginationFractionRender: null,
        paginationCustomRender: null,
        paginationType: 'bullets',
        resistance: !0,
        resistanceRatio: 0.85,
        nextButton: null,
        prevButton: null,
        watchSlidesProgress: !1,
        watchSlidesVisibility: !1,
        grabCursor: !1,
        preventClicks: !0,
        preventClicksPropagation: !0,
        slideToClickedSlide: !1,
        lazyLoading: !1,
        lazyLoadingInPrevNext: !1,
        lazyLoadingInPrevNextAmount: 1,
        lazyLoadingOnTransitionStart: !1,
        preloadImages: !0,
        updateOnImagesReady: !0,
        loop: !1,
        loopAdditionalSlides: 0,
        loopedSlides: null,
        control: void 0,
        controlInverse: !1,
        controlBy: 'slide',
        allowSwipeToPrev: !0,
        allowSwipeToNext: !0,
        swipeHandler: null,
        noSwiping: !0,
        noSwipingClass: 'swiper-no-swiping',
        slideClass: 'swiper-slide',
        slideActiveClass: 'swiper-slide-active',
        slideVisibleClass: 'swiper-slide-visible',
        slideDuplicateClass: 'swiper-slide-duplicate',
        slideNextClass: 'swiper-slide-next',
        slidePrevClass: 'swiper-slide-prev',
        wrapperClass: 'swiper-wrapper',
        bulletClass: 'swiper-pagination-bullet',
        bulletActiveClass: 'swiper-pagination-bullet-active',
        buttonDisabledClass: 'swiper-button-disabled',
        paginationCurrentClass: 'swiper-pagination-current',
        paginationTotalClass: 'swiper-pagination-total',
        paginationHiddenClass: 'swiper-pagination-hidden',
        paginationProgressbarClass: 'swiper-pagination-progressbar',
        observer: !1,
        observeParents: !1,
        a11y: !1,
        prevSlideMessage: 'Previous slide',
        nextSlideMessage: 'Next slide',
        firstSlideMessage: 'This is the first slide',
        lastSlideMessage: 'This is the last slide',
        paginationBulletMessage: 'Go to slide {{index}}',
        runCallbacksOnInit: !0
      },
      o = e && e.virtualTranslate;
      e = e || {
      };
      var p = {
      };
      for (var q in e) if ('object' != typeof e[q] || null === e[q] || e[q].nodeType || e[q] === window || e[q] === document || void 0 !== d && e[q] instanceof d || 'undefined' != typeof jQuery && e[q] instanceof jQuery) p[q] = e[q];
       else {
        p[q] = {
        };
        for (var r in e[q]) p[q][r] = e[q][r]
      }
      for (var s in n) if (void 0 === e[s]) e[s] = n[s];
       else if ('object' == typeof e[s]) for (var t in n[s]) void 0 === e[s][t] && (e[s][t] = n[s][t]);
      var u = this;
      if (u.params = e, u.originalParams = p, u.classNames = [
      ], void 0 !== b && void 0 !== d && (b = d), (void 0 !== b || (b = void 0 === d ? window.Dom7 || window.Zepto || window.jQuery : d)) && (u.$ = b, u.currentBreakpoint = void 0, u.getActiveBreakpoint = function () {
        if (!u.params.breakpoints) return !1;
        var a,
        b = !1,
        c = [
        ];
        for (a in u.params.breakpoints) u.params.breakpoints.hasOwnProperty(a) && c.push(a);
        c.sort(function (a, b) {
          return parseInt(a, 10) > parseInt(b, 10)
        });
        for (var d = 0; d < c.length; d++) (a = c[d]) >= window.innerWidth && !b && (b = a);
        return b || 'max'
      }, u.setBreakpoint = function () {
        var a = u.getActiveBreakpoint();
        if (a && u.currentBreakpoint !== a) {
          var b = a in u.params.breakpoints ? u.params.breakpoints[a] : u.originalParams,
          c = u.params.loop && b.slidesPerView !== u.params.slidesPerView;
          for (var d in b) u.params[d] = b[d];
          u.currentBreakpoint = a,
          c && u.destroyLoop && u.reLoop(!0)
        }
      }, u.params.breakpoints && u.setBreakpoint(), u.container = b(a), 0 !== u.container.length)) {
        if (u.container.length > 1) {
          var v = [
          ];
          return u.container.each(function () {
            v.push(new c(this, e))
          }),
          v
        }
        u.container[0].swiper = u,
        u.container.data('swiper', u),
        u.classNames.push('swiper-container-' + u.params.direction),
        u.params.freeMode && u.classNames.push('swiper-container-free-mode'),
        u.support.flexbox || (u.classNames.push('swiper-container-no-flexbox'), u.params.slidesPerColumn = 1),
        u.params.autoHeight && u.classNames.push('swiper-container-autoheight'),
        (u.params.parallax || u.params.watchSlidesVisibility) && (u.params.watchSlidesProgress = !0),
        [
          'cube',
          'coverflow',
          'flip'
        ].indexOf(u.params.effect) >= 0 && (u.support.transforms3d ? (u.params.watchSlidesProgress = !0, u.classNames.push('swiper-container-3d')) : u.params.effect = 'slide'),
        'slide' !== u.params.effect && u.classNames.push('swiper-container-' + u.params.effect),
        'cube' === u.params.effect && (u.params.resistanceRatio = 0, u.params.slidesPerView = 1, u.params.slidesPerColumn = 1, u.params.slidesPerGroup = 1, u.params.centeredSlides = !1, u.params.spaceBetween = 0, u.params.virtualTranslate = !0, u.params.setWrapperSize = !1),
        ('fade' === u.params.effect || 'flip' === u.params.effect) && (u.params.slidesPerView = 1, u.params.slidesPerColumn = 1, u.params.slidesPerGroup = 1, u.params.watchSlidesProgress = !0, u.params.spaceBetween = 0, u.params.setWrapperSize = !1, void 0 === o && (u.params.virtualTranslate = !0)),
        u.params.grabCursor && u.support.touch && (u.params.grabCursor = !1),
        u.wrapper = u.container.children('.' + u.params.wrapperClass),
        u.params.pagination && (u.paginationContainer = b(u.params.pagination), u.params.uniqueNavElements && 'string' == typeof u.params.pagination && u.paginationContainer.length > 1 && 1 === u.container.find(u.params.pagination).length && (u.paginationContainer = u.container.find(u.params.pagination)), 'bullets' === u.params.paginationType && u.params.paginationClickable ? u.paginationContainer.addClass('swiper-pagination-clickable') : u.params.paginationClickable = !1, u.paginationContainer.addClass('swiper-pagination-' + u.params.paginationType)),
        (u.params.nextButton || u.params.prevButton) && (u.params.nextButton && (u.nextButton = b(u.params.nextButton), u.params.uniqueNavElements && 'string' == typeof u.params.nextButton && u.nextButton.length > 1 && 1 === u.container.find(u.params.nextButton).length && (u.nextButton = u.container.find(u.params.nextButton))), u.params.prevButton && (u.prevButton = b(u.params.prevButton), u.params.uniqueNavElements && 'string' == typeof u.params.prevButton && u.prevButton.length > 1 && 1 === u.container.find(u.params.prevButton).length && (u.prevButton = u.container.find(u.params.prevButton)))),
        u.isHorizontal = function () {
          return 'horizontal' === u.params.direction
        },
        u.rtl = u.isHorizontal() && ('rtl' === u.container[0].dir.toLowerCase() || 'rtl' === u.container.css('direction')),
        u.rtl && u.classNames.push('swiper-container-rtl'),
        u.rtl && (u.wrongRTL = '-webkit-box' === u.wrapper.css('display')),
        u.params.slidesPerColumn > 1 && u.classNames.push('swiper-container-multirow'),
        u.device.android && u.classNames.push('swiper-container-android'),
        u.container.addClass(u.classNames.join(' ')),
        u.translate = 0,
        u.progress = 0,
        u.velocity = 0,
        u.lockSwipeToNext = function () {
          u.params.allowSwipeToNext = !1
        },
        u.lockSwipeToPrev = function () {
          u.params.allowSwipeToPrev = !1
        },
        u.lockSwipes = function () {
          u.params.allowSwipeToNext = u.params.allowSwipeToPrev = !1
        },
        u.unlockSwipeToNext = function () {
          u.params.allowSwipeToNext = !0
        },
        u.unlockSwipeToPrev = function () {
          u.params.allowSwipeToPrev = !0
        },
        u.unlockSwipes = function () {
          u.params.allowSwipeToNext = u.params.allowSwipeToPrev = !0
        },
        u.params.grabCursor && (u.container[0].style.cursor = 'move', u.container[0].style.cursor = '-webkit-grab', u.container[0].style.cursor = '-moz-grab', u.container[0].style.cursor = 'grab'),
        u.imagesToLoad = [
        ],
        u.imagesLoaded = 0,
        u.loadImage = function (a, b, c, d, e) {
          function f() {
            e && e()
          }
          var g;
          a.complete && d ? f() : b ? (g = new window.Image, g.onload = f, g.onerror = f, c && (g.srcset = c), b && (g.src = b)) : f()
        },
        u.preloadImages = function () {
          function a() {
            void 0 !== u && null !== u && (void 0 !== u.imagesLoaded && u.imagesLoaded++, u.imagesLoaded === u.imagesToLoad.length && (u.params.updateOnImagesReady && u.update(), u.emit('onImagesReady', u)))
          }
          u.imagesToLoad = u.container.find('img');
          for (var b = 0; b < u.imagesToLoad.length; b++) u.loadImage(u.imagesToLoad[b], u.imagesToLoad[b].currentSrc || u.imagesToLoad[b].getAttribute('src'), u.imagesToLoad[b].srcset || u.imagesToLoad[b].getAttribute('srcset'), !0, a)
        },
        u.autoplayTimeoutId = void 0,
        u.autoplaying = !1,
        u.autoplayPaused = !1,
        u.startAutoplay = function () {
          return void 0 === u.autoplayTimeoutId && (!!u.params.autoplay && (!u.autoplaying && (u.autoplaying = !0, u.emit('onAutoplayStart', u), void g())))
        },
        u.stopAutoplay = function (a) {
          u.autoplayTimeoutId && (u.autoplayTimeoutId && clearTimeout(u.autoplayTimeoutId), u.autoplaying = !1, u.autoplayTimeoutId = void 0, u.emit('onAutoplayStop', u))
        },
        u.pauseAutoplay = function (a) {
          u.autoplayPaused || (u.autoplayTimeoutId && clearTimeout(u.autoplayTimeoutId), u.autoplayPaused = !0, 0 === a ? (u.autoplayPaused = !1, g()) : u.wrapper.transitionEnd(function () {
            u && (u.autoplayPaused = !1, u.autoplaying ? g() : u.stopAutoplay())
          }))
        },
        u.minTranslate = function () {
          return - u.snapGrid[0]
        },
        u.maxTranslate = function () {
          return - u.snapGrid[u.snapGrid.length - 1]
        },
        u.updateAutoHeight = function () {
          var a = u.slides.eq(u.activeIndex) [0];
          if (void 0 !== a) {
            var b = a.offsetHeight;
            b && u.wrapper.css('height', b + 'px')
          }
        },
        u.updateContainerSize = function () {
          var a,
          b;
          a = void 0 !== u.params.width ? u.params.width : u.container[0].clientWidth,
          b = void 0 !== u.params.height ? u.params.height : u.container[0].clientHeight,
          0 === a && u.isHorizontal() || 0 === b && !u.isHorizontal() || (a = a - parseInt(u.container.css('padding-left'), 10) - parseInt(u.container.css('padding-right'), 10), b = b - parseInt(u.container.css('padding-top'), 10) - parseInt(u.container.css('padding-bottom'), 10), u.width = a, u.height = b, u.size = u.isHorizontal() ? u.width : u.height)
        },
        u.updateSlidesSize = function () {
          u.slides = u.wrapper.children('.' + u.params.slideClass),
          u.snapGrid = [
          ],
          u.slidesGrid = [
          ],
          u.slidesSizesGrid = [
          ];
          var a,
          b = u.params.spaceBetween,
          c = - u.params.slidesOffsetBefore,
          d = 0,
          e = 0;
          if (void 0 !== u.size) {
            'string' == typeof b && b.indexOf('%') >= 0 && (b = parseFloat(b.replace('%', '')) / 100 * u.size),
            u.virtualSize = - b,
            u.rtl ? u.slides.css({
              marginLeft: '',
              marginTop: ''
            }) : u.slides.css({
              marginRight: '',
              marginBottom: ''
            });
            var g;
            u.params.slidesPerColumn > 1 && (g = Math.floor(u.slides.length / u.params.slidesPerColumn) === u.slides.length / u.params.slidesPerColumn ? u.slides.length : Math.ceil(u.slides.length / u.params.slidesPerColumn) * u.params.slidesPerColumn, 'auto' !== u.params.slidesPerView && 'row' === u.params.slidesPerColumnFill && (g = Math.max(g, u.params.slidesPerView * u.params.slidesPerColumn)));
            var h,
            i = u.params.slidesPerColumn,
            j = g / i,
            k = j - (u.params.slidesPerColumn * j - u.slides.length);
            for (a = 0; a < u.slides.length; a++) {
              h = 0;
              var l = u.slides.eq(a);
              if (u.params.slidesPerColumn > 1) {
                var m,
                n,
                o;
                'column' === u.params.slidesPerColumnFill ? (n = Math.floor(a / i), o = a - n * i, (n > k || n === k && o === i - 1) && ++o >= i && (o = 0, n++), m = n + o * g / i, l.css({
                  '-webkit-box-ordinal-group': m,
                  '-moz-box-ordinal-group': m,
                  '-ms-flex-order': m,
                  '-webkit-order': m,
                  order: m
                })) : (o = Math.floor(a / j), n = a - o * j),
                l.css({
                  'margin-top': 0 !== o && u.params.spaceBetween && u.params.spaceBetween + 'px'
                }).attr('data-swiper-column', n).attr('data-swiper-row', o)
              }
              'none' !== l.css('display') && ('auto' === u.params.slidesPerView ? (h = u.isHorizontal() ? l.outerWidth(!0) : l.outerHeight(!0), u.params.roundLengths && (h = f(h))) : (h = (u.size - (u.params.slidesPerView - 1) * b) / u.params.slidesPerView, u.params.roundLengths && (h = f(h)), u.isHorizontal() ? u.slides[a].style.width = h + 'px' : u.slides[a].style.height = h + 'px'), u.slides[a].swiperSlideSize = h, u.slidesSizesGrid.push(h), u.params.centeredSlides ? (c = c + h / 2 + d / 2 + b, 0 === a && (c = c - u.size / 2 - b), Math.abs(c) < 0.001 && (c = 0), e % u.params.slidesPerGroup == 0 && u.snapGrid.push(c), u.slidesGrid.push(c)) : (e % u.params.slidesPerGroup == 0 && u.snapGrid.push(c), u.slidesGrid.push(c), c = c + h + b), u.virtualSize += h + b, d = h, e++)
            }
            u.virtualSize = Math.max(u.virtualSize, u.size) + u.params.slidesOffsetAfter;
            var p;
            if (u.rtl && u.wrongRTL && ('slide' === u.params.effect || 'coverflow' === u.params.effect) && u.wrapper.css({
              width: u.virtualSize + u.params.spaceBetween + 'px'
            }), (!u.support.flexbox || u.params.setWrapperSize) && (u.isHorizontal() ? u.wrapper.css({
              width: u.virtualSize + u.params.spaceBetween + 'px'
            }) : u.wrapper.css({
              height: u.virtualSize + u.params.spaceBetween + 'px'
            })), u.params.slidesPerColumn > 1 && (u.virtualSize = (h + u.params.spaceBetween) * g, u.virtualSize = Math.ceil(u.virtualSize / u.params.slidesPerColumn) - u.params.spaceBetween, u.wrapper.css({
              width: u.virtualSize + u.params.spaceBetween + 'px'
            }), u.params.centeredSlides)) {
              for (p = [
              ], a = 0; a < u.snapGrid.length; a++) u.snapGrid[a] < u.virtualSize + u.snapGrid[0] && p.push(u.snapGrid[a]);
              u.snapGrid = p
            }
            if (!u.params.centeredSlides) {
              for (p = [
              ], a = 0; a < u.snapGrid.length; a++) u.snapGrid[a] <= u.virtualSize - u.size && p.push(u.snapGrid[a]);
              u.snapGrid = p,
              Math.floor(u.virtualSize - u.size) - Math.floor(u.snapGrid[u.snapGrid.length - 1]) > 1 && u.snapGrid.push(u.virtualSize - u.size)
            }
            0 === u.snapGrid.length && (u.snapGrid = [
              0
            ]),
            0 !== u.params.spaceBetween && (u.isHorizontal() ? u.rtl ? u.slides.css({
              marginLeft: b + 'px'
            }) : u.slides.css({
              marginRight: b + 'px'
            }) : u.slides.css({
              marginBottom: b + 'px'
            })),
            u.params.watchSlidesProgress && u.updateSlidesOffset()
          }
        },
        u.updateSlidesOffset = function () {
          for (var a = 0; a < u.slides.length; a++) u.slides[a].swiperSlideOffset = u.isHorizontal() ? u.slides[a].offsetLeft : u.slides[a].offsetTop
        },
        u.updateSlidesProgress = function (a) {
          if (void 0 === a && (a = u.translate || 0), 0 !== u.slides.length) {
            void 0 === u.slides[0].swiperSlideOffset && u.updateSlidesOffset();
            var b = - a;
            u.rtl && (b = a),
            u.slides.removeClass(u.params.slideVisibleClass);
            for (var c = 0; c < u.slides.length; c++) {
              var d = u.slides[c],
              e = (b - d.swiperSlideOffset) / (d.swiperSlideSize + u.params.spaceBetween);
              if (u.params.watchSlidesVisibility) {
                var f = - (b - d.swiperSlideOffset),
                g = f + u.slidesSizesGrid[c];
                (f >= 0 && f < u.size || g > 0 && g <= u.size || 0 >= f && g >= u.size) && u.slides.eq(c).addClass(u.params.slideVisibleClass)
              }
              d.progress = u.rtl ? - e : e
            }
          }
        },
        u.updateProgress = function (a) {
          void 0 === a && (a = u.translate || 0);
          var b = u.maxTranslate() - u.minTranslate(),
          c = u.isBeginning,
          d = u.isEnd;
          0 === b ? (u.progress = 0, u.isBeginning = u.isEnd = !0) : (u.progress = (a - u.minTranslate()) / b, u.isBeginning = u.progress <= 0, u.isEnd = u.progress >= 1),
          u.isBeginning && !c && u.emit('onReachBeginning', u),
          u.isEnd && !d && u.emit('onReachEnd', u),
          u.params.watchSlidesProgress && u.updateSlidesProgress(a),
          u.emit('onProgress', u, u.progress)
        },
        u.updateActiveIndex = function () {
          var a,
          b,
          c,
          d = u.rtl ? u.translate : - u.translate;
          for (b = 0; b < u.slidesGrid.length; b++) void 0 !== u.slidesGrid[b + 1] ? d >= u.slidesGrid[b] && d < u.slidesGrid[b + 1] - (u.slidesGrid[b + 1] - u.slidesGrid[b]) / 2 ? a = b : d >= u.slidesGrid[b] && d < u.slidesGrid[b + 1] && (a = b + 1) : d >= u.slidesGrid[b] && (a = b);
          (0 > a || void 0 === a) && (a = 0),
          c = Math.floor(a / u.params.slidesPerGroup),
          c >= u.snapGrid.length && (c = u.snapGrid.length - 1),
          a !== u.activeIndex && (u.snapIndex = c, u.previousIndex = u.activeIndex, u.activeIndex = a, u.updateClasses())
        },
        u.updateClasses = function () {
          u.slides.removeClass(u.params.slideActiveClass + ' ' + u.params.slideNextClass + ' ' + u.params.slidePrevClass);
          var a = u.slides.eq(u.activeIndex);
          a.addClass(u.params.slideActiveClass);
          var c = a.next('.' + u.params.slideClass).addClass(u.params.slideNextClass);
          u.params.loop && 0 === c.length && u.slides.eq(0).addClass(u.params.slideNextClass);
          var d = a.prev('.' + u.params.slideClass).addClass(u.params.slidePrevClass);
          if (u.params.loop && 0 === d.length && u.slides.eq( - 1).addClass(u.params.slidePrevClass), u.paginationContainer && u.paginationContainer.length > 0) {
            var e,
            f = u.params.loop ? Math.ceil((u.slides.length - 2 * u.loopedSlides) / u.params.slidesPerGroup) : u.snapGrid.length;
            if (u.params.loop ? (e = Math.ceil((u.activeIndex - u.loopedSlides) / u.params.slidesPerGroup), e > u.slides.length - 1 - 2 * u.loopedSlides && (e -= u.slides.length - 2 * u.loopedSlides), e > f - 1 && (e -= f), 0 > e && 'bullets' !== u.params.paginationType && (e = f + e)) : e = void 0 !== u.snapIndex ? u.snapIndex : u.activeIndex || 0, 'bullets' === u.params.paginationType && u.bullets && u.bullets.length > 0 && (u.bullets.removeClass(u.params.bulletActiveClass), u.paginationContainer.length > 1 ? u.bullets.each(function () {
              b(this).index() === e && b(this).addClass(u.params.bulletActiveClass)
            }) : u.bullets.eq(e).addClass(u.params.bulletActiveClass)), 'fraction' === u.params.paginationType && (u.paginationContainer.find('.' + u.params.paginationCurrentClass).text(e + 1), u.paginationContainer.find('.' + u.params.paginationTotalClass).text(f)), 'progress' === u.params.paginationType) {
              var g = (e + 1) / f,
              h = g,
              i = 1;
              u.isHorizontal() || (i = g, h = 1),
              u.paginationContainer.find('.' + u.params.paginationProgressbarClass).transform('translate3d(0,0,0) scaleX(' + h + ') scaleY(' + i + ')').transition(u.params.speed)
            }
            'custom' === u.params.paginationType && u.params.paginationCustomRender && (u.paginationContainer.html(u.params.paginationCustomRender(u, e + 1, f)), u.emit('onPaginationRendered', u, u.paginationContainer[0]))
          }
          u.params.loop || (u.params.prevButton && u.prevButton && u.prevButton.length > 0 && (u.isBeginning ? (u.prevButton.addClass(u.params.buttonDisabledClass), u.params.a11y && u.a11y && u.a11y.disable(u.prevButton)) : (u.prevButton.removeClass(u.params.buttonDisabledClass), u.params.a11y && u.a11y && u.a11y.enable(u.prevButton))), u.params.nextButton && u.nextButton && u.nextButton.length > 0 && (u.isEnd ? (u.nextButton.addClass(u.params.buttonDisabledClass), u.params.a11y && u.a11y && u.a11y.disable(u.nextButton)) : (u.nextButton.removeClass(u.params.buttonDisabledClass), u.params.a11y && u.a11y && u.a11y.enable(u.nextButton))))
        },
        u.updatePagination = function () {
          if (u.params.pagination && u.paginationContainer && u.paginationContainer.length > 0) {
            var a = '';
            if ('bullets' === u.params.paginationType) {
              for (var b = u.params.loop ? Math.ceil((u.slides.length - 2 * u.loopedSlides) / u.params.slidesPerGroup) : u.snapGrid.length, c = 0; b > c; c++) a += u.params.paginationBulletRender ? u.params.paginationBulletRender(c, u.params.bulletClass) : '<' + u.params.paginationElement + ' class="' + u.params.bulletClass + '"></' + u.params.paginationElement + '>';
              u.paginationContainer.html(a),
              u.bullets = u.paginationContainer.find('.' + u.params.bulletClass),
              u.params.paginationClickable && u.params.a11y && u.a11y && u.a11y.initPagination()
            }
            'fraction' === u.params.paginationType && (a = u.params.paginationFractionRender ? u.params.paginationFractionRender(u, u.params.paginationCurrentClass, u.params.paginationTotalClass) : '<span class="' + u.params.paginationCurrentClass + '"></span> / <span class="' + u.params.paginationTotalClass + '"></span>', u.paginationContainer.html(a)),
            'progress' === u.params.paginationType && (a = u.params.paginationProgressRender ? u.params.paginationProgressRender(u, u.params.paginationProgressbarClass) : '<span class="' + u.params.paginationProgressbarClass + '"></span>', u.paginationContainer.html(a)),
            'custom' !== u.params.paginationType && u.emit('onPaginationRendered', u, u.paginationContainer[0])
          }
        },
        u.update = function (a) {
          function b() {
            c = Math.min(Math.max(u.translate, u.maxTranslate()), u.minTranslate()),
            u.setWrapperTranslate(c),
            u.updateActiveIndex(),
            u.updateClasses()
          }
          if (u.updateContainerSize(), u.updateSlidesSize(), u.updateProgress(), u.updatePagination(), u.updateClasses(), u.params.scrollbar && u.scrollbar && u.scrollbar.set(), a) {
            var c;
            u.controller && u.controller.spline && (u.controller.spline = void 0),
            u.params.freeMode ? (b(), u.params.autoHeight && u.updateAutoHeight()) : (('auto' === u.params.slidesPerView || u.params.slidesPerView > 1) && u.isEnd && !u.params.centeredSlides ? u.slideTo(u.slides.length - 1, 0, !1, !0) : u.slideTo(u.activeIndex, 0, !1, !0)) || b()
          } else u.params.autoHeight && u.updateAutoHeight()
        },
        u.onResize = function (a) {
          u.params.breakpoints && u.setBreakpoint();
          var b = u.params.allowSwipeToPrev,
          c = u.params.allowSwipeToNext;
          u.params.allowSwipeToPrev = u.params.allowSwipeToNext = !0,
          u.updateContainerSize(),
          u.updateSlidesSize(),
          ('auto' === u.params.slidesPerView || u.params.freeMode || a) && u.updatePagination(),
          u.params.scrollbar && u.scrollbar && u.scrollbar.set(),
          u.controller && u.controller.spline && (u.controller.spline = void 0);
          var d = !1;
          if (u.params.freeMode) {
            var e = Math.min(Math.max(u.translate, u.maxTranslate()), u.minTranslate());
            u.setWrapperTranslate(e),
            u.updateActiveIndex(),
            u.updateClasses(),
            u.params.autoHeight && u.updateAutoHeight()
          } else u.updateClasses(),
          d = ('auto' === u.params.slidesPerView || u.params.slidesPerView > 1) && u.isEnd && !u.params.centeredSlides ? u.slideTo(u.slides.length - 1, 0, !1, !0) : u.slideTo(u.activeIndex, 0, !1, !0);
          u.params.lazyLoading && !d && u.lazy && u.lazy.load(),
          u.params.allowSwipeToPrev = b,
          u.params.allowSwipeToNext = c
        };
        var w = [
          'mousedown',
          'mousemove',
          'mouseup'
        ];
        window.navigator.pointerEnabled ? w = [
          'pointerdown',
          'pointermove',
          'pointerup'
        ] : window.navigator.msPointerEnabled && (w = [
          'MSPointerDown',
          'MSPointerMove',
          'MSPointerUp'
        ]),
        u.touchEvents = {
          start: u.support.touch || !u.params.simulateTouch ? 'touchstart' : w[0],
          move: u.support.touch || !u.params.simulateTouch ? 'touchmove' : w[1],
          end: u.support.touch || !u.params.simulateTouch ? 'touchend' : w[2]
        },
        (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && ('container' === u.params.touchEventsTarget ? u.container : u.wrapper).addClass('swiper-wp8-' + u.params.direction),
        u.initEvents = function (a) {
          var b = a ? 'off' : 'on',
          c = a ? 'removeEventListener' : 'addEventListener',
          d = 'container' === u.params.touchEventsTarget ? u.container[0] : u.wrapper[0],
          f = u.support.touch ? d : document,
          g = !!u.params.nested;
          u.browser.ie ? (d[c](u.touchEvents.start, u.onTouchStart, !1), f[c](u.touchEvents.move, u.onTouchMove, g), f[c](u.touchEvents.end, u.onTouchEnd, !1)) : (u.support.touch && (d[c](u.touchEvents.start, u.onTouchStart, !1), d[c](u.touchEvents.move, u.onTouchMove, g), d[c](u.touchEvents.end, u.onTouchEnd, !1)), !e.simulateTouch || u.device.ios || u.device.android || (d[c]('mousedown', u.onTouchStart, !1), document[c]('mousemove', u.onTouchMove, g), document[c]('mouseup', u.onTouchEnd, !1))),
          window[c]('resize', u.onResize),
          u.params.nextButton && u.nextButton && u.nextButton.length > 0 && (u.nextButton[b]('click', u.onClickNext), u.params.a11y && u.a11y && u.nextButton[b]('keydown', u.a11y.onEnterKey)),
          u.params.prevButton && u.prevButton && u.prevButton.length > 0 && (u.prevButton[b]('click', u.onClickPrev), u.params.a11y && u.a11y && u.prevButton[b]('keydown', u.a11y.onEnterKey)),
          u.params.pagination && u.params.paginationClickable && (u.paginationContainer[b]('click', '.' + u.params.bulletClass, u.onClickIndex), u.params.a11y && u.a11y && u.paginationContainer[b]('keydown', '.' + u.params.bulletClass, u.a11y.onEnterKey)),
          (u.params.preventClicks || u.params.preventClicksPropagation) && d[c]('click', u.preventClicks, !0)
        },
        u.attachEvents = function () {
          u.initEvents()
        },
        u.detachEvents = function () {
          u.initEvents(!0)
        },
        u.allowClick = !0,
        u.preventClicks = function (a) {
          u.allowClick || (u.params.preventClicks && a.preventDefault(), u.params.preventClicksPropagation && u.animating && (a.stopPropagation(), a.stopImmediatePropagation()))
        },
        u.onClickNext = function (a) {
          a.preventDefault(),
          (!u.isEnd || u.params.loop) && u.slideNext()
        },
        u.onClickPrev = function (a) {
          a.preventDefault(),
          (!u.isBeginning || u.params.loop) && u.slidePrev()
        },
        u.onClickIndex = function (a) {
          a.preventDefault();
          var c = b(this).index() * u.params.slidesPerGroup;
          u.params.loop && (c += u.loopedSlides),
          u.slideTo(c)
        },
        u.updateClickedSlide = function (a) {
          var c = h(a, '.' + u.params.slideClass),
          d = !1;
          if (c) for (var e = 0; e < u.slides.length; e++) u.slides[e] === c && (d = !0);
          if (!c || !d) return u.clickedSlide = void 0,
          void (u.clickedIndex = void 0);
          if (u.clickedSlide = c, u.clickedIndex = b(c).index(), u.params.slideToClickedSlide && void 0 !== u.clickedIndex && u.clickedIndex !== u.activeIndex) {
            var f,
            g = u.clickedIndex;
            if (u.params.loop) {
              if (u.animating) return;
              f = b(u.clickedSlide).attr('data-swiper-slide-index'),
              u.params.centeredSlides ? g < u.loopedSlides - u.params.slidesPerView / 2 || g > u.slides.length - u.loopedSlides + u.params.slidesPerView / 2 ? (u.fixLoop(), g = u.wrapper.children('.' + u.params.slideClass + '[data-swiper-slide-index="' + f + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                u.slideTo(g)
              }, 0)) : u.slideTo(g) : g > u.slides.length - u.params.slidesPerView ? (u.fixLoop(), g = u.wrapper.children('.' + u.params.slideClass + '[data-swiper-slide-index="' + f + '"]:not(.swiper-slide-duplicate)').eq(0).index(), setTimeout(function () {
                u.slideTo(g)
              }, 0)) : u.slideTo(g)
            } else u.slideTo(g)
          }
        };
        var x,
        y,
        z,
        A,
        B,
        C,
        D,
        E,
        F,
        G,
        H = 'input, select, textarea, button',
        I = Date.now(),
        J = [
        ];
        u.animating = !1,
        u.touches = {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        };
        var K,
        L;
        if (u.onTouchStart = function (a) {
          if (a.originalEvent && (a = a.originalEvent), (K = 'touchstart' === a.type) || !('which' in a) || 3 !== a.which) {
            if (u.params.noSwiping && h(a, '.' + u.params.noSwipingClass)) return void (u.allowClick = !0);
            if (!u.params.swipeHandler || h(a, u.params.swipeHandler)) {
              var c = u.touches.currentX = 'touchstart' === a.type ? a.targetTouches[0].pageX : a.pageX,
              d = u.touches.currentY = 'touchstart' === a.type ? a.targetTouches[0].pageY : a.pageY;
              if (!(u.device.ios && u.params.iOSEdgeSwipeDetection && c <= u.params.iOSEdgeSwipeThreshold)) {
                if (x = !0, y = !1, z = !0, B = void 0, L = void 0, u.touches.startX = c, u.touches.startY = d, A = Date.now(), u.allowClick = !0, u.updateContainerSize(), u.swipeDirection = void 0, u.params.threshold > 0 && (E = !1), 'touchstart' !== a.type) {
                  var e = !0;
                  b(a.target).is(H) && (e = !1),
                  document.activeElement && b(document.activeElement).is(H) && document.activeElement.blur(),
                  e && a.preventDefault()
                }
                u.emit('onTouchStart', u, a)
              }
            }
          }
        }, u.onTouchMove = function (a) {
          if (a.originalEvent && (a = a.originalEvent), !K || 'mousemove' !== a.type) {
            if (a.preventedByNestedSwiper) return u.touches.startX = 'touchmove' === a.type ? a.targetTouches[0].pageX : a.pageX,
            void (u.touches.startY = 'touchmove' === a.type ? a.targetTouches[0].pageY : a.pageY);
            if (u.params.onlyExternal) return u.allowClick = !1,
            void (x && (u.touches.startX = u.touches.currentX = 'touchmove' === a.type ? a.targetTouches[0].pageX : a.pageX, u.touches.startY = u.touches.currentY = 'touchmove' === a.type ? a.targetTouches[0].pageY : a.pageY, A = Date.now()));
            if (K && document.activeElement && a.target === document.activeElement && b(a.target).is(H)) return y = !0,
            void (u.allowClick = !1);
            if (z && u.emit('onTouchMove', u, a), !(a.targetTouches && a.targetTouches.length > 1)) {
              if (u.touches.currentX = 'touchmove' === a.type ? a.targetTouches[0].pageX : a.pageX, u.touches.currentY = 'touchmove' === a.type ? a.targetTouches[0].pageY : a.pageY, void 0 === B) {
                var c = 180 * Math.atan2(Math.abs(u.touches.currentY - u.touches.startY), Math.abs(u.touches.currentX - u.touches.startX)) / Math.PI;
                B = u.isHorizontal() ? c > u.params.touchAngle : 90 - c > u.params.touchAngle
              }
              if (B && u.emit('onTouchMoveOpposite', u, a), void 0 === L && u.browser.ieTouch && (u.touches.currentX !== u.touches.startX || u.touches.currentY !== u.touches.startY) && (L = !0), x) {
                if (B) return void (x = !1);
                if (L || !u.browser.ieTouch) {
                  u.allowClick = !1,
                  u.emit('onSliderMove', u, a),
                  a.preventDefault(),
                  u.params.touchMoveStopPropagation && !u.params.nested && a.stopPropagation(),
                  y || (e.loop && u.fixLoop(), D = u.getWrapperTranslate(), u.setWrapperTransition(0), u.animating && u.wrapper.trigger('webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd'), u.params.autoplay && u.autoplaying && (u.params.autoplayDisableOnInteraction ? u.stopAutoplay() : u.pauseAutoplay()), G = !1, u.params.grabCursor && (u.container[0].style.cursor = 'move', u.container[0].style.cursor = '-webkit-grabbing', u.container[0].style.cursor = '-moz-grabbin', u.container[0].style.cursor = 'grabbing')),
                  y = !0;
                  var d = u.touches.diff = u.isHorizontal() ? u.touches.currentX - u.touches.startX : u.touches.currentY - u.touches.startY;
                  d *= u.params.touchRatio,
                  u.rtl && (d = - d),
                  u.swipeDirection = d > 0 ? 'prev' : 'next',
                  C = d + D;
                  var f = !0;
                  if (d > 0 && C > u.minTranslate() ? (f = !1, u.params.resistance && (C = u.minTranslate() - 1 + Math.pow( - u.minTranslate() + D + d, u.params.resistanceRatio))) : 0 > d && C < u.maxTranslate() && (f = !1, u.params.resistance && (C = u.maxTranslate() + 1 - Math.pow(u.maxTranslate() - D - d, u.params.resistanceRatio))), f && (a.preventedByNestedSwiper = !0), !u.params.allowSwipeToNext && 'next' === u.swipeDirection && D > C && (C = D), !u.params.allowSwipeToPrev && 'prev' === u.swipeDirection && C > D && (C = D), u.params.followFinger) {
                    if (u.params.threshold > 0) {
                      if (!(Math.abs(d) > u.params.threshold || E)) return void (C = D);
                      if (!E) return E = !0,
                      u.touches.startX = u.touches.currentX,
                      u.touches.startY = u.touches.currentY,
                      C = D,
                      void (u.touches.diff = u.isHorizontal() ? u.touches.currentX - u.touches.startX : u.touches.currentY - u.touches.startY)
                    }(u.params.freeMode || u.params.watchSlidesProgress) && u.updateActiveIndex(),
                    u.params.freeMode && (0 === J.length && J.push({
                      position: u.touches[u.isHorizontal() ? 'startX' : 'startY'],
                      time: A
                    }), J.push({
                      position: u.touches[u.isHorizontal() ? 'currentX' : 'currentY'],
                      time: (new window.Date).getTime()
                    })),
                    u.updateProgress(C),
                    u.setWrapperTranslate(C)
                  }
                }
              }
            }
          }
        }, u.onTouchEnd = function (a) {
          if (a.originalEvent && (a = a.originalEvent), z && u.emit('onTouchEnd', u, a), z = !1, x) {
            u.params.grabCursor && y && x && (u.container[0].style.cursor = 'move', u.container[0].style.cursor = '-webkit-grab', u.container[0].style.cursor = '-moz-grab', u.container[0].style.cursor = 'grab');
            var c = Date.now(),
            d = c - A;
            if (u.allowClick && (u.updateClickedSlide(a), u.emit('onTap', u, a), 300 > d && c - I > 300 && (F && clearTimeout(F), F = setTimeout(function () {
              u && (u.params.paginationHide && u.paginationContainer.length > 0 && !b(a.target).hasClass(u.params.bulletClass) && u.paginationContainer.toggleClass(u.params.paginationHiddenClass), u.emit('onClick', u, a))
            }, 300)), 300 > d && 300 > c - I && (F && clearTimeout(F), u.emit('onDoubleTap', u, a))), I = Date.now(), setTimeout(function () {
              u && (u.allowClick = !0)
            }, 0), !x || !y || !u.swipeDirection || 0 === u.touches.diff || C === D) return void (x = y = !1);
            x = y = !1;
            var e;
            if (e = u.params.followFinger ? u.rtl ? u.translate : - u.translate : - C, u.params.freeMode) {
              if (e < - u.minTranslate()) return void u.slideTo(u.activeIndex);
              if (e > - u.maxTranslate()) return void (u.slides.length < u.snapGrid.length ? u.slideTo(u.snapGrid.length - 1) : u.slideTo(u.slides.length - 1));
              if (u.params.freeModeMomentum) {
                if (J.length > 1) {
                  var f = J.pop(),
                  g = J.pop(),
                  h = f.position - g.position,
                  i = f.time - g.time;
                  u.velocity = h / i,
                  u.velocity = u.velocity / 2,
                  Math.abs(u.velocity) < u.params.freeModeMinimumVelocity && (u.velocity = 0),
                  (i > 150 || (new window.Date).getTime() - f.time > 300) && (u.velocity = 0)
                } else u.velocity = 0;
                J.length = 0;
                var j = 1000 * u.params.freeModeMomentumRatio,
                k = u.velocity * j,
                l = u.translate + k;
                u.rtl && (l = - l);
                var m,
                n = !1,
                o = 20 * Math.abs(u.velocity) * u.params.freeModeMomentumBounceRatio;
                if (l < u.maxTranslate()) u.params.freeModeMomentumBounce ? (l + u.maxTranslate() < - o && (l = u.maxTranslate() - o), m = u.maxTranslate(), n = !0, G = !0) : l = u.maxTranslate();
                 else if (l > u.minTranslate()) u.params.freeModeMomentumBounce ? (l - u.minTranslate() > o && (l = u.minTranslate() + o), m = u.minTranslate(), n = !0, G = !0) : l = u.minTranslate();
                 else if (u.params.freeModeSticky) {
                  var p,
                  q = 0;
                  for (q = 0; q < u.snapGrid.length; q += 1) if (u.snapGrid[q] > - l) {
                    p = q;
                    break
                  }
                  l = Math.abs(u.snapGrid[p] - l) < Math.abs(u.snapGrid[p - 1] - l) || 'next' === u.swipeDirection ? u.snapGrid[p] : u.snapGrid[p - 1],
                  u.rtl || (l = - l)
                }
                if (0 !== u.velocity) j = u.rtl ? Math.abs(( - l - u.translate) / u.velocity) : Math.abs((l - u.translate) / u.velocity);
                 else if (u.params.freeModeSticky) return void u.slideReset();
                u.params.freeModeMomentumBounce && n ? (u.updateProgress(m), u.setWrapperTransition(j), u.setWrapperTranslate(l), u.onTransitionStart(), u.animating = !0, u.wrapper.transitionEnd(function () {
                  u && G && (u.emit('onMomentumBounce', u), u.setWrapperTransition(u.params.speed), u.setWrapperTranslate(m), u.wrapper.transitionEnd(function () {
                    u && u.onTransitionEnd()
                  }))
                })) : u.velocity ? (u.updateProgress(l), u.setWrapperTransition(j), u.setWrapperTranslate(l), u.onTransitionStart(), u.animating || (u.animating = !0, u.wrapper.transitionEnd(function () {
                  u && u.onTransitionEnd()
                }))) : u.updateProgress(l),
                u.updateActiveIndex()
              }
              return void ((!u.params.freeModeMomentum || d >= u.params.longSwipesMs) && (u.updateProgress(), u.updateActiveIndex()))
            }
            var r,
            s = 0,
            t = u.slidesSizesGrid[0];
            for (r = 0; r < u.slidesGrid.length; r += u.params.slidesPerGroup) void 0 !== u.slidesGrid[r + u.params.slidesPerGroup] ? e >= u.slidesGrid[r] && e < u.slidesGrid[r + u.params.slidesPerGroup] && (s = r, t = u.slidesGrid[r + u.params.slidesPerGroup] - u.slidesGrid[r]) : e >= u.slidesGrid[r] && (s = r, t = u.slidesGrid[u.slidesGrid.length - 1] - u.slidesGrid[u.slidesGrid.length - 2]);
            var v = (e - u.slidesGrid[s]) / t;
            if (d > u.params.longSwipesMs) {
              if (!u.params.longSwipes) return void u.slideTo(u.activeIndex);
              'next' === u.swipeDirection && (v >= u.params.longSwipesRatio ? u.slideTo(s + u.params.slidesPerGroup) : u.slideTo(s)),
              'prev' === u.swipeDirection && (v > 1 - u.params.longSwipesRatio ? u.slideTo(s + u.params.slidesPerGroup) : u.slideTo(s))
            } else {
              if (!u.params.shortSwipes) return void u.slideTo(u.activeIndex);
              'next' === u.swipeDirection && u.slideTo(s + u.params.slidesPerGroup),
              'prev' === u.swipeDirection && u.slideTo(s)
            }
          }
        }, u._slideTo = function (a, b) {
          return u.slideTo(a, b, !0, !0)
        }, u.slideTo = function (a, b, c, d) {
          void 0 === c && (c = !0),
          void 0 === a && (a = 0),
          0 > a && (a = 0),
          u.snapIndex = Math.floor(a / u.params.slidesPerGroup),
          u.snapIndex >= u.snapGrid.length && (u.snapIndex = u.snapGrid.length - 1);
          var e = - u.snapGrid[u.snapIndex];
          u.params.autoplay && u.autoplaying && (d || !u.params.autoplayDisableOnInteraction ? u.pauseAutoplay(b) : u.stopAutoplay()),
          u.updateProgress(e);
          for (var f = 0; f < u.slidesGrid.length; f++) - Math.floor(100 * e) >= Math.floor(100 * u.slidesGrid[f]) && (a = f);
          return !(!u.params.allowSwipeToNext && e < u.translate && e < u.minTranslate()) && (!(!u.params.allowSwipeToPrev && e > u.translate && e > u.maxTranslate() && (u.activeIndex || 0) !== a) && (void 0 === b && (b = u.params.speed), u.previousIndex = u.activeIndex || 0, u.activeIndex = a, u.rtl && - e === u.translate || !u.rtl && e === u.translate ? (u.params.autoHeight && u.updateAutoHeight(), u.updateClasses(), 'slide' !== u.params.effect && u.setWrapperTranslate(e), !1) : (u.updateClasses(), u.onTransitionStart(c), 0 === b ? (u.setWrapperTranslate(e), u.setWrapperTransition(0), u.onTransitionEnd(c)) : (u.setWrapperTranslate(e), u.setWrapperTransition(b), u.animating || (u.animating = !0, u.wrapper.transitionEnd(function () {
            u && u.onTransitionEnd(c)
          }))), !0)))
        }, u.onTransitionStart = function (a) {
          void 0 === a && (a = !0),
          u.params.autoHeight && u.updateAutoHeight(),
          u.lazy && u.lazy.onTransitionStart(),
          a && (u.emit('onTransitionStart', u), u.activeIndex !== u.previousIndex && (u.emit('onSlideChangeStart', u), u.activeIndex > u.previousIndex ? u.emit('onSlideNextStart', u) : u.emit('onSlidePrevStart', u)))
        }, u.onTransitionEnd = function (a) {
          u.animating = !1,
          u.setWrapperTransition(0),
          void 0 === a && (a = !0),
          u.lazy && u.lazy.onTransitionEnd(),
          a && (u.emit('onTransitionEnd', u), u.activeIndex !== u.previousIndex && (u.emit('onSlideChangeEnd', u), u.activeIndex > u.previousIndex ? u.emit('onSlideNextEnd', u) : u.emit('onSlidePrevEnd', u))),
          u.params.hashnav && u.hashnav && u.hashnav.setHash()
        }, u.slideNext = function (a, b, c) {
          return u.params.loop ? !u.animating && (u.fixLoop(), u.container[0].clientLeft, u.slideTo(u.activeIndex + u.params.slidesPerGroup, b, a, c)) : u.slideTo(u.activeIndex + u.params.slidesPerGroup, b, a, c)
        }, u._slideNext = function (a) {
          return u.slideNext(!0, a, !0)
        }, u.slidePrev = function (a, b, c) {
          return u.params.loop ? !u.animating && (u.fixLoop(), u.container[0].clientLeft, u.slideTo(u.activeIndex - 1, b, a, c)) : u.slideTo(u.activeIndex - 1, b, a, c)
        }, u._slidePrev = function (a) {
          return u.slidePrev(!0, a, !0)
        }, u.slideReset = function (a, b, c) {
          return u.slideTo(u.activeIndex, b, a)
        }, u.setWrapperTransition = function (a, b) {
          u.wrapper.transition(a),
          'slide' !== u.params.effect && u.effects[u.params.effect] && u.effects[u.params.effect].setTransition(a),
          u.params.parallax && u.parallax && u.parallax.setTransition(a),
          u.params.scrollbar && u.scrollbar && u.scrollbar.setTransition(a),
          u.params.control && u.controller && u.controller.setTransition(a, b),
          u.emit('onSetTransition', u, a)
        }, u.setWrapperTranslate = function (a, b, c) {
          var d = 0,
          e = 0;
          u.isHorizontal() ? d = u.rtl ? - a : a : e = a,
          u.params.roundLengths && (d = f(d), e = f(e)),
          u.params.virtualTranslate || (u.support.transforms3d ? u.wrapper.transform('translate3d(' + d + 'px, ' + e + 'px, 0px)') : u.wrapper.transform('translate(' + d + 'px, ' + e + 'px)')),
          u.translate = u.isHorizontal() ? d : e;
          var g,
          h = u.maxTranslate() - u.minTranslate();
          g = 0 === h ? 0 : (a - u.minTranslate()) / h,
          g !== u.progress && u.updateProgress(a),
          b && u.updateActiveIndex(),
          'slide' !== u.params.effect && u.effects[u.params.effect] && u.effects[u.params.effect].setTranslate(u.translate),
          u.params.parallax && u.parallax && u.parallax.setTranslate(u.translate),
          u.params.scrollbar && u.scrollbar && u.scrollbar.setTranslate(u.translate),
          u.params.control && u.controller && u.controller.setTranslate(u.translate, c),
          u.emit('onSetTranslate', u, u.translate)
        }, u.getTranslate = function (a, b) {
          var c,
          d,
          e,
          f;
          return void 0 === b && (b = 'x'),
          u.params.virtualTranslate ? u.rtl ? - u.translate : u.translate : (e = window.getComputedStyle(a, null), window.WebKitCSSMatrix ? (d = e.transform || e.webkitTransform, d.split(',').length > 6 && (d = d.split(', ').map(function (a) {
            return a.replace(',', '.')
          }).join(', ')), f = new window.WebKitCSSMatrix('none' === d ? '' : d)) : (f = e.MozTransform || e.OTransform || e.MsTransform || e.msTransform || e.transform || e.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,'), c = f.toString().split(',')), 'x' === b && (d = window.WebKitCSSMatrix ? f.m41 : 16 === c.length ? parseFloat(c[12]) : parseFloat(c[4])), 'y' === b && (d = window.WebKitCSSMatrix ? f.m42 : 16 === c.length ? parseFloat(c[13]) : parseFloat(c[5])), u.rtl && d && (d = - d), d || 0)
        }, u.getWrapperTranslate = function (a) {
          return void 0 === a && (a = u.isHorizontal() ? 'x' : 'y'),
          u.getTranslate(u.wrapper[0], a)
        }, u.observers = [
        ], u.initObservers = function () {
          if (u.params.observeParents) for (var a = u.container.parents(), b = 0; b < a.length; b++) i(a[b]);
          i(u.container[0], {
            childList: !1
          }),
          i(u.wrapper[0], {
            attributes: !1
          })
        }, u.disconnectObservers = function () {
          for (var a = 0; a < u.observers.length; a++) u.observers[a].disconnect();
          u.observers = [
          ]
        }, u.createLoop = function () {
          u.wrapper.children('.' + u.params.slideClass + '.' + u.params.slideDuplicateClass).remove();
          var a = u.wrapper.children('.' + u.params.slideClass);
          'auto' !== u.params.slidesPerView || u.params.loopedSlides || (u.params.loopedSlides = a.length),
          u.loopedSlides = parseInt(u.params.loopedSlides || u.params.slidesPerView, 10),
          u.loopedSlides = u.loopedSlides + u.params.loopAdditionalSlides,
          u.loopedSlides > a.length && (u.loopedSlides = a.length);
          var c,
          d = [
          ],
          e = [
          ];
          for (a.each(function (c, f) {
            var g = b(this);
            c < u.loopedSlides && e.push(f),
            c < a.length && c >= a.length - u.loopedSlides && d.push(f),
            g.attr('data-swiper-slide-index', c)
          }), c = 0; c < e.length; c++) u.wrapper.append(b(e[c].cloneNode(!0)).addClass(u.params.slideDuplicateClass));
          for (c = d.length - 1; c >= 0; c--) u.wrapper.prepend(b(d[c].cloneNode(!0)).addClass(u.params.slideDuplicateClass))
        }, u.destroyLoop = function () {
          u.wrapper.children('.' + u.params.slideClass + '.' + u.params.slideDuplicateClass).remove(),
          u.slides.removeAttr('data-swiper-slide-index')
        }, u.reLoop = function (a) {
          var b = u.activeIndex - u.loopedSlides;
          u.destroyLoop(),
          u.createLoop(),
          u.updateSlidesSize(),
          a && u.slideTo(b + u.loopedSlides, 0, !1)
        }, u.fixLoop = function () {
          var a;
          u.activeIndex < u.loopedSlides ? (a = u.slides.length - 3 * u.loopedSlides + u.activeIndex, a += u.loopedSlides, u.slideTo(a, 0, !1, !0)) : ('auto' === u.params.slidesPerView && u.activeIndex >= 2 * u.loopedSlides || u.activeIndex > u.slides.length - 2 * u.params.slidesPerView) && (a = - u.slides.length + u.activeIndex + u.loopedSlides, a += u.loopedSlides, u.slideTo(a, 0, !1, !0))
        }, u.appendSlide = function (a) {
          if (u.params.loop && u.destroyLoop(), 'object' == typeof a && a.length) for (var b = 0; b < a.length; b++) a[b] && u.wrapper.append(a[b]);
           else u.wrapper.append(a);
          u.params.loop && u.createLoop(),
          u.params.observer && u.support.observer || u.update(!0)
        }, u.prependSlide = function (a) {
          u.params.loop && u.destroyLoop();
          var b = u.activeIndex + 1;
          if ('object' == typeof a && a.length) {
            for (var c = 0; c < a.length; c++) a[c] && u.wrapper.prepend(a[c]);
            b = u.activeIndex + a.length
          } else u.wrapper.prepend(a);
          u.params.loop && u.createLoop(),
          u.params.observer && u.support.observer || u.update(!0),
          u.slideTo(b, 0, !1)
        }, u.removeSlide = function (a) {
          u.params.loop && (u.destroyLoop(), u.slides = u.wrapper.children('.' + u.params.slideClass));
          var b,
          c = u.activeIndex;
          if ('object' == typeof a && a.length) {
            for (var d = 0; d < a.length; d++) b = a[d],
            u.slides[b] && u.slides.eq(b).remove(),
            c > b && c--;
            c = Math.max(c, 0)
          } else b = a,
          u.slides[b] && u.slides.eq(b).remove(),
          c > b && c--,
          c = Math.max(c, 0);
          u.params.loop && u.createLoop(),
          u.params.observer && u.support.observer || u.update(!0),
          u.params.loop ? u.slideTo(c + u.loopedSlides, 0, !1) : u.slideTo(c, 0, !1)
        }, u.removeAllSlides = function () {
          for (var a = [
          ], b = 0; b < u.slides.length; b++) a.push(b);
          u.removeSlide(a)
        }, u.effects = {
          fade: {
            setTranslate: function () {
              for (var a = 0; a < u.slides.length; a++) {
                var b = u.slides.eq(a),
                c = b[0].swiperSlideOffset,
                d = - c;
                u.params.virtualTranslate || (d -= u.translate);
                var e = 0;
                u.isHorizontal() || (e = d, d = 0);
                var f = u.params.fade.crossFade ? Math.max(1 - Math.abs(b[0].progress), 0) : 1 + Math.min(Math.max(b[0].progress, - 1), 0);
                b.css({
                  opacity: f
                }).transform('translate3d(' + d + 'px, ' + e + 'px, 0px)')
              }
            },
            setTransition: function (a) {
              if (u.slides.transition(a), u.params.virtualTranslate && 0 !== a) {
                var b = !1;
                u.slides.transitionEnd(function () {
                  if (!b && u) {
                    b = !0,
                    u.animating = !1;
                    for (var a = [
                      'webkitTransitionEnd',
                      'transitionend',
                      'oTransitionEnd',
                      'MSTransitionEnd',
                      'msTransitionEnd'
                    ], c = 0; c < a.length; c++) u.wrapper.trigger(a[c])
                  }
                })
              }
            }
          },
          flip: {
            setTranslate: function () {
              for (var a = 0; a < u.slides.length; a++) {
                var c = u.slides.eq(a),
                d = c[0].progress;
                u.params.flip.limitRotation && (d = Math.max(Math.min(c[0].progress, 1), - 1));
                var e = c[0].swiperSlideOffset,
                f = - 180 * d,
                g = f,
                h = 0,
                i = - e,
                j = 0;
                if (u.isHorizontal() ? u.rtl && (g = - g) : (j = i, i = 0, h = - g, g = 0), c[0].style.zIndex = - Math.abs(Math.round(d)) + u.slides.length, u.params.flip.slideShadows) {
                  var k = u.isHorizontal() ? c.find('.swiper-slide-shadow-left') : c.find('.swiper-slide-shadow-top'),
                  l = u.isHorizontal() ? c.find('.swiper-slide-shadow-right') : c.find('.swiper-slide-shadow-bottom');
                  0 === k.length && (k = b('<div class="swiper-slide-shadow-' + (u.isHorizontal() ? 'left' : 'top') + '"></div>'), c.append(k)),
                  0 === l.length && (l = b('<div class="swiper-slide-shadow-' + (u.isHorizontal() ? 'right' : 'bottom') + '"></div>'), c.append(l)),
                  k.length && (k[0].style.opacity = Math.max( - d, 0)),
                  l.length && (l[0].style.opacity = Math.max(d, 0))
                }
                c.transform('translate3d(' + i + 'px, ' + j + 'px, 0px) rotateX(' + h + 'deg) rotateY(' + g + 'deg)')
              }
            },
            setTransition: function (a) {
              if (u.slides.transition(a).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(a), u.params.virtualTranslate && 0 !== a) {
                var c = !1;
                u.slides.eq(u.activeIndex).transitionEnd(function () {
                  if (!c && u && b(this).hasClass(u.params.slideActiveClass)) {
                    c = !0,
                    u.animating = !1;
                    for (var a = [
                      'webkitTransitionEnd',
                      'transitionend',
                      'oTransitionEnd',
                      'MSTransitionEnd',
                      'msTransitionEnd'
                    ], d = 0; d < a.length; d++) u.wrapper.trigger(a[d])
                  }
                })
              }
            }
          },
          cube: {
            setTranslate: function () {
              var a,
              c = 0;
              u.params.cube.shadow && (u.isHorizontal() ? (a = u.wrapper.find('.swiper-cube-shadow'), 0 === a.length && (a = b('<div class="swiper-cube-shadow"></div>'), u.wrapper.append(a)), a.css({
                height: u.width + 'px'
              })) : (a = u.container.find('.swiper-cube-shadow'), 0 === a.length && (a = b('<div class="swiper-cube-shadow"></div>'), u.container.append(a))));
              for (var d = 0; d < u.slides.length; d++) {
                var e = u.slides.eq(d),
                f = 90 * d,
                g = Math.floor(f / 360);
                u.rtl && (f = - f, g = Math.floor( - f / 360));
                var h = Math.max(Math.min(e[0].progress, 1), - 1),
                i = 0,
                j = 0,
                k = 0;
                d % 4 == 0 ? (i = 4 * - g * u.size, k = 0) : (d - 1) % 4 == 0 ? (i = 0, k = 4 * - g * u.size) : (d - 2) % 4 == 0 ? (i = u.size + 4 * g * u.size, k = u.size) : (d - 3) % 4 == 0 && (i = - u.size, k = 3 * u.size + 4 * u.size * g),
                u.rtl && (i = - i),
                u.isHorizontal() || (j = i, i = 0);
                var l = 'rotateX(' + (u.isHorizontal() ? 0 : - f) + 'deg) rotateY(' + (u.isHorizontal() ? f : 0) + 'deg) translate3d(' + i + 'px, ' + j + 'px, ' + k + 'px)';
                if (1 >= h && h > - 1 && (c = 90 * d + 90 * h, u.rtl && (c = 90 * - d - 90 * h)), e.transform(l), u.params.cube.slideShadows) {
                  var m = u.isHorizontal() ? e.find('.swiper-slide-shadow-left') : e.find('.swiper-slide-shadow-top'),
                  n = u.isHorizontal() ? e.find('.swiper-slide-shadow-right') : e.find('.swiper-slide-shadow-bottom');
                  0 === m.length && (m = b('<div class="swiper-slide-shadow-' + (u.isHorizontal() ? 'left' : 'top') + '"></div>'), e.append(m)),
                  0 === n.length && (n = b('<div class="swiper-slide-shadow-' + (u.isHorizontal() ? 'right' : 'bottom') + '"></div>'), e.append(n)),
                  m.length && (m[0].style.opacity = Math.max( - h, 0)),
                  n.length && (n[0].style.opacity = Math.max(h, 0))
                }
              }
              if (u.wrapper.css({
                '-webkit-transform-origin': '50% 50% -' + u.size / 2 + 'px',
                '-moz-transform-origin': '50% 50% -' + u.size / 2 + 'px',
                '-ms-transform-origin': '50% 50% -' + u.size / 2 + 'px',
                'transform-origin': '50% 50% -' + u.size / 2 + 'px'
              }), u.params.cube.shadow) if (u.isHorizontal()) a.transform('translate3d(0px, ' + (u.width / 2 + u.params.cube.shadowOffset) + 'px, ' + - u.width / 2 + 'px) rotateX(90deg) rotateZ(0deg) scale(' + u.params.cube.shadowScale + ')');
               else {
                var o = Math.abs(c) - 90 * Math.floor(Math.abs(c) / 90),
                p = 1.5 - (Math.sin(2 * o * Math.PI / 360) / 2 + Math.cos(2 * o * Math.PI / 360) / 2),
                q = u.params.cube.shadowScale,
                r = u.params.cube.shadowScale / p,
                s = u.params.cube.shadowOffset;
                a.transform('scale3d(' + q + ', 1, ' + r + ') translate3d(0px, ' + (u.height / 2 + s) + 'px, ' + - u.height / 2 / r + 'px) rotateX(-90deg)')
              }
              var t = u.isSafari || u.isUiWebView ? - u.size / 2 : 0;
              u.wrapper.transform('translate3d(0px,0,' + t + 'px) rotateX(' + (u.isHorizontal() ? 0 : c) + 'deg) rotateY(' + (u.isHorizontal() ? - c : 0) + 'deg)')
            },
            setTransition: function (a) {
              u.slides.transition(a).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(a),
              u.params.cube.shadow && !u.isHorizontal() && u.container.find('.swiper-cube-shadow').transition(a)
            }
          },
          coverflow: {
            setTranslate: function () {
              for (var a = u.translate, c = u.isHorizontal() ? - a + u.width / 2 : - a + u.height / 2, d = u.isHorizontal() ? u.params.coverflow.rotate : - u.params.coverflow.rotate, e = u.params.coverflow.depth, f = 0, g = u.slides.length; g > f; f++) {
                var h = u.slides.eq(f),
                i = u.slidesSizesGrid[f],
                j = h[0].swiperSlideOffset,
                k = (c - j - i / 2) / i * u.params.coverflow.modifier,
                l = u.isHorizontal() ? d * k : 0,
                m = u.isHorizontal() ? 0 : d * k,
                n = - e * Math.abs(k),
                o = u.isHorizontal() ? 0 : u.params.coverflow.stretch * k,
                p = u.isHorizontal() ? u.params.coverflow.stretch * k : 0;
                Math.abs(p) < 0.001 && (p = 0),
                Math.abs(o) < 0.001 && (o = 0),
                Math.abs(n) < 0.001 && (n = 0),
                Math.abs(l) < 0.001 && (l = 0),
                Math.abs(m) < 0.001 && (m = 0);
                var q = 'translate3d(' + p + 'px,' + o + 'px,' + n + 'px)  rotateX(' + m + 'deg) rotateY(' + l + 'deg)';
                if (h.transform(q), h[0].style.zIndex = 1 - Math.abs(Math.round(k)), u.params.coverflow.slideShadows) {
                  var r = u.isHorizontal() ? h.find('.swiper-slide-shadow-left') : h.find('.swiper-slide-shadow-top'),
                  s = u.isHorizontal() ? h.find('.swiper-slide-shadow-right') : h.find('.swiper-slide-shadow-bottom');
                  0 === r.length && (r = b('<div class="swiper-slide-shadow-' + (u.isHorizontal() ? 'left' : 'top') + '"></div>'), h.append(r)),
                  0 === s.length && (s = b('<div class="swiper-slide-shadow-' + (u.isHorizontal() ? 'right' : 'bottom') + '"></div>'), h.append(s)),
                  r.length && (r[0].style.opacity = k > 0 ? k : 0),
                  s.length && (s[0].style.opacity = - k > 0 ? - k : 0)
                }
              }
              if (u.browser.ie) {
                u.wrapper[0].style.perspectiveOrigin = c + 'px 50%'
              }
            },
            setTransition: function (a) {
              u.slides.transition(a).find('.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left').transition(a)
            }
          }
        }, u.lazy = {
          initialImageLoaded: !1,
          loadImageInSlide: function (a, c) {
            if (void 0 !== a && (void 0 === c && (c = !0), 0 !== u.slides.length)) {
              var d = u.slides.eq(a),
              e = d.find('.swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)');
              !d.hasClass('swiper-lazy') || d.hasClass('swiper-lazy-loaded') || d.hasClass('swiper-lazy-loading') || (e = e.add(d[0])),
              0 !== e.length && e.each(function () {
                var a = b(this);
                a.addClass('swiper-lazy-loading');
                var e = a.attr('data-background'),
                f = a.attr('data-src'),
                g = a.attr('data-srcset');
                u.loadImage(a[0], f || e, g, !1, function () {
                  if (e ? (a.css('background-image', 'url("' + e + '")'), a.removeAttr('data-background')) : (g && (a.attr('srcset', g), a.removeAttr('data-srcset')), f && (a.attr('src', f), a.removeAttr('data-src'))), a.addClass('swiper-lazy-loaded').removeClass('swiper-lazy-loading'), d.find('.swiper-lazy-preloader, .preloader').remove(), u.params.loop && c) {
                    var b = d.attr('data-swiper-slide-index');
                    if (d.hasClass(u.params.slideDuplicateClass)) {
                      var h = u.wrapper.children('[data-swiper-slide-index="' + b + '"]:not(.' + u.params.slideDuplicateClass + ')');
                      u.lazy.loadImageInSlide(h.index(), !1)
                    } else {
                      var i = u.wrapper.children('.' + u.params.slideDuplicateClass + '[data-swiper-slide-index="' + b + '"]');
                      u.lazy.loadImageInSlide(i.index(), !1)
                    }
                  }
                  u.emit('onLazyImageReady', u, d[0], a[0])
                }),
                u.emit('onLazyImageLoad', u, d[0], a[0])
              })
            }
          },
          load: function () {
            var a;
            if (u.params.watchSlidesVisibility) u.wrapper.children('.' + u.params.slideVisibleClass).each(function () {
              u.lazy.loadImageInSlide(b(this).index())
            });
             else if (u.params.slidesPerView > 1) for (a = u.activeIndex; a < u.activeIndex + u.params.slidesPerView; a++) u.slides[a] && u.lazy.loadImageInSlide(a);
             else u.lazy.loadImageInSlide(u.activeIndex);
            if (u.params.lazyLoadingInPrevNext) if (u.params.slidesPerView > 1 || u.params.lazyLoadingInPrevNextAmount && u.params.lazyLoadingInPrevNextAmount > 1) {
              var c = u.params.lazyLoadingInPrevNextAmount,
              d = u.params.slidesPerView,
              e = Math.min(u.activeIndex + d + Math.max(c, d), u.slides.length),
              f = Math.max(u.activeIndex - Math.max(d, c), 0);
              for (a = u.activeIndex + u.params.slidesPerView; e > a; a++) u.slides[a] && u.lazy.loadImageInSlide(a);
              for (a = f; a < u.activeIndex; a++) u.slides[a] && u.lazy.loadImageInSlide(a)
            } else {
              var g = u.wrapper.children('.' + u.params.slideNextClass)
              ;
              g.length > 0 && u.lazy.loadImageInSlide(g.index());
              var h = u.wrapper.children('.' + u.params.slidePrevClass);
              h.length > 0 && u.lazy.loadImageInSlide(h.index())
            }
          },
          onTransitionStart: function () {
            u.params.lazyLoading && (u.params.lazyLoadingOnTransitionStart || !u.params.lazyLoadingOnTransitionStart && !u.lazy.initialImageLoaded) && u.lazy.load()
          },
          onTransitionEnd: function () {
            u.params.lazyLoading && !u.params.lazyLoadingOnTransitionStart && u.lazy.load()
          }
        }, u.scrollbar = {
          isTouched: !1,
          setDragPosition: function (a) {
            var b = u.scrollbar,
            c = u.isHorizontal() ? 'touchstart' === a.type || 'touchmove' === a.type ? a.targetTouches[0].pageX : a.pageX || a.clientX : 'touchstart' === a.type || 'touchmove' === a.type ? a.targetTouches[0].pageY : a.pageY || a.clientY,
            d = c - b.track.offset() [u.isHorizontal() ? 'left' : 'top'] - b.dragSize / 2,
            e = - u.minTranslate() * b.moveDivider,
            f = - u.maxTranslate() * b.moveDivider;
            e > d ? d = e : d > f && (d = f),
            d = - d / b.moveDivider,
            u.updateProgress(d),
            u.setWrapperTranslate(d, !0)
          },
          dragStart: function (a) {
            var b = u.scrollbar;
            b.isTouched = !0,
            a.preventDefault(),
            a.stopPropagation(),
            b.setDragPosition(a),
            clearTimeout(b.dragTimeout),
            b.track.transition(0),
            u.params.scrollbarHide && b.track.css('opacity', 1),
            u.wrapper.transition(100),
            b.drag.transition(100),
            u.emit('onScrollbarDragStart', u)
          },
          dragMove: function (a) {
            var b = u.scrollbar;
            b.isTouched && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, b.setDragPosition(a), u.wrapper.transition(0), b.track.transition(0), b.drag.transition(0), u.emit('onScrollbarDragMove', u))
          },
          dragEnd: function (a) {
            var b = u.scrollbar;
            b.isTouched && (b.isTouched = !1, u.params.scrollbarHide && (clearTimeout(b.dragTimeout), b.dragTimeout = setTimeout(function () {
              b.track.css('opacity', 0),
              b.track.transition(400)
            }, 1000)), u.emit('onScrollbarDragEnd', u), u.params.scrollbarSnapOnRelease && u.slideReset())
          },
          enableDraggable: function () {
            var a = u.scrollbar,
            c = u.support.touch ? a.track : document;
            b(a.track).on(u.touchEvents.start, a.dragStart),
            b(c).on(u.touchEvents.move, a.dragMove),
            b(c).on(u.touchEvents.end, a.dragEnd)
          },
          disableDraggable: function () {
            var a = u.scrollbar,
            c = u.support.touch ? a.track : document;
            b(a.track).off(u.touchEvents.start, a.dragStart),
            b(c).off(u.touchEvents.move, a.dragMove),
            b(c).off(u.touchEvents.end, a.dragEnd)
          },
          set: function () {
            if (u.params.scrollbar) {
              var a = u.scrollbar;
              a.track = b(u.params.scrollbar),
              u.params.uniqueNavElements && 'string' == typeof u.params.scrollbar && a.track.length > 1 && 1 === u.container.find(u.params.scrollbar).length && (a.track = u.container.find(u.params.scrollbar)),
              a.drag = a.track.find('.swiper-scrollbar-drag'),
              0 === a.drag.length && (a.drag = b('<div class="swiper-scrollbar-drag"></div>'), a.track.append(a.drag)),
              a.drag[0].style.width = '',
              a.drag[0].style.height = '',
              a.trackSize = u.isHorizontal() ? a.track[0].offsetWidth : a.track[0].offsetHeight,
              a.divider = u.size / u.virtualSize,
              a.moveDivider = a.divider * (a.trackSize / u.size),
              a.dragSize = a.trackSize * a.divider,
              u.isHorizontal() ? a.drag[0].style.width = a.dragSize + 'px' : a.drag[0].style.height = a.dragSize + 'px',
              a.divider >= 1 ? a.track[0].style.display = 'none' : a.track[0].style.display = '',
              u.params.scrollbarHide && (a.track[0].style.opacity = 0)
            }
          },
          setTranslate: function () {
            if (u.params.scrollbar) {
              var a,
              b = u.scrollbar,
              c = (u.translate, b.dragSize);
              a = (b.trackSize - b.dragSize) * u.progress,
              u.rtl && u.isHorizontal() ? (a = - a, a > 0 ? (c = b.dragSize - a, a = 0) : - a + b.dragSize > b.trackSize && (c = b.trackSize + a)) : 0 > a ? (c = b.dragSize + a, a = 0) : a + b.dragSize > b.trackSize && (c = b.trackSize - a),
              u.isHorizontal() ? (u.support.transforms3d ? b.drag.transform('translate3d(' + a + 'px, 0, 0)') : b.drag.transform('translateX(' + a + 'px)'), b.drag[0].style.width = c + 'px') : (u.support.transforms3d ? b.drag.transform('translate3d(0px, ' + a + 'px, 0)') : b.drag.transform('translateY(' + a + 'px)'), b.drag[0].style.height = c + 'px'),
              u.params.scrollbarHide && (clearTimeout(b.timeout), b.track[0].style.opacity = 1, b.timeout = setTimeout(function () {
                b.track[0].style.opacity = 0,
                b.track.transition(400)
              }, 1000))
            }
          },
          setTransition: function (a) {
            u.params.scrollbar && u.scrollbar.drag.transition(a)
          }
        }, u.controller = {
          LinearSpline: function (a, b) {
            this.x = a,
            this.y = b,
            this.lastIndex = a.length - 1;
            var c,
            d;
            this.x.length,
            this.interpolate = function (a) {
              return a ? (d = e(this.x, a), c = d - 1, (a - this.x[c]) * (this.y[d] - this.y[c]) / (this.x[d] - this.x[c]) + this.y[c]) : 0
            };
            var e = function () {
              var a,
              b,
              c;
              return function (d, e) {
                for (b = - 1, a = d.length; a - b > 1; ) d[c = a + b >> 1] <= e ? b = c : a = c;
                return a
              }
            }()
          },
          getInterpolateFunction: function (a) {
            u.controller.spline || (u.controller.spline = u.params.loop ? new u.controller.LinearSpline(u.slidesGrid, a.slidesGrid) : new u.controller.LinearSpline(u.snapGrid, a.snapGrid))
          },
          setTranslate: function (a, b) {
            function d(b) {
              a = b.rtl && 'horizontal' === b.params.direction ? - u.translate : u.translate,
              'slide' === u.params.controlBy && (u.controller.getInterpolateFunction(b), f = - u.controller.spline.interpolate( - a)),
              f && 'container' !== u.params.controlBy || (e = (b.maxTranslate() - b.minTranslate()) / (u.maxTranslate() - u.minTranslate()), f = (a - u.minTranslate()) * e + b.minTranslate()),
              u.params.controlInverse && (f = b.maxTranslate() - f),
              b.updateProgress(f),
              b.setWrapperTranslate(f, !1, u),
              b.updateActiveIndex()
            }
            var e,
            f,
            g = u.params.control;
            if (u.isArray(g)) for (var h = 0; h < g.length; h++) g[h] !== b && g[h] instanceof c && d(g[h]);
             else g instanceof c && b !== g && d(g)
          },
          setTransition: function (a, b) {
            function d(b) {
              b.setWrapperTransition(a, u),
              0 !== a && (b.onTransitionStart(), b.wrapper.transitionEnd(function () {
                f && (b.params.loop && 'slide' === u.params.controlBy && b.fixLoop(), b.onTransitionEnd())
              }))
            }
            var e,
            f = u.params.control;
            if (u.isArray(f)) for (e = 0; e < f.length; e++) f[e] !== b && f[e] instanceof c && d(f[e]);
             else f instanceof c && b !== f && d(f)
          }
        }, u.hashnav = {
          init: function () {
            if (u.params.hashnav) {
              u.hashnav.initialized = !0;
              var a = document.location.hash.replace('#', '');
              if (a) for (var b = 0, c = 0, d = u.slides.length; d > c; c++) {
                var e = u.slides.eq(c),
                f = e.attr('data-hash');
                if (f === a && !e.hasClass(u.params.slideDuplicateClass)) {
                  var g = e.index();
                  u.slideTo(g, b, u.params.runCallbacksOnInit, !0)
                }
              }
            }
          },
          setHash: function () {
            u.hashnav.initialized && u.params.hashnav && (document.location.hash = u.slides.eq(u.activeIndex).attr('data-hash') || '')
          }
        }, u.disableKeyboardControl = function () {
          u.params.keyboardControl = !1,
          b(document).off('keydown', j)
        }, u.enableKeyboardControl = function () {
          u.params.keyboardControl = !0,
          b(document).on('keydown', j)
        }, u.mousewheel = {
          event: !1,
          lastScrollTime: (new window.Date).getTime()
        }, u.params.mousewheelControl) {
          try {
            new window.WheelEvent('wheel'),
            u.mousewheel.event = 'wheel'
          } catch (O) {
            (window.WheelEvent || u.container[0] && 'wheel' in u.container[0]) && (u.mousewheel.event = 'wheel')
          }
          !u.mousewheel.event && window.WheelEvent,
          u.mousewheel.event || void 0 === document.onmousewheel || (u.mousewheel.event = 'mousewheel'),
          u.mousewheel.event || (u.mousewheel.event = 'DOMMouseScroll')
        }
        u.disableMousewheelControl = function () {
          return !!u.mousewheel.event && (u.container.off(u.mousewheel.event, k), !0)
        },
        u.enableMousewheelControl = function () {
          return !!u.mousewheel.event && (u.container.on(u.mousewheel.event, k), !0)
        },
        u.parallax = {
          setTranslate: function () {
            u.container.children('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
              l(this, u.progress)
            }),
            u.slides.each(function () {
              var a = b(this);
              a.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
                l(this, Math.min(Math.max(a[0].progress, - 1), 1))
              })
            })
          },
          setTransition: function (a) {
            void 0 === a && (a = u.params.speed),
            u.container.find('[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]').each(function () {
              var c = b(this),
              d = parseInt(c.attr('data-swiper-parallax-duration'), 10) || a;
              0 === a && (d = 0),
              c.transition(d)
            })
          }
        },
        u._plugins = [
        ];
        for (var M in u.plugins) {
          var N = u.plugins[M](u, u.params[M]);
          N && u._plugins.push(N)
        }
        return u.callPlugins = function (a) {
          for (var b = 0; b < u._plugins.length; b++) a in u._plugins[b] && u._plugins[b][a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        },
        u.emitterEventListeners = {
        },
        u.emit = function (a) {
          u.params[a] && u.params[a](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          var b;
          if (u.emitterEventListeners[a]) for (b = 0; b < u.emitterEventListeners[a].length; b++) u.emitterEventListeners[a][b](arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
          u.callPlugins && u.callPlugins(a, arguments[1], arguments[2], arguments[3], arguments[4], arguments[5])
        },
        u.on = function (a, b) {
          return a = m(a),
          u.emitterEventListeners[a] || (u.emitterEventListeners[a] = [
          ]),
          u.emitterEventListeners[a].push(b),
          u
        },
        u.off = function (a, b) {
          var c;
          if (a = m(a), void 0 === b) return u.emitterEventListeners[a] = [
          ],
          u;
          if (u.emitterEventListeners[a] && 0 !== u.emitterEventListeners[a].length) {
            for (c = 0; c < u.emitterEventListeners[a].length; c++) u.emitterEventListeners[a][c] === b && u.emitterEventListeners[a].splice(c, 1);
            return u
          }
        },
        u.once = function (a, b) {
          a = m(a);
          var c = function () {
            b(arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]),
            u.off(a, c)
          };
          return u.on(a, c),
          u
        },
        u.a11y = {
          makeFocusable: function (a) {
            return a.attr('tabIndex', '0'),
            a
          },
          addRole: function (a, b) {
            return a.attr('role', b),
            a
          },
          addLabel: function (a, b) {
            return a.attr('aria-label', b),
            a
          },
          disable: function (a) {
            return a.attr('aria-disabled', !0),
            a
          },
          enable: function (a) {
            return a.attr('aria-disabled', !1),
            a
          },
          onEnterKey: function (a) {
            13 === a.keyCode && (b(a.target).is(u.params.nextButton) ? (u.onClickNext(a), u.isEnd ? u.a11y.notify(u.params.lastSlideMessage) : u.a11y.notify(u.params.nextSlideMessage)) : b(a.target).is(u.params.prevButton) && (u.onClickPrev(a), u.isBeginning ? u.a11y.notify(u.params.firstSlideMessage) : u.a11y.notify(u.params.prevSlideMessage)), b(a.target).is('.' + u.params.bulletClass) && b(a.target) [0].click())
          },
          liveRegion: b('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),
          notify: function (a) {
            var b = u.a11y.liveRegion;
            0 !== b.length && (b.html(''), b.html(a))
          },
          init: function () {
            u.params.nextButton && u.nextButton && u.nextButton.length > 0 && (u.a11y.makeFocusable(u.nextButton), u.a11y.addRole(u.nextButton, 'button'), u.a11y.addLabel(u.nextButton, u.params.nextSlideMessage)),
            u.params.prevButton && u.prevButton && u.prevButton.length > 0 && (u.a11y.makeFocusable(u.prevButton), u.a11y.addRole(u.prevButton, 'button'), u.a11y.addLabel(u.prevButton, u.params.prevSlideMessage)),
            b(u.container).append(u.a11y.liveRegion)
          },
          initPagination: function () {
            u.params.pagination && u.params.paginationClickable && u.bullets && u.bullets.length && u.bullets.each(function () {
              var a = b(this);
              u.a11y.makeFocusable(a),
              u.a11y.addRole(a, 'button'),
              u.a11y.addLabel(a, u.params.paginationBulletMessage.replace(/{{index}}/, a.index() + 1))
            })
          },
          destroy: function () {
            u.a11y.liveRegion && u.a11y.liveRegion.length > 0 && u.a11y.liveRegion.remove()
          }
        },
        u.init = function () {
          u.params.loop && u.createLoop(),
          u.updateContainerSize(),
          u.updateSlidesSize(),
          u.updatePagination(),
          u.params.scrollbar && u.scrollbar && (u.scrollbar.set(), u.params.scrollbarDraggable && u.scrollbar.enableDraggable()),
          'slide' !== u.params.effect && u.effects[u.params.effect] && (u.params.loop || u.updateProgress(), u.effects[u.params.effect].setTranslate()),
          u.params.loop ? u.slideTo(u.params.initialSlide + u.loopedSlides, 0, u.params.runCallbacksOnInit) : (u.slideTo(u.params.initialSlide, 0, u.params.runCallbacksOnInit), 0 === u.params.initialSlide && (u.parallax && u.params.parallax && u.parallax.setTranslate(), u.lazy && u.params.lazyLoading && (u.lazy.load(), u.lazy.initialImageLoaded = !0))),
          u.attachEvents(),
          u.params.observer && u.support.observer && u.initObservers(),
          u.params.preloadImages && !u.params.lazyLoading && u.preloadImages(),
          u.params.autoplay && u.startAutoplay(),
          u.params.keyboardControl && u.enableKeyboardControl && u.enableKeyboardControl(),
          u.params.mousewheelControl && u.enableMousewheelControl && u.enableMousewheelControl(),
          u.params.hashnav && u.hashnav && u.hashnav.init(),
          u.params.a11y && u.a11y && u.a11y.init(),
          u.emit('onInit', u)
        },
        u.cleanupStyles = function () {
          u.container.removeClass(u.classNames.join(' ')).removeAttr('style'),
          u.wrapper.removeAttr('style'),
          u.slides && u.slides.length && u.slides.removeClass([u.params.slideVisibleClass,
          u.params.slideActiveClass,
          u.params.slideNextClass,
          u.params.slidePrevClass].join(' ')).removeAttr('style').removeAttr('data-swiper-column').removeAttr('data-swiper-row'),
          u.paginationContainer && u.paginationContainer.length && u.paginationContainer.removeClass(u.params.paginationHiddenClass),
          u.bullets && u.bullets.length && u.bullets.removeClass(u.params.bulletActiveClass),
          u.params.prevButton && b(u.params.prevButton).removeClass(u.params.buttonDisabledClass),
          u.params.nextButton && b(u.params.nextButton).removeClass(u.params.buttonDisabledClass),
          u.params.scrollbar && u.scrollbar && (u.scrollbar.track && u.scrollbar.track.length && u.scrollbar.track.removeAttr('style'), u.scrollbar.drag && u.scrollbar.drag.length && u.scrollbar.drag.removeAttr('style'))
        },
        u.destroy = function (a, b) {
          u.detachEvents(),
          u.stopAutoplay(),
          u.params.scrollbar && u.scrollbar && u.params.scrollbarDraggable && u.scrollbar.disableDraggable(),
          u.params.loop && u.destroyLoop(),
          b && u.cleanupStyles(),
          u.disconnectObservers(),
          u.params.keyboardControl && u.disableKeyboardControl && u.disableKeyboardControl(),
          u.params.mousewheelControl && u.disableMousewheelControl && u.disableMousewheelControl(),
          u.params.a11y && u.a11y && u.a11y.destroy(),
          u.emit('onDestroy'),
          !1 !== a && (u = null)
        },
        u.init(),
        u
      }
    };
    c.prototype = {
      isSafari: function () {
        var a = navigator.userAgent.toLowerCase();
        return a.indexOf('safari') >= 0 && a.indexOf('chrome') < 0 && a.indexOf('android') < 0
      }(),
      isUiWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),
      isArray: function (a) {
        return '[object Array]' === Object.prototype.toString.apply(a)
      },
      browser: {
        ie: window.navigator.pointerEnabled || window.navigator.msPointerEnabled,
        ieTouch: window.navigator.msPointerEnabled && window.navigator.msMaxTouchPoints > 1 || window.navigator.pointerEnabled && window.navigator.maxTouchPoints > 1
      },
      device: function () {
        var a = navigator.userAgent,
        b = a.match(/(Android);?[\s\/]+([\d.]+)?/),
        c = a.match(/(iPad).*OS\s([\d_]+)/),
        d = a.match(/(iPod)(.*OS\s([\d_]+))?/),
        e = !c && a.match(/(iPhone\sOS)\s([\d_]+)/);
        return {
          ios: c || e || d,
          android: b
        }
      }(),
      support: {
        touch: window.Modernizr && !0 === Modernizr.touch || function () {
          return !!('ontouchstart' in window || window.DocumentTouch && document instanceof DocumentTouch)
        }(),
        transforms3d: window.Modernizr && !0 === Modernizr.csstransforms3d || function () {
          var a = document.createElement('div').style;
          return 'webkitPerspective' in a || 'MozPerspective' in a || 'OPerspective' in a || 'MsPerspective' in a || 'perspective' in a
        }(),
        flexbox: function () {
          for (var a = document.createElement('div').style, b = 'alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient'.split(' '), c = 0; c < b.length; c++) if (b[c] in a) return !0
        }(),
        observer: function () {
          return 'MutationObserver' in window || 'WebkitMutationObserver' in window
        }()
      },
      plugins: {
      }
    };
    for (var d = (function () {
      var a = function (a) {
        var b = this,
        c = 0;
        for (c = 0; c < a.length; c++) b[c] = a[c];
        return b.length = a.length,
        this
      },
      b = function (b, c) {
        var d = [
        ],
        e = 0;
        if (b && !c && b instanceof a) return b;
        if (b) if ('string' == typeof b) {
          var f,
          g,
          h = b.trim();
          if (h.indexOf('<') >= 0 && h.indexOf('>') >= 0) {
            var i = 'div';
            for (0 === h.indexOf('<li') && (i = 'ul'), 0 === h.indexOf('<tr') && (i = 'tbody'), (0 === h.indexOf('<td') || 0 === h.indexOf('<th')) && (i = 'tr'), 0 === h.indexOf('<tbody') && (i = 'table'), 0 === h.indexOf('<option') && (i = 'select'), g = document.createElement(i), g.innerHTML = b, e = 0; e < g.childNodes.length; e++) d.push(g.childNodes[e])
          } else for (f = c || '#' !== b[0] || b.match(/[ .<>:~]/) ? (c || document).querySelectorAll(b) : [
            document.getElementById(b.split('#') [1])
          ], e = 0; e < f.length; e++) f[e] && d.push(f[e])
        } else if (b.nodeType || b === window || b === document) d.push(b);
         else if (b.length > 0 && b[0].nodeType) for (e = 0; e < b.length; e++) d.push(b[e]);
        return new a(d)
      };
      return a.prototype = {
        addClass: function (a) {
          if (void 0 === a) return this;
          for (var b = a.split(' '), c = 0; c < b.length; c++) for (var d = 0; d < this.length; d++) this[d].classList.add(b[c]);
          return this
        },
        removeClass: function (a) {
          for (var b = a.split(' '), c = 0; c < b.length; c++) for (var d = 0; d < this.length; d++) this[d].classList.remove(b[c]);
          return this
        },
        hasClass: function (a) {
          return !!this[0] && this[0].classList.contains(a)
        },
        toggleClass: function (a) {
          for (var b = a.split(' '), c = 0; c < b.length; c++) for (var d = 0; d < this.length; d++) this[d].classList.toggle(b[c]);
          return this
        },
        attr: function (a, b) {
          if (1 === arguments.length && 'string' == typeof a) return this[0] ? this[0].getAttribute(a) : void 0;
          for (var c = 0; c < this.length; c++) if (2 === arguments.length) this[c].setAttribute(a, b);
           else for (var d in a) this[c][d] = a[d],
          this[c].setAttribute(d, a[d]);
          return this
        },
        removeAttr: function (a) {
          for (var b = 0; b < this.length; b++) this[b].removeAttribute(a);
          return this
        },
        data: function (a, b) {
          if (void 0 !== b) {
            for (var c = 0; c < this.length; c++) {
              var d = this[c];
              d.dom7ElementDataStorage || (d.dom7ElementDataStorage = {
              }),
              d.dom7ElementDataStorage[a] = b
            }
            return this
          }
          if (this[0]) {
            var e = this[0].getAttribute('data-' + a);
            return e || (this[0].dom7ElementDataStorage && a in this[0].dom7ElementDataStorage ? this[0].dom7ElementDataStorage[a] : void 0)
          }
        },
        transform: function (a) {
          for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = a
          }
          return this
        },
        transition: function (a) {
          'string' != typeof a && (a += 'ms');
          for (var b = 0; b < this.length; b++) {
            var c = this[b].style;
            c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = a
          }
          return this
        },
        on: function (a, c, d, e) {
          function f(a) {
            var e = a.target;
            if (b(e).is(c)) d.call(e, a);
             else for (var f = b(e).parents(), g = 0; g < f.length; g++) b(f[g]).is(c) && d.call(f[g], a)
          }
          var g,
          h,
          i = a.split(' ');
          for (g = 0; g < this.length; g++) if ('function' == typeof c || !1 === c) for ('function' == typeof c && (d = arguments[1], e = arguments[2] || !1), h = 0; h < i.length; h++) this[g].addEventListener(i[h], d, e);
           else for (h = 0; h < i.length; h++) this[g].dom7LiveListeners || (this[g].dom7LiveListeners = [
          ]),
          this[g].dom7LiveListeners.push({
            listener: d,
            liveListener: f
          }),
          this[g].addEventListener(i[h], f, e);
          return this
        },
        off: function (a, b, c, d) {
          for (var e = a.split(' '), f = 0; f < e.length; f++) for (var g = 0; g < this.length; g++) if ('function' == typeof b || !1 === b) 'function' == typeof b && (c = arguments[1], d = arguments[2] || !1),
          this[g].removeEventListener(e[f], c, d);
           else if (this[g].dom7LiveListeners) for (var h = 0; h < this[g].dom7LiveListeners.length; h++) this[g].dom7LiveListeners[h].listener === c && this[g].removeEventListener(e[f], this[g].dom7LiveListeners[h].liveListener, d);
          return this
        },
        once: function (a, b, c, d) {
          function e(g) {
            c(g),
            f.off(a, b, e, d)
          }
          var f = this;
          'function' == typeof b && (b = !1, c = arguments[1], d = arguments[2]),
          f.on(a, b, e, d)
        },
        trigger: function (a, b) {
          for (var c = 0; c < this.length; c++) {
            var d;
            try {
              d = new window.CustomEvent(a, {
                detail: b,
                bubbles: !0,
                cancelable: !0
              })
            } catch (e) {
              d = document.createEvent('Event'),
              d.initEvent(a, !0, !0),
              d.detail = b
            }
            this[c].dispatchEvent(d)
          }
          return this
        },
        transitionEnd: function (a) {
          function b(f) {
            if (f.target === this) for (a.call(this, f), c = 0; c < d.length; c++) e.off(d[c], b)
          }
          var c,
          d = [
            'webkitTransitionEnd',
            'transitionend',
            'oTransitionEnd',
            'MSTransitionEnd',
            'msTransitionEnd'
          ],
          e = this;
          if (a) for (c = 0; c < d.length; c++) e.on(d[c], b);
          return this
        },
        width: function () {
          return this[0] === window ? window.innerWidth : this.length > 0 ? parseFloat(this.css('width')) : null
        },
        outerWidth: function (a) {
          return this.length > 0 ? a ? this[0].offsetWidth + parseFloat(this.css('margin-right')) + parseFloat(this.css('margin-left')) : this[0].offsetWidth : null
        },
        height: function () {
          return this[0] === window ? window.innerHeight : this.length > 0 ? parseFloat(this.css('height')) : null
        },
        outerHeight: function (a) {
          return this.length > 0 ? a ? this[0].offsetHeight + parseFloat(this.css('margin-top')) + parseFloat(this.css('margin-bottom')) : this[0].offsetHeight : null
        },
        offset: function () {
          if (this.length > 0) {
            var a = this[0],
            b = a.getBoundingClientRect(),
            c = document.body,
            d = a.clientTop || c.clientTop || 0,
            e = a.clientLeft || c.clientLeft || 0,
            f = window.pageYOffset || a.scrollTop,
            g = window.pageXOffset || a.scrollLeft;
            return {
              top: b.top + f - d,
              left: b.left + g - e
            }
          }
          return null
        },
        css: function (a, b) {
          var c;
          if (1 === arguments.length) {
            if ('string' != typeof a) {
              for (c = 0; c < this.length; c++) for (var d in a) this[c].style[d] = a[d];
              return this
            }
            if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(a)
          }
          if (2 === arguments.length && 'string' == typeof a) {
            for (c = 0; c < this.length; c++) this[c].style[a] = b;
            return this
          }
          return this
        },
        each: function (a) {
          for (var b = 0; b < this.length; b++) a.call(this[b], b, this[b]);
          return this
        },
        html: function (a) {
          if (void 0 === a) return this[0] ? this[0].innerHTML : void 0;
          for (var b = 0; b < this.length; b++) this[b].innerHTML = a;
          return this
        },
        text: function (a) {
          if (void 0 === a) return this[0] ? this[0].textContent.trim() : null;
          for (var b = 0; b < this.length; b++) this[b].textContent = a;
          return this
        },
        is: function (c) {
          if (!this[0]) return !1;
          var d,
          e;
          if ('string' == typeof c) {
            var f = this[0];
            if (f === document) return c === document;
            if (f === window) return c === window;
            if (f.matches) return f.matches(c);
            if (f.webkitMatchesSelector) return f.webkitMatchesSelector(c);
            if (f.mozMatchesSelector) return f.mozMatchesSelector(c);
            if (f.msMatchesSelector) return f.msMatchesSelector(c);
            for (d = b(c), e = 0; e < d.length; e++) if (d[e] === this[0]) return !0;
            return !1
          }
          if (c === document) return this[0] === document;
          if (c === window) return this[0] === window;
          if (c.nodeType || c instanceof a) {
            for (d = c.nodeType ? [
              c
            ] : c, e = 0; e < d.length; e++) if (d[e] === this[0]) return !0;
            return !1
          }
          return !1
        },
        index: function () {
          if (this[0]) {
            for (var a = this[0], b = 0; null !== (a = a.previousSibling); ) 1 === a.nodeType && b++;
            return b
          }
        },
        eq: function (b) {
          if (void 0 === b) return this;
          var c,
          d = this.length;
          return b > d - 1 ? new a([]) : 0 > b ? (c = d + b, new a(0 > c ? [
          ] : [
            this[c]
          ])) : new a([this[b]])
        },
        append: function (b) {
          var c,
          d;
          for (c = 0; c < this.length; c++) if ('string' == typeof b) {
            var e = document.createElement('div');
            for (e.innerHTML = b; e.firstChild; ) this[c].appendChild(e.firstChild)
          } else if (b instanceof a) for (d = 0; d < b.length; d++) this[c].appendChild(b[d]);
           else this[c].appendChild(b);
          return this
        },
        prepend: function (b) {
          var c,
          d;
          for (c = 0; c < this.length; c++) if ('string' == typeof b) {
            var e = document.createElement('div');
            for (e.innerHTML = b, d = e.childNodes.length - 1; d >= 0; d--) this[c].insertBefore(e.childNodes[d], this[c].childNodes[0])
          } else if (b instanceof a) for (d = 0; d < b.length; d++) this[c].insertBefore(b[d], this[c].childNodes[0]);
           else this[c].insertBefore(b, this[c].childNodes[0]);
          return this
        },
        insertBefore: function (a) {
          for (var c = b(a), d = 0; d < this.length; d++) if (1 === c.length) c[0].parentNode.insertBefore(this[d], c[0]);
           else if (c.length > 1) for (var e = 0; e < c.length; e++) c[e].parentNode.insertBefore(this[d].cloneNode(!0), c[e])
        },
        insertAfter: function (a) {
          for (var c = b(a), d = 0; d < this.length; d++) if (1 === c.length) c[0].parentNode.insertBefore(this[d], c[0].nextSibling);
           else if (c.length > 1) for (var e = 0; e < c.length; e++) c[e].parentNode.insertBefore(this[d].cloneNode(!0), c[e].nextSibling)
        },
        next: function (c) {
          return new a(this.length > 0 ? c ? this[0].nextElementSibling && b(this[0].nextElementSibling).is(c) ? [
            this[0].nextElementSibling
          ] : [
          ] : this[0].nextElementSibling ? [
            this[0].nextElementSibling
          ] : [
          ] : [
          ])
        },
        nextAll: function (c) {
          var d = [
          ],
          e = this[0];
          if (!e) return new a([]);
          for (; e.nextElementSibling; ) {
            var f = e.nextElementSibling;
            c ? b(f).is(c) && d.push(f) : d.push(f),
            e = f
          }
          return new a(d)
        },
        prev: function (c) {
          return new a(this.length > 0 ? c ? this[0].previousElementSibling && b(this[0].previousElementSibling).is(c) ? [
            this[0].previousElementSibling
          ] : [
          ] : this[0].previousElementSibling ? [
            this[0].previousElementSibling
          ] : [
          ] : [
          ])
        },
        prevAll: function (c) {
          var d = [
          ],
          e = this[0];
          if (!e) return new a([]);
          for (; e.previousElementSibling; ) {
            var f = e.previousElementSibling;
            c ? b(f).is(c) && d.push(f) : d.push(f),
            e = f
          }
          return new a(d)
        },
        parent: function (a) {
          for (var c = [
          ], d = 0; d < this.length; d++) a ? b(this[d].parentNode).is(a) && c.push(this[d].parentNode) : c.push(this[d].parentNode);
          return b(b.unique(c))
        },
        parents: function (a) {
          for (var c = [
          ], d = 0; d < this.length; d++) for (var e = this[d].parentNode; e; ) a ? b(e).is(a) && c.push(e) : c.push(e),
          e = e.parentNode;
          return b(b.unique(c))
        },
        find: function (b) {
          for (var c = [
          ], d = 0; d < this.length; d++) for (var e = this[d].querySelectorAll(b), f = 0; f < e.length; f++) c.push(e[f]);
          return new a(c)
        },
        children: function (c) {
          for (var d = [
          ], e = 0; e < this.length; e++) for (var f = this[e].childNodes, g = 0; g < f.length; g++) c ? 1 === f[g].nodeType && b(f[g]).is(c) && d.push(f[g]) : 1 === f[g].nodeType && d.push(f[g]);
          return new a(b.unique(d))
        },
        remove: function () {
          for (var a = 0; a < this.length; a++) this[a].parentNode && this[a].parentNode.removeChild(this[a]);
          return this
        },
        add: function () {
          var a,
          c,
          d = this;
          for (a = 0; a < arguments.length; a++) {
            var e = b(arguments[a]);
            for (c = 0; c < e.length; c++) d[d.length] = e[c],
            d.length++
          }
          return d
        }
      },
      b.fn = a.prototype,
      b.unique = function (a) {
        for (var b = [
        ], c = 0; c < a.length; c++) - 1 === b.indexOf(a[c]) && b.push(a[c]);
        return b
      },
      b
    }()), e = [
      'jQuery',
      'Zepto',
      'Dom7'
    ], f = 0; f < e.length; f++) window[e[f]] && a(window[e[f]]);
    var g;
    g = void 0 === d ? window.Dom7 || window.Zepto || window.jQuery : d,
    g && ('transitionEnd' in g.fn || (g.fn.transitionEnd = function (a) {
      function b(f) {
        if (f.target === this) for (a.call(this, f), c = 0; c < d.length; c++) e.off(d[c], b)
      }
      var c,
      d = [
        'webkitTransitionEnd',
        'transitionend',
        'oTransitionEnd',
        'MSTransitionEnd',
        'msTransitionEnd'
      ],
      e = this;
      if (a) for (c = 0; c < d.length; c++) e.on(d[c], b);
      return this
    }), 'transform' in g.fn || (g.fn.transform = function (a) {
      for (var b = 0; b < this.length; b++) {
        var c = this[b].style;
        c.webkitTransform = c.MsTransform = c.msTransform = c.MozTransform = c.OTransform = c.transform = a
      }
      return this
    }), 'transition' in g.fn || (g.fn.transition = function (a) {
      'string' != typeof a && (a += 'ms');
      for (var b = 0; b < this.length; b++) {
        var c = this[b].style;
        c.webkitTransitionDuration = c.MsTransitionDuration = c.msTransitionDuration = c.MozTransitionDuration = c.OTransitionDuration = c.transitionDuration = a
      }
      return this
    })),
    window.Swiper = c
  }(),
  'undefined' != typeof module ? module.exports = window.Swiper : 'function' == typeof define && define.amd && define([], function () {
    'use strict';
    return window.Swiper
  }),
  function (a) {
    function b(d) {
      if (c[d]) return c[d].exports;
      var e = c[d] = {
        i: d,
        l: !1,
        exports: {
        }
      };
      return a[d].call(e.exports, e, e.exports, b),
      e.l = !0,
      e.exports
    }
    var c = {
    };
    b.m = a,
    b.c = c,
    b.d = function (a, c, d) {
      b.o(a, c) || Object.defineProperty(a, c, {
        enumerable: !0,
        get: d
      })
    },
    b.r = function (a) {
      'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(a, Symbol.toStringTag, {
        value: 'Module'
      }),
      Object.defineProperty(a, '__esModule', {
        value: !0
      })
    },
    b.t = function (a, c) {
      if (1 & c && (a = b(a)), 8 & c) return a;
      if (4 & c && 'object' == typeof a && a && a.__esModule) return a;
      var d = Object.create(null);
      if (b.r(d), Object.defineProperty(d, 'default', {
        enumerable: !0,
        value: a
      }), 2 & c && 'string' != typeof a) for (var e in a) b.d(d, e, function (b) {
        return a[b]
      }.bind(null, e));
      return d
    },
    b.n = function (a) {
      var c = a && a.__esModule ? function () {
        return a.default
      }
       : function () {
        return a
      };
      return b.d(c, 'a', c),
      c
    },
    b.o = function (a, b) {
      return Object.prototype.hasOwnProperty.call(a, b)
    },
    b.p = '',
    b(b.s = 0)
  }([function (a, b, c) {
    'use strict';
    function d(a) {
      return a && a.__esModule ? a : {
      default:
        a
      }
    }
    c(1),
    c(6),
    c(7);
    var e = c(2),
    f = d(e),
    g = c(3),
    h = d(g),
    i = c(4),
    j = d(i);
    h.default === j.default && c(8),
    window.Inputmask = f.default
  },
  function (a, b, c) {
    'use strict';
    var d,
    e,
    f;
    'function' == typeof Symbol && Symbol.iterator;
    !function (g) {
      e = [
        c(2)
      ],
      d = g,
      void 0 !== (f = 'function' == typeof d ? d.apply(b, e) : d) && (a.exports = f)
    }(function (a) {
      return a.extendDefinitions({
        A: {
          validator: '[A-Za-zА-яЁёÀ-ÿµ]',
          casing: 'upper'
        },
        '&': {
          validator: '[0-9A-Za-zА-яЁёÀ-ÿµ]',
          casing: 'upper'
        },
        '#': {
          validator: '[0-9A-Fa-f]',
          casing: 'upper'
        }
      }),
      a.extendAliases({
        cssunit: {
          regex: '[+-]?[0-9]+\\.?([0-9]+)?(px|em|rem|ex|%|in|cm|mm|pt|pc)'
        },
        url: {
          regex: '(https?|ftp)//.*',
          autoUnmask: !1
        },
        ip: {
          mask: 'i[i[i]].i[i[i]].i[i[i]].i[i[i]]',
          definitions: {
            i: {
              validator: function (a, b, c, d, e) {
                return c - 1 > - 1 && '.' !== b.buffer[c - 1] ? (a = b.buffer[c - 1] + a, a = c - 2 > - 1 && '.' !== b.buffer[c - 2] ? b.buffer[c - 2] + a : '0' + a) : a = '00' + a,
                new RegExp('25[0-5]|2[0-4][0-9]|[01][0-9][0-9]').test(a)
              }
            }
          },
          onUnMask: function (a, b, c) {
            return a
          },
          inputmode: 'numeric'
        },
        email: {
          mask: '*{1,64}[.*{1,64}][.*{1,64}][.*{1,63}]@-{1,63}.-{1,63}[.-{1,63}][.-{1,63}]',
          greedy: !1,
          casing: 'lower',
          onBeforePaste: function (a, b) {
            return a = a.toLowerCase(),
            a.replace('mailto:', '')
          },
          definitions: {
            '*': {
              validator: '[0-9１-９A-Za-zА-яЁёÀ-ÿµ!#$%&\'*+/=?^_`{|}~-]'
            },
            '-': {
              validator: '[0-9A-Za-z-]'
            }
          },
          onUnMask: function (a, b, c) {
            return a
          },
          inputmode: 'email'
        },
        mac: {
          mask: '##:##:##:##:##:##'
        },
        vin: {
          mask: 'V{13}9{4}',
          definitions: {
            V: {
              validator: '[A-HJ-NPR-Za-hj-npr-z\\d]',
              casing: 'upper'
            }
          },
          clearIncomplete: !0,
          autoUnmask: !0
        }
      }),
      a
    })
  },
  function (a, b, c) {
    'use strict';
    var d,
    e,
    f,
    g = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
      return typeof a
    }
     : function (a) {
      return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
    };
    !function (g) {
      e = [
        c(3),
        c(5)
      ],
      d = g,
      void 0 !== (f = 'function' == typeof d ? d.apply(b, e) : d) && (a.exports = f)
    }(function (a, b, c) {
      function d(b, f, g) {
        if (!(this instanceof d)) return new d(b, f, g);
        this.el = c,
        this.events = {
        },
        this.maskset = c,
        this.refreshValue = !1,
        !0 !== g && (a.isPlainObject(b) ? f = b : (f = f || {
        }, b && (f.alias = b)), this.opts = a.extend(!0, {
        }, this.defaults, f), this.noMasksCache = f && f.definitions !== c, this.userOptions = f || {
        }, this.isRTL = this.opts.numericInput, e(this.opts.alias, f, this.opts))
      }
      function e(b, f, g) {
        var h = d.prototype.aliases[b];
        return h ? (h.alias && e(h.alias, c, g), a.extend(!0, g, h), a.extend(!0, g, f), !0) : (null === g.mask && (g.mask = b), !1)
      }
      function f(b, e) {
        function f(b, f, g) {
          var h = !1;
          if (null !== b && '' !== b || (h = null !== g.regex, h ? (b = g.regex, b = b.replace(/^(\^)(.*)(\$)$/, '$2')) : (h = !0, b = '.*')), 1 === b.length && !1 === g.greedy && 0 !== g.repeat && (g.placeholder = ''), g.repeat > 0 || '*' === g.repeat || '+' === g.repeat) {
            var i = '*' === g.repeat ? 0 : '+' === g.repeat ? 1 : g.repeat;
            b = g.groupmarker[0] + b + g.groupmarker[1] + g.quantifiermarker[0] + i + ',' + g.repeat + g.quantifiermarker[1]
          }
          var j,
          k = h ? 'regex_' + g.regex : g.numericInput ? b.split('').reverse().join('') : b;
          return d.prototype.masksCache[k] === c || !0 === e ? (j = {
            mask: b,
            maskToken: d.prototype.analyseMask(b, h, g),
            validPositions: {
            },
            _buffer: c,
            buffer: c,
            tests: {
            },
            excludes: {
            },
            metadata: f,
            maskLength: c,
            jitOffset: {
            }
          }, !0 !== e && (d.prototype.masksCache[k] = j, j = a.extend(!0, {
          }, d.prototype.masksCache[k]))) : j = a.extend(!0, {
          }, d.prototype.masksCache[k]),
          j
        }
        if (a.isFunction(b.mask) && (b.mask = b.mask(b)), a.isArray(b.mask)) {
          if (b.mask.length > 1) {
            if (null === b.keepStatic) {
              b.keepStatic = 'auto';
              for (var g = 0; g < b.mask.length; g++) if (b.mask[g].charAt(0) !== b.mask[0].charAt(0)) {
                b.keepStatic = !0;
                break
              }
            }
            var h = b.groupmarker[0];
            return a.each(b.isRTL ? b.mask.reverse() : b.mask, function (d, e) {
              h.length > 1 && (h += b.groupmarker[1] + b.alternatormarker + b.groupmarker[0]),
              e.mask === c || a.isFunction(e.mask) ? h += e : h += e.mask
            }),
            h += b.groupmarker[1],
            f(h, b.mask, b)
          }
          b.mask = b.mask.pop()
        }
        return b.mask && b.mask.mask !== c && !a.isFunction(b.mask.mask) ? f(b.mask.mask, b.mask, b) : f(b.mask, b.mask, b)
      }
      function h(a) {
        var b = j.createElement('input'),
        c = 'on' + a,
        d = c in b;
        return d || (b.setAttribute(c, 'return;'), d = 'function' == typeof b[c]),
        b = null,
        d
      }
      function i(e, f, k) {
        function p() {
          return f
        }
        function q(a) {
          var b = p();
          b.buffer = c,
          !0 !== a && (b.validPositions = {
          }, b.p = 0)
        }
        function r(a, b, d) {
          var e = - 1,
          f = - 1,
          g = d || p().validPositions;
          a === c && (a = - 1);
          for (var h in g) {
            var i = parseInt(h);
            g[i] && (b || !0 !== g[i].generatedInput) && (i <= a && (e = i), i >= a && (f = i))
          }
          return - 1 === e || e == a ? f : - 1 == f ? e : a - e < f - a ? e : f
        }
        function s(a) {
          var b = a.locator[a.alternation];
          return 'string' == typeof b && b.length > 0 && (b = b.split(',') [0]),
          b !== c ? b.toString() : ''
        }
        function t(a, b) {
          var d = (a.alternation != c ? a.mloc[s(a)] : a.locator).join('');
          if ('' !== d) for (; d.length < b; ) d += '0';
          return d
        }
        function u(a, b) {
          a = a > 0 ? a - 1 : 0;
          for (var d, e, f, g = w(a), h = t(g), i = 0; i < b.length; i++) {
            var j = b[i];
            d = t(j, h.length);
            var l = Math.abs(d - h);
            (e === c || '' !== d && l < e || f && !k.greedy && f.match.optionality && 'master' === f.match.newBlockMarker && (!j.match.optionality || !j.match.newBlockMarker) || f && f.match.optionalQuantifier && !j.match.optionalQuantifier) && (e = l, f = j)
          }
          return f
        }
        function v(a, b, c) {
          return p().validPositions[a] || u(a, y(a, b ? b.slice() : b, c))
        }
        function w(a, b) {
          return p().validPositions[a] ? p().validPositions[a] : (b || y(a)) [0]
        }
        function x(a, b) {
          for (var c = !1, d = y(a), e = 0; e < d.length; e++) if (d[e].match && d[e].match.def === b) {
            c = !0;
            break
          }
          return c
        }
        function y(b, d, e) {
          function f(d, e, g, i) {
            function l(g, i, q) {
              function r(b, c) {
                var d = 0 === a.inArray(b, c.matches);
                return d || a.each(c.matches, function (a, e) {
                  if (!0 === e.isQuantifier ? d = r(b, c.matches[a - 1]) : e.hasOwnProperty('matches') && (d = r(b, e)), d) return !1
                }),
                d
              }
              function s(b, d, e) {
                var f,
                g;
                if ((p().tests[b] || p().validPositions[b]) && a.each(p().tests[b] || [
                  p().validPositions[b]
                ], function (a, b) {
                  if (b.mloc[d]) return f = b,
                  !1;
                  var h = e !== c ? e : b.alternation,
                  i = b.locator[h] !== c ? b.locator[h].toString().indexOf(d) : - 1;
                  (g === c || i < g) && - 1 !== i && (f = b, g = i)
                }), f) {
                  var h = f.locator[f.alternation];
                  return (f.mloc[d] || f.mloc[h] || f.locator).slice((e !== c ? e : f.alternation) + 1)
                }
                return e !== c ? s(b, d) : c
              }
              function t(a, b) {
                function c(a) {
                  for (var b, c, d = [
                  ], e = 0, f = a.length; e < f; e++) if ('-' === a.charAt(e)) for (c = a.charCodeAt(e + 1); ++b < c; ) d.push(String.fromCharCode(b));
                   else b = a.charCodeAt(e),
                  d.push(a.charAt(e));
                  return d.join('')
                }
                return k.regex && null !== a.match.fn && null !== b.match.fn ? - 1 !== c(b.match.def.replace(/[\[\]]/g, '')).indexOf(c(a.match.def.replace(/[\[\]]/g, ''))) : a.match.def === b.match.nativeDef
              }
              function u(a, c) {
                var d = a.locator.slice(a.alternation).join(''),
                e = c.locator.slice(c.alternation).join(''),
                f = d == e;
                return f = !(!f || null !== a.match.fn || null === c.match.fn) && c.match.fn.test(a.match.def, p(), b, !1, k, !1)
              }
              function v(a, b) {
                if (b === c || a.alternation === b.alternation && - 1 === a.locator[a.alternation].toString().indexOf(b.locator[b.alternation])) {
                  a.mloc = a.mloc || {
                  };
                  var d = a.locator[a.alternation];
                  if (d !== c) {
                    if ('string' == typeof d && (d = d.split(',') [0]), a.mloc[d] === c && (a.mloc[d] = a.locator.slice()), b !== c) {
                      for (var e in b.mloc) 'string' == typeof e && (e = e.split(',') [0]),
                      a.mloc[e] === c && (a.mloc[e] = b.mloc[e]);
                      a.locator[a.alternation] = Object.keys(a.mloc).join(',')
                    }
                    return !0
                  }
                  a.alternation = c
                }
                return !1
              }
              if (j > 500 && q !== c) throw 'Inputmask: There is probably an error in your mask definition or in the code. Create an issue on github with an example of the mask you are using. ' + p().mask;
              if (j === b && g.matches === c) return m.push({
                match: g,
                locator: i.reverse(),
                cd: o,
                mloc: {
                }
              }),
              !0;
              if (g.matches !== c) {
                if (g.isGroup && q !== g) {
                  if (g = l(d.matches[a.inArray(g, d.matches) + 1], i, q)) return !0
                } else if (g.isOptional) {
                  var w = g;
                  if (g = f(g, e, i, q)) {
                    if (a.each(m, function (a, b) {
                      b.match.optionality = !0
                    }), h = m[m.length - 1].match, q !== c || !r(h, w)) return !0;
                    n = !0,
                    j = b
                  }
                } else if (g.isAlternator) {
                  var x,
                  y = g,
                  z = [
                  ],
                  A = m.slice(),
                  B = i.length,
                  C = e.length > 0 ? e.shift() : - 1;
                  if ( - 1 === C || 'string' == typeof C) {
                    var D,
                    E = j,
                    F = e.slice(),
                    G = [
                    ];
                    if ('string' == typeof C) G = C.split(',');
                     else for (D = 0; D < y.matches.length; D++) G.push(D.toString());
                    if (p().excludes[b]) {
                      for (var H = G.slice(), I = 0, J = p().excludes[b].length; I < J; I++) G.splice(G.indexOf(p().excludes[b][I].toString()), 1);
                      0 === G.length && (p().excludes[b] = c, G = H)
                    }(!0 === k.keepStatic || isFinite(parseInt(k.keepStatic)) && E >= k.keepStatic) && (G = G.slice(0, 1));
                    for (var K = !1, L = 0; L < G.length; L++) {
                      D = parseInt(G[L]),
                      m = [
                      ],
                      e = 'string' == typeof C ? s(j, D, B) || F.slice() : F.slice(),
                      y.matches[D] && l(y.matches[D], [
                        D
                      ].concat(i), q) ? g = !0 : 0 === L && (K = !0),
                      x = m.slice(),
                      j = E,
                      m = [
                      ];
                      for (var M = 0; M < x.length; M++) {
                        var N = x[M],
                        O = !1;
                        N.match.jit = N.match.jit || K,
                        N.alternation = N.alternation || B,
                        v(N);
                        for (var P = 0; P < z.length; P++) {
                          var Q = z[P];
                          if ('string' != typeof C || N.alternation !== c && - 1 !== a.inArray(N.locator[N.alternation].toString(), G)) {
                            if (N.match.nativeDef === Q.match.nativeDef) {
                              O = !0,
                              v(Q, N);
                              break
                            }
                            if (t(N, Q)) {
                              v(N, Q) && (O = !0, z.splice(z.indexOf(Q), 0, N));
                              break
                            }
                            if (t(Q, N)) {
                              v(Q, N);
                              break
                            }
                            if (u(N, Q)) {
                              v(N, Q) && (O = !0, z.splice(z.indexOf(Q), 0, N));
                              break
                            }
                          }
                        }
                        O || z.push(N)
                      }
                    }
                    m = A.concat(z),
                    j = b,
                    n = m.length > 0,
                    g = z.length > 0,
                    e = F.slice()
                  } else g = l(y.matches[C] || d.matches[C], [
                    C
                  ].concat(i), q);
                  if (g) return !0
                } else if (g.isQuantifier && q !== d.matches[a.inArray(g, d.matches) - 1]) for (var R = g, S = e.length > 0 ? e.shift() : 0; S < (isNaN(R.quantifier.max) ? S + 1 : R.quantifier.max) && j <= b; S++) {
                  var T = d.matches[a.inArray(R, d.matches) - 1];
                  if (g = l(T, [
                    S
                  ].concat(i), T)) {
                    if (h = m[m.length - 1].match, h.optionalQuantifier = S >= R.quantifier.min, h.jit = (S || 1) * T.matches.indexOf(h) >= R.quantifier.jit, h.optionalQuantifier && r(h, T)) {
                      n = !0,
                      j = b;
                      break
                    }
                    return h.jit && (p().jitOffset[b] = T.matches.indexOf(h)),
                    !0
                  }
                } else if (g = f(g, e, i, q)) return !0
              } else j++
            }
            for (var q = e.length > 0 ? e.shift() : 0; q < d.matches.length; q++) if (!0 !== d.matches[q].isQuantifier) {
              var r = l(d.matches[q], [
                q
              ].concat(g), i);
              if (r && j === b) return r;
              if (j > b) break
            }
          }
          function g(b, d) {
            var e = [
            ];
            return a.isArray(d) || (d = [
              d
            ]),
            d.length > 0 && (d[0].alternation === c ? (e = u(b, d.slice()).locator.slice(), 0 === e.length && (e = d[0].locator.slice())) : a.each(d, function (a, b) {
              if ('' !== b.def) if (0 === e.length) e = b.locator.slice();
               else for (var c = 0; c < e.length; c++) b.locator[c] && - 1 === e[c].toString().indexOf(b.locator[c]) && (e[c] += ',' + b.locator[c])
            })),
            e
          }
          var h,
          i = p().maskToken,
          j = d ? e : 0,
          l = d ? d.slice() : [
            0
          ],
          m = [
          ],
          n = !1,
          o = d ? d.join('') : '';
          if (b > - 1) {
            if (d === c) {
              for (var q, r = b - 1; (q = p().validPositions[r] || p().tests[r]) === c && r > - 1; ) r--;
              q !== c && r > - 1 && (l = g(r, q), o = l.join(''), j = r)
            }
            if (p().tests[b] && p().tests[b][0].cd === o) return p().tests[b];
            for (var s = l.shift(); s < i.length; s++) {
              if (f(i[s], l, [
                s
              ]) && j === b || j > b) break
            }
          }
          return (0 === m.length || n) && m.push({
            match: {
              fn: null,
              optionality: !1,
              casing: null,
              def: '',
              placeholder: ''
            },
            locator: [
            ],
            mloc: {
            },
            cd: o
          }),
          d !== c && p().tests[b] ? a.extend(!0, [
          ], m) : (p().tests[b] = a.extend(!0, [
          ], m), p().tests[b])
        }
        function z() {
          return p()._buffer === c && (p()._buffer = ja(!1, 1), p().buffer === c && (p().buffer = p()._buffer.slice())),
          p()._buffer
        }
        function A(a) {
          return p().buffer !== c && !0 !== a || (p().buffer = ja(!0, r(), !0), p()._buffer === c && (p()._buffer = p().buffer.slice())),
          p().buffer
        }
        function B(a, b, d) {
          var e,
          f;
          if (!0 === a) q(),
          a = 0,
          b = d.length;
           else for (e = a; e < b; e++) delete p().validPositions[e];
          for (f = a, e = a; e < b; e++) if (q(!0), d[e] !== k.skipOptionalPartCharacter) {
            var g = F(f, d[e], !0, !0);
            !1 !== g && (q(!0), f = g.caret !== c ? g.caret : g.pos + 1)
          }
        }
        function C(b, c, e) {
          switch (k.casing || c.casing) {
            case 'upper':
              b = b.toUpperCase();
              break;
            case 'lower':
              b = b.toLowerCase();
              break;
            case 'title':
              var f = p().validPositions[e - 1];
              b = 0 === e || f && f.input === String.fromCharCode(d.keyCode.SPACE) ? b.toUpperCase() : b.toLowerCase();
              break;
            default:
              if (a.isFunction(k.casing)) {
                var g = Array.prototype.slice.call(arguments);
                g.push(p().validPositions),
                b = k.casing.apply(this, g)
              }
          }
          return b
        }
        function D(b, d, e) {
          for (var f, g = k.greedy ? d : d.slice(0, 1), h = !1, i = e !== c ? e.split(',') : [
          ], j = 0; j < i.length; j++) - 1 !== (f = b.indexOf(i[j])) && b.splice(f, 1);
          for (var l = 0; l < b.length; l++) if ( - 1 !== a.inArray(b[l], g)) {
            h = !0;
            break
          }
          return h
        }
        function E(b, d, e, f, g) {
          var h,
          i,
          j,
          k,
          l,
          m,
          n,
          o = a.extend(!0, {
          }, p().validPositions),
          t = !1,
          u = g !== c ? g : r();
          if ( - 1 === u && g === c) h = 0,
          k = w(h),
          i = k.alternation;
           else for (; u >= 0; u--) if ((j = p().validPositions[u]) && j.alternation !== c) {
            if (k && k.locator[j.alternation] !== j.locator[j.alternation]) break;
            h = u,
            i = p().validPositions[h].alternation,
            k = j
          }
          if (i !== c) {
            n = parseInt(h),
            p().excludes[n] = p().excludes[n] || [
            ],
            !0 !== b && p().excludes[n].push(s(k));
            var v = [
            ],
            x = 0;
            for (l = n; l < r(c, !0) + 1; l++) m = p().validPositions[l],
            m && !0 !== m.generatedInput ? v.push(m.input) : l < b && x++,
            delete p().validPositions[l];
            for (; p().excludes[n] && p().excludes[n].length < 10; ) {
              var y = - 1 * x,
              z = v.slice();
              for (p().tests[n] = c, q(!0), t = !0; z.length > 0; ) {
                var A = z.shift();
                if (!(t = F(r(c, !0) + 1, A, !1, f, !0))) break
              }
              if (t && d !== c) {
                var B = r(b) + 1;
                for (l = n; l < r() + 1; l++) ((m = p().validPositions[l]) === c || null == m.match.fn) && l < b + y && y++;
                b += y,
                t = F(b > B ? B : b, d, e, f, !0)
              }
              if (t) break;
              if (q(), k = w(n), p().validPositions = a.extend(!0, {
              }, o), !p().excludes[n]) {
                t = E(b, d, e, f, n - 1);
                break
              }
              var C = s(k);
              if ( - 1 !== p().excludes[n].indexOf(C)) {
                t = E(b, d, e, f, n - 1);
                break
              }
              for (p().excludes[n].push(C), l = n; l < r(c, !0) + 1; l++) delete p().validPositions[l]
            }
          }
          return p().excludes[n] = c,
          t
        }
        function F(b, d, e, f, g, h) {
          function i(a) {
            return ea ? a.begin - a.end > 1 || a.begin - a.end == 1 : a.end - a.begin > 1 || a.end - a.begin == 1
          }
          function j(d, e, g) {
            var h = !1;
            return a.each(y(d), function (j, l) {
              var m = l.match;
              if (A(!0), !1 !== (h = null != m.fn ? m.fn.test(e, p(), d, g, k, i(b)) : (e === m.def || e === k.skipOptionalPartCharacter) && '' !== m.def && {
                c: M(d, m, !0) || m.def,
                pos: d
              })) {
                var n = h.c !== c ? h.c : e,
                o = d;
                return n = n === k.skipOptionalPartCharacter && null === m.fn ? M(d, m, !0) || m.def : n,
                (h.remove !== c && (a.isArray(h.remove) || (h.remove = [
                  h.remove
                ]), a.each(h.remove.sort(function (a, b) {
                  return b - a
                }), function (a, b) {
                  H({
                    begin: b,
                    end: b + 1
                  })
                })), h.insert !== c && (a.isArray(h.insert) || (h.insert = [
                  h.insert
                ]), a.each(h.insert.sort(function (a, b) {
                  return a - b
                }), function (a, b) {
                  F(b.pos, b.c, !0, f)
                })), !0 !== h && h.pos !== c && h.pos !== d && (o = h.pos), !0 !== h && h.pos === c && h.c === c) ? !1 : (H(b, a.extend({
                }, l, {
                  input: C(n, m, o)
                }), f, o) || (h = !1), !1)
              }
            }),
            h
          }
          e = !0 === e;
          var l = b;
          b.begin !== c && (l = ea ? b.end : b.begin);
          var m = !0,
          n = a.extend(!0, {
          }, p().validPositions);
          if (a.isFunction(k.preValidation) && !e && !0 !== f && !0 !== h && (m = k.preValidation(A(), l, d, i(b), k, p())), !0 === m) {
            if (G(c, l, !0), ($ === c || l < $) && (m = j(l, d, e), (!e || !0 === f) && !1 === m && !0 !== h)) {
              var o = p().validPositions[l];
              if (!o || null !== o.match.fn || o.match.def !== d && d !== k.skipOptionalPartCharacter) {
                if ((k.insertMode || p().validPositions[J(l)] === c) && (!I(l, !0) || p().jitOffset[l])) if (p().jitOffset[l] && p().validPositions[J(l)] === c) !1 !== (m = F(l + p().jitOffset[l], d, e)) && (m.caret = l);
                 else for (var r = l + 1, s = J(l); r <= s; r++) if (!1 !== (m = j(r, d, e))) {
                  m = G(l, m.pos !== c ? m.pos : r) || m,
                  l = r;
                  break
                }
              } else m = {
                caret: J(l)
              }
            }
            !1 !== m || !1 === k.keepStatic || null != k.regex && !T(A()) || e || !0 === g || (m = E(l, d, e, f)),
            !0 === m && (m = {
              pos: l
            })
          }
          if (a.isFunction(k.postValidation) && !1 !== m && !e && !0 !== f && !0 !== h) {
            var t = k.postValidation(A(!0), b.begin !== c ? ea ? b.end : b.begin : b, m, k);
            if (t !== c) {
              if (t.refreshFromBuffer && t.buffer) {
                var u = t.refreshFromBuffer;
                B(!0 === u ? u : u.start, u.end, t.buffer)
              }
              m = !0 === t ? m : t
            }
          }
          return m && m.pos === c && (m.pos = l),
          !1 !== m && !0 !== h || (q(!0), p().validPositions = a.extend(!0, {
          }, n)),
          m
        }
        function G(b, d, e) {
          var f;
          if (b === c) for (b = d - 1; b > 0 && !p().validPositions[b]; b--);
          for (var g = b; g < d; g++) if (p().validPositions[g] === c && !I(g, !0)) {
            var h = 0 == g ? w(g) : p().validPositions[g - 1];
            if (h) {
              var i = y(g).slice();
              '' === i[i.length - 1].match.def && i.pop();
              var j = u(g, i);
              if (j = a.extend({
              }, j, {
                input: M(g, j.match, !0) || j.match.def
              }), j.generatedInput = !0, H(g, j, !0), !0 !== e) {
                var k = p().validPositions[d].input;
                p().validPositions[d] = c,
                f = F(d, k, !0, !0)
              }
            }
          }
          return f
        }
        function H(b, d, e, f) {
          function g(a, b, d) {
            var e = b[a];
            if (e !== c && (null === e.match.fn && !0 !== e.match.optionality || e.input === k.radixPoint)) {
              var f = d.begin <= a - 1 ? b[a - 1] && null === b[a - 1].match.fn && b[a - 1] : b[a - 1],
              g = d.end > a + 1 ? b[a + 1] && null === b[a + 1].match.fn && b[a + 1] : b[a + 1];
              return f && g
            }
            return !1
          }
          var h = b.begin !== c ? b.begin : b,
          i = b.end !== c ? b.end : b;
          if (b.begin > b.end && (h = b.end, i = b.begin), f = f !== c ? f : h, h !== i || k.insertMode && p().validPositions[f] !== c && e === c) {
            var j,
            l = a.extend(!0, {
            }, p().validPositions),
            m = r(c, !0);
            for (p().p = h, j = m; j >= h; j--) p().validPositions[j] && '+' === p().validPositions[j].match.nativeDef && (k.isNegative = !1),
            delete p().validPositions[j];
            var n = !0,
            o = f,
            s = (p().validPositions, !1),
            t = o,
            j = o;
            for (d && (p().validPositions[f] = a.extend(!0, {
            }, d), t++, o++, h < i && j++); j <= m; j++) {
              var u = l[j];
              if (u !== c && (j >= i || j >= h && !0 !== u.generatedInput && g(j, l, {
                begin: h,
                end: i
              }))) {
                for (; '' !== w(t).match.def; ) {
                  if (!1 === s && l[t] && l[t].match.nativeDef === u.match.nativeDef) p().validPositions[t] = a.extend(!0, {
                  }, l[t]),
                  p().validPositions[t].input = u.input,
                  G(c, t, !0),
                  o = t + 1,
                  n = !0;
                   else if (k.shiftPositions && x(t, u.match.def)) {
                    var v = F(t, u.input, !0, !0);
                    n = !1 !== v,
                    o = v.caret || v.insert ? r() : t + 1,
                    s = !0
                  } else n = !0 === u.generatedInput || u.input === k.radixPoint && !0 === k.numericInput;
                  if (n) break;
                  if (!n && t > i && I(t, !0) && (null !== u.match.fn || t > p().maskLength)) break;
                  t++
                }
                '' == w(t).match.def && (n = !1),
                t = o
              }
              if (!n) break
            }
            if (!n) return p().validPositions = a.extend(!0, {
            }, l),
            q(!0),
            !1
          } else d && (p().validPositions[f] = a.extend(!0, {
          }, d));
          return q(!0),
          !0
        }
        function I(a, b) {
          var c = v(a).match;
          if ('' === c.def && (c = w(a).match), null != c.fn) return c.fn;
          if (!0 !== b && a > - 1) {
            var d = y(a);
            return d.length > 1 + ('' === d[d.length - 1].match.def ? 1 : 0)
          }
          return !1
        }
        function J(a, b) {
          for (var c = a + 1; '' !== w(c).match.def && (!0 === b && (!0 !== w(c).match.newBlockMarker || !I(c)) || !0 !== b && !I(c)); ) c++;
          return c
        }
        function K(a, b) {
          var c,
          d = a;
          if (d <= 0) return 0;
          for (; --d > 0 && (!0 === b && !0 !== w(d).match.newBlockMarker || !0 !== b && !I(d) && (c = y(d), c.length < 2 || 2 === c.length && '' === c[1].match.def)); );
          return d
        }
        function L(b, d, e, f, g) {
          if (f && a.isFunction(k.onBeforeWrite)) {
            var h = k.onBeforeWrite.call(ca, f, d, e, k);
            if (h) {
              if (h.refreshFromBuffer) {
                var i = h.refreshFromBuffer;
                B(!0 === i ? i : i.start, i.end, h.buffer || d),
                d = A(!0)
              }
              e !== c && (e = h.caret !== c ? h.caret : e)
            }
          }
          if (b !== c && (b.inputmask._valueSet(d.join('')), e === c || f !== c && 'blur' === f.type ? W(b, e, 0 === d.length) : Q(b, e), !0 === g)) {
            var j = a(b),
            l = b.inputmask._valueGet();
            ga = !0,
            j.trigger('input'),
            setTimeout(function () {
              l === z().join('') ? j.trigger('cleared') : !0 === T(d) && j.trigger('complete')
            }, 0)
          }
        }
        function M(b, d, e) {
          if (d = d || w(b).match, d.placeholder !== c || !0 === e) return a.isFunction(d.placeholder) ? d.placeholder(k) : d.placeholder;
          if (null === d.fn) {
            if (b > - 1 && p().validPositions[b] === c) {
              var f,
              g = y(b),
              h = [
              ];
              if (g.length > 1 + ('' === g[g.length - 1].match.def ? 1 : 0)) for (var i = 0; i < g.length; i++) if (!0 !== g[i].match.optionality && !0 !== g[i].match.optionalQuantifier && (null === g[i].match.fn || f === c || !1 !== g[i].match.fn.test(f.match.def, p(), b, !0, k)) && (h.push(g[i]), null === g[i].match.fn && (f = g[i]), h.length > 1 && /[0-9a-bA-Z]/.test(h[0].match.def))) return k.placeholder.charAt(b % k.placeholder.length)
            }
            return d.def
          }
          return k.placeholder.charAt(b % k.placeholder.length)
        }
        function N(a, b) {
          if (l) {
            if (a.inputmask._valueGet() !== b && (a.placeholder !== b || '' === a.placeholder)) {
              var c = A().slice(),
              d = a.inputmask._valueGet();
              if (d !== b) {
                var e = r();
                - 1 === e && d === z().join('') ? c = [
                ] : - 1 !== e && S(c),
                L(a, c)
              }
            }
          } else a.placeholder !== b && (a.placeholder = b, '' === a.placeholder && a.removeAttribute('placeholder'))
        }
        function O(b, e, f, g, h) {
          function i(a, b) {
            return - 1 !== ja(!0, 0, !1).slice(a, J(a)).join('').replace(/'/g, '').indexOf(b) && !I(a) && (w(a).match.nativeDef === b.charAt(0) || null === w(a).match.fn && w(a).match.nativeDef === '\'' + b.charAt(0) || ' ' === w(a).match.nativeDef && (w(a + 1).match.nativeDef === b.charAt(0) || null === w(a + 1).match.fn && w(a + 1).match.nativeDef === '\'' + b.charAt(0)))
          }
          var j = this || b.inputmask,
          l = g.slice(),
          m = '',
          n = - 1,
          o = c;
          if (q(), f || !0 === k.autoUnmask) n = J(n);
           else {
            var s = z().slice(0, J( - 1)).join(''),
            t = l.join('').match(new RegExp('^' + d.escapeRegex(s), 'g'));
            t && t.length > 0 && (l.splice(0, t.length * s.length), n = J(n))
          }
          - 1 === n ? (p().p = J(n), n = 0) : p().p = n,
          j.caretPos = {
            begin: n
          },
          a.each(l, function (d, e) {
            if (e !== c) if (p().validPositions[d] === c && l[d] === M(d) && I(d, !0) && !1 === F(d, l[d], !0, c, c, !0)) p().p++;
             else {
              var g = new a.Event('_checkval');
              g.which = e.charCodeAt(0),
              m += e;
              var h = r(c, !0);
              i(n, m) ? o = la.keypressEvent.call(b, g, !0, !1, f, h + 1) : (o = la.keypressEvent.call(b, g, !0, !1, f, j.caretPos.begin)) && (n = j.caretPos.begin + 1, m = ''),
              o && (L(c, A(), o.forwardPosition, g, !1), j.caretPos = {
                begin: o.forwardPosition,
                end: o.forwardPosition
              })
            }
          }),
          e && L(b, A(), o ? o.forwardPosition : c, h || new a.Event('checkval'), h && 'input' === h.type)
        }
        function P(b) {
          if (b) {
            if (b.inputmask === c) return b.value;
            b.inputmask && b.inputmask.refreshValue && la.setValueEvent.call(b)
          }
          var d = [
          ],
          e = p().validPositions;
          for (var f in e) e[f].match && null != e[f].match.fn && d.push(e[f].input);
          var g = 0 === d.length ? '' : (ea ? d.reverse() : d).join('');
          if (a.isFunction(k.onUnMask)) {
            var h = (ea ? A().slice().reverse() : A()).join('');
            g = k.onUnMask.call(ca, h, g, k)
          }
          return g
        }
        function Q(d, e, f, g) {
          function h(a) {
            return !ea || 'number' != typeof a || k.greedy && '' === k.placeholder || !da || (a = da.inputmask._valueGet().length - a),
            a
          }
          var i;
          if (e === c) return 'selectionStart' in d ? (e = d.selectionStart, f = d.selectionEnd) : b.getSelection ? (i = b.getSelection().getRangeAt(0), i.commonAncestorContainer.parentNode !== d && i.commonAncestorContainer !== d || (e = i.startOffset, f = i.endOffset)) : j.selection && j.selection.createRange && (i = j.selection.createRange(), e = 0 - i.duplicate().moveStart('character', - d.inputmask._valueGet().length), f = e + i.text.length),
          {
            begin: g ? e : h(e),
            end: g ? f : h(f)
          };
          if (a.isArray(e) && (f = ea ? e[0] : e[1], e = ea ? e[1] : e[0]), e.begin !== c && (f = ea ? e.begin : e.end, e = ea ? e.end : e.begin), 'number' == typeof e) {
            e = g ? e : h(e),
            f = g ? f : h(f),
            f = 'number' == typeof f ? f : e;
            var l = parseInt(((d.ownerDocument.defaultView || b).getComputedStyle ? (d.ownerDocument.defaultView || b).getComputedStyle(d, null) : d.currentStyle).fontSize) * f;
            if (d.scrollLeft = l > d.scrollWidth ? l : 0, d.inputmask.caretPos = {
              begin: e,
              end: f
            }, d === j.activeElement) {
              if ('selectionStart' in d) d.selectionStart = e,
              d.selectionEnd = f;
               else if (b.getSelection) {
                if (i = j.createRange(), d.firstChild === c || null === d.firstChild) {
                  var m = j.createTextNode('');
                  d.appendChild(m)
                }
                i.setStart(d.firstChild, e < d.inputmask._valueGet().length ? e : d.inputmask._valueGet().length),
                i.setEnd(d.firstChild, f < d.inputmask._valueGet().length ? f : d.inputmask._valueGet().length),
                i.collapse(!0);
                var n = b.getSelection();
                n.removeAllRanges(),
                n.addRange(i)
              } else d.createTextRange && (i = d.createTextRange(), i.collapse(!0), i.moveEnd('character', f), i.moveStart('character', e), i.select());
              W(d, {
                begin: e,
                end: f
              })
            }
          }
        }
        function R(b) {
          var d,
          e,
          f = ja(!0, r(), !0, !0),
          g = f.length,
          h = r(),
          i = {
          },
          j = p().validPositions[h],
          k = j !== c ? j.locator.slice() : c;
          for (d = h + 1; d < f.length; d++) e = v(d, k, d - 1),
          k = e.locator.slice(),
          i[d] = a.extend(!0, {
          }, e);
          var l = j && j.alternation !== c ? j.locator[j.alternation] : c;
          for (d = g - 1; d > h && (e = i[d], (e.match.optionality || e.match.optionalQuantifier && e.match.newBlockMarker || l && (l !== i[d].locator[j.alternation] && null != e.match.fn || null === e.match.fn && e.locator[j.alternation] && D(e.locator[j.alternation].toString().split(','), l.toString().split(',')) && '' !== y(d) [0].def)) && f[d] === M(d, e.match)); d--) g--;
          return b ? {
            l: g,
            def: i[g] ? i[g].match : c
          }
           : g
        }
        function S(a) {
          a.length = 0;
          for (var b, d = ja(!0, 0, !0, c, !0); (b = d.shift()) !== c; ) a.push(b);
          return a
        }
        function T(b) {
          if (a.isFunction(k.isComplete)) return k.isComplete(b, k);
          if ('*' === k.repeat) return c;
          var d = !1,
          e = R(!0),
          f = K(e.l);
          if (e.def === c || e.def.newBlockMarker || e.def.optionality || e.def.optionalQuantifier) {
            d = !0;
            for (var g = 0; g <= f; g++) {
              var h = v(g).match;
              if (null !== h.fn && p().validPositions[g] === c && !0 !== h.optionality && !0 !== h.optionalQuantifier || null === h.fn && b[g] !== M(g, h)) {
                d = !1;
                break
              }
            }
          }
          return d
        }
        function U(a, b, e, f, g) {
          if ((k.numericInput || ea) && (b === d.keyCode.BACKSPACE ? b = d.keyCode.DELETE : b === d.keyCode.DELETE && (b = d.keyCode.BACKSPACE), ea)) {
            var h = e.end;
            e.end = e.begin,
            e.begin = h
          }
          if (b === d.keyCode.BACKSPACE && e.end - e.begin < 1 ? (e.begin = K(e.begin), p().validPositions[e.begin] !== c && p().validPositions[e.begin].input === k.groupSeparator && e.begin--) : b === d.keyCode.DELETE && e.begin === e.end && (e.end = I(e.end, !0) && p().validPositions[e.end] && p().validPositions[e.end].input !== k.radixPoint ? e.end + 1 : J(e.end) + 1, p().validPositions[e.begin] !== c && p().validPositions[e.begin].input === k.groupSeparator && e.end++), H(e), !0 !== f && !1 !== k.keepStatic || null !== k.regex) {
            var i = E(!0);
            if (i) {
              var j = i.caret !== c ? i.caret : i.pos ? J(i.pos.begin ? i.pos.begin : i.pos) : r( - 1, !0);
              (b !== d.keyCode.DELETE || e.begin > j) && e.begin
            }
          }
          var l = r(e.begin, !0);
          if (l < e.begin || - 1 === e.begin) p().p = J(l);
           else if (!0 !== f && (p().p = e.begin, !0 !== g)) for (; p().p < l && p().validPositions[p().p] === c; ) p().p++
        }
        function V(c) {
          function d(a) {
            var b,
            d = j.createElement('span');
            for (var f in e) isNaN(f) && - 1 !== f.indexOf('font') && (d.style[f] = e[f]);
            d.style.textTransform = e.textTransform,
            d.style.letterSpacing = e.letterSpacing,
            d.style.position = 'absolute',
            d.style.height = 'auto',
            d.style.width = 'auto',
            d.style.visibility = 'hidden',
            d.style.whiteSpace = 'nowrap',
            j.body.appendChild(d);
            var g,
            h = c.inputmask._valueGet(),
            i = 0;
            for (b = 0, g = h.length; b <= g; b++) {
              if (d.innerHTML += h.charAt(b) || '_', d.offsetWidth >= a) {
                var k = a - i,
                l = d.offsetWidth - a;
                d.innerHTML = h.charAt(b),
                k -= d.offsetWidth / 3,
                b = k < l ? b - 1 : b;
                break
              }
              i = d.offsetWidth
            }
            return j.body.removeChild(d),
            b
          }
          var e = (c.ownerDocument.defaultView || b).getComputedStyle(c, null),
          f = j.createElement('div');
          f.style.width = e.width,
          f.style.textAlign = e.textAlign,
          _ = j.createElement('div'),
          c.inputmask.colorMask = _,
          _.className = 'im-colormask',
          c.parentNode.insertBefore(_, c),
          c.parentNode.removeChild(c),
          _.appendChild(c),
          _.appendChild(f),
          c.style.left = f.offsetLeft + 'px',
          a(_).on('mouseleave', function (a) {
            return la.mouseleaveEvent.call(c, [
              a
            ])
          }),
          a(_).on('mouseenter', function (a) {
            return la.mouseenterEvent.call(c, [
              a
            ])
          }),
          a(_).on('click', function (a) {
            return Q(c, d(a.clientX)),
            la.clickEvent.call(c, [
              a
            ])
          })
        }
        function W(a, b, d) {
          function e(a) {
            if (a === c && (a = ''), m || null !== g.fn && h.input !== c) if (m && (null !== g.fn && h.input !== c || '' === g.def)) {
              m = !1;
              var b = l.length;
              l[b - 1] = l[b - 1] + '</span>',
              l.push(a)
            } else l.push(a);
             else m = !0,
            l.push('<span class=\'im-static\'>' + a)
          }
          function f() {
            j.activeElement === a && (l.splice(b.begin, 0, b.begin === b.end || b.end > p().maskLength ? '<mark class="im-caret" style="border-right-width: 1px;border-right-style: solid;">' : '<mark class="im-caret-select">'), l.splice(b.end + 1, 0, '</mark>'))
          }
          var g,
          h,
          i,
          l = [
          ],
          m = !1,
          n = 0;
          if (_ !== c) {
            var o = A();
            if (b === c ? b = Q(a) : b.begin === c && (b = {
              begin: b,
              end: b
            }), !0 !== d) {
              var q = r();
              do {
                p().validPositions[n] ? (h = p().validPositions[n], g = h.match, i = h.locator.slice(), e(o[n])) : (h = v(n, i, n - 1), g = h.match, i = h.locator.slice(), !1 === k.jitMasking || n < q || 'number' == typeof k.jitMasking && isFinite(k.jitMasking) && k.jitMasking > n ? e(M(n, g)) : m = !1),
                n++
              } while (($ === c || n < $) && (null !== g.fn || '' !== g.def) || q > n || m);
              m && e(),
              f()
            }
            var s = _.getElementsByTagName('div') [0];
            s.innerHTML = l.join(''),
            a.inputmask.positionColorMask(a, s)
          }
        }
        function X(b) {
          function d(b, d) {
            function e(b) {
              function e(b) {
                if (a.valHooks && (a.valHooks[b] === c || !0 !== a.valHooks[b].inputmaskpatch)) {
                  var e = a.valHooks[b] && a.valHooks[b].get ? a.valHooks[b].get : function (a) {
                    return a.value
                  },
                  f = a.valHooks[b] && a.valHooks[b].set ? a.valHooks[b].set : function (a, b) {
                    return a.value = b,
                    a
                  };
                  a.valHooks[b] = {
                    get: function (a) {
                      if (a.inputmask) {
                        if (a.inputmask.opts.autoUnmask) return a.inputmask.unmaskedvalue();
                        var b = e(a);
                        return - 1 !== r(c, c, a.inputmask.maskset.validPositions) || !0 !== d.nullable ? b : ''
                      }
                      return e(a)
                    },
                    set: function (b, c) {
                      var d,
                      e = a(b);
                      return d = f(b, c),
                      b.inputmask && e.trigger('setvalue', [
                        c
                      ]),
                      d
                    },
                    inputmaskpatch: !0
                  }
                }
              }
              function f() {
                return this.inputmask ? this.inputmask.opts.autoUnmask ? this.inputmask.unmaskedvalue() : - 1 !== r() || !0 !== d.nullable ? j.activeElement === this && d.clearMaskOnLostFocus ? (ea ? S(A().slice()).reverse() : S(A().slice())).join('') : k.call(this) : '' : k.call(this)
              }
              function h(b) {
                l.call(this, b),
                this.inputmask && a(this).trigger('setvalue', [
                  b
                ])
              }
              function i(b) {
                ka.on(b, 'mouseenter', function (b) {
                  var c = a(this);
                  this.inputmask._valueGet() !== A().join('') && c.trigger('setvalue')
                })
              }
              var k,
              l;
              if (!b.inputmask.__valueGet) {
                if (!0 !== d.noValuePatching) {
                  if (Object.getOwnPropertyDescriptor) {
                    'function' != typeof Object.getPrototypeOf && (Object.getPrototypeOf = 'object' === g('test'.__proto__) ? function (a) {
                      return a.__proto__
                    }
                     : function (a) {
                      return a.constructor.prototype
                    });
                    var m = Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(b), 'value') : c;
                    m && m.get && m.set ? (k = m.get, l = m.set, Object.defineProperty(b, 'value', {
                      get: f,
                      set: h,
                      configurable: !0
                    })) : 'INPUT' !== b.tagName && (k = function () {
                      return this.textContent
                    }, l = function (a) {
                      this.textContent = a
                    }, Object.defineProperty(b, 'value', {
                      get: f,
                      set: h,
                      configurable: !0
                    }))
                  } else j.__lookupGetter__ && b.__lookupGetter__('value') && (k = b.__lookupGetter__('value'), l = b.__lookupSetter__('value'), b.__defineGetter__('value', f), b.__defineSetter__('value', h));
                  b.inputmask.__valueGet = k,
                  b.inputmask.__valueSet = l
                }
                b.inputmask._valueGet = function (a) {
                  return ea && !0 !== a ? k.call(this.el).split('').reverse().join('') : k.call(this.el)
                },
                b.inputmask._valueSet = function (a, b) {
                  l.call(this.el, null === a || a === c ? '' : !0 !== b && ea ? a.split('').reverse().join('') : a)
                },
                k === c && (k = function () {
                  return this.value
                }, l = function (a) {
                  this.value = a
                }, e(b.type), i(b))
              }
            }
            var f = b.getAttribute('type'),
            h = 'INPUT' === b.tagName && - 1 !== a.inArray(f, d.supportsInputType) || b.isContentEditable || 'TEXTAREA' === b.tagName;
            if (!h) if ('INPUT' === b.tagName) {
              var i = j.createElement('input');
              i.setAttribute('type', f),
              h = 'text' === i.type,
              i = null
            } else h = 'partial';
            return !1 !== h ? e(b) : b.inputmask = c,
            h
          }
          ka.off(b);
          var e = d(b, k);
          if (!1 !== e && (da = b, Z = a(da), aa = da.placeholder, $ = da !== c ? da.maxLength : c, - 1 === $ && ($ = c), !0 === k.colorMask && V(da), m && ('inputMode' in da && (da.inputmode = k.inputmode, da.setAttribute('inputmode', k.inputmode)), !0 === k.disablePredictiveText && ('autocorrect' in da ? da.autocorrect = !1 : (!0 !== k.colorMask && V(da), da.type = 'password'))), !0 === e && (da.setAttribute('im-insert', k.insertMode), ka.on(da, 'submit', la.submitEvent), ka.on(da, 'reset', la.resetEvent), ka.on(da, 'blur', la.blurEvent), ka.on(da, 'focus', la.focusEvent), !0 !== k.colorMask && (ka.on(da, 'click', la.clickEvent), ka.on(da, 'mouseleave', la.mouseleaveEvent), ka.on(da, 'mouseenter', la.mouseenterEvent)), ka.on(da, 'paste', la.pasteEvent), ka.on(da, 'cut', la.cutEvent), ka.on(da, 'complete', k.oncomplete), ka.on(da, 'incomplete', k.onincomplete), ka.on(da, 'cleared', k.oncleared), m || !0 === k.inputEventOnly ? da.removeAttribute('maxLength') : (ka.on(da, 'keydown', la.keydownEvent), ka.on(da, 'keypress', la.keypressEvent)), ka.on(da, 'input', la.inputFallBackEvent), ka.on(da, 'beforeinput', la.beforeInputEvent)), ka.on(da, 'setvalue', la.setValueEvent), Y = z().join(''), '' !== da.inputmask._valueGet(!0) || !1 === k.clearMaskOnLostFocus || j.activeElement === da)) {
            var f = a.isFunction(k.onBeforeMask) ? k.onBeforeMask.call(ca, da.inputmask._valueGet(!0), k) || da.inputmask._valueGet(!0) : da.inputmask._valueGet(!0);
            '' !== f && O(da, !0, !1, f.split(''));
            var h = A().slice();
            Y = h.join(''),
            !1 === T(h) && k.clearIncomplete && q(),
            k.clearMaskOnLostFocus && j.activeElement !== da && ( - 1 === r() ? h = [
            ] : S(h)),
            (!1 === k.clearMaskOnLostFocus || k.showMaskOnFocus && j.activeElement === da || '' !== da.inputmask._valueGet(!0)) && L(da, h),
            j.activeElement === da && Q(da, J(r()))
          }
        }
        f = f || this.maskset,
        k = k || this.opts;
        var Y,
        Z,
        $,
        _,
        aa,
        ba,
        ca = this,
        da = this.el,
        ea = this.isRTL,
        fa = !1,
        ga = !1,
        ha = !1,
        ia = !1,
        ja = function (a, b, d, e, f) {
          var g = k.greedy;
          f && (k.greedy = !1),
          b = b || 0;
          var h,
          i,
          j,
          l = [
          ],
          m = 0;
          r();
          do {
            if (!0 === a && p().validPositions[m]) j = f && !0 === p().validPositions[m].match.optionality && p().validPositions[m + 1] === c && (!0 === p().validPositions[m].generatedInput || p().validPositions[m].input == k.skipOptionalPartCharacter && m > 0) ? u(m, y(m, h, m - 1)) : p().validPositions[m],
            i = j.match,
            h = j.locator.slice(),
            l.push(!0 === d ? j.input : !1 === d ? i.nativeDef : M(m, i));
             else {
              j = v(m, h, m - 1),
              i = j.match,
              h = j.locator.slice();
              var n = !0 !== e && (!1 !== k.jitMasking ? k.jitMasking : i.jit);
              (!1 === n || n === c || 'number' == typeof n && isFinite(n) && n > m) && l.push(!1 === d ? i.nativeDef : M(m, i))
            }
            'auto' === k.keepStatic && i.newBlockMarker && null !== i.fn && (k.keepStatic = m - 1),
            m++
          } while (($ === c || m < $) && (null !== i.fn || '' !== i.def) || b > m);
          return '' === l[l.length - 1] && l.pop(),
          !1 === d && p().maskLength !== c || (p().maskLength = m - 1),
          k.greedy = g,
          l
        },
        ka = {
          on: function (b, e, f) {
            var g = function (b) {
              var e = this;
              if (e.inputmask === c && 'FORM' !== this.nodeName) {
                var g = a.data(e, '_inputmask_opts');
                g ? new d(g).mask(e) : ka.off(e)
              } else {
                if ('setvalue' === b.type || 'FORM' === this.nodeName || !(e.disabled || e.readOnly && !('keydown' === b.type && b.ctrlKey && 67 === b.keyCode || !1 === k.tabThrough && b.keyCode === d.keyCode.TAB))) {
                  switch (b.type) {
                    case 'input':
                      if (!0 === ga) return ga = !1,
                      b.preventDefault();
                      if (m) {
                        var h = arguments;
                        return setTimeout(function () {
                          f.apply(e, h),
                          Q(e, e.inputmask.caretPos, c, !0)
                        }, 0),
                        !1
                      }
                      break;
                    case 'keydown':
                      fa = !1,
                      ga = !1;
                      break;
                    case 'keypress':
                      if (!0 === fa) return b.preventDefault();
                      fa = !0;
                      break;
                    case 'click':
                      if (n || o) {
                        var h = arguments;
                        return setTimeout(function () {
                          f.apply(e, h)
                        }, 0),
                        !1
                      }
                  }
                  var i = f.apply(e, arguments);
                  return !1 === i && (b.preventDefault(), b.stopPropagation()),
                  i
                }
                b.preventDefault()
              }
            };
            b.inputmask.events[e] = b.inputmask.events[e] || [
            ],
            b.inputmask.events[e].push(g),
            - 1 !== a.inArray(e, [
              'submit',
              'reset'
            ]) ? null !== b.form && a(b.form).on(e, g) : a(b).on(e, g)
          },
          off: function (b, c) {
            if (b.inputmask && b.inputmask.events) {
              var d;
              c ? (d = [
              ], d[c] = b.inputmask.events[c]) : d = b.inputmask.events,
              a.each(d, function (c, d) {
                for (; d.length > 0; ) {
                  var e = d.pop();
                  - 1 !== a.inArray(c, [
                    'submit',
                    'reset'
                  ]) ? null !== b.form && a(b.form).off(c, e) : a(b).off(c, e)
                }
                delete b.inputmask.events[c]
              })
            }
          }
        },
        la = {
          keydownEvent: function (b) {
            var c = this,
            e = a(c),
            f = b.keyCode,
            g = Q(c);
            if (f === d.keyCode.BACKSPACE || f === d.keyCode.DELETE || o && f === d.keyCode.BACKSPACE_SAFARI || b.ctrlKey && f === d.keyCode.X && !h('cut')) b.preventDefault(),
            U(c, f, g),
            L(c, A(!0), p().p, b, c.inputmask._valueGet() !== A().join(''));
             else if (f === d.keyCode.END || f === d.keyCode.PAGE_DOWN) {
              b.preventDefault();
              var i = J(r());
              Q(c, b.shiftKey ? g.begin : i, i, !0)
            } else f === d.keyCode.HOME && !b.shiftKey || f === d.keyCode.PAGE_UP ? (b.preventDefault(), Q(c, 0, b.shiftKey ? g.begin : 0, !0)) : (k.undoOnEscape && f === d.keyCode.ESCAPE || 90 === f && b.ctrlKey) && !0 !== b.altKey ? (O(c, !0, !1, Y.split('')), e.trigger('click')) : f !== d.keyCode.INSERT || b.shiftKey || b.ctrlKey ? !0 === k.tabThrough && f === d.keyCode.TAB && (!0 === b.shiftKey ? (null === w(g.begin).match.fn && (g.begin = J(g.begin)), g.end = K(g.begin, !0), g.begin = K(g.end, !0)) : (g.begin = J(g.begin, !0), g.end = J(g.begin, !0), g.end < p().maskLength && g.end--), g.begin < p().maskLength && (b.preventDefault(), Q(c, g.begin, g.end))) : (k.insertMode = !k.insertMode, c.setAttribute('im-insert', k.insertMode));
            k.onKeyDown.call(this, b, A(), Q(c).begin, k),
            ha = - 1 !== a.inArray(f, k.ignorables)
          },
          keypressEvent: function (b, e, f, g, h) {
            var i = this,
            j = a(i),
            l = b.which || b.charCode || b.keyCode;
            if (!(!0 === e || b.ctrlKey && b.altKey) && (b.ctrlKey || b.metaKey || ha)) return l === d.keyCode.ENTER && Y !== A().join('') && (Y = A().join(''), setTimeout(function () {
              j.trigger('change')
            }, 0)),
            !0;
            if (l) {
              46 === l && !1 === b.shiftKey && '' !== k.radixPoint && (l = k.radixPoint.charCodeAt(0));
              var m,
              n = e ? {
                begin: h,
                end: h
              }
               : Q(i),
              o = String.fromCharCode(l),
              r = 0;
              if (k._radixDance && k.numericInput) {
                var s = A().indexOf(k.radixPoint.charAt(0)) + 1;
                n.begin <= s && (l === k.radixPoint.charCodeAt(0) && (r = 1), n.begin -= 1, n.end -= 1)
              }
              p().writeOutBuffer = !0;
              var t = F(n, o, g);
              if (!1 !== t && (q(!0), m = t.caret !== c ? t.caret : J(t.pos.begin ? t.pos.begin : t.pos), p().p = m), m = (k.numericInput && t.caret === c ? K(m) : m) + r, !1 !== f && (setTimeout(function () {
                k.onKeyValidation.call(i, l, t, k)
              }, 0), p().writeOutBuffer && !1 !== t)) {
                var u = A();
                L(i, u, m, b, !0 !== e)
              }
              if (b.preventDefault(), e) return !1 !== t && (t.forwardPosition = m),
              t
            }
          },
          pasteEvent: function (c) {
            var d,
            e = this,
            f = c.originalEvent || c,
            g = (a(e), e.inputmask._valueGet(!0)),
            h = Q(e);
            ea && (d = h.end, h.end = h.begin, h.begin = d);
            var i = g.substr(0, h.begin),
            j = g.substr(h.end, g.length);
            if (i === (ea ? z().reverse() : z()).slice(0, h.begin).join('') && (i = ''), j === (ea ? z().reverse() : z()).slice(h.end).join('') && (j = ''), b.clipboardData && b.clipboardData.getData) g = i + b.clipboardData.getData('Text') + j;
             else {
              if (!f.clipboardData || !f.clipboardData.getData) return !0;
              g = i + f.clipboardData.getData('text/plain') + j
            }
            var l = g;
            if (a.isFunction(k.onBeforePaste)) {
              if (!1 === (l = k.onBeforePaste.call(ca, g, k))) return c.preventDefault();
              l || (l = g)
            }
            return O(e, !1, !1, l.toString().split('')),
            L(e, A(), J(r()), c, Y !== A().join('')),
            c.preventDefault()
          },
          inputFallBackEvent: function (b) {
            function c(a, b, c) {
              return '.' === b.charAt(c.begin - 1) && '' !== k.radixPoint && (b = b.split(''), b[c.begin - 1] = k.radixPoint.charAt(0), b = b.join('')),
              b
            }
            function e(a, b, c) {
              if (n) {
                var d = b.replace(A().join(''), '');
                if (1 === d.length) {
                  var e = b.split('');
                  e.splice(c.begin, 0, d),
                  b = e.join('')
                }
              }
              return b
            }
            var f = this,
            g = f.inputmask._valueGet();
            if (A().join('') !== g) {
              var h = Q(f);
              if (g = c(f, g, h), g = e(f, g, h), A().join('') !== g) {
                var i = A().join(''),
                j = !k.numericInput && g.length > i.length ? - 1 : 0,
                l = g.substr(0, h.begin),
                m = g.substr(h.begin),
                o = i.substr(0, h.begin + j),
                p = i.substr(h.begin + j),
                q = h,
                r = '',
                s = !1;
                if (l !== o) {
                  var t,
                  u = (s = l.length >= o.length) ? l.length : o.length;
                  for (t = 0; l.charAt(t) === o.charAt(t) && t < u; t++);
                  s && (q.begin = t - j, r += l.slice(t, q.end))
                }
                if (m !== p && (m.length > p.length ? r += m.slice(0, 1) : m.length < p.length && (q.end += p.length - m.length, s || '' === k.radixPoint || '' !== m || l.charAt(q.begin + j - 1) !== k.radixPoint || (q.begin--, r = k.radixPoint))), L(f, A(), {
                  begin: q.begin + j,
                  end: q.end + j
                }), r.length > 0) a.each(r.split(''), function (b, c) {
                  var d = new a.Event('keypress');
                  d.which = c.charCodeAt(0),
                  ha = !1,
                  la.keypressEvent.call(f, d)
                });
                 else {
                  q.begin === q.end - 1 && (q.begin = K(q.begin + 1), q.begin === q.end - 1 ? Q(f, q.begin) : Q(f, q.begin, q.end));
                  var v = new a.Event('keydown');
                  v.keyCode = k.numericInput ? d.keyCode.BACKSPACE : d.keyCode.DELETE,
                  la.keydownEvent.call(f, v)
                }
                b.preventDefault()
              }
            }
          },
          beforeInputEvent: function (b) {
            if (b.cancelable) {
              var c = this;
              switch (b.inputType) {
                case 'insertText':
                  return a.each(b.data.split(''), function (b, d) {
                    var e = new a.Event('keypress');
                    e.which = d.charCodeAt(0),
                    ha = !1,
                    la.keypressEvent.call(c, e)
                  }),
                  b.preventDefault();
                case 'deleteContentBackward':
                  var e = new a.Event('keydown');
                  return e.keyCode = d.keyCode.BACKSPACE,
                  la.keydownEvent.call(c, e),
                  b.preventDefault();
                case 'deleteContentForward':
                  var e = new a.Event('keydown');
                  return e.keyCode = d.keyCode.DELETE,
                  la.keydownEvent.call(c, e),
                  b.preventDefault()
              }
            }
          },
          setValueEvent: function (b) {
            this.inputmask.refreshValue = !1;
            var c = this,
            d = b && b.detail ? b.detail[0] : arguments[1],
            d = d || c.inputmask._valueGet(!0);
            a.isFunction(k.onBeforeMask) && (d = k.onBeforeMask.call(ca, d, k) || d),
            d = d.toString().split(''),
            O(c, !0, !1, d),
            Y = A().join(''),
            (k.clearMaskOnLostFocus || k.clearIncomplete) && c.inputmask._valueGet() === z().join('') && c.inputmask._valueSet('')
          },
          focusEvent: function (a) {
            var b = this,
            c = b.inputmask._valueGet();
            k.showMaskOnFocus && (c !== A().join('') ? L(b, A(), J(r())) : !1 === ia && Q(b, J(r()))),
            !0 === k.positionCaretOnTab && !1 === ia && la.clickEvent.apply(b, [
              a,
              !0
            ]),
            Y = A().join('')
          },
          mouseleaveEvent: function (a) {
            var b = this;
            ia = !1,
            k.clearMaskOnLostFocus && j.activeElement !== b && N(b, aa)
          },
          clickEvent: function (b, d) {
            function e(b) {
              if ('' !== k.radixPoint) {
                var d = p().validPositions;
                if (d[b] === c || d[b].input === M(b)) {
                  if (b < J( - 1)) return !0;
                  var e = a.inArray(k.radixPoint, A());
                  if ( - 1 !== e) {
                    for (var f in d) if (e < f && d[f].input !== M(f)) return !1;
                    return !0
                  }
                }
              }
              return !1
            }
            var f = this;
            setTimeout(function () {
              if (j.activeElement === f) {
                var a = Q(f);
                if (d && (ea ? a.end = a.begin : a.begin = a.end), a.begin === a.end) switch (k.positionCaretOnClick) {
                  case 'none':
                    break;
                  case 'select':
                    Q(f, 0, A().length);
                    break;
                  case 'ignore':
                    Q(f, J(r()));
                    break;
                  case 'radixFocus':
                    if (e(a.begin)) {
                      var b = A().join('').indexOf(k.radixPoint);
                      Q(f, k.numericInput ? J(b) : b);
                      break
                    }
                  default:
                    var g = a.begin,
                    h = r(g, !0),
                    i = J(h);
                    if (g < i) Q(f, I(g, !0) || I(g - 1, !0) ? g : J(g));
                     else {
                      var l = p().validPositions[h],
                      m = v(i, l ? l.match.locator : c, l),
                      n = M(i, m.match);
                      if ('' !== n && A() [i] !== n && !0 !== m.match.optionalQuantifier && !0 !== m.match.newBlockMarker || !I(i, k.keepStatic) && m.match.def === n) {
                        var o = J(i);
                        (g >= o || g === i) && (i = o)
                      }
                      Q(f, i)
                    }
                }
              }
            }, 0)
          },
          cutEvent: function (c) {
            var e = this,
            f = (a(e), Q(e)),
            g = c.originalEvent || c,
            h = b.clipboardData || g.clipboardData,
            i = ea ? A().slice(f.end, f.begin) : A().slice(f.begin, f.end);
            h.setData('text', ea ? i.reverse().join('') : i.join('')),
            j.execCommand && j.execCommand('copy'),
            U(e, d.keyCode.DELETE, f),
            L(e, A(), p().p, c, Y !== A().join(''))
          },
          blurEvent: function (b) {
            var d = a(this),
            e = this;
            if (e.inputmask) {
              N(e, aa);
              var f = e.inputmask._valueGet(),
              g = A().slice();
              '' === f && _ === c || (k.clearMaskOnLostFocus && ( - 1 === r() && f === z().join('') ? g = [
              ] : S(g)), !1 === T(g) && (setTimeout(function () {
                d.trigger('incomplete')
              }, 0), k.clearIncomplete && (q(), g = k.clearMaskOnLostFocus ? [
              ] : z().slice())), L(e, g, c, b)),
              Y !== A().join('') && (Y = g.join(''), d.trigger('change'))
            }
          },
          mouseenterEvent: function (a) {
            var b = this;
            ia = !0,
            j.activeElement !== b && k.showMaskOnHover && N(b, (ea ? A().slice().reverse() : A()).join(''))
          },
          submitEvent: function (a) {
            Y !== A().join('') && Z.trigger('change'),
            k.clearMaskOnLostFocus && - 1 === r() && da.inputmask._valueGet && da.inputmask._valueGet() === z().join('') && da.inputmask._valueSet(''),
            k.clearIncomplete && !1 === T(A()) && da.inputmask._valueSet(''),
            k.removeMaskOnSubmit && (da.inputmask._valueSet(da.inputmask.unmaskedvalue(), !0), setTimeout(function () {
              L(da, A())
            }, 0))
          },
          resetEvent: function (a) {
            da.inputmask.refreshValue = !0,
            setTimeout(function () {
              Z.trigger('setvalue')
            }, 0)
          }
        };
        if (e !== c) switch (e.action) {
          case 'isComplete':
            return da = e.el,
            T(A());
          case 'unmaskedvalue':
            return da !== c && e.value === c || (ba = e.value, ba = (a.isFunction(k.onBeforeMask) ? k.onBeforeMask.call(ca, ba, k) || ba : ba).split(''), O.call(this, c, !1, !1, ba), a.isFunction(k.onBeforeWrite) && k.onBeforeWrite.call(ca, c, A(), 0, k)),
            P(da);
          case 'mask':
            X(da);
            break;
          case 'format':
            return ba = (a.isFunction(k.onBeforeMask) ? k.onBeforeMask.call(ca, e.value, k) || e.value : e.value).split(''),
            O.call(this, c, !0, !1, ba),
            e.metadata ? {
              value: ea ? A().slice().reverse().join('') : A().join(''),
              metadata: i.call(this, {
                action: 'getmetadata'
              }, f, k)
            }
             : ea ? A().slice().reverse().join('') : A().join('');
          case 'isValid':
            e.value ? (ba = e.value.split(''), O.call(this, c, !0, !0, ba)) : e.value = A().join('');
            for (var ma = A(), na = R(), oa = ma.length - 1; oa > na && !I(oa); oa--);
            return ma.splice(na, oa + 1 - na),
            T(ma) && e.value === A().join('');
          case 'getemptymask':
            return z().join('');
          case 'remove':
            if (da && da.inputmask) {
              a.data(da, '_inputmask_opts', null),
              Z = a(da),
              da.inputmask._valueSet(k.autoUnmask ? P(da) : da.inputmask._valueGet(!0)),
              ka.off(da),
              da.inputmask.colorMask && (_ = da.inputmask.colorMask, _.removeChild(da), _.parentNode.insertBefore(da, _), _.parentNode.removeChild(_));
              Object.getOwnPropertyDescriptor && Object.getPrototypeOf ? Object.getOwnPropertyDescriptor(Object.getPrototypeOf(da), 'value') && da.inputmask.__valueGet && Object.defineProperty(da, 'value', {
                get: da.inputmask.__valueGet,
                set: da.inputmask.__valueSet,
                configurable: !0
              }) : j.__lookupGetter__ && da.__lookupGetter__('value') && da.inputmask.__valueGet && (da.__defineGetter__('value', da.inputmask.__valueGet), da.__defineSetter__('value', da.inputmask.__valueSet)),
              da.inputmask = c
            }
            return da;
          case 'getmetadata':
            if (a.isArray(f.metadata)) {
              var pa = ja(!0, 0, !1).join('');
              return a.each(f.metadata, function (a, b) {
                if (b.mask === pa) return pa = b,
                !1
              }),
              pa
            }
            return f.metadata
        }
      }
      var j = b.document,
      k = navigator.userAgent,
      l = k.indexOf('MSIE ') > 0 || k.indexOf('Trident/') > 0,
      m = h('touchstart'),
      n = /iemobile/i.test(k),
      o = /iphone/i.test(k) && !n;
      return d.prototype = {
        dataAttribute: 'data-inputmask',
        defaults: {
          placeholder: '_',
          optionalmarker: [
            '[',
            ']'
          ],
          quantifiermarker: [
            '{',
            '}'
          ],
          groupmarker: [
            '(',
            ')'
          ],
          alternatormarker: '|',
          escapeChar: '\\',
          mask: null,
          regex: null,
          oncomplete: a.noop,
          onincomplete: a.noop,
          oncleared: a.noop,
          repeat: 0,
          greedy: !1,
          autoUnmask: !1,
          removeMaskOnSubmit: !1,
          clearMaskOnLostFocus: !0,
          insertMode: !0,
          clearIncomplete: !1,
          alias: null,
          onKeyDown: a.noop,
          onBeforeMask: null,
          onBeforePaste: function (b, c) {
            return a.isFunction(c.onBeforeMask) ? c.onBeforeMask.call(this, b, c) : b
          },
          onBeforeWrite: null,
          onUnMask: null,
          showMaskOnFocus: !0,
          showMaskOnHover: !0,
          onKeyValidation: a.noop,
          skipOptionalPartCharacter: ' ',
          numericInput: !1,
          rightAlign: !1,
          undoOnEscape: !0,
          radixPoint: '',
          _radixDance: !1,
          groupSeparator: '',
          keepStatic: null,
          positionCaretOnTab: !0,
          tabThrough: !1,
          supportsInputType: [
            'text',
            'tel',
            'url',
            'password',
            'search'
          ],
          ignorables: [
            8,
            9,
            13,
            19,
            27,
            33,
            34,
            35,
            36,
            37,
            38,
            39,
            40,
            45,
            46,
            93,
            112,
            113,
            114,
            115,
            116,
            117,
            118,
            119,
            120,
            121,
            122,
            123,
            0,
            229
          ],
          isComplete: null,
          preValidation: null,
          postValidation: null,
          staticDefinitionSymbol: c,
          jitMasking: !1,
          nullable: !0,
          inputEventOnly: !1,
          noValuePatching: !1,
          positionCaretOnClick: 'lvp',
          casing: null,
          inputmode: 'verbatim',
          colorMask: !1,
          disablePredictiveText: !1,
          importDataAttributes: !0,
          shiftPositions: !0
        },
        definitions: {
          9: {
            validator: '[0-9１-９]',
            definitionSymbol: '*'
          },
          a: {
            validator: '[A-Za-zА-яЁёÀ-ÿµ]',
            definitionSymbol: '*'
          },
          '*': {
            validator: '[0-9１-９A-Za-zА-яЁёÀ-ÿµ]'
          }
        },
        aliases: {
        },
        masksCache: {
        },
        mask: function (g) {
          function h(d, f, g, h) {
            if (!0 === f.importDataAttributes) {
              var i,
              j,
              k,
              l,
              m = d.getAttribute(h),
              n = function (a, e) {
                null !== (e = e !== c ? e : d.getAttribute(h + '-' + a)) && ('string' == typeof e && (0 === a.indexOf('on') ? e = b[e] : 'false' === e ? e = !1 : 'true' === e && (e = !0)), g[a] = e)
              };
              if (m && '' !== m && (m = m.replace(/'/g, '"'), j = JSON.parse('{' + m + '}')), j) {
                k = c;
                for (l in j) if ('alias' === l.toLowerCase()) {
                  k = j[l];
                  break
                }
              }
              n('alias', k),
              g.alias && e(g.alias, g, f);
              for (i in f) {
                if (j) {
                  k = c;
                  for (l in j) if (l.toLowerCase() === i.toLowerCase()) {
                    k = j[l];
                    break
                  }
                }
                n(i, k)
              }
            }
            return a.extend(!0, f, g),
            ('rtl' === d.dir || f.rightAlign) && (d.style.textAlign = 'right'),
            ('rtl' === d.dir || f.numericInput) && (d.dir = 'ltr', d.removeAttribute('dir'), f.isRTL = !0),
            Object.keys(g).length
          }
          var k = this;
          return 'string' == typeof g && (g = j.getElementById(g) || j.querySelectorAll(g)),
          g = g.nodeName ? [
            g
          ] : g,
          a.each(g, function (b, e) {
            var g = a.extend(!0, {
            }, k.opts);
            if (h(e, g, a.extend(!0, {
            }, k.userOptions), k.dataAttribute)) {
              var j = f(g, k.noMasksCache);
              j !== c && (e.inputmask !== c && (e.inputmask.opts.autoUnmask = !0, e.inputmask.remove()), e.inputmask = new d(c, c, !0), e.inputmask.opts = g, e.inputmask.noMasksCache = k.noMasksCache, e.inputmask.userOptions = a.extend(!0, {
              }, k.userOptions), e.inputmask.isRTL = g.isRTL || g.numericInput, e.inputmask.el = e, e.inputmask.maskset = j, a.data(e, '_inputmask_opts', g), i.call(e.inputmask, {
                action: 'mask'
              }))
            }
          }),
          g && g[0] ? g[0].inputmask || this : this
        },
        option: function (b, c) {
          return 'string' == typeof b ? this.opts[b] : 'object' === (void 0 === b ? 'undefined' : g(b)) ? (a.extend(this.userOptions, b), this.el && !0 !== c && this.mask(this.el), this) : void 0
        },
        unmaskedvalue: function (a) {
          return this.maskset = this.maskset || f(this.opts, this.noMasksCache),
          i.call(this, {
            action: 'unmaskedvalue',
            value: a
          })
        },
        remove: function () {
          return i.call(this, {
            action: 'remove'
          })
        },
        getemptymask: function () {
          return this.maskset = this.maskset || f(this.opts, this.noMasksCache),
          i.call(this, {
            action: 'getemptymask'
          })
        },
        hasMaskedValue: function () {
          return !this.opts.autoUnmask
        },
        isComplete: function () {
          return this.maskset = this.maskset || f(this.opts, this.noMasksCache),
          i.call(this, {
            action: 'isComplete'
          })
        },
        getmetadata: function () {
          return this.maskset = this.maskset || f(this.opts, this.noMasksCache),
          i.call(this, {
            action: 'getmetadata'
          })
        },
        isValid: function (a) {
          return this.maskset = this.maskset || f(this.opts, this.noMasksCache),
          i.call(this, {
            action: 'isValid',
            value: a
          })
        },
        format: function (a, b) {
          return this.maskset = this.maskset || f(this.opts, this.noMasksCache),
          i.call(this, {
            action: 'format',
            value: a,
            metadata: b
          })
        },
        setValue: function (b) {
          this.el && a(this.el).trigger('setvalue', [
            b
          ])
        },
        analyseMask: function (b, e, f) {
          function g(a, b, c, d) {
            this.matches = [
            ],
            this.openGroup = a || !1,
            this.alternatorGroup = !1,
            this.isGroup = a || !1,
            this.isOptional = b || !1,
            this.isQuantifier = c || !1,
            this.isAlternator = d || !1,
            this.quantifier = {
              min: 1,
              max: 1
            }
          }
          function h(b, g, h) {
            h = h !== c ? h : b.matches.length;
            var i = b.matches[h - 1];
            if (e) 0 === g.indexOf('[') || v && /\\d|\\s|\\w]/i.test(g) || '.' === g ? b.matches.splice(h++, 0, {
              fn: new RegExp(g, f.casing ? 'i' : ''),
              optionality: !1,
              newBlockMarker: i === c ? 'master' : i.def !== g,
              casing: null,
              def: g,
              placeholder: c,
              nativeDef: g
            }) : (v && (g = g[g.length - 1]), a.each(g.split(''), function (a, d) {
              i = b.matches[h - 1],
              b.matches.splice(h++, 0, {
                fn: null,
                optionality: !1,
                newBlockMarker: i === c ? 'master' : i.def !== d && null !== i.fn,
                casing: null,
                def: f.staticDefinitionSymbol || d,
                placeholder: f.staticDefinitionSymbol !== c ? d : c,
                nativeDef: (v ? '\'' : '') + d
              })
            })),
            v = !1;
             else {
              var j = (f.definitions ? f.definitions[g] : c) || d.prototype.definitions[g];
              j && !v ? b.matches.splice(h++, 0, {
                fn: j.validator ? 'string' == typeof j.validator ? new RegExp(j.validator, f.casing ? 'i' : '') : new function () {
                  this.test = j.validator
                }
                 : new RegExp('.'),
                optionality: !1,
                newBlockMarker: i === c ? 'master' : i.def !== (j.definitionSymbol || g),
                casing: j.casing,
                def: j.definitionSymbol || g,
                placeholder: j.placeholder,
                nativeDef: g
              }) : (b.matches.splice(h++, 0, {
                fn: null,
                optionality: !1,
                newBlockMarker: i === c ? 'master' : i.def !== g && null !== i.fn,
                casing: null,
                def: f.staticDefinitionSymbol || g,
                placeholder: f.staticDefinitionSymbol !== c ? g : c,
                nativeDef: (v ? '\'' : '') + g
              }), v = !1)
            }
          }
          function i(b) {
            b && b.matches && a.each(b.matches, function (a, d) {
              var g = b.matches[a + 1];
              (g === c || g.matches === c || !1 === g.isQuantifier) && d && d.isGroup && (d.isGroup = !1, e || (h(d, f.groupmarker[0], 0), !0 !== d.openGroup && h(d, f.groupmarker[1]))),
              i(d)
            })
          }
          function j() {
            if (x.length > 0) {
              if (p = x[x.length - 1], h(p, n), p.isAlternator) {
                q = x.pop();
                for (var a = 0; a < q.matches.length; a++) q.matches[a].isGroup && (q.matches[a].isGroup = !1);
                x.length > 0 ? (p = x[x.length - 1], p.matches.push(q)) : w.matches.push(q)
              }
            } else h(w, n)
          }
          function k(a) {
            function b(a) {
              return a === f.optionalmarker[0] ? a = f.optionalmarker[1] : a === f.optionalmarker[1] ? a = f.optionalmarker[0] : a === f.groupmarker[0] ? a = f.groupmarker[1] : a === f.groupmarker[1] && (a = f.groupmarker[0]),
              a
            }
            a.matches = a.matches.reverse();
            for (var d in a.matches) if (a.matches.hasOwnProperty(d)) {
              var e = parseInt(d);
              if (a.matches[d].isQuantifier && a.matches[e + 1] && a.matches[e + 1].isGroup) {
                var g = a.matches[d];
                a.matches.splice(d, 1),
                a.matches.splice(e + 1, 0, g)
              }
              a.matches[d].matches !== c ? a.matches[d] = k(a.matches[d]) : a.matches[d] = b(a.matches[d])
            }
            return a
          }
          function l(a) {
            var b = new g(!0);
            return b.openGroup = !1,
            b.matches = a,
            b
          }
          var m,
          n,
          o,
          p,
          q,
          r,
          s,
          t = /(?:[?*+]|\{[0-9\+\*]+(?:,[0-9\+\*]*)?(?:\|[0-9\+\*]*)?\})|[^.?*+^${[]()|\\]+|./g,
          u = /\[\^?]?(?:[^\\\]]+|\\[\S\s]?)*]?|\\(?:0(?:[0-3][0-7]{0,2}|[4-7][0-7]?)?|[1-9][0-9]*|x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4}|c[A-Za-z]|[\S\s]?)|\((?:\?[:=!]?)?|(?:[?*+]|\{[0-9]+(?:,[0-9]*)?\})\??|[^.?*+^${[()|\\]+|./g,
          v = !1,
          w = new g,
          x = [
          ],
          y = [
          ];
          for (e && (f.optionalmarker[0] = c, f.optionalmarker[1] = c); m = e ? u.exec(b) : t.exec(b); ) {
            if (n = m[0], e) switch (n.charAt(0)) {
              case '?':
                n = '{0,1}';
                break;
              case '+':
              case '*':
                n = '{' + n + '}'
            }
            if (v) j();
             else switch (n.charAt(0)) {
              case '(?=':
              case '(?!':
              case '(?<=':
              case '(?<!':
                break;
              case f.escapeChar:
                v = !0,
                e && j();
                break;
              case f.optionalmarker[1]:
              case f.groupmarker[1]:
                if (o = x.pop(), o.openGroup = !1, o !== c) if (x.length > 0) {
                  if (p = x[x.length - 1], p.matches.push(o), p.isAlternator) {
                    q = x.pop();
                    for (var z = 0; z < q.matches.length; z++) q.matches[z].isGroup = !1,
                    q.matches[z].alternatorGroup = !1;
                    x.length > 0 ? (p = x[x.length - 1], p.matches.push(q)) : w.matches.push(q)
                  }
                } else w.matches.push(o);
                 else j();
                break;
              case f.optionalmarker[0]:
                x.push(new g(!1, !0));
                break;
              case f.groupmarker[0]:
                x.push(new g(!0));
                break;
              case f.quantifiermarker[0]:
                var A = new g(!1, !1, !0);
                n = n.replace(/[{}]/g, '');
                var B = n.split('|'),
                C = B[0].split(','),
                D = isNaN(C[0]) ? C[0] : parseInt(C[0]),
                E = 1 === C.length ? D : isNaN(C[1]) ? C[1] : parseInt(C[1]);
                '*' !== D && '+' !== D || (D = '*' === E ? 0 : 1),
                A.quantifier = {
                  min: D,
                  max: E,
                  jit: B[1]
                };
                var F = x.length > 0 ? x[x.length - 1].matches : w.matches;
                if (m = F.pop(), m.isAlternator) {
                  F.push(m),
                  F = m.matches;
                  var s = new g(!0),
                  G = F.pop();
                  F.push(s),
                  F = s.matches,
                  m = G
                }
                m.isGroup || (m = l([m])),
                F.push(m),
                F.push(A);
                break;
              case f.alternatormarker:
                var H = function (a) {
                  var b = a.pop();
                  return b.isQuantifier && (b = l([a.pop(),
                  b])),
                  b
                };
                if (x.length > 0) {
                  p = x[x.length - 1];
                  var I = p.matches[p.matches.length - 1];
                  r = p.openGroup && (I.matches === c || !1 === I.isGroup && !1 === I.isAlternator) ? x.pop() : H(p.matches)
                } else r = H(w.matches);
                if (r.isAlternator) x.push(r);
                 else if (r.alternatorGroup ? (q = x.pop(), r.alternatorGroup = !1) : q = new g(!1, !1, !1, !0), q.matches.push(r), x.push(q), r.openGroup) {
                  r.openGroup = !1;
                  var J = new g(!0);
                  J.alternatorGroup = !0,
                  x.push(J)
                }
                break;
              default:
                j()
            }
          }
          for (; x.length > 0; ) o = x.pop(),
          w.matches.push(o);
          return w.matches.length > 0 && (i(w), y.push(w)),
          (f.numericInput || f.isRTL) && k(y[0]),
          y
        },
        positionColorMask: function (a, b) {
          a.style.left = b.offsetLeft + 'px'
        }
      },
      d.extendDefaults = function (b) {
        a.extend(!0, d.prototype.defaults, b)
      },
      d.extendDefinitions = function (b) {
        a.extend(!0, d.prototype.definitions, b)
      },
      d.extendAliases = function (b) {
        a.extend(!0, d.prototype.aliases, b)
      },
      d.format = function (a, b, c) {
        return d(b).format(a, c)
      },
      d.unmask = function (a, b) {
        return d(b).unmaskedvalue(a)
      },
      d.isValid = function (a, b) {
        return d(b).isValid(a)
      },
      d.remove = function (b) {
        'string' == typeof b && (b = j.getElementById(b) || j.querySelectorAll(b)),
        b = b.nodeName ? [
          b
        ] : b,
        a.each(b, function (a, b) {
          b.inputmask && b.inputmask.remove()
        })
      },
      d.setValue = function (b, c) {
        'string' == typeof b && (b = j.getElementById(b) || j.querySelectorAll(b)),
        b = b.nodeName ? [
          b
        ] : b,
        a.each(b, function (b, d) {
          d.inputmask ? d.inputmask.setValue(c) : a(d).trigger('setvalue', [
            c
          ])
        })
      },
      d.escapeRegex = function (a) {
        var b = [
          '/',
          '.',
          '*',
          '+',
          '?',
          '|',
          '(',
          ')',
          '[',
          ']',
          '{',
          '}',
          '\\',
          '$',
          '^'
        ];
        return a.replace(new RegExp('(\\' + b.join('|\\') + ')', 'gim'), '\\$1')
      },
      d.keyCode = {
        BACKSPACE: 8,
        BACKSPACE_SAFARI: 127,
        DELETE: 46,
        DOWN: 40,
        END: 35,
        ENTER: 13,
        ESCAPE: 27,
        HOME: 36,
        INSERT: 45,
        LEFT: 37,
        PAGE_DOWN: 34,
        PAGE_UP: 33,
        RIGHT: 39,
        SPACE: 32,
        TAB: 9,
        UP: 38,
        X: 88,
        CONTROL: 17
      },
      d.dependencyLib = a,
      d
    })
  },
  function (a, b, c) {
    'use strict';
    var d,
    e,
    f;
    'function' == typeof Symbol && Symbol.iterator;
    !function (g) {
      e = [
        c(4)
      ],
      d = g,
      void 0 !== (f = 'function' == typeof d ? d.apply(b, e) : d) && (a.exports = f)
    }(function (a) {
      return a
    })
  },
  function (a, b) {
    a.exports = jQuery
  },
  function (module, exports, __webpack_require__) {
    'use strict';
    var __WEBPACK_AMD_DEFINE_RESULT__,
    _typeof = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
      return typeof a
    }
     : function (a) {
      return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
    };
    void 0 !== (__WEBPACK_AMD_DEFINE_RESULT__ = function () {
      return 'undefined' != typeof window ? window : new (eval('require(\'jsdom\').JSDOM')) ('').window
    }.call(exports, __webpack_require__, exports, module)) && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)
  },
  function (a, b, c) {
    'use strict';
    var d,
    e,
    f,
    g = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
      return typeof a
    }
     : function (a) {
      return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
    };
    !function (g) {
      e = [
        c(2)
      ],
      d = g,
      void 0 !== (f = 'function' == typeof d ? d.apply(b, e) : d) && (a.exports = f)
    }(function (a) {
      function b(a) {
        if (!a.tokenizer) {
          var b = [
          ];
          for (var c in j) - 1 === b.indexOf(c[0]) && b.push(c[0]);
          a.tokenizer = '(' + b.join('+|') + ')+?|.',
          a.tokenizer = new RegExp(a.tokenizer, 'g')
        }
        return a.tokenizer
      }
      function c(a, b) {
        return (!isFinite(a.rawday) || '29' == a.day && !isFinite(a.rawyear) || new Date(a.date.getFullYear(), isFinite(a.rawmonth) ? a.month : a.date.getMonth() + 1, 0).getDate() >= a.day) && b
      }
      function d(a, b) {
        var c = !0;
        if (b.min) {
          if (a.rawyear) {
            var d = a.rawyear.replace(/[^0-9]/g, '');
            c = b.min.year.substr(0, d.length) <= d
          }
          a.year === a.rawyear && b.min.date.getTime() === b.min.date.getTime() && (c = b.min.date.getTime() <= a.date.getTime())
        }
        return c && b.max && b.max.date.getTime() === b.max.date.getTime() && (c = b.max.date.getTime() >= a.date.getTime()),
        c
      }
      function e(c, d, e, f) {
        for (var g, h = ''; g = b(e).exec(c); ) if (void 0 === d) if (j[g[0]]) h += '(' + j[g[0]][0] + ')';
         else switch (g[0]) {
          case '[':
            h += '(';
            break;
          case ']':
            h += ')?';
            break;
          default:
            h += a.escapeRegex(g[0])
        } else if (j[g[0]]) if (!0 !== f && j[g[0]][3]) {
          var i = j[g[0]][3];
          h += i.call(d.date)
        } else j[g[0]][2] ? h += d['raw' + j[g[0]][2]] : h += g[0];
         else h += g[0];
        return h
      }
      function f(a, b) {
        for (a = String(a), b = b || 2; a.length < b; ) a = '0' + a;
        return a
      }
      function h(a, c, d) {
        function e(a) {
          var b = a.replace(/[^0-9]/g, '0');
          if (b != a) {
            var c = a.replace(/[^0-9]/g, ''),
            e = (d.min && d.min[h] || a).toString(),
            f = (d.max && d.max[h] || a).toString();
            b = c + (c < e.slice(0, c.length) ? e.slice(c.length) : c > f.slice(0, c.length) ? f.slice(c.length) : b.toString().slice(c.length))
          }
          return b
        }
        function f(a, b, c) {
          a[h] = e(b),
          a['raw' + h] = b,
          void 0 !== k && k.call(a.date, 'month' == h ? parseInt(a[h]) - 1 : a[h])
        }
        var h,
        i,
        k,
        l = {
          date: new Date(1, 0, 1)
        },
        m = a;
        if ('string' == typeof m) {
          for (; i = b(d).exec(c); ) {
            var n = m.slice(0, i[0].length);
            j.hasOwnProperty(i[0]) && (j[i[0]][0], h = j[i[0]][2], k = j[i[0]][1], f(l, n, d)),
            m = m.slice(n.length)
          }
          return l
        }
        if (m && 'object' === (void 0 === m ? 'undefined' : g(m)) && m.hasOwnProperty('date')) return m
      }
      var i = a.dependencyLib,
      j = {
        d: [
          '[1-9]|[12][0-9]|3[01]',
          Date.prototype.setDate,
          'day',
          Date.prototype.getDate
        ],
        dd: [
          '0[1-9]|[12][0-9]|3[01]',
          Date.prototype.setDate,
          'day',
          function () {
            return f(Date.prototype.getDate.call(this), 2)
          }
        ],
        ddd: [
          ''
        ],
        dddd: [
          ''
        ],
        m: [
          '[1-9]|1[012]',
          Date.prototype.setMonth,
          'month',
          function () {
            return Date.prototype.getMonth.call(this) + 1
          }
        ],
        mm: [
          '0[1-9]|1[012]',
          Date.prototype.setMonth,
          'month',
          function () {
            return f(Date.prototype.getMonth.call(this) + 1, 2)
          }
        ],
        mmm: [
          ''
        ],
        mmmm: [
          ''
        ],
        yy: [
          '[0-9]{2}',
          Date.prototype.setFullYear,
          'year',
          function () {
            return f(Date.prototype.getFullYear.call(this), 2)
          }
        ],
        yyyy: [
          '[0-9]{4}',
          Date.prototype.setFullYear,
          'year',
          function () {
            return f(Date.prototype.getFullYear.call(this), 4)
          }
        ],
        h: [
          '[1-9]|1[0-2]',
          Date.prototype.setHours,
          'hours',
          Date.prototype.getHours
        ],
        hh: [
          '0[1-9]|1[0-2]',
          Date.prototype.setHours,
          'hours',
          function () {
            return f(Date.prototype.getHours.call(this), 2)
          }
        ],
        hhh: [
          '[0-9]+',
          Date.prototype.setHours,
          'hours',
          Date.prototype.getHours
        ],
        H: [
          '1?[0-9]|2[0-3]',
          Date.prototype.setHours,
          'hours',
          Date.prototype.getHours
        ],
        HH: [
          '0[0-9]|1[0-9]|2[0-3]',
          Date.prototype.setHours,
          'hours',
          function () {
            return f(Date.prototype.getHours.call(this), 2)
          }
        ],
        HHH: [
          '[0-9]+',
          Date.prototype.setHours,
          'hours',
          Date.prototype.getHours
        ],
        M: [
          '[1-5]?[0-9]',
          Date.prototype.setMinutes,
          'minutes',
          Date.prototype.getMinutes
        ],
        MM: [
          '0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]',
          Date.prototype.setMinutes,
          'minutes',
          function () {
            return f(Date.prototype.getMinutes.call(this), 2)
          }
        ],
        ss: [
          '[0-5][0-9]',
          Date.prototype.setSeconds,
          'seconds',
          function () {
            return f(Date.prototype.getSeconds.call(this), 2)
          }
        ],
        l: [
          '[0-9]{3}',
          Date.prototype.setMilliseconds,
          'milliseconds',
          function () {
            return f(Date.prototype.getMilliseconds.call(this), 3)
          }
        ],
        L: [
          '[0-9]{2}',
          Date.prototype.setMilliseconds,
          'milliseconds',
          function () {
            return f(Date.prototype.getMilliseconds.call(this), 2)
          }
        ],
        t: [
          '[ap]'
        ],
        tt: [
          '[ap]m'
        ],
        T: [
          '[AP]'
        ],
        TT: [
          '[AP]M'
        ],
        Z: [
          ''
        ],
        o: [
          ''
        ],
        S: [
          ''
        ]
      },
      k = {
        isoDate: 'yyyy-mm-dd',
        isoTime: 'HH:MM:ss',
        isoDateTime: 'yyyy-mm-dd\'T\'HH:MM:ss',
        isoUtcDateTime: 'UTC:yyyy-mm-dd\'T\'HH:MM:ss\'Z\''
      };
      return a.extendAliases({
        datetime: {
          mask: function (a) {
            return j.S = a.i18n.ordinalSuffix.join('|'),
            a.inputFormat = k[a.inputFormat] || a.inputFormat,
            a.displayFormat = k[a.displayFormat] || a.displayFormat || a.inputFormat,
            a.outputFormat = k[a.outputFormat] || a.outputFormat || a.inputFormat,
            a.placeholder = '' !== a.placeholder ? a.placeholder : a.inputFormat.replace(/[\[\]]/, ''),
            a.regex = e(a.inputFormat, void 0, a),
            null
          },
          placeholder: '',
          inputFormat: 'isoDateTime',
          displayFormat: void 0,
          outputFormat: void 0,
          min: null,
          max: null,
          i18n: {
            dayNames: [
              'Mon',
              'Tue',
              'Wed',
              'Thu',
              'Fri',
              'Sat',
              'Sun',
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday'
            ],
            monthNames: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec',
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ],
            ordinalSuffix: [
              'st',
              'nd',
              'rd',
              'th'
            ]
          },
          postValidation: function (a, b, f, g) {
            g.min = h(g.min, g.inputFormat, g),
            g.max = h(g.max, g.inputFormat, g);
            var i = f,
            j = h(a.join(''), g.inputFormat, g);
            return i && j.date.getTime() === j.date.getTime() && (i = c(j, i), i = i && d(j, g)),
            b && i && f.pos !== b ? {
              buffer: e(g.inputFormat, j, g),
              refreshFromBuffer: {
                start: b,
                end: f.pos
              }
            }
             : i
          },
          onKeyDown: function (c, d, e, g) {
            var h = this;
            if (c.ctrlKey && c.keyCode === a.keyCode.RIGHT) {
              for (var j, k = new Date, l = ''; j = b(g).exec(g.inputFormat); ) 'd' === j[0].charAt(0) ? l += f(k.getDate(), j[0].length) : 'm' === j[0].charAt(0) ? l += f(k.getMonth() + 1, j[0].length) : 'yyyy' === j[0] ? l += k.getFullYear().toString() : 'y' === j[0].charAt(0) && (l += f(k.getYear(), j[0].length));
              h.inputmask._valueSet(l),
              i(h).trigger('setvalue')
            }
          },
          onUnMask: function (a, b, c) {
            return e(c.outputFormat, h(a, c.inputFormat, c), c, !0)
          },
          casing: function (a, b, c, d) {
            return 0 == b.nativeDef.indexOf('[ap]') ? a.toLowerCase() : 0 == b.nativeDef.indexOf('[AP]') ? a.toUpperCase() : a
          },
          insertMode: !1,
          shiftPositions: !1
        }
      }),
      a
    })
  },
  function (a, b, c) {
    'use strict';
    var d,
    e,
    f;
    'function' == typeof Symbol && Symbol.iterator;
    !function (g) {
      e = [
        c(2)
      ],
      d = g,
      void 0 !== (f = 'function' == typeof d ? d.apply(b, e) : d) && (a.exports = f)
    }(function (a) {
      function b(b, c) {
        for (var d = '', e = 0; e < b.length; e++) a.prototype.definitions[b.charAt(e)] || c.definitions[b.charAt(e)] || c.optionalmarker.start === b.charAt(e) || c.optionalmarker.end === b.charAt(e) || c.quantifiermarker.start === b.charAt(e) || c.quantifiermarker.end === b.charAt(e) || c.groupmarker.start === b.charAt(e) || c.groupmarker.end === b.charAt(e) || c.alternatormarker === b.charAt(e) ? d += '\\' + b.charAt(e) : d += b.charAt(e);
        return d
      }
      function c(a, b, c) {
        if (b > 0) {
          var e = d.inArray(c.radixPoint, a);
          - 1 === e && (a.push(c.radixPoint), e = a.length - 1);
          for (var f = 1; f <= b; f++) a[e + f] = a[e + f] || '0'
        }
        return a
      }
      var d = a.dependencyLib;
      return a.extendAliases({
        numeric: {
          mask: function (a) {
            if (0 !== a.repeat && isNaN(a.integerDigits) && (a.integerDigits = a.repeat), a.repeat = 0, a.groupSeparator === a.radixPoint && a.digits && '0' !== a.digits && ('.' === a.radixPoint ? a.groupSeparator = ',' : ',' === a.radixPoint ? a.groupSeparator = '.' : a.groupSeparator = ''), ' ' === a.groupSeparator && (a.skipOptionalPartCharacter = void 0), a.autoGroup = a.autoGroup && '' !== a.groupSeparator, a.autoGroup && ('string' == typeof a.groupSize && isFinite(a.groupSize) && (a.groupSize = parseInt(a.groupSize)), isFinite(a.integerDigits))) {
              var c = Math.floor(a.integerDigits / a.groupSize),
              d = a.integerDigits % a.groupSize;
              a.integerDigits = parseInt(a.integerDigits) + (0 === d ? c - 1 : c),
              a.integerDigits < 1 && (a.integerDigits = '*')
            }
            a.placeholder.length > 1 && (a.placeholder = a.placeholder.charAt(0)),
            'radixFocus' === a.positionCaretOnClick && '' === a.placeholder && !1 === a.integerOptional && (a.positionCaretOnClick = 'lvp'),
            a.definitions[';'] = a.definitions['~'],
            a.definitions[';'].definitionSymbol = '~',
            !0 === a.numericInput && (a.positionCaretOnClick = 'radixFocus' === a.positionCaretOnClick ? 'lvp' : a.positionCaretOnClick, a.digitsOptional = !1, isNaN(a.digits) && (a.digits = 2), a.decimalProtect = !1);
            var e = '[+]';
            if (e += b(a.prefix, a), !0 === a.integerOptional ? e += '~{1,' + a.integerDigits + '}' : e += '~{' + a.integerDigits + '}', void 0 !== a.digits) {
              var f = a.decimalProtect ? ':' : a.radixPoint,
              g = a.digits.toString().split(',');
              isFinite(g[0]) && g[1] && isFinite(g[1]) ? e += f + ';{' + a.digits + '}' : (isNaN(a.digits) || parseInt(a.digits) > 0) && (a.digitsOptional ? e += '[' + f + ';{1,' + a.digits + '}]' : e += f + ';{' + a.digits + '}')
            }
            return e += b(a.suffix, a),
            e += '[-]',
            a.greedy = !1,
            e
          },
          placeholder: '',
          greedy: !1,
          digits: '*',
          digitsOptional: !0,
          enforceDigitsOnBlur: !1,
          radixPoint: '.',
          positionCaretOnClick: 'radixFocus',
          groupSize: 3,
          groupSeparator: '',
          autoGroup: !1,
          allowMinus: !0,
          negationSymbol: {
            front: '-',
            back: ''
          },
          integerDigits: '+',
          integerOptional: !0,
          prefix: '',
          suffix: '',
          rightAlign: !0,
          decimalProtect: !0,
          min: null,
          max: null,
          step: 1,
          insertMode: !0,
          autoUnmask: !1,
          unmaskAsNumber: !1,
          inputType: 'text',
          inputmode: 'numeric',
          preValidation: function (a, b, c, e, f, g) {
            if ('-' === c || c === f.negationSymbol.front) return !0 === f.allowMinus && (f.isNegative = void 0 === f.isNegative || !f.isNegative, '' === a.join('') || {
              caret: g.validPositions[b] ? b : void 0,
              dopost: !0
            });
            if (!1 === e && c === f.radixPoint && void 0 !== f.digits && (isNaN(f.digits) || parseInt(f.digits) > 0)) {
              var h = d.inArray(f.radixPoint, a);
              if ( - 1 !== h && void 0 !== g.validPositions[h]) return !0 === f.numericInput ? b === h : {
                caret: h + 1
              }
            }
            return !0
          },
          postValidation: function (b, c, e, f) {
            function g(a, b) {
              var c = '';
              if (c += '(' + b.groupSeparator + '*{' + b.groupSize + '}){*}', '' !== b.radixPoint) {
                var d = a.join('').split(b.radixPoint);
                d[1] && (c += b.radixPoint + '*{' + d[1].match(/^\d*\??\d*/) [0].length + '}')
              }
              return c
            }
            var h = f.suffix.split(''),
            i = f.prefix.split('');
            if (void 0 === e.pos && void 0 !== e.caret && !0 !== e.dopost) return e;
            var j = void 0 !== e.caret ? e.caret : e.pos,
            k = b.slice();
            f.numericInput && (j = k.length - j - 1, k = k.reverse());
            var l = k[j];
            if (l === f.groupSeparator && (j += 1, l = k[j]), j === k.length - f.suffix.length - 1 && l === f.radixPoint) return e;
            void 0 !== l && l !== f.radixPoint && l !== f.negationSymbol.front && l !== f.negationSymbol.back && (k[j] = '?', f.prefix.length > 0 && j >= (!1 === f.isNegative ? 1 : 0) && j < f.prefix.length - 1 + (!1 === f.isNegative ? 1 : 0) ? i[j - (!1 === f.isNegative ? 1 : 0)] = '?' : f.suffix.length > 0 && j >= k.length - f.suffix.length - (!1 === f.isNegative ? 1 : 0) && (h[j - (k.length - f.suffix.length - (!1 === f.isNegative ? 1 : 0))] = '?')),
            i = i.join(''),
            h = h.join('');
            var m = k.join('').replace(i, '');
            if (m = m.replace(h, ''), m = m.replace(new RegExp(a.escapeRegex(f.groupSeparator), 'g'), ''), m = m.replace(new RegExp('[-' + a.escapeRegex(f.negationSymbol.front) + ']', 'g'), ''), m = m.replace(new RegExp(a.escapeRegex(f.negationSymbol.back) + '$'), ''), isNaN(f.placeholder) && (m = m.replace(new RegExp(a.escapeRegex(f.placeholder), 'g'), '')), m.length > 1 && 1 !== m.indexOf(f.radixPoint) && ('0' === l && (m = m.replace(/^\?/g, '')), m = m.replace(/^0/g, '')), m.charAt(0) === f.radixPoint && '' !== f.radixPoint && !0 !== f.numericInput && (m = '0' + m), '' !== m) {
              if (m = m.split(''), (!f.digitsOptional || f.enforceDigitsOnBlur && 'blur' === e.event) && isFinite(f.digits)) {
                var n = d.inArray(f.radixPoint, m),
                o = d.inArray(f.radixPoint, k);
                - 1 === n && (m.push(f.radixPoint), n = m.length - 1);
                for (var p = 1; p <= f.digits; p++) f.digitsOptional && (!f.enforceDigitsOnBlur || 'blur' !== e.event) || void 0 !== m[n + p] && m[n + p] !== f.placeholder.charAt(0) ? - 1 !== o && void 0 !== k[o + p] && (m[n + p] = m[n + p] || k[o + p]) : m[n + p] = e.placeholder || f.placeholder.charAt(0)
              }
              if (!0 !== f.autoGroup || '' === f.groupSeparator || l === f.radixPoint && void 0 === e.pos && !e.dopost) m = m.join('');
               else {
                var q = m[m.length - 1] === f.radixPoint && e.c === f.radixPoint;
                m = a(g(m, f), {
                  numericInput: !0,
                  jitMasking: !0,
                  definitions: {
                    '*': {
                      validator: '[0-9?]',
                      cardinality: 1
                    }
                  }
                }).format(m.join('')),
                q && (m += f.radixPoint),
                m.charAt(0) === f.groupSeparator && m.substr(1)
              }
            }
            if (f.isNegative && 'blur' === e.event && (f.isNegative = '0' !== m), m = i + m, m += h, f.isNegative && (m = f.negationSymbol.front + m, m += f.negationSymbol.back), m = m.split(''), void 0 !== l) if (l !== f.radixPoint && l !== f.negationSymbol.front && l !== f.negationSymbol.back) j = d.inArray('?', m),
            j > - 1 ? m[j] = l : j = e.caret || 0;
             else if (l === f.radixPoint || l === f.negationSymbol.front || l === f.negationSymbol.back) {
              var r = d.inArray(l, m);
              - 1 !== r && (j = r)
            }
            f.numericInput && (j = m.length - j - 1, m = m.reverse());
            var s = {
              caret: void 0 !== l && void 0 === e.pos || void 0 === j ? j : j + (f.numericInput ? - 1 : 1),
              buffer: m,
              refreshFromBuffer: e.dopost || b.join('') !== m.join('')
            };
            return s.refreshFromBuffer ? s : e
          },
          onBeforeWrite: function (b, c, e, f) {
            function g(b) {
              void 0 === b.parseMinMaxOptions && (null !== b.min && (b.min = b.min.toString().replace(new RegExp(a.escapeRegex(b.groupSeparator), 'g'), ''), ',' === b.radixPoint && (b.min = b.min.replace(b.radixPoint, '.')), b.min = isFinite(b.min) ? parseFloat(b.min) : NaN, isNaN(b.min) && (b.min = Number.MIN_VALUE)), null !== b.max && (b.max = b.max.toString().replace(new RegExp(a.escapeRegex(b.groupSeparator), 'g'), ''), ',' === b.radixPoint && (b.max = b.max.replace(b.radixPoint, '.')), b.max = isFinite(b.max) ? parseFloat(b.max) : NaN, isNaN(b.max) && (b.max = Number.MAX_VALUE)), b.parseMinMaxOptions = 'done')
            }
            if (b) switch (b.type) {
              case 'keydown':
                return f.postValidation(c, e, {
                  caret: e,
                  dopost: !0
                }, f);
              case 'blur':
              case 'checkval':
                var h;
                if (g(f), null !== f.min || null !== f.max) {
                  if (h = f.onUnMask(c.join(''), void 0, d.extend({
                  }, f, {
                    unmaskAsNumber: !0
                  })), null !== f.min && h < f.min) return f.isNegative = f.min < 0,
                  f.postValidation(f.min.toString().replace('.', f.radixPoint).split(''), e, {
                    caret: e,
                    dopost: !0,
                    placeholder: '0'
                  }, f);
                  if (null !== f.max && h > f.max) return f.isNegative = f.max < 0,
                  f.postValidation(f.max.toString().replace('.', f.radixPoint).split(''), e, {
                    caret: e,
                    dopost: !0,
                    placeholder: '0'
                  }, f)
                }
                return f.postValidation(c, e, {
                  caret: e,
                  placeholder: '0',
                  event: 'blur'
                }, f);
              case '_checkval':
                return {
                  caret: e
                }
            }
          },
          regex: {
            integerPart: function (b, c) {
              return c ? new RegExp('[' + a.escapeRegex(b.negationSymbol.front) + '+]?') : new RegExp('[' + a.escapeRegex(b.negationSymbol.front) + '+]?\\d+')
            },
            integerNPart: function (b) {
              return new RegExp('[\\d' + a.escapeRegex(b.groupSeparator) + a.escapeRegex(b.placeholder.charAt(0)) + ']+')
            }
          },
          definitions: {
            '~': {
              validator: function (b, c, d, e, f, g) {
                var h,
                i;
                if ('k' === b || 'm' === b) {
                  h = {
                    insert: [
                    ],
                    c: 0
                  };
                  for (var j = 0, i = 'k' === b ? 2 : 5; j < i; j++) h.insert.push({
                    pos: d + j,
                    c: 0
                  });
                  return h.pos = d + i,
                  h
                }
                if (!0 === (h = e ? new RegExp('[0-9' + a.escapeRegex(f.groupSeparator) + ']').test(b) : new RegExp('[0-9]').test(b))) {
                  if (!0 !== f.numericInput && void 0 !== c.validPositions[d] && '~' === c.validPositions[d].match.def && !g) {
                    var k = c.buffer.join('');
                    k = k.replace(new RegExp('[-' + a.escapeRegex(f.negationSymbol.front) + ']', 'g'), ''),
                    k = k.replace(new RegExp(a.escapeRegex(f.negationSymbol.back) + '$'), '');
                    var l = k.split(f.radixPoint);
                    l.length > 1 && (l[1] = l[1].replace(/0/g, f.placeholder.charAt(0))),
                    '0' === l[0] && (l[0] = l[0].replace(/0/g, f.placeholder.charAt(0))),
                    k = l[0] + f.radixPoint + l[1] || '';
                    var m = c._buffer.join('');
                    for (k === f.radixPoint && (k = m); null === k.match(a.escapeRegex(m) + '$'); ) m = m.slice(1);
                    k = k.replace(m, ''),
                    k = k.split(''),
                    h = void 0 === k[d] ? {
                      pos: d,
                      remove: d
                    }
                     : {
                      pos: d
                    }
                  }
                } else e || b !== f.radixPoint || void 0 !== c.validPositions[d - 1] || (h = {
                  insert: {
                    pos: d,
                    c: 0
                  },
                  pos: d + 1
                });
                return h
              },
              cardinality: 1
            },
            '+': {
              validator: function (a, b, c, d, e) {
                return e.allowMinus && ('-' === a || a === e.negationSymbol.front)
              },
              cardinality: 1,
              placeholder: ''
            },
            '-': {
              validator: function (a, b, c, d, e) {
                return e.allowMinus && a === e.negationSymbol.back
              },
              cardinality: 1,
              placeholder: ''
            },
            ':': {
              validator: function (b, c, d, e, f) {
                var g = '[' + a.escapeRegex(f.radixPoint) + ']',
                h = new RegExp(g).test(b);
                return h && c.validPositions[d] && c.validPositions[d].match.placeholder === f.radixPoint && (h = {
                  caret: d + 1
                }),
                h
              },
              cardinality: 1,
              placeholder: function (a) {
                return a.radixPoint
              }
            }
          },
          onUnMask: function (b, c, d) {
            if ('' === c && !0 === d.nullable) return c;
            var e = b.replace(d.prefix, '');
            return e = e.replace(d.suffix, ''),
            e = e.replace(new RegExp(a.escapeRegex(d.groupSeparator), 'g'), ''),
            '' !== d.placeholder.charAt(0) && (e = e.replace(new RegExp(d.placeholder.charAt(0), 'g'), '0')),
            d.unmaskAsNumber ? ('' !== d.radixPoint && - 1 !== e.indexOf(d.radixPoint) && (e = e.replace(a.escapeRegex.call(this, d.radixPoint), '.')), e = e.replace(new RegExp('^' + a.escapeRegex(d.negationSymbol.front)), '-'), e = e.replace(new RegExp(a.escapeRegex(d.negationSymbol.back) + '$'), ''), Number(e)) : e
          },
          isComplete: function (b, c) {
            var d = (c.numericInput ? b.slice().reverse() : b).join('');
            return d = d.replace(new RegExp('^' + a.escapeRegex(c.negationSymbol.front)), '-'),
            d = d.replace(new RegExp(a.escapeRegex(c.negationSymbol.back) + '$'), ''),
            d = d.replace(c.prefix, ''),
            d = d.replace(c.suffix, ''),
            d = d.replace(new RegExp(a.escapeRegex(c.groupSeparator) + '([0-9]{3})', 'g'), '$1'),
            ',' === c.radixPoint && (d = d.replace(a.escapeRegex(c.radixPoint), '.')),
            isFinite(d)
          },
          onBeforeMask: function (b, d) {
            d.isNegative = void 0;
            var e = d.radixPoint || ',';
            'number' != typeof b && 'number' !== d.inputType || '' === e || (b = b.toString().replace('.', e));
            var f = b.split(e),
            g = f[0].replace(/[^\-0-9]/g, ''),
            h = f.length > 1 ? f[1].replace(/[^0-9]/g, '') : '';
            b = g + ('' !== h ? e + h : h);
            var i = 0;
            if ('' !== e && (i = h.length, '' !== h)) {
              var j = Math.pow(10, i || 1);
              isFinite(d.digits) && (i = parseInt(d.digits), j = Math.pow(10, i)),
              b = b.replace(a.escapeRegex(e), '.'),
              isFinite(b) && (b = Math.round(parseFloat(b) * j) / j),
              b = b.toString().replace('.', e)
            }
            return 0 === d.digits && - 1 !== b.indexOf(a.escapeRegex(e)) && (b = b.substring(0, b.indexOf(a.escapeRegex(e)))),
            c(b.toString().split(''), i, d).join('')
          },
          onKeyDown: function (b, c, e, f) {
            var g = d(this);
            if (b.ctrlKey) switch (b.keyCode) {
              case a.keyCode.UP:
                g.val(parseFloat(this.inputmask.unmaskedvalue()) + parseInt(f.step)),
                g.trigger('setvalue');
                break;
              case a.keyCode.DOWN:
                g.val(parseFloat(this.inputmask.unmaskedvalue()) - parseInt(f.step)),
                g.trigger('setvalue')
            }
          }
        },
        currency: {
          prefix: '$ ',
          groupSeparator: ',',
          alias: 'numeric',
          placeholder: '0',
          autoGroup: !0,
          digits: 2,
          digitsOptional: !1,
          clearMaskOnLostFocus: !1
        },
        decimal: {
          alias: 'numeric'
        },
        integer: {
          alias: 'numeric',
          digits: 0,
          radixPoint: ''
        },
        percentage: {
          alias: 'numeric',
          digits: 2,
          digitsOptional: !0,
          radixPoint: '.',
          placeholder: '0',
          autoGroup: !1,
          min: 0,
          max: 100,
          suffix: ' %',
          allowMinus: !1
        }
      }),
      a
    })
  },
  function (a, b, c) {
    'use strict';
    var d,
    e,
    f,
    g = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (a) {
      return typeof a
    }
     : function (a) {
      return a && 'function' == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? 'symbol' : typeof a
    };
    !function (g) {
      e = [
        c(4),
        c(2)
      ],
      d = g,
      void 0 !== (f = 'function' == typeof d ? d.apply(b, e) : d) && (a.exports = f)
    }(function (a, b) {
      return void 0 === a.fn.inputmask && (a.fn.inputmask = function (c, d) {
        var e,
        f = this[0];
        if (void 0 === d && (d = {
        }), 'string' == typeof c) switch (c) {
          case 'unmaskedvalue':
            return f && f.inputmask ? f.inputmask.unmaskedvalue() : a(f).val();
          case 'remove':
            return this.each(function () {
              this.inputmask && this.inputmask.remove()
            });
          case 'getemptymask':
            return f && f.inputmask ? f.inputmask.getemptymask() : '';
          case 'hasMaskedValue':
            return !(!f || !f.inputmask) && f.inputmask.hasMaskedValue();
          case 'isComplete':
            return !f || !f.inputmask || f.inputmask.isComplete();
          case 'getmetadata':
            return f && f.inputmask ? f.inputmask.getmetadata() : void 0;
          case 'setvalue':
            b.setValue(f, d);
            break;
          case 'option':
            if ('string' != typeof d) return this.each(function () {
              if (void 0 !== this.inputmask) return this.inputmask.option(d)
            });
            if (f && void 0 !== f.inputmask) return f.inputmask.option(d);
            break;
          default:
            return d.alias = c,
            e = new b(d),
            this.each(function () {
              e.mask(this)
            })
        } else {
          if (Array.isArray(c)) return d.alias = c,
          e = new b(d),
          this.each(function () {
            e.mask(this)
          });
          if ('object' == (void 0 === c ? 'undefined' : g(c))) return e = new b(c),
          void 0 === c.mask && void 0 === c.alias ? this.each(function () {
            if (void 0 !== this.inputmask) return this.inputmask.option(c);
            e.mask(this)
          }) : this.each(function () {
            e.mask(this)
          });
          if (void 0 === c) return this.each(function () {
            e = new b(d),
            e.mask(this)
          })
        }
      }),
      a.fn.inputmask
    })
  }
  ]);
  