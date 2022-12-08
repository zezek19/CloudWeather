let lon;
let lat;
let inputPais = document.getElementById("inputPais");
let buscador = document.getElementById("buscador");

let temperaturaValor = document.getElementById("temperaturaValor");
let temperaturaDescripcion = document.getElementById("temperaturaDescripcion");
let ubicacion = document.getElementById("ubicacion");
let iconoAnimado = document.getElementById("iconoAnimado");

let maxTemp = document.getElementById("maxTemp");
let minTemp = document.getElementById("minTemp");

let presion = document.getElementById("presion");
let sensacionTermica = document.getElementById("sensacionTermica");
let vientoVelocidad = document.getElementById("vientoVelocidad");

inputPais.addEventListener("keyup", function (event) {
  event.preventDefault();
  if (event.code === "Enter") {
    buscador();
  }
});




window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((posicion) => {
      // console.log(posicion.coords.latitude)
      lon = posicion.coords.longitude;
      lat = posicion.coords.latitude;

      let urlUbicacionActual = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=es&units=metric&appid=abaeb765f03b7fdf765feba1ecffe1b2`;

      getData(urlUbicacionActual);
    });
  }
});

function getData(url) {
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //TEMPERATURA VALOR
      let temp = Math.round(data.main.temp);
      temperaturaValor.textContent = `${temp} °C`;
      console.log(data);

      //DESCRIPCION
      let desc = data.weather[0].description;
      temperaturaDescripcion.textContent = desc.toUpperCase();

      //UBICACION DE LA CIUDAD
      let ubi = data.name;
      ubi = ubi.toUpperCase();
      ubicacion.textContent = ubi;

      //VELOCIDAD DEL VIENTO
      vientoVelocidad.textContent = `Vel. viento: ${data.wind.speed} M/s`;

      //TEMPERATURA MAXIMA
      let max = Math.round(data.main.temp_max);
      maxTemp.textContent = `${max} °C`;

      //TEMPERATURA MINIMA
      let min = Math.round(data.main.temp_min);
      minTemp.textContent = `${min} °C`;

      //SENSACION TERMICA
      let sensacion = Math.round(data.main.feels_like);
      sensacionTermica.textContent = `Sensación Térmica: ${sensacion} °C`;

      //PRESION ATMOSFERICA
      presion.textContent = `Presión Atmosférica: ${data.main.pressure} hPa`;

      // iconos animados
      switch (data.weather[0].main) {
        case "Thunderstorm":
          iconoAnimado.src = "animated/thunder.svg";
          console.log("TORMENTA");
          break;
        case "Drizzle":
          iconoAnimado.src = "animated/rainy-2.svg";
          console.log("LLOVIZNA");
          break;
        case "Rain":
          iconoAnimado.src = "animated/rainy-7.svg";
          console.log("LLUVIA");
          break;
        case "Snow":
          iconoAnimado.src = "animated/snowy-6.svg";
          console.log("NIEVE");
          break;
        case "Clear":
          iconoAnimado.src = "animated/day.svg";
          console.log("LIMPIO");
          break;
        case "Atmosphere":
          iconoAnimado.src = "animated/weather.svg";
          console.log("ATMOSFERA");
          break;
        case "Clouds":
          iconoAnimado.src = "animated/cloudy-day-1.svg";
          console.log("NUBES");
          break;
        default:
          iconoAnimado.src = "animated/cloudy-day-1.svg";
          console.log("por defecto");
      }
    })

    .catch((error) => {
      Swal.fire({
        title: "Error!",
        text: "Esta ciudad no existe",
        icon: "error",
        timer: 2000,
        heightAuto: false,
      });
    });
}

buscador = () => {
  nombrePais = inputPais.value;

  // VERIFICAMOS SI HAY ESPACIOS EN BLANCO
  let espacio = /^\s*$/.test(nombrePais)

  if (nombrePais.length == 0 || espacio ) {
    Swal.fire({
      title: "Error!",
      text: "Ingresa una ciudad",
      icon: "error",
      timer: 2000,
      heightAuto: false,
    });
  } else {
    let urlCiudad = `https://api.openweathermap.org/data/2.5/weather?q=${nombrePais}&lang=es&units=metric&appid=abaeb765f03b7fdf765feba1ecffe1b2`;
    getData(urlCiudad);
  }
};


