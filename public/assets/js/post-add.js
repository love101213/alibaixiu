$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        var html = template('addPost', { data: result })
        console.log(html)
        $('#category').html(html);
    }
});
// $('#feature').on('change', function() {
//     var formData = new FormData();
//     formData.append('avatar', this.files[0]);
//     console.log(formData);
//     $.ajax({
//         type: 'post', //get或post
//         url: '/upload',
//         processData: false,
//         contentType: false, //请求的地址
//         data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
//         dataType: 'json',
//         success: function(result) { //成功的回调函数
//             console.log(result)

//             $('.thumbnail').attr('src', result[0].avatar).show()
//             $('#thumbnail').val(result[0].avatar)
//         }
//     })
// })
$('#modifyBox').on('change', '#feature', function() {



    var formData = new FormData();
    formData.append('avatar', this.files[0]);


    // console.log(formData);
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
var id = getUrlName('id');

//文章修改功能
//判断是否是文章修改功能
// function getUrlName(name) {
//     console.log(location.search.substr(1).split('&'))
//     var temp = location.search.substr(1).split('&');
//     temp.forEach(function(value, index) {
//         // console.log(value.split('=')[0])
//         var s = value.split('=')[0];


//         if (s == name) {
//             return value.split('=')[1];
//         }
//         return -1;

//     })

// }
if (id != -1) {
    $.ajax({
        type: 'get', //get或post
        url: '/posts/' + id, //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) {
            $.ajax({
                type: 'get', //get或post
                url: '/categories', //请求的地址
                data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
                dataType: 'json',
                success: function(reponse) { //成功的回调函数
                    result.reponse = reponse;
                    console.log(result)
                    var html = template('modifyTpl', result);
                    console.log(html)
                    $('#modifyBox').html(html);
                }
            }); //成功的回调函数


        }
    })
}
$('#modifyBox').on('submit', '#modifyForm', function() {
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    console.log(id)
    $.ajax({
        type: 'put', //get或post
        url: '/posts/' + id, //请求的地址
        data: formData, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            console.log(result)
            location.href = '/admin/posts.html'
        }
    })
    return false;

})

function getUrlName(name) {
    console.log(location.search.substr(1).split('&'))
    var temp = location.search.substr(1).split('&');
    for (var i = 0; i < temp.length; i++) {
        var s = temp[i].split('=');
        if (s[0] == name) {
            return s[1];

        }
    }
    return -1;

}