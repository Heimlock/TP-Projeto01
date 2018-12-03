function listarReservaCliente(){
    $.ajax({    url: '/acesso/userData',
                dataType: 'json',
                error:  function (dados) {
                                alert('Erro: ' + dados.data);
                            },
                success:function ({status, data})
                {
                    cpf = data.login;
                    console.log(cpf);
                    
                    $.ajax({
                        url: `/cliente/listarReserva?CPF=${cpf}`,
                        dataType: 'json',
                        error:      function (dados) {
                                        alert('Erro: ' + dados.data);
                                    },
                        success:    function (dados){
                                        if(dados.status === 'ERRO')
                                            alert('Erro: ' + dados.data);
                                        else
                                        {
                                            console.log(dados);
                                            exibirReservaCliente(dados.data);
                                        }
                                    }
                    });
                }
    });
}

function exibirReservaCliente(reservas)
{
    var i, dataIN, dataOUT, motivoSTR, reserva;
    console.log(reservas);
    
    
    for( i = 0; i < reservas.length; i++)
    {
        reserva =   reservas[i];
        dataIN  =  ( reserva.DataEntrada.slice(0,10).slice(8,10) + '/' + reserva.DataEntrada.slice(0,10).slice(5,7) + '/' + reserva.DataEntrada.slice(0,10).slice(0,4) );
        dataOUT =  ( reserva.PrevSaida.slice(0,10).slice(8,10)   + '/' + reserva.PrevSaida.slice(0,10).slice(5,7)   + '/' + reserva.PrevSaida.slice(0,10).slice(0,4) );
        if( reserva.Motivo === 'F' )        motivoSTR = "Férias";
        else if ( reserva.Motivo === 'N' )  motivoSTR = "Negócios";
        else if ( reserva.Motivo === 'C' )  motivoSTR = "Congresso";
        else if ( reserva.Motivo === 'E' )  motivoSTR = "Estudos";
        else if ( reserva.Motivo === 'S' )  motivoSTR = "Saúde";
        else                                motivoSTR = "Outro";


        dadosReserva =  '<tr id = "'+ reserva.COD + '">' +
                        '<th>' + reserva.COD + '</th>' +
                        '<th>' + reserva.ID_Quarto + '</th>' +
                        '<th>' + dataIN + '</th>' +
                        '<th>' + dataOUT + '</th>' +
                        '<th>' + motivoSTR + '</th>' +
                        `<th><a data-toggle="modal" data-target="#info-modal" onClick="getReservaData(${reserva.COD}, fillFormReserva)">Info</a></th>` +
                        '</tr>';
            
        document.getElementById('result').innerHTML += dadosReserva;
    }
}