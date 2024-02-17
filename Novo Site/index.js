
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const expressSession = require('express-session')
const flash = require('connect-flash')

const express = require('express')
const open = express();

require('./databases/register')
const Register = mongoose.model("register")

const axios = require('axios')
//Configurações!


    //Express-session:
    open.use(expressSession({
        secret: "Secret",
        resave: true,
        saveUninitialized: true
    }))
    open.use(flash()) //Sempre usar o Connect-Flash logo após o Express-Session!




    //Middleware
    open.use((req, res, next)=> {
        res.locals.success_msg = req.flash("success_msg")
        res.locals.error_msg = req.flash("error_msg")
        next()
    }) 



    //Body Parser:
    open.use(bodyParser.urlencoded({extended:true}))
    open.use(bodyParser.json())




    //Handlebars
    open.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    open.set('view engine', 'handlebars')




    //Mongoose:
    mongoose.Promise = global.Promise;
    
    mongoose.connect('mongodb://127.0.0.1:27017/').then(() =>{
        console.log("Conectou-se ao banco de dados!")
    }).catch((err) =>{
        console.log("Ocorreu um erro ao se conectar ao banco de dados " + err)
    })


    //CSS
    open.use(express.static(path.join(__dirname, "views")))










//Rotas:
    //Principal:
        open.get('/', (req, res) =>{
            Register.find().lean().then((register) =>{
                res.render('index.handlebars', {register: register})
            })
            
        })


    //Registro:
        open.get('/registro', (req, res) =>{
            res.render('registro.handlebars')
        })



    //Rota para adicionar o registro ao banco de dados:
        open.post('/registro/add', (req, res) =>{
            Register.findOne({email: req.body.email}).then((email) =>{
                //Verificação se já existe o email no banco de dados!
                if(email){
                    req.flash("error_msg", "Email já está em uso")
                    res.redirect('/registro')
                }
                else{
                    if(req.body.nome == 0 || req.body.nome.length < 5){
                        var erros = 1
                        req.flash("error_msg", "O seu nome completo deve possuir pelo menos 5 letras!")
                    }

                    if(req.body.email == 0 || req.body.email.length < 10){
                        var erros = 1
                        req.flash("error_msg", "O email é inválido!")
                    }
    
                    if(req.body.senha == 0 || req.body.senha.length < 6){
                        var erros = 1
                        req.flash("error_msg", "A senha deve conter pelo menos 6 digitos!")
                    }
    
                    if(erros > 0){
                        res.redirect('/registro')
                    }
                    
                    else{

                        const novoRegistro = {
                            nome: req.body.nome,
                            email: req.body.email,
                            nascimento: req.body.nascimento,
                            senha: req.body.senha
                         }
                        new Register(novoRegistro).save().then(() =>{
                            req.flash("success_msg", "Seu registro foi concluído com sucesso!")
                            res.redirect('/')

                        }).catch((err) =>{
                            req.flash("error_msg", "Ocorreu um erro ao salvar seu registro! " + err)
                            res.redirect('/registro')
                    })
            }
        }
        })})





    //Rota de Login
        open.post('/login', (req, res) =>{
            Register.findOne({email: req.body.email, senha: req.body.senha}).lean().then((login) =>{
                if(login){
                axios.post(`http://localhost:3000/login/${login._id}`).then(response =>{
                    res.render('./login/indexlogin.handlebars', {register: login})
                })
                    
                    
                    
                }else{

                    req.flash("error_msg", "Erro ao entrar!")
                    res.redirect('/')
                }
            })
        })


        open.post('/login/:id', (req, res) =>{
            Register.find().lean().then((register) =>{
                res.render('./login/indexlogin.handlebars', {register: register})
        })
            })
            

    


//Rota Admin:
    const admin = require("./routes/admin")

    open.use('/admin', admin)




open.listen(3000, () =>{
    console.log("O servidor está ligado!")
})
















