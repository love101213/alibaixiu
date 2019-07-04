$('#modifyForm').on('submit', function() {
    //表单数据
    var formData = $(this).serialize();
    console.log(formData)
    $.ajax({
        type: 'put', //get或post
        url: '/users/password', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            location.href = '/admin/login.html';
        }
    })
    return false;
})