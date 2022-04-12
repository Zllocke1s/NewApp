import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Image, View } from 'react-native';
import { styles } from '../styles/GradesStyle.js';
import { ClassTile, GradePercentTile } from '../components/Tile';

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
          <View style={styles.rows}>
            <View style={styles.columns}>
              <ClassTile style={styles.gradeInfoTile} classname="CS155-01: Computer Science I" professor="Suhair Amer"></ClassTile>
              <GradePercentTile style={styles.gradePercTile} percentage="85.5%"></GradePercentTile>
            </View>
          </View>
      </View>
    </View>
    
  );
}

