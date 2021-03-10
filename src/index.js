import {currentWeatherAPI, oneCallAPI } from './api.js';

const siteController = (()=>{
    let units = 'metric';
    const searchInput = document.querySelector('#searchInput');
    const searchBtn = document.querySelector('#btnSearch');

    const getData = async (searchValue) =>{
        try{
            let currentData = await currentWeatherAPI(`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=${units}&APPID=107629179ef66f70931a8e42d89f5115`);
            let oneCallData = await oneCallAPI(`https://api.openweathermap.org/data/2.5/onecall?lat=${currentData.lat}&lon=${currentData.lon}&units=${units}&appid=107629179ef66f70931a8e42d89f5115`);
            console.log(currentData);
            console.log(oneCallData);
        } catch (error){
            console.log('error: '+error);
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
    });

    searchInput.addEventListener('keypress', function (e){
        if (e.key ==='Enter'){
            getData(searchInput.value);
        }
    });

})();

