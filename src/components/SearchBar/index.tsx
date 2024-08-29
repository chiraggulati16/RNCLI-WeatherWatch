import React, {useState} from "react";
import {View, TextInput, Button } from "react-native";
import {styles} from "./styles";

interface SearchBarProps {
  testId: string;
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({onSearch}) => {
  const [location, setLocation] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        testID="searchInput"
        style={styles.input}
        placeholder="Search location..."
        value={location}
        onChangeText={setLocation}
      />
      <Button
        testID="searchBtn"
        title="Search"
        onPress={() => onSearch(location)}
      />
    </View>
  );
};

export default SearchBar;
