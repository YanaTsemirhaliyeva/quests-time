import { useParams } from 'react-router-dom';
import { NavigationStatus, PageMapClass } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getFullQuest } from '../../store/quests/quests.selectors';
import { useEffect } from 'react';
import { fetchFullQuestAction, fetchQuestBookingInfoAction } from '../../store/api-actions';
import { dropQuest } from '../../store/quests/quests.slice';
import Spinner from '../../components/spinner/spinner';
import NotFoundScreen from '../not-found-screen/not-found-screen';
import MemoBookingForm from '../../components/booking-form/booking-form';
import Map from '../../components/map/map';
import Layout from '../../components/layout/layout';
import { getBookings, isBookingDataLoading } from '../../store/bookings/bookings.selectors';

function BookingScreen(): JSX.Element {
  const {questId} = useParams();
  const dispatch = useAppDispatch();

  const currentBookings = useAppSelector(getBookings);
  const isDataBookingLoading = useAppSelector(isBookingDataLoading);
  const quest = useAppSelector(getFullQuest);

  useEffect(() => {
    if (questId) {
      dispatch(fetchQuestBookingInfoAction(questId));
      dispatch(fetchFullQuestAction(questId));
    }

    return () => {
      dispatch(dropQuest());
    };

  }, [questId, dispatch]);


  if (isDataBookingLoading) {
    return (
      <Spinner/>
    );
  }

  if(!quest) {
    return <NotFoundScreen />;
  }

  const {title, previewImg, coverImg, coverImgWebp, peopleMinMax} = quest;

  return (
    <Layout navigation={NavigationStatus.Full} pageTitle={title}>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp"
              srcSet={coverImgWebp}
            />
            <img src={previewImg}
              srcSet={coverImg}
              width="1366" height="1959" alt=""
            />
          </picture>
        </div>
        {currentBookings.length > 0 &&
        <div className="container container--size-s">
          <div className="page-content__title-wrapper">
            <h1 className="subtitle subtitle--size-l page-content__subtitle">Бронирование квеста
            </h1>
            <p className="title title--size-m title--uppercase page-content__title">{title}</p>
          </div>
          <div className="page-content__item">
            <div className="booking-map">
              <Map page={PageMapClass.Bookings} bookingQuests={currentBookings} />
            </div>
          </div>
          <MemoBookingForm bookingSlots={currentBookings} peopleMinMax={peopleMinMax} />
        </div>}
      </main>
    </Layout>
  );
}

export default BookingScreen;
