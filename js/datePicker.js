function dateSelectSwiper(obj) {
    var _self = this;
    _self.el = $('.addSelect_box');
    _self.btn = $(obj.btn);
    _self.value = obj.value;
    _self.flag = false;
    _self.minY = 2010; //最小年份
    _self.minM = 1; //最小月份
    _self.minD = 1; // 最小日期
    _self.maxY = 2022;
    _self.maxM = 12;
    _self.maxD = 31;
    _self.orangeY = _self.maxY - _self.minY; // 年份差值
    _self.currentYear = null;
    _self,currentMonth = null;
    _self.selectSwiper = null;
    _self.selectSwiper1 = null;
    _self.selectSwiper2 = null;
    _self.flag = false;
    // _self.resultValue = [];
    _self.swiperData = {};
    _self.swiperData.activeIndex = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.activeIndex1 = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.activeIndex2 = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.value = obj.value;
    _self.swiperData.closeFun = obj.closeFun || function() {};
    _self.resultValue = obj.value;
    _self.swiperData.init = obj.init;
    var hgSelect = '<div class="addSelect_box"><div class="select addressSelect"><div class="top"><a class="close" href="javascript:;">取消</a><span class="title">日期选择</span><a class="ok" href="javascript:;">确定</a></div><div class="selectData"><div class="swiper-container" id="year"><div class="swiper-wrapper"></div></div><div class="swiper-container" id="month"><div class="swiper-wrapper"></div></div><div class="swiper-container" id="day"><div class="swiper-wrapper"></div></div></div></div></div>';
    _self.init = function() {
        // 向页面中添加插件
        $('body').append(hgSelect);
        // 初始化年份swiper
        _self.selectSwiper = new Swiper('#year', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.update(swiper, _self.orangeY, _self.minY);
                _self.selectSwiperSlideTo(swiper, _self.resultValue[0])
            },
            onSlideChangeEnd: function(swiper) {
                _self.currentYear = $('#year .swiper-slide-active').html();
                _self.resultValue[0] = _self.currentYear;
                _self.changeMaxD(_self.selectSwiper2);
            }
        });
        // 初始化月份
        _self.selectSwiper1 = new Swiper('#month', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.update(swiper, _self.maxM, _self.minM);
                _self.selectSwiperSlideTo(swiper, _self.resultValue[1])
            },
            onSlideChangeEnd: function(swiper) {
                _self.currentMonth = $('#month .swiper-slide-active').html() - 1;
                _self.resultValue[1] = String(_self.currentMonth + 1);
                _self.changeMaxD(_self.selectSwiper2);
            }
        });
        // 初始化日期
        _self.selectSwiper2 = new Swiper('#day', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                var currentDays =  _self.isLeaYear(_self.currentYear, _self.currentMonth);
                _self.update(swiper, currentDays, _self.minD);
                _self.selectSwiperSlideTo(swiper, _self.resultValue[2])
            },
            onSlideChangeEnd: function(swiper) {
                _self.selectSwiper2.activeIndex2 = swiper.activeIndex;
                _self.resultValue[2] = $('#day .swiper-slide-active').html();
                swiper.slideTo(_self.selectSwiper2.activeIndex2, 100, false)
            }
        });
        _self.el = $('.addSelect_box');
        _self.el.find('.ok').on('click', _self.okSelectSwiper);
        _self.el.find('.close').on('click', function() {
            _self.swiperData.closeFun();
            _self.closeSelectSwiper();
        });
        _self.el.on('click', function() { _self.el.find('.close').trigger('click'); });
        $('.select').on('click', function(e) { e.stopPropagation(); });
    }
    // 更新函数
    _self.update = function(swiper, dateArg, minData) {
        swiper.removeAllSlides();
        var s = [];
        for(l = 0; l < dateArg; l ++){
            s[l] = '<div class="swiper-slide">' + (minData + l) + '</div>';
        }
        swiper.appendSlide(s);
    };
    _self.changeMaxD = function(swiper) {
        var currentLastDay = $('#day .swiper-slide').eq(swiper.slides.length-1).html(); //获取当前月份的最后一天
        var monDay = _self.isLeaYear(_self.currentYear, _self.currentMonth); //月份改变之后的总天数
        var differVal = monDay - currentLastDay;
        if(differVal < 0) {
            var s = [];
            for(var i = 0; i < Math.abs(differVal); i ++){
                s.push(monDay + i);
            }
            swiper.removeSlide(s);
        } else if(differVal > 0) {
            var s = [];
            for(var i = 0; i < Math.abs(differVal); i ++){
                s[i] = '<div class="swiper-slide">' + (Number(currentLastDay) + i + 1) + '</div>';
            }
            swiper.appendSlide(s);
        }
    }
    // 是否闰年函数和月份返回月份天数
    _self.isLeaYear = function(year, month) {
        if(month == 1){
            if((year % 4 == 0 && year % 100 != 0) || (year % 400 == 0 && year % 4000 != 0)){
                _self.maxD = 29;
            }else {
                _self.maxD = 28;
            }
        }else {
            if (month == 3 || month == 5 || month == 8 || month == 10) {
                _self.maxD = 30;
            } else {
                _self.maxD = 31;
            }
        }
        return _self.maxD;
    }
    _self.selectSwiperSlideTo = function(swiper, stringArg) {
        $('.swiper-slide').each(function() {
            if(stringArg === $(this).html()){
                swiper.slideTo($(this).index(), 100, true)
            };
        })
    }
    _self.openSelectSwiper = function() {
        var _self = this;
        _self.init();
        $.Modalshow();
    }
    _self.okSelectSwiper = function() {
        var currentResultVal = _self.resultValue[0] + '-' + _self.resultValue[1] + '-' + _self.resultValue[2];
        _self.btn.text(currentResultVal);
        $('.addSelectBox .selectIcon').css({'margin-left': '.5rem'});
        _self.closeSelectSwiper();
    }
    _self.closeSelectSwiper = function() {
        _self.el.remove();
        $.Modalhide();
    }
}
