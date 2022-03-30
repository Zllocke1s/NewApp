import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';

//Todo: Tiling News through the tile


export const MinuteItem = (({auth, minutes}) => {

    
    const [isOpen, toggleDet] = React.useState(false)

        return(
            <TouchableOpacity onPress={() => {
                Linking.openURL(minutes.Links[0].Href)
                toggleDet(!isOpen)
            }}
             style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>{minutes.Title}</Text>
                </View>
                <View style={!isOpen ? styles.hidden : styles.detailsContainer}>
                </View>
            </TouchableOpacity>
        );
    
});

const styles = StyleSheet.create({
    barContainer: {
        flex: 0.4,
        
    },
    barLabel: {
        justifyContent: "center",
        alignSelf: "center"
    },
    barHolder: {
        backgroundColor: theme.colors.gray2,
        borderRadius: 10,
        width: "100%",
        flex: 1
    },
    bar: {
        width: "100%",
        backgroundColor: theme.colors.red,
        flex: 1,
        height: 30,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16
    },
    container: {
        flex: .05,
        fontSize: 48,
        paddingBottom: 10,
        paddingTop: 10,
        marginLeft: 10,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        margin: 0,
        backgroundColor: theme.colors.gray,
        marginTop: 10,
        padding: 10,
        borderRadius: 4,
        width: "90%"
  
      },
    textContainer: {
        padding: 0,
        alignSelf: "flex-start",  
        display: "flex",
        flexDirection: "row"      
    },
    text: {
        fontSize: 26,
        flex: 0.6,
        fontWeight: "bold"
        //text formatting here
    },
    hidden: {
        width: 0,
        display: "none"
    },
    detailsContainer: {
            marginLeft: 10,
    },
    detailContainer: {
        display: "flex",
        flexDirection: "row"
    },
    detailLabel: {
        fontSize: 16,
        fontWeight: "bold"
    },
    detail: {
        fontSize: 16
    },
    row: {
        display: "flex",
        flexDirection: "row"
    }
  });