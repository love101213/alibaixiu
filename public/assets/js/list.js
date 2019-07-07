//获取id
var id = getUrlName('categoryId');
//获取文章列表
$.ajax({
    type: 'get', //get或post
    url: '/posts/category/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        var html = template('listTpl', { data: result })
        console.log(html)
        $('#listBox').html(html)
        $('.new h3').html(result[0].category.title)
    }
})