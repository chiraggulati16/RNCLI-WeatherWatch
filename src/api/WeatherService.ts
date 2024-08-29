import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { Location } from "../models/Location";
import { Alert } from "react-native";

export const BASE_URL = 'https://geocoding-api.open-meteo.com/v1/';
export const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/";

// Create an Axios instance
export const apiClient: AxiosInstance = axios.create({
  baseURL: WEATHER_BASE_URL,
  timeout: 10000,
});

// Add a response interceptor to handle errors globally
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Return the response if everything is OK
    return response;
  },
  (error: AxiosError) => {
    let errorMessage = 'An unknown error occurred. Please try again later.';

    if (error.response) {
      // Customize error message based on status code or response data
      errorMessage = `Error: ${error.response.status} - ${error?.message || 'Something went wrong.'}`;
    } else if (error.request) {
      errorMessage = 'No response received from the server. Please check your internet connection.';
    } else {
      errorMessage = `Request error: ${error.message}`;
    }

    // Show alert with the error message
    Alert.alert('Error', errorMessage);

    // Optionally, you can throw the error again if you want to handle it later
    return Promise.reject(error);
  }
);

export class WeatherService {
  static async getCurrentWeather(location: Location) {
    try {
      const response = await apiClient.get(
        `forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  static async getSearchList(location: string) {
    try {
      const response = await apiClient.get(
        `${BASE_URL}search?name=${location}`
      );
      return response.data.results;
    } catch (error) {
      throw error;
    }
  }
  }