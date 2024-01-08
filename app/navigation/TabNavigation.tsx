import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home/HomeScreen'
import FavoriteScreen from '../screens/favorite/FavoriteScreen'
import ProfileScreen from '../screens/profile/ProfileScreen'
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Colors from '../utils/Colors'

const Tab = createBottomTabNavigator()

const TabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName='home'
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="home" component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-search" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarLabel: 'Search'
        }}
      />
      <Tab.Screen name="favorite" component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-heart" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarLabel: 'Favorite'
        }}
      />
      <Tab.Screen name="profile" component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="user" size={size} color={color} />
          ),
          tabBarActiveTintColor: Colors.PRIMARY,
          tabBarLabel: 'Profile'
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNavigation