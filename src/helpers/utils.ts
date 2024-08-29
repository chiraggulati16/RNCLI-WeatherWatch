import {WeeklyData} from '../models/Weather';
import {WeatherCode} from './getWeatherImage';

export function formatDate(dateStr: string | undefined) {
  if (dateStr) {
    const date = new Date(dateStr);
    const formattedDate = date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
    });
    return formattedDate;
  }
  return '';
}

export function mapHourlyWeatherData(
  time: string[],
  temperature_2m: number[],
  weather_code: WeatherCode[],
): WeeklyData[] {
  const today = new Date().toISOString().split('T')[0]; // Get today's date in "YYYY-MM-DD" format
  const uniqueDates: Record<string, WeeklyData> = {};

  time.forEach((time, index) => {
    const date = time.split('T')[0]; // Extract the date part

    // Skip today's date and only add one entry per unique date
    if (date !== today && !uniqueDates[date]) {
      uniqueDates[date] = {
        time,
        temperature: temperature_2m[index],
        weatherCode: weather_code[index],
      };
    }
  });

  return Object.values(uniqueDates);
}

export function formatTime(dateTimeString: string | undefined) {
  if (dateTimeString) {
    const date = new Date(dateTimeString);

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `${hours}:${formattedMinutes} ${ampm}`;
  }
  return '';
}
