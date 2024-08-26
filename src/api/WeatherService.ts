import axios from "axios";
import { Location } from "../models/Location";

const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/';
const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/";
export class WeatherService {
    static async getCurrentWeather(location: Location) {
      const response = await axios.get(
        `${WEATHER_BASE_URL}forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code`
      );
      console.log("result 11", response.data)
      return response.data;
    }
  
    static async getSearchList(location: string) {
      const response = await axios.get(
        `${BASE_URL}search?name=${location}`
      );
      return response.data.results;
    }
  }