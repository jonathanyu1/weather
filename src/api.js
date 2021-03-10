const currentWeatherAPI = async (url) => {
    try{
        const response = await fetch(url, {mode: 'cors'});
        const currentData = await response.json();
        console.log(currentData);
        const currentDataObj = {};
        currentDataObj.name = currentData.name;
        currentDataObj.country = currentData.sys.country;
        currentDataObj.lat = currentData.coord.lat;
        currentDataObj.lon = currentData.coord.lon;
        console.log('currentDataObj');
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
        console.log(oneCallData);
        const oneCallDataObj = {};
        oneCallDataObj.temp = oneCallData.current.temp;
        oneCallDataObj.description = oneCallData.current.weather[0].description;
        oneCallDataObj.iconCode = oneCallData.current.weather[0].icon;
        oneCallDataObj.feelsLike = oneCallData.current.feels_like;
        oneCallDataObj.humidity = oneCallData.current.humidity;
        oneCallDataObj.windSpeed = oneCallData.current.wind_speed;
        // remember to include values for daily stuff
        oneCallDataObj.daily = oneCallData.daily;
        return oneCallDataObj;
    }catch (error){
        console.log('error: '+error);
    }
}

export { currentWeatherAPI, oneCallAPI}