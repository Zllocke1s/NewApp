import { StyleSheet} from 'react-native';
import {theme} from '../core/theme';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 48,
      fontWeight: 'bold',
      alignItems: 'center',
      alignContent: "center",
      backgroundColor: theme.colors.white
    },
    tileContainer: {
        paddingHorizontal: 10,
        marginTop: 20,
        flex: 1,
        width: "95%",
        backgroundColor: theme.colors.white
    },

    headerContainer: {
        flex: .15,
        backgroundColor: theme.colors.gray,
        padding: 35,
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
        backgroundColor: theme.colors.gray,
    },
    editButton: {
        justifyContent: "center",
        marginRight: 10
    },
    columns: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        textAlign: "left",
        justifyContent: "space-between"
    },
    rows:{
        display: "flex",
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
    }
  });