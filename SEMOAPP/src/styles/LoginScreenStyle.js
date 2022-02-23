import { Dimensions, StyleSheet } from 'react-native'
import { theme } from '../core/theme'

export const styles = StyleSheet.create({
    
    fixed: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0   
    },
    title: {
      fontSize: 36,
      marginBottom: 18,      
      fontFamily: 'SulphurPoint-Regular',

    },
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
            flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    },
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
      fontFamily: 'SulphurPoint-Regular',
      flexDirection: 'row-reverse',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
      fontFamily: 'SulphurPoint-Regular',
    },
    label: {
      color: theme.colors.secondary,
      fontFamily: 'SulphurPoint-Regular',
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
      fontFamily: 'SulphurPoint-Regular',
    },
    loginBox: {
      height: 'auto',
      width: '80%',
      backgroundColor: theme.colors.medBlue,
      padding: 10,
      borderRadius: 20,
      fontFamily: 'SulphurPoint-Regular',
      shadowColor: theme.colors.black,
      shadowOffset: {
	width: 0,
	height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,

elevation: 5,
      
    },
    loginSubmissions: {

    },
    loginButton: {
        height: 'auto',
        borderRadius: 20,
        backgroundColor: theme.colors.lightGreen,
        color: theme.colors.black,
        width: '40%'
    },
    loginButtonText: {
        fontFamily: 'SulphurPoint-Regular',        
    },
    loginField: {
        borderRadius: 20,
        color: theme.colors.white,
        fontFamily: 'SulphurPoint-Regular',
        fontWeight: 'normal'
    }
  });