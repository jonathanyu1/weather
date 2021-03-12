const capitalizeStr = (string) => {
    // solution: https://www.freecodecamp.org/news/how-to-capitalize-words-in-javascript/
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

const loadWeatherData = (weatherObj, units) =>{
    let degrees ='';
    let speed = '';
    if (units =='metric'){
        degrees='°C';
        speed='km/h';
    } else if (units =='imperial'){
        degrees='°F';
        speed='mph';
    }

    // Curr Weather: left side
    const weatherLocation = document.querySelector('#weatherLocation');
    const weatherDescription = document.querySelector('#weatherDescription');
    const weatherTemp = document.querySelector('#weatherTemp');
    const weatherIcon = document.querySelector('#weatherIcon');
    
    weatherLocation.innerHTML = `${weatherObj.city}, ${weatherObj.country}`;
    weatherDescription.innerHTML = `${capitalizeStr(weatherObj.description)}`;
    weatherTemp.innerHTML = `${Math.round(weatherObj.temp)} ${degrees}`;
    weatherIcon.src = `http://openweathermap.org/img/wn/${weatherObj.iconCode}@4x.png`;
    
    // Curr Weather: right side
    const feelsLikeTemp = document.querySelector('#feelsLikeTemp');
    const humidityTemp = document.querySelector('#humidityTemp');
    const windSpeedTemp = document.querySelector('#windSpeedTemp');
    feelsLikeTemp.innerHTML = `${Math.round(weatherObj.feelsLike)} ${degrees}`;
    humidityTemp.innerHTML = `${weatherObj.humidity}%`;
    // windSpeedTemp.innerHTML = `${Math.round(weatherObj.windSpeed * 10) / 10} ${speed}`;
    if (degrees=='°C'){
        // unit is in m/s, need to multiply by 3.6 to get km/h
        windSpeedTemp.innerHTML=`${Math.round(weatherObj.windSpeed*3.6* 10) / 10} ${speed}`;
    } else if (degrees=='°F'){
        windSpeedTemp.innerHTML = `${Math.round(weatherObj.windSpeed * 10) / 10} ${speed}`;
    }
    // daily weather:
    // convert timestamp to day solution: https://stackoverflow.com/a/56070916
    const allDays= ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    weatherObj.daily.forEach((day,index)=>{
        let dateTime = new Date(day.dt*1000); //get dateTime
        let convDayName = allDays[dateTime.getDay()];

        const dayName = document.querySelector(`#day${index}Name`);
        const dayHigh = document.querySelector(`#day${index}High`);
        const dayLow = document.querySelector(`#day${index}Low`);
        const dayIcon = document.querySelector(`#day${index}Icon`);
        dayName.innerHTML = `${convDayName}`;
        dayHigh.innerHTML = `${Math.round(day.temp.max)} ${degrees}`;
        dayLow.innerHTML = `${Math.round(day.temp.min)} ${degrees}`;
        dayIcon.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
    });
}

export {loadWeatherData}