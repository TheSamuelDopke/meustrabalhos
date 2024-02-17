const horas = document.getElementById('horas')
const minutos = document.getElementById('minutos')
const segundos = document.getElementById('segundos')


const relogio = setInterval(function time() {
    let dateToday = new Date();
    let hr = dateToday.getHours();
    let min = dateToday.getMinutes();
    let s = dateToday.getSeconds();
    

    horas.textContent = hr; // textContent também é uma forma de modificar o documento html
    minutos.textContent = min;
    segundos.textContent = s;

})
    function menuShow(){
        let menuMobile = document.querySelector('.mobile-menu')
        if(menuMobile.classList.contains('open')){
            menuMobile.classList.remove('open')
        }
        else{
            menuMobile.classList.add('open')
        }
        }
    
    function entrar(){
        var entraremail = document.getElementById('email').value
        if(entraremail=='samueloficial1@hotmail.com'){
            prompt('Entrou')
        }






    }
    entrar()
    

















