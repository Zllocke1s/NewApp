import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { AntDesign } from '@expo/vector-icons'; 
import Moment from 'moment';

//Todo: Tiling News through the tile


export const IMItem = (({item}) => {


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
              color: theme.colors.black,
              fontSize: 17,
              fontWeight: '400',
              marginLeft: 5
          },
          title:
          {
              fontFamily: "Times",
              color: theme.colors.black,
              fontSize: 15,
              marginLeft: 20
          },
          hour:
          {
              marginLeft:30,
              marginTop: 10,
              fontSize: 14,
              color: theme.colors.black,
              fontFamily: "Times"
          },
          location:
          {
              marginLeft: 20,
              marginTop: 5,
              fontSize: 12,
              color: theme.colors.black,
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
        <TouchableOpacity onPress={ () => Linking.openURL("https://www.google.com")} style={[styles.container]}>
            <Text style={styles.tag}>{item.sport}</Text>
            <Text style={styles.title}>{item.home} v. {item.away}</Text>
            <Text style={styles.hour}><AntDesign name="clockcircleo" size={15} color={theme.colors.black}/>  {(item.time)}</Text>
            <Text style={styles.location}>{item.location}</Text>
        </TouchableOpacity>
    )
  }
})

