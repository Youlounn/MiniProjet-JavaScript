$(function(){
  var bool = 0;
  var nb = 20;
  $("#plus").click(function(){
    $("#plus").css("transition","all 1s slide");
    $("#reglages").css("transition","all 1s slide");
    if(bool==0){
      $("#reglages").css("display","block");
      bool = 1;
    }
    else{
      $("#reglages").css("display","none");
      bool = 0;
    }
  })
  $("#incrementer").click(function(){
    nb = $("#reglages input").val();
    nb++;
    $("#reglages input").val(nb);
    if(nb >= 100){
      $("#reglages input").css("width","4%");
    }
    if(nb >= 1000){
      $("#reglages input").css("width","5%");
    }
    if(nb >= 10000){
      $("#reglages input").css("width","6%");
    }
  })
  $("#decrementer").click(function(){
    nb = $("#reglages input").val();
    nb--;
    $("#reglages input").val(nb);
    if(nb < 100){
      $("#reglages input").css("width","3%");
    }
    if(nb < 1000){
      $("#reglages input").css("width","4%");
    }
    if(nb < 10000){
      $("#reglages input").css("width","5%");
    }
  })

});
