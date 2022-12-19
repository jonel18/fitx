var id_logged = null;

$.get("../services/session.php", function( data ) {
    if (data.status == "unset") {
        alert( "Ju lutem logohuni!" );
        window.location.href = "../index.html";
    }
    else {
        $("#user_name").html(data.emri);
        $("#user_last_name").html(data.mbiemri);
        id_logged = data.user_id;
        console.log("U id: "+ id_logged);

        if (new URLSearchParams(window.location.search).get('profile_id') == '0')
        {
            location.href = location.origin + location.pathname + '?profile_id=' + id_logged;
        }

        if (new URLSearchParams(window.location.search).get('profile_id') != null) {
            var user_id = new URLSearchParams(window.location.search).get('profile_id');
            $.post("../services/getProfile.php",
                {
                    userId: user_id
                },
                function (data) {
                    var append_profile = "" +
                        "<div class='col-md-4'>Emri: <i>" + data.emri + "</i> </div>" +
                        "<div class='col-md-4'>Mbiemri: <i>" + data.mbiemri + "</i> </div>" +
                        "<div class='col-md-4'>Email: <i>" + data.email + "</i> </div>" +
                        "<div class='col-md-4'>Celular: <i>" + data.celular + "</i> </div>" +
                        "<div class='col-md-4'>Gjinia: <i>" + data.gjinia + "</i> </div>" +
                        "<div class='col-md-4'>Ditelindja: <i>" + data.ditelindja + "</i> </div>" +
                        "<div class='col-md-4'>Data e Regjistrimit: <i>" + data.koha_regj + "</i> </div>" +
                        "";
                    $("#profile").append(append_profile);

                    if(parseInt(data.RU_P) == 0 && parseInt(data.RU_A) == 0 && parseInt(data.PS_P) == 0 && parseInt(data.PS_A) == 0)
                    {
                        $("#bli_prog").removeClass("hidden");
                        $(".pakete_joaktive").removeClass("hidden");
                    }
                    else {
                        if (parseInt(data.PS_A) == 0 && parseInt(data.PS_P) == 0) {
                            $("#bli_PS").removeClass("hidden");
                        }
                        if (parseInt(data.RU_A) == 0 && parseInt(data.RU_P) == 0) {
                            $("#bli_RU").removeClass("hidden");
                        }
                    }

                    if (parseInt(data.PS_A) != 0 || parseInt(data.RU_A) != 0) {
                        getPS_A(data.PS_A, user_id);
                        getRU_A(data.RU_A, user_id);
                    }

                    if (parseInt(data.PS_P) != 0 || parseInt(data.RU_P) != 0) {
                        getPS_P(data.PS_P, user_id);
                        getRU_P(data.RU_P, user_id);
                    }
                }, "json")
                .fail(function () {
                    alert("Dicka shkoi gabim. Provoni perseri me vone.");
                });


        }
    }
}, "json" )
    .fail(function() {
        alert( "Dicka shkoi gabim. Provoni perseri me vone." );
    });

$("#signOut").click(function()    {
        $.post("../services/signOut.php",
            {
                email: null
            })
            .done(function(data) {
                window.location.href = "../index.html";
            })
            .fail(function() {
                alert( "Dicka shkoi gabim. Provoni perseri me vone." );
            });
    });

$(".admin-box").click(function () {
    $.post("../services/getUsers.php",
    {
        type: $(this).attr("id")
    }, function(data){
            if (data.type == "b-kliente") {
               window.location.href = "../pages/newUsers.html";
            }
            else if (data.type == "b-paketa") {
                window.location.href = "../pages/newPaketa.html";
            }
            else if (data.type == "b-expire") {
                window.location.href = "../pages/newUsers.html";
            }
            else if (data.type == "b-exercise") {
                window.location.href = "../pages/ushtrimet.html";
            }
        }, "json")
    .done(function(data){
    })
    .fail(function() {
            alert( "Dicka shkoi gabim. Provoni perseri me vone." );
        });
});

$('input[type=radio][name=paketa]').change(function() {
    if (this.value == 'PS') {
        $(".r_ushqimor").hide();
        $(".p_stervitor").show();

    }
    else if (this.value == 'RU') {
        $(".r_ushqimor").show();
        $(".p_stervitor").hide();
    }
    else {
        $(".r_ushqimor").show();
        $(".p_stervitor").show();
    }
});

