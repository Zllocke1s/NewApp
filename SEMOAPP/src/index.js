import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  Landing,
  CalendarPage,
  AthleticsContact, 
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
  IMSchedule
} from './screens';

const Router = createStackNavigator(
  {
    Landing,
  CalendarPage,
  AthleticsContact,
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
  FitnessClasses
  },
  {
    initialRouteName: 'Landing',
    headerMode: 'none',
  }
);



export default createAppContainer(Router);
