import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

const GraphBar = ({value, maxValue, color, group, place}) => {

const styles = StyleSheet.create({
  bar: {
    backgroundColor: theme.colors.darkBlue, 
    width: (value*100/maxValue) + "%", 
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    zIndex: 100,
    position: 'absolute',
    top: 0,
    left: 0,

  },
  barBackground: {
    backgroundColor: theme.colors.lightBlue, 
    width: "100%", 
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    flex: 1

  },
  barLabel: {
    fontFamily: "SulphurPoint-Light",
    fontSize: 21, 
    color: theme.colors.black,
    marginRight: 5
    
  },
  barGroup: {
    fontFamily: "SulphurPoint-Light",
    fontSize: 21,
    color: theme.colors.black,
    textAlign: "left",
    marginLeft: 15,
  },
  barContainer: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  barText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  notNumber: {
    display: "flex",
    flex: 1
  },
  number: {
    display: "flex",
    flex: 0.08,
    fontSize: 40,
    fontFamily: "SulphurPoint-Bold",
    textAlign: "right",
    marginRight: 5,
    marginTop: 10,
    textAlignVertical: "center"
  }

});

return (
  <View style={styles.barContainer}><View style={styles.number}><Text style={styles.number}>{place}</Text></View><View style={styles.notNumber}><View style={styles.barText}><Text style={styles.barGroup}>{group}</Text><Text style={styles.barLabel}>{value} %</Text></View>
  <View style={styles.barBackground}><View style={styles.bar}><Text></Text></View></View></View>

</View>
);

};
export default memo(GraphBar);
