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
    container: {
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width,
            flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
    },
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
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
    registerBox: {
      width: '85%',
      backgroundColor: theme.colors.medBlue,
      padding: 10,
      borderRadius: 20,
      marginBottom: 80,
      fontFamily: 'SulphurPoint-Regular',
      
    },
    registerSubmissions: {

    },
    registerButton: {
        height: 'auto',
        borderRadius: 20,
        backgroundColor: theme.colors.lightGreen,
        color: theme.colors.black,
        fontFamily: 'SulphurPoint-Bold',   
        width: '100%'
    },
    registerField: {
        borderRadius: 20,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        color: theme.colors.lightRed,
        backgroundColor: theme.colors.white,
        fontFamily: 'SulphurPoint-Regular',
        
    },

    
  label: {
    color: theme.colors.secondary,
  },

  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  });