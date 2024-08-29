import { WeatherCode } from "../../../src/helpers/getWeatherImage";
import { formatDate, formatTime, mapHourlyWeatherData } from "../../../src/helpers/utils";
import { WeeklyData } from "../../../src/models/Weather";



describe('Utility Functions', () => {
  
  describe('formatDate', () => {
    it('should format a valid date string correctly', () => {
      const dateStr = '2023-08-29T15:30:00Z';
      const result = formatDate(dateStr);
      expect(result).toBe('Aug 29, 23');
    });

    it('should return an empty string for an undefined date string', () => {
      const result = formatDate(undefined);
      expect(result).toBe('');
    });
  });

  describe('mapHourlyWeatherData', () => {
    it('should map hourly weather data to WeeklyData correctly', () => {
      const time = [
        '2023-08-29T00:00:00Z',
        '2023-08-29T01:00:00Z',
        '2023-08-30T00:00:00Z',
      ];
      const temperature_2m = [22, 21, 20];
      const weather_code: WeatherCode[] = ["1", "1", "2"]; // Adjust based on actual WeatherCode values

      const result: WeeklyData[] = mapHourlyWeatherData(time, temperature_2m, weather_code);

      const expected: WeeklyData[] = [
        {
          time: '2023-08-29T00:00:00Z',
          temperature: 22,
          weatherCode: "1",
        },
        {
          time: '2023-08-30T00:00:00Z',
          temperature: 20,
          weatherCode: "2",
        },
      ];

      expect(result).toEqual(expected);
    });

    it('should not include today\'s date in the result', () => {
      const today = new Date().toISOString().split('T')[0];
      const time = [
        `${today}T00:00:00Z`,
        '2023-08-29T01:00:00Z',
      ];
      const temperature_2m = [22, 21];
      const weather_code: WeatherCode[] = ["1", "1"];

      const result: WeeklyData[] = mapHourlyWeatherData(time, temperature_2m, weather_code);

      expect(result.length).toBe(1);
      expect(result[0].time).toBe('2023-08-29T01:00:00Z');
    });
  });

  describe('formatTime', () => {
    it('should format a valid datetime string correctly', () => {
      const dateTimeString = '2023-08-29T15:30:00Z';
      const result = formatTime(dateTimeString);
      expect(result).toBe('9:00 PM');
    });

    it('should return an empty string for an undefined datetime string', () => {
      const result = formatTime(undefined);
      expect(result).toBe('');
    });
  });

});
