import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Feed';
import { Ionicons } from '@expo/vector-icons';
import Profile from './screens/profile';
import Planner from './screens/planner';



export default function Router() {
   
  return (

 
        <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({  color, size }) => {
            if (route.name === 'Home') {
              return (
                <Ionicons
                  name={'md-home-outline'}
                  size={size}
                  color={color}
                />
              );
            } else if (route.name === 'Planner') {
              return (
                <Ionicons
                  name={'md-add'}
                  size={size}
                  color={color}
                />
              );
            }  else if (route.name === 'Profile') {
              return (
                <Ionicons
                  name={'md-person'}
                  size={size}
                  color={color}
                />
              );
            } 
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
          <Tab.Screen name="Home" component={Home} /> 
          <Tab.Screen name="Planner" component={Planner} />
          <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
       /*  </NetworkContext.Provider>  */
     
    );
  }
  
  const Tab = createBottomTabNavigator();
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
