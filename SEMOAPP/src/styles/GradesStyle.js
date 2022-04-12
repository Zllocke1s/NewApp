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
        padding: 10,
        marginTop: 20,
        width: '95%',
        flex: 1,
        backgroundColor: theme.colors.blue
    },
    gradeTileSub: {
        flexDirection: "column",
        width: "100%"
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
    gradeInfoTile: {
        fontSize: 35,
        flex: .25,
        marginTop: 25,
        paddingLeft: 5
    },
    gradePercTile: {

    },
  });