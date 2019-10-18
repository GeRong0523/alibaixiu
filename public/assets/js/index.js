// 获取文章数量
$.ajax({
    type: 'get',
    url: '/posts/count',
    success: function (res) {
        var html =`<strong>${res.postCount}</strong>篇文章（<strong>${res.draftCount}</strong>篇草稿）`
        $('#postBox').html(html)
       
    }
})