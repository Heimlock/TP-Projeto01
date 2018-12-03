
function loginUsuario()
{
    var form    =   document.formLogin;
    var input   =   {   login: form.login.value,
                        senha: form.senha.value
                    };
    var status  =   false;
    var data;

    $.ajax({
        url: '/acesso/login',
        type: 'post',
        data: input,
        error: function (dados) {
                    alert(dados);
                },
        success: function (dados) {
                if (dados.status === 'ERRO')
                {
                    alert("Erro: " +  dados.data);
                }
                else
                {
                    alert(dados.data);
                    window.location.reload();
                }
        }
    });
}

function logoutUsuario()
{
    $.ajax({
        url: '/acesso/logout',
        type: 'post',
        error: function (dados) {
                alert('Erro: ' + dados.data);
                },
        success: function (dados) {
                if (dados.status === 'ERRO')
                    alert('Erro: ' + dados.data);
                else
                {
                    alert(dados.data);
                    window.location.reload();
                }
    }
    });
}

/*
 *  dados.status    === 'ERRO'
 *  dados.data           Error Msg
 *  dados.status    === 'OK'
 *  dados.data           UserID
 */
function verifyStatus( callback )
{
    $.ajax({    url: '/acesso/status',
                dataType: 'json',
                error:  function (dados) {
                                alert('Erro: ' + dados.data);
                                callback(dados);
                            },
                success:function (dados) {
                    callback(dados);
                }
    });
}

function getUserData( callback )
{
  $.ajax({    url: '/acesso/userData',
              dataType: 'json',
              error:  function (dados) {
                              alert('Erro: ' + dados.data);
                              callback(dados);
                          },
              success:function (dados) {
                  callback(dados);
              }
  });
}
