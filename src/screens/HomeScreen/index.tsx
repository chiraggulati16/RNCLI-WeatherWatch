import {FlatList, Image, Text, View} from 'react-native';
import {useEffect, useState} from 'react';
import {useLocationContext} from '../../context/LocationContext';
import {WeatherData, WeeklyData} from '../../models/Weather';
import {WeatherService} from '../../api/WeatherService';
import {formatDate, mapHourlyWeatherData} from '../../helpers/utils';
import getWeatherImage from '../../helpers/getWeatherImage';
import WeatherCard from '../../components/WeatherCard';
import {styles} from './styles';

const HomeScreen = () => {
  const {location} = useLocationContext();
  const [weather, setWeather] = useState<WeatherData>();
  const [weeklyData, setWeeklyData] = useState<WeeklyData[]>();

  useEffect(() => {
    getData();
  }, [location]);

  const getData = async () => {
    const weatherData = await WeatherService.getCurrentWeather(location);
    setWeather(weatherData);
    setWeeklyData(
      mapHourlyWeatherData(
        weatherData?.hourly?.time,
        weatherData?.hourly?.temperature_2m,
        weatherData?.hourly?.weather_code,
      ),
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Current Weather</Text>
      <Text style={styles.loc}>{location?.name}</Text>
      <Text style={styles.loc}>{formatDate(weather?.current?.time)}</Text>

      <View style={{flexDirection: 'row'}}>
        {weather?.current?.weather_code !== undefined && (
          <Image
            resizeMode="contain"
            source={{uri: `${getWeatherImage(weather?.current?.weather_code)}`}}
            style={styles.image}
          />
        )}
        {weather?.current?.temperature_2m != undefined && (
          <Text style={styles.temperature}>
            {Math.round(weather?.current?.temperature_2m)}°C
          </Text>
        )}
      </View>

      <Text style={styles.header}>Weekly Forecast</Text>
      <FlatList
        data={weeklyData}
        horizontal={true}
        renderItem={({item}: {item: WeeklyData}) => (
          <WeatherCard weather={item} />
        )}
      />
    </View>
  );
};

export default HomeScreen;
