import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 48,
      fontWeight: 'bold',
      backgroundColor: '#eee',
      alignItems: 'center',
      alignContent: "center",
      justifyContent: 'flex-start',
      margin: 0

    },
    headerContainer: {
        flex: .35,
        flexDirection: "row",
        display: "flex",
        width: '100%',
        backgroundColor: "#C8102E",
        padding: 10,
        justifyContent: "center"
    },
    headerSubContainer: {
        flexDirection: "row",
        width: 500,
        height: 100,
        padding: 10,
        paddingTop: 35
    },
    tileContainer: {
        padding: 10,
        margin: 20,
        justifyContent: "space-between",
        width: "100%"
    },
    tileSubContainer: {
        display: "flex",
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        padding: 10
    }
  });
  