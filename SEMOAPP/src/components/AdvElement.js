import { memo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CheckCircle from './CheckCircle';

const AdvElement = ({ tasks, site, onclick, key, startChecked, title, ...props }) => {
  
const [checked, setChecked] = React.useState(false);

function marked() {
  setChecked(!checked);
  console.log("KEY: " + key);
  onclick(key, title, !checked, site, tasks.split("& "));

}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    lineHeight: 26,
    color: theme.colors.darkBlue,
    marginBottom: 14,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",
    marginLeft: 40,
    textAlignVertical: "center"

  },
  header: {
    fontSize: 35,
    color: theme.colors.black,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",    
    textAlignVertical: "center",
    marginLeft: 10,
    alignSelf: "flex-start",
    flex: 0.8

  },
  headerChecked: {
    fontSize: 35,
    color: theme.colors.black,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",    
    textAlignVertical: "center",
    marginLeft: 10,
    alignSelf: "flex-start",
    textDecorationLine: 'line-through', 
    textDecorationStyle: 'solid',
    flex: 0.8

  },
  container:
  {
    textAlignVertical: "center",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.colors.lightBlue,
    alignSelf: 'stretch',
    marginTop: 20,
    justifyContent: "space-between",
    paddingRight: 10,
    borderRadius: 10,
    padding: 5, 
    marginLeft: 20,
    marginRight: 20,
  },
  containerHidden:
  {
    display: 'none'
  },
  checkbox:
  {
    
  },
  checkboxContainer:
  {
    alignSelf: "flex-end",
  },
  checkboxContainerHidden: // I don't actually hide it but don't tell anyone.
  {
    overflow: 'visible',
    borderWidth: 10, 
    borderColor: theme.colors.darkBlue
  }

  
});


return (
  <View style={checked ? styles.containerHidden : styles.container}>
    <Text style={checked ? styles.headerChecked : styles.header}>
      {title}
    </Text>
    <View style={styles.checkboxContainer}  onStartShouldSetResponder={ () => marked() }>
     <CheckCircle selected={checked}/>
    </View>
  </View>
  );
};
export default memo(AdvElement);