$("#shtoPStervitor").click(function () {
    $("#ps_program").removeClass("hidden");
    $("#shtoPStervitor").addClass("hidden");
});

$("#shtoRUshqimor").click(function () {
    $("#ru_program").removeClass("hidden");
    $("#shtoRUshqimor").addClass("hidden");
});

$("#bli_PS").click(function (){
    $("#bliPakete").trigger('reset');
    $("input[type=radio][name=paketa][value='PS']").attr('checked', 'checked');
    $(".z_pakete").addClass("hidden");
    $(".r_ushqimor").hide();
    $(".p_stervitor").show();
});

$("#bli_RU").click(function (){
    $("#bliPakete").trigger('reset');
    $("input[type=radio][name=paketa][value='RU']").attr('checked', 'checked');
    $(".z_pakete").addClass("hidden");
    $(".r_ushqimor").show();
    $(".p_stervitor").hide();
});

$('.add_row').click(function () {
    var dita = parseInt($(this).text().substring(0,2));
    var rowspan = parseInt( $(this).parent().attr('rowspan'))+1;
    var num = "input[name=rep_"+dita+"_" + parseInt( $(this).parent().attr('rowspan')) + "]";
    $(this).parent().attr('rowspan', rowspan);
    $(num).parent().parent().after("" +
        "<tr>" +
        "<td class=\"strukture\"><select class=\"get_ushtrimet\" name=\"ush_"+dita+"_" + rowspan + "\"></select></td>\n" +
        "<td class=\"strukture\"><input name=\"rep_"+dita+"_" + rowspan + "\" type=\"text\"></td>\n" +
        "<td class=\"strukture\"><input name=\"koh_"+dita+"_" + rowspan + "\" type=\"text\"></td>\n" +
        "<td class=\"strukture\"><input name=\"set_"+dita+"_" + rowspan + "\" type=\"text\"></td>\n" +
        "<td class=\"strukture\"><input name=\"pes_"+dita+"_" + rowspan + "\" type=\"text\"></td>\n" +
        "</tr>");
    initailizeSelect2();
});

$('.add_row_ru').click(function () {
    var dita = parseInt($(this).text().substring(0,2));
    var rowspan = parseInt( $(this).parent().attr('rowspan'))+1;
    var num = "input[name=ora_"+dita+"_" + parseInt( $(this).parent().attr('rowspan')) + "]";
    $(this).parent().attr('rowspan', rowspan);
    $(num).parent().parent().after("" +
        " <tr>" +
        "<td class=\"strukture ora\"><input name=\"ora_"+dita+"_" + rowspan + "\" type=\"text\"></td>\n" +
        "<td class=\"strukture\"><textarea name=\"per_"+dita+"_" + rowspan + "\"></textarea></td>\n" +
        "                        </tr>" +
        "");
});

$('#ps_program_table' )
    .submit(function(e){
         var send_data = new FormData( this )
        for (let i= 1; i < 15; i++) {
            var search = "#row"+i;
            var day = "day_"+i;
            send_data.append(day, $(search).attr("rowspan"));
        }
            send_data.append("id_paketa", parseInt(new URLSearchParams(window.location.search).get('paketa_id')));
            send_data.append("id_personal", $(".emerKlienti").attr('id'));
            e.preventDefault();
            $.ajax( {
                url: '../services/shtoProgramStervitor.php',
                type: 'POST',
                data: send_data,
                processData: false,
                contentType: false,
                dataType : 'json',
                success: function(data) {
                    console.log(data.status);
                }
            } );
            location.reload();
    });

$('#ru_program_table' )
    .submit(function(e){
        var send_data = new FormData( this )
        for (let i= 1; i < 15; i++) {
            var search = "#row_r_"+i;
            var day = "day_"+i;
            send_data.append(day, $(search).attr("rowspan"));
        }
        send_data.append("id_paketa", parseInt(new URLSearchParams(window.location.search).get('paketa_id')));
        send_data.append("id_personal", $(".emerKlienti").attr('id'));
        e.preventDefault();
        $.ajax( {
            url: '../services/shtoRegjimUshqimor.php',
            type: 'POST',
            data: send_data,
            processData: false,
            contentType: false,
            dataType : 'json',
            success: function(data) {
                console.log(data.status);
            }
        } );
        location.reload();
    });

