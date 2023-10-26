import { DEFAULT_DIFFICULTY_FILTER, DEFAULT_THEME_FILTER, QuestsTheme, QuestsByDifficulty } from './const';
import { Quest } from './types/quest';


// Функция для получения первой буквы слова строчной

export const getFirstLetterSmall = (str: string): string => {
  if (!str) {
    return str;
  }

  return str[0].toLowerCase() + str.slice(1);
};


// Функция для сортировки квестов по теме

export const sortQuestsByTheme = (quests: Quest[], theme: string): Quest[] => {
  if (theme !== DEFAULT_THEME_FILTER) {
    return quests.filter((quest) => quest.type === QuestsTheme[theme as keyof typeof QuestsTheme]);
  }
  return quests;
};

// Функция для сортировки квестов по теме

export const sortQuestsByLevel = (quests: Quest[], level: string): Quest[] => {
  if (level !== DEFAULT_DIFFICULTY_FILTER) {
    return quests.filter((quest) => quest.level === QuestsByDifficulty[level as keyof typeof QuestsByDifficulty]);
  }
  return quests;
};
