import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider } from './screens/CartContext';

import LoginScreen from './screens/Login';
import SplashScreen from './screens/Splash';
import HomeScreen from './screens/Home';
import RegisterScreen from './screens/Register';
import MainTabs from './screens/Maintabs';
import ProductDetail from './screens/ProductDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Splash' screenOptions={{ headerShown:false }}>
            <Stack.Screen name='Register' component={RegisterScreen} screenOptions={{ headerShown:false }}/>
            <Stack.Screen name='Home' component={HomeScreen} screenOptions={{ headerShown:false }}/>
            <Stack.Screen name='Login' component={LoginScreen} screenOptions={{ headerShown:false }}/>
            <Stack.Screen name='Splash' component={SplashScreen} screenOptions={{ headerShown:false }}/>
            <Stack.Screen name='Maintabs' component={MainTabs} />
            <Stack.Screen name='ProductDetail' component={ProductDetail} />
          </Stack.Navigator>
        </NavigationContainer>
    </CartProvider>
  );
}

