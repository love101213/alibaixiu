$.ajax({
        type: 'get', //get或post
        url: '/slides', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            // console.log(result)
            var html = template('swipeTpl', { data: result });
            // console.log(html)
            $('#swipeBox').html(html)
                //
            var swiper = Swipe(document.querySelector('.swipe'), {
                auto: 3000,
                transitionEnd: function(index) {
                    // index++;

                    $('.cursor span').eq(index).addClass('active').siblings('.active').removeClass('active');
                }
            });

            // 上/下一张
            $('.swipe .arrow').on('click', function() {
                var _this = $(this);

                if (_this.is('.prev')) {
                    swiper.prev();
                } else if (_this.is('.next')) {
                    swiper.next();
                }
            })
        }
    })
    //获取最新发布文章
function dataFormat(str) {
    var date = new Date(str);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + m + '-' + d;
}
$.ajax({
    type: 'get', //get或post
    url: '/posts/lasted', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        // console.log(result)
        var html = template('lastTpl', { data: result })
            // console.log(html)
        $('#lastBox').html(html)
    }
})