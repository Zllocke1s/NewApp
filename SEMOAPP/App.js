import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from './styles/LandingStyle';
import { Tile, HeaderTile } from './components/Tile';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <HeaderTile name={"Calendar"} src={require("./assets/tiles/calendar.png")} fullscreen={false} />
          <HeaderTile name={"Maps"} src={require("./assets/tiles/map.png")} fullscreen={false} />
        </View>
      </View>
      <View style={styles.tileContainer}>
      <View style={styles.tileSubContainer}>
          <Tile name={"Shuttle Tracker"} src={require("./assets/tiles/shuttle.png")} fullscreen={false} />
          <Tile name={"Student Portal"} src={require("./assets/tiles/monitor.png")} fullscreen={false} />
          <Tile name={"Dine on Campus"} src={require("./assets/tiles/plate.png")} fullscreen={false} />
        </View>
        <View style={styles.tileSubContainer}>
          <Tile name={"Lab Availability"} src={require("./assets/tiles/calendar.png")} fullscreen={false} />
          <Tile name={"Reserve A Space"} src={require("./assets/tiles/editcal.png")} fullscreen={false} />
          <Tile name={"Student Government"} src={require("./assets/tiles/stugov.png")} fullscreen={true} />
        </View>
        <View style={styles.tileSubContainer}>
          <Tile name={""} src={false} fullscreen={false} />
          <Tile name={""} src={false} fullscreen={false} />
          <Tile name={""} src={false} fullscreen={false} />
        </View>
        </View>
    </View>
  );
}

