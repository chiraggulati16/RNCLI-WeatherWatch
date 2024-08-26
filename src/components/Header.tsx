import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationService from '../navigation/NavigationService';
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Header = ({ title }: {title: string}) => {

    const insets = useSafeAreaInsets()

    const navigateToSearch = () => {
        NavigationService.navigate("Search");
    }
  return (
    <View style={[styles.headerContainer, {marginTop: insets.top}]}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity style={styles.searchContainer} onPress={navigateToSearch}>
        <Text style={styles.searchText}>Search</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: '#f8f8f8', // Customize the background color
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0', // Customize the border color
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchContainer: {
    position: 'absolute',
    right: 16,
  },
  searchText: {
    fontSize: 16,
    color: '#007BFF', // Customize the color
  },
});

export default Header;