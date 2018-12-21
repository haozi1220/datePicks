function selectSwiper(obj) {
    var _self = this;
    _self.el = $(obj.el);
    _self.btn = $(obj.btn);
    _self.title = obj.title;
    _self.selectSwiper = null;
    _self.swiperData = {};
    _self.swiperData.activeIndex = (typeof obj.activeIndex === 'number' && obj.activeIndex >= -1) ? obj.activeIndex : -1;
    _self.swiperData.value = obj.value;
    _self.swiperData.oldIndex = _self.swiperData.activeIndex;
    _self.swiperData.data = obj.data || [];
    _self.swiperData.closeFun = obj.closeFun || function() {};
    _self.callback=obj.callBack || function(){};
    _self.swiperData.init = obj.init;
    _self.swiperData.showName = obj.showName;
    var hgSelect = '<div class="select"><div class="top"><a href="javascript:;" class="close">取消</a><span class="title">' + _self.title + '</span><a href="javascript:;" class="ok">确定</a></div><div class="selectData"><div class="swiper-container"><div class="swiper-wrapper"></div><ul class="borderBg"><li class="first"></li><li></li><li></li><li class="last"></li></ul></div></div></div>';
    _self.init = function() {
        _self.el.html(hgSelect);
        $('body').append(_self.el);
        _self.el.addClass('click_no');
        _self.selectSwiper = new Swiper(obj.el + ' .swiper-container', {
            direction: 'vertical',
            slidesPerView: 4,
            centeredSlides: true,
            slideToClickedSlide: true,
            onInit: function(swiper) {
                swiper.removeSlide(0);
                var data = _self.swiperData.data;
                for(i=0;i<data.length;i++) {
                    if(data[i].value == _self.swiperData.value) {
                        _self.swiperData.activeIndex = i
                        var index = _self.swiperData.activeIndex;
                        if(index == 0) {
                            _self.btn.addClass('gray')
                        }else {
                            _self.btn.removeClass('gray')
                        }
                        if(_self.swiperData.showName) {
                            _self.btn.html(_self.swiperData.data[index].name);
                        }else {
                            _self.btn.html(_self.swiperData.data[index].value);
                        }
                        _self.btn.attr('data-value', _self.swiperData.value);
                    }
                }
                var s = [];
                for (i = 0; i < data.length; i++) { s[i] = '<div class="swiper-slide">' + data[i].name + '</div>'; }
                swiper.appendSlide(s);
            },
            onSlideChangeEnd: function(swiper) {
                var data = _self.swiperData.data;
                _self.swiperData.activeIndex = swiper.activeIndex;
                if(swiper.activeIndex == 0) {
                    $('.first').addClass('first-none')
                }else {
                    $('.first').removeClass('first-none')
                };
                if(swiper.activeIndex == data.length - 1) {
                    $('.last').addClass('last-none')
                }else {
                    $('.last').removeClass('last-none')
                };

                //_self.okFun();

            }
        });
        _self.el.find('.ok').on('click', _self.okSelectSwiper);
        _self.el.find('.close').on('click', function() { _self.swiperData.activeIndex = _self.swiperData.oldIndex;
            _self.swiperData.closeFun();
            _self.closeSelectSwiper(); });
        _self.el.on('click', function() { _self.el.find('.close').trigger('click'); });
        $('.select').on('click', function(e) { e.stopPropagation(); });
    };
    _self.openSelectSwiper = function() { var _self = this;
        _self.el.show();
        $.Modalshow();
        _self.selectSwiper.update();
        _self.selectSwiper.slideTo(_self.swiperData.activeIndex, 0); };
    _self.okSelectSwiper = function() {
        _self.okFun(_self.swiperData.activeIndex);
        _self.swiperData.oldIndex = _self.swiperData.activeIndex;
        _self.closeSelectSwiper();
        _self.callback();

    };
    _self.closeSelectSwiper = function() { _self.el.hide(); $.Modalhide(); };
    _self.selectValue = function(value){
        var data = _self.swiperData.data;
        for (i=0;i<data.length;i++) {
            if (data[i].value == value) {
                _self.swiperData.activeIndex = i;
                _self.okFun();
                break;
            }
        }
    };
    _self.okFun = function() {
        var index = _self.swiperData.activeIndex;
        var current = _self.swiperData.data[index];
        _self.btn.html(current.name);
        _self.btn.attr('data-value', current.value);
        if (index != 0 ){
            _self.btn.addClass('light');
        } else {
            _self.btn.removeClass('light');
        }
    }
    _self.init();
}
