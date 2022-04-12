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
    headerContainer: {
        flex: .25,
        backgroundColor: theme.colors.red,
    },  
    input: {
        height: 40,
        width: "50%",
        backgroundColor: theme.colors.white,
        borderRadius: 4,
        margin: 6,
        borderWidth: 1,
        padding: 10,
      },
    title: {
        marginTop: 10,
        fontSize: 35,
        color: theme.colors.gray
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        paddingTop: 35
    },
    tileContainer: {
        padding: 10,
        marginTop: 20,
        width: "100%"
    },
    newsTileContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 10,
        justifyContent: "center",
        padding: 0
    },
    tileSubContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 10
    },
    socialMediaContainer: {
        display: "flex",
        flexDirection: "row",
        width: 180,
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        right: 5,
    },
    message: {
        fontSize: 18,
    },
    hidden: {
        display: "none"
    },
    logIn: {
        width: "100%"
    },
    loggedIn: {
        width: "100%"
    },
    username: {
        fontWeight: "bold",
        fontSize: 18
    },
    button: {
        width: 100,
        marginTop: 10,
        paddingTop: 10,
        paddingBottom: 10,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.colors.white,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 7,
    },
    logout: {
        color: theme.colors.black,
        fontSize: 17,
        fontWeight: "bold"
    }
  });
  