import {Text, Image, View} from "react-native";
import {WeeklyData} from "../../models/Weather";
import {formatDate} from "../../helpers/utils";
import getWeatherImage from "../../helpers/getWeatherImage";
import {styles} from "./styles";

interface WeatherCardProps {
  weather: WeeklyData | undefined;
}

const WeatherCard: React.FC<WeatherCardProps> = ({weather}) => (
  <View style={styles.card}>
    {weather?.weatherCode != undefined && (
      <Image
        source={{uri: `${getWeatherImage(weather?.weatherCode)}`}}
        style={styles.image}
      />
    )}
    {weather?.temperature != undefined && (
      <Text style={styles.temperature}>
        {Math.round(weather?.temperature)}°C
      </Text>
    )}
    <Text style={styles.date}>{formatDate(weather?.time)}</Text>
  </View>
);

export default WeatherCard;
