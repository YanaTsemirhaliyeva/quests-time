import { NameSpace } from '../../const';
import { Bookings } from '../../types/booking';
import { State } from '../../types/state';


export const getBookings = (state: State): Bookings[] => state[NameSpace.Booking].booking;
export const isBookingDataLoading = (state: State): boolean => state[NameSpace.Booking].isBookingDataLoading;
export const getCurrentQuest = (state: State): Bookings | null => state[NameSpace.Booking].currentBooking;
