import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable } from 'react-native';
import {theme} from '../core/theme';
import {decode} from 'html-entities';
import React from 'react';
import Moment from 'moment';

//Todo: Tiling News through the tile


export const MinuteItem = (({type, auth, minutes}) => {

    const d = (minutes.Title.replace(new RegExp("Senate Mins[_ ]"), "").replace(".pdf", ""));

    var dateExp = d.split("_");
    var year = "20" + dateExp[2];
    var month = dateExp[0].length==1 ? "0" + dateExp[0] : dateExp[0];
    var day = dateExp[1].length==1 ? "0" + dateExp[1] : dateExp[1];
    var dateString = Moment(year + "-" + month + "-" + day).format('MMMM Do, YYYY')
    var valid = Moment(year + "-" + month + "-" + day).isValid()


    const [isOpen, toggleDet] = React.useState(false)
    //console.log("https://selink.semo.edu/organization/studentgov/documents/view/" + minutes.Id)
        return(
            <TouchableOpacity onPress={() => {
                //console.log("https://selink.semo.edu/organization/studentgov/documents/view/" + minutes.Id)
                Linking.openURL("https://selink.semo.edu/organization/studentgov/documents/view/" + minutes.Id)
                toggleDet(!isOpen)
            }}
             style={styles.container}>
                <View style={styles.textContainer}>
                    <Text style={styles.label}>{valid ? (type=="minutes" ? "Minutes - " : "Agenda - ") + dateString : minutes.Title}</Text>
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
        width: "90%",
        borderWidth: 1,
  
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