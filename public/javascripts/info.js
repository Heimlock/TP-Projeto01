

function    infoReq( req, target )
{
    var input   =   {   sel: req };
    var rtn;
    $.ajax({
        url: '/info/totalNumbers',
        type: 'post',
        data: input,
        error: function (dados) {
                    console.log(dados);
                    alert('Erro: ' + dados.data);
                },
        success: function (dados) {
            if (dados.status === 'ERRO')
            {
                console.log(dados);
                document.getElementById(target).innerHTML = dados.data;
            }
            else
            {
                if( dados.data.tipo === req )
                    document.getElementById(target).innerHTML = dados.data.qnt;
                else
                    document.getElementById(target).innerHTML = -1;
            }
        }
    });
}
