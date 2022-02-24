import React, { memo, useReducer, useRef, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';
import AdvElement from '../components/AdvElement';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { theme } from '../core/theme';
import { styles } from '../styles/CubimalStyle';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import ComplexListItem from '../components/ComplexListItem';
import Task from '../components/Task';
import Announcement from '../components/Announcement';
import axios from 'axios';
import { render } from 'react-dom';




const Cubimals = ({ navigation }) => {

  const { user } = navigation.state.params.user;
  
  const [advTasks, setAdvTasks] = React.useState(null);


  var specialTasks;
  const [show, setShow] = React.useState(false);

  const [formattedAdvTasks, setFormattedAdvTasks] = React.useState(null);


  const [submit_button, setSubmit_button] = React.useState(null);

  const [heading, setHeading] = React.useState(null);


  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../assets/fonts/SulphurPoint-Regular.ttf"),
    });
  if (!isLoaded) {
    return <AppLoading />;
  } else {
    
  return (
    
    
    <View style={show ? styles.container : styles.containerShow}>
{/*
<Button style={styles.logoutButton} mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      <Text style={styles.logoutButton} >Logout</Text> 
  </Button> */}

<Text style={styles.welcome}>Cubimals</Text>
    
    
    <View borderwidth={1} style={styles.ListBox}>
    <View style={[styles.advBoxShow]}>
    <View style={styles.buttonHolder}>
    <Button style={styles.leave} mode="outlined">
      <Text style={styles.leave} >Leave</Text>
  </Button> 
</View>
      <ScrollView contentContainerStyle={styles.advScrollView}>
      </ScrollView>
    </View>


  </View>
    </View>
   ) };
};

export default memo(Cubimals);
