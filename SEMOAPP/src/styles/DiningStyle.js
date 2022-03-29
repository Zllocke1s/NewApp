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
        flex: .2,
        backgroundColor: theme.colors.red,
        padding: 50,
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
    },
    tileContainer: {
        padding: 10,
        marginTop: 20,
        width: '50%',
        marginRight: 200
    },
    tileSubContainer: {
        display: "flex",
        flexDirection: "column",
        width: "100%",
        justifyContent: "space-between",
        padding: 10
    },
    diningTileSub: {
        flexDirection: "column",
        width: 375,
        height: 600,
        justifyContent: "space-between",
        padding: 10
    },
    pickTitle: {
        fontSize: 40,
        flex: 1,
        paddingLeft: 12,
    },
  });