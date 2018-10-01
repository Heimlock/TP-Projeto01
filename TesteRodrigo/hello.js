var http = require('http');
var util = require('./util.js')

http.createServer(
    function(request, response){
        response.writeHead(200, {'Content-type':'text/plain'}); //Cria página html
        console.log('Teste'); //msg que aparece no console da página ou do windows, que nem printf
        response.end('Hello World ' + util.dateTime());    //Coloca conteudo na página html
    }
).listen(3000);

//para abrir a pagina criada => localhost:3000
//nao vamos usar response.end, e sim response.json. O servidor vai sempre conversar com o json, o json vai conversar com a pagina

