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

  var listeVille = [];

  $.ajax({
   url: 'http://api.flickr.com/services/feeds/photos_public.gne',
   type: 'GET',
   dataType: 'jsonp',
   jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback
   data:'tags=nantes&tagmode=any&format=json',
   success: function (data) {
     $.each(data.items, function(i,item){
            $("<img/>").attr("src", item.media.m).appendTo("#panneau");
            if ( i == 16 ) {
              return false ; 
            }});
          },
    error: function(resultat,statut,erreur){
    alert("erreur");},
});

  $( "#nomVille").autocomplete({
      source: "spip.php?page=autocomplete",
      minLength: 2,
    });


});
