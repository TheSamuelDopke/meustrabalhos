const express = require('express')

const router = require('express').Router() //Componente para criar rotas em arquivos separados

const mongoose = require('mongoose')

const passport = require("passport")
require("../config/authentication")(passport)


const axios = require('axios')

//Carregando o Helper para identificar se o usuário está autenticado
const {autenticado} = require("../helpers/autenticated")



//Models:
    //Registro:
    require("../databases/register")
    const Register = mongoose.model("register")







//Rotas:
    router.get('/', autenticado, (req, res) =>{

            Register.findById({_id: req.user._id}).then((login) =>{
                if(login){
                    
                    axios.post(`http://localhost:3000/user/${login._id}`).then(() => {
                        // Se a solicitação for bem-sucedida, renderize a página de login
                        res.render('userlogin/indexlogin.handlebars', {register: login});
                    })
                }
            })
        
    })


    router.post('/:id', autenticado, (req, res) =>{
        const paramsId = req.params.id

        Register.findOne({_id: paramsId}).then((register) =>{
            
            res.render('userlogin/indexlogin.handlebars', {register: register})
        })
        
    })

    


module.exports = router