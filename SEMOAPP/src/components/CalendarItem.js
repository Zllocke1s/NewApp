import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons'; 
import Moment from 'moment';

//Todo: Tiling News through the tile


export const CalendarItem = (({item}) => {


    //console.log(item)
    const styles = StyleSheet.create({
        container: {
            fontSize: 48,
            paddingBottom: 5,
            paddingTop: 10,
            fontWeight: 'bold',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginTop: 20,
      
          },
          tag:
          {
              fontFamily: "Times",
              color: theme.colors.white,
              fontSize: 17,
              fontWeight: '400',
              marginLeft: 5
          },
          title:
          {
              fontFamily: "Times",
              color: theme.colors.white,
              fontSize: 15,
              marginLeft: 20
          },
          hour:
          {
              marginLeft:30,
              marginTop: 10,
              fontSize: 14,
              color: theme.colors.white,
              fontFamily: "Times"
          },
          location:
          {
              marginLeft: 10,
              marginTop: 20,
              fontSize: 12,
              color: theme.colors.white,
              fontFamily: "Times"
          }
        })
    
const [loaded] = useFonts({
    Times: require('../assets/fonts/times.ttf'),
  });
  if(!loaded)
  {
    return <AppLoading/>
  
  }
  else {
    return(
        <TouchableOpacity onPress={ () => Linking.openURL(item.link)} style={[styles.container, {backgroundColor: item.color}]}>
            <Text style={styles.tag}>{item.tags[0]}</Text>
            <Text style={styles.title}>{decode(item.title)}</Text>
            <Text style={styles.hour}><AntDesign name="clockcircleo" size={15} color={theme.colors.white}/>  {Moment(item.start).local().format("LT")}</Text>
            <Text style={styles.location}>{item.address}</Text>
        </TouchableOpacity>
    )
  }
})

