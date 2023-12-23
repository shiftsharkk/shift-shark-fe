import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import Input from '../../atoms/input-field';

import useOnClickOutside from '../../../utils/hooks/use-on-click-outside';

import styles from './styles.module.css';

type Props = {
  value: Date;
  onChange: (value: Date) => void;
  label?: string;
  error?: string;
};

const CalendarField: React.FC<Props> = ({
  value = new Date(),
  onChange,
  label,
  error,
}) => {
  const [date, setDate] = useState(new Date(value));
  const [calendarVisible, setCalendarVisible] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const calendarContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    onChange(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  useOnClickOutside(calendarContainerRef, () => {
    setCalendarVisible(false);
  });

  return (
    <div className="tw-w-full | tw-relative">
      <Input
        label={label}
        placeholder="DD/MM/YYYY"
        readOnly
        value={date.toLocaleDateString()}
        onClick={() => {
          setCalendarVisible(!calendarVisible);
        }}
        ref={inputRef}
      />
      {calendarVisible && (
        <div
          ref={calendarContainerRef}
          className={'tw-fixed'}
          style={{
            width: inputRef.current?.getBoundingClientRect().width,
            left: inputRef.current?.getBoundingClientRect().x,
            top: `${
              (inputRef.current?.getBoundingClientRect().y ?? 0) +
              (inputRef.current?.getBoundingClientRect().height ?? 0)
            }px`,
          }}
        >
          <Calendar
            className={styles.calendar}
            onClickDay={() => setCalendarVisible(false)}
            value={date}
            onChange={(date) => setDate(date as Date)}
          />
        </div>
      )}
      {error && <p className="tw-text-red-500 tw-text-xs tw-mt-1">{error}</p>}
    </div>
  );
};
export default CalendarField;
