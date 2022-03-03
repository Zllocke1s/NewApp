import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      fontSize: 48,
      fontWeight: 'bold',
      backgroundColor: '#eee',
      alignItems: 'center',
      alignContent: "center",
      justifyContent: 'flex-start'
    },
    headerContainer: {
        flex: .35,
        flexDirection: "row",
        width: '100%',
        backgroundColor: "#C8102E",
        padding: 10
    },
    headerSubContainer: {
        flex: 1,
        flexDirection: "row",
        width: 500,
        height: 100,
        paddingTop: 35,
        justifyContent: "center"
    },
    tileContainer: {
        padding: 10,
        margin: 20,
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
  