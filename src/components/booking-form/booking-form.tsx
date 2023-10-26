import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BookingData, BookingDataPost, Bookings } from '../../types/booking';
import MemoBookingSlots from '../booking-slots/booking-slots';
import styles from './booking-form.module.css';
import React, { useState } from 'react';
import { BookingDays, Status } from '../../const';
import { postReservationDataAction } from '../../store/api-actions';
import { useLocation } from 'react-router-dom';
import { getCurrentQuest } from '../../store/bookings/bookings.selectors';
import { getReservationDataStatus } from '../../store/reservations/reservations.selectors';


type BookingFormProps = {
  bookingSlots: Bookings[];
  peopleMinMax: [number, number];
}

function BookingForm({bookingSlots, peopleMinMax}: BookingFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  let currentQuest = useAppSelector(getCurrentQuest);
  const currentLocation = useLocation();
  const currentPath = currentLocation.pathname;
  const currentId = currentPath.split('/')[2];

  if (!currentQuest) {
    currentQuest = bookingSlots[0];
  }

  const [bookingDay, setBookingDay] = useState('');
  const [bookingTime, setBookingTime] = useState('');

  const handleBookingTimeChecked = (day: string, time: string): void => {
    setBookingDay(day);
    setBookingTime(time);
  };

  const currentBookingSlots = bookingSlots.filter((slots) => currentQuest === slots);
  const {slots} = currentBookingSlots[0];
  const currentAddressId = currentBookingSlots[0].id;

  type BookingFormData = {
    date: string;
    name: string;
    tel: string;
    personCount: number;
    children: boolean;
    userAgreement: boolean;
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm<BookingFormData>({
    defaultValues: {},
    mode: 'onChange'
  });

  const resetFormData = () => {
    setBookingDay('');
    setBookingTime('');
    reset();
  };

  const handleSubmitForm: SubmitHandler<BookingFormData> = (data) => {
    const {name, children, tel, personCount} = data;
    const bookingFormData: BookingData = {
      date: bookingDay as keyof typeof BookingDays,
      time: bookingTime,
      contactPerson: name,
      phone: tel,
      withChildren: children,
      peopleCount: Number(personCount),
      placeId: currentAddressId,
    };
    const bookingDataPost: BookingDataPost = {
      questId: currentId,
      bookingData: bookingFormData
    };
    dispatch(postReservationDataAction({...bookingDataPost, onSuccess: resetFormData}));
  };

  const [isChecked, setIsChecked] = useState<boolean>(true);
  const isReservationDataPosting = useAppSelector(getReservationDataStatus) === Status.Loading;


  return (
    <form className="booking-form"
      action="https://echo.htmlacademy.ru/" method="post"
      onSubmit={handleSubmit(handleSubmitForm)}
    >

      <MemoBookingSlots slots={slots} onTimeChecked={handleBookingTimeChecked}/>

      <fieldset className="booking-form__section">
        <legend className="visually-hidden">Контактная информация</legend>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="name">Ваше имя</label>
          <input type="text" id="name"
            placeholder="Имя"
            {...register('name', {
              required: true,
              pattern: {
                value:  /^.{1,15}$/,
                message: 'Имя обязательно и не может превышать 15 символов'
              } })}

            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className={styles.darkred} role="alert">{errors.name.message}</p>
          )}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="tel">Контактный телефон</label>
          <input type="tel" id="tel"
            placeholder="80123456789 | +7(012)345-67-89"
            {...register('tel', {
              required: true,
              pattern: {
                value: /^(?!\s+$)(?:(?:8|\+7)[-\s]?)?(?:\(?\d{3}\)?[-\s]?)?[\d\s-]{7,10}$/,
                message: 'Введён некорректный номер телефона'
              } })}
            aria-invalid={errors.tel ? 'true' : 'false'}
          />
          {errors.tel && (
            <p className={styles.darkred} role='alert'>{errors.tel.message}</p>
          )}
        </div>
        <div className="custom-input booking-form__input">
          <label className="custom-input__label" htmlFor="person">Количество участников</label>
          <input type="number" id="person"
            placeholder={`${peopleMinMax[0]}-${peopleMinMax[1]}`}
            {...register('personCount', {
              required: true,
              min: `${peopleMinMax[0]}`, max: `${peopleMinMax[1]}`,
              pattern: new RegExp(`^([${peopleMinMax[0]}-${peopleMinMax[1]}])$`),
            })}
            aria-invalid={errors.personCount ? 'true' : 'false'}
          />
          {errors.personCount && (
            <p className={styles.darkred} role='alert'>{`Допустимое число участников: ${peopleMinMax[0]}-${peopleMinMax[1]}`}</p>)}
        </div>
        <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--children">
          <input type="checkbox" id="children"
            {...register('children')}
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <span className="custom-checkbox__icon">
            <svg width="20" height="17" aria-hidden="true">
              <use xlinkHref="#icon-tick"></use>
            </svg>
          </span>
          <span className="custom-checkbox__label">Со&nbsp;мной будут дети</span>
        </label>
      </fieldset>
      <button className="btn btn--accent btn--cta booking-form__submit"
        type="submit"
        disabled={isReservationDataPosting}
      >
        Забронировать
      </button>
      <label className="custom-checkbox booking-form__checkbox booking-form__checkbox--agreement">
        <input type="checkbox" id="id-order-agreement" required
          {...register('userAgreement')}
        />
        <span className="custom-checkbox__icon" >
          <svg width="20" height="17" aria-hidden="true">
            <use xlinkHref="#icon-tick"></use>
          </svg>
        </span>
        <span className="custom-checkbox__label">Я&nbsp;согласен с
          <a className="link link--active-silver link--underlined" href="#">правилами обработки персональных данных</a>
          &nbsp;и пользовательским соглашением
        </span>
      </label>
    </form>
  );
}

const MemoBookingForm = React.memo(BookingForm);

export default MemoBookingForm;
