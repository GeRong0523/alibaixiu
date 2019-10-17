// 呈递文章列表
function load(){
    $.ajax({
       type:'get',
       url:'/posts',
       success:function(res){
           console.log(res);
           var html = template('postTpl',res)
           $('#postBox').html(html)
       }

    })
}
load()
