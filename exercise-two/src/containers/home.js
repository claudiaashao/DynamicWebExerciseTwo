import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { tsConditionalType } from '@babel/types';
import WeatherIcon from '../components/weatherIcon';
import PageWrapper from '../components/pageWrapper';

const apiKey = '04d289ca3e37184f9c1639c01af87fbc';

export default function Home(props) {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});

    const [success, isSuccess]=useState(false);
    const [successMessage, setSuccessMessage]=useState('');
    const [error, isError]=useState(false);
    const [errorMessage, setErrorMessage]=useState('');

    // morph data to allow us ot use it in our app
    function apiCallback(response){
        console.log('reponse', response);
        if (response.status !== 200){
            isError(true);
            setErrorMessage(`${response.state}: ${'Error'}`);
        }else{
            isSuccess(true);
            setSuccessMessage(`${response.state}: ${'Success'}`);
        }
        setWeather(response);
    }

    useEffect(()=>{
        const urlParams = new URLSearchParams(props.location.search);
        const cityParam = urlParams.get('city') ? urlParams.get('city') : '';
        setCity(cityParam);

        const query = `https://api.openweathermap.org/data/2.5/weather?q=${cityParam}&APPID=${apiKey}`;
        axios.get(query).then(response => apiCallback(response));
    }, []);

    return(
        <PageWrapper cloudy={weather.data && weather.data.clouds.all}>
            <div>
                <div className="WeatherNav">
                    <a className={`WeatherNav__Item ${city==='Chicago' ? 'WeatherNav__Item--active': ''}`} href="/?city=Chicago">Chicago</a>
                    <a className={`WeatherNav__Item ${city==='Seoul' ? 'WeatherNav__Item--active': ''}`} href="/?city=Seoul">Seoul</a>
                    <a className={`WeatherNav__Item ${city==='Miami' ? 'WeatherNav__Item--active': ''}`} href="/?city=Miami">Miami</a>
                    <a className={`WeatherNav__Item ${city==='London' ? 'WeatherNav__Item--active': ''}`} href="/?city=London">London</a>
                </div>
            
                <h1> Weather in {city}</h1>
                {error && <div className="errorMessage">Weathery Query: Failed</div>}
                {success && <div className="successMessage">Weathery Query: Successful</div>}
                <WeatherIcon weatherValue={weather.data && weather.data.weather[0].main} />

                <p> Weather Type = {weather.data && weather.data.weather[0].main} </p>
                <p> Current Temperature = {weather.data && weather.data.main.temp} </p>
                <p> High Temperature = {weather.data && weather.data.main.temp_max} </p>
                <p> Low Temperature = {weather.data && weather.data.main.temp_min} </p>
                <p> Cloudiness = {weather.data && weather.data.clouds.all} %</p>
                <p> Humidity = {weather.data && weather.data.main.humidity} </p>
                <p> Wind Speed = {weather.data && weather.data.wind.speed} </p>
            </div>

        </PageWrapper>
    );
}
