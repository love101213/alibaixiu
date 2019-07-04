$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        var html = template('addPost', { data: result })
        $('#category').html(html);
    }
});
$('#feature').on('change', function() {
    var formData = new FormData();
    formData.append('avatar', this.files[0]);
    console.log(formData);
    $.ajax({
        type: 'post', //get或post
        url: '/upload',
        processData: false,
        contentType: false, //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)

            $('.thumbnail').attr('src', result[0].avatar).show()
            $('#thumbnail').val(result[0].avatar)
        }
    })
})
$('#addForm').on('submit', function() {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post', //get或post
        url: '/posts', //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            location.href = '/admin/posts.html';
        }
    })

    return false;
})