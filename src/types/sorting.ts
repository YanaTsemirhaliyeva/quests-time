import {FilterQuestsByDifficulty, FilterQuestsTheme} from '../const';

export type SortingTheme = keyof typeof FilterQuestsTheme;

export type SortingLevel = keyof typeof FilterQuestsByDifficulty;
