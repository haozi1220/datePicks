# swiper实现仿苹果日期选择插件
### 年、月份的渲染实现
    1，定义年份的区间：minY和maxY,一年内都是12个月，所以可以定义minM = 1, maxM = 12即可。然后调用函数：
        ` _self.update(swiper, _self.orangeY, _self.minY);`
    2.月份天数的渲染：是根据当前年份和月份来决定的：
        1.初始化时调用：
            `_self.update(swiper, _self.orangeY, _self.minY);`
        2.在年份和月份改变时，天数随着年月改变的而改变，此时调用：
            `_self.changeMaxD(_self.selectSwiper2);`
### 监控年月日改变得原理
    利用swiper.slideChangeEnd事件监控当前slide的下标以获取当前显示的年月日
    `
        onSlideChangeEnd: function(swiper){
            //doSomething....
        }
    `
### 天数随年、月的改变函数：
    `
        _self.changeMaxD = function(swiper) {
            //获取当前月份的最后一天
            var currentLastDay = $('#day .swiper-slide').eq(swiper.slides.length-1).html();
            //月份改变之后的总天数
            var monDay =_self.isLeaYear(_self.currentYear,_self.currentMonth);
            var differVal = monDay - currentLastDay;
            <!--
                获取当前显示月份的最后一天的数值和改变之后月份的总天数的数值，两者进行比较，小于0，把多余的日期删除掉。大于0，添加缺少的日期
             -->
            if(differVal < 0) {
                var s = [];
                for(var i = 0; i < Math.abs(differVal); i ++){
                    s.push(monDay + i);
                }
                //多余的日期用swiper的removeSlide()函数删除
                swiper.removeSlide(s);
            } else if(differVal > 0) {
                var s = [];
                for(var i = 0; i < Math.abs(differVal); i ++){
                    s[i] = '<div class="swiper-slide">' + (Number(currentLastDay) + i + 1) + '</div>';
                }
                //不足的日期用swiper的appendSlide()函数添加
                swiper.appendSlide(s);
            }
        }
    `
### 闰年函数
    `
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
    `
### 插件调用
    `
        dateSelect: function dateSelect() {
            return this.each(function() {
                //获取当前年月日
                var currentDater = new Date();
                var currentYear = currentDater.getFullYear();
                var currentMon = currentDater.getMonth();
                var currentDate = currentDater.getDate();
                //默认为当前的年月日
                var defaultDate = currentYear + '-' + (1 + currentMon) + '-' + currentDate;
                var that = $(this);
                //调用插件的元素中是否有值，没有传入默认值defaultDate
                var value = that.attr('value') || defaultDate;
                var arr = value.split('-');
                var addSelect = new dateSelectSwiper({
                    el: '.addSelect_box',
                    btn: that,
                    value: arr
                });
                that.on('click', function() {
                    addSelect.openSelectSwiper();
                })
            })
        }
    `