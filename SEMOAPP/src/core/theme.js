import { DefaultTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native-appearance';
import { memo } from  'react';
import { Appearance } from 'react-native';

var theme = null

if(Appearance.getColorScheme() !== "dark" )
{
  theme = {
  ...DefaultTheme,
  myOwnProperty: true,

  colors: {
    ...DefaultTheme.colors,
    primary: '#f27777',
    secondary: '#f27777',
    error: '#f13a59',
    medBlue: '#f27777',
    lightGreen: '#c1ff9a',
    medGreen: '#51A96A',
    darkBlue: '#b15958',
    lightBlue: '#ffc6db',
    white: '#ffffff',
    lightRed: '#FC8080',
    yellow: "#ffdd34",
    gray: "#ccc",
    lightPink: '#FCA0C0',
    black: "#000000"
  },
};
}
else
{
theme = {
  ...DefaultTheme,
  myOwnProperty: true,

  colors: {
    ...DefaultTheme.colors,
    primary: '#414757',
    secondary: '#77b7f2',
    error: '#f13a59',
    medBlue: '#3978b1',
    lightGreen: '#259111',
    gray: "#ccc",
    medGreen: '#51A96A',
    darkBlue: '#3978b1',
    lightBlue: '#77b7f2',
    white: '#444',
    lightRed: '#cc2b2b',
    lightPink: '#FCA0C0',
    yellow: "#d6b300",
    black: "#ddd"
  },
};
}

export {theme}


//For dark mode, implement the following method and such on all pages:
/*import {useColorScheme} from 'react-native-appearance';

useColorScheme() checks the OS color scheme, and matches the app to it.  

However, I can't check it from here.  So, I can make 2 theme files, and then use the correct one based on  useColorScheme() */