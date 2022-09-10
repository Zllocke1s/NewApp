import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Landing
} from './screens';

const Router = createStackNavigator(
  {
    Landing,
  },
  {
    initialRouteName: 'Shuttle',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
