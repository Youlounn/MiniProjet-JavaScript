$(function(){
  var bool = 0;
  var nb = 20;

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
  $("#incrementer").click(function(){
    nb = $("#reglages input").val();
    nb++;
    $("#reglages input").val(nb);
  })
  $("#decrementer").click(function(){
    nb = $("#reglages input").val();
    nb--;
    $("#reglages input").val(nb);
  })

  $( "#nomVille").autocomplete({
      source: "spip.php?page=autocomplete",
      minLength: 2,
    });


});
