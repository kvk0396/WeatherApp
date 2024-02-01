import React from 'react'
import './WeatherApp.css'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import search_icon from "../Assets/search.png"
import clear from "../Assets/clear.png"
import cloud from "../Assets/cloud.png"
import drizzle from "../Assets/drizzle.png"
import rain from "../Assets/rain.png"
import snow from "../Assets/snow.png"
import wind_icon from "../Assets/wind.png"
import humidity_icon from "../Assets/humidity.png"
export default function WeatherApp(){

  let API_KEY = "d44f09ab82732adcdf7ed0f0c6312baa";
  let [humidity,setHumidity]=useState(64);
  let [wind,setWind]=useState(18);
  let [temp,setTemp]=useState(24);
  let [location,setLocation]=useState("Hyderabad");
  const [wicon,setWicon] = useState(cloud);

  const search = async () => {
      const element = document.getElementsByClassName("cityInput")
      console.log(element)
      if(element[0].value===""){
        return 0;
      }
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${API_KEY}`

      let response= await fetch(url);
      let data = await response.json();
      console.log(data);
      setHumidity(data.main.humidity);
      setWind(Math.floor(data.wind.speed));
      setTemp(Math.floor(data.main.temp));
      setLocation(data.name);

      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear);
      }
      else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloud);
      }
      else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzle);
      }
      else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzle);
      }
      else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain);
      }
      else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(rain);
      }
      else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow);
      }
      else 
        setWicon(clear);
  }

  const usersLocation=async(latitude,longitude)=>{
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=Metric&appid=${API_KEY}`;

    const response=await fetch(url);
    const data=await response.json();
    console.log(data);
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      setHumidity(data.main.humidity);
      setWind(Math.floor(data.wind.speed));
      setTemp(Math.floor(data.main.temp));
      setLocation(data.name);

      if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n"){
        setWicon(clear);
      }
      else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n"){
        setWicon(cloud);
      }
      else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n"){
        setWicon(drizzle);
      }
      else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n"){
        setWicon(drizzle);
      }
      else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n"){
        setWicon(rain);
      }
      else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n"){
        setWicon(rain);
      }
      else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n"){
        setWicon(snow);
      }
      else 
        setWicon(clear);

      
    } catch (error) {
      console.error("Error fetching weather by location", error);
     
    }
  };

  const updateWeather = ()=>{
    
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const {latitude,longitude}=position.coords;
          usersLocation(latitude,longitude);
        },
        (error) => {
          alert("Enable location to know weather at your location ");
        }
      );
    
    
    
  }

  useEffect(() => {
    updateWeather(); 
  }, []);

    return (
        <div className='container'>
            <div className='top-bar'>
                <input type="text" className='cityInput' placeholder='Search'/>
                <div className='search-icon' onClick={()=>{search()}}>
                    <img src={search_icon} alt="" />
                </div>
                <button className='loc-button' onClick={updateWeather}>📍LOC</button>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">{temp}°c</div>
            <div className="weather-location">{location}</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="humidity-percent">{humidity}%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon'/>
                    <div className="data">
                        <div className="wind-Speed">{wind}km/hr</div>
                        <div className="text">WindSpeed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}