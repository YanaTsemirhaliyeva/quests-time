import { Link, useParams } from 'react-router-dom';
import { AppRoute, FilterQuestsThemeResponse, NavigationStatus, QuestsByDifficultyResponse } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFullQuest, isFullQuestStatusLoading } from '../../store/quests/quests.selectors';
import { useEffect } from 'react';
import { fetchFullQuestAction, fetchQuestBookingInfoAction } from '../../store/api-actions';
import Spinner from '../../components/spinner/spinner';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import Layout from '../../components/layout/layout';

function QuestScreen(): JSX.Element {

  const {questId} = useParams();
  const dispatch = useAppDispatch();

  const currentQuest = useAppSelector(getFullQuest);
  const isFullQuestDataLoading = useAppSelector(isFullQuestStatusLoading);

  useEffect(() => {
    if (questId) {
      dispatch(fetchFullQuestAction(questId));
    }

  }, [questId, dispatch]);

  if (isFullQuestDataLoading) {
    return <Spinner/>;
  }

  if(!currentQuest) {
    return <NotFoundScreen />;
  }

  const {id, title, description, type, peopleMinMax, level, coverImg, coverImgWebp} = currentQuest;

  return (
    <Layout navigation={NavigationStatus.WithoutBookings} pageTitle={title}>
      <main className="decorated-page quest-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source
              type="image/webp"
              srcSet={coverImgWebp}
            />
            <img src={coverImg}
              srcSet={coverImg}
              width="1366"
              height="768"
              alt=""
            />
          </picture>
        </div>
        <div className="container container--size-l">
          <div className="quest-page__content">
            <h1 className="title title--size-l title--uppercase quest-page__title">{title}</h1>
            <p className="subtitle quest-page__subtitle"><span className="visually-hidden">Жанр:</span>{FilterQuestsThemeResponse[type]}
            </p>
            <ul className="tags tags--size-l quest-page__tags">
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
            <p className="quest-page__description">{description}</p>
            <Link
              className="btn btn--accent btn--cta quest-page__btn"
              to={`${AppRoute.Quest}/${id}/booking`}
              onClick={() => {
                dispatch(fetchQuestBookingInfoAction(id));
              }}
            >
              Забронировать
            </Link>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default QuestScreen;
