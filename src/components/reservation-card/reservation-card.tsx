import { Link } from 'react-router-dom';
import { AppRoute, DaysOnRussian, Status } from '../../const';
import { BookingDataResponse } from '../../types/booking';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { deleteReservationDataAction } from '../../store/api-actions';
import { getReservationDataStatus } from '../../store/reservations/reservations.selectors';
import React from 'react';

type ReservationCardProps = {
  reservationQuest: BookingDataResponse;
}

function ReservationCard({reservationQuest}: ReservationCardProps): JSX.Element {
  const dispatch = useAppDispatch();
  const {quest: {previewImg, previewImgWebp, title, id}, peopleCount, date, time, location: {address}} = reservationQuest;
  const separateAddress = address.split('м.');
  const day = DaysOnRussian[date];

  const handleButtonClick = () => dispatch(deleteReservationDataAction(reservationQuest.id));
  const isReservationDeleteStatusLoading = useAppSelector(getReservationDataStatus) === Status.Loading;


  return (
    <div className="quest-card" key={reservationQuest.id}>
      <div className="quest-card__img">
        <picture>
          <source type="image/webp" srcSet={previewImgWebp} />
          <img src={previewImg}
            srcSet={previewImg} width="344" height="232" alt={title}
          />
        </picture>
      </div>
      <div className="quest-card__content">
        <div className="quest-card__info-wrapper">
          <Link className="quest-card__link" to={`${AppRoute.Quest}/${id}`}>{title}</Link>
          <span className="quest-card__info">[{`${day}, ${time}. ${separateAddress[0]}`}<br />м. {separateAddress[1]}]</span>
        </div>
        <ul className="tags quest-card__tags">
          <li className="tags__item">
            <svg width="11" height="14" aria-hidden="true">
              <use xlinkHref="#icon-person"></use>
            </svg>{peopleCount}&nbsp;чел
          </li>
          <li className="tags__item">
            <svg width="14" height="14" aria-hidden="true">
              <use xlinkHref="#icon-level"></use>
            </svg>Средний
          </li>
        </ul>
        <button className="btn btn--accent btn--secondary quest-card__btn" type="button"
          onClick={handleButtonClick}
          disabled={isReservationDeleteStatusLoading}
        >
          Отменить
        </button>
      </div>
    </div>
  );
}

const MemoReservationCard = React.memo(ReservationCard);

export default MemoReservationCard;
