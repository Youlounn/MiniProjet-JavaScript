$(function() {
    var dialog = false;
    var bool = 0;
    var nb = 1000;

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

    $("#loupe").click(function() {
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

                    var anneeDate = parseInt(date.substring(0,4));
                    var anneeDateMin = parseInt(dateMin.substring(0,4));
                    var moisDate = parseInt(date.substring(5,7));
                    var moisDateMin = parseInt(dateMin.substring(5,7));
                    var jourDate = parseInt(date.substring(8,10));
                    var jourDateMin = parseInt(dateMin.substring(8,10));

                    var photo = $("<img/>").attr("src",  item.media.m);
                    var src = item.media.m;
                    var titre = item.title;
                    var auteur = item.author;
                    var photo2 = "<img src="+src+" class='photos'></img>"

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

                    $(".ui-dialog").css("visibility", "hidden");
                    $(".ui-dialog").css("position", "absolute");
                    $(".ui-dialog").css("left", "2%");
                    $(".ui-dialog").css("top", "60%");

                    photo.click(function() {
                        if (dialog == false) {
                            $('#dialog').append("<p>" + titre + "</br>" + auteur + "</p>");
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
                    if((i == 19 || i == nbDemande) && cpt == 0){
                      alert("test");
                      $('#dialog').empty();
                      $('#dialog').append("<p>Désolé, nous n'avons pas de résultat.</p>");
                      $(".ui-dialog").css("visibility", "visible");
                      $(".ui-dialog").css("display", "block");
                      tableBis.clear().draw(true);
                      dialog = true;
                      return false;
                    }
                    if(i == 19 && cpt < nbDemande){
                      $('#dialog').empty();
                      $('#dialog').append("<p>Désolé, nous n'avons pas assez de résultats.</p>");
                      $(".ui-dialog").css("visibility", "visible");
                      $(".ui-dialog").css("display", "block");
                      dialog = true;
                      return false;
                    }
                    alert('test avant');
                    tableBis.draw(true);
                    alert('test après');
                });          
            },
            error:   function(resultat, statut, erreur) {
                alert("erreur");
            },
        });
    });
    var listeAutocomplete = [];
    $.getJSON('http://localhost/test/serveur/communes.php', {
        commune: null
    }, function(data) {
        var map = {};
        $.each(data, function(i, item) {
            if(map[item.VILLE] == null){
                map[item.VILLE] = true;
                listeAutocomplete.push(item.VILLE);
            }
        });
    });
    $(document).ready(function() {
        $('#nomVille').autocomplete({
            source: function(req, response) {
                var results = $.ui.autocomplete.filter(listeAutocomplete, req.term);
                response(results.slice(0, 10)); //for getting 5 results
            },
            minLength: 3,
        });
    });
});
