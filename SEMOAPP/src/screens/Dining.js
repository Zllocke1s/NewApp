import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/DiningStyle';
import { DiningChoiceTile } from '../components/Tile';

export default function Dining() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={[styles.pickTitle, {color:'white'}]}>Choose a Location...</Text>
         </View>
      </View>
      
      <View style={styles.tileContainer}>
        <View style={styles.diningTileSub}>
          <DiningChoiceTile name={"Houcks Place"} fullscreen={false} />
          <DiningChoiceTile name={"Redhawks Market"} fullscreen={false} />
          <DiningChoiceTile name={"Subway"} fullscreen={false} />
        </View>
      </View>
    </View>
    
  );
}

