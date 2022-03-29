import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/DiningStyle';
import { Tile, HeaderTile, NewsTile } from '../components/Tile';

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
          <Tile name={"Houcks Place"}  fullscreen={true} />
          <Tile name={"Redhawks Market"}  fullscreen={true} />
          <Tile name={"Student Government"}  fullscreen={true} />
        </View>
      </View>
    </View>
    
  );
}

