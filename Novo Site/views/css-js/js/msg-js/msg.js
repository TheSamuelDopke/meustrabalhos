var divmsg = document.querySelector("#divmsg")
var btnregister = document.querySelector("#registrar-se")

var nomeerror = document.querySelector('.nomeerror')
var dataNascimentoerror = document.querySelector('.dataNascimentoerror')
var emailerror = document.querySelector('.emailerror')
var senhaerror = document.querySelector('.senhaerror')

var loginerror = document.querySelector('.loginerror')
    
    
    var parraysplit = divmsg.textContent.split(',')

     divmsg.textContent = ""

    console.log(parraysplit)

    for(var i = 0; i <= parraysplit.length; i++){
    

    if(parraysplit[i] == "Digite um nome válido!"){
        nomeerror.textContent = parraysplit[i]
    }

    if(parraysplit[i] == "Digite uma data válida!"){
        dataNascimentoerror.textContent = parraysplit[i]
    }

    if(parraysplit[i] == "Digite um email válido!"){
        emailerror.textContent = parraysplit[i]
    }

    if(parraysplit[i] == "Digite uma senha válida!"){
        senhaerror.textContent = parraysplit[i]
    }

    if(parraysplit[i] == "Email já está em uso!"){
        emailerror.textContent = parraysplit[i]
    }

    if(parraysplit[i] == "Seu email ou senha estão incorretos!"){
        loginerror.textContent = parraysplit[i]
    }

    
    }




