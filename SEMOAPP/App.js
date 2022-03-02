import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles/LandingStyle';
import { Tile } from './components/Tile';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
      <Text>Header Text</Text>
      </View>
      <View style={styles.tileContainer}>
      <View style={styles.tileSubContainer}>
          <Tile name={"Shuttle Tracker"} icon="icon" fullscreen={false} />
          <Tile name={"Student Portal"} icon="icon" fullscreen={false} />
          <Tile name={"Dine on Campus"} icon="icon" fullscreen={false} />
        </View>
        <View style={styles.tileSubContainer}>
          <Tile name={"Lab Availability"} icon="icon" fullscreen={false} />
          <Tile name={"Reserve A Space"} icon="icon" fullscreen={false} />
          <Tile name={"Student Government"} icon="icon" fullscreen={false} />
        </View>
        <View style={styles.tileSubContainer}>
          <Tile name={""} icon="icon" fullscreen={false} />
          <Tile name={""} icon="icon" fullscreen={false} />
          <Tile name={""} icon="icon" fullscreen={false} />
        </View>
        </View>
    </View>
  );
}

