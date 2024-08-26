import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {WeatherService} from '../api/WeatherService';
import {Location} from '../models/Location';
import SearchBar from '../components/SearchBar';
import { useEffect, useState} from 'react';
import { useLocationContext } from '../context/LocationContext';
import NavigationService from '../navigation/NavigationService';

const SearchScreen = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const {setLocation} = useLocationContext();

  const handleSearch = async (location: string) => {
    console.log("result before")
    const results = await WeatherService.getSearchList(location);
    setLocations(results);
    console.log("state 11", results);
  };

  const searchWeather = (item: Location) => {
    setLocation(item)
    NavigationService.back()
  };

  const renderItem = ({item}: {item: Location}) => {
    return (
      <TouchableOpacity testID='locationItem' onPress={() => searchWeather(item)}>
        <Text style={styles.item}>
          {item?.name}, {item?.country}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <SearchBar testId="searchInput" onSearch={handleSearch} />
      <FlatList
      testID='locationList'
        data={locations}
        keyExtractor={(item: Location) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {padding: 16, flex: 1},
  item: {padding: 8, fontSize: 18, color: '#000'},
});

export default SearchScreen;
