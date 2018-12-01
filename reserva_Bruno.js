function reservarQuarto(){   
    var id = document.getElementById("id");

    window.sessionStorage.setItem('id_quarto', id);

    /*if(verificaStatus())
        efetuarReserva();
    else
        window.location.href = '../login.html';*/
}

function efetuarReserva(){
    var input = {
        ID_Cliente = window.sessionStorage.getItem('id_cliente'),
        ID_Quarto = window.sessionStorage.getItem('id_quarto'),
        DataEntrada = window.sessionStorage.getItem('checkin'),
        PrevSaida = window.sessionStorage.getItem('checkout'),
        Motivo = window.sessionStorage.getItem('motivo_viagem')
    }

    $.ajax({
        url:    'reserva/insere',
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

   //window.location.href = '../quartos_disponiveis.html';
}

function verificaStatus( callback )
{
    $.ajax({
        url: '/acesso/status',
        dataType: 'json',
        error:  function (dados){
                    alert('Erro: ' + dados.data);
                    callback(dados);
                    //return false;
                },
                success:function (dados) {
                    callback(dados);
                    //return true;
                }
    });
}

function listarQuartos(){
    var entrada = window.sessionStorage.getItem('checkin');
    var saida   = window.sessionStorage.getItem('checkout');

    var input = {
        dataIN: entrada,
        dataOUT: saida
    }

    $.ajax({
        url: '/reserva/listarQuarto',
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
                                    '<br> <id = "id"> Codigo do Quarto: ' + quarto.ID + 
                                    '<br> Titulo: ' + quarto.Titulo +
                                    '<br> Descriçao: ' + quarto.Descricao
                                    '<br> Preços: ' + quarto.Preço +
                                    '<br>'
                                    '<button type = "button" class = "btn btn-primary" onClick = "reservarQuarto();">Reservar</button>'
                                '</div' +
                            '</div>' +
                        '</div>';
    
    document.getElementById('resultado_quartos').innerHTML += dadosQuarto;
}