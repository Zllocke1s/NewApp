import { TouchableOpacity, Linking, Image, StyleSheet, Text, View, Touchable, Dimensions } from 'react-native';
import {theme} from '../core/theme';
import {sizes} from '../core/sizes';
import {decode} from 'html-entities';
import React from 'react';
import { BackButton } from './BackButton';


export const Heading = (({navigation, title, children, validate}) => {

    const [lp, setLP] = React.useState(0);



    function longPress() {
        if(lp>=5)
        {
            setLP(0)
            if(validate!=null)
            {
                validate("credentials");
            }
            navigation.navigate("Landing")}
        else
        {
            setLP(lp+1)
        }
    
    }

    const styles = {
        
    headerContainer: {
        backgroundColor: theme.colors.red,
        width: "100%",
        paddingTop: 50,
    
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
        fontSize: sizes.title,
        lineHeight: 36,
        color: theme.colors.gray,
    },
    
    }

    return(
        <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerSubContainer} activeOpacity={1.0} onLongPress={() => {longPress()}}>
            {title==null ? null : <Text style={styles.title}>{title}</Text>}
            {children}
      </TouchableOpacity>
      </View>

    )

})