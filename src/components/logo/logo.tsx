import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import React from 'react';

function Logo(): JSX.Element {
  return (
    <Link className="logo header__logo" to={AppRoute.Index} aria-label="Перейти на Главную">
      <svg width="134" height="52" aria-hidden="true">
        <use xlinkHref="#logo"></use>
      </svg>
    </Link>
  );
}

const MemoLogo = React.memo(Logo);
export default MemoLogo;
