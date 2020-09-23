function qs(elemento) {
   return document.querySelector(elemento);
}

window.addEventListener('load', function () {

   let campoName = qs('input#name')
   let campoDescripcion = qs('input#description')
   let campoCategory = qs('input#category')
   let campoPrecio = qs('input#price')
   let campoIngredients = qs('input#ingredients')
   let campoImagen = qs('input#image')
   let errores = {};

   campoName.addEventListener('blur', function () {
      // alert("hoooooola")
      // console.log("Estas saliendo del campo email")
      if (campoName.value == campoName.value) {
         alert("Holaaaaaaa")
         errores.email = "Debés ingresar un mail válido"
      }
   })
})