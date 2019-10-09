import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain, faWind, faSun, faWater, faSmog, faCloudShowersHeavy, faCloud, faSnowflake, faBolt, faMeteor } from '@fortawesome/free-solid-svg-icons';

export default function WeatherIcon({weatherValue}){
    //at least 10 icons
    switch(weatherValue){
        case 'Drizzle':
            return (<FontAwesomeIcon icon={faCloudRain} />);
        case 'Rain':
            return (<FontAwesomeIcon icon={faCloudShowersHeavy} />);
        case 'Thunderstorm':
            return (<FontAwesomeIcon icon={faBolt} />);
        case 'Clear':
            return (<FontAwesomeIcon icon={faSun} />);
        case 'Wind':
            return (<FontAwesomeIcon icon={faWind} />);
        case 'Mist':
            return (<FontAwesomeIcon icon={faWater} />);
        case 'Fog' || 'Haze' || 'Dust':
            return (<FontAwesomeIcon icon={faSmog} />);
        case 'Clouds':
            return (<FontAwesomeIcon icon={faCloud} />);
        case 'Snow':
            return (<FontAwesomeIcon icon={faSnowflake} />);
        case 'Extreme':
            return (<FontAwesomeIcon icon={faMeteor} />);
        default: return <div>{weatherValue}</div> 
    }
}
