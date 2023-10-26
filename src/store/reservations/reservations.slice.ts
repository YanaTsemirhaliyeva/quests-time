import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { toast } from 'react-toastify';
import { Reservations } from '../../types/state';
import {
  deleteReservationDataAction,
  fetchReservationDataAction,
  postReservationDataAction
} from '../api-actions';

const initialState: Reservations = {
  reservations: [],
  isReservationDataLoading: false,
  status: Status.Idle,
};

export const reservations = createSlice({
  name: NameSpace.Reservations,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReservationDataAction.pending, (state) => {
        state.isReservationDataLoading = true;
      })
      .addCase(fetchReservationDataAction.fulfilled, (state, action) => {
        state.reservations = action.payload;
        state.isReservationDataLoading = false;
      })
      .addCase(fetchReservationDataAction.rejected, (state) => {
        state.isReservationDataLoading = false;
      })
      .addCase(postReservationDataAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postReservationDataAction.fulfilled, (state) => {
        toast.warn('Квест успешно забронирован!');
        state.status = Status.Success;
      })
      .addCase(postReservationDataAction.rejected, (state) => {
        toast.warn('Не удалось зарезирвировать квест. Пожалуйста, попробуйте позже');
        state.status = Status.Error;
      })
      .addCase(deleteReservationDataAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(deleteReservationDataAction.fulfilled, (state, action) => {
        state.reservations = state.reservations.filter((quest) => quest.id !== action.payload);
        state.status = Status.Success;
      })
      .addCase(deleteReservationDataAction.rejected, (state) => {
        toast.warn('Не удалось отменить зарезирвированный квест. Пожалуйста, попробуйте позже');
        state.status = Status.Error;
      });
  }
});
