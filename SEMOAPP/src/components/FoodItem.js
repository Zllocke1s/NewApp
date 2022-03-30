import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';

//Todo: Tiling News through the tile


export const FoodItem = (({item}) => {

    const [isOpen, toggleDet] = React.useState(false)

        return(
            <TouchableOpacity onPress={() => {
                toggleDet(!isOpen)
            }}
             style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{item.name}</Text>
                </View>
                <View style={!isOpen ? styles.hidden : styles.detailsContainer}>
                    {item.nutrients.map((item) => {
                        if(item.value!=null && item.value!="" && item.value!="-")
                        {
                        return(
                            <View style={styles.detailContainer}>
                            <Text style={styles.detailLabel}>{item.name}: </Text><Text style={styles.detail}>{item.value}</Text>
                        </View>)}
                    })}
                    <Text style={styles.ingredients}>{"Ingredients: "}{item.ingredients}</Text>
                </View>
            </TouchableOpacity>
        );
    
});

const styles = StyleSheet.create({
    container: {
        flex: .3,
        fontSize: 48,
        paddingBottom: 10,
        paddingTop: 10,
        fontWeight: 'bold',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        margin: 0
  
      },
    textContainer: {
        padding: 0,
        alignSelf: "flex-start",
        textAlign: "center"
        
    },
    text: {
        justifyContent: 'center',
        alignSelf: 'center',
        textAlign: 'center'
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
        fontSize: 12,
        fontWeight: "bold"
    },
    detail: {
        fontSize: 12
    },
    ingredients: {
        fontSize: 12,
        fontStyle: 'italic'
    }
  });