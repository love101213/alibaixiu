//向服务端发送请求
var page = 1
render()

function render() {
    $.ajax({
        type: 'get', //get或post
        url: '/comments', //请求的地址
        data: {
            page: page
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            var html = template('commentsTpl', { data: result.records });
            // console.log(html)
            $('#commentsBox').html(html);
            var page = template('pageTpl', result);
            console.log(page)
            $('#pageBox').html(page)
        }
    })
}
// $.ajax({
//     type: 'get', //get或post
//     url: '/comments', //请求的地址
//     data: {
//         page: page
//     }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//     dataType: 'json',
//     success: function(result) { //成功的回调函数
//         console.log(result)
//         var html = template('commentsTpl', { data: result.records });
//         // console.log(html)
//         $('#commentsBox').html(html);
//         var page = template('pageTpl', result);
//         console.log(page)
//         $('#pageBox').html(page)
//     }
// })

//分页功能 如果木有传入page默认是1
function changePage(nowPage) {
    // console.log(page)
    page = nowPage;
    render()
        // $.ajax({
        //     type: 'get', //get或post
        //     url: '/comments', //请求的地址
        //     data: { page: page }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        //     dataType: 'json',
        //     success: function(result) { //成功的回调函数
        //         console.log(result)
        //         var html = template('commentsTpl', { data: result.records });
        //         // console.log(html)
        //         $('#commentsBox').html(html);
        //         var page = template('pageTpl', result);
        //         // console.log(page)
        //         $('#pageBox').html(page)
        //     }
        // })

}
//处理时间
function dataFormat(str) {
    // var date = new Date(str);
    // var y = date.getFullYear();
    // var m = date.getMonth() + 1;
    // var d = date.getDate();
    // return y + '-' + m + '-' + d;
    data = new Date(str);
    return data.getFullYear() + '-' + (data.getMonth() + 1) + '-' + data.getDate()
}
//记住两种引入的方式
$('#commentsBox').on('click', '.status', function() {
    var state = $(this).attr('data-status');
    console.log(state)
    var id = $(this).attr('data-id');
    console.log(id)
    $.ajax({
        type: 'put', //get或post
        url: '/comments/' + id, //请求的地址
        data: {
            state: state == 0 ? '1' : '0'
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            location.reload()
        }
    })

})
$('#commentsBox').on('click', '.delete', function() {
    if (confirm('您确定要删除吗')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete', //get或post
            url: '/comments/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                // console.log(result)
                location.reload();
            }
        })

    }

})