import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

import TabBarComp from './TabBarComp';

import LoginScreen from '../screens/auth/LoginScreen';
import AccountScreen from '../screens/hometabs/AccountScreen';
import HomeScreen from '../screens/HomeScreen';
import BookingScreen from '../screens/BookingScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import ProviderScreen from '../screens/provider/ProviderScreen';
import AddressScreen from '../screens/hometabs/AddressScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export const MyTab = () => {
  
  return (
    <Tab.Navigator 
      screenOptions={{headerShown: false}} 
      initialRouteName="HomeScreen" 
      tabBar={props => <TabBarComp {...props} />}
      sceneContainerStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} options={{ title: 'Home' }} />
      <Tab.Screen name="AddressScreen" component={AddressScreen} options={{ title: 'Location' }} />
      <Tab.Screen name="AccountScreen" component={AccountScreen} options={{ title: 'Account' }} />
    </Tab.Navigator>
  );
}

export const AuthStack = () => {
  const screens = [
    { name: "login", component: LoginScreen },
    { name: "signup", component: SignUpScreen },
    { name: "provider", component: ProviderScreen },
    { name: "main", component: MyTab },
    { name: "booking", component: BookingScreen }
  ];

  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false}}
    >
      {screens.map(({ name, component }, index) => (
        <Stack.Screen key={index} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
}

export default function MainNavigationStack() {
  return (
    <NavigationContainer>
      <AuthStack />
    </NavigationContainer>
  );
}