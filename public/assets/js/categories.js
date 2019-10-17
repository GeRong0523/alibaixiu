// 分类列表呈递
function load(){
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (res) {
            var html = template('categoriesTpl', { data: res })
            $('#categoriesBox').html(html)
        }
    })
}
load()
// 分类添加功能
$('#addCategory').on('submit',function(){
    var  formdata = $(this).serialize()
    $.ajax({
        type: 'post',
        url: '/categories/',
        data: formdata,
        success: function (res) {
            load()
        }
    })
    return false
})
// 修改文章分类页面呈递
$('#categoriesBox').on('click','.edit',function(){
    var id=$(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/categories/'+id,
        success: function (res) {
            var html = template('modifyCateTpl',res)
            $('.modifyBox').html(html)                     
        }
    })
})
// 修改分类功能
$('.modifyBox').on('submit','#modifyCategory',function(){
    var formdata = $(this).serialize()
    var id = $(this).attr('data-id') 
    $.ajax({
        type: 'put',
        url: '/categories/'+id,
        data: formdata,
        success: function (res) {
            load()
        }
    })
   return false  
})
// 删除分类功能
$('#categoriesBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    if(confirm('确定删除？')){
        $.ajax({
            type: 'delete',
            url: '/categories/' + id,
            success: function (res) {
                load()
            }
        })
    }    
})

