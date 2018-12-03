

function    infoReq( req, target )
// function    infoReq( req)
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
                // console.log(dados.data);
                if( dados.data.tipo === req )
                    // return  dados.data.qnt;
                    document.getElementById(target).innerHTML = dados.data.qnt;
                else
                    document.getElementById(target).innerHTML = -1;
                    // return  -1;
            }
        }
    });
}