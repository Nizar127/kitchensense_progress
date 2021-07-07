import React, { Component } from 'react';
import 'react-native-gesture-handler';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import {Container, Button} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import PostFood from './screens/post_food'
import ViewJob from './screens/Feed'
import Router from './Router';
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import Profile from './screens/profile';
import SplashScreen from './SplashScreen';
import MyIngredient from './screens/MyIngredient';
import MyIngredientDetail from './screens/MyIngredientDetail';
import { useEffect } from 'react/cjs/react.development';
import Household from './screens/Household';
import MyLocation from './location/location';
import UserStartLocation from './location/userStartLocation';
import AddUserLocation from './location/adduserlocation';
import PlanLocation from './location/PlanLocation';
import AddPlaner from './screens/AddPlaner';
import NotificationPlanner from './screens/notification_planner';
import DataPlanner from './screens/dataplanner';

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SplashScreen" component={SplashScreen}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Router" component={Router} />
        <Stack.Screen name="ViewJob" component={ViewJob} />
        <Stack.Screen name="MyIngredient" component={MyIngredient} />
        <Stack.Screen name="MyIngredientDetail" component={MyIngredientDetail} />
        <Stack.Screen name="PostFood" component={PostFood} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Household" component={Household}/>
        <Stack.Screen name="UserStartLocation" component={UserStartLocation}/>
        <Stack.Screen name="MyLocation" component={MyLocation}/>
        <Stack.Screen name="AddUserLocation" component={AddUserLocation}/>
        <Stack.Screen name="PlanLocation" component={PlanLocation}/>
        <Stack.Screen name="AddPlaner" component={AddPlaner} />
        <Stack.Screen name="DataPlanner" component={DataPlanner} />
        <Stack.Screen name="NotificationPlanner" component={NotificationPlanner} />




      </Stack.Navigator>

    </NavigationContainer>
  );
}
/* } */

const Stack = createStackNavigator();
export default App;


const Style = StyleSheet.create({
  addButton: {
    position: 'absolute',
    zIndex: 11,
    right: 20,
    bottom: 220,
    backgroundColor: '#E91E63',
    width: 90,
    height: 90,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
},
})
