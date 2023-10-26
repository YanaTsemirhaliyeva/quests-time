import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { BookingSlots } from '../../types/state';
import { fetchQuestBookingInfoAction } from '../api-actions';
import { Bookings } from '../../types/booking';

const initialState: BookingSlots = {
  booking: [],
  currentBooking: null,
  isBookingDataLoading: false,
};

export const bookings = createSlice({
  name: NameSpace.Booking,
  initialState,
  reducers: {
    changeQuestAddress: (state, action: PayloadAction<Bookings>) => {
      state.currentBooking = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestBookingInfoAction.pending, (state) => {
        state.isBookingDataLoading = true;
      })
      .addCase(fetchQuestBookingInfoAction.fulfilled, (state, action) => {
        state.booking = action.payload;
        state.currentBooking = action.payload[0];
        state.isBookingDataLoading = false;
      })
      .addCase(fetchQuestBookingInfoAction.rejected, (state) => {
        state.isBookingDataLoading = false;
      });
  }
});

export const {changeQuestAddress} = bookings.actions;
