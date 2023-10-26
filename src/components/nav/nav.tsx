import { Link, useLocation } from 'react-router-dom';
import { AppRoute, NavigationStatus } from '../../const';
import classNames from 'classnames';
import React from 'react';

type NavProps = {
  navView: NavigationStatus;
}

function Nav({navView}: NavProps): JSX.Element {
  const currentLocation = useLocation();
  const currentPath = currentLocation.pathname;

  return (
    <nav className="main-nav header__main-nav">
      <ul className="main-nav__list">
        <li className="main-nav__item">
          <Link className={classNames({'not-disabled active' : currentPath === AppRoute.Index}, 'link')} to={AppRoute.Index}>Квесты</Link>
        </li>
        <li className="main-nav__item">
          <Link className={classNames({'not-disabled active' : currentPath === AppRoute.Contacts}, 'link')} to={AppRoute.Contacts}>Контакты</Link>
        </li>
        {navView === NavigationStatus.Full &&
        <li className="main-nav__item">
          <Link className={classNames({'not-disabled active' : currentPath === AppRoute.MyQuests}, 'link')}
            to={AppRoute.MyQuests}
          >
            Мои бронирования
          </Link>
        </li>}
      </ul>
    </nav>
  );
}

const MemoNav = React.memo(Nav);
export default MemoNav;
