window.onload = function () {
   let boton = document.querySelector('.botonEnviar')
   let nombre = document.querySelector('#nombre')
   let email = document.querySelector('#email')
   let text = document.querySelector('#text')
   let errores = [];

   boton.addEventListener("click", function (evento) {
      evento.preventDefault()
      if (nombre.value != '') {
         if (email.value != '') {
            if (text.value != '') {
               alert('gracias por el mensaje cracken ahora nos comunicamos')
            } else {
               alert('che falta el texto')
            }
         } else {
            alert('che falta el mail')
         }
      } else {
         alert('che falta el nombre')
      }
   })


}