$('#ru_program_foto' )
    .submit(function(e){
        console.log("Here we go");
        var send_data = new FormData( this )
        send_data.append("id_paketa", parseInt(new URLSearchParams(window.location.search).get('paketa_id')));
        send_data.append("id_personal", $(".emerKlienti").attr('id'));
        e.preventDefault();
        $.ajax( {
            url: '../services/shtoRegjimUshqimor.php',
            type: 'POST',
            data: send_data,
            processData: false,
            contentType: false,
            dataType : 'json',
            success: function(data) {
                console.log(data.status);
                location.reload();
            }
        } );
    });

function getProgramStervitor(paketaId, userId) {
    var user_id = userId;
    var paketa_id = paketaId;
    $.post("../services/getProgramStervitor.php",
        {
            id_personal: user_id,
            id_paketa: paketa_id
        },
        function (data) {
             var dita=1;
             var rowspan=1;
             var append_ps="<div class=\"wrap-login100\">\n" +
                 "          <div class=\"row\">" +
                 "          <div class=\"card_title\">Ndiqni per 14 dite programin e meposhtem stervitor</div> " +
                 "<table><thead><tr><td>Dita</td><td>Ush</td><td>Reps</td><td>Koha (sec)</td><td>Sete</td><td>Pesha (kg)</td></tr></thead> <tbody>"
             $.each(data, function(index, value){
                 var em_ush=value.emri != null ? value.emri : "";
             if (parseInt(value.dita) == dita) {
                 rowspan=1;
                 append_ps=append_ps+"<tr><td id='dita_"+value.dita+"' rowspan='"+rowspan+"'>"+value.dita+"</td><td class='ushtrim'>"+em_ush+"<span class='hidden'>"+value.id_ushtrim+"</span></td><td>"+value.reps+"</td><td>"+value.koha+"</td><td>"+value.sete+"</td><td>"+value.pesha+"</td></tr>"
                 dita=dita+1;
             }
             else {
                 rowspan=rowspan+1;
                 append_ps=append_ps+"<tr><td class='ushtrim'>"+em_ush+"<span class='hidden'>"+value.id_ushtrim+"</span></td><td>"+value.reps+"</td><td>"+value.koha+"</td><td>"+value.sete+"</td><td>"+value.pesha+"</td></tr>";
                 var search_nr="#dita_"+(dita-1);
                 var txt = "id='dita_"+parseInt(dita-1)+"' rowspan='"+parseInt(rowspan-1)+"'";
                 var replace = "id='dita_"+parseInt(dita-1)+"' rowspan='"+parseInt(rowspan)+"'";
                 append_ps= append_ps.replace(txt, replace);
                 $(search_nr).attr("rowspan", rowspan);
             }
            });
             append_ps=append_ps+"</tbody></table></div></div><button class='btn btn-danger term_PS' id='"+paketa_id+"'>Termino Programin Stervitor</button>";
            $(".pakete_aktive_ps").append(append_ps);
            clickUshtrim();
            terminoPS();
        }, "json")
        .fail(function () {
            alert("Dicka shkoi gabim. Provoni perseri me vone.");
        });
};

