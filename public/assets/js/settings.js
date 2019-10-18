// 上传图片
$('#logo').on('change',function(){
    var fd= new FormData()
    fd.append('logo',this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        data: fd,
        processData: false,
        contentType: false,
        success: function (res) {
            $('.thumbnail').attr('src', res[0].logo);
            $('#hiddenlogo').val(res[0].logo)
        }
    })
})
// 提交表单
$('#settingsForm').on('submit',function(){
    var formData=$(this).serialize()
    $.ajax({
        type: 'post',
        url: '/settings',
        data: formData,
        success: function (res) {
           location.reload()          
        }
    })
    return false
})