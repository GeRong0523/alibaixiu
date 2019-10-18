// 呈递文章列表
function load(){
    $.ajax({
       type:'get',
       url:'/posts',
       success:function(res){
           var html = template('postTpl',res)
           $('#postBox').html(html)
           var page=template('pageTpl',res)
           $('.pagination').html(page)
       }
    })
}
load()

// 格式化时间函数
function formateDate(date) {
    var date = new Date(date)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}
// 分页功能
function changePage(page){
    $.ajax({
        type: 'get',
        url: '/posts',
        data:{page},
        success: function (res) {
            var html = template('postTpl', res)
            $('#postBox').html(html)
            var page = template('pageTpl', res)
            $('.pagination').html(page)
        }
    })
}

// 获取并渲染分页数据
$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('catagoTpl', {data:res})
        $('#categoryBox').html(html)
    }
})
$('#filterForm').on('submit',function(){
    $.ajax({
        type:'get',
        url: '/posts',
        data: $(this).serialize(),
        success: function (res) { 
            console.log(res);                 
            var html = template('postTpl', res)
            $('#postBox').html(html)
            var page = template('pageTpl', res)
            $('.pagination').html(page)
        }
    })
    return false
})




