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
  $( "#tabs" ).tabs();
  $( "#dialog" ).dialog();

  $.ajax({
   url: 'http://api.flickr.com/services/feeds/photos_public.gne',
   type: 'GET',
   dataType: 'jsonp',
   jsonp: 'jsoncallback', // a renseigner d'après la doc du service, par défaut callback
   data:'tags=nantes&tagmode=any&format=json',
   success: function (data) {
     $.each(data.items, function(i,item){
     var photo = $("<img/>").attr("src", item.media.m);
     photo.attr("class", "itemPhoto").appendTo("#tabs-1");

     var src = item.media.m;
     var auteur = item.author;
     var titre = item.title;
     var date = item.date;        
      $(".dial").hide();

     photo.click(function(){
       $("#titrePhoto").innerHTML=titre;
       $("#auteurPhoto").innerHTML=auteur;
       $("#srcPhoto").innerHTML=titre;
       $("#datePhoto").innerHTML=date;
       $(".dial").show();
       alert(src+" "+auteur+" "+ titre+" "+ date);
     });

            if ( i == $("#nombrePhoto").val) {
              return false;
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
