import React, { memo } from 'react';
import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native';
import { theme } from '../core/theme';

const AvatarPlaceholder = ({ selected, user, size }) => 
<View style={styles.container}>
<View style={[styles.outer, {width: size+1, height: size+1}]}>
<Text style={styles.text}>{user.slice(0, 2)}</Text>
  </View>
</View>

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        display: "flex",
      },
      tinyLogo: {
        resizeMode: "cover",
        overflow: "hidden"
      },
      text: {
        fontFamily: 'SulphurPoint-Regular',
      },
  
    outer: {
      borderColor: theme.colors.black,
      borderWidth: 1,
    backgroundColor: theme.colors.white,
    borderRadius: 4000,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center"
  },
});

export default memo(AvatarPlaceholder);
