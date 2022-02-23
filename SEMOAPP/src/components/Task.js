import { memo } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';
import CheckBox from 'react-native-check-box'
import * as React from 'react';
import CheckedBox from '../assets/checkedBox.svg';
import UncheckedBox from '../assets/uncheckedBox.svg';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Task = ({ title, time, style, children, ...props }) => {
  

const [checked, setChecked] = React.useState(false);

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
    fontSize: 14,
    color: theme.colors.darkBlue,
    textAlign: 'center',
    fontFamily: "SulphurPoint-Regular",    
    textAlignVertical: "center",
    marginLeft: 10

  },
  container:
  {
    textAlignVertical: "center",
    flex: 1,
    display: "flex",
    flexDirection: "row",
    marginLeft: 20,
    marginTop: 10,
  },
  checkbox:
  {
    
  },
  checkboxContainer:
  {
    overflow: 'hidden',
    borderWidth: 0,
    borderColor: theme.colors.darkBlue,
    width: 15,
    height: 15,
  },
  checkboxContainerHidden: // I don't actually hide it but don't tell anyone.
  {
    overflow: 'visible',
    borderWidth: 10, 
    borderColor: theme.colors.darkBlue
  }

  
});


return (
  <View style={styles.container} onStartShouldSetResponder={ () => setChecked(!checked) } ><MaterialCommunityIcons name="crop-square" color={theme.colors.darkBlue} size={20} /><Text style={styles.header}>{title}</Text></View>
   );
};
export default memo(Task);
