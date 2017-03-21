$(function(){
  var bool = 0;
  $("#plus").click(function(){
    if(bool==0){
      $("#reglages").css("display","block");
      bool = 1;
    }
    else{
      $("#reglages").css("display","none");
      bool = 0;
    }
  })
});
