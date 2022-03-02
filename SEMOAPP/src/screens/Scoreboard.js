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
import { Value } from 'react-native-reanimated';



const Scoreboard = ({ navigation, user, load }) => {

  console.log("User: " + JSON.stringify(user));  

  const [graphs, setGraphs] = useState();
  
  const isFocused = useIsFocused();

  const [maxVal, setMaxVal] = useState(0);

  var values = [ {
    Name: "Sweetness",
    Points: eval(user.sweetness)
  },
  {
    Name: "Acidity",
    Points: eval(user.acidity)
  },
  {
    Name: "Body",
    Points: eval(user.body)
  },
  {
    Name: "Tannins",
    Points: eval(user.tannins)
  },
  {
    Name: "Alcohol",
    Points: eval(user.alcohol)
  }
  
]


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
      
    {values.map(function(item, index) {

return (<GraphBar place={index+1} color={theme.colors.medBlue} maxValue={100} value={item.Points} group={item.Name}/>);

})}
    </ScrollView>


    </View>

    </View>
   ) };
};

export default memo(Scoreboard);
