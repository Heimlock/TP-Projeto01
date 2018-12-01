
// COD, ID_Cliente, ID_Quarto, qntCamas, DataEntrada, PrevSaida, Motivo

function exibeReservas(reservas)
{
    var reserva, cliente, cpfSTR, cpf, dataIN, dataOUT, motivoSTR, dadosReserva;
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
                cliente =   clientes[innerSearch(reserva.ID_Cliente, clientes)];
                cpf     =   cliente.Cpf;
                cpfSTR  =  ( cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9,11) );
                dataIN  =  ( reserva.DataEntrada.slice(0,10).slice(8,10) + '/' + reserva.DataEntrada.slice(0,10).slice(5,7) + '/' + reserva.DataEntrada.slice(0,10).slice(0,4) );
                dataOUT =  ( reserva.PrevSaida.slice(0,10).slice(8,10)   + '/' + reserva.PrevSaida.slice(0,10).slice(5,7)   + '/' + reserva.PrevSaida.slice(0,10).slice(0,4) );

                if( reserva.Motivo === 'F' )        motivoSTR = "Férias";
                else if ( reserva.Motivo === 'N' )  motivoSTR = "Negócios";
                else if ( reserva.Motivo === 'C' )  motivoSTR = "Congresso";
                else if ( reserva.Motivo === 'E' )  motivoSTR = "Estudos";
                else if ( reserva.Motivo === 'S' )  motivoSTR = "Saúde";
                else                                motivoSTR = "Outro";

                dadosReserva =  `<tr id="${reserva.COD}">`          +
                                `<td>${reserva.COD}</td>`           +
                                `<td>${cliente.Nome}</td>`          +
                                `<td>${cpfSTR}</td>`                +
                                `<td>${reserva.ID_Quarto}</td>`     +
                                `<td>${dataIN}</td>`                +
                                `<td>${dataOUT}</td>`               +
                                `<td>${reserva.qntCamas}</td>`      +
                                `<td>${motivoSTR}</td>`             +
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
    // COD, ID_Cliente, Cpf, NomeCliente, ID_Quarto, Titulo, qntCamas, DataEntrada, PrevSaida, Motivo
    var form        =   document.formReserva,
        motivoSTR;
    const   { COD, ID_Cliente, Cpf, NomeCliente, ID_Quarto, Titulo,
              qntCamas, DataEntrada, PrevSaida, Motivo }    =  data[0];


    // Férias Negócios Congresso Estudos Saúde Outro
    if( Motivo  === 'F' )       motivoSTR = "Férias";
    else if ( Motivo === 'N' )  motivoSTR = "Negócios";
    else if ( Motivo === 'C' )  motivoSTR = "Congresso";
    else if ( Motivo === 'E' )  motivoSTR = "Estudos";
    else if ( Motivo === 'S' )  motivoSTR = "Saúde";
    else                        motivoSTR = "Outro";

    form.nome.value     =   NomeCliente;
    form.cpf.value      =   Cpf;
    form.numQuarto.value=   ( (ID_Quarto < 10) ? ('0' + ID_Quarto) : (ID_Quarto) );
    form.titulo.value   =   Titulo;
    form.qntCamas.value =   qntCamas;
    form.dataIN.value   =   DataEntrada.slice(0,10);
    form.dataOUT.value  =   PrevSaida.slice(0,10);
    form.motivo.value   =   motivoSTR;
    calculaCusto(Cpf,
      function({status, data})
      {
        form.preco.value   =   ((data[0].Custo > 0) ? (data[0].Custo) : ("0000"));
      }
    );
}

function    calculaCusto( CPF, callback )
{
  $.ajax({
      url: `/reservas/custoEstadia?CPF=${CPF}`,
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
