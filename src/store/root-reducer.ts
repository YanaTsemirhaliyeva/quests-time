import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { userProcess } from './user-process/user-process.slice';
import { quests } from './quests/quests.slice';
import { reservations } from './reservations/reservations.slice';
import { bookings } from './bookings/bookings.slice';


export const rootReducer = combineReducers({
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Quests]: quests.reducer,
  [NameSpace.Reservations]: reservations.reducer,
  [NameSpace.Booking]: bookings.reducer,
});
