
(function ($) {
    "use strict";

    $('.signUp').hide();
    
    /*==================================================================
    [ Validate ]*/
    var input = $('.logIn .input100');

    $('#logIn').click(function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }
        if (check == true)
        {
            console.log("Log In");
            $.post("services/logIn.php",
                {
                    email: $("input[name=log_email]").val(),
                    pass: $("input[name=log_pass]").val()
                }, function(data) {
                    console.log(data);
                    if (data.success === "true") {
                        if (data.admin === "true") {
                            window.location.href = "pages/a-dashboard.html"
                        } 
                        else if (data.trainer === "true") {
                            window.location.href = "pages/t-dashboard.html"
                        }
                        else {
                            window.location.href = "pages/dashboard.html?profile_id=" + data.id;
                        }
                    }
                    else {
                        alert("Kredenciale te gabuara." );
                    }
                }, "json")
                .fail(function() {
                    alert("Dicka shkoi gabim. Provoni perseri me vone." );
                })
                .always(function() {

                });
        }
        return check;
    });


    $('.logIn .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    var inputR = $('.signUp .input100');

    $("#signUp").click(function(){
        var check = true;

        for(var i=0; i<inputR.length; i++) {
            if(validate(inputR[i]) == false){
                showValidate(inputR[i]);
                check=false;
            }
        }

        if($("input[name=pass]").val() !== $("input[name=pass_r]").val())
        {
            showValidate(inputR[inputR.length-1]);
            check=false;
        }

        if (check == true)
        {
            $.post("services/signUp.php",  $(".signUp").serialize(), function(data) {
                console.log(data.status);
                if (data.status == "0")
                {
                    alert("Kjo adrese emaili ka nje llogari aktive.");
                }
                else if (data.status == "1")
                {
                    window.location.href = "pages/dashboard.html?profile_id=" + data.id;
                }
                else
                {
                    alert("Dicka shkoi gabim. Provoni perseri me vone.");
                }
            }, "json")
                .done()
                .fail(function() {
                    alert("Dicka shkoi gabim. Provoni perseri me vone.");
                })
                .always(function() {

                });
        }

        return check;
    });

    $('.signUp .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    var inputP = $('#ChangePassword .input100');

    $('#ndryshoPass').click(function(){
        var check = true;

        for(var i=0; i<inputP.length; i++) {
            if(validate(inputP[i]) == false){
                showValidate(inputP[i]);
                check=false;
            }
        }

        if($("input[name=p_ri]").val() !== $("input[name=p_r_ri]").val())
        {
            showValidate(inputP[inputP.length-1]);
            check=false;
        }

        if (check == true)
        {
            console.log("Log In");
            $.post("../services/changePass.php",
                {
                    id: new URLSearchParams(window.location.search).get('profile_id'),
                    pass_ri: $("input[name=p_ri]").val(),
                    pass_vjeter: $("input[name=p_vjeter]").val()
                }, function(data) {
                    if(data.status=="false")
                    {
                        alert(data.error);
                    }
                    else {location.reload();}
                    console.log(data);
                }, "json")
                .fail(function() {
                    alert("Dicka shkoi gabim. Provoni perseri me vone." );
                })
                .always(function() {

                });
        }
    });

    $('#ChangePassword .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });


    var inputA = $('.apliko .validate-input .input100');

    $( '#bliPakete' )
        .submit(function(e){
        var check = true;

        for(var i=0; i<inputA.length; i++) {
            if(validate(inputA[i]) == false){
                showValidate(inputA[i]);
                check=false;
            }
        }
        if (check == true)
        {  document.querySelector("#order_id").value = 0;
            document.querySelector("#profile_id").value = new URLSearchParams(window.location.search).get('profile_id');
            var send_data = new FormData( this );
           // send_data.append("id", new URLSearchParams(window.location.search).get('profile_id'));
                e.preventDefault();
                $.ajax( {
                url: '../services/bliPaketen.php',
                type: 'POST',
                data: send_data,
                processData: false,
                contentType: false,
                    dataType : 'json',
                success: function(data) {
                    console.log(data.status);
                        if (data.status == "true" && !$(".z_pakete").hasClass("hidden")) {
                            $(".pa_program").hide();
                            $(".bli_pakete").append("<p>Pergjigjet tuaja po procesohen. " +
                                "<br> " +
                                "Ju do te njoftoheni me email kur paketa te jete gati.</p>")
                            $('#Apliko').modal('toggle');
                            if ($("input[name=paketa]:checked").val() == "PS") {
                                $("#prog_shtese").removeClass("hidden");
                                $("#bli_RU").removeClass("hidden");
                            }
                            else if ($("input[name=paketa]:checked").val() == "RU") {
                                $("#prog_shtese").removeClass("hidden");
                                $("#bli_PS").removeClass("hidden");
                            }
                        }
                        else if ($(".z_pakete").hasClass("hidden")) {
                            $('#Apliko').modal('toggle');
                            $("#prog_shtese").addClass("hidden");
                        }
                        else {
                            alert("Dicka shkoi gabim. Provoni perseri me vone!");
                        }
                    location.reload();
                    }
                 } )
        }
        return check;
    });
    $('.apliko .input100').each(function(){
        $(this).focus(function(){
            hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }

})(jQuery);