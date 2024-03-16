//Autenticação do Usuário com base de dados local!
const localStrategy = require("passport-local").Strategy
const mongoose = require("mongoose")

const bcrypt = require("bcryptjs")


//Model de Usuario
require('../databases/register')
const Register = mongoose.model("register")

module.exports = function(passport){

    passport.use(new localStrategy({usernameField: 'email', passwordField: 'senha'}, (email, senha, done) =>{

        Register.findOne({email: email}).then((register) =>{

            if(!register){

                return done(null, false, {message: "Seu email ou senha estão incorretos!"})
            }

            //bcrypt.compare é usado para comparar se as senhas batem, ou seja o usuário digitou sua senha corretamente!

            bcrypt.compare(senha, register.senha, (erro, batem) =>{
                if(batem){
                    return done(null, register)
                }
                else{
                    return done(null, false, {message: "Seu email ou senha estão incorretos!"})
                }
            })

        })


    }))
    

    //Estes códigos servem para salvar os dados do usuário em uma sessão!
    passport.serializeUser((register, done) =>{

        done(null, register.id)
        
    })
    
    passport.deserializeUser((id, done) =>{

        Register.findById(id).then((register) =>{
            
            
            done(null, register)

        }).catch((err) =>{

            done(null, false,{message: "Algo deu errado!"})

        })
    })




}