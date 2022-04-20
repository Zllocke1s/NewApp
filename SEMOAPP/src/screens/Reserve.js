import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/ReserveStyle';
export default function Reserve() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={styles.title}>Reserve a Space</Text>
         </View>
      </View>
      
      <View style={styles.tileContainer}>
        <Text>Reserve</Text>
        </View>
        </View>
    
  );
}

