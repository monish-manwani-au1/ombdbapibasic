window.onload = function() {
    $('.deletebtn1').on('click', function(){
       console.log("hello");
       var id = $(this).prop("value");
       console.log(id);
    $.ajax({
       url: "/myReviews/delete/"+id,
       type: 'DELETE',
       dataType: 'json',
       success: function(data){
             window.location = "/myReviews";
       }
    });

});
};


