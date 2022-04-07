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
    }
  });
  