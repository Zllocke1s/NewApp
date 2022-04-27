import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';
import { BackButton } from './BackButton';



export const Heading = (({navigation, title, children}) => {
    const styles = {
        
    headerContainer: {
        backgroundColor: theme.colors.red,
        width: "100%",
        paddingTop: 20,
        alignItems: "flex-end",
     },
     headerSubContainer: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 5,
        paddingBottom: 10,
        width: "100%",
        flexDirection: "column"
        
     },
    title: {
        fontSize: 36,
        lineHeight: 36,
        color: theme.colors.gray,
    },
    
    }

    return(
        <View style={styles.headerContainer}>
        <View style={styles.headerSubContainer}>
            <BackButton onP={() => {navigation.goBack()}} />
            {title==null ? null : <Text style={styles.title}>{title}</Text>}
            {children}
      </View>
      </View>

    )

})