import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/LandingStyle';
export default function Labs() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text>Heading</Text>
         </View>
      </View>
      
      <View style={styles.tileContainer}>
        <Text>Labs</Text>
        </View>
        </View>
    
  );
}

