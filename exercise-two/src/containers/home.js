import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { tsConditionalType } from '@babel/types';

const apiKey = '04d289ca3e37184f9c1639c01af87fbc'

export default function Home() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});

    function queryWeatherAPI(queryCity){
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${queryCity}&APPID=${apiKey}`)
        .then(function(response){
            console.log('response', response);
            setWeather(response);
            return response;
        })
        .catch(function(error){
            console.log('error', error);
            return error;
        })
    }

    useEffect(()=>{
        setCity('London');
        queryWeatherAPI('London');
        console.log('weather test', queryWeatherAPI('London'));
    }, []);

    console.log('weather', weather);

    return(
        <div>
            <h1> Weather in {city}</h1>
            <p> Humidity = {weather.data && weather.data.main.humidity} </p>
        </div>
    );
}
