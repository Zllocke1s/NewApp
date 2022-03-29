import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/DiningStyle';
import { DiningChoiceTile } from '../components/Tile';

export default function Dining({navigation}) {

  function navigateTo(name) {
    switch(name)
    {
      case("Houcks Place"):
      console.log("Houcks Place")
      break;
      case("Redhawks Market"):
      console.log("Redhawks Market")
      break;
      case("Subway"):
      console.log("Subway")
      break;
      default:
        console.log("the abyss");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={[styles.choiceTitle, {color:'white'}]}>Choose a Location...</Text>
         </View>
      </View>
      
      <View style={styles.tileContainer}>
        <View style={styles.diningTileSub}>
          <DiningChoiceTile onP={navigateTo} name={"Houcks Place"} />
          <DiningChoiceTile onP={navigateTo} name={"Redhawks Market"} />
          <DiningChoiceTile onP={navigateTo} name={"Subway"} />
        </View>
      </View>
    </View>
    
  );
}

