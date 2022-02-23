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
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: theme.colors.medBlue,
    },
    scoreboardPassword: {
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
    welcome: {
      fontSize: 20,
      fontFamily: 'SulphurPoint-Bold',
      marginTop: 100,
      color: theme.colors.darkBlue,
      flex: 0.1
    },
    scoreboardBox: {
      flex: 0.9,
      marginTop: 10,
      width: '100%',
      backgroundColor: theme.colors.white,
      padding: 10,
      borderWidth: 1,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderTopColor: theme.colors.darkBlue,
      borderBottomWidth: 0,
      fontFamily: 'SulphurPoint-Regular',      
      justifyContent: 'center',
      alignItems: 'center',
    
    },
    announcementButton: {
      borderRadius: 20,
      backgroundColor: theme.colors.medBlue,
      color: theme.colors.black,
      fontFamily: 'SulphurPoint-Bold',   
      width: 50,
      position: 'absolute',
      left: 0,
      borderTopLeftRadius: 0,
      borderBottomLeftRadius: 0,
      top: 50,
      justifyContent: "center",
      margin: 0,
      padding: 0,
  },
  scoreboardChartBox: {
    borderWidth: 1,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between"
  },
  announcementButtonHide: {
    
    display: 'none',
    
},
  annIcon: {
    height: 100,
    
  },
    registerField: {
        borderRadius: 20,
        color: theme.colors.lightRed,
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
  announcementBoxShow: {
    display: "flex",
    position: "absolute",
    top: 140,
    left: "10%",
    backgroundColor: theme.colors.white,
    width: "80%",
    height: Dimensions.get("window").height-200,
    zIndex: 1000,
    borderRadius: 14,
    alignItems: "center",
    shadowOffset:{  width: 10,  height: 10,  },
shadowColor: 'black',
shadowOpacity: 10.0,
    elevation: 25,
  },
  announcementBoxHide: {
    display: "none"
  },
  announcementHeading: {
    fontFamily: "SulphurPoint-Bold",
    fontSize: 26,
    textDecorationLine: "underline",
    marginTop: 10
  }
  });