$(function () {
    $.extend({
        'scrollTop': 0,
        // 弹窗出现调用
        'Modalshow': function (eles) {
            function afterOpen () {
                $.scrollTop = $(window).scrollTop();
                $('body').attr('style', 'top: -' + $.scrollTop + 'px; position: fixed');
            };
            $(eles).show();
            afterOpen();
            $(eles).on('touchstart touchmove touchend', function (e) {
                e.stopPropagation();
            });
        },
        // 弹窗隐藏调用
        'Modalhide': function (eles) {
            function beforeClose () {
                $('body').removeAttr('style');
                $(window).scrollTop($.scrollTop);
            };
            $(eles).hide();
            beforeClose();
        },
        // 3秒弹窗
        'toastMsg': function (msg) {
            if($('.the_toast_container').length) return;
            $('body').append('<div class="the_toast_container"><p class="the_toast_msg">' + msg + '</p></div>');
            setTimeout(function () {
                $('.the_toast_container').remove();
            }, 3000);
        }
    });

    // 弹窗按钮点击关闭事件
    $('.the_popups_close').on('click', function (e) {
        e.stopPropagation();
        $.Modalhide('.the_popups_container');
    });

    $.fn.extend({
        // 单选框选中
        check: function(val) {
            return this.each(function() {
                if(val == $(this).val()) {
                    this.checked = true;
                }else {
                    this.checked = false;
                }
            });
        },
        // 下拉框调用
        select: function(title, data) {
            return this.each(function() {
                var that = $(this);
                var el = that.attr('value') || "0"
                var swiper = new selectSwiper({
                    btn: that,
                    value: el,
                    showName: true,
                    title: title,
                    data: data
                });
                that.on('click', function() {
                    swiper.openSelectSwiper();
                });
            })
        },
        // 地区选择三级联动
        address: function(arr) {
            return this.each(function() {
                var that = $(this);
                var value = that.attr('value') || "110000,110100,110101"
                var arr = value.split(',')
                var addSelect = new addSelectSwiper({
                    el: '.addSelect_box',
                    btn: that,
                    value: arr,
                    data: _addressData_
                });
                that.on('click', function() {
                    addSelect.openSelectSwiper();
                })
            })
        },
        dateSelect: function dateSelect() {
            return this.each(function() {
                var that = $(this);
                var value = that.attr('value') || "110000,110100,110101"
                var arr = value.split(',')
                var addSelect = new dateSelectSwiper({
                    el: '.addSelect_box',
                    btn: that,
                    value: arr,
                    data: _addressData_
                });
                that.on('click', function() {
                    addSelect.openSelectSwiper();
                })
            })
        }
    })
});

