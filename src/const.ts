import { Icon } from 'leaflet';
import { BookingLocation } from './types/booking';

export enum AppRoute {
  Index = '/',
  Login = '/login',
  Quest = '/quest',
  MyQuests = '/my-quests',
  Contacts = '/contacts',
}

export enum APIRoute {
  Quests = '/quest',
  Login = '/login',
  Logout = '/logout',
  NotFound = '/404',
  Reservation = '/reservation'
}


export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum NavigationStatus {
  Full = 'FULL',
  WithoutBookings = 'WITHOUT_BOOKINGS',
}

export const DEFAULT_CONTACT_ADDRESS: BookingLocation = {
  location: {
    address: 'Санкт-Петербург, Набережная реки Карповка, д 5П',
    coords: [59.968476, 30.317679],
  },
  id: 'office-address'
};

export const DEFAULT_SAINT_PETERSBURG_COORDS = {
  latitude: 59.9386,
  longitude: 30.3141,
};

export const activeCustomIcon = new Icon({
  iconUrl: '../../img/svg/pin-active.svg',
  iconSize: [40, 40],
  iconAnchor: [10, 10],
  popupAnchor: [20, -5],
});

export const defaultCustomIcon = new Icon({
  iconUrl: '../../img/svg/pin-default.svg',
  iconSize: [40, 40],
  iconAnchor: [10, 10],
  popupAnchor: [20, -5],
});


export const FilterQuestsThemeRussian = {
  All: 'Все квесты',
  Adventure: 'Приключения',
  Horror: 'Ужасы',
  Mystic: 'Мистика',
  Detective: 'Детектив',
  SciFi: 'Sci-fi',
};

export const FilterQuestsTheme = {
  All: 'all',
  Adventure: 'adventure',
  Horror: 'horror',
  Mystic: 'mystic',
  Detective: 'detective',
  SciFi: 'sci-fi',
};

export const DEFAULT_THEME_FILTER = 'All';

export const FilterQuestsSvgWidth = {
  All: '26',
  Adventure: '36',
  Horror: '30',
  Mystic: '30',
  Detective: '40',
  SciFi: '28',
};

export enum FilterQuestsThemeResponse {
  'adventures' = 'Приключения',
  'horror' = 'Ужасы',
  'mystic' = 'Мистика',
  'detective' = 'Детектив',
  'sci-fi' = 'Sci-fi',
}

export enum QuestsTheme {
  Adventure = 'adventures',
  Horror = 'horror',
  Mystic = 'mystic',
  Detective = 'detective',
  SciFi = 'sci-fi',
}

export enum FilterQuestsByDifficulty {
  any = 'Любой',
  easy = 'Лёгкий',
  middle = 'Средний',
  hard = 'Сложный',
}

export const DEFAULT_DIFFICULTY_FILTER = 'any';

export enum QuestsByDifficultyResponse {
  easy = 'Лёгкий',
  medium = 'Средний',
  hard = 'Сложный',
}

export enum QuestsByDifficulty {
  easy = 'easy',
  middle = 'medium',
  hard = 'hard',
}

export enum BookingDays {
  today = 'today',
  tomorrow = 'tomorrow',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum NameSpace {
  User = 'USER',
  Quests = 'QUESTS',
  Booking = 'BOOKING',
  Reservations = 'RESERVATIONS',
}

export const REGEX_PASSWORD = /^(?=.*\d)(?=.*[a-zа-я])\S{3,15}$/i;
export const REGEX_EMAIL = /^[\w]{1}[\w-\\.]*@[\w-]+\.[a-z]{2,4}$/i;

export enum PageMapClass {
  Contacts = 'contacts',
  Bookings = 'booking',
}

export enum PageCardClass {
  Index = 'index',
  Reservations = 'reservations',
}

export const PageMapZoom = {
  [PageMapClass.Bookings]: 10,
  [PageMapClass.Contacts]: 12,
};

export enum DaysOnRussian {
  'today' = 'сегодня',
  'tomorrow' = 'завтра'
}
