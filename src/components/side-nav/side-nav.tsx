import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus, Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getAuthorizationStatus, getUserStatus } from '../../store/user-process/user-process.selectors';
import { logoutAction } from '../../store/api-actions';
import React from 'react';

type SideNavProps = {
  page?: AppRoute;
}

function SideNav({page}: SideNavProps): JSX.Element {
  const dispatch = useAppDispatch();

  const userStatus = useAppSelector(getAuthorizationStatus);
  const isLoggedIn = userStatus === AuthorizationStatus.Auth;

  const isLogoutStatusLoading = useAppSelector(getUserStatus) === Status.Loading;


  return (
    <div className="header__side-nav">
      {page !== AppRoute.Login && isLoggedIn ?
        <Link
          className="btn btn--accent header__side-item"
          onClick={(evt) => {
            if (isLogoutStatusLoading) {
              return false;
            }
            evt.preventDefault();
            dispatch(logoutAction());
          }}
          to={AppRoute.Index}
        >
          {isLogoutStatusLoading ? 'Ждём' : 'Выйти'}
        </Link>
        : page !== AppRoute.Login &&
        <Link
          className="btn btn--accent header__side-item"
          to={AppRoute.Login}
        >
          Войти
        </Link>}
      <Link className="link header__side-item header__phone-link" to="tel:88003335599">8 (000) 111-11-11</Link>
    </div>
  );
}

const MemoSideNav = React.memo(SideNav);

export default MemoSideNav;
