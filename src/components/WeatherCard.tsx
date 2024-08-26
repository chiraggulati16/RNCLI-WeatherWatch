import { StyleSheet, Text, Image, View } from "react-native";
import { WeatherData, WeeklyData } from "../models/Weather";
import { formatDate, formatTime } from "../helpers/utils";
import getWeatherImage from "../helpers/getWeatherImage";

interface WeatherCardProps {
    weather: WeeklyData | undefined;
  }

const WeatherCard: React.FC<WeatherCardProps> = ({ weather }) => (
    <View style={styles.card}>
      {weather?.weatherCode != undefined && <Image source={{ uri: `${getWeatherImage(weather?.weatherCode)}` }} style={styles.image} />}
      {weather?.temperature != undefined &&<Text style={styles.temperature}>{Math.round(weather?.temperature)}°C</Text>}
      <Text style={styles.date}>{formatDate(weather?.time)}</Text> 
      {/* <Text style={styles.date}>{formatTime(weather?.time)}</Text>  */}
    </View>
  );
  
  const styles = StyleSheet.create({
    card: { padding: 16, backgroundColor: '#fff', borderRadius: 8, marginBottom: 8, margin: 7, height: 150 },
    temperature: { fontSize: 22, fontWeight: 'bold' },
    image: { width: 50, height: 50 },
    description: { fontSize: 18 },
    date: { fontSize: 16, color: '#666' },
  });
  
  export default WeatherCard;