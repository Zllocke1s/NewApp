import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';
import Moment from 'moment';
import { AntDesign } from '@expo/vector-icons'; 


//Todo: Tiling News through the tile


export const BackButton = (({style, onP}) => {

        return(
            <TouchableOpacity onPress={() => {
                onP()
            }}
             style={[styles.container, style]}>
                <View style={styles.textContainer}>
                    <AntDesign name="caretleft" size={24} color={theme.colors.gray3} />
                </View>
            </TouchableOpacity>
        );
    
});

const styles = StyleSheet.create({
    container: {
        zIndex: 100,
        left: 10,
        top: -7,
        backgroundColor: 'transparent',
        borderRadius: 10,
        padding: 10,
        width: 50,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        position: "absolute",
    },
    textContainer: {
        padding: 0,
        alignSelf: "center",  
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