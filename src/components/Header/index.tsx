import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import NavigationService from '../../navigation/NavigationService';
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { styles } from './styles';

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

export default Header;