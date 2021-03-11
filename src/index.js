import {currentWeatherAPI, oneCallAPI } from './api.js';
import {loadWeatherData} from './dom.js';


const siteController = (()=>{
    let units = 'metric';
    let currCity = 'toronto';
    const searchInput = document.querySelector('#searchInput');
    const searchBtn = document.querySelector('#btnSearch');
    const btnChangeUnit = document.querySelector('#btnChangeUnit');
    const errorInput = document.querySelector('#errorInput');

    const getData = async (searchValue) =>{
        try{
            let currentData = await currentWeatherAPI(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=${units}&APPID=107629179ef66f70931a8e42d89f5115`);
            let oneCallData = await oneCallAPI(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.lat}&lon=${currentData.lon}&units=${units}&appid=107629179ef66f70931a8e42d89f5115`);
            console.log(currentData);
            console.log(oneCallData);
            oneCallData.city = currentData.city;
            oneCallData.country = currentData.country;
            console.log(oneCallData);
            currCity = currentData.city;
            loadWeatherData(oneCallData, units);
            errorInput.style.visibility='hidden';
        } catch (error){
            console.log('error: '+error);
            errorInput.style.visibility='visible';
            // add error message under search bar
        }
        
    }

    // initialize site with 'toronto' as base city

    const siteInit = (()=>{
        getData('toronto');
    })();
    
    // search bar event listeners

    searchBtn.addEventListener('click', ()=>{
        console.log(searchInput.value);
        getData(searchInput.value);
        searchInput.value='';
    });

    searchInput.addEventListener('keypress', function (e){
        if (e.key ==='Enter'){
            getData(searchInput.value);
            searchInput.value='';
        }
    });

    btnChangeUnit.addEventListener('click', function(e){
        // change to opposite unit
        const metricLabel = document.querySelector('#metricLabel');
        const imperialLabel = document.querySelector('#imperialLabel');
        if (units=='metric'){
            units = 'imperial';
            metricLabel.style.fontWeight='normal';
            imperialLabel.style.fontWeight='1000';
        } else if (units=='imperial'){
            units = 'metric';
            metricLabel.style.fontWeight='1000';
            imperialLabel.style.fontWeight='normal';
        }
        // call getData using currCity to re-display in new units
        getData(currCity);
    });

})();

