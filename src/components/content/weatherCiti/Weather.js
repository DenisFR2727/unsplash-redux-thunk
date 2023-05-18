import { useState,useEffect } from "react";
import axios from "axios";
import "./weather.css";

const Weather = () => {
      const [data, setData] = useState({});
      const [location, setLocation] = useState('');

      const _apikey_id = "d4dd3e163352a480d430df1a82f1a95e"
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${_apikey_id}`;
      console.log(data)

useEffect(() => {
    searchLocation()
;},[])

const searchLocation = (event) => {
      if(event?.key === 'Enter'){
        axios.get(url).then((response) => {
             setData(response.data)
        })
        setLocation("");
      }
}
    return (
        <div className="container">
              <h3> Weather city </h3>
              <div className="search">
                   <input 
                        type="text" 
                        onChange={event => setLocation(event.target.value)}
                        placeholder="Enter location"
                        value={location}
                        onKeyUp={searchLocation}/>
              </div>
              <div className="content_weather">
                <div className="location">
                    <p>citi: {data.name}</p>
                </div>
                <div className="temp">
                    {data.main ? <h2>{data.main.temp} F</h2> : null}
                </div>
                <div className="decription">
                    {data.weather ? <p>{data.weather[0].description}</p> : null}
                </div>
                <div className="feels">
                    {data.main ?  <p>{data.main.feels_like}</p> : null}
                    <p>Feels Like</p>
                </div>
                <div className="humidyti">
                    {data.main ? <p>{data.main.humidity}</p> : null}
                    <p>20%</p>
                </div>
              </div>
        </div>
    )
}
export default Weather;