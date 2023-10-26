import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { APIRoute, AppRoute } from '../const';
import { AuthData } from '../types/auth-data';
import { UserData } from '../types/user-data';
import { dropToken, saveToken } from '../services/token';
import { FullQuest, Quest } from '../types/quest';
import { BookingData, BookingDataPost, BookingDataResponse, Bookings } from '../types/booking';
import { redirectToRoute } from './action';


export const fetchQuestsAction = createAsyncThunk<Quest[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'DATA/fetchQuests',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Quest[]>(APIRoute.Quests);
    return data;
  },
);

export const fetchFullQuestAction = createAsyncThunk<FullQuest, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'QUEST/fetch',
  async (questId, {extra: api}) => {
    const {data} = await api
      .get<FullQuest>(`${APIRoute.Quests}/${questId}`);
    return data;
  },
);

export const fetchQuestBookingInfoAction = createAsyncThunk<Bookings[], string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'BOOKING/fetch',
  async (questId, {extra: api}) => {
    const {data} = await api.get<Bookings[]>(`${APIRoute.Quests}/${questId}/booking`);
    return data;
  }
);

export const fetchReservationDataAction = createAsyncThunk<BookingDataResponse[], undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'RESERVATION/fetch',
  async (_arg, { extra: api }) => {
    try {
      const { data } = await api.get<BookingDataResponse[]>(APIRoute.Reservation);
      return data;
    } catch {
      throw new Error();
    }
  },
);

export const postReservationDataAction = createAsyncThunk<BookingData, BookingDataPost & {onSuccess: () => void}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'BOOKING/POST',
  async({questId, bookingData, onSuccess }, {dispatch, extra: api}) => {
    const {data} = await api.post<BookingData>(`${APIRoute.Quests}/${questId}/booking`, bookingData);
    dispatch(redirectToRoute(AppRoute.MyQuests));
    dispatch(fetchReservationDataAction());
    onSuccess();
    return data;
  },
  );


export const deleteReservationDataAction = createAsyncThunk<string, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'QUESTS/deleteBookingData',
  async (questId, {extra: api}) => {
    await api.delete(`${APIRoute.Reservation}/${questId}`);
    return questId;
  }
);


export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchReservationDataAction());
    return data;
  },
);


export const loginAction = createAsyncThunk<UserData, AuthData & {onSuccess: () => void}, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/login',
  async({email, password, onSuccess}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    onSuccess();
    dispatch(fetchReservationDataAction());
    return data;
  },
  );

export const logoutAction = createAsyncThunk<void, undefined, {
  dispath: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'USER/logout',
  async (_arg, {extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
