import React, { Component } from 'react';
import 'react-native-gesture-handler';

import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import {Container, Button} from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import EmployerProfile from './screens/profile'
import PostFood from './screens/post_food'
import ViewJob from './screens/Feed'
import JobProgress from './screens/job_status'
//import Home from './Home'
import Router from './Router';
import Login from './Auth/Login'
import SignUp from './Auth/SignUp'
import JobCreatorDetail from './screens/JobCreatorDetail'
import EditProfileJobCreator from './screens/EditProfileEmployer'
import Search from './screens/Search'
import Profile from './screens/profile';
import SplashScreen from './SplashScreen';
import MyJob from './screens/MyJob';
import MyOrderDetail from './screens/MyOrderDetail';
import { useEffect } from 'react/cjs/react.development';
import Household from './screens/Household';
import AddUser from './screens/AddUser';
import MyLocation from './location/location';
import UserStartLocation from './location/userStartLocation';
import AccountDetail from './screens/AccountDetail';
import AddUserLocation from './location/adduserlocation';
import Planner from './screens/planner';
import PlanLocation from './location/PlanLocation';
import TestPlan from './screens/testplan';
import Timestamptest from './screens/timestamptest';

function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="splashscreen" component={SplashScreen}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Router" component={Router} />
        {/* <Stack.Screen name="Home" component={Home}/> */}
        <Stack.Screen name="ViewJob" component={ViewJob} />
        <Stack.Screen name="MyJob" component={MyJob} />
        <Stack.Screen name="MyOrderDetail" component={MyOrderDetail} />
        <Stack.Screen name="EmployerProfile" component={EmployerProfile} />
        <Stack.Screen name="JobCreatorDetail" component={JobCreatorDetail}/>
        <Stack.Screen name="PostFood" component={PostFood} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="EditProfileJobCreator" component={EditProfileJobCreator} />
        <Stack.Screen name="JobProgress" component={JobProgress}/> 
        <Stack.Screen name="Household" component={Household}/>
        <Stack.Screen name="AddUser" component={AddUser}/>
        <Stack.Screen name="UserStartLocation" component={UserStartLocation}/>
        <Stack.Screen name="MyLocation" component={MyLocation}/>
        <Stack.Screen name="AccountDetail" component={AccountDetail}/>
        <Stack.Screen name="AddUserLocation" component={AddUserLocation}/>
        <Stack.Screen name="Planner" component={Planner}/>
        <Stack.Screen name="PlanLocation" component={PlanLocation}/>
        <Stack.Screen name="TestPlan" component={TestPlan} />
        <Stack.Screen name="Timestamptest" component={Timestamptest} />



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