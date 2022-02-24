import React, { memo } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

const CheckCircle = ({ selected }) => 
<View style={styles.container}>
<View style={styles.outer}>
    <View style={selected ? styles.innerSelected : styles.inner} />
  </View>
</View>

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
  
    outer: {
    backgroundColor: theme.colors.medBlue,
    borderRadius: 40,
    width: 45,
    height: 45,
  },
  inner: {
    borderRadius: 35,
    width: 40,
    height: 40,
    margin: 2.5,
      backgroundColor: theme.colors.lightBlue
  },
  innerSelected: {
    borderRadius: 35,
    width: 40,
    height: 40,
    margin: 2.5,
      backgroundColor: theme.colors.darkBlue
  }
});

export default memo(CheckCircle);
