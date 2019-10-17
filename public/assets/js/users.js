// 呈递用户名
function load(){
    $.ajax({
        type: 'get',
        url: '/users',
        success: function (res) {
            var html = template('tplUser', { data: res })
            $('tbody').html(html)
        }
    })
}
load()
// 用户添加功能
$('#userForm').on('submit',function(){
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function (res) {
            load()            
        }
    })
    return false;
})
// 上传用户头像
$('#avatar').on('change', function () {
    var fd = new FormData()
    fd.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: fd,
        success: function (res) {
            console.log(res);
            $('#preview').prop('src', res[0].avatar)
            $('#hiddenavatar').val(res[0].avatar)
        }
    })
})

// 呈递修改信息页面
$('tbody').on('click', '.edit', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function (res) {
            //    console.log(res);
            var html = template('tplModify', res)
            $('.modifybox').html(html)
        }
    })
})
// 实现修改功能,需要事件委托
$('.modifybox').on('submit', '#modifyForm', function(){
    var formData = $(this).serialize();
    var id = $(this).attr('data-id') 
    $.ajax({
        type: 'put',
        url: '/users/'+id,
        data: formData,
        success: function (res) {
            load()
        }
    })
    return false ;
})
// 修改上传图片
$('.modifybox').on('change', '#avatar', function () {
    var fd = new FormData()
    fd.append('avatar', this.files[0])
    $.ajax({
        type: 'post',
        url: '/upload',
        processData: false,
        contentType: false,
        data: fd,
        success: function (res) {
            console.log(res);
            $('#preview').prop('src', res[0].avatar)
            $('#hiddenavatar').val(res[0].avatar)
        }
    })
})

// 实现删除功能
$('tbody').on('click','.delete',function(){
    var bool=confirm('您确定要删除用户吗')
    if (bool){
        var id = $(this).attr('data-id')
        $.ajax({
            type: 'delete',
            url: '/users/'+id,
            success: function (res) {
                load()
            }
        })
    } 
})
// 批量删除
$('#checkAll').on('change',function(){
    var bool=$(this).prop('checked');
    var checklist = $('tbody input[type="checkbox"]')
    checklist.prop('checked',bool)
    if (bool){
        $('#deleteAll').css('opacity','1')
    }else{
        $('#deleteAll').css('opacity', '0')
    }   
})
$('tbody').on('change','input[type="checkbox"]',function(){
    if ($('tbody input[type="checkbox"]').length == $('tbody input[type="checkbox"]:checked').length){
        $('#checkAll').prop('checked',true)
    }else{
        $('#checkAll').prop('checked',false)
    }
    if ($('tbody input[type="checkbox"]:checked').length>0){
        $('#deleteAll').css('opacity', '1')
    }else{
        $('#deleteAll').css('opacity', '0')
    }
})
$('#deleteAll').on('click',function(){
    var checklist = $('tbody input[type="checkbox"]:checked');
    var str=''
    checklist.each(function(i,v){
        str += $(v).attr('data-id')+'-'
    })
    id = str.substr(0, str.length-1)
    if(confirm('您确认删除这些吗？')){
        $.ajax({
            type: 'delete',
            url:'/users/'+id,
            success:function(res){
                load()                  
            }
        })
    }
    
})







