// 呈递评论页面
function load(){
    $.ajax({
        type: 'get',
        url: '/comments',
        success: function (res) {
            var html = template('commentsTpl', res)
            $('#commentsBox').html(html)
            var page = template('pageTpl', res)
            $('.pagination').html(page)
        }
    })
}
load()

function formateDate(date) {
    var date = new Date(date)
    return date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
}
// 分页功能
function changepage(page){
    $.ajax({
        type: 'get',
        url: '/comments',
        data:{page},
        success: function (res) {
            console.log(res);
            var html = template('commentsTpl', res)
            $('#commentsBox').html(html)
            var page = template('pageTpl', res)
            $('.pagination').html(page)
        }
    })
}
// 改变评论状态
$('#commentsBox').on('click','.state',function(){
    var status = $(this).parent().attr('data-state')
    var id = $(this).parent().attr('data-id')
    console.log(status, id);
    $.ajax({
        type: 'put',
        url: '/comments/'+id,
        data: {
            state: status==0?1:0
         },
        success: function (res) {          
            load()    
        }
    })
})
// 删除功能
$('#commentsBox').on('click','.delete',function(){
    if( confirm('您确定要删除吗')){
        var id = $(this).parent().attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/comments/' + id,
            success: function (res) {
                load()
            }
        }) 
    }
})