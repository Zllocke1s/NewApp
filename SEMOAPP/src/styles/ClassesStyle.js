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
    resetButton: {
        backgroundColor: "#fff",
        color: theme.colors.black,
        width: "80%",
        justifyContent: "center",
        alignSelf: "center",
        marginBottom: 20,
        borderColor: theme.colors.gray3,
        borderWidth: 2,
        borderRadius: 5
    },
    modalText: {
        fontSize: 20,
        textAlign: "center"
    },
    modalView: {
        width: "70%",
        backgroundColor: theme.colors.white,
        alignSelf: "center",
        marginTop: 200,
        justifyContent: "space-between",
        flex: 0.5,
        borderRadius: 4,


    },
    tileContainer: {
        flex: 1,
        width: "100%",
        backgroundColor: theme.colors.white
    },

    closeModal: {

    },
    closeText: {
        color: theme.colors.black
    },
    gradeTitle: {
        fontSize: 35,
        flex: 1,
        marginTop: 25,
        paddingTop: 25,
        backgroundColor: theme.colors.red,
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
    },
    day: {
        backgroundColor: theme.colors.gray,
        padding: 10,
    },
    course: {
        backgroundColor: theme.colors.white,
        padding: 10,
        borderWidth: 2,
        borderColor: theme.colors.gray
    },
    doW: {
        fontSize: 16,
        fontWeight: 'bold'
    },
    className: {
        fontSize: 14,
        fontWeight: "bold"
    },
    classCode: {
        fontStyle: 'italic',
        paddingBottom: 10
    }

  });