function getRegjimUshqimor(paketaId, userId) {
    var user_id = userId;
    var paketa_id = paketaId;
    $.post("../services/getRegjimUshqimor.php",
        {
            id_personal: user_id,
            id_paketa: paketa_id
        },
        function (data) {
            var append_ru = "<div class=\"wrap-login100\">\n" +
                "           <div class=\"row\">" +
                "           <div class=\"card_title\">Ndiqni per 14 dite regjimin e meposhtem ushqimor</div>";

            if(data[0].foto == 0) {
                var dita = 1;
                var rowspan = 1;
                append_ru = append_ru + "<table><thead><tr><td>Dita</td><td>Ora</td><td>Pershkrim</td></tr></thead> <tbody>"
                $.each(data, function (index, value) {
                    if (parseInt(value.dita) == dita) {
                        rowspan = 1;
                        append_ru = append_ru + "<tr><td id='dita_r_" + value.dita + "' rowspan='" + rowspan + "'>" + value.dita + "</td><td>" + value.ora + "</td><td>" + value.pershkrim + "</td></tr>"
                        dita = dita + 1;
                    } else {
                        rowspan = rowspan + 1;
                        append_ru = append_ru + "<tr><td>" + value.ora + "</td><td>" + value.pershkrim + "</td></tr>";
                        var search_nr = "#dita_r_" + (dita - 1);
                        var txt = "id='dita_r_" + parseInt(dita - 1) + "' rowspan='" + parseInt(rowspan - 1) + "'";
                        var replace = "id='dita_r_" + parseInt(dita - 1) + "' rowspan='" + parseInt(rowspan) + "'";
                        append_ru = append_ru.replace(txt, replace);
                        $(search_nr).attr("rowspan", rowspan);
                    }
                });
                append_ru = append_ru + "</tbody></table>";
            }
            else {
                append_ru = append_ru + "<img src='../regjimiUshqimorFoto/" + data[0].foto + "' alt='Regjimi Ushqimor'>";
            }
            append_ru = append_ru + "</div></div> <button class='btn btn-danger term_RU' id='"+paketa_id+"'>Termino Regjimin Ushqimor</button>";
            $('.pakete_aktive_ru').append(append_ru);
            terminoRU();
        }, "json")
        .fail(function () {
            alert("Dicka shkoi gabim. Provoni perseri me vone.");
        });
};

function clickUshtrim() {
    $(".ushtrim").click(function () {
       if ($(this).find( "span" ).text() != "null") {
           $.post("../services/getUshtrim.php",
               {
                   id: parseInt($(this).find("span").text())
               },
               function (data) {
                   $(".ushtrim_body").text("");
                   $(".ushtrim_body").append("<div class=\"card_title\">" + data.emri + "</div>");
                   $(".ushtrim_body").append("<div class=\"ushtrim_pershkrim\">" + data.pershkrimi + "</div><br><br>");
                   $(".ushtrim_body").append("<video width=\"400\" autoplay loop>\n" +
                       "  <source  src=\"../ushtrimet/" + data.video + "\" type=\"video/mp4\" />\n" +
                       "</video>");
                   if (data.foto != "") {
                       $(".ushtrim_body").append("<img style=\"max-width: 400px;\" src=\"../ushtrimet/" + data.foto + "\" alt=\" \">");
                   }
               }, "json")
               .fail(function () {
                   alert("Dicka shkoi gabim. Provoni perseri me vone.");
               });
           $('#ViewUshtrim').modal('show');
       }
    })
}

function getPS_A (idPaketa, idUser){
   if (parseInt(idPaketa) != 0) {
       $.post("../services/getPaketa.php",
           {
               userId: idUser
           },
           function (data) {
               var append_paketa = "<div class=\"wrap-login100 pakete_aktive_ps\">" +
                   "<div class=\"card_title pakete_tittle\">Programi Stervitor</div>" +
                   "<div class=\"card_content row\" class=\"p_aktive\">" +
                   "<div class='col-md-4'> <b>Paketa: </b>" + data.paketa + " </div>" +
                   "<div class='col-md-4'> <b>Pesha: </b>" + data.pesha + " </div>" +
                   "<div class='col-md-4'> <b>Gjatesia: </b>" + data.gjatesia + " </div>" +
                   "<div class='col-md-4'> <b>Sa aktiv jeni: </b>" + data.aktiv + " </div>" +
                   "<div class='col-md-4'> <b>Sa do te stervitesh: </b>" + data.stervitje + " </div>" +
                   "<div class='col-md-4'> <b>Vendi i Stervitjes: </b>" + data.vendi_stervitjes + " </div>" +
                   "<div class='col-md-4'> <b>Sa ore sterviteni: </b>" + data.ore_stervitje + " </div>" +
                   "<div class='col-md-4'> <b>A doni te perfshini vrapin: </b>" + data.vrap + " </div>" +
                   "<div class='col-md-4'> <b>A keni probleme shendetesore: </b>" + data.p_shendetesor + " </div>" +
                   "<div class='col-md-4'> <b>Synimi mbi trupin tuaj: </b>" + data.p_synimi + " </div>" +
                   "<div class='col-md-4'> <b>Historiku shendetesor: </b>" + data.h_shendetesor + " </div>" +
                   "<div class='col-md-4'> <b>Ushqime qe nuk hani apo keni alergji: </b>" + data.alergjite + " </div>" +
                   "<div class='col-md-4'> <b>Numri i kafeve ne dite: </b>" + data.kafe + " </div>" +
                   "<div class='col-md-4'> <b>Grupi i gjakut: </b>" + data.gjaku + " </div>" +
                   "<div class='col-md-4'> <b>A keni ndjekur me pare regjim ushqimor: </b>" + data.regjim + " </div>" +
                   "<div class='col-md-4'> <b>Komente: </b>" + data.komente + " </div>" +
                   "</div>" +
                   "</div>";
               $(".container-login100").append(append_paketa);
               getProgramStervitor(idPaketa, idUser);
           }, "json")
           .fail(function () {
               alert("Dicka shkoi gabim. Provoni perseri me vone.");
           });
   }
}

