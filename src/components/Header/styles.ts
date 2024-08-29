import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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