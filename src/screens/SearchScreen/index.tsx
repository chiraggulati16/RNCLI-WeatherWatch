import {FlatList, Text, TouchableOpacity, View} from "react-native";
import {WeatherService} from "../../api/WeatherService";
import {Location} from "../../models/Location";
import SearchBar from "../../components/SearchBar";
import { useState} from "react";
import {useLocationContext} from "../../context/LocationContext";
import NavigationService from "../../navigation/NavigationService";
import { styles } from "./styles";

const SearchScreen = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const {setLocation} = useLocationContext();

  const handleSearch = async (location: string) => {
    const results = await WeatherService.getSearchList(location);
    setLocations(results);
  };

  const searchWeather = (item: Location) => {
    setLocation(item);
    NavigationService.back();
  };

  const renderItem = ({item}: {item: Location}) => {
    return (
      <TouchableOpacity
        testID="locationItem"
        onPress={() => searchWeather(item)}>
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
        testID="locationList"
        data={locations}
        keyExtractor={(item: Location) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default SearchScreen;
