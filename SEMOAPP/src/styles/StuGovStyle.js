import { StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 48,
      fontWeight: 'bold',
      backgroundColor: theme.colors.gray,
      alignItems: 'center',
      alignContent: "center",
      justifyContent: 'flex-start'
    },
    tabContainer: {
        marginBottom: -3,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
    },
    redActive: {
        padding: 10,
        paddingLeft: 60,
        paddingRight: 60,
        width: "100%",
        backgroundColor: theme.colors.red,
        
    },
    blueActive: {
        padding: 10,
        
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: theme.colors.blue,
    },
    inactive: {
        padding: 10,
        paddingLeft: 60,
        paddingRight: 60,
        backgroundColor: theme.colors.gray3,
    },
    tabTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: theme.colors.gray,
        marginTop: 0
    },
    infoContainer: {
        width: "100%",
        backgroundColor: theme.colors.gray,
        borderTopWidth: 15,
        borderWidth: 5,
        flex: 0.5
    },
    
    headerContainer: {
        flex: .15,
        backgroundColor: theme.colors.red,
        padding: 10
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: 35,
        marginTop: 20
    },
    title: {
        fontSize: 36,
        color: theme.colors.gray
    },
    
    galleryContainer:
    {
        flex: 0.5,
        justifyContent: "flex-start",
        alignItems: "flex-start",
        display: "flex",
        width: "100%",
        backgroundColor: theme.colors.gray2
    },
    galleryImg:
    {
        width: "100%",
        height: "100%"
    },
    scrollView: {
        width: "100%"
    },
    minutesContainer: {
        flex: 0.4,
        backgroundColor: theme.colors.gray2,
        width: "100%"
    }

  });
  