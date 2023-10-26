import { NameSpace, Status } from '../../const';
import { BookingDataResponse } from '../../types/booking';
import { State } from '../../types/state';


export const getReservations = (state: State): BookingDataResponse[] => state[NameSpace.Reservations].reservations;
export const isReservationDataLoading = (state: State): boolean => state[NameSpace.Reservations].isReservationDataLoading;
export const getReservationDataStatus = (state: State): Status => state[NameSpace.Reservations].status;
