function dateSelectSwiper(obj) {
    console.log(obj);
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
    _self.resultValue = [];
    _self.swiperData = {};
    _self.swiperData.activeIndex = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.activeIndex1 = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.activeIndex2 = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.value = obj.value;
    _self.swiperData.closeFun = obj.closeFun || function() {};
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
                _self.resultValue = obj.value;
                _self.update(swiper, _self.orangeY, _self.minY);
                $('.swiper-slide').each(function() {
                    if(_self.resultValue[0] === $(this).html()){
                        swiper.slideTo($(this).index(), 100, true)
                    };
                })
            },
            onSlideChangeEnd: function(swiper) {
                _self.resultValue = obj.value;
                var changeYear = _self.currentYear;
                _self.currentYear = $('#year .swiper-slide-active').html();
                if(_self.flag) {
                    _self.currentMonth = $('#month .swiper-slide-active').html() - 1
                }else {
                    _self.currentMonth = _self.resultValue[1]-1;
                }
                var monDay = _self.isLeaYear(_self.currentYear, _self.currentMonth);
                // _self.update(_self.selectSwiper2, monDay, _self.minD);
                _self.swiperData.activeIndex = swiper.activeIndex;
                swiper.slideTo(_self.swiperData.activeIndex, 100, true);
                _self.swiperData.activeIndex1 = _self.selectSwiper1.activeIndex1;
                _self.selectSwiper1.slideTo(_self.swiperData.activeIndex1, 100, true);
                _self.swiperData.activeIndex2 = _self.selectSwiper2.activeIndex2;
                _self.selectSwiper2.slideTo(_self.swiperData.activeIndex2, 100, true);
                _self.flag = true;
            }
        });
        // 初始化月份
        _self.selectSwiper1 = new Swiper('#month', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.resultValue = obj.value;
                _self.update(swiper, _self.maxM, _self.minM);
                $('.swiper-slide').each(function() {
                    if(_self.resultValue[1] === $(this).html()){
                        swiper.activeIndex1 = $(this).index();
                        swiper.slideTo(swiper.activeIndex1, 100, true)
                    };
                })
            }
            // onSlideChangeEnd: function(swiper) {
            //     _self.resultValue = obj.value;
            //     if(_self.flag){
            //         _self.currentYear = $('#year .swiper-slide-active').html();
            //     }else {
            //         _self.currentYear = _self.resultValue[0];
            //     }
            //     _self.currentMonth = $('#month .swiper-slide-active').html() - 1;
            //     var monDay = _self.isLeaYear(_self.currentYear, _self.currentMonth);
            //     _self.update(_self.selectSwiper2, monDay, _self.minD);
            //     _self.flag = true;
            // }
        });
        // 初始化日期
        _self.selectSwiper2 = new Swiper('#day', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.resultValue = obj.value;
                _self.update(swiper, _self.maxD, _self.minD);
                $('.swiper-slide').each(function() {
                    if(_self.resultValue[2] === $(this).html()){
                        swiper.activeIndex2 = $(this).index();
                        swiper.slideTo(swiper.activeIndex2, 100, true)
                    };
                })
            }
        })
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
    // 是否闰年函数和月份返回月份天数
    _self.isLeaYear = function(year, month) {
        // console.log(year, month);
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
    _self.openSelectSwiper = function() {
        var _self = this;
        _self.init();
        // $.Modalshow();
        // console.log(111);
    }
}
