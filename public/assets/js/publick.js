function dataFormat(str) {
    var date = new Date(str);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return y + '-' + m + '-' + d;
}
//获取随机推荐
$.ajax({
        type: 'get', //get或post
        url: '/posts/random', //请求的地址
        data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
        dataType: 'json',
        success: function(result) { //成功的回调函数
            // console.log(result)
            var randomTpl = ` 
        {{each data}}
        <li> <a href="javascript:;">
            <p class="title">{{$value.title}}</p>
            <p class="reading">阅读({{$value.meta.views}})</p>
            <div class="pic">
                <img src="{{$value.thumbnail}}" alt="">
            </div>
        </a>
    </li>
    {{/each}}
    `;
            var html = template.render(randomTpl, { data: result })
                // console.log(html)
            $('#randomTpl').html(html)

        }
    })
    //
    // 1.3.2.5. 3.2.5 获取最新发布文章
$.ajax({
    type: 'get', //get或post
    url: '/comments/lasted', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        console.log(result)
        var commentTpl = `
        {{each data}}
        <li>
        <a href="detail.html?id={{$value._id}}">
            <div class="avatar">
                <img src="uploads/avatar.jpg" alt="">
            </div>
            <div class="txt">
                <p>
                    <span>鲜活</span>{{$imports.dataFormat($value.createAt)}}说:
                </p>
                <p>{{$value.content}}</p>
            </div>
        </a>
    </li>
        {{/each}}
        `;
        var html = template.render(commentTpl, { data: result })
            // console.log(html)
        $('#newBox').html(html)
    }
})

$.ajax({
    type: 'get', //get或post
    url: '/categories', //请求的地址
    data: {}, //如果不需要传，则注释掉 请求的参数，a=1&b=2或{a:1,b:2}或者jq中的serialize方法，或者formData收集
    dataType: 'json',
    success: function(result) { //成功的回调函数
        // console.log(result)
        var navTpl = `
        {{each data}}
        <li><a href="list.html?categoryId={{$value._id}}"><i class="fa {{$value.className}}"></i>{{$value.title}}</a></li>
        {{/each}}
        `;
        var html = template.render(navTpl, { data: result })
            // console.log(html)
        $('#navBox').html(html);
    }
})

function getUrlName(name) {
    // console.log(location.search.substr(1).split('&'))
    var temp = location.search.substr(1).split('&');
    for (var i = 0; i < temp.length; i++) {
        var s = temp[i].split('=');
        if (s[0] == name) {
            return s[1];

        }
    }
    return -1;

}
$('.search form').on('submit', function() {
    console.log(this)
    alert(111)
    var keys = $(this).find('.keys').val();
    console.log($(this).find('.keys'))
    console.log(keys)
    location.href = '/search.html?key=' + keys;
    return false;
})