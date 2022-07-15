//Variables
const listaCursos = document.querySelector('#lista-cursos');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosCarrito = [];

cargarEventListeners();

function cargarEventListeners(){
    listaCursos.addEventListener('click', agregarCurso);
    contenedorCarrito.addEventListener('click', eliminarCurso);
    btnVaciarCarrito.addEventListener('click', () => {
        articulosCarrito = [];
        sincronizarLocalStorage();
        limpiarHTML();
    });

    document.addEventListener('DOMContentLoaded', (e) => {

        articulosCarrito = JSON.parse(localStorage.getItem('articulosCarrito'))??[];
        carritoHTML();
    });
};

function agregarCurso(e){
    
    e.preventDefault();
    
    if (e.target.classList.contains('agregar-carrito')){
        // console.log('Agregando al carrito...');
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerCurso(cursoSeleccionado);
    };
};

function eliminarCurso(e){

    if(e.target.classList.contains('borrar-curso')){
        // console.log('Eliminando curso...');
        const cursoSeleccionado = e.target.getAttribute('data-id');

        articulosCarrito = articulosCarrito.filter(articulo => {
            if(articulo.id === cursoSeleccionado){

                if(articulo.cantidad > 1){
                    articulo.cantidad--;
                    return articulo;
                }else{
                    return false; //no retorna articulo eliminado
                };

            }else{
                return articulo;//retorna articulo
            };
        });

        sincronizarLocalStorage();
        carritoHTML();

    };
};

function leerCurso(curso){
    console.log(curso);

    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    };

    //Revisa si el articulo existe
    const existe = articulosCarrito.some(articulo => articulo.id === infoCurso.id);

    if(existe){

        const articulos = articulosCarrito.map(articulo => {
            if( articulo.id === infoCurso.id ){
                articulo.cantidad++;
                return articulo; //retorna articulo actualizado
            }else{
                return articulo;//retorna articulo
            }
        });

        articulosCarrito = [...articulos];

    }else{

        //Agregamos articulos al carrito
        articulosCarrito = [...articulosCarrito];
        articulosCarrito.push(infoCurso);
    };

    console.log(articulosCarrito);

    sincronizarLocalStorage();
    carritoHTML();

};

function carritoHTML(){

    limpiarHTML();

    articulosCarrito.forEach(articulo => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${articulo.imagen}" width=100>
            </td>
            <td>
                ${articulo.titulo}
            </td>
            <td>
                ${articulo.precio}
            </td>
            <td>
                ${articulo.cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${articulo.id}"> X </a>
            </td>
    `;

    contenedorCarrito.appendChild(row);

   });
}

function limpiarHTML(){
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    };
};

function sincronizarLocalStorage(){

    localStorage.setItem('articulosCarrito', JSON.stringify(articulosCarrito));

};
