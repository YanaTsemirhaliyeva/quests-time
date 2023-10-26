import React from 'react';
import { DEFAULT_THEME_FILTER, FilterQuestsSvgWidth, FilterQuestsThemeRussian, FilterQuestsTheme } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveTheme } from '../../store/quests/quests.slice';
import { getFirstLetterSmall } from '../../utils';

type QuestsThemeListProps = {
  activeTheme: string;
}

function QuestsThemeList({activeTheme}: QuestsThemeListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Тематика</legend>
      <ul className="filter__list">
        {Object.keys(FilterQuestsThemeRussian).map((key) => {
          const xlinkHtml = key === DEFAULT_THEME_FILTER
            ? `#icon-${FilterQuestsTheme[key as keyof typeof FilterQuestsTheme]}-quests`
            : `#icon-${FilterQuestsTheme[key as keyof typeof FilterQuestsTheme]}`;

          return (
            <li key={getFirstLetterSmall(key)} className="filter__item">
              <input type="radio" name="type"
                id={getFirstLetterSmall(key)}
                checked={key === activeTheme}
                onChange={() => {
                  dispatch(setActiveTheme(key));
                }}
              />
              <label className="filter__label" htmlFor={getFirstLetterSmall(key)}>
                <svg className="filter__icon" width={FilterQuestsSvgWidth[key as keyof typeof FilterQuestsSvgWidth]} height="30" aria-hidden="true">
                  <use xlinkHref={xlinkHtml}></use>
                </svg>
                <span className="filter__label-text">{FilterQuestsThemeRussian[key as keyof typeof FilterQuestsThemeRussian]}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}

const MemoQuestsThemeList = React.memo(QuestsThemeList);

export default MemoQuestsThemeList;
