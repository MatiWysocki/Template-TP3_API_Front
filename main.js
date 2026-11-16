
let personajes = [];

const ids = [
  70, 149, 213, 332, 346, 620, 644, 655, 659, 720,
  38, 63, 106, 107, 112, 165, 194, 196, 204, 225,
  226, 263, 275, 298, 309, 313, 370, 423, 579, 717
];

const container = document.getElementById("personajeContainer");

ids.forEach(id => {

  fetch(`https://superheroapi.com/api.php/ac76e93de878ce0c65e6186a68e0bee5/${id}`)
    .then(response => response.json())
    .then(data => {

      console.log(data);

      if (data.response === "success") {
        personajes.push(data);
        filtrar();
      }

    })
    .catch(error => {
      console.error("Error al leer la API:", error);
    });

});

function mostrarPersonajes(lista) {

  container.innerHTML = "";

  lista.forEach(personaje => {
    container.innerHTML +=
    `
    <article class="card">
      <img src="${personaje.image.url}">

      <h2>${personaje.name}</h2>

      <p>Editorial: ${personaje.biography.publisher}</p>
      <p>Alineación: ${personaje.biography.alignment}</p>
      <p>Género: ${personaje.appearance.gender}</p>

      <p>Inteligencia: ${personaje.powerstats.intelligence}</p>
      <p>Fuerza: ${personaje.powerstats.strength}</p>
      <p>Velocidad: ${personaje.powerstats.speed}</p>
    </article>
    `
  })
}

const buscador = document.getElementById("buscador");
const botonBuscar = document.getElementById("buscarPersonaje");

botonBuscar.addEventListener("click", buscarPersonajes);

function buscarPersonajes() {

  const nombre = buscador.value.trim();

  if (nombre === "") {
    filtrar();
    return;
  }

  fetch(`https://superheroapi.com/api.php/ac76e93de878ce0c65e6186a68e0bee5/search/${nombre}`)
    .then(response => response.json())
    .then(data => {

      console.log(data);

      if (data.response === "success") {
        personajes = data.results;
      } else {
        personajes = [];
      }

      filtrar();

    })
    .catch(error => {
      console.error("Error al buscar personajes:", error);
    });

}

const filtroEditorial = document.getElementById("filtroEditorial");
const filtroAlineacion = document.getElementById("filtroAlineacion");
const filtroGenero = document.getElementById("filtroGenero");

filtroEditorial.addEventListener("change", filtrar);
filtroAlineacion.addEventListener("change", filtrar);
filtroGenero.addEventListener("change", filtrar);

function filtrar() {

  const personajesFiltrados = personajes.filter(personaje => {

    return personaje.biography.publisher.includes(filtroEditorial.value)
    && personaje.biography.alignment.includes(filtroAlineacion.value)
    && personaje.appearance.gender.includes(filtroGenero.value)

  });

  mostrarPersonajes(personajesFiltrados);
}
//Ivo, supuestamente tengo q poner el token que me tira la web, así q no se si vos lo vas a poder ver. Si queres te muestro que me funciona a mí.