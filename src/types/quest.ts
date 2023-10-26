import { FilterQuestsThemeResponse, QuestsByDifficultyResponse } from '../const';

export type Quest = {
  id: string;
  title: string;
  previewImg: string;
  previewImgWebp: string;
  level: keyof typeof QuestsByDifficultyResponse;
  type: keyof typeof FilterQuestsThemeResponse;
  peopleMinMax: [number, number];
};

export type QuestDescription = {
  id: string;
  description: string;
  coverImg: string;
  coverImgWebp: string;
};

export type FullQuest = Quest & QuestDescription;
