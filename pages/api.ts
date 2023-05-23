// api.ts
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const fetchWeather = async (location: string) => {
  const options = {
    params: {q: location},
    headers: {
        'X-RapidAPI-Key': 'f21f34aaf3mshb8892bc3a3c9534p1b15edjsn34a4e03d6f14',
        'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
    }
  }
  const response = await axios.get(`https://weatherapi-com.p.rapidapi.com/current.json`, options);
  if (!response) {
    throw new Error('An error occurred while fetching the weather data.');
  }
  console.log(response)
  return response;
};

export const useWeather = (location: string) => {
  return useQuery(['weather', location], () => fetchWeather(location));
};
