import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import CameraScreen from './src/screens/CameraScreen';
import ProductDetailsScreen from './src/screens/ProductDetailsScreen'; // ✅ import the details screen
import MainProducts from './src/screens/MainProducts';
import NutriScore from './src/screens/NutriScore';
import Green from './src/screens/Green';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007AFF',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'Bit Scanner'}}
        />
        <Stack.Screen
          name="Camera"
          component={CameraScreen}
          options={{title: 'Scan Code'}}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{title: 'Product Details'}}
        />
        <Stack.Screen
          name="MainProducts"
          component={MainProducts}
          options={{title: 'Products Database'}}
        />
        <Stack.Screen
          name="NutriScore"
          component={NutriScore}
          options={{title: 'NutriScore'}}
        />
        <Stack.Screen
          name="Green"
          component={Green}
          options={{title: 'Green'}} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