function getRU_A (idPaketa, idUser){
    if (parseInt(idPaketa) != 0) {
        $.post("../services/getPaketa.php",
            {
                userId: idUser
            },
            function (data) {
                var append_paketa = "<div class=\"wrap-login100 pakete_aktive_ru\">" +
                    "<div class=\"card_title pakete_tittle\">Regjimi Ushqimor</div>" +
                    "<div class=\"card_content row\" class=\"p_aktive\">" +
                    "<div class='col-md-4'> <b>Paketa: </b>" + data.paketa + " </div>" +
                    "<div class='col-md-4'> <b>Pesha: </b>" + data.pesha + " </div>" +
                    "<div class='col-md-4'> <b>Gjatesia: </b>" + data.gjatesia + " </div>" +
                    "<div class='col-md-4'> <b>Sa aktiv jeni: </b>" + data.aktiv + " </div>" +
                    "<div class='col-md-4'> <b>Sa do te stervitesh: </b>" + data.stervitje + " </div>" +
                    "<div class='col-md-4'> <b>Vendi i Stervitjes: </b>" + data.vendi_stervitjes + " </div>" +
                    "<div class='col-md-4'> <b>Sa ore sterviteni: </b>" + data.ore_stervitje + " </div>" +
                    "<div class='col-md-4'> <b>A doni te perfshini vrapin: </b>" + data.vrap + " </div>" +
                    "<div class='col-md-4'> <b>A keni probleme shendetesore: </b>" + data.p_shendetesor + " </div>" +
                    "<div class='col-md-4'> <b>Synimi mbi trupin tuaj: </b>" + data.p_synimi + " </div>" +
                    "<div class='col-md-4'> <b>Historiku shendetesor: </b>" + data.h_shendetesor + " </div>" +
                    "<div class='col-md-4'> <b>Ushqime qe nuk hani apo keni alergji: </b>" + data.alergjite + " </div>" +
                    "<div class='col-md-4'> <b>Numri i kafeve ne dite: </b>" + data.kafe + " </div>" +
                    "<div class='col-md-4'> <b>Grupi i gjakut: </b>" + data.gjaku + " </div>" +
                    "<div class='col-md-4'> <b>A keni ndjekur me pare regjim ushqimor: </b>" + data.regjim + " </div>" +
                    "<div class='col-md-4'> <b>Intoleranca Ushqimore: </b> <a href='../uploads/"+data.intoleranca+"'>" + data.intoleranca + "</a> </div>" +
                    "<div class='col-md-4'> <b>Komente: </b>" + data.komente + " </div>" +
                    "</div>" +
                    "</div>";
                $(".container-login100").append(append_paketa);
                getRegjimUshqimor(idPaketa, idUser);
            }, "json")
            .fail(function () {
                alert("Dicka shkoi gabim. Provoni perseri me vone.");
            });
    }
}

