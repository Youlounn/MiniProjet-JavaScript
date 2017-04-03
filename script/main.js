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
        if($("#reglages input").val() == 20){
          $("#reglages input").val(20);
        }
        else{
          nb = $("#reglages input").val();
          nb++;
          $("#reglages input").val(nb);
        }
    })
    $("#decrementer").click(function() {
        nb = $("#reglages input").val();
        nb--;
        $("#reglages input").val(nb);
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
                alert(JSON.stringify(data));
                $.each(data.items,  function(i, item) {
                    var photo = $("<img/>").attr("src",  item.media.m);
                    photo.attr("class", "itemPhoto").appendTo("#soustabs1");
                    var src = item.media.m;
                    var auteur = item.author;
                    var titre = item.title;
                    var date = item.date;        
                    $(".ui-dialog").css("visibility", "hidden");
                    $(".ui-dialog").css("position", "absolute");
                    $(".ui-dialog").css("left", "2%");
                    $(".ui-dialog").css("top", "60%");

                    photo.click(function() {
                        console.log("Dialog : " + dialog);
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
                    var tmp = $("#reglages input").val();
                    console.log("i = " + i);
                    console.log("tmp = " + tmp);
                    if  (i  ==  tmp - 1)  {
                        return  false;
                    }
                    i = i - 1;
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
