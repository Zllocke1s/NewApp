import { StatusBar } from 'expo-status-bar';
import { StyleSheet, ActivityIndicator, Button, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/SubDiningStyle';
import { DiningChoiceTile } from '../components/Tile';
import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FoodItem } from '../components/FoodItem';
import { AntDesign } from '@expo/vector-icons'; 
import {Picker} from 'react-native';
import Moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import { theme } from '../core/theme';
import { Heading } from '../components/Heading';

export default function SubDining({navigation}) {
  Moment.locale('en');

  var id = navigation.state.params.id
  var locName = navigation.state.params.name
  
  const [status, setStatus] = React.useState(navigation.state.params.status)
  const [currentPeriod, setCurrentPeriod] = React.useState(null)
  const [periods, setPeriods] = React.useState([])
  const [date, setDate] = React.useState((new Date()));
  const [isLoaded, setLoaded] = React.useState(false)
  const [meals, setMeals] = React.useState(null);
  const [formattedItems, setFormattedItems] = React.useState(null);
  const [formattedPeriods, setFormattedPeriods] = React.useState(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log("Refreshing")
      fetch('https://api.dineoncampus.com/v1/locations/status?site_id=5751fd3290975b60e0489360&platform=0')
    .then((response) => response.json())
    .then((json) => {
      setStatus(json.locations.find((location) => location.id==id).status);
    }
      )
    .catch((error) => {
      console.error(error);
    });
    }, 30000);
    return () => clearInterval(interval);
  })

  const onDateChange = (event, selectedDate) => {
    setShow(false);
    const currentDate = selectedDate;
    setLoaded(false)
    setDate(currentDate);
  };

  useEffect(() => {
    setLoaded(false);
    //console.log('https://api.dineoncampus.com/v1/location/' + id + '/periods/?platform=0&date='  + Moment(date).format('YYYY-M-D'))
    if(currentPeriod==null)
    {
      fetch('https://api.dineoncampus.com/v1/location/' + id + '/periods?platform=0&date=' + Moment(date).format('YYYY-M-D'))
    .then((response) => response.json())
    .then((json) => {
      setMeals(json)
    }
      )
    .catch((error) => {
      console.error(error);
    });
    
    }
    else
    {
      fetch('https://api.dineoncampus.com/v1/location/' + id + '/periods/' + currentPeriod + '?platform=0&date='  + Moment(date).format('YYYY-M-D'))
      .then((response) => response.json())
      .then((json) => {
        setMeals(json)

      }
        )
      .catch((error) => {
        console.error(error);
      });
      
    }
    

  }, [])
  
  useEffect(() => {
    if(currentPeriod==null)
    {
      fetch('https://api.dineoncampus.com/v1/location/' + id + '/periods?platform=0&date='  + Moment(date).format('YYYY-M-D'))
    .then((response) => response.json())
    .then((json) => {
      setMeals(json)
    }
      )
    .catch((error) => {
      console.error(error);
    });
    
    }
    else
    {
      fetch('https://api.dineoncampus.com/v1/location/' + id + '/periods/' + currentPeriod + '?platform=0&date='  + Moment(date).format('YYYY-M-D'))
      .then((response) => response.json())
      .then((json) => {
        setMeals(json)

      }
        )
      .catch((error) => {
        console.error(error);
      });
      
    }
    

  }, [currentPeriod])

  useEffect(() => {
      fetch('https://api.dineoncampus.com/v1/location/' + id + '/periods?platform=0&date='  + Moment(date).format('YYYY-M-D'))
    .then((response) => response.json())
    .then((json) => {
      setMeals(json)
      setCurrentPeriod(null)
    }
      )
    .catch((error) => {
      console.error(error);
    });
    
  }, [date])
  
  


  useEffect(() => {
    if(meals!=null && meals.menu.periods!=null)
    {    
      setPeriods(meals.periods)
      //console.log(meals)
      setFormattedItems(meals.menu.periods.categories.map((category) => {
        return(
          <View>
          <Text style={styles.categoryTitle}>{category.name}</Text>
          <View style={styles.itemContainer}>
          {category.items.map((item) => {
            return(
              <FoodItem style={styles.item} item={item} />
            )
        })}
        </View>
        </View>
        )
      }))
      setLoaded(true)
  }
  
  
  }, [meals])

  useEffect(() => {
    if(periods!=null)
    {
    setFormattedPeriods(
      periods.map((period) => {
        return <Picker.Item label={period.name} value={period.id} />
      })
    )
    }
  }, [periods])

  return (
    <View style={styles.container}>
      <Heading navigation={navigation} title={locName}>     
      <View style={{padding: 10, backgroundColor: theme.colors.white, borderRadius: 5}}>
         <Text style={[styles.hours, {color: status.color}]}><AntDesign name="clockcircleo" size={18} color={status.color} />  {status.message}</Text>
         </View></Heading>
      
      <View style={styles.headerTileContainerContainer}>
         <TouchableOpacity onPress={() => {
          setShow(true)

        }} 
        style={styles.headerTileContainer}>
         <Image style={styles.hTLogo} source={require("../assets/tiles/calendar.png")}></Image>
         <Text>Date</Text>
         </TouchableOpacity>{/*
        <View style={styles.headerTileContainer}>
        <Image style={styles.hTLogo} source={require("../assets/tiles/plate.png")}></Image>
         <Text>Meal</Text>
      </View> */}
         <View>
           <Picker selectedValue={currentPeriod}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => {
          setLoaded(false)
          setCurrentPeriod(itemValue)}
        }
        >
           {formattedPeriods}
           </Picker>
         </View>
         {show && (<DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode='date'
          is24Hour={true}
          onChange={onDateChange}
        />)}
      </View>
      
      <View style={styles.mealContainer}>
        <ScrollView style={styles.diningTileSub}>
          {isLoaded ? formattedItems : 
           <ActivityIndicator style={styles.loadingBar} size="large" color={theme.colors.red} />
         }
         </ScrollView>
      </View>
    </View>
    
  );
}
