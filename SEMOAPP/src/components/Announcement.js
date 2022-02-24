import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import Button from './Button';
import Icon from 'react-native-vector-icons/FontAwesome5';


const Announcement = ({ heading, children }) => <View style={styles.container}>
  <View style={styles.subContainer}>
    <View style={styles.textContainer}>
      <Text style={styles.announcementTextHeading}>{heading}</Text>
      <Text style={styles.announcementText}>{children}</Text>
      </View>
      <Button style={styles.button} mode="outlined"><Icon name="trash" size={25} color={theme.colors.lightGreen} /></Button>
      </View>
      <View style={{width: "100%", borderBottomColor: 'black', borderBottomWidth: 1, opacity: .15}}/>
      </View>;

const styles = StyleSheet.create({
  announcementText: {
    fontSize: 16,
    paddingBottom: 10,
    fontFamily: "SulphurPoint-Regular",
  
  },  
  
  button: {
    width: 10,
    padding: 0,
    alignSelf: "center",
    backgroundColor: theme.colors.medBlue,
  },
  announcementTextHeading: {
    fontSize: 18,
    fontFamily: "SulphurPoint-Bold",
    paddingTop: 10
  },  
  subContainer: {
    
    flexDirection: "row"
  },
  container: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    width: "80%",
    flexDirection: "column"
  },
  textContainer: {
    flexDirection: "column",
    width: "80%"
  }
});

export default memo(Announcement);
