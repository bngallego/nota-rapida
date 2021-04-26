import Swal from '../node_modules/sweetalert2/src/sweetalert2.js'

//VARIABLES
const formulario = document.querySelector('#formulario');
const listaTareas = document.querySelector('#lista-tareas');
const eliminarTodo = document.querySelector('#eliminarTodo');
const btnEmojis = document.querySelector('#emojis');
const NumTareas = document.querySelector('.pendientes');
const cont_pendiente =  document.querySelector('.cont_pendiente');
const contenedor_flex = document.querySelector('#cont_flex');
let tareas = [];

//Eventlistener
eventos();
function eventos(){
    formulario.addEventListener('submit', agregarTarea);
    document.addEventListener('DOMContentLoaded', () => {
        tareas = JSON.parse( localStorage.getItem('tareas')) || [];
        crearHTML();
    });
    eliminarTodo.addEventListener('click', EliminarTodo);
    btnEmojis.addEventListener('click', AgregarEmojis);
}

  //SONIDO
  const sonido = new Audio();
  sonido.src = "click.mp3";

//Funciones
function agregarTarea(e) {
    e.preventDefault();
    const input = document.querySelector("input[type='text']").value;
    //validacion
    if (input === '') {
        mostrarerror();
        return; //evita que se ejecute otra accion
    }

    const tareasObjeto = {
        id: Date.now(),
        input
    }
    tareas = [...tareas, tareasObjeto];

    crearHTML();
    mensajeExito()
    formulario.reset();
}

//muestra el listado de tareas
function crearHTML(){
        limpiarHTML();

    if (tareas.length > 0) {

        tareas.forEach(input => {
            const btnDelete = document.createElement('img');
            btnDelete.src = 'img/bxs-trash.svg';
            btnDelete.classList.add('text-base', 'uppercase', 'focus:outline-none', 'cursor-pointer' ,'float-right');
            //funcion de eliminar
            btnDelete.onclick = ( () => {
                borrarTarea(input.id);
            })
            //crear el html
            let li = document.createElement('li');
            li.innerHTML = input.input
            li.style.listStyle = 'none';
            li.appendChild(btnDelete);
            listaTareas.appendChild(li);
            li.classList.add('rounded-lg', 'mt-2.5', 'bg-gray-200', 'px-2', 'py-2', 'text-gray-700', 'dark:bg-gray-700', 'dark:text-gray-300', 'overflow-hidden');
        });
    }
    btnClear();
    sincronizarStorage();
}
//agrega las tareas al local storage
function sincronizarStorage(){
    localStorage.setItem('tareas', JSON.stringify(tareas));
}
//btn de eliminar todo
function btnClear(){
  if (tareas.length >=2) {
      eliminarTodo.classList.remove('hidden');
      contenedor_flex.classList.add('lg:flex-row-reverse');
      cont_pendiente.classList.remove('float-left');
    }else{
      eliminarTodo.classList.add('hidden');
      contenedor_flex.classList.remove('lg:flex-row-reverse');
      cont_pendiente.classList.add('float-left');
  }
}
//eliminar una tarea
function borrarTarea(id){
    tareas = tareas.filter(input => input.id !== id);
    mensajeDelete();
    crearHTML();
}
//funcion emojis
function AgregarEmojis(){
  const input = document.querySelector('#input');
  let picker = new EmojiButton({
      position:'left-start'
  })
  picker.on('emoji' , function(emoji){
      input.value +=emoji;
  })
  emojis.addEventListener('click', function(){
      picker.pickerVisible ? picker.hidePicker() : picker.showPicker(input);
  })
  }

//clear html(tareas)
function limpiarHTML(){
    while(listaTareas.firstChild){
        listaTareas.removeChild(listaTareas.firstChild);
    }
    NumTareas.textContent  = tareas.length;
}
//clear local storage
function EliminarTodo(){
  eliminarTodo.classList.add('hidden');
  tareas = [];
  localStorage.clear('tareas');
  limpiarHTML();
}
//Dark mode
(function(){
const boton = document.querySelector('#boton');
const html = document.querySelector('html');
const img = document.querySelector('#image');

boton.addEventListener('click', () => {
    html.classList.toggle('dark');
    if (html.classList.contains('dark')) {
        localStorage.setItem('dark-mode', 'true');
        img.src = 'img/bxs-sun.svg';
    }else{
        localStorage.setItem('dark-mode', 'false');
        img.src = 'img/bxs-moon.svg';
    }
});

if (localStorage.getItem('dark-mode') === 'true') {
    html.classList.add('dark');
    img.src = 'img/bxs-sun.svg';
}else{
    html.classList.remove('dark');
    img.src = 'img/bxs-moon.svg';
}
})();

//mensaje de error
function mostrarerror(){
  const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})
Toast.fire({
  icon: 'error',
  title: '¡No se puede agregar un tarea vacia!'
})
}
//mensaje de exito
function mensajeDelete(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: '¡Eliminado con exito!'
  })
}

function mensajeExito(){
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: '¡Agregado con éxito!'
  })
}
