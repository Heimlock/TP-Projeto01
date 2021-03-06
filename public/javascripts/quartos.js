function exibeCarrossel(quartos){
    var quarto, preco;
    document.getElementById('ExibirCarrossel').innerHTML = "";
    
    for (var i = 0; i <  quartos.length; i++)
    {
        quarto  = quartos[i];
        preco   = parseFloat(quarto.Preco).toFixed(2);

        var dadosQuarto =   '<div class="owl-item">'+
                                '<figure class="room-box">'+ 
                                    '<img src="images/highlight-room'+quarto.ID+'.jpg" alt="Image">'+
                                    '<figcaption class="room-details">'+
                                        '<h3 class="room-name">'+quarto.Titulo+'</h3>'+
                                        '<small class="room-desc">'+quarto.Descricao+'</small>'+ 
                                        '<span class="room-price">'+preco+'<span>POR NOITE</span></span>'+ 
                                        '<a href="room-detail.html" class="room-button"><span data-hover="RESERVE JÁ">RESERVE JÁ</span></a>'+ 
                                    '</figcaption> <!-- end room-details -->'+ 
                                '</figure> <!-- end room-box -->'+ 
                            '</div> <!-- end owl-item -->';
                                
        document.getElementById('ExibirCarrossel').innerHTML += dadosQuarto; //+ '<br><br>';
    }
}


function tipoQuartos(quartos)
{
    var quarto, preco;
    document.getElementById('TiposDeQuartos').innerHTML = "";
    
    for (var i = 0; i <  quartos.length; i++)
    {
        quarto  = quartos[i];
        preco   = parseFloat(quarto.Preco).toFixed(2);

        if (i%2 === 0){
            var dadosQuarto =   '<div class="row"></div>'+
                                    '<div class="col-md-5 col-md-offset-1 col-sm-6 col-xs-12">'+
                                        '<div class="promo-box">'+
                                            '<figure class="image"><img src="images/promo'+quarto.ID+'.jpg" alt="Image"></figure>'+
                                            '<div class="content">'+
                                                '<small>'+quarto.QntCamas+' Camas</small>'+
                                                '<h4>'+quarto.Titulo+'</h4>'+
                                                '<p>'+quarto.Descricao+'</p>'+
                                                '<span>'+preco+' Por Noite</span>'+
                                            '</div> <!-- end content -->'+
                                        '</div> <!-- end promo-box -->'+
                                    '</div> <!-- end col-5 -->';
        }
        else{
            var dadosQuarto =   '<div class="col-md-5 col-sm-6 col-xs-12">'+
                                    '<div class="promo-box">'+
                                        '<figure class="image"><img src="images/promo'+quarto.ID+'.jpg" alt="Image"></figure>'+
                                        '<div class="content">'+
                                            '<small>'+quarto.QntCamas+' Camas</small>'+
                                            '<h4>'+quarto.Titulo+'</h4>'+
                                            '<p>'+quarto.Descricao+'</p>'+
                                            '<span>'+preco+' Por Noite</span>'+
                                        '</div> <!-- end content -->'+
                                    '</div> <!-- end promo-box -->'+
                                '</div> <!-- end col-5 -->'+
                            '</div> <!-- end row -->';
        }
        document.getElementById('TiposDeQuartos').innerHTML += dadosQuarto; //+ '<br><br>';
    }
}

