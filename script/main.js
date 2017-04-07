$(function() {
    var dialog = false;
    var bool = 0;
    var nb = 1000;

    $('.submit_on_enter').keydown(function(event) {
      // 13 est la valeur du bouton entrer
      if (event.keyCode == 13) {
        traitement();
        return false;
      }
    });

    $("#plus").click(function() {
        if (bool == 0) {
            $("#reglages").css("display", "block");
            bool = 1;
        } else {
            $("#reglages").css("display", "none");
            bool = 0;
        }
    })

    $("#incrementer").click(function() {
        if($("#nombrePhoto").val() == 20){
          $("#nombrePhoto").val(20);
        }
        else{
          nb = $("#nombrePhoto").val();
          nb++;
          $("#nombrePhoto").val(nb);
        }
    })
    $("#decrementer").click(function() {
        nb = $("#nombrePhoto").val();
        nb--;
        $("#nombrePhoto").val(nb);
    })

    var listeVille = [];
    $("#tabs").tabs();
    $("#dialog").dialog();
    $("#tabs").tabs();
    $("#dialog").dialog();
    $('#tabPhoto').dataTable();


    $(".ui-button").click(function() {
        $(".ui-dialog").css("display", "none");
        $('#dialog').empty();
        dialog = false;
    });

    var tableBis = $('#tableau').DataTable({
      "columns":[{
        "type" : "string"
      },{
        "type" : "string"
      },{
        "type" : "string"
      }],
    });

    $("#loupe").click(traitement);

      function traitement() {
        $("#soustabs1").empty();
        var ville = $('#nomVille').val();
        var textData = '&tags=' + ville + '&tagmode=all&format=json';


        $.ajax({
            url: 'http://api.flickr.com/services/feeds/photos_public.gne',
            type: 'GET',
            dataType: 'jsonp',
            jsonp:   'jsoncallback',
              // a renseigner d'après la doc du service, par défaut callback
            data: textData,
            success: function(data) {
                tableBis.clear();
                var nbDemande = $('#nombrePhoto').val();
                var cpt = 0;
                $.each(data.items,  function(i, item) {
                  console.log("i = "+i);
                    var dateMin = $('#dateMin').val();
                    var date = item.date_taken.substring(0,10);
                    //Découpage de la date
                    var anneeDate = parseInt(date.substring(0,4));
                    var anneeDateMin = parseInt(dateMin.substring(0,4));
                    var moisDate = parseInt(date.substring(5,7));
                    var moisDateMin = parseInt(dateMin.substring(5,7));
                    var jourDate = parseInt(date.substring(8,10));
                    var jourDateMin = parseInt(dateMin.substring(8,10));

                    var photo = $("<img/>").attr("src",  item.media.m);
                    var src = item.media.m;
                    var titre = item.title;
                    var aut = item.author;
                    var photo2 = "<img src="+src+" class='photos'></img>"
                    //découpage de la string de l'auteur pour ne récupérer que son nom
                    var guil1 = aut.indexOf("\"")+1;
                    var guil2 = aut.lastIndexOf("\"");
                    var auteur = aut.substring(guil1,guil2);

                    //ajout dans la table si la contrainte de date est respectee
                    var continuer = true;
                    if(anneeDateMin < anneeDate){
                      photo.attr("class", "itemPhoto").appendTo("#soustabs1");
                      tableBis.row.add([
                        photo2,
                        auteur,
                        date
                      ]).draw(true);
                      cpt++;
                      continuer = false;
                    }
                    else if(anneeDateMin == anneeDate && continuer == true){
                      if(moisDateMin < moisDate && continuer == true){
                        photo.attr("class", "itemPhoto").appendTo("#soustabs1");
                        tableBis.row.add([
                          photo2,
                          auteur,
                          date
                        ]).draw(true);
                        cpt++;
                        continuer = false;
                      }
                      else if(moisDateMin == moisDate && continuer == true)
                        if(jourDateMin <= jourDate && continuer == true){
                          photo.attr("class", "itemPhoto").appendTo("#soustabs1");
                          tableBis.row.add([
                            photo2,
                            auteur,
                            date
                          ]).draw(true);
                          cpt++;
                          continuer = false;
                        }
                    }

                    //Positionne le ui-dialog mais le cache
                    $(".ui-dialog").css("visibility", "hidden");
                    $(".ui-dialog").css("position", "absolute");
                    $(".ui-dialog").css("left", "2%");
                    $(".ui-dialog").css("top", "60%");

                    //afiche le ui-dialog au click sur une photo
                    photo.click(function() {
                        if (dialog == false) {
                            $('#dialog').append("<p>"+ "<b>Titre : </b>" + titre + "</br>" + "<b>Auteur : </b>"+auteur + "</p>");
                            $(".ui-dialog").css("visibility", "visible");
                            $(".ui-dialog").css("display", "block");
                            dialog = true;
                        } else {
                            $('#dialog').empty();
                            $(".ui-dialog").css("visibility", "hidden");
                            $(".ui-dialog").css("display", "none");
                            dialog = false;
                        }
                    });
                    if(nbDemande == cpt){
                      return false;
                    }

                    //Affichage d'un message s'il n'y a pas de résultat
                    if((i == 19 || i == nbDemande) && cpt == 0){
                      $('#dialog').empty();
                      $('#dialog').append("<p>Désolé, nous n'avons pas de résultat.</p>");
                      $(".ui-dialog").css("visibility", "visible");
                      $(".ui-dialog").css("display", "block");
                      tableBis.clear().draw(true);
                      dialog = true;
                      return false;
                    }

                    //Affichage d'un message s'il n'y a pas assez de résultat
                    if(i == 19 && cpt < nbDemande){
                      $('#dialog').empty();
                      $('#dialog').append("<p>Désolé, nous n'avons pas assez de résultats.</p>");
                      $(".ui-dialog").css("visibility", "visible");
                      $(".ui-dialog").css("display", "block");
                      dialog = true;
                      return false;
                    }
                    tableBis.draw(true);
                });          
            },
            // déclanchement de l'erreur
            error:   function(resultat, statut, erreur) {
                alert("Il y a une erreur");
            },
        });
    }
    var listeAutocomplete = [];

});
