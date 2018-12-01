
function    verifAdmin()
{
    $.ajax({    url: '/gerencia/verifyAdmin',
                dataType: 'json',
                error:      function (dados) {
                                alert('Erro: ' + dados.data);
                            },
                success:    function (dados) {
                    if (dados.status === 'ERRO')
                        alert('Erro: ' + dados.data);
                    else
                    {
                        if (dados.status === 'SEM_ACESSO')
                        {
                            alert('Erro: ' + dados.data);
                            window.location.href = '../index.html';
                        }
                    }
                }
    });
}

function    adminMode( callback )
{
    $.ajax({    url: '/gerencia/verifyAdmin',
    dataType: 'json',
    error:      function (dados) {
                    alert('Erro: ' + dados.data);
                },
    success:    function (dados) {
        if (dados.status === 'ERRO')
            alert('Erro: ' + dados.data);
        else
            callback(dados);
    }
});
}
