function mascaraCPF(cpf){
    if(mascaraInteiro(cpf)==false){
        event.returnValue = false;
    }       
    return formataCampo(cpf, '000.000.000-00', event);
}

function mascaraCep(cep){
    if(mascaraInteiro(cep)==false){
        event.returnValue = false;
    }       
    return formataCampo(cep, '00.000-000', event);
}

function mascaraTelefone(telefone){  
    if(mascaraInteiro(telefone)==false){
        event.returnValue = false;
    }       
    return formataCampo(telefone, '(00) 00000-0000', event);
}

function mascaraInteiro(){
    if (event.keyCode < 48 || event.keyCode > 57){
        event.returnValue = false;
        return false;
    }
    return true;
}

function formataCampo(campo, mascara, evento){ 
    var verificaMascara; 
    var i;

    var verificaEvento  =   evento.keyCode;
    var expressao       =   /\-|\.|\/|\(|\)| /g
    var campoAntigo     =   campo.value.toString().replace( expressao, "" ); 

    var posicao         =   0;    
    var novoCampo       =   "";
    var tamanho         =   campoAntigo.length; 

    if(verificaEvento != 8){

        for(i = 0; i <= tamanho; i++) { 
            verificaMascara  = ((mascara.charAt(i) == "-") || (mascara.charAt(i) == ".") || (mascara.charAt(i) == "/")) || ((mascara.charAt(i) == "(") || (mascara.charAt(i) == ")") || (mascara.charAt(i) == " "))
                    
            if(verificaMascara){ 
                novoCampo += mascara.charAt(i); 
                tamanho++;
            }
            else{ 
                novoCampo += campoAntigo.charAt(posicao); 
                posicao++; 
            }              
        }      
        
        campo.value = novoCampo;
    }
    
    return true; 
}

function salvaCliente(){
    var form = document.formCliente;
    var input = {
        Nome: form.nome.value,
        Cpf: form.cpf.value,
        Senha: form.senha.value,
        DataNasc: form.data.value,
        Sexo: form.sexo.value,
        Cep: form.cep.value,
        Endereco: form.endereco.value,
        Cidade: form.cidade.value,
        Estado: form.estado.value,
        Email: form.email.value,
        Telefone: form.telefone.value,
        Motivo: form.motivo.value
    }
    
    var param = new URLSearchParams( window.location.search );
    var urlAcao;

    if(param.has('id'))
        urlAcao = '/cliente/altera?id=' + param.get('id');
    else
        urlAcao = '/cliente/insere';

    console.log( input );

    $.ajax({
        url: urlAcao,
        type: 'post',
        data: input,
        error: function(dados){
            alert('Erro:', dados.data);
        },
        success: function(dados){
            if(dados.status === 'ERROR')
                alert('Erro: ' + dados.data);
            else
                alert('Sucesso' + dados.data);
        }
    });
}

function listaCliente(){
    $(document).ready(function () {
        $.ajax({
            url: '/cliente/lista',
            dataType: 'json',
            
            error: function (dados){
                alert('Erro: ' + dados.data);
            },
            success: function (dados) {
               if(dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                else
                    if(dados.status === 'SEMACESSO'){
                        alert('Erro: ' + dados.data);
                        window.location.href = '/login.html';
                    }
                    else
                        exibeClientes(dados.data);
            }
        });
    });
}

function exibeClientes(clientes){
    for (var i = 0; i < clientes.length; i++){
        var cliente = clientes[i];
        
        var dadosCliente = 'ID: ' + cliente.id +
            '<br>Nome: ' + cliente.nome +
            '<br>Endereço: ' + cliente.endereco +
            '<br>Telefone: ' + cliente.telefone +
            '<br>Email: ' + cliente.email;
            document.getElementById('result').innerHTML += dadosCliente + '<br><br>';
    }
}

function alteraCliente(){
    var param = new URLSearchParams( window.location.search );

    if(param.has('id'))
    {
        $.ajax({
            url: '/cliente/listaCliente?id=' + param.get('id'),
            dataType:"json",
            error: function(dados){
                alert('Erro: ', dados.data);
            },
            success: function(dados){
                if(dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                else{
                    var form = document.formCliente;
                    form.nome.value = dados.data[0].nome;
                    form.endereco.value = dados.data[0].endereco;
                    form.email.value = dados.data[0].emai;
                }
            }
        });
    }
}

function deletaCliente(id) {
    $.ajax({
        url: '/cliente/deleta?id=' + id,
        type: 'post',
        dataType: 'json',
        error: function (dados) {
            alert('Erro: ' + dados.data);
        },
        success: function (dados) {
            if(data.status === 'ERRO')
                alert('Erro: ' + dados.data);
            else{
                var divResult = document.getElementById('result');
                divResult.removeChild(document.getElementById(id));
                alert(dados.data);
            }
        }
    });
}