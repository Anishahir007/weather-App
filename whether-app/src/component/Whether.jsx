import './whether.css'

import React, { useEffect, useRef, useState } from 'react'
// import CloudIcon from '@mui/icons-material/Cloud'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import { CiSearch } from "react-icons/ci";
import { FaCloud,FaCloudSun,FaRegSnowflake } from "react-icons/fa";
import { IoSunny } from "react-icons/io5";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import { FaReact } from "react-icons/fa";
import { RiDrizzleFill } from "react-icons/ri";
import { FaCloudRain } from "react-icons/fa6";
import { WbSunny } from '@mui/icons-material';


const Whether = () => {
 

  const inputRef = useRef();

  const[whetherData , setwhetherData] = useState(false)

 
 
  
  const Search = async (city)=>{
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);

      const allIcon = {
        "01d": <WbSunnyIcon />,
        "01n": <WbSunnyIcon />,
        "02d": <FaCloudSun />,
        "02n": <FaCloudSun />,
        "03d": <FaCloudSun />,
        "03n": <FaCloudSun />,
        "04d": <RiDrizzleFill />,
        "04n": <RiDrizzleFill />,
        "09d": <FaCloudRain />,
        "09n": <FaCloudRain />,
        "10d": <FaCloudRain />,
        "10n": <FaCloudRain />,
        "13d": <FaRegSnowflake />,
        "13n": <FaRegSnowflake />,

      }

      if(city === ""){
        alert("please enter city Name")
      }

      const icon = allIcon[data.weather[0].icon] ||<WbSunnyIcon /> ;

      setwhetherData({
        cityName:data.name,
        temprature:Math.floor(data.main.temp),
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        icon: icon,
      })
      
    } catch (error) {
  
    }
   }

   const searchClick = ()=>{
    Search(inputRef.current.value);
    inputRef.current.value = ''
    
   }

  
   useEffect(()=>{
    Search("jaipur");
   },[]) 
  
   
   


  return (
    <>
    <div className='h-screen main flex justify-center items-center '>
        {/* <div className="flex flex-col items-center relative left-[-200px] ">
        <FaReact className='text-[200px] text-[#60dafc] ' />
        <h1 className='text-white font-bold text-[23px]' >Weather App</h1>
        <p className='text-[white]' >in React</p>
        </div> */}
       
        
    <div className='min-h-[400px] w-[400px] bg-[#4123b7]  rounded-xl'>
        <div className="flex gap-3 justify-center items-center pt-6">
            <input type="text" ref={inputRef} placeholder='Search'  className='w-[250px] h-[40px] rounded-[30px] pl-[20px]  '  />
            <div className="bg-white rounded-[50%] w-[40px] h-[40px] flex justify-center items-center">
           <CiSearch className='w-[20px] h-[20px] text-[20px] text-center' onClick={searchClick} />
           </div>
        </div>

      <div className="flex  justify-center  pt-12 text-white" >
      {whetherData.icon }
     
        
    
        {/* <FaCloud className='text-[60px] text-white  z-10' />
        <IoSunny className='text-[60px] text-[#fdb137] absolute top-10 left-[49%] ' /> */}

      </div>

      <div className=" flex flex-col items-center ">
        <h1 className='text-white text-[40px]  ' >{whetherData.temprature}<sup>o</sup>c</h1>
        <p className='text-white text-[20px] uppercase ' >{whetherData.cityName}</p>
      </div>

      <div className="flex justify-between px-8 mt-8 text-white">
  
     <div className="flex">
       <WiHumidity className='text-[30px] ' />
       <div className="leading-4">
        <h6>{whetherData.humidity}</h6>
        <p>Humidity</p>
       </div>

     </div>

    <div className="flex">
    <LuWind className='text-[30px]' />
    <div className="leading-4">
        <h6>{whetherData.windSpeed} km/h</h6>
        <p>Wind Speed</p>
       </div>
    </div>
      </div>

    </div>
    </div>
    </>
  )
}

export default Whether