import { BookingDays } from '../const';
import { Quest } from './quest';

export type MapLocation = {
  address: string;
  coords: [number, number];
};

export type BookingLocation = {
  location: MapLocation;
  id: string;
};

export type BookingSlotsTimeAvailable = {
  time: string;
  isAvailable: boolean;
};

export type BookingSlotsDays = {
  today: BookingSlotsTimeAvailable[];
  tomorrow: BookingSlotsTimeAvailable[];
};

export type BookingSlots = {
  slots: BookingSlotsDays;
};

export type Bookings = BookingSlots & BookingLocation;

export type BookingQuestInfo = {
  date: keyof typeof BookingDays;
  time: string;
  contactPerson: string;
  phone: string;
  withChildren: boolean;
  peopleCount: number;
};

export type BookingData = {
  placeId: string;
} & BookingQuestInfo;

export type BookingDataPost = {
  questId: string;
  bookingData: BookingData;
}

export type BookingDataResponse = {
  quest: Quest;
} & BookingQuestInfo & BookingLocation;
