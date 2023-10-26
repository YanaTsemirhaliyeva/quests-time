import { NameSpace } from '../../const';
import { FullQuest, Quest } from '../../types/quest';
import { State } from '../../types/state';

export const getQuests = (state: State): Quest[] => state[NameSpace.Quests].quests;
export const isQuestsStatusLoading = (state: State): boolean => state[NameSpace.Quests].isQuestsDataLoading;

export const getFullQuest = (state: State): FullQuest | null => state[NameSpace.Quests].fullQuest;
export const isFullQuestStatusLoading = (state: State): boolean => state[NameSpace.Quests].isFullQuestDataLoading;


export const getActiveTheme = (state: State): string => state[NameSpace.Quests].activeTheme;
export const getActiveLevel = (state: State): string => state[NameSpace.Quests].activeLevel;

export const getErrorStatus = (state: State): boolean => state[NameSpace.Quests].hasError;
