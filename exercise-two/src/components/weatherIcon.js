import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudRain } from '@fortawesome/free-solid-svg-icons';
import { faWind } from '@fortawesome/free-solid-svg-icons';
import { faSun } from '@fortawesome/free-solid-svg-icons';

export default function WeatherIcon({weatherValue}){
    //at least 10 icons
    switch(weatherValue){
        case 'Rain':
            return (
                <FontAwesomeIcon icon={faCloudRain} className='WeatherIcon' />
            );
        case 'Sunny':
            return (<FontAwesomeIcon icon={faSun} />);
        case 'Wind':
            return (<FontAwesomeIcon icon={faWind} />);
        default: return <div>{weatherValue}</div> 
    }
}
