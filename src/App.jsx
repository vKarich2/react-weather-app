import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {IoMdSearch} from 'react-icons/io';
import {BsEye, BsWater, BsThermometer, BsWind } from 'react-icons/bs';
import {TbTemperatureCelsius} from 'react-icons/tb';
import {ImSpinner8} from 'react-icons/im';

import Clouds from './images/clouds.svg';
import Haze from './images/haze.svg';
import Rain from './images/rain.svg';
import Clear from './images/clear.svg';
import Drizzle from './images/drizzle.svg';
import Snow from './images/snow.svg';
import Thunderstorm from './images/thunderstorm.svg';

const API_KEY = '32e6e7d2a3ddf8c626ebdd37d4c9252e';

const App = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState('Cologne');
  const [inputValue, setInputValue] = useState('');
  const [animate, setAnimate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');


  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(inputValue);

    if (inputValue !== '') {
      setLocation(inputValue);
    }

    const input = document.querySelector('input');

    if (input.value === '') {
      setAnimate(true);
      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }

    input.value = ''; 

    e.preventDefault();
  };

  useEffect(() => {

    setLoading(true);

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`;

    axios
    .get(URL)
    .then((res) => {
      setTimeout(() => {
        setData(res.data);
        setLoading(false);
      }, 1000);
    }).catch(err => {
      setLoading(false);
      setErrorMsg(err);
    });
  }, [location]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMsg('');
    }, 2000);
    return () => clearTimeout(timer);

  }, [errorMsg])

  if(!data){
    return (
      <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col justify-center items-center'>
        <div>
          <ImSpinner8 className='text-5xl animate-spin text-white' />
        </div>
      </div>
    );
  }

  let icon;

  switch(data.weather[0].main) {
    case 'Clouds':
      icon = <img src={Clouds} alt="Clouds" />;
      break;
    case 'Haze':
      icon = <img src={Haze} alt="Haze" />;
      break;
    case 'Rain':
      icon = <img src={Rain} alt="Rain" />;
      break;
    case 'Clear':
      icon = <img src={Clear} alt="Clear" />;
      break;
    case 'Drizzle':
      icon = <img src={Drizzle} alt="Drizzle" />;
      break;
    case 'Snow':
      icon = <img src={Snow} alt="Snow" />;
      break;
    case 'Thunderstorm':
      icon = <img src={Thunderstorm} alt="Thunderstorm" />;
      break;
  }

  const date = new Date();

  return (
    <div className='w-full h-screen bg-gradientBg bg-no-repeat bg-cover bg-center flex flex-col items-center justify-center px-4 lg:px-0 z-0'>
      {errorMsg && <div className='w-full max-w-[90vw] lg:max-w-[450px] bg-[#ff208c] text-white absolute top-2 lg:top-10 p-4 capitalize rounded-md z-10'>{`${errorMsg.response.data.message}`}</div>}
      <form className={`${animate ? 'animate-shake' : 'animate-none'} h-16 bg-black/30 w-full max-w-[450px] rounded-full backdrop-blur-[32px] mb-8`}>
        <div className='h-full relative flex items-center justify-between p-2'>
          <input onChange={(e) => handleInput(e)} className='flex-1 bg-transparent outline-none placeholder:text-white placeholder:capitalize text-white text-[15px] font-light pl-6 h-full' type="text" placeholder='Search by city or country' />
          <button onClick={(e) => handleSubmit(e)} className='bg-[#6A0170] hover:bg-[#8967D0] w-20 h-12 rounded-full flex justify-center items-center transition'><IoMdSearch className='text-2xl text-white' /></button>
        </div>
      </form>
      <div className='w-full max-w-[450px] bg-black/20 min-h-[584px] text-white backdrop-blur-[32px] rounded-[32px] py-12 px-6'>
        {loading ? <div className='w-full h-full flex justify-center items-center '><ImSpinner8 className='text-white text-5xl animate-spin' /></div> : 
          <div>
            <div className='flex items-center gap-x-5'>
              <div className='w-[150px] h-[150px]'>{icon}</div>
              <div className='flex flex-col mb-[30px]'>
                <div className='text-2xl font-semibold'>{data.name}, {data.sys.country}</div>
                <div>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
              </div>
            </div>
            <div className='mb-20'>
              <div className='flex justify-center items-center'>
                <div className='text-[144px] leading-none font-light'>{parseInt(data.main.temp)}</div>
                <div className='text-4xl'>
                  <TbTemperatureCelsius />
                </div>
              </div>
              <div className='capitalize text-center'>{data.weather[0].description}</div>
            </div>
            <div className='max-w-[378px] mx-auto flex flex-col gap-y-6'>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[25px]'><BsEye /></div>
                  <div>Visibility{' '}<span className='ml-2'>{data.visibility / 1000} km</span></div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[25px]'><BsThermometer /></div>
                  <div className='flex'>Feels like{' '}<div className='flex ml-2'>{parseInt(data.main.feels_like)} <TbTemperatureCelsius className='flex items-center' /></div></div>
                </div>
              </div>
              <div className='flex justify-between'>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[25px]'><BsWater /></div>
                  <div>Humidity{' '}<span className='ml-2'>{data.main.humidity} %</span></div>
                </div>
                <div className='flex items-center gap-x-2'>
                  <div className='text-[25px]'><BsWind /></div>
                  <div className='flex'>Wind{' '}<span className='flex ml-2'>{data.wind.speed} m/s</span></div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
};

export default App;