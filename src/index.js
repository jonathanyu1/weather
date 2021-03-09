console.log('hello');

const currentWeatherAPI = async (url) => {
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

const oneCallAPI = async (url) =>{
    try{
        const response = await fetch(url, {mode: 'cors'});
        const oneCallData = await response.json();
        console.log(oneCallData);
        return oneCallData;
    }catch (error){
        console.log('error: '+error);
    }
}

const getData = async () =>{
    let currentData = await currentWeatherAPI(`https://api.openweathermap.org/data/2.5/weather?q=toronto&units=metric&APPID=107629179ef66f70931a8e42d89f5115`);
    let oneCallData = await oneCallAPI(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.coord.lat}&lon=${currentData.coord.lon}&units=metric&appid=107629179ef66f70931a8e42d89f5115`);
    console.log(currentData);
    console.log(oneCallData);
}

getData();