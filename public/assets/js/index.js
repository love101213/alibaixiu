//请求数据
//获取文章数量
$.ajax({
        type: 'get', //get或post
        url: '/posts/count', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            $('#count').html(' <strong>' + result.postCount + '</strong>篇文章（<strong>' + result.draftCount + '</strong>篇草稿）')
        }
    })
    //获取分类数量
$.ajax({
    type: 'get', //get或post
    url: '/categories/count', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        $('#category').html('<strong>' + result.categoryCount + '</strong>个分类')
    }
});
//获取评论
$.ajax({
    type: 'get', //get或post
    url: '/comments/count', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        $('#commtent').html(' <strong>' + result.commentCount + '</strong>条评论')
    }
})