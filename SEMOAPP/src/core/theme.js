import { DefaultTheme } from 'react-native-paper';
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
    red: '#C8102E',
    redPastel: '#fbd0d7',
    gray: '#eee',
    gray2: "#ccc",
    gray3: "#aaa",
    gray4: "#999",
    white: '#fff',
    black: '#000',
    green: '#4b4',
    blue: '#0c70f0'

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
    red: '#C8102E',
    gray: '#eee',
    gray2: "#ccc",
    gray3: "#aaa",
    gray4: "#999",
    white: '#fff',
    black: '#000',
    green: '#4b4',
    blue: '#0c70f0'
  },
};
}

export {theme}


//For dark mode, implement the following method and such on all pages:
/*import {useColorScheme} from 'react-native-appearance';

useColorScheme() checks the OS color scheme, and matches the app to it.  

However, I can't check it from here.  So, I can make 2 theme files, and then use the correct one based on  useColorScheme() */