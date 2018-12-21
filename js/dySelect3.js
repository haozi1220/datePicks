function addSelectSwiper(obj) {
    var _self = this;
    _self.el = $('.addSelect_box');
    _self.btn = $(obj.btn);
    _self.value = obj.value;
    _self.flag = false;
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
    var hgSelect = '<div class="addSelect_box"><div class="select addressSelect"><div class="top"><a class="close" href="javascript:;">取消</a><span class="title">所在地址</span><a class="ok" href="javascript:;">确定</a></div><div class="selectData"><div class="swiper-container" id="province"><div class="swiper-wrapper"></div></div><div class="swiper-container" id="city"><div class="swiper-wrapper"></div></div><div class="swiper-container" id="district"><div class="swiper-wrapper"></div></div></div></div></div>';
    _self.init = function() {
        $('body').append(hgSelect);
        _self.selectSwiper = new Swiper('#province', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.resultValue = obj.value
                _self.selectData(_self.swiperData.value[0], _self.swiperData.value[1]);
                _self.resultName = [_self.swiperData.ProvinceData[0].name, _self.swiperData.CityData[0].name, _self.swiperData.DistrictData[0].name]
                _self.update(swiper, _self.swiperData.ProvinceData)
            },
            onSlideChangeEnd: function(swiper) {
                // 更新省index
                var index = _self.swiperData.activeIndex = swiper.activeIndex;
                _self.flag = _self.swiperData.value[0] != _self.swiperData.ProvinceData[index].value
                // 重新划过省更新value[0], 更新市index为 0
                if(_self.flag) {
                    _self.swiperData.value[0] = _self.swiperData.ProvinceData[index].value
                }
                // 刷新数据
                _self.selectData(_self.swiperData.value[0], _self.swiperData.value[1])
                if(_self.flag) {
                    _self.swiperData.value[1] = _self.swiperData.CityData[0].value
                }
                // 省滑动到当前选择
                if(_self.flag) {
                    _self.swiperData.activeIndex1 = 0
                    _self.swiperData.activeIndex2 = 0
                }
                swiper.slideTo(_self.swiperData.activeIndex, 100, true)


                // 更新市展示
                _self.update(_self.selectSwiper1, _self.swiperData.CityData)
                // 反显：找到市 index
                for (var i = 0; i < _self.swiperData.CityData.length; i++) {
                    if(_self.swiperData.value[1] == _self.swiperData.CityData[i].value) {
                        _self.swiperData.activeIndex1 = i
                        break
                    }
                }
                // 再选时更新市 index
                if(_self.flag) {
                    _self.swiperData.value[1] = _self.swiperData.CityData[0].value
                    _self.swiperData.activeIndex1 = 0
                }
                if(_self.flag) {
                    _self.swiperData.activeIndex1 = 0
                    _self.swiperData.activeIndex2 = 0
                }
                _self.selectSwiper1.slideTo(_self.swiperData.activeIndex1, 100, true);



                // 再次刷新数据更新地区
                _self.selectData(_self.swiperData.value[0], _self.swiperData.value[1])
                _self.update(_self.selectSwiper2, _self.swiperData.DistrictData)
                for (var j = 0; j < _self.swiperData.DistrictData.length; j++) {
                    if(_self.swiperData.value[2] == _self.swiperData.DistrictData[j].value) {
                        _self.swiperData.activeIndex2 = j
                        break
                    }
                }
                // 地区滑到反显位置
                _self.selectSwiper2.slideTo(_self.swiperData.activeIndex2, 100, true);

                // 获取当前选择code值
                _self.resultValue.splice(0, _self.resultValue.length);
                _self.resultValue[0] = _self.swiperData.ProvinceData[_self.swiperData.activeIndex].value;
                _self.resultValue[1] = _self.swiperData.CityData[_self.swiperData.activeIndex1].value;
                _self.resultValue[2] = _self.swiperData.DistrictData[_self.swiperData.activeIndex2].value;
                // 获取当前选择name
                _self.resultName.splice(0, _self.resultName.length);
                _self.resultName[0] = _self.swiperData.ProvinceData[_self.swiperData.activeIndex].name;
                _self.resultName[1] = _self.swiperData.CityData[_self.swiperData.activeIndex1].name;
                _self.resultName[2] = _self.swiperData.DistrictData[_self.swiperData.activeIndex2].name;
            }
        });
        _self.selectSwiper1 = new Swiper('#city', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.update(swiper, _self.swiperData.CityData)
            },
            onSlideChangeEnd: function(swiper) {
                _self.swiperData.activeIndex1 = swiper.activeIndex;
                _self.swiperData.value[1] = _self.swiperData.CityData[_self.swiperData.activeIndex1].value
                _self.selectData(_self.swiperData.value[0], _self.swiperData.value[1])
                _self.update(_self.selectSwiper2, _self.swiperData.DistrictData);
                if(_self.flag) {
                    _self.swiperData.activeIndex2 = 0
                }
                _self.selectSwiper2.slideTo(_self.swiperData.activeIndex2, 100, true);
                _self.resultName[1] = _self.swiperData.CityData[_self.swiperData.activeIndex1].name
            }
        });
        _self.selectSwiper2 = new Swiper('#district', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                _self.update(swiper, _self.swiperData.DistrictData)
            },
            onSlideChangeEnd: function(swiper) {

                var index = _self.swiperData.activeIndex2 = swiper.activeIndex;
                _self.swiperData.value[2] = _self.swiperData.DistrictData[_self.swiperData.activeIndex2].value
                _self.resultValue[2] = _self.swiperData.DistrictData[index].value;
                _self.resultName[2] = _self.swiperData.DistrictData[index].name;
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
        for (i = 0; i < data.length; i++) {
            s[i] = '<div class="swiper-slide">' + data[i].name + '</div>';
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
