import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './pages/login';

import {createDrawerNavigator} from '@react-navigation/drawer';
import CartScreen from './pages/cart';
import MainScreen from './pages/mainScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Main">
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="Cart" component={CartScreen} />
    </Drawer.Navigator>
  );
}
function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen
          name="Home"
          options={{
            headerShown: false,
          }}
          component={DrawerNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default AppNavigator;
