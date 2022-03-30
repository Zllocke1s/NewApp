import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View, ScrollView } from 'react-native';
import { styles } from '../styles/SubDiningStyle';
import { DiningChoiceTile } from '../components/Tile';
import React, { useEffect } from 'react';
import AppLoading from 'expo-app-loading';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FoodItem } from '../components/FoodItem';
import { AntDesign } from '@expo/vector-icons'; 

export default function SubDining({navigation}) {

  var id = navigation.state.params.id
  var locName = navigation.state.params.name
  var status = navigation.state.params.status

  const [date, setDate] = React.useState(new Date());
  const [isLoaded, setLoaded] = React.useState(false)
  const [meals, setMeals] = React.useState(null);
  const [formattedItems, setFormattedItems] = React.useState(null);

    useEffect(() => {
      fetch('https://api.dineoncampus.com/v1/location/' + id + '/periods?platform=0&date=2022-3-24')
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setMeals(json);
      }
        )
      .catch((error) => {
        console.error(error);
      });
      
  
    }, [])
  


  useEffect(() => {
    if(meals!=null)
    {    
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
  }
  }, [meals])

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>{locName}</Text>
         </View>
         <Text style={[styles.hours, {color: status.color}]}><AntDesign name="clockcircleo" size={18} color={status.color} />  {status.message}</Text>
      </View>
      
      <View style={styles.headerTileContainerContainer}>
        <TouchableOpacity style={styles.headerTileContainer}>
         <Image style={styles.hTLogo} source={require("../assets/tiles/calendar.png")}></Image>
         <Text>Date</Text>
         </TouchableOpacity>
        <TouchableOpacity style={styles.headerTileContainer}>
        <Image style={styles.hTLogo} source={require("../assets/tiles/plate.png")}></Image>
         <Text>Meal</Text>
         </TouchableOpacity>
      </View>
      
      <View style={styles.mealContainer}>
        <ScrollView style={styles.diningTileSub}>
          {formattedItems}
        </ScrollView>
      </View>
      </View>
    </View>
    
  );
}
