import Lead from './lib/lead.js';
$(document).ready(function () {
    var t1 = Date.now();
    var url = window.location.href;
    $('#subscribe').submit(function (e) {
        e.preventDefault();
        let input1 = $("#user_name").val();
        let input2 = $("#user_email").val();
        if (input1 == "" || input2 == "") {
            $("#warning").html("Parece que há um ou mais campos em branco. Por favor, tente novamente");
        } else {
            var t2 = Date.now();
            var time_elapsed = Math.round((t2 - t1) / 1000);
            if (time_elapsed > 59) {
                time_elapsed = time_elapsed / 60 + "m";
            } else {
                time_elapsed += "s";
            }
            $("#submit").html("<img src='https://cdn.palmilhando.com.br/media/img/loading.gif'>");
            $("#warning").html("");
            var user_data = new Lead(input1, input2, "ptcn/out23", time_elapsed);
            $.ajax({
                type: 'POST',
                url: 'cadastro.php',
                data: user_data,
                success: function () {
                    $.ajax({
                        type: 'POST',
                        url: 'mail.php',
                        data: {
                            'user_email': user_data.user_info.email,
                            'user_name': user_data.user_info.nome
                        },
                        success: function () {
                            $("#submit").html("QUERO GARANTIR A MINHA INSCRIÇÃO");
                            document.location = "obrigado";
                        }
                    });
                }
            });
        }
    });
});