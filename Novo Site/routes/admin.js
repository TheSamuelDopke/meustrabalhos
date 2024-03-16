
const express = require('express')

const router = require('express').Router() //Componente para criar rotas em arquivos separados

const mongoose = require('mongoose')

//Carregando o Helper para identificar se o usuário está autenticado e é administrador!
const {isadmin} = require("../helpers/isadmin")
//Cria a variável eAdmin executando unicamente a função presente no caminho indicado ("../helpers/eAdmin")


//Models:
    //Registro:
        require("../databases/register")

        const Register = mongoose.model("register")


router.get('/logins', (req, res) =>{
    Register.find().lean().then((register) =>{
        res.render('adminlogin.handlebars', {register: register})
    })
})

router.get('admin/logins/deletar', (req, res) =>{
    Register.deleteOne({_id: req.body.id}).then(() =>{
        req.flash('success_msg', "foi removido com sucesso")
        res.redirect('/logins')
    })
})

module.exports = router //Sempre no final do código para exportar as rotas!