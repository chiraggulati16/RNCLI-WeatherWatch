import {AxiosInstance} from 'axios';
import {WeatherService, apiClient} from '../../../src/api/WeatherService';
import {Location} from '../../../src/models/Location';

const mockedAxios = apiClient as jest.Mocked<AxiosInstance>;

describe('WeatherService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCurrentWeather', () => {
    it('should fetch and return current weather data', async () => {
      // Mock data
      const mockLocation: Location = {
        id: 1,
        name: 'Chandigarh',
        latitude: 30.7333,
        longitude: 76.7794,
        country: 'India',
      };
      const mockResponseData = {
        latitude: 52.52,
        longitude: 13.419998,
        current: {
          time: '2024-08-26T08:00',
          interval: 900,
          temperature_2m: 19.1,
        },
        hourly: {
          time: ['2024-08-26T00:00', '2024-08-26T01:00', '2024-08-26T02:00'],
          temperature_2m: [20, 21, 22],
          weather_code: [1, 1, 2],
        },
      };

      mockedAxios.get.mockImplementation(() => {
        return Promise.resolve({data: mockResponseData});
      });

      // Call the method
      const result = await WeatherService.getCurrentWeather(mockLocation);

      // Assert the result
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors correctly', async () => {
      // Mock error
      const mockLocation: Location = {
        id: 1,
        name: 'Chandigarh',
        latitude: 30.7333,
        longitude: 76.7794,
        country: 'India',
      };
      mockedAxios.get.mockImplementation(() => {
        return Promise.reject(new Error('Network Error'));
      });

      // Call the method and assert that it throws an error
      await expect(
        WeatherService.getCurrentWeather(mockLocation),
      ).rejects.toThrow('Network Error');
    });
  });

  describe('getSearchList', () => {
    it('should fetch and return search list data', async () => {
      // Mock data
      const mockSearchLocation = 'Delhi';
      const mockResponseData = {
        id: 2,
        name: 'Delhi',
        latitude: 28.7041,
        longitude: 77.1025,
        country: 'India',
      };

      mockedAxios.get.mockResolvedValue({data: {results: mockResponseData}});

      // Call the method
      const result = await WeatherService.getSearchList(mockSearchLocation);

      // Assert the result
      expect(result).toEqual(mockResponseData);
    });

    it('should handle errors correctly', async () => {
      // Mock error
      const mockSearchLocation = 'New York';
      mockedAxios.get.mockImplementation(() => {
        return Promise.reject(new Error('Network Error'));
      });

      // Call the method and assert that it throws an error
      await expect(
        WeatherService.getSearchList(mockSearchLocation),
      ).rejects.toThrow('Network Error');
    });
  });
});
