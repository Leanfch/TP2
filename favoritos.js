const contenedorPeliculas = document.getElementById('contenedor-peliculas');
let userOnline = document.getElementById('userOnline');

window.addEventListener('offline', e =>{
    console.log('usuario desconecta3');
    userOnline.innerHTML = `<p class="pOffline fs-2 text-center">Se ha desconectado de la red</p>`;
});

const mostrarPeliculas = (peliculas) => {
    contenedorPeliculas.innerHTML = '';
    const listadoPeliculas = peliculas ? peliculas : JSON.parse(localStorage.getItem('peliculasFavoritas'));
    for(pelicula of listadoPeliculas){
            let card = `
                <div class="card col-xs col-sm-12 col-md-12 col-lg-6 col-xl-4 col-xxl-4 text-light m-2 cardFavorito">
                    <img src="${pelicula.Poster}" class="card-img-top" alt="${pelicula.Title}">
                        <h2 class="card-title" id="titleFav">${pelicula.Title}</h2>
                        <button id="${pelicula.imdbID}" class="botonBorrarFav">Borrar favorito</button>
                </div>
            `
            contenedorPeliculas.innerHTML += card;
            


    }
    listadoPeliculas.forEach(pelicula => {
        document.getElementById(pelicula.imdbID).addEventListener('click', () => {
            borrarPelicula(pelicula);

        })
    });
}
const borrarPelicula = (pelicula) => {
    const listadoPeliculas = JSON.parse(localStorage.getItem('peliculasFavoritas'));
    const peliculasFiltradas = listadoPeliculas.filter(p => {
        return p.imdbID !== pelicula.imdbID;
    })
    localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFiltradas));
    mostrarPeliculas(peliculasFiltradas);
}
mostrarPeliculas();