function getPS_P (idPaketa, idUser){
    if (parseInt(idPaketa) != 0) {
        $.post("../services/getPaketa.php",
            {
                userId: idUser
            },
            function (data) {
                var append_paketa = "<div class=\"wrap-login100 pakete_pritje_ps\">" +
                    "<div class=\"card_title pakete_tittle\">Programi Stervitor</div>" +
                    "<div class=\"card_content row\" class=\"p_aktive\">" +
                    "<div class='col-md-4'> <b>Paketa: </b>" + data.paketa + " </div>" +
                    "<div class='col-md-4'> <b>Pesha: </b>" + data.pesha + " </div>" +
                    "<div class='col-md-4'> <b>Gjatesia: </b>" + data.gjatesia + " </div>" +
                    "<div class='col-md-4'> <b>Sa aktiv jeni: </b>" + data.aktiv + " </div>" +
                    "<div class='col-md-4'> <b>Sa do te stervitesh: </b>" + data.stervitje + " </div>" +
                    "<div class='col-md-4'> <b>Vendi i Stervitjes: </b>" + data.vendi_stervitjes + " </div>" +
                    "<div class='col-md-4'> <b>Sa ore sterviteni: </b>" + data.ore_stervitje + " </div>" +
                    "<div class='col-md-4'> <b>A doni te perfshini vrapin: </b>" + data.vrap + " </div>" +
                    "<div class='col-md-4'> <b>A keni probleme shendetesore: </b>" + data.p_shendetesor + " </div>" +
                    "<div class='col-md-4'> <b>Synimi mbi trupin tuaj: </b>" + data.p_synimi + " </div>" +
                    "<div class='col-md-4'> <b>Historiku shendetesor: </b>" + data.h_shendetesor + " </div>" +
                    "<div class='col-md-4'> <b>Ushqime qe nuk hani apo keni alergji: </b>" + data.alergjite + " </div>" +
                    "<div class='col-md-4'> <b>Numri i kafeve ne dite: </b>" + data.kafe + " </div>" +
                    "<div class='col-md-4'> <b>Grupi i gjakut: </b>" + data.gjaku + " </div>" +
                    "<div class='col-md-4'> <b>A keni ndjekur me pare regjim ushqimor: </b>" + data.regjim + " </div>" +
                    "<div class='col-md-4'> <b>Komente: </b>" + data.komente + " </div>" +
                    "</div>" +
                    "<div class=\"row pakete_pritje\">" +
                    "<p>Pergjigjet tuaja po procesohen. <br>" +
                    "Ju do te njoftoheni me email kur paketa te jete gati. <br> <br>" +
                    "Thank you for your payment. <br> Your transaction has been completed, and a receipt for your" +
                    "purchase has been emailed to you. <br> Log into your PayPal account to view transaction details." +
                    "</p>" +
                    "</div>" +
                    "<div class=\"row\">\n" +
                    "            <form method=\"POST\" class=\"col-md-6 koment_form\">\n" +
                    "                <input type=\"hidden\" name=\"id_personal\" value=\""+data.id_personal+"\">\n" +
                    "                <input type=\"hidden\" name=\"id_paketa\" value=\""+data.id+"\">\n" +
                    "                <label for=\"koment\">Shto koment</label>\n" +
                    "                <textarea id=\"koment\" name=\"koment\"></textarea>\n" +
                    "                <div class=\"btn btn-block shtoKoment\">Dergo</div>" +
                    "            </form>\n" +
                    "        </div></div>";
                $(".container-login100").append(append_paketa);
                shtoKoment();
            }, "json")
            .fail(function () {
                alert("Dicka shkoi gabim. Provoni perseri me vone.");
            });
    }
}

