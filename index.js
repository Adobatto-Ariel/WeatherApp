const API_KEY = "2065a5d17dec65d54a1f9a150be46f12";

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${("0" + (date.getMonth() + 1)).slice(
        -2
    )}-${date.getFullYear()}`;
    //Con slice, si ya tiene dos caracteres le sacamos el 0, sino se lo dejamos.
};

const setWeatherData = (data) => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp,
        date: getDate(),
    };

    //Asigno la informacion a cada elemento
    Object.keys(weatherData).forEach((key) => {
        document.getElementById(key).textContent = weatherData[key];
    });
};

//Recibe la data del usuario - La posicion
//Agregando units=metric a la URL, pasamos la temperatura de ºF a ºC
const log = (position) => {
    const { latitude, longitude } = position.coords;
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
    )
        .then((response) => response.json())
        .then((data) => setWeatherData(data))

        .then((position) => console.log(position));
};

//Obtenemos ubicacion del usuario - coordenadas
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(log);
};
