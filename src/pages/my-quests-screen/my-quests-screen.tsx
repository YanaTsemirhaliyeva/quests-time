import { NavigationStatus } from '../../const';
import { useAppSelector } from '../../hooks';
import { getReservations } from '../../store/reservations/reservations.selectors';
import MemoReservationCard from '../../components/reservation-card/reservation-card';
import Layout from '../../components/layout/layout';
import styles from './my-quests-screen.module.css';


function MyQuestsScreen(): JSX.Element {
  const userReservations = useAppSelector(getReservations);

  return (
    <Layout pageTitle='Мои резервы' navigation={NavigationStatus.Full}>
      <main className="page-content decorated-page">
        <div className="decorated-page__decor" aria-hidden="true">
          <picture>
            <source type="image/webp" srcSet="img/content/maniac/maniac-bg-size-m.webp, img/content/maniac/maniac-bg-size-m@2x.webp 2x" /><img src="img/content/maniac/maniac-bg-size-m.jpg" srcSet="img/content/maniac/maniac-bg-size-m@2x.jpg 2x" width="1366" height="1959" alt="" />
          </picture>
        </div>
        <div className="container">
          <div className="page-content__title-wrapper">
            <h1 className="title title--size-m page-content__title">Мои бронирования</h1>
          </div>
          {userReservations.length > 0 ?
            <div className="cards-grid">
              {userReservations.map((quest) => <MemoReservationCard reservationQuest={quest} key={quest.id}/>)}
            </div> :
            <p className={styles['not-yet-reservations']}>Ещё нет зарезирвированных квестов<br/>
              Зарезирвируйте квесты, чтобы Вы смогли погрузиться в увлекательную игру,
              в которой Ваша команда в течение определенного времени попытается общими усилиями достичь поставленной цели.<br/>
              Обычно квесты проходят в помещении со специальными декорациями, звуком и другими атрибутами,
              которые помогают создать идеальную атмосферу в зависимости от выбранного квеста.
            </p>}
        </div>
      </main>
    </Layout>
  );
}

export default MyQuestsScreen;
