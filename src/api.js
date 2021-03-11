const currentWeatherAPI = async (url) => {
    try{
        const response = await fetch(url, {mode: 'cors'});
        const currentData = await response.json();
        const currentDataObj = {};
        currentDataObj.city = currentData.name;
        currentDataObj.country = currentData.sys.country;
        currentDataObj.lat = currentData.coord.lat;
        currentDataObj.lon = currentData.coord.lon;
        return currentDataObj;
    } catch (error){
        console.log('error: '+error);
        // show error message on
    }
}

const oneCallAPI = async (url) =>{
    try{
        const response = await fetch(url, {mode: 'cors'});
        const oneCallData = await response.json();
        const oneCallDataObj = {};
        oneCallDataObj.temp = oneCallData.current.temp;
        oneCallDataObj.description = oneCallData.current.weather[0].description;
        oneCallDataObj.iconCode = oneCallData.current.weather[0].icon;
        oneCallDataObj.feelsLike = oneCallData.current.feels_like;
        oneCallDataObj.humidity = oneCallData.current.humidity;
        oneCallDataObj.windSpeed = oneCallData.current.wind_speed;
        // remember to include values for daily stuff
        oneCallDataObj.daily = oneCallData.daily;
        // removes the first day from daily, which is today's weather
        oneCallDataObj.daily.shift();
        return oneCallDataObj;
    }catch (error){
        console.log('error: '+error);
    }
}

export { currentWeatherAPI, oneCallAPI}