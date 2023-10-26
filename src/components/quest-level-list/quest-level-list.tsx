import React from 'react';
import { FilterQuestsByDifficulty } from '../../const';
import { useAppDispatch } from '../../hooks';
import { setActiveLevel } from '../../store/quests/quests.slice';

type QuestLevelListProps = {
  activeLevel: string;
}

function QuestLevelList({activeLevel}: QuestLevelListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <fieldset className="filter__section">
      <legend className="visually-hidden">Сложность</legend>
      <ul className="filter__list">
        {Object.keys(FilterQuestsByDifficulty).map((key) => (
          <li className="filter__item" key={key}>
            <input type="radio" name="level"
              id={key}
              checked={key === activeLevel}
              onChange={() => {
                dispatch(setActiveLevel(key));
              }}
            />
            <label className="filter__label" htmlFor={key}>
              <span className="filter__label-text">{FilterQuestsByDifficulty[key as keyof typeof FilterQuestsByDifficulty]}</span>
            </label>
          </li>
        ))}
      </ul>
    </fieldset>
  );
}

const MemoQuestLevelList = React.memo(QuestLevelList);

export default MemoQuestLevelList;
