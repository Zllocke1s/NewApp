import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Heading } from '../components/Heading';
import { styles } from '../styles/LandingStyle';
export default function Reserve({navigation}) {
  return (
    <View style={styles.container}>
      <Heading navigation={navigation} title={"Reservations"}></Heading>    
      <View style={styles.tileContainer}>
        <Text></Text>
        </View>
        </View>
    
  );
}