function getRU_P (idPaketa, idUser){
    if (parseInt(idPaketa) != 0) {
        $.post("../services/getPaketa.php",
            {
                userId: idUser
            },
            function (data) {
                var append_paketa = "<div class=\"wrap-login100 pakete_pritje_ru\">" +
                    "<div class=\"card_title pakete_tittle\">Regjimi Ushqimor</div>" +
                    "<div class=\"card_content row\" class=\"p_aktive\">" +
                    "<div class='col-md-4'> <b>Paketa: </b>" + data.paketa + " </div>" +
                    "<div class='col-md-4'> <b>Pesha: </b>" + data.pesha + " </div>" +
                    "<div class='col-md-4'> <b>Gjatesia: </b>" + data.gjatesia + " </div>" +
                    "<div class='col-md-4'> <b>Sa aktiv jeni: </b>" + data.aktiv + " </div>" +
                    "<div class='col-md-4'> <b>Sa do te stervitesh: </b>" + data.stervitje + " </div>" +
                    "<div class='col-md-4'> <b>Vendi i Stervitjes: </b>" + data.vendi_stervitjes + " </div>" +
                    "<div class='col-md-4'> <b>Sa ore sterviteni: </b>" + data.ore_stervitje + " </div>" +
                    "<div class='col-md-4'> <b>A doni te perfshini vrapin: </b>" + data.vrap + " </div>" +
                    "<div class='col-md-4'> <b>A keni probleme shendetesore: </b>" + data.p_shendetesor + " </div>" +
                    "<div class='col-md-4'> <b>Synimi mbi trupin tuaj: </b>" + data.p_synimi + " </div>" +
                    "<div class='col-md-4'> <b>Historiku shendetesor: </b>" + data.h_shendetesor + " </div>" +
                    "<div class='col-md-4'> <b>Ushqime qe nuk hani apo keni alergji: </b>" + data.alergjite + " </div>" +
                    "<div class='col-md-4'> <b>Numri i kafeve ne dite: </b>" + data.kafe + " </div>" +
                    "<div class='col-md-4'> <b>Grupi i gjakut: </b>" + data.gjaku + " </div>" +
                    "<div class='col-md-4'> <b>A keni ndjekur me pare regjim ushqimor: </b>" + data.regjim + " </div>" +
                    "<div class='col-md-4'> <b>Intoleranca Ushqimore: </b> <a href='../uploads/"+data.intoleranca+"'>" + data.intoleranca + "</a> </div>" +
                    "<div class='col-md-4'> <b>Komente: </b>" + data.komente + " </div>" +
                    "</div>" +
                    "<div class=\"row pakete_pritje\">" +
                    "<p>Pergjigjet tuaja po procesohen. <br>" +
                    "Ju do te njoftoheni me email kur paketa te jete gati. <br> <br>" +
                    "Thank you for your payment. <br> Your transaction has been completed, and a receipt for your" +
                    "purchase has been emailed to you. <br> Log into your PayPal account to view transaction details." +
                    "</p>" +
                    "</div>" +
                    "<div class=\"row\">\n" +
                    "            <form method=\"POST\" class=\"col-md-6 koment_form\">\n" +
                    "                <input type=\"hidden\" name=\"id_personal\" value=\""+data.id_personal+"\">\n" +
                    "                <input type=\"hidden\" name=\"id_paketa\" value=\""+data.id+"\">\n" +
                    "                <label for=\"koment\">Shto koment</label>\n" +
                    "                <textarea id=\"koment\" name=\"koment\"></textarea>\n" +
                    "                <div class=\"btn btn-block shtoKoment\">Dergo</div>" +
                    "            </form>\n" +
                    "        </div></div>";
                $(".container-login100").append(append_paketa);
                shtoKoment();
            }, "json")
            .fail(function () {
                alert("Dicka shkoi gabim. Provoni perseri me vone.");
            });
    }
}

