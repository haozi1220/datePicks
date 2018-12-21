/*
* @Author: 仇少凯
* @Date:   2018-12-21 12:27:07
* @Last Modified by:   仇少凯
* @Last Modified time: 2018-12-21 15:36:56
*/
function dateSelectSwiper(obj) {
    var _self = this;
    _self.el = $('.addSelect_box');
    _self.btn = $(obj.btn);
    _self.value = obj.value;
    _self.flag = false;
    _self.minY = 2010, //最小年份
    _self.minM = 1, //最小月份
    _self.minD = 1, //最小天书
    _self.maxY = 2022, //最大年份
    _self.maxM = 12, //最大月份
    _self.maxD = 31, //最大天数
    _self.orangeY = _self.maxY - _self.minY, //年份的差值
    _self.selectSwiper = null;
    _self.selectSwiper1 = null;
    _self.selectSwiper2 = null;
    _self.resultValue = [];
    _self.resultName = [];
    _self.swiperData = {};
    _self.swiperData.activeIndex = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.activeIndex1 = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.activeIndex2 = (typeof obj.activeIndex === 'number' && obj.activeIndex >= 0) ? obj.activeIndex : 0;
    _self.swiperData.value = obj.value;
    _self.swiperData.ProvinceData = [];
    _self.swiperData.CityData = [];
    _self.swiperData.DistrictData = [];
    _self.swiperData.ProvinceCode = '';
    _self.swiperData.CityCode = '';
    _self.swiperData.DistrictCode = '';
    _self.swiperData.data = obj.data || [];
    _self.swiperData.closeFun = obj.closeFun || function() {};
    _self.swiperData.init = obj.init;
    var hgSelect = '<div class="addSelect_box"><div class="select addressSelect"><div class="top"><a class="close" href="javascript:;">取消</a><span class="title">日期选择</span><a class="ok" href="javascript:;">确定</a></div><div class="selectData"><div class="swiper-container" id="year"><div class="swiper-wrapper"></div></div><div class="swiper-container" id="month"><div class="swiper-wrapper"></div></div><div class="swiper-container" id="day"><div class="swiper-wrapper"></div></div></div></div></div>';
    _self.init = function() {
        $('body').append(hgSelect);
        _self.selectSwiper = new Swiper('#year', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.resultValue = obj.value
                _self.selectData(_self.swiperData.value[0], _self.swiperData.value[1]);
                _self.resultName = [_self.swiperData.ProvinceData[0].name, _self.swiperData.CityData[0].name, _self.swiperData.DistrictData[0].name]
                // _self.update(swiper, _self.swiperData.ProvinceData)
                // _self.update(swiper, _self.orangeY)
                var s = [];
                for(l = 0; l < _self.orangeY; l ++){
                    s[l] = '<div class="swiper-slide">' + (_self.minY + l + 1) + '</div>';
                }
                swiper.appendSlide(s);
            }
        });
        _self.selectSwiper1 = new Swiper('#month', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                // _self.update(swiper, _self.maxM)
                var s = [];
                for(l = 0; l < _self.maxM; l ++){
                    s[l] = '<div class="swiper-slide">' + (1 + l) + '</div>';
                }
                swiper.appendSlide(s);
            }
        });
        _self.selectSwiper2 = new Swiper('#day', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                // _self.update(swiper,_self.maxD)
                var s = [];
                for(l = 0; l < _self.maxD; l ++){
                    s[l] = '<div class="swiper-slide">' + (1 + l) + '</div>';
                }
                swiper.appendSlide(s);
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
    };
    _self.update = function(swiper, data) {
        swiper.removeAllSlides()
        var s = [];
        s.splice(0, s.length);
        for(l = 0; l < data; l ++){
            s[l] = '<div class="swiper-slide">' + (_self.minY + l) + '</div>';
        }
        swiper.appendSlide(s);
    }
    _self.selectData = function(code1, code2) {
        _self.swiperData.ProvinceData.splice(0, _self.swiperData.ProvinceData.length)
        _self.swiperData.CityData.splice(0, _self.swiperData.CityData.length)
        _self.swiperData.DistrictData.splice(0, _self.swiperData.DistrictData.length)
        for (var i = 0; i < _self.swiperData.data.length; i++) {
            if(/\d{2}(0000)/g.test(_self.swiperData.data[i].value)) {
                _self.swiperData.ProvinceData.push(_self.swiperData.data[i])
            }
            if(_self.swiperData.data[i].parent == code1) {
                _self.swiperData.CityData.push(_self.swiperData.data[i])
            }
            if(_self.swiperData.data[i].parent == code2) {
                _self.swiperData.DistrictData.push(_self.swiperData.data[i])
            }
        }
        for (var i = 0; i < _self.swiperData.ProvinceData.length; i++) {
            if(_self.swiperData.value[0] == _self.swiperData.ProvinceData[i].value) {
                _self.swiperData.activeIndex = i
                break
            }
        }
    }
    _self.openSelectSwiper = function() {
        var _self = this;
        _self.init();
        $.Modalshow();
        _self.selectSwiper.update();
        _self.selectSwiper1.update();
        _self.selectSwiper2.update();
        _self.selectSwiper.slideTo(_self.swiperData.activeIndex, 100, true);
        _self.selectSwiper1.slideTo(_self.swiperData.activeIndex1, 100, true);
        _self.selectSwiper2.slideTo(_self.swiperData.activeIndex2, 100, true);
    }
    _self.okSelectSwiper = function() {
        var currentName = _self.resultName[0] + _self.resultName[1] + _self.resultName[2]
        _self.btn.attr('value', _self.resultValue.join())
        _self.btn.text(currentName);
        $('.addSelectBox .selectIcon').css({'margin-left': '.5rem'});
        _self.closeSelectSwiper();
    };
    _self.closeSelectSwiper = function() {
        _self.el.remove();
        $.Modalhide();
    };
}
