
function salvarSessao()
{
    window.sessionStorage.clear();

    var entrada =   document.getElementById('start-date').value;
    var saida   =   document.getElementById('end-date').value;

    console.log(entrada);
    console.log(saida);
    window.sessionStorage.setItem('checkin', entrada);
    window.sessionStorage.setItem('checkout', saida);

   window.location.href = './quartos_disponiveis.html';
}

function listarQuartos()
{
    var entrada = window.sessionStorage.getItem('checkin'),
        saida   = window.sessionStorage.getItem('checkout');

    var input   =   {   dataIN:     `${entrada.slice(6,10)}-${entrada.slice(0,2)}-${entrada.slice(3,5)}`,
                        dataOUT:    `${saida.slice(6,10)}-${saida.slice(0,2)}-${saida.slice(3,5)}`
                    };

    // console.log(input);
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
                    console.log("Sucesso Erro: " + dados);
                    alert('Erro: ' + dados.data);
                }
                else
                  exibirQuartos(dados.data);
        }
    });
}

function exibirQuartos(quartos)
{
    var quarto, preco;
    document.getElementById('result').innerHTML = "";

    for (var i = 0; i <  quartos.length; i++)
    {
        quarto  = quartos[i];
        preco   = parseFloat(quarto.Preco).toFixed(2);
         if (i%2 === 0)
         {
            dadosQuarto =   '<div class="row"></div>'+
                                '<div class="col-md-5 col-md-offset-1 col-sm-6 col-xs-12">'+
                                    '<div class="promo-box">'+
                                        '<figure class="image"><img src="images/promo'+quarto.ID+'.jpg" alt="Image"></figure>'+
                                        '<div class="content">'+
                                            '<small>'+quarto.QntCamas+' Camas</small>'+
                                            '<h4>'+quarto.Titulo+'</h4>'+
                                            '<p>'+quarto.Descricao+'</p>'+
                                            `<a onClick="fillModalReserva(${quarto.ID});"><span>${preco} Por Noite</span></a>` +
                                        '</div> <!-- end content -->'+
                                    '</div> <!-- end promo-box -->'+
                                '</div> <!-- end col-5 -->';
        }
        else{
            dadosQuarto =   '<div class="col-md-5 col-sm-6 col-xs-12">'+
                                '<div class="promo-box">'+
                                    '<figure class="image"><img src="images/promo'+quarto.ID+'.jpg" alt="Image"></figure>'+
                                    '<div class="content">'+
                                        '<small>'+quarto.QntCamas+' Camas</small>'+
                                        '<h4>'+quarto.Titulo+'</h4>'+
                                        '<p>'+quarto.Descricao+'</p>'+
                                        `<a onClick="fillModalReserva(${quarto.ID});"><span>${preco} Por Noite</span></a>` +
                                    '</div> <!-- end content -->'+
                                '</div> <!-- end promo-box -->'+
                            '</div> <!-- end col-5 -->'+
                        '</div> <!-- end row -->';
        }
        document.getElementById('result').innerHTML += dadosQuarto;
    }
}

function    fillModalReserva( id )
{
  var   form    =   document.formReserva;
  var   entrada =   window.sessionStorage.getItem('checkin'),
        saida   =   window.sessionStorage.getItem('checkout');
  var   dataIN  =   `${entrada.slice(6,10)}-${entrada.slice(0,2)}-${entrada.slice(3,5)}`,
        dataOUT =   `${saida.slice(6,10)}-${saida.slice(0,2)}-${saida.slice(3,5)}`;
  verifyStatus(
      function( dados )
      {
          if( dados.status === 'OK' )
          {
            $('#reserva-modal').modal('show');
            cpf.value     = dados.data;
            form.dataIN.value   = dataIN;
            form.dataOUT.value  = dataOUT;
            findCliente('cpf');
            $.ajax({
                url: `/quartos/listaQuarto?ID=${id}`,
                dataType: 'json',
                error:      function (dados) {
                                alert('Erro: ' + dados.data);
                            },
                success:    function ({status, data}){
                                if(status === 'ERRO')
                                    alert('Erro: ' + data);
                                else
                                {
                                  document.getElementById('numQuarto').innerHTML = `<option value="${data[0].ID}" selected>$${data[0].Preco} - ${data[0].Titulo}</option>`;
                                  document.formReserva.titulo.value = data[0].Titulo;
                                }
                            }
            });
          }
          else
          {
            alert("Erro: É necessário estar Logado para Finalizar a Reserva.");
            $('#login-modal').modal('show');
          }
      }
  );

}
