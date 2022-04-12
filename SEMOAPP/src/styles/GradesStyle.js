import { StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 48,
      fontWeight: 'bold',
      backgroundColor: theme.colors.red,
      alignItems: 'center',
      alignContent: "center"
    },
    tileContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
        flex: 1,
        width: "95%",
        backgroundColor: theme.colors.blue
    },
    gradeTileSub: {
        width: 100,
        height: 100,
        alignItems: "flex-start",
        justifyContent: 'center',
    },
    headerContainer: {
        flex: .15,
        backgroundColor: theme.colors.white,
        padding: 35,
        backgroundColor: theme.colors.green,
        alignContent: "flex-start"
    },
    headerSubContainer: {
        flexDirection: "row",
        width: "100%"
    },
    gradeTitle: {
        fontSize: 35,
        flex: 1,
        marginTop: 25,
        paddingTop: 25,
        backgroundColor: theme.colors.white,
    },
    classTile: {
        fontSize: 35,
        flex: .25,
        marginTop: 25,
        paddingLeft: 5
    },
    gradePercTile: {
        fontSize: 35,
        flex: .25,
        marginTop: 25,
        paddingLeft: 5
    },
    columns: {
        display: "flex",
        flexDirection: "row",
        flex: 1,
        width: "100%",
        textAlign: "left",
        justifyContent: "flex-start"
    },
    rows:{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    }
  });