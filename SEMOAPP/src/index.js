import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Landing,
  CalendarPage,
  Dining,
  Labs,
  Maps,
  Portal,
  Reserve,
  Shuttle,
  StuGov,
  Secret,
  Athletics,
  SubDining,
  RecHours,
  Facilities,
  FitnessClasses,
  IMSchedule,
  Settings
} from './screens';

const Router = createStackNavigator(
  {
    Landing,
  CalendarPage,
  Dining,
  Labs,
  Maps,
  Portal,
  Reserve,
  Shuttle,
  IMSchedule,
  StuGov,
  Secret,
  Athletics,
  SubDining,
  RecHours,
  Facilities,
  FitnessClasses,
  Settings
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
