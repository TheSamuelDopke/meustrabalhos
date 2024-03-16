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
    },

    admin: {
        type: Number,
        required: true,
        default: 0
    }
})

mongoose.model("register", Register)