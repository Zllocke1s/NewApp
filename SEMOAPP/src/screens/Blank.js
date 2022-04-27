import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { Heading } from '../components/Heading';
import { styles } from '../styles/LandingStyle';
export default function Blank({navigation}) {
  return (
    <View style={styles.container}>
                  <Heading navigation={navigation} title={"Title"}>
                     </Heading>
      <View style={styles.tileContainer}>
        <Text>hello</Text>
        </View>
        </View>
    
  );
}

