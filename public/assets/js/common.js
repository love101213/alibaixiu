$('#logout').on('click', function() {
    var isConfirm = confirm('您真的要退出吗');
    if (isConfirm) {
        alert('点击确认按钮');
        $.ajax({
            type: 'post', //get或post
            url: '/logout', //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                // console.log(result)
                location.href = 'login.html';

            },
            error: function() {
                alert('退出失败');

            }
        })

    }
});
$.ajax({
    type: 'get', //get或post
    url: '/users/' + userId, //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        $('.avatar').attr('src', result.avatar);
        $('.profile .name').html(result.nickName);
    }
})