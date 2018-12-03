    
    function exibeClientes(clientes) {
        for (var i = 0; i < clientes.length; i++)
        {
            var cliente = clientes[i];
            // ID, Nome, Cpf, DataNasc, Sexo, Cep, Endereco, Cidade, Estado, Email, Telefone, Motivo
            var telefone     =   ( '('+cliente.Telefone.slice(0,2)+') '+cliente.Telefone.slice(2,7)+'-'+cliente.Telefone.slice(7,11) ),
                cpf          =  ( cliente.Cpf.slice(0,3) + '.' + cliente.Cpf.slice(3,6) + '.' + cliente.Cpf.slice(6,9) + '-' + cliente.Cpf.slice(9,11) ),
                dataNasc     =  ( cliente.DataNasc.slice(0,10).slice(8,10) + '/' + cliente.DataNasc.slice(0,10).slice(5,7) + '/' + cliente.DataNasc.slice(0,10).slice(0,4) );
            var dadosCliente =  `<tr id="${cliente.ID}">`       +
                                `<td>${cliente.Nome}</td>`      +
                                `<td>${cpf}</td>`       +
                                `<td>${cliente.Email}</td>`     +
                                `<td>${dataNasc}</td>`  +
                                `<td>${telefone}</td>`  +
                                // `<td>${cliente.Motivo}</td>`    +
                                `<td>`      + 
                                `<a data-toggle="modal" data-target="#profile-modal" onClick="getClientData(${cliente.ID}, fillFormCliente)">Perfil</a>` +
                                `</td>`     +
                                `</tr>`;
            document.getElementById('result').innerHTML += dadosCliente;
        }
    }
    
    function alterarEstadoCliente( ID )
    {
        var elements    =   document.getElementsByClassName("form-control"),
            btn_toggle  =   document.getElementById("btn_alterar"),
            i;

        for( i = 0; i < elements.length -3; i++ )
        {
            if( elements[i].id == "cpf" )
                elements[i].readOnly  = true;
            else
                elements[i].readOnly  = false;
        }

        if( elements[0].readOnly == false )
        {
            btn_toggle.innerHTML    =   "Submeter";
            btn_toggle.setAttribute('onClick',`editaCliente(${ID});`);
        }
        else
        {
            btn_toggle.innerHTML    =   "Alterar";
            btn_toggle.setAttribute('onClick',`alterarEstadoCliente(${ID});`);
        }

    }

    function editaCliente( ID )
    {
        salvaCliente(ID);
        getClientData(ID, fillFormCliente);
    }

    function fillFormCliente( {status, data} )
    {
        var elements    =   document.getElementsByClassName("form-control"),
            btn_toggle  =   document.getElementById("btn_alterar"),
            form        =   document.formPerfilCliente,
            i;
        const   {   ID, Nome, Cpf, DataNasc, Sexo, Cep, Endereco, 
                    Cidade, Estado, Email, Telefone }    =  data[0];

        //  PreSets
        for( i = 0; i < elements.length; i++ )
            elements[i].readOnly  = true;
        btn_toggle.innerHTML    =   "Alterar";
        btn_toggle.setAttribute('onClick',`alterarEstadoCliente(${ID});`);

        //  Fill Form
        form.nome.value     =   Nome;
        form.cpf.value      =   Cpf;
        form.dataNasc.value =   DataNasc.slice(0,10);
        form.sexo.value     =   ((Sexo == 'M') ? "Masculino" : "Feminino");
        form.cep.value      =   Cep;
        form.endereco.value =   Endereco;
        form.cidade.value   =   Cidade;
        form.estado.value   =   Estado;
        form.email.value    =   Email;
        form.telefone.value =   Telefone;
        getCurrEstadia( ID, function ( { status, data } )
        {
            if( data.length != 0 )
            {
                form.dataIN.value   =   data[0].DataEntrada.slice(0,10);
                form.dataOUT.value  =   data[0].PrevSaida.slice(0,10);
                form.motivo.value   =   data[0].Motivo;
            }
            else
            {
                form.dataIN.value   =   "";
                form.dataOUT.value  =   "";
                form.motivo.value   =   "";
            }
        });
    }

    function getCurrEstadia( id, callback )
    {
        $.ajax({
            url: `/reservas/estadiaCliente?ID=${id}`,
            dataType:"json",
            error: function (dados) {
                                        alert('Erro: ' + dados.data);
                                    },
            success: function (dados) {
                                        if (dados.status === 'ERRO')
                                            alert('Erro: ' + dados.data);
                                        callback(dados);
                                        }
        });
    }

    function getClientData( id, callback )
    {
        // console.log(`ID: ${id}`);
        $.ajax({
            url: `/cliente/listaCliente?ID=${id}`,
            dataType:"json",
            error: function (dados) {
                                        alert('Erro: ' + dados.data);
                                    },
            success: function (dados) {
                                        if (dados.status === 'ERRO')
                                            alert('Erro: ' + dados.data);
                                        else
                                        //     {
                                        //         var form = document.formCliente;
                                        //         form.nome.value       = dados.data[0].nome;
                                        //         form.endereco.value   = dados.data[0].endereco;
                                        //         form.email.value      = dados.data[0].email;
                                        //         form.telefone.value   = dados.data[0].telefone;
                                        //     }
                                        callback(dados);
                                        }
        });
        // $.ajax({    
        //     url: '/cliente/listaCliente?id=' + id,
        //     dataType: 'json',
        //     type: 'post',
        //     error: function (dados) {
        //             alert('Erro: ' + dados.data);
        //             },
        //     success: function (dados) 
        //         {
        //             if(dados.status === 'ERRO')
        //                 alert('Erro: ' + dados.data);
        //             callback(dados);
        //         }
        //     });
    }

    function getClientExists( cpf, callback )
    {
        $.ajax({
            url: `/cliente/verifCliente?CPF=${cpf}`,
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

    function salvaCliente() {
        var form    = document.formPerfilCliente,
            cpf     = form.cpf.value, 
            telefone= form.telefone.value, 
            cep     = form.cep.value, 
            input,
            param = new URLSearchParams( window.location.search ),
            urlAcao;
            
        if( param.has('ID') )
        {   //  Alteração por URl
//  TODO
            // urlAcao =   '/cliente/altera?ID=' + param.get('ID');
        }
        else if( arguments.length != 0 )
        {   //  Alteração por Argumento
            urlAcao =   `/cliente/altera?ID=${arguments[0]}`;
            input   =   {
                Nome:       form.nome.value,
                Cpf:        ( cpf.slice(0,3) + cpf.slice(4,7) + cpf.slice(8,11) + cpf.slice(12,14) ),
                DataNasc:   form.dataNasc.value,
                Sexo:       ((form.sexo.value == 'Masculino') ? "M" : "F"), 
                Cep:        ( cep.slice(0,5) + cep.slice(6,10) ), 
                Endereco:   form.endereco.value, 
                Cidade:     form.cidade.value, 
                Estado:     form.estado.value, 
                Email:      form.email.value, 
                Telefone:   ( telefone.slice(1,3) + telefone.slice(5,10) + telefone.slice(11,15) )
            };
        }
        else
        {   //  Inserção
            urlAcao =   '/cliente/insere';

            if( form.senha.value == form.confSenha.value )
            {
                input   = {
                    Nome:       form.nome.value,
                    Cpf:        ( cpf.slice(0,3) + cpf.slice(4,7) + cpf.slice(8,11) + cpf.slice(12,14) ),
                    DataNasc:   form.dataNasc.value,
                    Sexo:       ((form.sexo.value == 'Masculino') ? "M" : "F"), 
                    Senha:      form.senha.value,
                    Cep:        ( cep.slice(0,5) + cep.slice(6,10) ), 
                    Endereco:   form.endereco.value, 
                    Cidade:     form.cidade.value, 
                    Estado:     form.estado.value, 
                    Email:      form.email.value, 
                    Telefone:   ( telefone.slice(1,3) + telefone.slice(5,10) + telefone.slice(11,15) )
                };
            }
            else
            {
                alert( "Senhas não são iguais!" );
                return;
            }
        }

        getClientExists(( cpf.slice(0,3) + cpf.slice(4,7) + cpf.slice(8,11) + cpf.slice(12,14) ), 
        function ({status, data}){
            console.log("status: " + status + " , Data: " + data);
            if( data.length != 0 )
            {
                alert("Cliente já cadastrado");
                return;
            }
            else
            {
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
        });
    }
    
    function listarCliente( callback )
    {
        $(document).ready(function () {
            $.ajax({    
                url: '/cliente/lista',
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

    // OLD
    function deletaCliente( id ) {
        $.ajax({    
            url: '/cliente/deleta?ID=' + id,
            dataType: 'json',
            type: 'post',
            error: function (dados) {
                    alert('Erro: ' + dados.data);
                    },
            success: function (dados) 
                {
                    if(dados.status === 'ERRO')
                        alert('Erro: ' + dados.data);
                    else
                    {
                        // alert(dados.data);
                        // location.reload();
                        var divResult = document.getElementById('result');
                        divResult.removeChild(document.getElementById(id));
                    }
                }
            });
    }
