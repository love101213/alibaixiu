//分页功能
function changePage(page) {
    // console.log(page)
    $.ajax({
        type: 'get', //get或post
        url: '/posts', //请求的地址
        data: {
            page: page
        }, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数

            var html = template('postsTpl', {
                records: result.records
            });
            $('#postsBox').html(html);
            var page = template('pageTpl',
                result
            );
            $('#pageBox').html(page);


        }
    })

}

//分类列表
$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        var html = template('categoryTpl', {
            data: result
        });
        $('#cateBox').html(html);
    }
})

//筛选功能
$('#filterForm').on('submit', function() {
        var formDate = $(this).serialize()
        $.ajax({
            type: 'get', //get或post
            url: '/posts', //请求的地址
            data: formDate, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数



                var html = template('postsTpl', {
                    records: result.records
                });
                $('#postsBox').html(html);
                var page = template('pageTpl',
                    result
                );

                $('#pageBox').html(page);


            }
        })
        return false;
    })
    //shanchu
$('#postsBox').on('click', '.delete', function() {
    if (confirm('您真的要删吗')) {
        var id = $(this).attr('data-id');
        // console.log(id)
        $.ajax({
            type: 'delete', //get或post
            url: '/posts/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                location.reload();
            }
        })
    }
});
// $('#postsBox').on('click', '.edit', function() {
//     var id = $(this).attr('data-id');
//     // console.log(id);
//     $.ajax({
//         type: 'get', //get或post
//         url: '/posts', //请求的地址
//         data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//         dataType: 'json',
//         success: function(result) { //成功的回调函数
//             console.log(result)
//             var html = template('postsTpl', result);
//             $('#postsBox').html(html)
//         }
//     })

// })