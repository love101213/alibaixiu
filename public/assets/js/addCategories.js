$('#addCategories').on('submit', function() {
        var formData = $(this).serialize();
        console.log(formData)
        $.ajax({
            type: 'post', //get或post
            url: '/categories', //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                location.reload();
            }
        })
        return false;
    })
    // fa fa-glass
$.ajax({
        type: 'get', //get或post
        url: '/categories', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            var html = template('categoryTpl', {
                data: result
            })
            $('#categoryBox').html(html);
        }
    })
    // $('#categoryBox').
$('#categoryBox').on('click', '.edit', function() {
    var id = $(this).attr('data-id');
    // console.log(id)
    $.ajax({
        type: 'get', //get或post
        url: '/categories/' + id, //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            // console.log(result);
            var html = template('modifyTpl', result);
            // console.log(html)
            $('#formBox').html(html)
        }
    })
})
$('#formBox').on('submit', '#addCategories', function() {
        var formData = $(this).serialize();
        console.log(formData)
        var id = $(this).attr('data-id');
        console.log(id)
        $.ajax({
            type: 'get', //get或post
            url: '/categories/' + id, //请求的地址
            data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                location.reload();
            }
        })
        return false;
    })
    //删除功能 获取id
$('#categoryBox').on('click', '.delete', function() {
    var id = $(this).attr('data-id');
    // console.log(id)
    if (confirm('你确定要删除吗')) {
        $.ajax({
            type: 'delete', //get或post
            url: '/categories/' + id, //请求的地址
            data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
            dataType: 'json',
            success: function(result) { //成功的回调函数
                console.log(result)
                location.reload();
            }
        })
    }
})
$('#selectAll').on('change', function() {
    var status = $(this).prop('checked');
    $('#categoryBox').find('input').prop('checked', status);
    if (status == true) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
});
$('#categoryBox').on('change', '.cateStatus', function() {

    var inputs = $('#categoryBox').find('input');
    var checkInp = inputs.filter(':checked')
    if (inputs.length == checkInp.length) {
        $('#selectAll').prop('checked', true)
    } else {
        $('#selectAll').prop('checked', false)
    }
    if (checkInp.length >= 2) {
        $('#deleteMany').show();
    } else {
        $('#deleteMany').hide();
    }
})