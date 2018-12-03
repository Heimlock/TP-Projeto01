function listarReservaCliente(){
    getUserdata(
        function ({status, data}){
            cpf = data[0].login;
            $.ajax({
                url: '/cliente/listarReserva',
                dataType: 'json',
                data: input,
                error:      function (dados) {
                                alert('Erro: ' + dados.data);
                            },
                success:    function (dados){
                                if(dados.status === 'ERRO')
                                    alert('Erro: ' + dados.data);
                                else
                                    exibirReservaCliente(dados.data);
                            }
            });
        }
    );
}

function exibirReservaCliente(reservas){
    for(var i = 0; i < reservas.length; i++){
        tabelaReservas(reservas[i]);
    }
}

function tabelaReservas(reserva){
    dataIN  =  ( reserva.DataEntrada.slice(0,10).slice(8,10) + '/' + reserva.DataEntrada.slice(0,10).slice(5,7) + '/' + reserva.DataEntrada.slice(0,10).slice(0,4) );
    dataOUT =  ( reserva.PrevSaida.slice(0,10).slice(8,10)   + '/' + reserva.PrevSaida.slice(0,10).slice(5,7)   + '/' + reserva.PrevSaida.slice(0,10).slice(0,4) );
        
    var dadosReserva =  '<tr id = "'+ reserva.COD + '">' +
                            '<th>' + reserva.COD + '</th>' +
                            '<th>' + reserva.ID_Quarto + '</th>' +
                            '<th>' + dataIN + '</th>' +
                            '<th>' + dataOUT + '</th>' +
                            '<th>' + reserva.QntCamas +'</th>' +
                            '<th>' + reserva.Motivo + '</th>' +
                            `<a data-toggle="modal" data-target="#info-modal" onClick="getReservaData(${reserva.COD}, fillFormReserva)">Info</a>` +
                         '</tr>'
        
    document.getElementById('resultado').innerHTML += dadosReserva;
}