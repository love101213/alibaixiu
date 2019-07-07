$('#logo').on('change', function() {
    var formData = new FormData();
    formData.append('logo', this.files[0]);

    $.ajax({
        type: 'post', //get或post
        url: '/upload',
        processData: false,
        //请求的地址
        contentType: false,
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            $('#hiddenLogo').val(result[0].logo)
            $('#preview').attr('src', result[0].logo)
        }
    })
})
$('#settingForm').on('submit', function() {
    alert(1)
    var formData = $(this).serialize()
    $.ajax({
        type: 'post', //get或post
        url: '/settings', //请求的地址
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
    url: '/settings', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        $('#hiddenLogo').val(result.logo);
        $('#preview').attr('src', result.logo)
        $('input[name="title"]').val(result.title);
        $('input[name="comment"]').prop('checked', result.comment);
        $('input[name="review"]').prop('checked', result.review);

    }
})
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