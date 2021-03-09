const currentWeather = async (url) => {
    try{
        const response = await fetch(url, {mode: 'cors'});
        const currentData = await response.json();
        console.log(currentData);
        console.log(currentData.coord);
        console.log(currentData.coord.lat);
        console.log(currentData.coord.lon);
        return currentData;
    } catch (error){
        console.log('error: '+error);
        // show error message on
    }
}