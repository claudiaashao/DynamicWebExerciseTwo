import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { tsConditionalType } from '@babel/types';
import WeatherIcon from '../components/weatherIcon';
import PageWrapper from '../components/pageWrapper';

const apiKey = '04d289ca3e37184f9c1639c01af87fbc';

export default function Home(props) {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});
    const [cloudy, setCloudy] = useState ('');
    const [weatherType, setWeatherType] = useState('');

    const [success, isSuccess]=useState(false);
    const [successMessage, setSuccessMessage]=useState('');
    const [error, isError]=useState(false);
    const [errorMessage, setErrorMessage]=useState('');

    // morph data to allow us ot use it in our app
    function apiCallback(response){
        console.log('reponse', response);
        if (response.status !== 200){
            isError(true);
            setErrorMessage(`Weather Query: ${'Error'}`);
        }else{
            isSuccess(true);
            setSuccessMessage(`Weather Query: ${'Success'}`);
        }
        setWeather(response);
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(props.location.search);
        const cityParam = urlParams.get('city') ? urlParams.get('city') : '';
        setCity(cityParam);

        const query = `https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&units=metric&APPID=${apiKey}`;
        axios.get(query).then(response => apiCallback(response));
    }, []);

    useEffect(()=>{
        let cloudiness = weather.data && weather.data.clouds.all;
        setCloudy(cloudiness);

        let weatherType = weather.data && weather.data.weather[0].main;
        setWeatherType(weatherType);

    }, [weather]);

    return(
        <PageWrapper cloudy={cloudy}>
            <div>
                <div className="WeatherNav">
                    <a className={`WeatherNav__Item ${city==='Beijing' ? 'WeatherNav__Item--active': ''}`} href="/?city=Beijing">Beijing</a>
                    <a className={`WeatherNav__Item ${city==='Chicago' ? 'WeatherNav__Item--active': ''}`} href="/?city=Chicago">Chicago</a>
                    <a className={`WeatherNav__Item ${city==='London' ? 'WeatherNav__Item--active': ''}`} href="/?city=London">London</a>
                    <a className={`WeatherNav__Item ${city==='Miami' ? 'WeatherNav__Item--active': ''}`} href="/?city=Miami">Miami</a>
                    <a className={`WeatherNav__Item ${city==='New York' ? 'WeatherNav__Item--active': ''}`} href="/?city=New York">New York</a>
                    <a className={`WeatherNav__Item ${city==='Seoul' ? 'WeatherNav__Item--active': ''}`} href="/?city=Seoul">Seoul</a>
                </div>
            
                <div className="WeatherContent">
                    <h1> Weather in {city}</h1>
                    {error && <div className="errorMessage">{errorMessage}</div>}
                    {success && <div className="successMessage">{successMessage}</div>}
                    <WeatherIcon weatherValue={weatherType} />

                    <p> Weather Type = {weatherType} </p>
                    <p> Current Temperature = {weather.data && weather.data.main.temp}°C </p>
                    <p> High Temperature = {weather.data && weather.data.main.temp_max}°C </p>
                    <p> Low Temperature = {weather.data && weather.data.main.temp_min}°C </p>
                    <p> Cloudiness = {weather.data && weather.data.clouds.all}%</p>
                    <p> Humidity = {weather.data && weather.data.main.humidity}% </p>
                    <p> Wind Speed = {weather.data && weather.data.wind.speed}mph </p>
                </div>
            </div>

        </PageWrapper>
    );
}
