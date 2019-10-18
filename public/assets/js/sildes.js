function load(){
    $.ajax({
        type: 'get',
        url: '/slides',
        success: function (res) {
            var html = template('sildesTpl', { res })
            $('#sildesBox').html(html)
        }
    })
}
load()

// 轮播图添加功能
// 1.上传图片
$("#file").on('change',function(){
    var fd=new FormData()
    fd.append('image',this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data:fd,
        processData:false,
        contentType:false,
        success: function (res) {
            $('.thumbnail').attr('src',res[0].image).show() ;
            $('#hiddenimage').val(res[0].image)
        }
    })
})
// 实现添加功能
$('#slidesForm').on('submit',function(){
    var formdata=$(this).serialize()   
    $.ajax({
        type: 'post',
        url: '/slides',
        data: $(this).serialize(),
        success: function (res) {
            load()
        }
    })
    return false
})
// 删除轮播图列表项
$('#sildesBox').on('click','.delete',function(){
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'delete',
        url: '/slides/'+id,
        success: function (res) {
            load()
        }
    })
      
})
