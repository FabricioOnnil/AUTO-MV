import express from "express";
const app = express();


/* Config 
// Template Engine
const tempEng = create({ defaultLayout: 'main' });
app.engine('handlebars', tempEng.engine);
app.set('view engine', 'handlebars');

// Conexão com o banco de dados MySql
const sequelize = new Sequelize('vamo_auto_mv', 'root', '8mtkjg', {
    host: "localhost",
    dialect: 'mysql'
});

sequelize.authenticate().then(function() {
    console.log("Conectado com sucesso!");
}).catch(function(erro) {
    console.log("Falha ao se conectar: " + erro);
});*/

// ROTAS


app.get('/', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoIndex.html");
});

app.get('/vamoInicial', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoInicial.html");
});

app.get('/vamoLogin', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoLogin.html");
});

app.get('/vamoCalendario', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoCalendario.html");
});

app.get('/vamoDashboard', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoDashboard.html");
});

app.get('/vamoAgenda', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoAgenda.html");
});

app.get('/vamoEntrega', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoEntrega.html");
});

app.get('/vamoRefeicao', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoRefeicao.html");
});

app.get('/vamoAbastecimento', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoAbastecimento.html");
});

app.get('/vamoRelatorio', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoRelatorio.html");
});

app.get('/vamoReparos', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoReparos.html");
});

app.get('/vamoGerencia', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoGerencia.html");
});

app.get('/vamoMapa', (req, res)=> {
    res.sendFile(__dirname + "/frontend/vamoMapa.html");
});

//app.get('/index', (req, res)=> {
//    res.sendFile(__dirname + "/frontend/index.html");
//});



app.listen(8081, function() {
    console.log("Servidor aberto na url http://localhost:8081");
});
