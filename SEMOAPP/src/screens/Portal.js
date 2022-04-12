import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/GradesStyle.js';
import { GradeTile } from '../components/Tile';

export default function Portal() {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
          <Text style={[styles.gradeTitle, {color:'black'}]}>Grades</Text>
        </View>
      </View>
      
      <View style={styles.tileContainer}>
        <View style={styles.gradeTileSub}></View>
          <GradeTile style={styles.gradeInfoTile}>hi</GradeTile>
      </View>
    </View>
    
  );
}

