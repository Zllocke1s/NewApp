import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Landing,
  Calendar,
  Dining,
  Labs,
  Maps,
  Portal,
  Reserve,
  Shuttle,
  StuGov,
  Secret,
  Athletics
} from './screens';

const Router = createStackNavigator(
  {
    Landing,
  Calendar,
  Dining,
  Labs,
  Maps,
  Portal,
  Reserve,
  Shuttle,
  StuGov,
  Secret,
  Athletics
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
