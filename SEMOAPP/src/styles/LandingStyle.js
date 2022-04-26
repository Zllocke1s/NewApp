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
        backgroundColor: theme.colors.black,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 10,
        flexDirection: "row",
        display: "flex",

    },
    error: {
        fontSize: 15,
        color: theme.colors.red
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
    },input: {
        height: 40,
        width: "50%",
        backgroundColor: theme.colors.white,
        borderRadius: 4,
        margin: 4,
        paddingLeft: 10,
        borderWidth: 1,
        padding: 10,
      },rows: {
        display: "flex",
        flexDirection: "row"
    },
    visible: {
        justifyContent: "center",
        marginLeft: 5
    },
    loginPrompt: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "rgba(30, 30, 30, 0.6)",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 100
    },
    loginBox: {
        width: "80%",
        backgroundColor: theme.colors.white,
        padding: 20,
        borderColor: theme.colors.red,
        borderWidth: 2,
    },
    button: {
        width: 100,
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
    },
    tileContainer: {
        padding: 10,
        width: "100%",
        flex: 1,
        marginBottom: 10,
    },
    newsTileContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: 10,
        justifyContent: "center",
        padding: 0,
        marginBottom: 160,
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
    }
  });
  