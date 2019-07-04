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
    // $('#avatar').on('change', function() {
    //     //用于二进制上传formDate,files属性是一个列表

//     var formData = new FormData();

//     formData.append('avatar', this.files[0]);


//     // console.dir()
//     $.ajax({
//         type: 'post', //get或post
//         url: '/upload', //请求的地址
//         data: formData,
//         //不要解析请求参数
//         processData: false,
//         //不要设置参数的类型
//         contentType: false, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//         // dataType: 'json',
//         success: function(result) { //成功的回调函数
//             // console.log(result)
//             $('#preview').attr('src', result[0].avatar);
//             // console.log($('#preview').attr('src', result[0].avatar));

//             $('#hiddenAvatar').val(result[0].avatar);
//         }
//     })


// });
//用户列表展示功能.索要数据
$.ajax({
    type: 'get', //get或post
    url: '/users', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        // console.log(result) 返回数组用于模板拼接循环的数据
        var html = template('userTpl', {
            data: result
        });
        $('#userBox').html(html);
    }
});
//修改用户信息  获取id
//用时间委托真正触发事件的是.edit的编辑按钮
$('#userBox').on('click', '.edit', function() {
        //获取id
        // console.log(this);
        var id = $(this).attr('data-id');
        // console.log(id)
        //查询用户信息
        $.ajax({
            type: 'get', //get或post
            url: '/users/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                // console.log(result)
                var html = template('modifyTpl',
                    result

                );
                $('#modifyBox').html(html);
            }
        })
    })
    //事件委托
$('#modifyBox').on('submit', '#modifyForm', function() {
        var formData = $(this).serialize(); //获取字符串数据
        // console.log(formData)
        //给修改表单的添加自定义属性
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put', //get或post
            url: '/users/' + id, //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result) //对象
                location.reload();
            }
        })
        return false;
    })
    //图片文件上传 委托事件委托给一直存在的元素
$('#modifyBox').on('change', '#avatar', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    $.ajax({
        type: 'post', //get或post
        url: '/upload',
        processData: false,
        contentType: false, //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            // console.log(result)
            $('#preview').attr('src', result[0].avatar);
            $("#hiddenAvatar").val(result[0].avatar)
        }
    })
})


//删除用户信息s
$('#userBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete', //get或post
        url: '/users/' + id, //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            location.reload();
        }
    })
});
//批量删除用户  当切换全换input的时候其他状态一样为全选
$('#selectAll').on('change', function() {
        //获取按钮的状态
        var status = $(this).prop('checked');
        console.log(status);
        $('#userBox').find('input').prop('checked', status);
        if (status == true) {
            $('#deleteMany').show();
        } else {
            $('#deleteMany').hide();
        }
    })
    //当点击了所有复选框那边全选按钮也跟着选中 通过按钮选中的长度来判断
$('#userBox').on('change', '.userStatus', function() {

    // console.log(this)
    var inputs = $('#userBox').find('input');
    var checkedIpt = inputs.filter(':checked');

    if (inputs.length == checkedIpt.length) {
        //批量删除的个数一般可以选择>=2

        $('#selectAll').prop('checked', true);


    } else {
        $('#selectAll').prop('checked', false);
    }
    if (checkedIpt.length >= 2) {
        // $('#selectAll').prop('checked', true);
        $('#deleteMany').show();
    } else {
        // $('#selectAll').prop('checked', false);
        $('#deleteMany').hide();
    }


});
//批量删除功能的实现
$('#deleteMany').on('click', function() {
    var ids = [];
    //找到所有选中的input  获取每一个id 需要遍历
    var inp = $('#userBox').find('input').filter(':checked');
    // console.log(inp);
    //JQuery第一个索引,第一个值  循环拿到每一个id 存储起来
    inp.each(function(index, element) {
        ids.push($(element).attr('data-id'));
        // console.log(ids)
        // $(element).attr('data-id');
        // console.log($(element).attr('data-id'));
    });
    if (confirm('您确定要删除吗')) {
        $.ajax({
            type: 'delete', //get或post
            url: '/users/' + ids.join('-'), //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                // console.log(result)
                location.reload();
            }
        })
    }
});