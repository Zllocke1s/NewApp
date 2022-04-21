import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/AlertsStyle';
import { AlertTile } from '../components/Tile';

export default function Alerts() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={[styles.alertsTitle, {color:'white'}]}>Alerts</Text>
         </View>
      </View>
      
      <View style={styles.tileContainer}>
            <AlertTile title={"Tornado Warning"} message={"The National Weather Service in Paducah, KY has issued a tornado warning for Cape Girardeau county. Please seek shelter immediately."} date={"May 08, 2022 @ 10:30:00 p.m."}></AlertTile>
            <AlertTile title={"Boil Water Advisory"} message={"The City of Cape Girardeau issued a precautionary Boil Water Advisory which covers all of main campus until further notice."} date={"April 27, 2022 @ 09:30:00 a.m."}></AlertTile>
            <AlertTile title={"Campus Lockdown"} message={"Around midnight, an armed suspect fled a traffic stop at Henderson and Broadway. Suspect is a white male, 6', thin build, wearing jeans and a dark hoodie. Until located, the main campus is to remain on lockdown. Please notify local authorities if you spot this individual."} date={"April 17, 2022 @ 01:30:00 a.m."}></AlertTile>
      </View>
    </View>
    
  );
}

