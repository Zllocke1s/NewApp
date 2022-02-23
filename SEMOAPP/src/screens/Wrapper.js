import * as React from 'react';
import { memo } from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {theme} from '../core/theme';
import style from '../styles/WrapperStyle';
import Logo from '../assets/logo.svg';
import Score from './Scoreboard';
import Calendar from './Calendar';
import List from './List';
import Profile from './Profile';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';


function ScoreScreen() {
  return (
    <Score />
  );
}

function DashboardScreen() {
  return (
    <Dashboard />
  );
}

function ProfileScreen() {
  return (
    <Profile />
  );
}
function CalendarScreen() {
  return (
    <Calendar />
  );
}

function ListScreen() {
  return (
    <List />
  );
}

const Tab = createBottomTabNavigator();

const Wrapper = ({ navigation }) => {
  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../assets/fonts/SulphurPoint-Regular.ttf"),
    });
  if (!isLoaded) {
    return <AppLoading />;
  } else {

  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Dashboard' tabBarOptions={{showLabel: false, activeTintColor: theme.colors.lightGreen, inactiveTintColor: theme.colors.lightGreen, inactiveBackgroundColor: theme.colors.medBlue, activeBackgroundColor: theme.colors.lightBlue,
      adaptive: 'true',
    }}
    >
        <Tab.Screen name="List" options={{
          tabBarLabel: 'List',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="glass-wine" color={color} size={size} />
          ),
        }} children={() => (
          <List
            navigation={navigation}
            user={navigation.state.params.user}
            load={true}

          />
        )} />
        <Tab.Screen name="Scoreboard" options={{
          tabBarLabel: 'Scoreboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="chart-bar" color={color} size={size} />
          ),
        }} 
        children={() => (
          <Score
            navigation={navigation}
            user={navigation.state.params.user}
            load={true}

          />
        )} />
        <Tab.Screen name="Dashboard" options={{
          tabBarLabel: 'Dashboard',
          
          tabBarIcon: ({ focused, color, size }) => (
        <View style={{position: "absolute", width: "100%", top: 0, bottom: 0, margin: "auto", backgroundColor: theme.colors.medBlue}}><Text> </Text>
          <View
        style={[focused ? {
          position: 'absolute',
          bottom: 0, // space from bottombar
          height: 82,
          width: "100%",
          borderRadius: 58,
          backgroundColor: theme.colors.white,
          borderWidth: 4,
          borderColor: theme.colors.medBlue,
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 100,
        } : {position: 'absolute',
        bottom: 0, // space from bottombar
          height: 82,
          width: "100%",
          borderRadius: 58,
          borderWidth: 1,
          backgroundColor: theme.colors.white,
          borderColor: theme.colors.medBlue,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,}]}>
       <Logo width={50} />
      </View></View>
             ),
        }} 
        children={() => (
          <Dashboard
            navigation={navigation}
            user={navigation.state.params.user}
          />
        )}
        
        />
        <Tab.Screen name="Calendar" style={{zIndex: 2}} options={{
          tabBarLabel: 'Calendar',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons name="map-marker" color={color} size={size} />
          ),
        }}  children={() => (
          <Calendar
            navigation={navigation}
            user={navigation.state.params.user}
            load={true}

          />
        )} />
        <Tab.Screen name="Profile" options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-circle" color={color} size={size} />
          ),
        }} children={() => (
          <Profile
            navigation={navigation}
            user={navigation.state.params.user}

          />
        )} />
        
      </Tab.Navigator>
    </NavigationContainer>
  ) };
};

export default memo(Wrapper);
