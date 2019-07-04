$('#userForm').on('submit', function() {
        var formDate = $(this).serialize();
        console.log(formDate)
            //     //发送请求
        $.ajax({
                type: 'post', //get或post
                url: '/users', //请求的地址
                data: formDate, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
                dataType: 'json',
                success: function(result) { //成功的回调函数
                    console.log(result)
                        //刷新页面
                    location.reload();
                },
                error: function() {
                    alert('用户添加失败')
                }
            })
            //阻止表单的默认行为
        return false;
    })
    // data:{name:'sansan',age:29}=='name=sansan&age=29'
    //上传头像
$('#avatar').on('change', function() {
    //用于二进制上传formDate,files属性是一个列表

    var formData = new FormData();

    formData.append('avatar', this.files[0]);


    // console.dir()
    $.ajax({
        type: 'post', //get或post
        url: '/upload', //请求的地址
        data: formData,
        //不要解析请求参数
        processData: false,
        //不要设置参数的类型
        contentType: false, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        // dataType: 'json',
        success: function(result) { //成功的回调函数
            // console.log(result)
            $('#preview').attr('src', result[0].avatar);
            // console.log($('#preview').attr('src', result[0].avatar));

            $('#hiddenAvatar').val(result[0].avatar);
        }
    })


})