//Helpers são pequenos códigos, quase como middlewares que ajudam você em pequenas tarefas



//Neste caso estaremos configurando um helper que nos ajude a identificar se o usuário esta autenticado

module.exports = {
    //Aqui vai a função middleware lembrando que deve sempre possuir o Next para dar a continuidade!
    autenticado: function(req, res, next){

        if(req.isAuthenticated()){
            console.log("Conectado")
            return next();
            
            
        }

        req.flash("error_msg", "Você deve fazer login!")
        res.redirect('/')

    }
}
