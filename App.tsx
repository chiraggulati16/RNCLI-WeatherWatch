import React, { useState } from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import Header from './src/components/Header';
import NavigationService from './src/navigation/NavigationService';
import SearchScreen from './src/screens/SearchScreen';
import { LocationContext } from './src/context/LocationContext';
import { Location } from './src/models/Location';
import { LocationProvider } from './src/context/LocationProvider';

const Stack = createNativeStackNavigator();

export default function App() {
  
  return (
    <LocationProvider>
    <NavigationContainer  ref={navigatorRef => {
        NavigationService.setTopLevelNavigator(navigatorRef);
      }}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen}
      options={{
        header: () => (
          <Header title="Home"/>
        ),
      }} />
        <Stack.Screen name="Search" component={SearchScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  </LocationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
