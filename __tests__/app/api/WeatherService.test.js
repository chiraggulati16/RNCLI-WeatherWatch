import axios from 'axios';
import { WeatherService } from '../../../src/api/WeatherService';

jest.mock('axios');
const mockedAxios = axios;

describe('WeatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    it('should fetch and return current weather data', async () => {
      // Mock data
      const mockLocation = { latitude: 40.7128, longitude: -74.0060 };
      const mockResponseData = {
        latitude: 52.52,
        longitude: 13.419998,
        current: {
            time: "2024-08-26T08:00",
            interval: 900,
            temperature_2m: 19.1
          },
        hourly: {
            time: [
                "2024-08-26T00:00",
                "2024-08-26T01:00",
                "2024-08-26T02:00"],
          temperature_2m: [20, 21, 22],
          weather_code: [1, 1, 2]
        }
      };

      mockedAxios.get.mockResolvedValue({ data: mockResponseData });

      // Call the method
      const result = await WeatherService.getCurrentWeather(mockLocation);

      // Assert the result
      expect(result).toEqual(mockResponseData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://api.open-meteo.com/v1/forecast?latitude=${mockLocation.latitude}&longitude=${mockLocation.longitude}&current=temperature_2m,weather_code&hourly=temperature_2m,weather_code`
      );
    });

    it('should handle errors correctly', async () => {
      // Mock error
      const mockLocation = { latitude: 40.7128, longitude: -74.0060 };
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      // Call the method and assert that it throws an error
      await expect(WeatherService.getCurrentWeather(mockLocation)).rejects.toThrow('Network Error');
    });
  });

  describe('getSearchList', () => {
    it('should fetch and return search list data', async () => {
      // Mock data
      const mockSearchLocation = 'Delhi';
      const mockResponseData = {
        id: 2,
        name: "Delhi",
        latitude: 28.7041,
        longitude: 77.1025,
        country: "India"
      };

      mockedAxios.get.mockResolvedValue({ data: { results: mockResponseData } });

      // Call the method
      const result = await WeatherService.getSearchList(mockSearchLocation);

      // Assert the result
      expect(result).toEqual(mockResponseData);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `https://geocoding-api.open-meteo.com/v1/search?name=${mockSearchLocation}`
      );
    });

    it('should handle errors correctly', async () => {
      // Mock error
      const mockSearchLocation = 'New York';
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      // Call the method and assert that it throws an error
      await expect(WeatherService.getSearchList(mockSearchLocation)).rejects.toThrow('Network Error');
    });
  });
});