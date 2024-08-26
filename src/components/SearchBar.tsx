import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface SearchBarProps {
  testId: string
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [location, setLocation] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
      testID='searchInput'
        style={styles.input}
        placeholder="Search location..."
        value={location}
        onChangeText={setLocation}
      />
      <Button testID='searchBtn' title="Search" onPress={() => onSearch(location)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row', marginBottom: 16 },
  input: { flex: 1, padding: 8, borderColor: '#ccc', borderWidth: 1, borderRadius: 4 },
});

export default SearchBar;