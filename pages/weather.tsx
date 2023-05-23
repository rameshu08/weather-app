  import { useState } from 'react';
  import { useWeather } from './api';
  import { useQueryClient } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
  
  const WeatherPage = () => {
    const [inputValue, setInputValue] = useState('')
    const [location, setLocation] = useState('Bangalore');
    const { data, isLoading, error, isError } = useWeather(location);
    const queryClient = useQueryClient();

    console.log(data, isLoading, error, isError)
    let response = data?.data

    let imageUrl = 'https://images.pexels.com/photos/414491/pexels-photo-414491.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    let sunnyDay = 'https://images.pexels.com/photos/3283498/pexels-photo-3283498.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    
  
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Fetch weather data for the entered location
        setLocation(inputValue);
        queryClient.invalidateQueries(['weather', location]);
        setInputValue('')
      };
  
    return (
      <div className="flex w-full h-full">
       <div className="flex w-[70%] bg-no-repeat bg-cover bg-[url('https://images.pexels.com/photos/1624502/pexels-photo-1624502.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')]">
            {isLoading && <div className='flex justify-center items-center w-full'><CircularProgress /></div>}
            {isError && <div className='flex justify-center items-center w-full text-xl'>No matching location found...</div>}
            {data && <div className='flex flex-1 ml-52 mt-96 items-center'>
                    <div className='text-7xl text-white mx-4'>{response?.current?.temp_c}&deg;</div>
                    <div className='mx-4 text-white'>
                        <div className='text-3xl mb-1'>{response?.location?.name}</div>
                        <div className='text-base'>{response?.location?.localtime}</div>
                    </div>
                    <div className='mx-4 text-white'>
                        <div className='text-3xl'><img src={response?.current?.condition?.icon} alt="" width={40} /></div>
                        <div className='text-sm'>{response?.current?.condition?.text}</div>
                    </div>
            </div> }
        </div> 
        <div className='bg-[#386e9d] h-screen flex flex-1 flex-col p-12 opacity-90'>
            <div className='mb-12'>
              <form onSubmit={handleSubmit}>
                <input type="text" value={inputValue} onChange={handleLocationChange} placeholder="Enter location" className='py-1 px-2 rounded-sm mr-2 outline-none' />
                <button className="py-1 px-4 rounded text-[white] bg-[black]" type="submit">Get</button>
              </form>
              {isError && <div className='text-red-600 text-sm py-2'>No matching location found.</div>}
            </div> 
            {!isLoading && !isError && <div>
                <div className='mb-8 text-white text-xl'>Weather Details</div>
                <div className='flex flex-row justify-between mb-4'>
                    <div className='text-[#87a1b1]'>Cloudy</div>
                    <div className="text-white">{response?.current?.cloud}</div>
                </div>
                <div className='flex flex-row justify-between mb-4'>
                    <div className='text-[#87a1b1]'>Humidity</div>
                    <div className="text-white">{response?.current?.humidity}</div>
                </div>
                <div className='flex flex-row justify-between mb-4'>
                    <div className='text-[#87a1b1]'>Wind</div>
                    <div className="text-white">{response?.current?.wind_kph}km/h</div>
                </div>
                <div className='flex flex-row justify-between mb-4'>
                    <div className='text-[#87a1b1]'>Feels Like</div>
                    <div className="text-white">{response?.current?.feelslike_c}&deg;</div>
                </div>
            </div> }
        </div>
      </div>
    );
  };
  
  export default WeatherPage;