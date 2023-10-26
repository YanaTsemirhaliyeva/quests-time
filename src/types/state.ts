import { AuthorizationStatus, Status } from '../const';
import { store } from '../store';
import { BookingDataResponse, Bookings } from './booking';
import { FullQuest, Quest } from './quest';
import { UserData } from './user-data';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  setAuthData: UserData | null;
  status: Status;
}

export type Quests = {
  quests: Quest[];
  fullQuest: FullQuest | null;
  isQuestsDataLoading: boolean;
  isFullQuestDataLoading: boolean;
  hasError: boolean;
  activeTheme: string;
  activeLevel: string;
};

export type Reservations = {
  reservations: BookingDataResponse[];
  isReservationDataLoading: boolean;
  status: Status;
}

export type BookingSlots = {
  booking: Bookings[];
  currentBooking: Bookings | null;
  isBookingDataLoading: boolean;
}


export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
