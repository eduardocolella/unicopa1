import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../utils/LoginScreen';
import HomeScreen from '../utils/HomeScreen';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {

  return (

    <NavigationContainer>

      <Stack.Navigator>

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

      </Stack.Navigator>

    </NavigationContainer>
  );
}
const {
  data: { session }
} = await supabase.auth.getSession();{ if (session) {
  navigation.replace('Home');
}
}