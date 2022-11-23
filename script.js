const botonSearch = document.getElementById('botonSearch');
let peliculasBuscadas = [];
let userOnline = document.getElementById('userOnline');

window.addEventListener('offline', e =>{
    console.log('usuario desconecta3');
    userOnline.innerHTML = `<p class="pOffline fs-2 text-center">Se ha desconectado de la red</p>`;
});

botonSearch.addEventListener('click', (e) => {
    
    const search = document.getElementById('search');
    fetch(`https://www.omdbapi.com/?apikey=3e59d425&s=${search.value}`)
    .then(response => response.json())
    .then(data => {
        peliculasBuscadas = data.Search;
        crearCardPelicula(data.Search)
        console.log(data);
    });

})

const crearCardPelicula = async (listaPeliculas) => {
    const contenedorPeliculas = document.getElementById('contenedor-peliculas');
    contenedorPeliculas.innerHTML = '';
    for(pelicula of listaPeliculas){
        await fetch(`http://www.omdbapi.com/?apikey=3e59d425&i=${pelicula.imdbID}&plot=short`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let card = `
            <div class="mb-3 d-flex" id="card">
                <img src=${pelicula.Poster} class="card-img-top" id="imgPelicula" alt="${pelicula.Title}">
                <div class="">
                    <h2 class="card-title my-2 fw-bold" id="tituloPelicula">${pelicula.Title}</h2>
                    <p class="card-text text-light fs-3">${data.Plot}</p>
                    <button class="botonFavoritos button" id="${pelicula.imdbID}">Agregar a favoritos</button>
                </div>
            </div>
            `
            contenedorPeliculas.innerHTML += card;
        });

    }
    peliculasBuscadas.forEach(pelicula =>{
        document.getElementById(pelicula.imdbID).addEventListener('click', () => {
            agregarFavoritos(pelicula);
        })
    })
}

const agregarFavoritos = (pelicula) => {
    if(localStorage.getItem('peliculasFavoritas') == null){
        localStorage.setItem('peliculasFavoritas', JSON.stringify([]));
    }
    const peliculasFavoritas = JSON.parse(localStorage.getItem('peliculasFavoritas'));
    const encontrePelicula = peliculasFavoritas.find(p =>{
        return p.imdbID === pelicula.imdbID;
    })
    if(encontrePelicula){
        return;
    }
    peliculasFavoritas.push(pelicula);
    localStorage.setItem('peliculasFavoritas', JSON.stringify(peliculasFavoritas));
}
