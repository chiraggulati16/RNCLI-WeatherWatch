import {NavigationContainer} from '@react-navigation/native';
import {LocationProvider} from '../context/LocationProvider';
import NavigationService from './NavigationService';
import Header from '../components/Header';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <LocationProvider>
      <NavigationContainer
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{
              header: () => <Header title="Home" />,
            }}
          />
          <Stack.Screen name="Search" component={SearchScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </LocationProvider>
  );
};

export default HomeNavigator;
