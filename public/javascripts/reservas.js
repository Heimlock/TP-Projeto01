
// COD, ID_Cliente, ID_Quarto, DataEntrada, PrevSaida, Motivo

function exibeReservas(reservas)
{
    var reserva, cpfSTR, cpf, dataIN, dataOUT, dadosReserva;
    document.getElementById('result').innerHTML =   "";

    function innerSearch( id, clientes )
    {
        var i;
        for( i = 0; i < clientes.length; i++ )
            if( clientes[i].ID == id ) return i;
        return -1;
    }
    listarCliente( 
        function ( clientes )
        {
            for (var i = 0; i < reservas.length; i++)
            {
                reserva =   reservas[i];
                // console.log(`Cliente[${i}] = ` + clientes[innerSearch(reserva.ID_Cliente, clientes)].Cpf );
                cpf     =   clientes[innerSearch(reserva.ID_Cliente, clientes)].Cpf;
                cpfSTR  =  ( cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9,11) );
                // COD, ID_Cliente, ID_Quarto, DataEntrada, PrevSaida, Motivo
                dataIN  =  ( reserva.DataEntrada.slice(0,10).slice(8,10) + '/' + reserva.DataEntrada.slice(0,10).slice(5,7) + '/' + reserva.DataEntrada.slice(0,10).slice(0,4) );
                dataOUT =  ( reserva.PrevSaida.slice(0,10).slice(8,10)   + '/' + reserva.PrevSaida.slice(0,10).slice(5,7)   + '/' + reserva.PrevSaida.slice(0,10).slice(0,4) );
                dadosReserva =  `<tr id="${reserva.COD}">`          +
                                `<td>${reserva.COD}</td>`           +
                                `<td>${cpfSTR}</td>`    +
                                `<td>${reserva.ID_Quarto}</td>`     +
                                `<td>${dataIN}</td>`                +
                                `<td>${dataOUT}</td>`               +
                                `<td>${reserva.Motivo}</td>`        +
                                `<td>`      + 
                                `<a data-toggle="modal" data-target="#info-modal" onClick="getReservaData(${reserva.COD}, fillFormReserva)">Info</a>` +
                                `</td>`     +
                                `</tr>`;
                document.getElementById('result').innerHTML += dadosReserva;
            }
        }
     );
}

function    listarReservas( callback )
{
    $(document).ready(function () {
        $.ajax({    
            url: '/reservas/lista',
            dataType: 'json',
            error: function (dados) {
                    alert('Erro: ' + dados.data);
                    },
            success: function (dados) {
                if (dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                else
                    if (dados.status === 'SEMACESSO')
                    {
                        alert('Erro: ' + dados.data);
                        window.location.href = '/login.html';
                    }
                    else
                    {
                        callback(dados.data);
                    }
            }
        });
    });
}

function    getReservaData( COD, callback )
{
    $.ajax({
        url: `/reservas/listaReserva?COD=${COD}`,
        dataType:"json",
        error: function (dados) {
                                    alert('Erro: ' + dados.data);
                                },
        success: function (dados) {
                                    if (dados.status === 'ERRO')
                                        alert('Erro: ' + dados.data);
                                    else
                                    callback(dados);
                                    }
    });
}

function    fillFormReserva( {status, data} )
{
    console.log(data);
}

//  Disponibilidade
function    verifDisp()
{
    var form    =   document.formConsultaEstadia;
    var input   =   {   dataIN:     form.dataIN.value,
                        dataOUT:    form.dataOUT.value
                    };
    $.ajax({
        url: '/reservas/listaDisp',
        type: 'post',
        data: input,
        error: function (dados) {
                    console.log("Erro: " + dados);
                    alert('Erro0: ' + dados.data);
                },
        success: function (dados) {
                if (dados.status === 'ERRO')
                {    
                    console.log("Sucesso Erro: " + dados);
                    alert('Erro: ' + dados.data);
                }
                else
                {
                    // alert(dados.data);
                    exibeCamas(dados.data);
                    console.log(dados.data);
                }
        }
    });
}

function    verifReserva( ID, callback )
{
    $.ajax({    
        url: '/cliente/listaCliente?id=' + id,
        dataType: 'json',
        type: 'post',
        error: function (dados) {
                alert('Erro: ' + dados.data);
                },
        success: function (dados) 
            {
                if(dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                callback(dados);
            }
        });
}
