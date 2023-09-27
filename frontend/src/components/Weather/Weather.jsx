import React, { useState, useEffect } from 'react';
import './Weather.css';
import clear from '../../assets/images/clear.png';
import rain from '../../assets/images/rain.png';
import snow from '../../assets/images/snow.png';
import cloud from '../../assets/images/cloud.png';
import mist from '../../assets/images/mist.png';

const WeatherComponent = ({ apiKey, trail }) => {
    const [weatherForecast, setWeatherForecast] = useState([]);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const cityName = trail.properties.city;

        fetch(`http://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${apiKey}&q=${cityName}`)
            .then(response => response.json())
            .then(json => {
                if (json.cod === '404') {
                    setHasError(true);
                    return;
                }

                const filteredForecast = json.list.filter((item, index) => index % 8 === 0).slice(0, 4);
                setWeatherForecast(filteredForecast);
            })
            .catch(error => {
                console.error('Error:', error);
                setHasError(true);
            });

    }, [apiKey, trail]);

    if (hasError) {
        return (
            <div className="not-found fadeIn">
                {/* ... your 404 content here */}
            </div>
        );
    }

    return (
        <div className="weather-wrapper">
        <div className="weather-section">
            {weatherForecast.map((forecast, index) => {
                const forecastDate = new Date(forecast.dt_txt);
                const dayOfWeek = forecastDate.toLocaleDateString('en-US', { weekday: 'long' });
                let weatherIcon;

                switch (forecast.weather[0].main) {
                    case 'Clear':
                        weatherIcon = clear;
                        break;
                    case 'Rain':
                        weatherIcon = rain;
                        break;
                    case 'Snow':
                        weatherIcon = snow;
                        break;
                    case 'Clouds':
                        weatherIcon = cloud;
                        break;
                    case 'Mist':
                        weatherIcon = mist;
                        break;
                    default:
                        weatherIcon = '';
                        break;
                }

                return (
                    <div key={index} className="forecast-item fadeIn">
                        <img id="weather-image" src={weatherIcon} alt={forecast.weather[0].main} />
                        <p className="temperature">{parseInt(forecast.main.temp)}°F</p>
                        <h4 className="weather-header">{dayOfWeek}</h4>
                    </div>
                );
            })}
        </div>
        </div>
    );
}

export default WeatherComponent;
