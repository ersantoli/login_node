const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');

const port = 3000;
var path = require('path');
const app = express();

var login = "admin";
var password = "12345";

app.use(session({secret:'mcwokwcijewij1l3k9'}));
app.use(bodyParser.urlencoded({extended: true}));
app.engine('html',require('ejs').renderFile);
app.set('view engine' , 'html');
app.use('/public', express.static(path.join(__dirname,'public')));
app.set('views', path.join(__dirname, '/views'));


app.post('/', (req, res)=>{
    if(req.body.password != password){
        console.log("senha errada");
    }
    if(req.body.password == password && req.body.login == login){
        //Logado com sucesso!
        req.session.login = login;

        res.render('logado')
        
    }else{
        res.render('index');
    }
    
});
app.get("/", (req,res)=>{
    if(req.session.login){
        res.render('logado');
    }else{
        res.render('index');
    }

})
app.listen(port,()=> console.log("Servidor Rodando!"));