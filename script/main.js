$(function() {
    var dialog = false;
    var bool = 0;
    var nb = 20;

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
        nb = $("#reglages input").val();
        nb++;
        $("#reglages input").val(nb);
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

    $(".ui-button").click(function(){
      $(".ui-dialog").css("display","none");
      $('#dialog').empty();
      dialog = false;
    });

    $("#loupe").click(function() {
        $("#soustabs1").empty();
        var ville = $('#nomVille').val();
        var textData = 'tags='+ville+'&tagmode=any&format=json';
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
                        console.log("Dialog : "+dialog);
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
                    if  ( i  ==  $("#nombrePhoto").val)  {
                        return  false;
                    }
                });          
            },
            error:   function(resultat, statut, erreur) {
                alert("erreur");
            },
        });
    });


    //
    // $("#nomVille").autocomplete({
    //     source: "spip.php?page=autocomplete",
    //     minLength: 2,
    // });


});
