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
        justifyContent: 'flex-start',
        
      },
    title: {
        fontSize: 36,
        color: theme.colors.gray
    },
    calContainer:
    {
        width: "100%",
        margin: 20,
        backgroundColor: theme.colors.gray,
        flex: 1,
        marginBottom: 20
    },
    heading: {
      fontSize: 16,
      width: "100%",
      textAlign: "center",
      backgroundColor: theme.colors.white,
      paddingVertical: 10
      
    }
  });
  