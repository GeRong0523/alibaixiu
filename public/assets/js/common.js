$('#logout').on('click',function(){
     var bool=confirm('确定要退出？')
     if(bool){
         $.ajax({
             type:'post',
             url:'/logout',
             success:function(){
                 location.href='login.html'
             }
         }) 
     }
})