
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const expressSession = require('express-session')
const flash = require('connect-flash')


//Middleware PASSPORT para confirmação de autenticação! configuração na pasta CONFIG!
const passport = require("passport")
require("./config/authentication")(passport)


//Script para senhas
const bcrypt = require('bcryptjs')



//Servidor!
const express = require('express')
const open = express();



//Base de dados!
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

    //Passport middleware de autenticação
    open.use(passport.initialize())
    open.use(passport.session())



    open.use(flash()) //Sempre usar o Connect-Flash logo após o Express-Session!


    // ORDEM: 1° Sessão, - 2° Passport, - 3° Connect-Flash
    //--------------------IMPORTANTE SEGUIR SEMPRE A ORDEM ACIMA------------------




    //Middleware
    open.use((req, res, next)=> {

        //Variáveis Globais!
        res.locals.success_msg = req.flash("success_msg")

        res.locals.error_msg = req.flash("error_msg")



        //Mensagem de erro caso a autenticação falhe!
        res.locals.error = req.flash("error")

        //Passa os dados do usuário para essa Variável, caso não tenha passa o valor nulo!
        res.locals.user = req.user || null;

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
            
                res.render('./index/index.handlebars')
            
        })


    //Registro:
        open.get('/registro', (req, res) =>{
            res.render('./index/registro.handlebars')
        })



    //Rota para adicionar o registro ao banco de dados:
        open.post('/registro/add', (req, res) =>{
            Register.findOne({email: req.body.email}).then((email) =>{
                //Verificação se já existe o email no banco de dados!
                if(email){
                    req.flash("error_msg", "Email já está em uso!")
                    res.redirect('/registro')
                }
                else{
                    const dataAtual = new Date();
                    const anoAtual = dataAtual.getFullYear();
                    const inputDate = req.body.dataNascimento
                    const partesData = inputDate.split('-');
                    const ano = partesData[0]


                    //Retirar os espaços brancos no input .trim()
                    var nome = req.body.inputnome.trim()

                    var senha = req.body.senha.trim()
                    
                
                    if(req.body.inputnome == "" || req.body.inputnome.length < 5 || req.body.inputnome == undefined || nome == 0 || nome == "" || /\s{2}/.test(req.body.inputnome)){
                        var erros = 1
                        req.flash("error_msg", "Digite um nome válido!")
                        
                    }

                    if(req.body.email == 0 || req.body.email.length < 10){
                        var erros = 1
                        req.flash("error_msg", "Digite um email válido!")
                        
                    }
    
                    if(req.body.senha == 0 || req.body.senha.length < 6 || req.body.senha == undefined || senha == 0 || senha == "" || /\s{1}/.test(req.body.senha)){
                        var erros = 1
                        req.flash("error_msg", "Digite uma senha válida!")
                        
                    }

                    if(req.body.dataNascimento == "" || req.body.dataNascimento == undefined || ano > anoAtual - 10 || ano < anoAtual - 120){
                        var erros = 1
                        req.flash("error_msg", "Digite uma data válida!")
                    }

                
    
                    if(erros > 0){
                        res.redirect('/registro')
                    }
                    
                    else{

                        const novoRegistro = {
                            nome: req.body.inputnome,
                            email: req.body.email,
                            nascimento: req.body.dataNascimento,
                            senha: req.body.senha
                         }
                         bcrypt.genSalt(10, (erro, salt) => {

                            bcrypt.hash(novoRegistro.senha, salt, (erro, hash) =>{
                                if(erro){
                                    req.flash("error_msg", " Houve um erro durante o salvamento do usuário!" + erro)
                                    res.redirect('/')
                                }
                                else{
                                    novoRegistro.senha = hash

                                    new Register(novoRegistro).save().then(() =>{
                                        req.flash("success_msg", "Seu registro foi concluído com sucesso!")
                                        res.redirect('/')
            
                                    }).catch((err) =>{
                                        req.flash("error_msg", "Ocorreu um erro ao salvar seu registro! " + err)
                                        res.redirect('/registro')
                                })
                                }


                            })

                         })
                         
                    }
        }
        })})





    //Rota de Login
        open.get('/login', (req, res) =>{
            res.render("./index/formlogin.handlebars")
        })


        open.post('/login', (req, res, next) =>{

            //Função para autenticar!
              
                passport.authenticate("local", {
                    
                    successRedirect: '/user',
                    failureRedirect: '/login',
                    failureFlash: true
                    })
                    (req, res ,next)
                   
        })

    

//Rota de Usuário Logado
   const user = require('./routes/userlogin')

   open.use('/user', user)



//Rota Admin:
    const admin = require("./routes/admin")

    open.use('/admin', admin)




open.listen(3000, () =>{
    console.log("O servidor está ligado!")
})
















