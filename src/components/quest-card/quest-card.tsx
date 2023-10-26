import { Link } from 'react-router-dom';
import { Quest } from '../../types/quest';
import { AppRoute, QuestsByDifficultyResponse } from '../../const';
import React from 'react';

type QuestCardProps = {
  quest: Quest;
}

function QuestCard({quest}: QuestCardProps): JSX.Element {
  const {id, level, peopleMinMax, previewImg, previewImgWebp, title} = quest;
  const routeQuestId = `${AppRoute.Quest}/${id}`;

  return (
    <div className="quest-card">
      <div className="quest-card__img">
        <picture>
          <source
            type="image/webp"
            srcSet={previewImgWebp}
          />
          <img
            src={previewImg}
            srcSet={previewImg}
            width="344"
            height="232"
            alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={routeQuestId}>{title}</Link>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{peopleMinMax[0]}&ndash;{peopleMinMax[1]}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>{QuestsByDifficultyResponse[level]}
          </li>
        </ul>
      </div>
    </div>
  );
}

const MemoQuestCard = React.memo(QuestCard);

export default MemoQuestCard;
