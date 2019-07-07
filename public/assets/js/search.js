var key = getUrlName('key');
$.ajax({
    type: 'get', //get或post
    url: '/posts/search/' + key, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) {
        //成功的回调函数
        console.log(result)
            // if (!key.trim().length == 0) {
            //     var html = template('searchTpl', { data: result });
            //     console.log(html)
            //     $('#listBox').html(html)


        // }

        var html = template('searchTpl', { data: result });
        console.log(html)
        $('#listBox').html(html)


    }
})