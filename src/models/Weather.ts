import { WeatherCode } from "../helpers/getWeatherImage"

export type Coordinates = {
    latitude: number,
    longitude: number
}

export type WeatherData = {
    latitude: number,
    longitude: number,
    current: Current,
    hourly: {
        time: string[]
    }
    temperature_2m: number[],
    weather_code: WeatherCode[]
}

export type Current = {
    time: string,
    interval: number,
    temperature_2m: number,
    weather_code: WeatherCode
}

export type WeeklyData = {
    time: string,
    weatherCode: WeatherCode,
    temperature: number
}