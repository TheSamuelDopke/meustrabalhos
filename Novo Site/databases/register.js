const mongoose = require('mongoose')
const Schema = mongoose.Schema


const Register = new Schema({

    nome: {
        type: String,
        required: true
    },

    nascimento: {
        type: Date,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    senha: {
        type: String,
        required: true
    },

    data: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

mongoose.model("register", Register)