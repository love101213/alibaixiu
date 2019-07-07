var id = getUrlName('id')
$.ajax({
    type: 'get', //get或post
    url: '/posts/' + id, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        // console.log(result)
        var html = template('detailTpl', result);
        // console.log(html)
        $('#detailBox').html(html)
    }
})

$('#detailBox').on('click', '#link', function() {

    $.ajax({
        type: 'post', //get或post
        url: '/posts/fabulous/' + id, //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            alert('您已点赞成功')
        }
    })
})
$.ajax({
    type: 'get', //get或post
    url: '/settings', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        // console.log(result)
        review = result.review;
        if (result.comment == true) {
            var html = template('commentTpl', result);
            // console.log(html);
            $('#comment').html(html)

        }
    }
})
$('#comment').on('submit', '#detailForm', function() {

    var content = $(this).find('textarea').val
    var state;
    if (review) {
        state = 0;

    } else {
        state = 1;
    };
    $.ajax({
        type: 'get', //get或post
        url: '/comments', //请求的地址
        data: {
            content: content,
            state: state,
            post: id

        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result);
            alert('评论成功');
            location.reload();

        },
        error: function() {
            alert('评论失败');
        }
    })
    return false;

})