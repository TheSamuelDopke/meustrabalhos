//Helpers são pequenos códigos, quase como middlewares que ajudam você em pequenas tarefas

//Neste caso estaremos configurando um helper que nos ajude a identificar se o usuário esta autenticado e é admin!


module.exports = {
    //Aqui vai a função middleware lembrando que deve sempre possuir o Next para dar a continuidade!
    isadmin: function(req, res, next){

        if(req.isAuthenticated() && req.user.isadmin === 1){
            console.log("Conectado")
            return next();
            
            
        }

        req.flash("error_msg", "Você não tem permissão para estar aqui!")
        res.redirect('/')

    }
}








