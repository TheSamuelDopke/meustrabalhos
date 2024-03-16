console.log("Funcionando")

let menu = document.querySelector("#menu")

        let replace = document.querySelector("#replace")

        let menureplace = document.querySelector("#menureplace")

        let footer = document.querySelector("#footer")

        menu.addEventListener("click", responsivo)

        menureplace.addEventListener("click", voltaresponsivo)

       function responsivo(){
        menu.style.display = "none"

        replace.style.display = "block"

        menureplace.style.display = "block"

        footer.style.position = "absolute"
                footer.style.bottom = "0px"
       }
        
       function voltaresponsivo(){
        menu.style.display = "block"

        replace.style.display = "none"

        menureplace.style.display = "none"

        footer.style.position = "absolute"
                footer.style.bottom = "0px"
        
       }
        


       window.addEventListener("resize", ocultarElemento)

       function ocultarElemento() {
            let larguraTela = window.innerWidth //Calcular sempre que a função resize ou seja o windows ver que a resolução foi modificada calcular para que largura ela foi.


            
            if(larguraTela > 907){
                menu.style.display = "none"
                replace.style.display = "none"
                footer.style.position = "absolute"
                footer.style.bottom = "0px"
            }

            if(larguraTela < 907 && menu.style.display == "none"){
                menu.style.display = "block"
            }

            if(larguraTela < 907 && replace.style.display == "block"){
                menu.style.display = "none"
            }
    }