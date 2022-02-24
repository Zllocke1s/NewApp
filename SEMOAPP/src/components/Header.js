import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../core/theme';

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

const styles = StyleSheet.create({
  header: {
    fontFamily: 'SulphurPoint-Bold',
    fontSize: 32,
    marginBottom: 16,
    marginTop: 16,
    color: theme.colors.black
  },
});

export default memo(Header);
