
// COD, ID_Cliente, ID_Quarto, qntCamas, DataEntrada, PrevSaida, Motivo

function    exibeReservas(reservas)
{
    var reserva, cliente, cpfSTR, cpf, dataIN, dataOUT, motivoSTR, dadosReserva;
    document.getElementById('result').innerHTML =   "";
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
                        window.location.href = '../index.html';
                    }
                    else
                    {
                        callback(dados.data);
                    }
            }
        });
    });
}

function    listarReservasAtivas( callback )
{
    $(document).ready(function () {
        $.ajax({
            url: '/reservas/listaReservasAtivas',
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
                        window.location.href = '../index.html';
                    }
                    else
                    {
                        // console.log(dados);
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
    var form              =   document.formReserva,
        btnfillInvoice    =   document.getElementById("finalizarReserva"),
        motivoSTR, custo;
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
    form.qntCamas.value =   ( (qntCamas < 10) ? ('0' + qntCamas) : (qntCamas) );
    form.dataIN.value   =   DataEntrada.slice(0,10);
    form.dataOUT.value  =   PrevSaida.slice(0,10);
    form.motivo.value   =   motivoSTR;
    calculaCusto(Cpf,
      function({status, data})
      {
        custo   = data[0].Custo;
        if( custo == 0 )
        {
          custo     =   "0000";
        }
        else if( (custo.toString().length == 2) || (custo.toString().length == 3))
        {
            custo   =   custo.toString()    +   ".00";
        }
        else if( (custo.toString().length == 4 & custo < 100) || (custo.toString().length == 5 & custo > 100) )
        {
            custo   =   custo.toString()    +   "0";
        }
        form.preco.value   =   custo;
      }
    );
    btnfillInvoice.href = './fecharReserva.html?id='+COD;
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

function    fillQuartos()
{
    var   form           = document.formReserva,
          quarto,
          i;

    if( arguments.length == 0 )
    {
      document.getElementById('numQuarto').innerHTML  =   '<option value="-1" selected="">Nenhum</option>';
      document.formReserva.titulo.value               =   '';
    }
    else
    {
        var {status, data} = arguments[0];
        if(data.length != 0)
        {
          document.getElementById('numQuarto').innerHTML =   "";
          for( i=0; i < data.length; i++ )
          {
            quarto    = data[i];
            document.getElementById('numQuarto').innerHTML += `<option value="${data[i].ID}">$${data[i].Preco} - ${data[i].Titulo}</option>`;
          }
        }
        else
        {
          document.getElementById('numQuarto').innerHTML  =   '<option value="-1" selected="">Nenhum</option>';
          document.formReserva.titulo.value               =   '';
        }
    }
}

function    fillQuartoData()
{
  var   numQuarto = document.getElementById("numQuarto");
  if( numQuarto.value > 0 )
  {
    getRoomData( numQuarto.value,
      function ({status, data})
      {
        document.formReserva.titulo.value = data[0].Titulo;
      }
    )
  }
}

function    fillSelectReservas(reservas)
{
    var   reserva, cliente, i;
    listarCliente(
        function ( clientes )
        {
            if( reservas.length == 0 ) return;
            document.getElementById('reservas').innerHTML  = "";
            for (var i = 0; i < reservas.length; i++)
            {
                reserva =   reservas[i];
                cliente =   clientes[innerSearch(reserva.ID_Cliente, clientes)];
                cpf     =   cliente.Cpf;
                cpfSTR  =  ( cpf.slice(0,3) + '.' + cpf.slice(3,6) + '.' + cpf.slice(6,9) + '-' + cpf.slice(9,11) );
                document.getElementById('reservas').innerHTML  += `<option value='${reserva.COD}'>#${reserva.COD} - ${cpfSTR} x ${reserva.qntCamas}</option>`;
            }
        });
}

function    prevCusto()
{
    //  qntCamas dataIN dataOUT ID_Quarto
    var form    =   document.formReserva,
        input   =   { ID_Quarto:  document.getElementById("numQuarto").value,
                      qntCamas:   form.qntCamas.value,
                      dataIN:     form.dataIN.value,
                      dataOUT:    form.dataOUT.value
                    },
        custo;
        $.ajax({
            url: '/reservas/prevCusto',
            type: 'post',
            data: input,
            error: function (dados) {
                        console.log("Erro: " + dados.data);
                        alert('Erro: ' + dados.data);
                    },
            success: function ({status, data}) {
                    if (status === 'ERRO')
                    {
                        alert('Erro: ' + data);
                    }
                    else
                    {
                      // console.log(data);
                      custo   = data[0].Custo;
                      if( custo == 0 )
                      {
                        custo     =   "0000";
                      }
                      else if( (custo.toString().length == 2) || (custo.toString().length == 3))
                      {
                          custo   =   custo.toString()    +   ".00";
                      }
                      else if( (custo.toString().length == 4 & custo < 100) || (custo.toString().length == 5 & custo > 100) )
                      {
                          custo   =   custo.toString()    +   "0";
                      }
                      form.preco.value   =   custo;
                      document.formReserva.preco.value  = custo;
                    }
            }
        });
}

function    findCliente( id )
{
  var form    =   document.formReserva,
      nome    =   form.nome,
      cpf     =   form.cpf,
      input   =   {id:"null", key:"null"};

    input.id  = id;
    if( id === "nome" )     //  Achar pelo Nome
      input.key   = nome.value;
    else if( id === "cpf" ) //  Achar pelo CPF
      input.key   = ( cpf.value.slice(0,3) + cpf.value.slice(4,7) + cpf.value.slice(8,11) + cpf.value.slice(12,14) );

      $.ajax({
          url: '/reservas/findCliente',
          type: 'post',
          data: input,
          error: function (dados) {
                      console.log("Erro: " + dados);
                      alert('Erro: ' + dados.data);
                  },
          success: function ({status, data}) {
                  if (status === 'ERRO')
                  {
                      alert('Erro: ' + data);
                  }
                  else
                  {
                    if( id === "nome" )     //  Achar pelo Nome
                    {
                      cpf.value = data[0].Cpf;
                    }
                    else if( id === "cpf" ) //  Achar pelo CPF
                    {
                      nome.value = data[0].Nome;
                    }
                  }
          }
      });
}

function    findReserva( id )
{
  var form      =   document.formReserva,
      reservas  =   form.reservas,
      cpf       =   form.cpf,
      input     =   {id:"null", key:"null"},
      i;

    input.id  = id;
    if( id === "reservas" )     //  Achar pelo Select
      input.key   = reservas.value;
    else if( id === "cpf" ) //  Achar pelo CPF
      input.key   = ( cpf.value.slice(0,3) + cpf.value.slice(4,7) + cpf.value.slice(8,11) + cpf.value.slice(12,14) );

      $.ajax({
          url: '/reservas/findReserva',
          type: 'post',
          data: input,
          error: function (dados) {
                      console.log("Erro: " + dados);
                      alert('Erro: ' + dados.data);
                  },
          success: function ({status, data}) {
                  if (status === 'ERRO')
                  {
                      alert('Erro: ' + data);
                  }
                  else
                  {
                    if( id === "reservas" )     //  Achar pelo Reservas
                    {
                      console.log(data[0].Cpf);
                      cpf.value = data[0].Cpf;
                    }
                    else if( id === "cpf" ) //  Achar pelo CPF
                    {
                      document.getElementById('reservas').value = data[0].COD;
                    }
                  }
          }
      });
}

function    novaReserva()
{
  var   form  = document.formReserva,
        input   =   {   ID_Cliente:   -1,
                        ID_Quarto:    form.numQuarto.value,
                        qntCamas:     form.qntCamas.value,
                        DataEntrada:  form.dataIN.value,
                        PrevSaida:    form.dataOUT.value,
                        Motivo:       form.motivo.value
                    };
  getClientExists(
    ( form.cpf.value.slice(0,3) + form.cpf.value.slice(4,7) + form.cpf.value.slice(8,11) + form.cpf.value.slice(12,14) ),
    function( {status, data} )
    {
      input.ID_Cliente  = data[0].ID;
      // console.log(input);
      $.ajax({
          url: '/reservas/novaReserva',
          type: 'post',
          data: input,
          error: function (dados) {
                                      alert('0Erro: ' + dados.data);
                                  },
          success: function (dados) {
                                      if (dados.status === 'ERROR')
                                          alert('1Erro: ' + dados.data);
                                      else
                                      {
                                          alert(dados.data);
                                          window.location.href = "./listarReservas.html";
                                      }
                                    }
      });
    }
  )
}

function    fecharReserva( cod )
{
  $.ajax({
      url: '/reservas/fecharReserva?COD=' + cod,
      dataType: 'json',
      type: 'post',
      error: function (dados) {
              alert('Erro: ' + dados.data);
              },
      success: function (dados)
          {
              if(dados.status === 'ERRO')
              {
                console.log(dados);
                alert('Erro: ' + dados.data);
              }
              else
              {
                  console.log(dados);
                  alert(dados.data);
                  window.location.href = './listarReservas.html';
              }
          }
      });
}

function    fillInvoice()
{
    var   COD,
          dataHoje      = document.getElementById('dataHoje'),
          clienteData   = document.getElementById('clienteData'),
          idReserva     = document.getElementById('idReserva'),
          itens         = document.getElementById('itens'),
          subtotal      = document.getElementById('subtotal'),
          taxaAdm       = document.getElementById('taxaAdm'),
          total         = document.getElementById('total'),
          linkPrint     = document.getElementById('linkPrint'),
          btnfecharRes  = document.getElementById('btnFecharReserva'),
          dataVenc      = document.getElementsByClassName('dataVenc');
    var   cpf, cep, telefone,
          dataIN, dataOUT,
          valorTaxa, valorTotal,
          taxaSTR, totalSTR, hojeSTR,
          vencBoleto, i;
    var   reserva, cliente, custo, dias;
    var   urlParams = new URLSearchParams(window.location.search);

    if( urlParams.has('id') )
    {
        COD =  urlParams.get('id');
        console.log(COD);
    }
    else
    {
      COD         = document.formReserva.reservas.value;
      if( COD == -1 )
      {
        alert("Erro: Selecione uma Reserva");
        return;
      }
      document.getElementById('invoice').style = "";
    }

      getReservaData(
        COD,
        function( {status, data} )
        {
          reserva   =   data[0];
          getClientData(
            reserva.ID_Cliente,
            function( {status, data} )
            {
              cliente   =   data[0];
              calculaCusto(
                cliente.Cpf,
                function( {status, data} )
                {
                  custo   = data[0].Custo;
                  dias    = data[0].Dias;
                  //  PreSets
                  cpf         =   ( cliente.Cpf.slice(0,3) + '.' + cliente.Cpf.slice(3,6) + '.' + cliente.Cpf.slice(6,9) + '-' + cliente.Cpf.slice(9,11) );
                  cep         =   ( cliente.Cep.toString().slice(0,5) + '-' + cliente.Cep.toString().slice(5,8) );
                  telefone    =   ( '(' + cliente.Telefone.slice(0,2) + ') ' + cliente.Telefone.slice(2,6) + '.' + cliente.Telefone.slice(6,9));
                  dataIN      =   ( data[0].Entrada.slice(0,10).slice(8,10) + '/' + data[0].Entrada.slice(0,10).slice(5,7) + '/' + data[0].Entrada.slice(0,10).slice(0,4) );
                  dataOUT     =   ( data[0].Saida.slice(0,10).slice(8,10) + '/' + data[0].Saida.slice(0,10).slice(5,7) + '/' + data[0].Saida.slice(0,10).slice(0,4) );
                  hojeSTR     =   ( moment().format().slice(0,10).slice(8,10)   + '/' + moment().format().slice(0,10).slice(5,7)   + '/' + moment().format().slice(0,10).slice(0,4) );
                  // custo       =   parseFloat(custo).toFixed(2);
                  valorTaxa   =   (custo/100)*10;
                  taxaSTR     =   parseFloat(valorTaxa).toFixed(2);
                  valorTotal  =   (valorTaxa + custo);
                  totalSTR    =   parseFloat(valorTotal).toFixed(2);
                  vencBoleto  = ( moment().add(7, 'days').format().slice(0,10).slice(8,10)   + '/' + moment().add(7, 'days').format().slice(0,10).slice(5,7)   + '/' + moment().add(7, 'days').format().slice(0,10).slice(0,4) )
                  //  Fill
                  dataHoje.innerHTML    = hojeSTR;
                  clienteData.innerHTML = `<strong>${cliente.Nome}</strong><br>`            +
                                          `CPF: ${cpf}<br>`                                 +
                                          `${cliente.Endereco}<br>`                         +
                                          `${cliente.Cidade}, ${cliente.Estado} ${cep}<br>` +
                                          `Telefone: ${telefone}<br>`                       +
                                          `Email: ${cliente.Email}`;
                  idReserva.innerHTML   = '#' + reserva.COD;
                  itens.innerHTML       = `<tr>`                    +
                                          `  <td>${dias}</td>`              +
                                          `  <td>${reserva.qntCamas}</td>`  +
                                          `  <td>${reserva.ID_Quarto}</td>` +
                                          `  <td>${reserva.Titulo}</td>`    +
                                          `  <td>${dataIN}</td>`            +
                                          `  <td>${dataOUT}</td>`           +
                                          `  <td>$${custo}</td>`            +
                                          `</tr>`;
                  subtotal.innerHTML    = '$' + custo;
                  taxaAdm.innerHTML     = '$' + taxaSTR;
                  total.innerHTML       = '$' + totalSTR;
                  dataVenc[0].innerHTML = vencBoleto;
                  dataVenc[1].innerHTML = vencBoleto;

                  if( !urlParams.has('id') )
                  {
                    linkPrint.href        = './invoice-print.html?id=' + reserva.COD;
                    btnfecharRes.onclick = function(){fecharReserva(reserva.COD)};
                  }
                  else if( window.location.includes('invoice-print')  )
                    window.print();
                }
              );
            }
          );
        }
      );
}

//  Disponibilidade
function    verifDisp()
{
    var form    =   document.formConsultaEstadia;
    var input   =   {   dataIN:     form.dataIN.value,
                        dataOUT:    form.dataOUT.value
                    };

    if( dataOUT < dataIN ) callback();

    $.ajax({
        url: '/reservas/listaDisp',
        type: 'post',
        data: input,
        error: function (dados) {
                    console.log("Erro: " + dados);
                    alert('Erro: ' + dados.data);
                },
        success: function (dados) {
                if (dados.status === 'ERRO')
                {
                    // console.log("Erro: " + dados);
                    alert('Erro: ' + dados.data);
                }
                else
                {
                    // alert(dados.data);
                    exibeCamas(dados.data);
                    // console.log(dados.data);
                }
        }
    });
}

function    consultaDisp( callback )
{
  var form    =   document.formReserva;
  var input   =   {   dataIN:     form.dataIN.value,
                      dataOUT:    form.dataOUT.value
                  };
  if( input.dataOUT < input.dataIN )
  {
    callback();
    return;
  }

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
                callback(dados);
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

function    innerSearch( id, clientes )
{
    var i;
    for( i = 0; i < clientes.length; i++ )
        if( clientes[i].ID == id ) return i;
    return -1;
}
