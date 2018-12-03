function reservaQuarto(){   
    var id = document.getElementById("id");

    window.sessionStorage.setItem('id_quarto', id);

    getUserdata(
        function ({status, data}){
            cpf = data[0].login;
            $.ajax({
                url: '/reservas/recuperaInfoReserva?Cpf=${cpf}`',
                dataType: 'json',
                error:      function (dados) {
                                alert('Erro: ' + dados.data);
                            },
                success:    function (dados){
                                if(dados.status === 'ERRO')
                                    alert('Erro: ' + dados.data);
                                else
                                    efetuarReserva(dados.data);
                            }
            });
        }
    );
}

function efetuarReserva(dados_reserva){
    var input = {
        ID_Cliente = dados_reserva.ID,
        ID_Quarto = window.sessionStorage.getItem('id_quarto'),
        DataEntrada = window.sessionStorage.getItem('checkin'),
        PrevSaida = window.sessionStorage.getItem('checkout'),
        Motivo = dados_reserva.Motivo
    }

    $.ajax({
        url:    'reservas/insereReserva',
        type:   'post',
        data:   input,
        error:  function (dados) {
                    alert('Erro: ' + dados.data);
                },
                success: function (dados) {
                    if (dados.status === 'ERROR')
                        alert('Erro: ' + dados.data);
                    else
                    {
                        alert(dados.data);
                        window.location.reload();
                    }    
                }
    });
}


function salvarSessao(){
    window.sessionStorage.clear();
    
    var entrada =   document.periodo.start.value;
    var saida   =   document.periodo.end.value;

    window.sessionStorage.setItem('checkin', entrada);
    window.sessionStorage.setItem('checkout', saida);

   window.location.href = '../quartos_disponiveis.html';
}

function listarQuartos(){
    var entrada = window.sessionStorage.getItem('checkin');
    var saida   = window.sessionStorage.getItem('checkout');

    var input = {
        dataIN: entrada,
        dataOUT: saida
    }

    $.ajax({
        url: '/reservas/listarQuarto',
        dataType: 'json',
        data: input,
        error:      function (dados) {
                        alert('Erro: ' + dados.data);
                    },
        success:    function (dados){
                        if(dados.status === 'ERRO')
                            alert('Erro: ' + dados.data);
                        else
                            exibirQuartos(dados.data);
                    }
    });
}

function exibirQuartos(listaQuartos){

    for(var i = 0; i < listaQuartos.length; i++){
        criarCard(listaQuartos[i]);
    }
}

function criarCard(quarto){
    var dadosQuarto =   '<div class = "row">' +
                            '<div class = "col-md-5 col-md-offset-1 col-sm-6 col-xs-12">' +
                                '<div class = "promo-box">' +
                                    '<figure class = "image"> <img src = ' + quarto.Imagem + '></figure>'
                                    '<br> <id = "' + quarto.ID + '">' + 
                                    '<br> Titulo: ' + quarto.Titulo +
                                    '<br> Descriçao: ' + quarto.Descricao
                                    '<br> Preços: ' + quarto.Preço +
                                    '<br>'
                                    '<button type = "button" class = "btn btn-primary" onClick = "reservaQuarto();">Reservar</button>'
                                '</div' +
                            '</div>' +
                        '</div>';
    
    document.getElementById('resultado_quartos').innerHTML += dadosQuarto;
}