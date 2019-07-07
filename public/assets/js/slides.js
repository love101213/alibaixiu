$('#file').on('change', function() {
        var formData = new FormData();
        formData.append('image', this.files[0]);
        // console.log(formData)
        $.ajax({
            type: 'post', //get或post
            url: '/upload', //请求的地址
            data: formData,
            processData: false,
            contentType: false, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result[0].image)
                $('#image').val(result[0].image)
            }
        })
    })
    //
$('#slidesForm').on('submit', function() {
    var formData = $(this).serialize()
    $.ajax({
        type: 'post', //get或post
        url: '/slides', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            // console.log(result)
            location.reload();
        }
    })
    return false;
});
$.ajax({
    type: 'get', //get或post
    url: '/slides', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        var html = template('slidesTpl', {
            data: result
        });
        $('#slidesBox').html(html);

    }
})
$('#slidesBox').on('click', '.delete', function() {
        if (confirm('您确定要删除吗')) {
            var id = $(this).attr('data-id');
            $.ajax({
                type: 'delete', //get或post
                url: '/slides/' + id, //请求的地址
                data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
                dataType: 'json',
                success: function(result) { //成功的回调函数
                    console.log(result)
                    location.reload();
                }
            })

        }
    })
    // $.ajax({
    //     type: 'get', //get或post
    //     url: '/users/' + userId, //请求的地址
    //     data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    //     dataType: 'json',
    //     success: function(result) { //成功的回调函数
    //         console.log(result)
    //         $('.avatar').attr('src', result.avatar);
    //         $('.profile .name').html(result.nickName);
    //     }
    // })