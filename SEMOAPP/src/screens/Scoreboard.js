import React, { memo, useState, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../assets/logo.svg';

import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { theme } from '../core/theme';
import { styles } from '../styles/ScoreboardStyle';
import { Text, View } from 'react-native';
import GraphBar from '../components/GraphBar';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';



const Scoreboard = ({ navigation, user, load }) => {

  
  const [data, setData] = useState([]);

  const isFocused = useIsFocused();

  const [maxVal, setMaxVal] = useState(0);

 useEffect(() => {
   if(isFocused)
   {
    console.log("Focused!!!");
    fetch('http://outpostorganizer.com/SITE/api.php/records/SmallGroups?camp=' + user.Home + '&order=Points,desc', {
  method: 'GET'
})
.then((response) => response.json())
.then((responseJson) => {
//  console.log(responseJson);
  //setData(responseJson.records);
  setData(
    [
      {
        Name: "Sweetness",
        Points: 75
      },
      {
        Name: "Acidity",
        Points: 47
      },
      {
        Name: "Body",
        Points: 20
      },
      {
        Name: "Tannins",
        Points: 5
      },
      {
        Name: "Alcohol",
        Points: 35
      }
      
    ]
  );
  

 // console.log(responseJson.records);
 // console.log("Umm data is above, and user is below");
  var max = 0;
  var array = [];
  for(var i=0; i<responseJson.records.length; i++)
  {
    console.log("loop iteration " + i + ": " + responseJson.records[i].Points);
    array.push( responseJson.records[i].Points);
  }
  console.log("ARRAY: " + array);
  const maxv = Math.max(...array);
console.log("Max: " + maxv);
  
  //setMaxVal(maxv);
  setMaxVal(100);
  global.maxVal = maxv;
  console.log(maxv);
  console.log("Score Grabbed");
} )
   }
  },[isFocused]);


//
useEffect(() => {
  console.log("useeffect called");
  fetch('http://outpostorganizer.com/SITE/api.php/records/SmallGroups?camp=' + user.Home + '&order=Points,desc', {
  method: 'GET'
})
.then((response) => response.json())
.then((responseJson) => {
//  console.log(responseJson);
  //setData(responseJson.records);
  setData(
    [
      {
        Name: "Sweetness",
        Points: 75
      },
      {
        Name: "Acidity",
        Points: 47
      },
      {
        Name: "Body",
        Points: 20
      },
      {
        Name: "Tannins",
        Points: 5
      },
      {
        Name: "Alcohol",
        Points: 35
      }
      
    ]
  )
 // console.log(responseJson.records);
 // console.log("Umm data is above, and user is below");
  var array = [];
  for(var i=0; i<responseJson.records.length; i++)
  {
    console.log("loop iteration " + i + ": " + responseJson.records[i].Points);
    array.push( responseJson.records[i].Points);
  }
  console.log("ARRAY: " + array);
  const max = Math.max(...array);
  console.log("Other max?: " + max);
  //setMaxVal(max);
  setMaxVal(100);
  console.log(max);
  console.log("Score Grabbed");
} )
}, [load]);

if(load)
{
  load = false;
}

  const [isLoaded] = useFonts({
    "SulphurPoint-Bold": require("../assets/fonts/SulphurPoint-Bold.ttf"),
    "SulphurPoint-Light": require("../assets/fonts/SulphurPoint-Light.ttf"),
    "SulphurPoint-Regular": require("../assets/fonts/SulphurPoint-Regular.ttf"),
    });
  if (!isLoaded) {
    return <AppLoading />;
  } else {

  return (
    <View style={styles.container}>
    <Header>Your Taste Profile</Header>
    <View style={styles.scoreboardBox}>
    <ScrollView style={{width: "100%"}}>
      {
    console.log("Data: " + JSON.stringify(data))}
    {data.map(function(item, index) {

    return (<GraphBar place={index+1} color={theme.colors.medBlue} maxValue={maxVal} value={item.Points} group={item.Name}/>);
  })}
    </ScrollView>


    </View>

    </View>
   ) };
};

export default memo(Scoreboard);
