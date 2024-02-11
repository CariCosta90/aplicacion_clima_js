let apiKey = '90601eba776f5f9652c11cf7aa3be8ff'
let diferenciaDeKelvin =  (kelvin) => kelvin - 273.15;
let urlBase = 'https://api.openweathermap.org/data/2.5/weather'

//poner eventListener al boton de busqueda
let ciudadIngresada = document.getElementById('ciudadEntrada');
let botonBusqueda = document.getElementById('botonBusqueda');
let divDatosClima = document.getElementById('datosClima');

botonBusqueda.addEventListener("click", ()=> {
    const cityName = ciudadIngresada.value;
    if(cityName){        
    fetch(`${urlBase}?q=${cityName}&appid=${apiKey}`)
        .then(data =>  data.json())
        .then(data => mostrarDatosClima(data))
    }
})

//funcion para mostrar los datos del clima en la pantalla

function mostrarDatosClima(data){
    //linea para limpiar la ultima busqueda
    divDatosClima.innerHTML = '';

    const ciudad = data.name;
    const pais = data.sys.country;
    const temperaturaKelvin =data.main.temp;
    const tempteraturaCelcius = Math.round(diferenciaDeKelvin(temperaturaKelvin));	
    const descripcion = data.weather[0].description
    const icono = data.weather[0].icon

    
    const ciudadTitulo = document.createElement('h2');
    ciudadTitulo.textContent= `En la ciudad de ${ciudad}, ${pais}`;

    
    const ciudadTemperatura = document.createElement('p')
    ciudadTemperatura.textContent = `La temperatura es: ${tempteraturaCelcius}°C` 

    const ciudadIcono = document.createElement('img')
    ciudadIcono.setAttribute('src', `https://openweathermap.org/img/wn/${icono}@2x.png`)

    const ciudadDescripcion = document.createElement('p')
    ciudadDescripcion.textContent = `Descripcion: ${descripcion}`

    divDatosClima.appendChild(ciudadTitulo)
    divDatosClima.appendChild(ciudadTemperatura)
    divDatosClima.appendChild(ciudadIcono)
    divDatosClima.appendChild(ciudadDescripcion)
}