if (new URLSearchParams(window.location.search).get('paketa_id') != null) {
    var paketa_id = new URLSearchParams(window.location.search).get('paketa_id');
    $.post("../services/getPakete.php",
        {
            id: paketa_id
        },
        function (data) {
            var append_profile = "" +
                "<div class='col-md-4 emerKlienti' id='"+data.id+"'>Emri: <i>" + data.emri + "</i> </div>" +
                "<div class='col-md-4'>Mbiemri: <i>" + data.mbiemri + "</i> </div>" +
                "<div class='col-md-4'>Email: <i>" + data.email + "</i> </div>" +
                "<div class='col-md-4'>Celular: <i>" + data.celular + "</i> </div>" +
                "<div class='col-md-4'>Gjinia: <i>" + data.gjinia + "</i> </div>" +
                "<div class='col-md-4'>Ditelindja: <i>" + data.ditelindja + "</i> </div>" +
                "<div class='col-md-4'>Data e Regjistrimit: <i>" + data.koha_regj + "</i> </div>" +
                "";
            $("#userProfile").append(append_profile);

            var payPal;
            if (data.order_id == 0)
            {
                payPal = "Pagese Cash"
            }
            else
            {
                payPal = data.order_id;
            }
            var append_paketa = "<div class=\"wrap-login100 pakete_pritje_ps\">" +
                "<div class=\"card_title pakete_tittle\">Profili i detajuar</div>" +
                "<div class=\"card_content row\" class=\"p_aktive\">" +
                "<div class='col-md-4'> <b>Paketa: </b>" + data.paketa + " </div>" +
                "<div class='col-md-4'> <b>Pesha: </b>" + data.pesha + " </div>" +
                "<div class='col-md-4'> <b>Gjatesia: </b>" + data.gjatesia + " </div>" +
                "<div class='col-md-4'> <b>Sa aktiv jeni: </b>" + data.aktiv + " </div>" +
                "<div class='col-md-4'> <b>Sa do te stervitesh: </b>" + data.stervitje + " </div>" +
                "<div class='col-md-4'> <b>Vendi i Stervitjes: </b>" + data.vendi_stervitjes + " </div>" +
                "<div class='col-md-4'> <b>Sa ore sterviteni: </b>" + data.ore_stervitje + " </div>" +
                "<div class='col-md-4'> <b>A doni te perfshini vrapin: </b>" + data.vrap + " </div>" +
                "<div class='col-md-4'> <b>A keni probleme shendetesore: </b>" + data.p_shendetesor + " </div>" +
                "<div class='col-md-4'> <b>Synimi mbi trupin tuaj: </b>" + data.p_synimi + " </div>" +
                "<div class='col-md-4'> <b>Historiku shendetesor: </b>" + data.h_shendetesor + " </div>" +
                "<div class='col-md-4'> <b>Ushqime qe nuk hani apo keni alergji: </b>" + data.alergjite + " </div>" +
                "<div class='col-md-4'> <b>Numri i kafeve ne dite: </b>" + data.kafe + " </div>" +
                "<div class='col-md-4'> <b>Grupi i gjakut: </b>" + data.gjaku + " </div>" +
                "<div class='col-md-4'> <b>A keni ndjekur me pare regjim ushqimor: </b>" + data.regjim + " </div>" +
                "<div class='col-md-4'> <b>Intoleranca Ushqimore: </b> <a href='../uploads/"+data.intoleranca+"'>" + data.intoleranca + "</a> </div>" +
                "<div class='col-md-4'> <b>Komente: </b>" + data.komente + " </div>" +
                "<div class='col-md-4'> <b>Numer Pagese: </b>" + payPal + " </div>" +
                "</div></div>";
            $("#userProfile").after(append_paketa);

            if (data.paketa=="PS" && data.PS_P != 0) {
                $("#shto_program").removeClass("hidden");
                $("#shtoPStervitor").removeClass("hidden");
            }
            else if (data.paketa == "RU" && data.RU_P != 0) {
                $("#shto_program").removeClass("hidden");
                $("#shtoRUshqimor").removeClass("hidden");
            }
            else
            {   if (data.RU_P != 0) {
                    $("#shto_program").removeClass("hidden");
                    $("#shtoRUshqimor").removeClass("hidden");
                }
                if (data.PS_P != 0){
                    $("#shto_program").removeClass("hidden");
                    $("#shtoPStervitor").removeClass("hidden");
                }


            }

        }, "json")
        .fail(function () {
            alert("Dicka shkoi gabim. Provoni perseri me vone.");
        });
}

function shtoKoment() {
    $(".shtoKoment").click(function () {
        $.post("../services/shtoKoment.php", $(this).parent().serialize(),
                function (data) {
                    location.reload();
                }, "json")
        .fail(function () {
            alert("Dicka shkoi gabim. Provoni perseri me vone.");
            });
    });
}

function terminoPS() {
    $(".term_PS").click(function () {
        console.log($(".term_PS").attr('id'));
        $.post("../services/terminoProgram.php", {
                id: $(".term_PS").attr('id'),
                paketa: "PS",
                profile_id: new URLSearchParams(window.location.search).get('profile_id')
            },
            function (data) {
                location.reload();
            }, "json")
            .fail(function () {
                alert("Dicka shkoi gabim. Provoni perseri me vone.");
            });
    })
}

function terminoRU() {
    $(".term_RU").click(function () {
        console.log($(".term_RU").attr('id'));
        $.post("../services/terminoProgram.php", {
                id: $(".term_RU").attr('id'),
                paketa: "RU",
                profile_id: new URLSearchParams(window.location.search).get('profile_id')
            },
            function (data) {
                location.reload();
            }, "json")
            .fail(function () {
                alert("Dicka shkoi gabim. Provoni perseri me vone.");
            });
    })
}





