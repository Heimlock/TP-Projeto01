// ID , QntCamas, Titulo, Descricao, Preco

function listaQuartos(callback){
    
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

function criarCardCarrossel(quartos){
    var quarto1, quarto2, quarto3, quarto4;
    var preco1, preco2, preco3, preco4;

    //Limpa o div
    document.getElementById('Quartos_Carrossel1').innerHTML = "";
    document.getElementById('Quartos_Carrossel2').innerHTML = "";
    document.getElementById('Quartos_Carrossel3').innerHTML = "";
    document.getElementById('Quartos_Carrossel4').innerHTML = "";
    
    quarto1  =   quartos[0];
    quarto2  =   quartos[1];
    quarto3  =   quartos[2];
    quarto4  =   quartos[3];

    preco1   =   parseFloat(quarto1.Preco).toFixed(2);
    preco2   =   parseFloat(quarto2.Preco).toFixed(2);
    preco3   =   parseFloat(quarto3.Preco).toFixed(2);
    preco4   =   parseFloat(quarto4.Preco).toFixed(2);
    
    var dadosQuarto1 =   '<div class="owl-item">'+
                            '<figure class="room-box">' +
                                '<img src="images/highlight-room'+quarto1.ID+'.jpg" alt="Image">'+
                                '<figcaption class="room-details">'+
                                    '<h3 class="room-name">'+quarto1.Titulo+'</h3>'+ 
                                    '<small class="room-desc"> Número de Camas: '+quarto1.QntCamas+'</small>'+
                                    '<small class="room-desc">'+quarto1.Descricao+'</small>'+
                                    '<span class="room-price">R$'+preco1+'<span>POR NOITE</span></span>'+
                                    '<a href="room-detail.html" class="room-button">'+
                                    '<span data-hover="RESERVE JÁ">RESERVE JÁ</span></a>'+ 
                                '</figcaption> <!-- end room-details -->'+
                            '</figure> <!-- end room-box -->'+
                        '</div>';   
    
    //Implementa informações no div
    document.getElementById('Quartos_Carrossel1').innerHTML = dadosQuarto1; //+ '<br><br>';/
//------------------------------------------------------------------------------------------------
    
    var dadosQuarto2 =   '<div class="owl-item">'+
                            '<figure class="room-box">' +
                                '<img src="images/highlight-room'+quarto2.ID+'.jpg" alt="Image">'+
                                '<figcaption class="room-details">'+
                                    '<h3 class="room-name">'+quarto2.Titulo+'</h3>'+ 
                                    '<small class="room-desc"> Número de Camas: '+quarto2.QntCamas+'</small>'+
                                    '<small class="room-desc">'+quarto2.Descricao+'</small>'+
                                    '<span class="room-price">R$'+preco2+'<span>POR NOITE</span></span>'+
                                    '<a href="room-detail.html" class="room-button">'+
                                    '<span data-hover="RESERVE JÁ">RESERVE JÁ</span></a>'+ 
                                '</figcaption> <!-- end room-details -->'+
                            '</figure> <!-- end room-box -->'+
                        '</div>';

    //Implementa informações no div
    document.getElementById('Quartos_Carrossel2').innerHTML = dadosQuarto2; //+ '<br><br>';/
//------------------------------------------------------------------------------------------------    
    
var dadosQuarto3 =  '<div class="owl-item">'+
                        '<figure class="room-box">' +
                            '<img src="images/highlight-room'+quarto3.ID+'.jpg" alt="Image">'+
                            '<figcaption class="room-details">'+
                                '<h3 class="room-name">'+quarto3.Titulo+'</h3>'+ 
                                '<small class="room-desc"> Número de Camas: '+quarto3.QntCamas+'</small>'+
                                '<small class="room-desc">'+quarto3.Descricao+'</small>'+
                                '<span class="room-price">R$'+preco3+'<span>POR NOITE</span></span>'+
                                '<a href="room-detail.html" class="room-button">'+
                                '<span data-hover="RESERVE JÁ">RESERVE JÁ</span></a>'+ 
                            '</figcaption> <!-- end room-details -->'+
                        '</figure> <!-- end room-box -->'+
                    '</div>';

//Implementa informações no div
document.getElementById('Quartos_Carrossel3').innerHTML = dadosQuarto3; //+ '<br><br>';/
//------------------------------------------------------------------------------------------------        
    var dadosQuarto4 =   '<div class="owl-item">'+
                            '<figure class="room-box">' +
                                '<img src="images/highlight-room'+quarto4.ID+'.jpg" alt="Image">'+
                                '<figcaption class="room-details">'+
                                    '<h3 class="room-name">'+quarto4.Titulo+'</h3>'+ 
                                    '<small class="room-desc"> Número de Camas: '+quarto4.QntCamas+'</small>'+
                                    '<small class="room-desc">'+quarto4.Descricao+'</small>'+
                                    '<span class="room-price">R$'+preco4+'<span>POR NOITE</span></span>'+
                                    '<a href="room-detail.html" class="room-button">'+
                                    '<span data-hover="RESERVE JÁ">RESERVE JÁ</span></a>'+ 
                                '</figcaption> <!-- end room-details -->'+
                            '</figure> <!-- end room-box -->'+
                        '</div>';

    //Implementa informações no div
    document.getElementById('Quartos_Carrossel4').innerHTML = dadosQuarto4; //+ '<br><br>';/
   
}