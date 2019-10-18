$.ajax({
    type: 'get',
    url: '/categories',
    success: function (res) {
        var html = template('categoryTpl', { data: res })
        $('#category').html(html)
    }
})
// 图片上传
$('#feature').on('change',function(){
    console.dir(this);  
    var fd=new FormData()
    fd.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data:fd,
        processData:false,
        contentType:false,
        success: function (res) {
            $('.thumbnail').attr('src', res[0].avatar).show()
            $('thumbnail').val(res[0].avatar)
        }
    })
})
$('#addForm').on('submit',function(){
    console.log(123);
    
    var formdata=$(this).serialize()
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formdata,
        success: function (res) {
            location.href='posts.html'
        }
    })
    return false
})
