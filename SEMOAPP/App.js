import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { styles } from './styles/LandingStyle';
import { Tile, HeaderTile } from './components/Tile';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <HeaderTile name={"Calendar"} icon="icon" fullscreen={false} />
          <HeaderTile name={"Maps"} icon="icon" fullscreen={false} />
        </View>
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