// ID , QntCamas, Titulo, Descricao, Preco
function exibeQuartos( quartos )
{
    var quarto, preco;
    document.getElementById('result').innerHTML = "";
    for (var i = 0; i <  quartos.length; i++)
    {
        quarto  =   quartos[i];
        preco   =   quarto.Preco;

        if( (preco.toString().length == 2) || (preco.toString().length == 3))
        {
            preco   =   preco.toString()    +   ".00";
        }
        else if( (preco.toString().length == 4 & preco < 100) || (preco.toString().length == 5 & preco > 100) )
        {
            preco   =   preco.toString()    +   "0";
        }

        var dadosQuarto =   '<tr id="' + quarto.ID + '">' +
                            '<td>' + quarto.ID + '</td>'  +
                            '<td>' + quarto.Titulo + '</td>'  +
                            '<td>' + quarto.QntCamas + '</td>'  +
                            '<td>' + preco + '</td>'  +
                            `<td>`      +
                            `<a data-toggle="modal" data-target="#info-modal" onClick="getRoomData(${quarto.ID}, fillFormRoom)">Info</a>` +
                            `</td>`     +
                            `</tr>`;
        document.getElementById('result').innerHTML += dadosQuarto;
    }
}

function    listarQuartos( callback )
{
    $(document).ready(function () {
        $.ajax({
            url: '/quartos/listaQuartos',
            dataType: 'json',
            error: function (dados) {
                    alert('Erro: ' + dados.data);
                    },
            success: function (dados) {
                if (dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                else
                    callback(dados.data);
            }
        });
    });
}

function    getRoomData( id, callback )
{
    $.ajax({
        url: `/quartos/listaQuarto?ID=${id}`,
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

function    fillFormRoom( {status, data} )
{
    var elements    =   document.getElementsByClassName("form-control"),
        btn_toggle  =   document.getElementById("btn_alterar"),
        form        =   document.formQuarto,
        precoAux,
        i;
    // ID, QntCamas, Titulo, Descricao, Preco
    const   {   ID, QntCamas, Titulo, Descricao, Preco }    =  data[0];
    precoAux   =   Preco;

    //  PreSets
    for( i = 0; i < elements.length; i++ )
        elements[i].readOnly  = true;
    btn_toggle.innerHTML    =   "Alterar";
    btn_toggle.setAttribute('onClick',`alterarEstadoQuarto(${ID});`);

    if( (precoAux.toString().length == 2) || (precoAux.toString().length == 3))
    {
        precoAux   =   precoAux.toString()    +   ".00";
    }
    else if( (precoAux.toString().length == 4 & Preco < 100) || (precoAux.toString().length == 5 & precoAux > 100) )
    {
        precoAux   =   precoAux.toString()    +   "0";
    }
    console.log(`Preco: ${Preco}, Len: ${Preco.toString().length}, PrecoAux: ${precoAux}`);

    //  Fill Form
    form.titulo.value       =   Titulo;
    form.preco.value        =   precoAux;
    form.qntCamas.value     =   QntCamas;
    form.descricao.value    =   Descricao;
}

function    alterarEstadoQuarto( ID )
{
    var elements    =   document.getElementsByClassName("form-control"),
        btn_toggle  =   document.getElementById("btn_alterar"),
        i;

    for( i = 0; i < elements.length; i++ )
        elements[i].readOnly  = false;

    if( elements[0].readOnly == false )
    {
        btn_toggle.innerHTML    =   "Submeter";
        btn_toggle.setAttribute('onClick',`salvaQuarto(${ID});`);
    }
    else
    {
        btn_toggle.innerHTML    =   "Alterar";
        btn_toggle.setAttribute('onClick',`alterarEstadoQuarto(${ID});`);
    }
}

function salvaQuarto()
{
    var form    = document.formQuarto,
        input   =   {   // ID , QntCamas, Titulo, Descricao, Preco
            QntCamas:   form.qntCamas.value,
            Titulo:     form.titulo.value,
            Descricao:  form.descricao.value,
            Preco:      form.preco.value
        },
        param = new URLSearchParams( window.location.search ),
        urlAcao;

    if( arguments.length != 0 )
    {   //  Alteração por Argumento
        urlAcao =   `/quartos/editaQuarto?ID=${arguments[0]}`;
    }
    else
    {   //  Inserção
        urlAcao =   '/quartos/insere';
    }

    $.ajax({
        url: urlAcao,
        type: 'post',
        data: input,
        error: function (dados) {
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
