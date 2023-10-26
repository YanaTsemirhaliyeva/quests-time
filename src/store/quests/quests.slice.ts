import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_DIFFICULTY_FILTER, DEFAULT_THEME_FILTER, NameSpace } from '../../const';
import { toast } from 'react-toastify';
import { Quests } from '../../types/state';
import { fetchFullQuestAction, fetchQuestsAction } from '../api-actions';

const initialState: Quests = {
  quests: [],
  fullQuest: null,
  isQuestsDataLoading: false,
  isFullQuestDataLoading: false,
  hasError: false,
  activeTheme: DEFAULT_THEME_FILTER,
  activeLevel: DEFAULT_DIFFICULTY_FILTER,
};

export const quests = createSlice({
  name: NameSpace.Quests,
  initialState,
  reducers: {
    dropQuest: (state) => {
      state.fullQuest = null;
    },
    setActiveTheme: (state, action: PayloadAction<string>) => {
      state.activeTheme = action.payload;
    },
    setActiveLevel: (state, action: PayloadAction<string>) => {
      state.activeLevel = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchQuestsAction.pending, (state) => {
        state.isQuestsDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchQuestsAction.fulfilled, (state, action) => {
        state.quests = action.payload;
        state.isQuestsDataLoading = false;
      })
      .addCase(fetchQuestsAction.rejected, (state) => {
        state.isQuestsDataLoading = false;
        toast.warn('Не удалось загрузить квесты. Пожалуйста, попробуйте позже');
        state.hasError = true;
      })
      .addCase(fetchFullQuestAction.pending, (state) => {
        state.isFullQuestDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchFullQuestAction.fulfilled, (state, action) => {
        state.fullQuest = action.payload;
        state.isFullQuestDataLoading = false;
      })
      .addCase(fetchFullQuestAction.rejected, (state) => {
        state.isFullQuestDataLoading = false;
        state.hasError = true;
      });
  }
});

export const {dropQuest, setActiveTheme, setActiveLevel} = quests.actions;
