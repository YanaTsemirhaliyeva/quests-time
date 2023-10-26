import React, { ChangeEvent, useCallback, useState } from 'react';
import { DaysOnRussian } from '../../const';
import { BookingSlotsDays } from '../../types/booking';

type BookingSlotsProps = {
  slots: BookingSlotsDays;
  onTimeChecked: (day: string, time: string) => void;
}

function BookingSlots({slots, onTimeChecked}: BookingSlotsProps): JSX.Element {

  const [formDataTime, setFormDataTime] = useState({time: '',});

  const handleFormChange =
    useCallback((evt: ChangeEvent<HTMLInputElement>): void => {
      const {value} = evt.target;
      setFormDataTime({ ...formDataTime, time: value});
    }, [formDataTime]);

  return (
    <fieldset className="booking-form__section">
      <legend className="visually-hidden">Выбор даты и времени</legend>

      {Object.entries(slots).map(([day, timeList]) => (

        <fieldset className="booking-form__date-section" key={day}>
          <legend className="booking-form__date-title">{DaysOnRussian[day as keyof typeof DaysOnRussian]}</legend>
          <div className="booking-form__date-inner-wrapper" onChange={handleFormChange}>

            {timeList.map(({time, isAvailable}) => {
              const timeValue = time.split(':');
              const valueTime = `${day}${timeValue[0]}h${timeValue[1]}m`;
              return (
                <label className="custom-radio booking-form__date" key={time}>
                  <input
                    type="radio"
                    id={valueTime}
                    name="date"
                    required
                    value={valueTime}
                    disabled={!isAvailable}
                    onChange={() => onTimeChecked(day, time)}
                    checked={formDataTime.time === valueTime}
                  />
                  <span className="custom-radio__label">{time}</span>
                </label>);
            })}
          </div>
        </fieldset>))}

    </fieldset>
  );
}

const MemoBookingSlots = React.memo(BookingSlots);

export default MemoBookingSlots;
